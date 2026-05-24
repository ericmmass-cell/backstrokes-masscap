import { useEffect, useState, type CSSProperties } from "react";

type PositionDemoProps = {
  positionId: string;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

type PositionVisualKey =
  | "side-spoon"
  | "supine-support"
  | "side-facing"
  | "seated-upright"
  | "quadruped-support"
  | "edge-bed"
  | "standing-support"
  | "prone-pillow"
  | "solo-supine";

type PositionVisualSpec = {
  fig: string;
  title: string;
  role: string;
  frameHold: string;
  cycleSeconds: number;
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

const POSITION_VISUALS: Record<PositionVisualKey, PositionVisualSpec> = {
  "side-spoon": {
    fig: "P.01",
    title: "Side-Lying Spooning",
    role: "Pelvises aligned; top knee supported",
    frameHold: "setup / support / neutral / settle",
    cycleSeconds: 2.85,
    sprite: "/demos/positions/side-spoon.jpg",
    spriteSmall: "/demos/positions/side-spoon-sm.jpg",
    poster: "/demos/positions/side-spoon.jpg",
    videoMp4: "/demos/positions/side-spoon.mp4",
    videoWebm: "/demos/positions/side-spoon.webm",
  },
  "supine-support": {
    fig: "P.02",
    title: "Supported Missionary",
    role: "Partner close; knees supported; lumbar neutral",
    frameHold: "setup / bolster / breathe / hold",
    cycleSeconds: 2.8,
    sprite: "/demos/positions/supine-support.jpg",
    spriteSmall: "/demos/positions/supine-support-sm.jpg",
    poster: "/demos/positions/supine-support.jpg",
    videoMp4: "/demos/positions/supine-support.mp4",
    videoWebm: "/demos/positions/supine-support.webm",
  },
  "side-facing": {
    fig: "P.03",
    title: "Side-Lying Scissor",
    role: "Hips close; top leg supported; low rotation",
    frameHold: "setup / align / support / settle",
    cycleSeconds: 2.9,
    sprite: "/demos/positions/side-facing.jpg",
    spriteSmall: "/demos/positions/side-facing-sm.jpg",
    poster: "/demos/positions/side-facing.jpg",
    videoMp4: "/demos/positions/side-facing.mp4",
    videoWebm: "/demos/positions/side-facing.webm",
  },
  "seated-upright": {
    fig: "P.04",
    title: "Lap-Sitting Upright",
    role: "Straddle seated; both spines stacked",
    frameHold: "setup / stack / close / breathe",
    cycleSeconds: 2.65,
    sprite: "/demos/positions/seated-upright.jpg",
    spriteSmall: "/demos/positions/seated-upright-sm.jpg",
    poster: "/demos/positions/seated-upright.jpg",
    videoMp4: "/demos/positions/seated-upright.mp4",
    videoWebm: "/demos/positions/seated-upright.webm",
  },
  "quadruped-support": {
    fig: "P.05",
    title: "Supported Rear Entry",
    role: "Forearms down; support reduces lumbar work",
    frameHold: "hands / forearms / bolster / hold",
    cycleSeconds: 2.75,
    sprite: "/demos/positions/quadruped-support.jpg",
    spriteSmall: "/demos/positions/quadruped-support-sm.jpg",
    poster: "/demos/positions/quadruped-support.jpg",
    videoMp4: "/demos/positions/quadruped-support.mp4",
    videoWebm: "/demos/positions/quadruped-support.webm",
  },
  "edge-bed": {
    fig: "P.06",
    title: "Edge-Of-Bed Missionary",
    role: "Hips at edge; partner close; support takes load",
    frameHold: "setup / support / align / hold",
    cycleSeconds: 2.75,
    sprite: "/demos/positions/edge-bed.jpg",
    spriteSmall: "/demos/positions/edge-bed-sm.jpg",
    poster: "/demos/positions/edge-bed.jpg",
    videoMp4: "/demos/positions/edge-bed.mp4",
    videoWebm: "/demos/positions/edge-bed.webm",
  },
  "standing-support": {
    fig: "P.07",
    title: "Standing Supported Rear",
    role: "Hands high; hip hinge; spine stays long",
    frameHold: "stand / hands / hinge / hold",
    cycleSeconds: 2.6,
    sprite: "/demos/positions/standing-support.jpg",
    spriteSmall: "/demos/positions/standing-support-sm.jpg",
    poster: "/demos/positions/standing-support.jpg",
    videoMp4: "/demos/positions/standing-support.mp4",
    videoWebm: "/demos/positions/standing-support.webm",
  },
  "prone-pillow": {
    fig: "P.08",
    title: "Prone Pillow Support",
    role: "Pillow under hips softens extension load",
    frameHold: "prone / pillow / neutral / hold",
    cycleSeconds: 2.9,
    sprite: "/demos/positions/prone-pillow.jpg",
    spriteSmall: "/demos/positions/prone-pillow-sm.jpg",
    poster: "/demos/positions/prone-pillow.jpg",
    videoMp4: "/demos/positions/prone-pillow.mp4",
    videoWebm: "/demos/positions/prone-pillow.webm",
  },
  "solo-supine": {
    fig: "P.09",
    title: "Solo Supine Breath",
    role: "Supported knees; breath leads arousal",
    frameHold: "setup / support / inhale / settle",
    cycleSeconds: 3.1,
    sprite: "/demos/positions/solo-supine.jpg",
    spriteSmall: "/demos/positions/solo-supine-sm.jpg",
    poster: "/demos/positions/solo-supine.jpg",
    videoMp4: "/demos/positions/solo-supine.mp4",
    videoWebm: "/demos/positions/solo-supine.webm",
  },
};

const POSITION_VISUAL_BY_ID: Record<string, PositionVisualKey> = {
  p01: "side-spoon",
  p02: "supine-support",
  p03: "supine-support",
  p04: "side-facing",
  p05: "seated-upright",
  p06: "supine-support",
  p07: "side-facing",
  p08: "standing-support",
  p09: "quadruped-support",
  p10: "quadruped-support",
  p11: "seated-upright",
  p12: "seated-upright",
  p13: "edge-bed",
  p14: "side-facing",
  p15: "standing-support",
  p16: "edge-bed",
  p17: "seated-upright",
  p18: "side-facing",
  p19: "quadruped-support",
  p20: "solo-supine",
  p21: "solo-supine",
  p22: "supine-support",
  p23: "side-facing",
  p24: "standing-support",
  p25: "edge-bed",
  p26: "edge-bed",
  p27: "seated-upright",
  p28: "side-spoon",
  p29: "supine-support",
  p30: "quadruped-support",
  p31: "edge-bed",
  p32: "standing-support",
  p33: "prone-pillow",
  p34: "supine-support",
  p35: "seated-upright",
  p36: "side-facing",
  p37: "seated-upright",
  p38: "supine-support",
  p39: "standing-support",
  p40: "solo-supine",
};

const CSS = `
.bs-position-demo {
  position: relative;
  min-height: clamp(320px, 44vw, 430px);
  isolation: isolate;
  overflow: hidden;
  contain: layout paint style;
  content-visibility: auto;
  contain-intrinsic-size: 430px 360px;
  background:
    linear-gradient(180deg, rgba(244,239,227,0.94), rgba(239,231,210,0.78)),
    ${PAPER};
}
.bs-position-demo * {
  box-sizing: border-box;
}
.bs-position-demo__plate {
  position: absolute;
  inset: 0;
  border-bottom: 1px solid ${RULE};
  background:
    radial-gradient(circle at 12% 10%, rgba(26,23,20,0.07), transparent 24%),
    linear-gradient(90deg, rgba(114,43,43,0.08), transparent 22%, transparent 78%, rgba(26,23,20,0.05)),
    transparent;
}
.bs-position-demo__media-shell {
  position: absolute;
  inset: 42px 18px 44px;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.bs-position-demo__video,
.bs-position-demo__sprite {
  height: 100%;
  max-width: 100%;
  aspect-ratio: 3 / 4;
  border: 1px solid rgba(26,23,20,0.18);
  box-shadow: 0 18px 42px -30px rgba(26,23,20,0.58);
  background-color: ${PAPER};
}
.bs-position-demo__video {
  position: absolute;
  display: block;
  object-fit: contain;
  opacity: 0;
  transition: opacity 220ms ease;
  z-index: 2;
}
.bs-position-demo__video[data-ready="true"] {
  opacity: 1;
}
.bs-position-demo__sprite {
  position: relative;
  overflow: hidden;
  transform-origin: 50% 68%;
  animation: bsPositionBody var(--cycle) ease-in-out infinite;
}
.bs-position-demo__frame {
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
.bs-position-demo__frame--0 {
  background-position: 0% 50%;
  animation-name: bsPositionFrame0;
  opacity: 1;
}
.bs-position-demo__frame--1 {
  background-position: 33.333% 50%;
  animation-name: bsPositionFrame1;
}
.bs-position-demo__frame--2 {
  background-position: 66.667% 50%;
  animation-name: bsPositionFrame2;
}
.bs-position-demo__frame--3 {
  background-position: 100% 50%;
  animation-name: bsPositionFrame3;
}
.bs-position-demo[data-paused="true"] .bs-position-demo__sprite,
.bs-position-demo[data-paused="true"] .bs-position-demo__frame {
  animation-play-state: paused;
}
.bs-position-demo__chrome {
  position: absolute;
  inset: 0;
  pointer-events: none;
  color: ${INK};
}
.bs-position-demo__label {
  position: absolute;
  left: 18px;
  top: 16px;
  right: 18px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.bs-position-demo__fig,
.bs-position-demo__mode,
.bs-position-demo__frames {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.bs-position-demo__fig {
  color: ${OX};
}
.bs-position-demo__title {
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(15px, 1.7vw, 21px);
  font-style: italic;
  line-height: 1;
  color: ${INK};
  white-space: nowrap;
}
.bs-position-demo__mode {
  color: ${MUTED};
}
.bs-position-demo__frames {
  position: absolute;
  left: 18px;
  bottom: 18px;
  color: ${MUTED};
}
.bs-position-demo__role {
  position: absolute;
  right: 18px;
  bottom: 15px;
  max-width: 52%;
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(11px, 1.05vw, 14px);
  font-style: italic;
  line-height: 1.12;
  text-align: right;
  color: ${INK};
}
@keyframes bsPositionBody {
  0%, 100% { transform: translateY(0) scale(1); }
  30%, 68% { transform: translateY(-5px) scale(1.016); }
  84% { transform: translateY(2px) scale(1.006); }
}
@keyframes bsPositionFrame0 {
  0%, 8% { opacity: 1; transform: scale(1); }
  16%, 84% { opacity: 0; transform: translateY(-1px) scale(1.006); }
  94%, 100% { opacity: 1; transform: scale(1); }
}
@keyframes bsPositionFrame1 {
  0%, 8% { opacity: 0; transform: scale(1); }
  16%, 26% { opacity: 1; transform: translateY(-2px) scale(1.01); }
  36%, 70% { opacity: 0; transform: translateY(-4px) scale(1.016); }
  78%, 86% { opacity: 1; transform: translateY(1px) scale(1.008); }
  96%, 100% { opacity: 0; transform: scale(1); }
}
@keyframes bsPositionFrame2 {
  0%, 25% { opacity: 0; transform: translateY(-2px) scale(1.01); }
  34%, 70% { opacity: 1; transform: translateY(-5px) scale(1.02); }
  79%, 100% { opacity: 0; transform: translateY(1px) scale(1.008); }
}
@keyframes bsPositionFrame3 {
  0%, 68% { opacity: 0; transform: translateY(-3px) scale(1.012); }
  80%, 88% { opacity: 1; transform: translateY(2px) scale(1.006); }
  98%, 100% { opacity: 0; transform: scale(1); }
}
@media (max-width: 760px) {
  .bs-position-demo {
    min-height: 350px;
  }
  .bs-position-demo__media-shell {
    inset: 44px 12px 60px;
  }
  .bs-position-demo__label {
    left: 14px;
    right: 14px;
  }
  .bs-position-demo__mode {
    display: none;
  }
  .bs-position-demo__frames {
    left: 14px;
    bottom: 38px;
  }
  .bs-position-demo__role {
    left: 14px;
    right: 14px;
    bottom: 14px;
    max-width: none;
    text-align: left;
  }
  .bs-position-demo__frame {
    background-image: var(--sprite-sm);
  }
}
@media (prefers-reduced-motion: reduce) {
  .bs-position-demo__sprite,
  .bs-position-demo__frame {
    animation: none;
  }
  .bs-position-demo__frame--0 {
    opacity: 1;
  }
}
`;

const videoProbeCache = new Map<string, boolean>();
const videoProbePromiseCache = new Map<string, Promise<boolean>>();

function useVideoAvailability(spec: PositionVisualSpec) {
  const cacheKey = `${spec.videoMp4}|${spec.videoWebm}`;
  const [hasVideo, setHasVideo] = useState(() => videoProbeCache.get(cacheKey) ?? false);

  useEffect(() => {
    const cached = videoProbeCache.get(cacheKey);
    if (cached !== undefined) {
      setHasVideo(cached);
      return;
    }

    const controller = new AbortController();

    async function probeVideo() {
      for (const url of [spec.videoMp4, spec.videoWebm]) {
        try {
          const response = await fetch(url, { method: "HEAD", signal: controller.signal });
          if (response.ok) return true;
        } catch {
          if (controller.signal.aborted) return false;
        }
      }
      return false;
    }

    const existing = videoProbePromiseCache.get(cacheKey);
    const probePromise = existing ?? probeVideo();
    videoProbePromiseCache.set(cacheKey, probePromise);

    void probePromise.then((available) => {
      if (controller.signal.aborted) return;
      videoProbeCache.set(cacheKey, available);
      setHasVideo(available);
    });

    return () => {
      controller.abort();
    };
  }, [cacheKey, spec.videoMp4, spec.videoWebm]);

  return hasVideo;
}

function StyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

function VideoLayer({ spec, active }: { spec: PositionVisualSpec; active: boolean }) {
  if (!active) return null;

  return (
    <video
      className="bs-position-demo__video"
      data-ready={active}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={spec.poster}
      aria-hidden
    >
      <source src={spec.videoWebm} type="video/webm" />
      <source src={spec.videoMp4} type="video/mp4" />
    </video>
  );
}

function SpriteLayer({ spec }: { spec: PositionVisualSpec }) {
  return (
    <div
      className="bs-position-demo__sprite"
      style={
        {
          "--cycle": `${spec.cycleSeconds}s`,
          "--sprite-lg": `url("${spec.sprite}")`,
          "--sprite-sm": `url("${spec.spriteSmall}")`,
        } as CSSProperties
      }
      aria-hidden
    >
      <div className="bs-position-demo__frame bs-position-demo__frame--0" />
      <div className="bs-position-demo__frame bs-position-demo__frame--1" />
      <div className="bs-position-demo__frame bs-position-demo__frame--2" />
      <div className="bs-position-demo__frame bs-position-demo__frame--3" />
    </div>
  );
}

export function positionVisualKeyForId(positionId: string): PositionVisualKey {
  return POSITION_VISUAL_BY_ID[positionId] ?? "supine-support";
}

export function PositionDemo({ positionId, paused = false, className, style }: PositionDemoProps) {
  const spec = POSITION_VISUALS[positionVisualKeyForId(positionId)];
  const hasVideo = useVideoAvailability(spec);
  const mode = hasVideo ? "video loop" : "motion study";

  return (
    <figure
      className={["bs-position-demo", className].filter(Boolean).join(" ")}
      data-paused={paused}
      style={style}
      aria-label={`${spec.title}: ${spec.role}`}
    >
      <StyleTag />
      <div className="bs-position-demo__plate" />
      <div className="bs-position-demo__media-shell">
        <SpriteLayer spec={spec} />
        <VideoLayer spec={spec} active={hasVideo} />
      </div>
      <figcaption className="bs-position-demo__chrome">
        <div className="bs-position-demo__label">
          <span>
            <span className="bs-position-demo__fig">{spec.fig}</span>{" "}
            <span className="bs-position-demo__title">{spec.title}</span>
          </span>
          <span className="bs-position-demo__mode">{paused ? "paused" : mode}</span>
        </div>
        <div className="bs-position-demo__frames">{spec.frameHold}</div>
        <div className="bs-position-demo__role">{spec.role}</div>
      </figcaption>
    </figure>
  );
}

export default PositionDemo;
