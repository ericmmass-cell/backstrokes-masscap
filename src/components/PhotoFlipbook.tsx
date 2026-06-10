/**
 * PhotoFlipbook · plays the REAL workout photography as motion.
 *
 * Decision (Eric, 2026-05-31): use the real art, make it move. Three hand-drawn
 * attempts were rejected. The repo ships professional 4-frame motion sequences
 * for every move at /public/demos/workout/<move>.jpg · a 1920×640 strip of four
 * 480×640 frames (rest → lift → hold → return), on the brand cream background.
 *
 * v3 (this file): JS-DRIVEN frame index + CSS opacity crossfade. A setInterval
 * advances `frame` 0→1→2→3→0; four stacked layers (each cropped to one frame of
 * the strip via background-position) show opacity:1 only for the active frame,
 * with a CSS opacity transition doing the dissolve. A gentle CSS zoom adds life.
 *
 * Why JS instead of pure-CSS keyframe delays: the previous crossfade relied on
 * negative animation-delay math that was easy to get wrong and impossible to
 * verify in a headless browser that intermittently reports prefers-reduced-
 * motion (which froze the keyframes). Here the active frame is React state, so
 * it is deterministic and verifiable, and reduced-motion / paused simply stop
 * the timer and hold a single frame.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export type FlipbookKey = "curl-up" | "side-plank" | "bird-dog" | "breath" | "decomp";

const SRC: Record<FlipbookKey, string> = {
  "curl-up": "/demos/workout/curl-up.jpg",
  "side-plank": "/demos/workout/side-plank.jpg",
  "bird-dog": "/demos/workout/bird-dog.jpg",
  breath: "/demos/workout/breath.jpg",
  decomp: "/demos/workout/decomp.jpg",
};

/* per-move dwell PER FRAME (ms). 4 frames → full loop ≈ 4×dwell. */
const DWELL: Record<FlipbookKey, number> = {
  "curl-up": 1100,
  "side-plank": 1200,
  "bird-dog": 1200,
  breath: 1500,
  decomp: 1200,
};

const FRAMES = 4;
const FRAME_POS = ["0%", "33.3333%", "66.6667%", "100%"]; // background-position-x on a 400%-wide bg
const LIFT_FRAME = 1; // the frame to hold when paused / reduced-motion

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
.pf-zoom { position: absolute; inset: 0; transform: scale(1.02); }
.pf-zoom.pf-anim { animation: pf-zoom var(--pf-loop, 4400ms) ease-in-out infinite; }
@keyframes pf-zoom {
  0%,100% { transform: scale(1.015); }
  50%     { transform: scale(1.05); }
}
.pf-layer {
  position: absolute; inset: 0;
  background-repeat: no-repeat;
  background-size: 400% 100%;     /* 4 frames wide; one fills the box */
  opacity: 0;
  transition: opacity 600ms ease-in-out;
}
.pf-layer.pf-on { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .pf-zoom.pf-anim { animation: none; }
  .pf-layer { transition: none; }
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
  const dwell = DWELL[moveKey];
  const [frame, setFrame] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced.current) {
      setFrame(LIFT_FRAME); // hold a clear demonstrated frame
      return;
    }
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES), dwell);
    return () => clearInterval(id);
  }, [paused, dwell, moveKey]);

  return (
    <div className={`pf-wrap ${className ?? ""}`} style={style}>
      <div className="pf-stage" style={{ ["--pf-loop" as string]: `${dwell * FRAMES}ms` }}>
        <div className={`pf-zoom ${paused ? "" : "pf-anim"}`}>
          {FRAME_POS.map((posX, i) => (
            <div
              key={i}
              className={`pf-layer ${i === frame ? "pf-on" : ""}`}
              data-frame={i}
              style={{
                backgroundImage: `url(${src})`,
                backgroundPositionX: posX,
                backgroundPositionY: "center",
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
