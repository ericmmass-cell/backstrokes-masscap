/**
 * PopMeter, the signature object of the POP Atlas.
 *
 * One pill, two honest rows of dots:
 *   RELIEF (top, oxblood), the kind your back wants. Room for the spine.
 *   HEAT   (bottom, amber), the good kind of pop. Worth doing.
 *
 * The two bars are the SOURCE OF TRUTH on a card. The single combined POP
 * number is only ever the eyebrow glyph (popPips) elsewhere; here we never
 * average the two into one figure, so "hot" can never visually launder
 * "unsafe". A high relief + high heat position literally makes POP pop.
 *
 * Two sizes:
 *   card, dots only, glanceable.
 *   detail, dots + the numbers spelled out + one plain line each.
 *
 * overCap (display-only) dims + desaturates the RELIEF row and shows a
 * tolerant note. It never hides, never zeroes, never feeds the sort. Inform,
 * don't enforce.
 *
 * Motion: on first reveal (is-lit) the dots pop in with one restrained
 * overshoot and the pill emits a single soft glow ring. That single settle is
 * the only springy beat; prefers-reduced-motion shows the final state flat.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const OX = "#722B2B"; // RELIEF
const AMBER = "#b07d2b"; // HEAT
const OFF = "rgba(42,38,32,0.16)";

/** 0-100 score → 0-5 filled dots. */
function dots(score: number): number {
  return Math.max(0, Math.min(5, Math.round((score / 100) * 5)));
}

function DotRow({
  filled,
  color,
  dim,
  delayBase,
}: {
  filled: number;
  color: string;
  dim?: boolean;
  delayBase: number;
}) {
  return (
    <span className="inline-flex items-center gap-[3px]" style={{ opacity: dim ? 0.4 : 1, filter: dim ? "saturate(0.4)" : undefined, transition: "opacity 220ms var(--ease-settle), filter 220ms var(--ease-settle)" }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const on = i < filled;
        return (
          <span
            key={i}
            className={`pop-dot ${on ? "is-on" : ""}`}
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: on ? color : OFF,
              // stagger the pop-in left to right
              animationDelay: on ? `${delayBase + i * 70}ms` : undefined,
            }}
          />
        );
      })}
    </span>
  );
}

export type PopMeterProps = {
  relief: number; // 0-100
  heat: number; // 0-100
  size?: "card" | "detail";
  overCap?: boolean;
  /** role-aware caption prefix for the detail relief line */
  reliefCaption?: string;
  style?: CSSProperties;
};

export function PopMeter({ relief, heat, size = "card", overCap = false, reliefCaption, style }: PopMeterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [lit, setLit] = useState(false);

  // Light the meter (run the fill) once when it scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reliefDots = dots(relief);
  const heatDots = dots(heat);
  const detail = size === "detail";

  return (
    <div
      ref={ref}
      className={`pop-meter ${lit ? "is-lit" : ""}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: detail ? 10 : 6,
        padding: detail ? "14px 16px" : "10px 12px",
        borderRadius: 12,
        background: "color-mix(in oklch, var(--brand-paper) 70%, transparent)",
        border: "1px solid color-mix(in oklch, var(--brand-oxblood) 16%, transparent)",
        ...style,
      }}
      aria-label={`Relief ${relief} of 100, Heat ${heat} of 100`}
    >
      {/* RELIEF row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <span
          className="font-mono-label"
          style={{ fontSize: 9, letterSpacing: "0.2em", color: OX, fontWeight: 600 }}
        >
          Relief{overCap ? " ·" : ""}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {detail && <span className="font-mono-label" style={{ fontSize: 10, color: OX, opacity: 0.8 }}>{relief}</span>}
          <DotRow filled={reliefDots} color={OX} dim={overCap} delayBase={lit ? 360 : 0} />
        </span>
      </div>

      {/* the pinched POP wordmark between the two rows */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }} aria-hidden="true">
        <span style={{ flex: 1, height: 1, background: "color-mix(in oklch, var(--brand-oxblood) 14%, transparent)" }} />
        <span
          className="font-mono-label"
          style={{ fontSize: detail ? 11 : 9, letterSpacing: "0.34em", color: "var(--brand-ink)", opacity: 0.55 }}
        >
          POP
        </span>
        <span style={{ flex: 1, height: 1, background: "color-mix(in oklch, var(--brand-amber) 18%, transparent)" }} />
      </div>

      {/* HEAT row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <span
          className="font-mono-label"
          style={{ fontSize: 9, letterSpacing: "0.2em", color: AMBER, fontWeight: 600 }}
        >
          Heat
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {detail && <span className="font-mono-label" style={{ fontSize: 10, color: AMBER, opacity: 0.85 }}>{heat}</span>}
          <DotRow filled={heatDots} color={AMBER} delayBase={lit ? 0 : 0} />
        </span>
      </div>

      {/* detail-only plain lines + over-cap note */}
      {detail && (
        <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ fontSize: 11, lineHeight: 1.45, color: "var(--brand-ink)", opacity: 0.7, fontStyle: "italic" }}>
            {reliefCaption ?? "How much room your back tends to get here."}
          </p>
          <p style={{ fontSize: 11, lineHeight: 1.45, color: "var(--brand-ink)", opacity: 0.7, fontStyle: "italic" }}>
            How much the shape is worth the trip. The good kind of pop.
          </p>
          {overCap && (
            <p style={{ fontSize: 10.5, lineHeight: 1.45, color: OX, marginTop: 2 }}>
              Above today's line. Openable, but your back filed a complaint.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PopMeter;
