/**
 * PhotoFlipbook — plays the REAL workout photography as motion.
 *
 * Decision (Eric, 2026-05-31): use the real art, make it move. Three hand-drawn
 * attempts were rejected. The repo ships professional 4-frame motion sequences
 * for every move at /public/demos/workout/<move>.jpg — a 1920×640 strip of four
 * 480×640 frames (rest → lift → hold → lower), on the brand cream background.
 *
 * v2 (this file): CROSSFADE, not hard steps. The four frames are stacked as
 * four layers (each a div showing one frame of the strip via background-position
 * on a 400%-wide background). Each layer's opacity runs the same keyframe,
 * offset by a quarter-cycle via negative animation-delay, so the move DISSOLVES
 * frame→frame and reads like footage instead of a slideshow. A subtle slow zoom
 * (the whole stack) adds life.
 *
 * Respects prefers-reduced-motion: holds the single "lift" frame, no motion.
 *
 * VERIFY NOTE: the preview/headless browser reports prefers-reduced-motion:
 * reduce, which freezes these animations. To verify motion, force-drive a layer
 * via inline `style.animation` (inline beats the media query) and sample opacity
 * /transform over time — do NOT trust a static sample.
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

/* per-move loop duration (ms). A full cycle walks all four frames once. */
const DUR: Record<FlipbookKey, number> = {
  "curl-up": 5200,
  "side-plank": 5600,
  "bird-dog": 5600,
  breath: 6400,
  decomp: 5600,
};

/* background-position-x for each of the 4 frames on a 400%-wide background */
const FRAME_POS = ["0%", "33.3333%", "66.6667%", "100%"];

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
.pf-zoom { position: absolute; inset: 0; }
.pf-run .pf-zoom { animation: pf-zoom var(--pf-dur, 5200ms) ease-in-out infinite; }
@keyframes pf-zoom {
  0%,100% { transform: scale(1.015); }
  50%     { transform: scale(1.055); }   /* gentle push toward the held pose */
}

.pf-layer {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: 400% 100%;             /* 4 frames wide; one frame fills the box */
  opacity: 0;
  will-change: opacity;
}
/* each layer dissolves: fade in, hold, fade out, then stay off until next loop.
   four layers at -0/-1/-2/-3 quarter-cycle delays tile the whole loop with a
   short crossfade at every boundary. */
@keyframes pf-cross {
  0%   { opacity: 0; }
  4%   { opacity: 1; }
  25%  { opacity: 1; }
  30%  { opacity: 0; }
  100% { opacity: 0; }
}
.pf-run .pf-layer { animation: pf-cross var(--pf-dur, 5200ms) linear infinite; }
.pf-run .pf-l0 { animation-delay: 0ms; }
.pf-run .pf-l1 { animation-delay: calc(var(--pf-dur, 5200ms) * -0.75); }
.pf-run .pf-l2 { animation-delay: calc(var(--pf-dur, 5200ms) * -0.50); }
.pf-run .pf-l3 { animation-delay: calc(var(--pf-dur, 5200ms) * -0.25); }

@media (prefers-reduced-motion: reduce) {
  .pf-run .pf-zoom { animation: none; transform: scale(1.02); }
  .pf-run .pf-layer { animation: none; }
  .pf-run .pf-l1 { opacity: 1; }   /* hold the lift frame, statically */
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
  const playState = paused ? "paused" : "running";
  return (
    <div className={`pf-wrap ${className ?? ""}`} style={style}>
      <div
        className={`pf-stage ${paused ? "" : "pf-run"}`}
        style={{ ["--pf-dur" as string]: `${dur}ms` }}
      >
        <div className="pf-zoom" style={{ animationPlayState: playState }}>
          {FRAME_POS.map((posX, i) => (
            <div
              key={i}
              className={`pf-layer pf-l${i}`}
              style={{
                backgroundImage: `url(${src})`,
                backgroundPositionX: posX,
                backgroundPositionY: "center",
                animationPlayState: playState,
              }}
            />
          ))}
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}

export default PhotoFlipbook;
