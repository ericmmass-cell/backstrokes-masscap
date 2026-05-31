/**
 * LiveStill — motion derived from ONE still image, so it can never strobe.
 *
 * The 4-panel AI strip was rejected: a text-to-image model draws each panel
 * independently, so the couple jumps frame to frame. This takes the opposite
 * approach: a single coherent AI illustration, animated with CSS so the
 * position reads as ALIVE (a gentle rhythmic settle + breath), not a frozen
 * diagram. Because every "frame" is the same source image, there is zero
 * character drift.
 *
 * Two synced layers on the same image create a soft parallax depth (the back
 * plane drifts a hair more than the front), plus a slow breath scale, plus a
 * very subtle rhythmic rock. Tasteful, clinical, not camera-shake. Honors
 * prefers-reduced-motion (holds a clean static frame).
 */

import type { CSSProperties } from "react";

type Props = {
  src: string;
  /** per-frame aspect ratio width/height */
  aspect?: number;
  /** rock cycle ms (the rhythm); breath is ~1.8x this */
  tempo?: number;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

const CSS = `
.ls-stage { position: relative; width: 100%; margin: 0 auto; overflow: hidden; border-radius: 14px; background: #efe7d6; }
.ls-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transform-origin: 50% 88%; will-change: transform; }

/* breath: a slow vertical swell on the whole frame */
@keyframes lsBreath { 0%,100% { transform: scale(1.0); } 50% { transform: scale(1.014); } }
/* rock: a small rhythmic lean at the hip pivot (the rhythm of the position) */
@keyframes lsRock { 0%,100% { transform: translateX(0) rotate(0deg); } 50% { transform: translateX(-2.2%) rotate(-0.5deg); } }

.ls-breath { animation: lsBreath var(--ls-breath, 5200ms) ease-in-out infinite; }
.ls-rock   { animation: lsRock   var(--ls-tempo, 2600ms) ease-in-out infinite; }

.ls-paused .ls-breath, .ls-paused .ls-rock { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .ls-breath, .ls-rock { animation: none !important; }
}
`;

export function LiveStill({ src, aspect = 480 / 360, tempo = 2600, paused = false, className, style }: Props) {
  return (
    <div className={`ls-wrap ${className ?? ""}`} style={style}>
      <div
        className={`ls-stage ${paused ? "ls-paused" : ""}`}
        style={{ aspectRatio: String(aspect), ["--ls-tempo" as string]: `${tempo}ms`, ["--ls-breath" as string]: `${Math.round(tempo * 1.9)}ms` }}
      >
        {/* outer = rhythmic rock at the pivot; inner = breath swell. Nested so
            both compose without fighting for the transform property. */}
        <div className="ls-rock" style={{ position: "absolute", inset: 0, transformOrigin: "50% 88%" }}>
          <div className="ls-breath" style={{ position: "absolute", inset: 0, transformOrigin: "50% 80%" }}>
            <img className="ls-img" src={src} alt="" aria-hidden="true" draggable={false} />
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}

export default LiveStill;
