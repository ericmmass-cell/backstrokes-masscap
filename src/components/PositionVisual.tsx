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
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";
import { POSITION_ASSETS, POSITION_ASSETS_BY_ID } from "@/lib/position-assets";
import { POSES, FAMILY_POSE } from "@/lib/position-poses";
import { PoseFigure } from "./PoseFigure";

const PAPER_GRADIENT = "linear-gradient(135deg, #f7f2e7, #efe6d2)";

/** Stable per-string hash (deterministic, SSR-safe; no Math.random). */
const hashStr = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  return h;
};

/**
 * Crossfading flipbook over a horizontal photo strip.
 *
 * The strips carry 4 sharp KEY poses on the even frames (0,2,4,6) and ghosted
 * motion-blur tweens on the odd frames (1,3,5,7). Playing all 8 looks janky and
 * double-exposed, so we play only the sharp keys and BOOMERANG through them
 * (0→2→4→6→4→2→…) so the loop never hard-cuts from the last pose back to the
 * first. Each step is a slow ease-in-out cross-dissolve.
 */
function StripFlipbook({ src, frames, dwell = 1500, fade = 850, paused = false, variant = 0 }: { src: string; frames: number; dwell?: number; fade?: number; paused?: boolean; variant?: number }) {
  const { keys, seq } = useMemo(() => {
    const evens = Array.from({ length: frames }, (_, i) => i).filter((i) => i % 2 === 0);
    const k = evens.length >= 2 ? evens : Array.from({ length: frames }, (_, i) => i);
    const back = k.slice(1, -1).reverse(); // boomerang return leg, no endpoint repeats
    return { keys: k, seq: [...k, ...back] };
  }, [frames]);

  // Per-card variation so two cards that share a strip (same-family positions)
  // never read as the same clip: mirror the facing and phase-offset the start.
  // A horizontal mirror is anatomically valid for every one of these poses.
  const mirror = (variant & 1) === 1;
  const [step, setStep] = useState(() => variant % seq.length);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) {
      setStep(keys.length - 1); // hold the fullest expression of the pose
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % seq.length), dwell);
    return () => clearInterval(id);
  }, [paused, keys, seq, dwell]);

  const activeFrame = seq[step] ?? keys[0];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: PAPER_GRADIENT }}>
      <div style={{ position: "relative", height: "100%", aspectRatio: "480 / 640", overflow: "hidden", transform: mirror ? "scaleX(-1)" : undefined }}>
        {keys.map((frameIndex) => (
          <div
            key={frameIndex}
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${frames * 100}% 100%`,
              backgroundPositionX: `${(frameIndex / (frames - 1)) * 100}%`,
              backgroundPositionY: "center",
              opacity: frameIndex === activeFrame ? 1 : 0,
              transition: `opacity ${fade}ms ease-in-out`,
              willChange: "opacity",
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
  assetId,
  paused = false,
  style,
}: {
  positionKey: PictogramKey;
  /** library position id (p01..); when given, looks up the per-position photo so cards never repeat */
  assetId?: string;
  paused?: boolean;
  style?: CSSProperties;
}) {
  // One consistent visual language: every position is a code-drawn diagram.
  // Bespoke pose if the position has one, otherwise its illustration family's
  // base. The old photo strips remain in the repo but are no longer rendered.
  const pose = (assetId !== undefined ? POSES[assetId] : undefined) ?? FAMILY_POSE[positionKey];
  const asset = (assetId !== undefined ? POSITION_ASSETS_BY_ID[assetId] : undefined) ?? POSITION_ASSETS[positionKey];
  const variant = hashStr(assetId ?? positionKey);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...style }}>
      {pose ? (
        <PoseFigure pose={pose} paused={paused} />
      ) : asset?.kind === "strip" ? (
        <StripFlipbook src={asset.src} frames={asset.frames} dwell={asset.dwell} paused={paused} variant={variant} />
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
