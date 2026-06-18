import React, { useEffect, useRef, useState, useCallback } from "react";
import shaka from "shaka-player";
import { AlertCircle, Loader2 } from "lucide-react";
import { getApiBaseUrl } from "../utils/apiBase";

interface DRMVideoPlayerProps {
  videoId: string;
  title?: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

interface PlaybackSession {
  drmEnabled: boolean;
  manifestUrl?: string;
  dashUrl?: string;
  playbackToken?: string;
  expiresAt?: string;
  username?: string;
  duration?: number;
  videoUrl?: string;
}

export const DRMVideoPlayer: React.FC<DRMVideoPlayerProps> = ({
  videoId,
  title,
  onTimeUpdate,
  containerRef,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watermarkUser, setWatermarkUser] = useState("");
  const [watermarkTime, setWatermarkTime] = useState("");
  const [watermarkPos, setWatermarkPos] = useState({ top: "12%", left: "8%" });

  const resolveUrl = useCallback((url: string) => {
    if (url.startsWith("http")) return url;
    return `${getApiBaseUrl()}${url.startsWith("/") ? url : `/${url}`}`;
  }, []);

  useEffect(() => {
    const tick = () => setWatermarkTime(new Date().toLocaleString());
    tick();
    const clock = window.setInterval(tick, 1000);
    const move = window.setInterval(() => {
      setWatermarkPos({
        top: `${8 + Math.floor(Math.random() * 70)}%`,
        left: `${5 + Math.floor(Math.random() * 60)}%`,
      });
    }, 4000);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(move);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    shaka.polyfill.installAll();

    const init = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Please log in to watch this video.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${getApiBaseUrl()}/api/videos/${videoId}/playback`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const session: PlaybackSession = await res.json();
        if (!res.ok) {
          throw new Error((session as { error?: string }).error || "Playback access denied");
        }
        if (cancelled) return;

        if (!session.drmEnabled) {
          setError("This video is not DRM-protected.");
          setLoading(false);
          return;
        }

        setWatermarkUser(session.username || "User");

        const player = new shaka.Player(videoEl);
        playerRef.current = player;

        const playbackToken = session.playbackToken || "";
        player.getNetworkingEngine()?.registerRequestFilter((type, request) => {
          request.allowCrossSiteCredentials = false;
          if (playbackToken && request.uris?.length) {
            request.uris = request.uris.map((uri) => {
              try {
                const u = new URL(uri, getApiBaseUrl());
                if (!u.searchParams.has("token")) {
                  u.searchParams.set("token", playbackToken);
                }
                return u.toString();
              } catch {
                return uri;
              }
            });
          }
        });

        player.configure({
          streaming: {
            bufferingGoal: 30,
            rebufferingGoal: 5,
          },
        });

        const manifest = session.manifestUrl ? resolveUrl(session.manifestUrl) : undefined;
        if (!manifest) throw new Error("No manifest URL returned");

        await player.load(manifest);

        if (session.duration && onTimeUpdate) {
          onTimeUpdate(0, session.duration);
        }

        videoEl.addEventListener("timeupdate", () => {
          onTimeUpdate?.(videoEl.currentTime, videoEl.duration || session.duration || 0);
        });

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error("DRM playback error:", err);
        setError(err instanceof Error ? err.message : "Failed to load protected video");
        setLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
      playerRef.current?.destroy().catch(() => undefined);
      playerRef.current = null;
    };
  }, [videoId, onTimeUpdate, resolveUrl]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        playsInline
        title={title}
      />

      {!loading && !error && (
        <div
          className="absolute pointer-events-none select-none z-30 px-2 py-1 rounded text-[11px] font-mono text-white/35 bg-black/10 border border-white/5"
          style={{ top: watermarkPos.top, left: watermarkPos.left }}
        >
          {watermarkUser} · {watermarkTime}
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 gap-2">
          <Loader2 className="w-8 h-8 text-brand-royal animate-spin" />
          <span className="text-xs text-slate-400">Loading secure stream…</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 gap-2 px-6 text-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
};
