import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'eduverse-dev-secret';
const PLAYBACK_TTL_SECONDS = Number(process.env.PLAYBACK_TOKEN_TTL_SECONDS || 600); // 10 minutes

export interface PlaybackTokenPayload {
  type: 'playback';
  userId: string;
  videoId: string;
}

export function signPlaybackToken(userId: string, videoId: string): { token: string; expiresAt: Date } {
  const expiresAt = new Date(Date.now() + PLAYBACK_TTL_SECONDS * 1000);
  const token = jwt.sign(
    { type: 'playback', userId, videoId } satisfies PlaybackTokenPayload,
    JWT_SECRET,
    { expiresIn: PLAYBACK_TTL_SECONDS },
  );
  return { token, expiresAt };
}

export function verifyPlaybackToken(token: string, videoId: string): PlaybackTokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as PlaybackTokenPayload;
    if (payload.type !== 'playback' || payload.videoId !== videoId) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
