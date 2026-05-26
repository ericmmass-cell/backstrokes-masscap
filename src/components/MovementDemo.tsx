import { useEffect, useRef, useState, type CSSProperties } from "react";

export type MoveKey =
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
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
  animation-duration: var(--cycle);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.bs-live-demo__sprite--strength {
  animation-name: bsStrengthBody;
}
.bs-live-demo__sprite--breath,
.bs-live-demo__sprite--settle {
  animation-name: bsBreathBody;
}
.bs-live-demo__frame {
  position: absolute;
  inset: 0;
  background-image: var(--sprite-lg);
  background-size: 400% 100%;
  background-repeat: no-repeat;
  opacity: 0;
  transform: translateZ(0);
  animation-duration: var(--cycle);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: opacity, transform;
}
.bs-live-demo__frame--0 {
  background-position: 0% 50%;
  opacity: 1;
}
.bs-live-demo__frame--1 {
  background-position: 33.333% 50%;
}
.bs-live-demo__frame--2 {
  background-position: 66.667% 50%;
}
.bs-live-demo__frame--3 {
  background-position: 100% 50%;
}
.bs-live-demo__sprite--strength .bs-live-demo__frame--0 { animation-name: bsStrengthFrame0; }
.bs-live-demo__sprite--strength .bs-live-demo__frame--1 { animation-name: bsStrengthFrame1; }
.bs-live-demo__sprite--strength .bs-live-demo__frame--2 { animation-name: bsStrengthFrame2; }
.bs-live-demo__sprite--strength .bs-live-demo__frame--3 { animation-name: bsStrengthFrame3; }
.bs-live-demo__sprite--breath .bs-live-demo__frame--0,
.bs-live-demo__sprite--settle .bs-live-demo__frame--0 { animation-name: bsBreathFrame0; }
.bs-live-demo__sprite--breath .bs-live-demo__frame--1,
.bs-live-demo__sprite--settle .bs-live-demo__frame--1 { animation-name: bsBreathFrame1; }
.bs-live-demo__sprite--breath .bs-live-demo__frame--2,
.bs-live-demo__sprite--settle .bs-live-demo__frame--2 { animation-name: bsBreathFrame2; }
.bs-live-demo__sprite--breath .bs-live-demo__frame--3,
.bs-live-demo__sprite--settle .bs-live-demo__frame--3 { animation-name: bsBreathFrame3; }
.bs-live-demo__sprite--settle {
  opacity: 0.98;
}
.bs-live-demo[data-paused="true"] .bs-live-demo__sprite {
  animation-play-state: paused;
}
.bs-live-demo[data-paused="true"] .bs-live-demo__frame {
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
@keyframes bsStrengthFrame0 {
  0%, 8% { opacity: 1; transform: scale(1); }
  16%, 84% { opacity: 0; transform: translateY(-1px) scale(1.006); }
  94%, 100% { opacity: 1; transform: scale(1); }
}
@keyframes bsStrengthFrame1 {
  0%, 8% { opacity: 0; transform: scale(1); }
  16%, 25% { opacity: 1; transform: translateY(-2px) scale(1.01); }
  34%, 70% { opacity: 0; transform: translateY(-4px) scale(1.016); }
  78%, 86% { opacity: 1; transform: translateY(1px) scale(1.008); }
  96%, 100% { opacity: 0; transform: scale(1); }
}
@keyframes bsStrengthFrame2 {
  0%, 25% { opacity: 0; transform: translateY(-2px) scale(1.01); }
  34%, 70% { opacity: 1; transform: translateY(-5px) scale(1.02); }
  79%, 100% { opacity: 0; transform: translateY(1px) scale(1.008); }
}
@keyframes bsStrengthFrame3 {
  0%, 68% { opacity: 0; transform: translateY(-3px) scale(1.012); }
  80%, 88% { opacity: 1; transform: translateY(2px) scale(1.006); }
  98%, 100% { opacity: 0; transform: scale(1); }
}
@keyframes bsBreathFrame0 {
  0%, 10% { opacity: 1; transform: scale(1); }
  22%, 88% { opacity: 0; transform: translateY(-1px) scale(1.004); }
  98%, 100% { opacity: 1; transform: scale(1); }
}
@keyframes bsBreathFrame1 {
  0%, 10% { opacity: 0; transform: scale(1); }
  24%, 38% { opacity: 1; transform: translateY(-2px) scale(1.006); }
  50%, 100% { opacity: 0; transform: translateY(-3px) scale(1.008); }
}
@keyframes bsBreathFrame2 {
  0%, 36% { opacity: 0; transform: translateY(-2px) scale(1.006); }
  50%, 62% { opacity: 1; transform: translateY(-4px) scale(1.012); }
  74%, 100% { opacity: 0; transform: translateY(1px) scale(1.006); }
}
@keyframes bsBreathFrame3 {
  0%, 58% { opacity: 0; transform: translateY(-2px) scale(1.006); }
  74%, 88% { opacity: 1; transform: translateY(1px) scale(1.004); }
  100% { opacity: 0; transform: scale(1); }
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
  .bs-live-demo__frame {
    background-image: var(--sprite-sm);
  }
}
@media (prefers-reduced-motion: reduce) {
  .bs-live-demo__sprite {
    animation: none;
  }
  .bs-live-demo__frame {
    animation: none;
  }
  .bs-live-demo__frame--0 {
    opacity: 1;
  }
}
`;

const videoProbeCache = new Map<string, boolean>();

function useVideoAvailability(spec: MoveSpec) {
  const cacheKey = `${spec.videoMp4}|${spec.videoWebm}`;
  const [hasVideo, setHasVideo] = useState(() => videoProbeCache.get(cacheKey) ?? false);

  useEffect(() => {
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

  return hasVideo;
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
          "--cycle": `${spec.cycleSeconds}s`,
        } as CSSProperties
      }
      role="img"
      aria-label={`${spec.title}: ${spec.role}`}
    >
      <div className="bs-live-demo__frame bs-live-demo__frame--0" />
      <div className="bs-live-demo__frame bs-live-demo__frame--1" />
      <div className="bs-live-demo__frame bs-live-demo__frame--2" />
      <div className="bs-live-demo__frame bs-live-demo__frame--3" />
    </div>
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
