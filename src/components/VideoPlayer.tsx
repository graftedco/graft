'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Props = {
  videoId: string;
  title?: string;
};

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YouTubePlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getIframe: () => HTMLIFrameElement;
  setPlaybackRate: (r: number) => void;
  getPlayerState: () => number;
  setOption: (module: string, option: string, value: unknown) => void;
  loadModule: (module: string) => void;
  unloadModule: (module: string) => void;
};

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const VOLUMES = [1.0, 2.5, 5.0, 7.5, 10.0];
const VOLUME_LABELS = ['100%', '250%', '500%', '750%', '1000%'];

let ytApiReady: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (ytApiReady) return ytApiReady;
  ytApiReady = new Promise((resolve) => {
    if (typeof window === 'undefined') return;
    if (window.YT && window.YT.Player) return resolve();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
  return ytApiReady;
}

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function VideoPlayer({ videoId, title }: Props) {
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volIdx, setVolIdx] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [volOpen, setVolOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);

  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  // init YouTube player
  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then(() => {
      if (cancelled || !holderRef.current) return;
      playerRef.current = new window.YT.Player(holderRef.current, {
        videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
          cc_load_policy: 0,
        },
        events: {
          onReady: () => {
            setReady(true);
            const p = playerRef.current;
            if (!p) return;
            try {
              const savedSpeed = parseFloat(localStorage.getItem('graft_speed') || '1');
              const savedVol = parseInt(localStorage.getItem('graft_vol_idx') || '0', 10);
              if (SPEEDS.includes(savedSpeed)) {
                setSpeed(savedSpeed);
                p.setPlaybackRate(savedSpeed);
              }
              if (savedVol >= 0 && savedVol < VOLUMES.length) {
                setVolIdx(savedVol);
              }
              try { p.unloadModule('captions'); } catch {}
              try { p.unloadModule('cc'); } catch {}
              setDuration(p.getDuration());
            } catch {}
          },
          onStateChange: (e: { data: number }) => {
            setPlaying(e.data === 1);
            if (e.data === 1) setStarted(true);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [videoId]);

  // progress tracking
  useEffect(() => {
    const tick = () => {
      const p = playerRef.current;
      if (p) {
        try {
          setCurrent(p.getCurrentTime());
          const d = p.getDuration();
          if (d) setDuration(d);
        } catch {}
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const connectAudioGain = useCallback(() => {
    if (gainRef.current || !playerRef.current) return;
    try {
      const iframe = playerRef.current.getIframe() as HTMLIFrameElement & { mozCaptureStream?: () => MediaStream; captureStream?: () => MediaStream };
      const capture = iframe.captureStream || iframe.mozCaptureStream;
      if (!capture) return;
      const stream = capture.call(iframe);
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const src = ctx.createMediaStreamSource(stream);
      const gain = ctx.createGain();
      gain.gain.value = VOLUMES[volIdx];
      src.connect(gain);
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainRef.current = gain;
    } catch {
      // captureStream not supported — gain boost simply not applied, volume remains native 100%
    }
  }, [volIdx]);

  // apply gain on change
  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = VOLUMES[volIdx];
  }, [volIdx]);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    resetHideTimer();
    if (playing) {
      p.pauseVideo();
    } else {
      p.playVideo();
      setStarted(true);
      connectAudioGain();
    }
  }, [playing, resetHideTimer, connectAudioGain]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const p = playerRef.current;
    if (!p || !duration) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    p.seekTo(Math.max(0, Math.min(1, ratio)) * duration, true);
    resetHideTimer();
  }, [duration, resetHideTimer]);

  const pickSpeed = (s: number) => {
    setSpeed(s);
    setSpeedOpen(false);
    playerRef.current?.setPlaybackRate(s);
    try { localStorage.setItem('graft_speed', String(s)); } catch {}
  };

  const pickVol = (i: number) => {
    setVolIdx(i);
    setVolOpen(false);
    try { localStorage.setItem('graft_vol_idx', String(i)); } catch {}
  };

  const toggleCaptions = () => {
    const p = playerRef.current;
    if (!p) return;
    const next = !captionsOn;
    setCaptionsOn(next);
    try {
      if (next) {
        p.loadModule('captions');
        p.loadModule('cc');
        p.setOption('captions', 'track', { languageCode: 'en' });
        p.setOption('cc', 'track', { languageCode: 'en' });
      } else {
        p.unloadModule('captions');
        p.unloadModule('cc');
      }
    } catch {}
  };

  const toggleFullscreen = () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  const progressPct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      className="video-wrapper"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => setControlsVisible(false)}
      onTouchStart={resetHideTimer}
      aria-label={title || videoId}
    >
      <div className="yt-holder"><div ref={holderRef} style={{ width: '100%', height: '100%' }} /></div>

      {!started && ready && (
        <div className="vp-center-play" onClick={togglePlay} role="button" aria-label="Play">
          <div className="circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#000000"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      )}

      <div className={`vp-controls ${controlsVisible ? '' : 'hidden'}`}>
        <div />
        <div>
          <div className="vp-progress" onClick={seek} role="slider" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={current}>
            <div className="vp-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="vp-bottom" style={{ marginTop: 8 }}>
            <button className="vp-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <span className="vp-time">{formatTime(current)} / {formatTime(duration)}</span>
            <div style={{ flex: 1 }} />
            <button className="vp-btn wide" onClick={toggleCaptions} aria-pressed={captionsOn} aria-label="Captions" style={{ color: captionsOn ? '#D4AF37' : '#FFFFFF' }}>
              CC
            </button>
            <div style={{ position: 'relative' }}>
              <button className="vp-btn wide" onClick={() => { setSpeedOpen((o) => !o); setVolOpen(false); }} aria-label="Speed">
                {speed}x
              </button>
              {speedOpen && (
                <div className="vp-popup" style={{ right: 0 }}>
                  {SPEEDS.map((s) => (
                    <button key={s} onClick={() => pickSpeed(s)} className={s === speed ? 'active' : ''}>{s}x</button>
                  ))}
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button className="vp-btn wide" onClick={() => { setVolOpen((o) => !o); setSpeedOpen(false); }} aria-label="Volume boost">
                {VOLUME_LABELS[volIdx]}
              </button>
              {volOpen && (
                <div className="vp-popup" style={{ right: 0 }}>
                  {VOLUME_LABELS.map((label, i) => (
                    <button key={label} onClick={() => pickVol(i)} className={i === volIdx ? 'active' : ''}>{label}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="vp-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
