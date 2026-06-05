/**
 * PositionVisual — the asset-backed position visual. Drop-in for the old
 * code-drawn PositionDiagram (same props).
 *
 * Renders a real, externally-produced asset:
 *   - "strip"  -> a clothed photo motion sequence, animated as a crossfading
 *                 flipbook (the original BackStroke approach: real photography,
 *                 made to move). Distortion-free: the stage matches the frame's
 *                 3:4, so each frame fills it 1:1.
 *   - "image" / "video" -> a single illustration or loop.
 *   - none     -> a calm, figure-free placeholder (bed + pillows, no body).
 *
 * No human body is ever drawn in code here.
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";
import { POSITION_ASSETS } from "@/lib/position-assets";

const PAPER_GRADIENT = "linear-gradient(135deg, #f7f2e7, #efe6d2)";

function StripFlipbook({ src, frames, dwell = 720, paused = false }: { src: string; frames: number; dwell?: number; paused?: boolean }) {
  const [frame, setFrame] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced.current) {
      setFrame(Math.floor(frames / 3)); // hold a clear, demonstrated frame
      return;
    }
    const id = setInterval(() => setFrame((f) => (f + 1) % frames), dwell);
    return () => clearInterval(id);
  }, [paused, frames, dwell]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: PAPER_GRADIENT }}>
      <div style={{ position: "relative", height: "100%", aspectRatio: "480 / 640", overflow: "hidden" }}>
        {Array.from({ length: frames }).map((_, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${frames * 100}% 100%`,
              backgroundPositionX: `${(i / (frames - 1)) * 100}%`,
              backgroundPositionY: "center",
              opacity: i === frame ? 1 : 0,
              transition: "opacity 480ms ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: PAPER_GRADIENT }}>
      <svg width="96" height="60" viewBox="0 0 96 60" fill="none" aria-hidden="true">
        <rect x="6" y="28" width="84" height="18" rx="5" fill="#efe6d2" stroke="#cdbf9f" strokeWidth="2" />
        <rect x="12" y="21" width="28" height="12" rx="4" fill="#fbf7ec" stroke="#cdbf9f" strokeWidth="2" />
        <rect x="44" y="21" width="22" height="12" rx="4" fill="#fbf7ec" stroke="#cdbf9f" strokeWidth="2" />
        <line x1="11" y1="46" x2="11" y2="54" stroke="#cdbf9f" strokeWidth="2" />
        <line x1="85" y1="46" x2="85" y2="54" stroke="#cdbf9f" strokeWidth="2" />
        <line x1="2" y1="54" x2="94" y2="54" stroke="#cdbf9f" strokeWidth="1.5" />
      </svg>
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a7a5a" }}>
        Illustration in production
      </span>
    </div>
  );
}

export function PositionVisual({
  positionKey,
  paused = false,
  style,
}: {
  positionKey: PictogramKey;
  paused?: boolean;
  style?: CSSProperties;
}) {
  const asset = POSITION_ASSETS[positionKey];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...style }}>
      {asset?.kind === "strip" ? (
        <StripFlipbook src={asset.src} frames={asset.frames} dwell={asset.dwell} paused={paused} />
      ) : asset?.kind === "image" ? (
        <img src={asset.src} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
      ) : asset?.kind === "video" ? (
        <video src={asset.src} poster={asset.poster} autoPlay={!paused} loop muted playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

export default PositionVisual;
