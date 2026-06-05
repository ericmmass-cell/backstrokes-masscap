/**
 * PositionVisual — the asset-backed position visual. Drop-in replacement for
 * the old code-drawn PositionDiagram (same props).
 *
 * It renders a real, externally-produced asset (image / short loop / Lottie)
 * when one exists in the registry, and otherwise a calm, figure-free
 * placeholder. It NEVER draws a human body. The placeholder is pure object
 * geometry (a bed and pillows) plus an honest "in production" label, so a card
 * without art yet still reads as intentional and premium, not broken.
 */
import { type CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";
import { POSITION_ASSETS } from "@/lib/position-assets";

function Placeholder() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "linear-gradient(135deg, #f7f2e7, #efe6d2)",
      }}
    >
      {/* objects only (bed + pillows). No figure. */}
      <svg width="96" height="60" viewBox="0 0 96 60" fill="none" aria-hidden="true">
        <rect x="6" y="28" width="84" height="18" rx="5" fill="#efe6d2" stroke="#cdbf9f" strokeWidth="2" />
        <rect x="12" y="21" width="28" height="12" rx="4" fill="#fbf7ec" stroke="#cdbf9f" strokeWidth="2" />
        <rect x="44" y="21" width="22" height="12" rx="4" fill="#fbf7ec" stroke="#cdbf9f" strokeWidth="2" />
        <line x1="11" y1="46" x2="11" y2="54" stroke="#cdbf9f" strokeWidth="2" />
        <line x1="85" y1="46" x2="85" y2="54" stroke="#cdbf9f" strokeWidth="2" />
        <line x1="2" y1="54" x2="94" y2="54" stroke="#cdbf9f" strokeWidth="1.5" />
      </svg>
      <span
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#9a7a5a",
        }}
      >
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
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      {asset?.kind === "image" ? (
        <img
          src={asset.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      ) : asset?.kind === "video" ? (
        <video
          src={asset.src}
          poster={asset.poster}
          autoPlay={!paused}
          loop
          muted
          playsInline
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      ) : (
        // "lottie" support and the no-asset case both land here until a web
        // Lottie player is wired or the asset is added.
        <Placeholder />
      )}
    </div>
  );
}

export default PositionVisual;
