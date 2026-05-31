/**
 * BackMap, the hero pain-area picker for the POP Atlas.
 *
 * A tasteful inline-SVG posterior torso (a single oxblood line on paper, NOT a
 * redrawn couple) with five tappable regions. Tap where the back is loudest;
 * the Atlas re-sorts to what tends to spare it. A parallel segmented control
 * of the same five labels renders beneath, so the feature is fully operable
 * without the visual (the map is delight, the chips are the contract).
 *
 * Each region is an SVG <path> inside a real <button> for keyboard and AT.
 * Idle is dead still. Select sustains an oxblood fill and desaturates the
 * others. Reduced-motion: instant fill swaps, no tweening (handled by the
 * .pop-region token + the reduce block in styles.css).
 *
 * "Inform, don't enforce": selecting an area never hides positions, it only
 * re-sorts and highlights. A persistent "whole back" reset is always present.
 */

import type { PainArea } from "@/lib/position-library";
import { PAIN_AREAS } from "@/lib/position-library";

const OX = "#722B2B";

/** region paths in a 0 0 200 260 viewBox (a simplified posterior torso) */
const REGIONS: Record<PainArea, string> = {
  // upper back / thoracic, shoulder yoke down to mid-back
  thoracic: "M64 70 Q100 60 136 70 L132 116 Q100 108 68 116 Z",
  // lumbar, the low back band
  lumbar: "M70 120 Q100 113 130 120 L126 156 Q100 150 74 156 Z",
  // SI joint / pelvis seam, the sacral triangle
  si: "M80 160 Q100 156 120 160 L110 192 Q100 198 90 192 Z",
  // sciatic / glute, the two glutes
  sciatic: "M70 166 Q84 162 96 168 L96 204 Q82 212 70 200 Z M104 168 Q116 162 130 166 L130 200 Q118 212 104 204 Z",
  // hip / groin, the outer hip flares
  hip: "M58 150 Q50 168 58 196 L70 192 Q64 168 70 150 Z M142 150 Q150 168 142 196 L130 192 Q136 168 130 150 Z",
};

const ORDER: PainArea[] = ["thoracic", "lumbar", "si", "sciatic", "hip"];

type Props = {
  value: PainArea | null;
  onChange: (a: PainArea | null) => void;
  counts: Record<PainArea, number>;
};

export function BackMap({ value, onChange, counts }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
      {/* the figure */}
      <div className="shrink-0" style={{ width: 200 }}>
        <svg viewBox="0 0 200 260" width="200" height="260" role="img" aria-label="Back, choose where it is loudest today" style={{ display: "block" }}>
          {/* body silhouette: head, torso, the single oxblood contour */}
          <g fill="none" stroke={OX} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" opacity="0.55">
            <circle cx="100" cy="34" r="20" />
            <path d="M70 60 Q100 50 130 60 L138 150 Q140 200 128 232 L112 232 Q108 200 108 176 L92 176 Q92 200 88 232 L72 232 Q60 200 62 150 Z" />
            {/* shoulder line + spine hint */}
            <path d="M64 72 Q100 64 136 72" opacity="0.6" />
            <path d="M100 64 L100 196" opacity="0.4" strokeDasharray="2 6" />
          </g>
          {/* tappable regions */}
          {ORDER.map((area) => {
            const active = value === area;
            const dimmed = value !== null && !active;
            const meta = PAIN_AREAS.find((a) => a.key === area)!;
            return (
              <path
                key={area}
                className="pop-region"
                d={REGIONS[area]}
                role="button"
                tabIndex={0}
                aria-label={`${meta.label}. ${counts[area]} positions tend to spare it.`}
                aria-pressed={active}
                onClick={() => onChange(active ? null : area)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(active ? null : area);
                  }
                }}
                fill={OX}
                fillOpacity={active ? 0.26 : 0.0}
                stroke={OX}
                strokeWidth={active ? 1.6 : 1}
                strokeOpacity={active ? 0.9 : 0.35}
                style={{ opacity: dimmed ? 0.35 : 1, outline: "none" }}
              />
            );
          })}
        </svg>
      </div>

      {/* the parallel segmented control (the contract) */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Back area">
          <button
            type="button"
            role="radio"
            aria-checked={value === null}
            onClick={() => onChange(null)}
            className="px-4 py-2 rounded-full font-mono-label text-[11px] tracking-[0.16em] uppercase transition"
            style={
              value === null
                ? { background: OX, color: "var(--brand-paper)" }
                : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }
            }
          >
            Whole back
          </button>
          {ORDER.map((area) => {
            const meta = PAIN_AREAS.find((a) => a.key === area)!;
            const active = value === area;
            return (
              <button
                key={area}
                type="button"
                role="radio"
                aria-checked={active}
                title={meta.blurb}
                onClick={() => onChange(active ? null : area)}
                className="px-4 py-2 rounded-full font-mono-label text-[11px] tracking-[0.16em] uppercase transition inline-flex items-center gap-2"
                style={
                  active
                    ? { background: OX, color: "var(--brand-paper)" }
                    : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }
                }
              >
                {meta.label}
                <span style={{ opacity: 0.6, fontSize: 9 }}>{counts[area]}</span>
              </button>
            );
          })}
        </div>
        {value !== null && (
          <p className="mt-3 text-sm italic leading-relaxed max-w-xl" style={{ color: OX }}>
            {PAIN_AREAS.find((a) => a.key === value)?.blurb}
          </p>
        )}
      </div>
    </div>
  );
}

export default BackMap;
