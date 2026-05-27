import { useEffect, useRef, useState, type CSSProperties } from "react";

export type MoveKey =
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
  | "reverse-kegel"
  | "decomp";

type MovementDemoProps = {
  moveKey: MoveKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

type Cadence = "strength" | "breath" | "settle";

type MoveSpec = {
  fig: string;
  title: string;
  role: string;
  cycleSeconds: number;
  cadence: Cadence;
  frameHold: string;
  sprite: string;
  spriteSmall: string;
  poster: string;
  videoMp4: string;
  videoWebm: string;
};

const PAPER = "#F4EFE3";
const INK = "#1A1714";
const MUTED = "#655C4F";
const OX = "#722B2B";
const RULE = "#D9CFB5";
const WORKOUT_FRAME_COUNT = 4;

const MOVES: Record<MoveKey, MoveSpec> = {
  "curl-up": {
    fig: "B.01A",
    title: "McGill Curl-Up",
    role: "Head and shoulder blades lift together; lumbar curve preserved",
    cycleSeconds: 2.45,
    cadence: "strength",
    frameHold: "setup / lift / hold / return",
    sprite: "/demos/workout/curl-up.jpg",
    spriteSmall: "/demos/workout/curl-up-sm.jpg",
    poster: "/demos/workout/curl-up.jpg",
    videoMp4: "/demos/workout/curl-up.mp4",
    videoWebm: "/demos/workout/curl-up.webm",
  },
  "side-plank": {
    fig: "B.01B",
    title: "Side Bridge",
    role: "Forearm support; shoulder-to-knee line",
    cycleSeconds: 2.65,
    cadence: "strength",
    frameHold: "setup / lift / hold / lower",
    sprite: "/demos/workout/side-plank.jpg",
    spriteSmall: "/demos/workout/side-plank-sm.jpg",
    poster: "/demos/workout/side-plank.jpg",
    videoMp4: "/demos/workout/side-plank.mp4",
    videoWebm: "/demos/workout/side-plank.webm",
  },
  "bird-dog": {
    fig: "B.01C",
    title: "Bird-Dog",
    role: "Contralateral reach; spine stays quiet",
    cycleSeconds: 2.65,
    cadence: "strength",
    frameHold: "setup / reach / hold / return",
    sprite: "/demos/workout/bird-dog.jpg",
    spriteSmall: "/demos/workout/bird-dog-sm.jpg",
    poster: "/demos/workout/bird-dog.jpg",
    videoMp4: "/demos/workout/bird-dog.mp4",
    videoWebm: "/demos/workout/bird-dog.webm",
  },
  breath: {
    fig: "F.01A",
    title: "Diaphragmatic Breath",
    role: "Lower ribs and abdomen track the breath",
    cycleSeconds: 3.45,
    cadence: "breath",
    frameHold: "rest / inhale / full inhale / exhale",
    sprite: "/demos/workout/breath.jpg",
    spriteSmall: "/demos/workout/breath-sm.jpg",
    poster: "/demos/workout/breath.jpg",
    videoMp4: "/demos/workout/breath.mp4",
    videoWebm: "/demos/workout/breath.webm",
  },
  "reverse-kegel": {
    fig: "F.01B",
    title: "Reverse Kegel",
    role: "Pelvic floor release; not a contraction",
    cycleSeconds: 3.45,
    cadence: "breath",
    frameHold: "rest / inhale / release / return",
    sprite: "/demos/workout/reverse-kegel.jpg",
    spriteSmall: "/demos/workout/reverse-kegel-sm.jpg",
    poster: "/demos/workout/reverse-kegel.jpg",
    videoMp4: "/demos/workout/reverse-kegel.mp4",
    videoWebm: "/demos/workout/reverse-kegel.webm",
  },
  decomp: {
    fig: "F.01C",
    title: "Supported Decompression",
    role: "Knees supported; body neutral; breath only",
    cycleSeconds: 3.85,
    cadence: "settle",
    frameHold: "rest / inhale / settle / exhale",
    sprite: "/demos/workout/decomp.jpg",
    spriteSmall: "/demos/workout/decomp-sm.jpg",
    poster: "/demos/workout/decomp.jpg",
    videoMp4: "/demos/workout/decomp.mp4",
    videoWebm: "/demos/workout/decomp.webm",
  },
};

const CSS = `
.bs-live-demo {
  isolation: isolate;
}
.bs-live-demo * {
  box-sizing: border-box;
}
.bs-live-demo__plate {
  position: absolute;
  inset: 10px;
  border: 1px solid ${RULE};
  background:
    linear-gradient(180deg, rgba(244,239,227,0.92), rgba(239,231,210,0.72)),
    radial-gradient(circle at 18% 16%, rgba(26,23,20,0.06), transparent 24%),
    ${PAPER};
}
.bs-live-demo__media-shell {
  position: absolute;
  inset: 54px 22px 58px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: rgba(244,239,227,0.62);
}
.bs-live-demo__video,
.bs-live-demo__sprite {
  height: min(100%, 560px);
  max-width: 100%;
  aspect-ratio: 3 / 4;
  border: 1px solid rgba(26,23,20,0.18);
  box-shadow: 0 18px 42px -28px rgba(26,23,20,0.5);
  background-color: ${PAPER};
}
.bs-live-demo__video {
  display: block;
  position: absolute;
  object-fit: contain;
  opacity: 0;
  transition: opacity 240ms ease;
  z-index: 2;
}
.bs-live-demo__video[data-ready="true"] {
  opacity: 1;
}
.bs-live-demo__sprite {
  position: relative;
  overflow: hidden;
  transform-origin: 50% 74%;
  background-image: var(--sprite-lg);
  background-size: var(--sprite-width) 100%;
  background-position: 0% 50%;
  background-repeat: no-repeat;
  animation-duration: var(--cycle), var(--cycle);
  animation-timing-function: step-end, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-name: bsLiveSpriteTrack, bsStrengthBody;
  will-change: background-position, transform;
}
.bs-live-demo__sprite--strength {
  animation-name: bsLiveSpriteTrack, bsStrengthBody;
}
.bs-live-demo__sprite--breath,
.bs-live-demo__sprite--settle {
  animation-name: bsLiveSpriteTrack, bsBreathBody;
}
.bs-live-demo__sprite--settle {
  opacity: 0.98;
}
.bs-live-demo[data-paused="true"] .bs-live-demo__sprite {
  animation-play-state: paused;
}
.bs-live-demo__chrome {
  position: absolute;
  inset: 0;
  pointer-events: none;
  color: ${INK};
}
.bs-live-demo__label {
  position: absolute;
  left: 28px;
  top: 24px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  max-width: calc(100% - 56px);
}
.bs-live-demo__fig,
.bs-live-demo__mode,
.bs-live-demo__frames {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 9px;
  line-height: 1;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.bs-live-demo__fig {
  color: ${OX};
}
.bs-live-demo__title {
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(17px, 1.75vw, 24px);
  font-style: italic;
  line-height: 1;
  white-space: nowrap;
}
.bs-live-demo__mode {
  position: absolute;
  right: 28px;
  top: 26px;
  color: ${MUTED};
}
.bs-live-demo__frames {
  position: absolute;
  left: 28px;
  bottom: 25px;
  color: ${MUTED};
}
.bs-live-demo__role {
  position: absolute;
  right: 28px;
  bottom: 22px;
  max-width: 48%;
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(12px, 1.2vw, 16px);
  font-style: italic;
  line-height: 1.15;
  text-align: right;
  color: ${INK};
}
.bs-live-demo__missing {
  height: min(100%, 560px);
  max-width: 100%;
  aspect-ratio: 3 / 4;
  display: grid;
  place-items: center;
  padding: 28px;
  border: 1px solid rgba(114,43,43,0.35);
  background: rgba(244,239,227,0.86);
  color: ${OX};
  text-align: center;
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-size: 18px;
  line-height: 1.2;
}
@keyframes bsStrengthBody {
  0%, 100% { transform: translateY(0) scale(1); }
  30%, 68% { transform: translateY(-5px) scale(1.018); }
  84% { transform: translateY(2px) scale(1.006); }
}
@keyframes bsBreathBody {
  0%, 100% { transform: translateY(0) scale(1); }
  46% { transform: translateY(-3px) scale(1.012); }
  72% { transform: translateY(1px) scale(1.004); }
}
@keyframes bsLiveSpriteTrack {
  0%, 23% { background-position: 0% 50%; }
  25%, 48% { background-position: 33.333333% 50%; }
  50%, 73% { background-position: 66.666667% 50%; }
  75%, 100% { background-position: 100% 50%; }
}
@media (max-width: 760px) {
  .bs-live-demo__media-shell {
    inset: 58px 14px 70px;
  }
  .bs-live-demo__label {
    left: 18px;
    gap: 8px;
  }
  .bs-live-demo__mode {
    display: none;
  }
  .bs-live-demo__frames {
    left: 18px;
    bottom: 42px;
  }
  .bs-live-demo__role {
    left: 18px;
    right: 18px;
    bottom: 16px;
    max-width: none;
    text-align: left;
  }
  .bs-live-demo__sprite {
    background-image: var(--sprite-sm);
  }
}
@media (prefers-reduced-motion: reduce) {
  .bs-live-demo__sprite {
    animation: none;
    background-position: 0% 50%;
  }
}
`;

const ENABLE_VIDEO_PROBES = false;
const videoProbeCache = new Map<string, boolean>();

function useVideoAvailability(spec: MoveSpec) {
  const cacheKey = `${spec.videoMp4}|${spec.videoWebm}`;
  const [hasVideo, setHasVideo] = useState(() => videoProbeCache.get(cacheKey) ?? false);

  useEffect(() => {
    if (!ENABLE_VIDEO_PROBES) {
      setHasVideo(false);
      return;
    }

    const cached = videoProbeCache.get(cacheKey);
    if (cached !== undefined) {
      setHasVideo(cached);
      return;
    }

    const controller = new AbortController();

    async function probe() {
      for (const url of [spec.videoMp4, spec.videoWebm]) {
        try {
          const response = await fetch(url, { method: "HEAD", signal: controller.signal });
          if (response.ok) {
            videoProbeCache.set(cacheKey, true);
            setHasVideo(true);
            return;
          }
        } catch {
          if (controller.signal.aborted) return;
        }
      }
      videoProbeCache.set(cacheKey, false);
      setHasVideo(false);
    }

    void probe();

    return () => {
      controller.abort();
    };
  }, [cacheKey, spec.videoMp4, spec.videoWebm]);

  return ENABLE_VIDEO_PROBES && hasVideo;
}

function VideoLoop({
  spec,
  paused,
  ready,
  onReady,
}: {
  spec: MoveSpec;
  paused: boolean;
  ready: boolean;
  onReady: () => void;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (paused) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  }, [paused]);

  return (
    <video
      ref={ref}
      className="bs-live-demo__video"
      data-ready={ready ? "true" : "false"}
      poster={spec.poster}
      autoPlay={!paused}
      muted
      loop
      playsInline
      preload="metadata"
      onCanPlay={onReady}
      onLoadedData={onReady}
    >
      <source src={spec.videoMp4} type="video/mp4" />
      <source src={spec.videoWebm} type="video/webm" />
    </video>
  );
}

function SpriteLoop({ spec }: { spec: MoveSpec }) {
  return (
    <div
      className={`bs-live-demo__sprite bs-live-demo__sprite--${spec.cadence}`}
      style={
        {
          "--sprite-lg": `url(${spec.sprite})`,
          "--sprite-sm": `url(${spec.spriteSmall})`,
          "--sprite-width": `${WORKOUT_FRAME_COUNT * 100}%`,
          "--cycle": `${spec.cycleSeconds}s`,
        } as CSSProperties
      }
      role="img"
      aria-label={`${spec.title}: ${spec.role}`}
    />
  );
}

export function MovementDemo({ moveKey, paused = false, className, style }: MovementDemoProps) {
  const spec = MOVES[moveKey];
  const hasVideo = useVideoAvailability(spec);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setVideoReady(false);
  }, [moveKey]);

  const displayMode = videoReady ? "video loop" : "motion study";

  return (
    <div
      className={["bs-live-demo", className].filter(Boolean).join(" ")}
      data-paused={paused ? "true" : "false"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 360,
        overflow: "hidden",
        background: PAPER,
        ...style,
      }}
    >
      <style>{CSS}</style>
      <div className="bs-live-demo__plate" />
      <div className="bs-live-demo__media-shell">
        <SpriteLoop spec={spec} />
        {hasVideo && (
          <VideoLoop
            spec={spec}
            paused={paused}
            ready={videoReady}
            onReady={() => setVideoReady(true)}
          />
        )}
      </div>
      <div className="bs-live-demo__chrome" aria-hidden>
        <div className="bs-live-demo__label">
          <span className="bs-live-demo__fig">{spec.fig}</span>
          <span className="bs-live-demo__title">{spec.title}</span>
        </div>
        <div className="bs-live-demo__mode">{paused ? "paused" : displayMode}</div>
        <div className="bs-live-demo__frames">{spec.frameHold}</div>
        <div className="bs-live-demo__role">{spec.role}</div>
      </div>
    </div>
  );
}

export default MovementDemo;
