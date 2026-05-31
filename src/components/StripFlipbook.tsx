/**
 * StripFlipbook — generic version of the exercise PhotoFlipbook, for any
 * N-frame horizontal strip (the exercises hardcode the 5 workout moves; this
 * takes an arbitrary src + frame count + per-frame aspect).
 *
 * Same proven technique that ships on /session: JS-driven frame index
 * (setInterval 0..N-1) with a CSS opacity crossfade between stacked layers,
 * each cropped to one frame of the strip via background-position. A gentle
 * Ken Burns drift adds life. paused / prefers-reduced-motion hold one frame.
 *
 * This is the player the POSITION motion strips drop into: an AI-generated
 * clothed couple in one strip of 4 poses of a single gentle motion plays as a
 * looping clip, the same way the real exercise photography does.
 */

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  /** strip image: N equal frames side by side */
  src: string;
  frames?: number; // default 4
  /** per-frame aspect ratio, width / height (e.g. 480/1088) */
  frameAspect?: number;
  /** ms each frame is held */
  dwell?: number;
  paused?: boolean;
  liftFrame?: number; // frame to hold when paused / reduced-motion
  className?: string;
  style?: CSSProperties;
};

const CSS = `
.sf-stage { position: relative; width: 100%; margin: 0 auto; overflow: hidden; border-radius: 14px; background: #efe7d6; }
.sf-zoom { position: absolute; inset: 0; transform: scale(1.02); }
.sf-zoom.sf-anim { animation: sfZoom var(--sf-loop, 4800ms) ease-in-out infinite; }
@keyframes sfZoom { 0%,100% { transform: scale(1.015); } 50% { transform: scale(1.05); } }
.sf-layer { position: absolute; inset: 0; background-repeat: no-repeat; opacity: 0; transition: opacity 900ms ease-in-out; }
.sf-layer.sf-on { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .sf-zoom.sf-anim { animation: none; }
  .sf-layer { transition: none; }
}
`;

export function StripFlipbook({
  src,
  frames = 4,
  frameAspect = 480 / 1088,
  dwell = 1200,
  paused = false,
  liftFrame = 1,
  className,
  style,
}: Props) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) {
      setFrame(liftFrame);
      return;
    }
    const id = setInterval(() => setFrame((f) => (f + 1) % frames), dwell);
    return () => clearInterval(id);
  }, [paused, dwell, frames, liftFrame, src]);

  // background-size: the strip is (frames*100%) wide so one frame fills the box.
  const bgSize = `${frames * 100}% 100%`;
  // background-position-x for frame i across N frames: i/(N-1) * 100%
  const posX = (i: number) => (frames === 1 ? "0%" : `${(i / (frames - 1)) * 100}%`);

  return (
    <div className={`sf-wrap ${className ?? ""}`} style={style}>
      <div className="sf-stage" style={{ aspectRatio: String(frameAspect), ["--sf-loop" as string]: `${dwell * frames}ms` }}>
        <div className={`sf-zoom ${paused ? "" : "sf-anim"}`}>
          {Array.from({ length: frames }, (_, i) => (
            <div
              key={i}
              className={`sf-layer ${i === frame ? "sf-on" : ""}`}
              data-frame={i}
              style={{ backgroundImage: `url(${src})`, backgroundSize: bgSize, backgroundPositionX: posX(i), backgroundPositionY: "center" }}
            />
          ))}
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}

export default StripFlipbook;
