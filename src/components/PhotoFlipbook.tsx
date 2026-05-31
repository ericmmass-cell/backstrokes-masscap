/**
 * PhotoFlipbook — plays the REAL workout photography as motion.
 *
 * After three rejected attempts at hand-drawn figures, the decision (Eric,
 * 2026-05-31) was: use the real art, make it move. The repo already ships
 * professional 4-frame motion sequences for every move at
 * /public/demos/workout/<move>.jpg — each a 1920×640 strip of four 480×640
 * frames (rest → lift → hold → lower), shot on the brand's cream background.
 *
 * So we don't draw anything. We step through the four real frames with a CSS
 * steps(4) sprite animation: a single full-strip <img> on a 400%-wide track
 * that translates 0 → -100% of its own width in 4 discrete steps. Each step
 * lands the track exactly on frame 0,1,2,3, held a quarter of the loop, then
 * wraps. The photo plays like a short looping clip of the actual movement.
 *
 * Why width:400% + height:100% renders undistorted: the strip is 1920×640
 * (3:1). The stage aspect is 480/640 (0.75). A track at 400% width / 100%
 * height of the stage is 4·(0.75·H) × H = 3H × H = 3:1 — exactly the strip's
 * aspect, so no squish.
 */

import type { CSSProperties } from "react";

export type FlipbookKey = "curl-up" | "side-plank" | "bird-dog" | "breath" | "decomp";

const SRC: Record<FlipbookKey, string> = {
  "curl-up": "/demos/workout/curl-up.jpg",
  "side-plank": "/demos/workout/side-plank.jpg",
  "bird-dog": "/demos/workout/bird-dog.jpg",
  breath: "/demos/workout/breath.jpg",
  decomp: "/demos/workout/decomp.jpg",
};

/* per-move loop duration (ms) — 4 frames, ~1s each reads as a deliberate rep */
const DUR: Record<FlipbookKey, number> = {
  "curl-up": 4000,
  "side-plank": 4400,
  "bird-dog": 4400,
  breath: 5200,
  decomp: 4400,
};

const CSS = `
.pf-stage {
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  aspect-ratio: 480 / 640;
  overflow: hidden;
  border-radius: 14px;
  background: #efe7d6;
}
.pf-track {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 400%;            /* 4 frames wide */
  display: flex;
  will-change: transform;
  transform: translateX(0);
}
.pf-track img {
  display: block;
  width: 100%;            /* the full 1920×640 strip, undistorted (see header) */
  height: 100%;
  object-fit: fill;
  user-select: none;
}
.pf-run .pf-track {
  animation: pf-flip var(--pf-dur, 4000ms) steps(4) infinite;
}
@keyframes pf-flip {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }  /* -100% of the 400% track = 4 frame-widths */
}
@media (prefers-reduced-motion: reduce) {
  .pf-run .pf-track { animation: none; transform: translateX(-25%); } /* hold the lift frame */
}
`;

type Props = {
  moveKey: FlipbookKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function PhotoFlipbook({ moveKey, paused = false, className, style }: Props) {
  const src = SRC[moveKey];
  const dur = DUR[moveKey];
  return (
    <div className={`pf-wrap ${className ?? ""}`} style={style}>
      <div className={`pf-stage ${paused ? "" : "pf-run"}`}>
        <div
          className="pf-track"
          style={{ ["--pf-dur" as string]: `${dur}ms`, animationPlayState: paused ? "paused" : undefined }}
        >
          <img src={src} alt="" aria-hidden="true" draggable={false} />
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}

export default PhotoFlipbook;
