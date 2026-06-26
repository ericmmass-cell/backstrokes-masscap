/**
 * PositionVisual · "accuracy or nothing."
 *
 * Shows a real, restyled, openly-licensed illustration ONLY where it faithfully
 * depicts this exact position:
 *   - on /positions (assetId present): the strict per-id canonical set
 *     (src/lib/position-art.ts ART_BY_ID), one plate per position it truly is.
 *   - on the ranker (no assetId): the archetype plate, accurate at the
 *     category level.
 * Everywhere else it shows an honest editorial plate (the family word + a nod to
 * the spine read below), never a generic figure that contradicts the
 * description. A misleading picture is worse than none.
 *
 * No human body is drawn in code; illustrations are baked ink-on-cream duotone
 * in /public/positions-art.
 */
import type { CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";
import { artForId, artForKey, familyLabel } from "@/lib/position-art";

const PAPER_GRADIENT = "linear-gradient(135deg, #f7f2e7, #efe6d2)";

function EditorialPlate({ label, style }: { label: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: PAPER_GRADIENT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        ...style,
      }}
    >
      <span style={{ color: "var(--brand-oxblood)", fontSize: 13, lineHeight: 1 }}>◆</span>
      <span className="font-serif-display italic" style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#8a7757", lineHeight: 1.1 }}>
        {label}
      </span>
      <span style={{ height: 1, width: 54, background: "#cdbf9c" }} />
      <span
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#a8946f",
        }}
      >
        the read is below
      </span>
    </div>
  );
}

export function PositionVisual({
  positionKey,
  assetId,
  style,
}: {
  positionKey: PictogramKey;
  /** library position id (p01..); present on /positions, absent on the ranker */
  assetId?: string;
  /** accepted for API compatibility; this component is static */
  paused?: boolean;
  style?: CSSProperties;
}) {
  const art = assetId ? artForId(assetId) : artForKey(positionKey);

  if (art) {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: PAPER_GRADIENT, ...style }}>
        <img
          src={art}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", mixBlendMode: "multiply" }}
        />
      </div>
    );
  }

  return <EditorialPlate label={familyLabel(positionKey)} style={style} />;
}

export default PositionVisual;
