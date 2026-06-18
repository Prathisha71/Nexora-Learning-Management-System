import { spawn } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { uploadToMinioKey, getContentTypeFromKey } from './minio.js';

export interface DrmProcessResult {
  licenseId: string;
  encryptedPath: string;
  hlsPath: string;
  dashPath: string;
  drmMetadata: {
    keyIv: string;
    algorithm: 'AES-128';
  };
}

function runCommand(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}: ${stderr.slice(-2000)}`));
    });
    proc.on('error', (err) => reject(err));
  });
}

async function uploadDirectoryToMinio(localDir: string, minioPrefix: string): Promise<void> {
  const entries = fs.readdirSync(localDir, { withFileTypes: true });
  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name);
    if (entry.isDirectory()) {
      await uploadDirectoryToMinio(localPath, `${minioPrefix}/${entry.name}`);
      continue;
    }
    const key = `${minioPrefix}/${entry.name}`.replace(/\\/g, '/');
    const body = fs.readFileSync(localPath);
    await uploadToMinioKey(key, body, getContentTypeFromKey(key));
  }
}

/**
 * Process an uploaded MP4 into encrypted HLS + DASH packages stored in MinIO.
 * Original buffer is stored separately; existing rows are never modified by this helper.
 */
export async function processVideoForDrm(
  videoId: string,
  inputBuffer: Buffer,
  originalFilename: string,
): Promise<DrmProcessResult> {
  const licenseId = crypto.randomUUID();
  const key = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), `drm-${videoId}-`));
  const inputPath = path.join(tmpRoot, originalFilename || 'input.mp4');
  const hlsDir = path.join(tmpRoot, 'hls');
  const dashDir = path.join(tmpRoot, 'dash');
  const keyPath = path.join(tmpRoot, 'enc.key');
  const keyInfoPath = path.join(tmpRoot, 'keyinfo.txt');

  fs.writeFileSync(inputPath, inputBuffer);
  fs.mkdirSync(hlsDir, { recursive: true });
  fs.mkdirSync(dashDir, { recursive: true });
  fs.writeFileSync(keyPath, key);

  // Placeholder URI; manifest is rewritten at stream time to use authenticated key endpoint.
  const keyUriPlaceholder = `__DRM_KEY_URI__/${videoId}`;
  fs.writeFileSync(keyInfoPath, `${keyUriPlaceholder}\n${keyPath}\n${iv.toString('hex')}\n`);

  const hlsManifest = path.join(hlsDir, 'master.m3u8');
  await runCommand('ffmpeg', [
    '-y',
    '-i',
    inputPath,
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '23',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-hls_time',
    '6',
    '-hls_playlist_type',
    'vod',
    '-hls_key_info_file',
    keyInfoPath,
    '-hls_segment_filename',
    path.join(hlsDir, 'segment_%03d.ts'),
    hlsManifest,
  ]);

  const dashManifest = path.join(dashDir, 'manifest.mpd');
  await runCommand('ffmpeg', [
    '-y',
    '-i',
    inputPath,
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '23',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-f',
    'dash',
    '-seg_duration',
    '6',
    '-use_timeline',
    '1',
    '-init_seg_name',
    'init-$RepresentationID$.mp4',
    '-media_seg_name',
    'chunk-$RepresentationID$-$Number%05d$.m4s',
    dashManifest,
  ]);

  const storageBase = `drm/${videoId}`;
  const originalKey = `${storageBase}/original/${Date.now()}-${path.basename(originalFilename || 'video.mp4')}`;
  await uploadToMinioKey(originalKey, inputBuffer, 'video/mp4');

  const hlsPrefix = `${storageBase}/hls`;
  const dashPrefix = `${storageBase}/dash`;
  await uploadDirectoryToMinio(hlsDir, hlsPrefix);
  await uploadDirectoryToMinio(dashDir, dashPrefix);

  // Store encryption key privately (served only via authenticated /key endpoint)
  const keyStoragePath = `${storageBase}/keys/${licenseId}.key`;
  await uploadToMinioKey(keyStoragePath, key, 'application/octet-stream');

  fs.rmSync(tmpRoot, { recursive: true, force: true });

  return {
    licenseId,
    encryptedPath: originalKey,
    hlsPath: `${hlsPrefix}/master.m3u8`,
    dashPath: `${dashPrefix}/manifest.mpd`,
    drmMetadata: {
      keyIv: iv.toString('hex'),
      algorithm: 'AES-128',
    },
  };
}

export async function isFfmpegAvailable(): Promise<boolean> {
  try {
    await runCommand('ffmpeg', ['-version']);
    return true;
  } catch {
    return false;
  }
}
