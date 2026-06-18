import { Router } from 'express';
import { Readable } from 'stream';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';
import { signPlaybackToken, verifyPlaybackToken } from '../lib/playback-token.js';
import { getObjectFromMinio, getContentTypeFromKey } from '../lib/minio.js';

const router = Router();

async function loadVideoWithSubject(videoId: string) {
  return prisma.courseVideo.findUnique({
    where: { id: videoId },
    include: {
      topic: {
        include: {
          chapter: {
            include: {
              unit: {
                include: { subject: true },
              },
            },
          },
        },
      },
    },
  });
}

async function assertVideoAccess(
  videoId: string,
  userId: string,
  role: string,
): Promise<{ ok: true; video: NonNullable<Awaited<ReturnType<typeof loadVideoWithSubject>>> } | { ok: false; status: number; error: string }> {
  const video = await loadVideoWithSubject(videoId);
  if (!video) {
    return { ok: false, status: 404, error: 'Video not found' };
  }

  if (role === 'ADMIN' || role === 'TEACHER') {
    return { ok: true, video };
  }

  const student = await prisma.student.findUnique({ where: { id: userId } });
  const subjectClassId = video.topic.chapter.unit.subject.classId;
  if (!student || student.classId !== subjectClassId) {
    return { ok: false, status: 403, error: 'Access denied: not enrolled in this course' };
  }

  return { ok: true, video };
}

function buildStreamUrl(req: { protocol: string; get: (h: string) => string | undefined }, videoId: string, objectKey: string, token: string) {
  const host = req.get('host');
  const base = `${req.protocol}://${host}/api/videos/${videoId}/stream`;
  return `${base}?path=${encodeURIComponent(objectKey)}&token=${encodeURIComponent(token)}`;
}

function buildKeyUrl(req: { protocol: string; get: (h: string) => string | undefined }, videoId: string, token: string) {
  const host = req.get('host');
  return `${req.protocol}://${host}/api/videos/${videoId}/stream?resource=key&token=${encodeURIComponent(token)}`;
}

function rewriteHlsManifest(content: string, videoId: string, token: string, req: Parameters<typeof buildStreamUrl>[0], hlsBaseKey: string) {
  const hlsDir = hlsBaseKey.replace(/\/[^/]+$/, '');
  const keyUrl = buildKeyUrl(req, videoId, token);
  return content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      if (trimmed.startsWith('#EXT-X-KEY')) {
        return trimmed.replace(/URI="[^"]+"/, `URI="${keyUrl}"`);
      }
      if (trimmed.startsWith('#')) return line;
      const segmentKey = `${hlsDir}/${trimmed}`.replace(/\/+/g, '/');
      return buildStreamUrl(req, videoId, segmentKey, token);
    })
    .join('\n');
}

function rewriteDashManifest(content: string, videoId: string, token: string, req: Parameters<typeof buildStreamUrl>[0], dashBaseKey: string) {
  const dashDir = dashBaseKey.replace(/\/[^/]+$/, '');
  return content.replace(/(\b(?:initialization|media)=")([^"]+)(")/g, (_match, prefix, relPath, suffix) => {
    const objectKey = `${dashDir}/${relPath}`.replace(/\/+/g, '/');
    return `${prefix}${buildStreamUrl(req, videoId, objectKey, token)}${suffix}`;
  });
}

// GET /api/videos/:id/playback — short-lived token + secure manifest URLs
router.get('/videos/:id/playback', requireAuth, async (req, res) => {
  const videoId = req.params.id;
  const access = await assertVideoAccess(videoId, req.auth!.userId, req.auth!.role);
  if (!access.ok) {
    return res.status(access.status).json({ error: access.error });
  }

  const { video } = access;
  if (!video.drmEnabled) {
    return res.json({
      drmEnabled: false,
      videoUrl: video.videoUrl,
    });
  }

  if (!video.hlsPath) {
    return res.status(503).json({ error: 'DRM stream not ready' });
  }

  const user = await prisma.user.findUnique({ where: { id: req.auth!.userId } });
  const username = user ? `${user.firstName} ${user.lastName}`.trim() || user.email : 'user';
  const { token, expiresAt } = signPlaybackToken(req.auth!.userId, videoId);

  const manifestUrl = buildStreamUrl(req, videoId, video.hlsPath, token);
  const dashUrl = video.dashPath ? buildStreamUrl(req, videoId, video.dashPath, token) : undefined;

  res.json({
    drmEnabled: true,
    playbackToken: token,
    expiresAt: expiresAt.toISOString(),
    manifestUrl,
    dashUrl,
    username,
    videoId,
    duration: video.duration,
  });
});

// GET /api/videos/:id/stream?path=...&token=... — proxy MinIO objects (no public URLs)
router.get('/videos/:id/stream', async (req, res) => {
  const videoId = req.params.id;
  const token = (req.query.token as string) || '';
  const resource = req.query.resource as string | undefined;
  const objectPath = req.query.path as string | undefined;

  const payload = verifyPlaybackToken(token, videoId);
  if (!payload) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(401).json({ error: 'Invalid or expired playback token' });
  }

  const video = await prisma.courseVideo.findUnique({ where: { id: videoId } });
  if (!video?.drmEnabled) {
    return res.status(404).json({ error: 'DRM video not found' });
  }

  // AES-128 key delivery
  if (resource === 'key') {
    const drmMeta = video.drmMetadata as { keyIv?: string } | null;
    const keyObject = video.licenseId
      ? `drm/${videoId}/keys/${video.licenseId}.key`
      : null;
    if (!keyObject) {
      return res.status(404).json({ error: 'Encryption key not found' });
    }
    try {
      const obj = await getObjectFromMinio(keyObject);
      const chunks: Buffer[] = [];
      for await (const chunk of obj.Body as AsyncIterable<Uint8Array>) {
        chunks.push(Buffer.from(chunk));
      }
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      if (drmMeta?.keyIv) {
        res.setHeader('X-Key-IV', drmMeta.keyIv);
      }
      return res.send(Buffer.concat(chunks));
    } catch {
      return res.status(404).json({ error: 'Key unavailable' });
    }
  }

  if (!objectPath) {
    return res.status(400).json({ error: 'path is required' });
  }

  // Prevent path traversal / hotlinking to unrelated objects
  if (!objectPath.startsWith(`drm/${videoId}/`)) {
    return res.status(403).json({ error: 'Forbidden path' });
  }

  try {
    const obj = await getObjectFromMinio(objectPath);
    const contentType = getContentTypeFromKey(objectPath);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (objectPath.endsWith('.m3u8')) {
      const chunks: Buffer[] = [];
      for await (const chunk of obj.Body as AsyncIterable<Uint8Array>) {
        chunks.push(Buffer.from(chunk));
      }
      const raw = Buffer.concat(chunks).toString('utf8');
      const rewritten = rewriteHlsManifest(raw, videoId, token, req, objectPath);
      return res.send(rewritten);
    }

    if (objectPath.endsWith('.mpd')) {
      const chunks: Buffer[] = [];
      for await (const chunk of obj.Body as AsyncIterable<Uint8Array>) {
        chunks.push(Buffer.from(chunk));
      }
      const raw = Buffer.concat(chunks).toString('utf8');
      const rewritten = rewriteDashManifest(raw, videoId, token, req, objectPath);
      return res.send(rewritten);
    }

    if (obj.Body instanceof Readable) {
      obj.Body.pipe(res);
      return;
    }

    const chunks: Buffer[] = [];
    for await (const chunk of obj.Body as AsyncIterable<Uint8Array>) {
      chunks.push(Buffer.from(chunk));
    }
    return res.send(Buffer.concat(chunks));
  } catch (err) {
    console.error('Stream proxy error:', err);
    return res.status(404).json({ error: 'Stream segment not found' });
  }
});

export default router;
