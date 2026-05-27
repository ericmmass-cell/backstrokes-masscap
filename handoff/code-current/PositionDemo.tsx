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
  | "cowgirl-upright"
  | "reverse-cowgirl"
  | "stirrup-missionary"
  | "side-leg-held"
  | "quadruped-support"
  | "edge-bed"
  | "standing-support"
  | "standing-wall"
  | "prone-pillow"
  | "cradle-sitting"
  | "squat-over"
  | "solo-side"
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
const FRAME_COUNT = 8;

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
  "cowgirl-upright": {
    fig: "P.05",
    title: "Cowgirl Upright",
    role: "Receiving partner controls depth; torso stacked",
    frameHold: "recline / straddle / stack / hold",
    cycleSeconds: 2.55,
    sprite: "/demos/positions/cowgirl-upright.jpg",
    spriteSmall: "/demos/positions/cowgirl-upright-sm.jpg",
    poster: "/demos/positions/cowgirl-upright.jpg",
    videoMp4: "/demos/positions/cowgirl-upright.mp4",
    videoWebm: "/demos/positions/cowgirl-upright.webm",
  },
  "reverse-cowgirl": {
    fig: "P.06",
    title: "Reverse Cowgirl Reclined",
    role: "Backward lean; partner support; lumbar quiet",
    frameHold: "recline / reverse / lean / hold",
    cycleSeconds: 2.55,
    sprite: "/demos/positions/reverse-cowgirl.jpg",
    spriteSmall: "/demos/positions/reverse-cowgirl-sm.jpg",
    poster: "/demos/positions/reverse-cowgirl.jpg",
    videoMp4: "/demos/positions/reverse-cowgirl.mp4",
    videoWebm: "/demos/positions/reverse-cowgirl.webm",
  },
  "stirrup-missionary": {
    fig: "P.07",
    title: "Knees-High Missionary",
    role: "Knees supported; depth controlled by range",
    frameHold: "setup / lift / support / hold",
    cycleSeconds: 2.7,
    sprite: "/demos/positions/stirrup-missionary.jpg",
    spriteSmall: "/demos/positions/stirrup-missionary-sm.jpg",
    poster: "/demos/positions/stirrup-missionary.jpg",
    videoMp4: "/demos/positions/stirrup-missionary.mp4",
    videoWebm: "/demos/positions/stirrup-missionary.webm",
  },
  "side-leg-held": {
    fig: "P.08",
    title: "Side-Lying Leg Held",
    role: "Top leg supported; hips close; rotation limited",
    frameHold: "side / align / support / hold",
    cycleSeconds: 2.75,
    sprite: "/demos/positions/side-leg-held.jpg",
    spriteSmall: "/demos/positions/side-leg-held-sm.jpg",
    poster: "/demos/positions/side-leg-held.jpg",
    videoMp4: "/demos/positions/side-leg-held.mp4",
    videoWebm: "/demos/positions/side-leg-held.webm",
  },
  "quadruped-support": {
    fig: "P.09",
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
    fig: "P.10",
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
    fig: "P.11",
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
  "standing-wall": {
    fig: "P.12",
    title: "Standing Face-To-Face",
    role: "Wall support; staggered feet; low thrust range",
    frameHold: "stand / brace / close / hold",
    cycleSeconds: 2.6,
    sprite: "/demos/positions/standing-wall.jpg",
    spriteSmall: "/demos/positions/standing-wall-sm.jpg",
    poster: "/demos/positions/standing-wall.jpg",
    videoMp4: "/demos/positions/standing-wall.mp4",
    videoWebm: "/demos/positions/standing-wall.webm",
  },
  "prone-pillow": {
    fig: "P.13",
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
  "cradle-sitting": {
    fig: "P.14",
    title: "Cradle Sitting",
    role: "Facing close; legs wrapped; breath-led",
    frameHold: "sit / wrap / close / hold",
    cycleSeconds: 2.8,
    sprite: "/demos/positions/cradle-sitting.jpg",
    spriteSmall: "/demos/positions/cradle-sitting-sm.jpg",
    poster: "/demos/positions/cradle-sitting.jpg",
    videoMp4: "/demos/positions/cradle-sitting.mp4",
    videoWebm: "/demos/positions/cradle-sitting.webm",
  },
  "squat-over": {
    fig: "P.15",
    title: "Supported Squat",
    role: "High demand; hands braced; short range only",
    frameHold: "setup / brace / squat / hold",
    cycleSeconds: 2.45,
    sprite: "/demos/positions/squat-over.jpg",
    spriteSmall: "/demos/positions/squat-over-sm.jpg",
    poster: "/demos/positions/squat-over.jpg",
    videoMp4: "/demos/positions/squat-over.mp4",
    videoWebm: "/demos/positions/squat-over.webm",
  },
  "solo-side": {
    fig: "P.16",
    title: "Solo Side-Lying Breath",
    role: "Pillow between knees; breath before arousal",
    frameHold: "side / pillow / hand / breath",
    cycleSeconds: 3,
    sprite: "/demos/positions/solo-side.jpg",
    spriteSmall: "/demos/positions/solo-side-sm.jpg",
    poster: "/demos/positions/solo-side.jpg",
    videoMp4: "/demos/positions/solo-side.mp4",
    videoWebm: "/demos/positions/solo-side.webm",
  },
  "solo-supine": {
    fig: "P.17",
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
  p11: "reverse-cowgirl",
  p12: "cowgirl-upright",
  p13: "stirrup-missionary",
  p14: "side-facing",
  p15: "standing-wall",
  p16: "edge-bed",
  p17: "seated-upright",
  p18: "side-leg-held",
  p19: "quadruped-support",
  p20: "solo-supine",
  p21: "solo-side",
  p22: "supine-support",
  p23: "side-leg-held",
  p24: "squat-over",
  p25: "stirrup-missionary",
  p26: "edge-bed",
  p27: "reverse-cowgirl",
  p28: "side-spoon",
  p29: "supine-support",
  p30: "quadruped-support",
  p31: "edge-bed",
  p32: "standing-support",
  p33: "prone-pillow",
  p34: "supine-support",
  p35: "cradle-sitting",
  p36: "side-leg-held",
  p37: "squat-over",
  p38: "stirrup-missionary",
  p39: "standing-wall",
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
  background-image: var(--sprite-lg);
  background-size: var(--sprite-width) 100%;
  background-position: 0% 50%;
  background-repeat: no-repeat;
  animation:
    bsPositionSpriteTrack var(--cycle) step-end infinite,
    bsPositionBody var(--cycle) ease-in-out infinite;
  will-change: background-position, transform;
}
.bs-position-demo[data-paused="true"] .bs-position-demo__sprite {
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
  28%, 64% { transform: translateY(-4px) scale(1.012); }
  84% { transform: translateY(2px) scale(1.004); }
}
@keyframes bsPositionSpriteTrack {
  0%, 11% { background-position: 0% 50%; }
  12.5%, 23.5% { background-position: 14.285714% 50%; }
  25%, 36% { background-position: 28.571429% 50%; }
  37.5%, 48.5% { background-position: 42.857143% 50%; }
  50%, 61% { background-position: 57.142857% 50%; }
  62.5%, 73.5% { background-position: 71.428571% 50%; }
  75%, 86% { background-position: 85.714286% 50%; }
  87.5%, 100% { background-position: 100% 50%; }
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
  .bs-position-demo__sprite {
    background-image: var(--sprite-sm);
  }
}
@media (prefers-reduced-motion: reduce) {
  .bs-position-demo__sprite {
    animation: none;
    background-position: 0% 50%;
  }
}
`;

const ENABLE_VIDEO_PROBES = false;
const videoProbeCache = new Map<string, boolean>();
const videoProbePromiseCache = new Map<string, Promise<boolean>>();

function useVideoAvailability(spec: PositionVisualSpec) {
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

  return ENABLE_VIDEO_PROBES && hasVideo;
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
          "--sprite-width": `${FRAME_COUNT * 100}%`,
        } as CSSProperties
      }
      aria-hidden
    />
  );
}

export function positionVisualKeyForId(positionId: string): PositionVisualKey {
  return POSITION_VISUAL_BY_ID[positionId] ?? "supine-support";
}

export function PositionDemo({ positionId, paused = false, className, style }: PositionDemoProps) {
  const spec = POSITION_VISUALS[positionVisualKeyForId(positionId)];
  const hasVideo = useVideoAvailability(spec);
  const mode = hasVideo ? "video loop" : "8-frame motion";

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
