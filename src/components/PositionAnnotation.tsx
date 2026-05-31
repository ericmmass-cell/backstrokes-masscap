/**
 * PositionAnnotation — a timed teaching overlay drawn ON TOP of the real
 * Seedfeeder position illustration. The council's positions strategy lead
 * was decisive: do NOT redraw the couples (that path produced "swamp
 * thing" twice). Instead, animate the *teaching* over the photo-grade
 * illustration we already own.
 *
 * A position is a held geometry, not a rep — so this is a narrated diagram,
 * not a loop. A 4-beat reveal plays once when the figure enters view, then
 * rests on the fully-assembled diagram:
 *
 *   1. Neutral-spine line draws on along the load-bearer's spine.
 *   2. Support point (wedge / pillow / bolster) fades in where it belongs.
 *   3. Lumbar load arrow appears, weighted to the role-aware load.
 *   4. "Whose back works" tag points to the load-bearer.
 *
 * Geometry is expressed in a normalized 0-100 box per illustration family
 * (11 anchor records), so one record serves every library entry that shares
 * that family image. Everything clinical (load weight, support noun, the
 * tag) is computed per-entry from data the cards already hold, so p23 and
 * p28 share spoon.png yet draw different annotations.
 *
 * prefers-reduced-motion → the assembled diagram with no timing.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";

const OX = "#722B2B";
const INK = "#2a2620";
const AMBER = "#b07d2b";
const PAPER = "#F4EFE3";

/** Per-family anchors in a normalized 0-100 box (matches the PNG framing,
 *  which renders objectFit:contain in a 4:3 stage). Hand-set per image. */
type Anchor = {
  /** spine polyline of the load-bearing figure: [x1,y1,x2,y2,(x3,y3)] */
  spine: number[];
  /** lumbar point (load arrow origin) */
  lumbar: [number, number];
  /** where a wedge/pillow/bolster sits */
  support: [number, number];
  /** which side the "whose back" leader points from */
  tagAt: [number, number];
};

const ANCHORS: Record<string, Anchor> = {
  // side-lying spooning: receiver in front, spine runs low-left diagonal
  spoon: { spine: [30, 60, 60, 56, 78, 60], lumbar: [56, 58], support: [70, 66], tagAt: [40, 44] },
  // supine, knees up: receiver on back, spine flat along the mat
  "supine-knees-up": { spine: [30, 64, 60, 64], lumbar: [52, 64], support: [40, 70], tagAt: [44, 50] },
  // true missionary: receiver supine below, partner above
  missionary: { spine: [28, 66, 58, 66], lumbar: [50, 66], support: [38, 72], tagAt: [42, 54] },
  // side-lying T
  "side-T": { spine: [30, 58, 58, 60, 74, 64], lumbar: [54, 60], support: [66, 68], tagAt: [40, 46] },
  // edge of bed: receiver supine at the edge
  "edge-bed": { spine: [26, 62, 56, 62], lumbar: [50, 62], support: [36, 68], tagAt: [40, 50] },
  // receiver on top, upright
  "cowgirl-upright": { spine: [54, 30, 56, 56], lumbar: [56, 52], support: [50, 66], tagAt: [66, 40] },
  // supported rear-entry, chest down
  "doggy-supported": { spine: [30, 54, 56, 50, 76, 56], lumbar: [54, 52], support: [34, 60], tagAt: [44, 40] },
  // rear-entry kneeling
  "doggy-kneeling": { spine: [32, 50, 58, 46, 78, 54], lumbar: [56, 48], support: [40, 60], tagAt: [46, 36] },
  // side-lying scissor
  scissor: { spine: [30, 60, 60, 58, 80, 62], lumbar: [56, 60], support: [70, 66], tagAt: [42, 46] },
  // seated lap embrace, both upright
  "seated-lap": { spine: [50, 32, 52, 60], lumbar: [52, 56], support: [50, 68], tagAt: [64, 42] },
  // standing
  standing: { spine: [48, 26, 50, 64], lumbar: [50, 56], support: [62, 60], tagAt: [62, 38] },
};

type SupportKind = "wedge" | "pillow" | "bolster" | "none";

/** Parse the support prop from the position name (same regex-on-name
 *  approach the condition tagging uses). */
function supportFromName(name: string): { kind: SupportKind; label: string } {
  const n = name.toLowerCase();
  if (/wedge/.test(n)) return { kind: "wedge", label: "Wedge · pelvic tilt" };
  if (/bolster/.test(n)) return { kind: "bolster", label: "Bolster under hips" };
  if (/pillow/.test(n)) return { kind: "pillow", label: "Pillow support" };
  if (/forearm/.test(n)) return { kind: "pillow", label: "Forearms down" };
  return { kind: "none", label: "" };
}

export type PositionAnnotationProps = {
  positionKey: PictogramKey;
  /** position display name — drives the support glyph + label */
  name: string;
  /** 1-5, role-aware lumbar load — drives the arrow weight */
  load: number;
  /** the dry "whose back is working" read */
  loadNote: string;
  /** optional: pause/disable the timed reveal (show assembled) */
  paused?: boolean;
  style?: CSSProperties;
};

const CSS = `
@keyframes paSpine { to { stroke-dashoffset: 0; } }
@keyframes paFade  { to { opacity: 1; } }
@keyframes paRise  { from { opacity:0; transform: translateY(4px);} to { opacity:1; transform: translateY(0);} }

.pa-layer { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
.pa-spine {
  stroke-dasharray: 200; stroke-dashoffset: 200;
  animation: paSpine 0.7s ease-out 0.2s forwards;
}
.pa-support { opacity: 0; animation: paFade 0.5s ease-out 1.6s forwards; }
.pa-arrow   { opacity: 0; animation: paFade 0.5s ease-out 3.0s forwards; }
.pa-tag     { opacity: 0; animation: paRise 0.5s ease-out 4.2s forwards; }
.pa-label   { opacity: 0; animation: paRise 0.5s ease-out 1.7s forwards; }

/* breathing pulse on the breath glyph only — the one B-borrow */
@keyframes paBreath { 0%,100%{ transform:scale(1);} 50%{ transform:scale(1.12);} }
.pa-breath { transform-box: fill-box; transform-origin:center; opacity:0;
  animation: paFade 0.5s ease-out 2.4s forwards, paBreath 4s ease-in-out 2.9s infinite; }

@media (prefers-reduced-motion: reduce) {
  .pa-spine { stroke-dashoffset: 0; animation: none; }
  .pa-support, .pa-arrow, .pa-tag, .pa-label, .pa-breath { opacity: 1; animation: none; }
}
`;

export function PositionAnnotation({ positionKey, name, load, loadNote, paused = false, style }: PositionAnnotationProps) {
  const a = ANCHORS[positionKey];
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!a) return null; // unknown family — no overlay, the clean PNG stands alone

  const support = supportFromName(name);
  const [lx, ly] = a.lumbar;
  // arrow length scales with load (1 faint tick → 5 bold)
  const arrowLen = 3 + load * 1.6;
  const arrowW = 0.8 + load * 0.35;
  // spine path
  const sp = a.spine;
  let spineD = `M ${sp[0]} ${sp[1]}`;
  for (let i = 2; i < sp.length; i += 2) spineD += ` L ${sp[i]} ${sp[i + 1]}`;

  // play only once in view (or immediately if reduced-motion / not paused-gated)
  const active = inView && !paused;

  return (
    <div
      ref={ref}
      className="pa-layer"
      style={style}
      aria-hidden="true"
    >
      {active && (
        <>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {/* neutral-spine line */}
            <path
              className="pa-spine"
              d={spineD}
              fill="none"
              stroke={AMBER}
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="200"
            />
            {/* lumbar load arrow (downward press at the low back) */}
            <g className="pa-arrow">
              <line
                x1={lx}
                y1={ly - arrowLen}
                x2={lx}
                y2={ly + arrowLen}
                stroke={OX}
                strokeWidth={arrowW}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M ${lx - 1.6} ${ly + arrowLen - 1.8} L ${lx} ${ly + arrowLen} L ${lx + 1.6} ${ly + arrowLen - 1.8}`}
                fill="none"
                stroke={OX}
                strokeWidth={arrowW}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            {/* support glyph */}
            {support.kind !== "none" && (
              <g className="pa-support">
                <rect
                  x={a.support[0] - 5}
                  y={a.support[1] - 2.5}
                  width={10}
                  height={5}
                  rx={1.5}
                  fill={AMBER}
                  fillOpacity={0.32}
                  stroke={AMBER}
                  strokeWidth={0.8}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            )}
            {/* breath glyph — the one moving element */}
            <circle className="pa-breath" cx={a.tagAt[0]} cy={a.tagAt[1] - 8} r={2.2} fill="none" stroke={AMBER} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
          </svg>

          {/* support label */}
          {support.kind !== "none" && (
            <div
              className="pa-label"
              style={{
                position: "absolute",
                left: `${a.support[0]}%`,
                top: `${a.support[1] + 4}%`,
                transform: "translateX(-50%)",
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: INK,
                background: `${PAPER}cc`,
                padding: "1px 5px",
                borderRadius: 3,
                whiteSpace: "nowrap",
              }}
            >
              {support.label}
            </div>
          )}

          {/* whose-back-works tag */}
          <div
            className="pa-tag"
            style={{
              position: "absolute",
              left: `${a.tagAt[0]}%`,
              top: `${a.tagAt[1]}%`,
              transform: "translate(-50%,-50%)",
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: OX,
              background: `${PAPER}d9`,
              padding: "2px 6px",
              borderRadius: 3,
              maxWidth: "44%",
              lineHeight: 1.25,
              textAlign: "center",
            }}
          >
            {loadNote}
          </div>
        </>
      )}
      <style>{CSS}</style>
    </div>
  );
}

export default PositionAnnotation;
