/**
 * Mannequin — ONE animated vector language for BOTH the exercises and the sex
 * positions. Third rendering pass. v1 (capsule + pins) read as a wooden robot;
 * v2 (hand-rolled tapered limb paths) rendered as spiky self-intersecting
 * garbage. This pass uses the ONE method that cannot produce those artifacts:
 *
 *   A body = a group of ROUND-CAPPED STROKES + a head circle, all the SAME
 *   flat fill color. Overlapping same-color strokes union seamlessly (no
 *   internal seams, no arc math, no winding holes), so the result is a smooth
 *   human SILHOUETTE — anatomical and clean, not a mannequin.
 *
 * Depth: far-side limbs use a slightly darker shade of the same hue so the
 * body reads three-dimensional without a second color.
 * Couples: receiver = oxblood, partner = amber; the front body is drawn last
 * so its silhouette occludes the back body and the pair never merges.
 *
 * Motion: the SAME working rig as before — nested <g> groups rotate/translate
 * about real anatomical pivots (transform-box: view-box; transform-origin at
 * the joint). Large, legible motion. prefers-reduced-motion freezes a clear
 * demonstrated pose.
 *
 * /lab renders curl-up + spoon for direction approval before this scales.
 */

import type { CSSProperties } from "react";

/* ── stage palette ── */
const PAPER_A = "#F7F2E7";
const PAPER_B = "#F4EFE3";
const PAPER_C = "#ECE4D2";
const INK = "#2a2620";

/* ── body tones: a main fill + a darker shade (depth) per body ── */
const TONES = {
  a: { fill: "#a8473f", shade: "#823029" }, // receiver — oxblood
  b: { fill: "#c79235", shade: "#9c6f22" }, // partner — amber
} as const;
type Tone = keyof typeof TONES;

/* ── shared paint servers (one per <svg>; ids resolve per-doc) ── */
function StageDefs() {
  return (
    <defs>
      <radialGradient id="mqPaper" cx="50%" cy="40%" r="80%">
        <stop offset="0" stopColor={PAPER_A} />
        <stop offset="0.7" stopColor={PAPER_B} />
        <stop offset="1" stopColor={PAPER_C} />
      </radialGradient>
      <radialGradient id="mqShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={INK} stopOpacity="0.2" />
        <stop offset="0.55" stopColor={INK} stopOpacity="0.09" />
        <stop offset="1" stopColor={INK} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="mqMat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ecd06a" />
        <stop offset="1" stopColor="#e2c452" />
      </linearGradient>
    </defs>
  );
}

function Stage({ shadowCx = 248, shadowCy = 264 }: { shadowCx?: number; shadowCy?: number }) {
  return (
    <>
      <rect width="480" height="360" fill="url(#mqPaper)" />
      <ellipse cx={shadowCx} cy={shadowCy} rx="190" ry="15" fill="url(#mqShadow)" />
      <polygon points="92,254 408,254 436,274 120,274" fill="url(#mqMat)" />
      <polygon points="120,274 436,274 436,288 120,288" fill="#c0a338" />
      <line x1="92" y1="254" x2="408" y2="254" stroke="rgba(42,38,32,0.18)" strokeWidth="1.1" />
    </>
  );
}

/* ── silhouette primitives: round-capped strokes, one color ──────────────
 * A "bone" is a polyline drawn as a single round-capped stroke. A limb with a
 * joint is one polyline through [start, joint, end] so the elbow/knee is a
 * smooth round bend, not a pin. Width tapers by drawing the distal half a hair
 * thinner is unnecessary; one width per limb reads clean. */
function Bone({ pts, w, tone, far }: { pts: number[]; w: number; tone: Tone; far?: boolean }) {
  const t = TONES[tone];
  const d = "M " + pts[0] + " " + pts[1] + pts.slice(2).reduce((s, _, i) => (i % 2 === 0 ? s + " L " + pts[i + 2] + " " + pts[i + 3] : s), "");
  return <path d={d} fill="none" stroke={far ? t.shade : t.fill} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
}

/* a soft filled mass (torso/pelvis) as a closed round blob */
function Mass({ d, tone, far }: { d: string; tone: Tone; far?: boolean }) {
  const t = TONES[tone];
  return <path d={d} fill={far ? t.shade : t.fill} stroke="none" />;
}

function Head({ x, y, r = 15, tone, facing = -1 }: { x: number; y: number; r?: number; tone: Tone; facing?: 1 | -1 }) {
  const t = TONES[tone];
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={t.fill} />
      {/* subtle facing notch (nose/brow) so the head has a front */}
      <circle cx={x + facing * r * 0.78} cy={y} r={r * 0.26} fill={t.fill} />
    </>
  );
}

/* ── shared CSS ── */
const CSS = `
.mq-fig { --rep-dur: 4200ms; display:block; }

@keyframes mqCurl {
  0%   { transform: rotate(0deg); }
  8%   { transform: rotate(-1.5deg); }   /* settle toward the mat */
  38%  { transform: rotate(15deg); }     /* lift: head + shoulders rise */
  44%  { transform: rotate(16deg); }
  60%  { transform: rotate(15deg); }     /* hold */
  92%  { transform: rotate(0deg); }      /* slow lower */
  100% { transform: rotate(0deg); }
}
.mq-curl-torso { transform-box: view-box; transform-origin: 296px 240px; }
.mq-run .mq-curl-torso { animation: mqCurl var(--rep-dur) ease-in-out infinite; }

@keyframes mqBreathe { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
.mq-breathe { transform-box: view-box; transform-origin: 300px 240px; }
.mq-run .mq-breathe { animation: mqBreathe 4600ms ease-in-out infinite; }

@keyframes mqRockBack  { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-15px,3px); } }
@keyframes mqRockFront { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-4px,1px); } }
.mq-spoon-back  { transform-box: view-box; transform-origin: 318px 224px; }
.mq-spoon-front { transform-box: view-box; transform-origin: 250px 236px; }
.mq-run .mq-spoon-back  { animation: mqRockBack  2200ms ease-in-out infinite; }
.mq-run .mq-spoon-front { animation: mqRockFront 2200ms ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .mq-fig * { animation: none !important; }
  .mq-curl-torso { transform: rotate(15deg); }
  .mq-spoon-back { transform: translate(-9px,2px); }
}
`;

function svgProps(label: string): { viewBox: string; xmlns: string; role: "img"; "aria-label": string; style: CSSProperties } {
  return {
    viewBox: "0 0 480 360",
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    "aria-label": label,
    style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  };
}

/* ============================ CURL-UP ============================ */
function CurlUp({ paused }: { paused: boolean }) {
  const A: Tone = "a";
  return (
    <svg {...svgProps("Curl-up: a person lying on their back with knees bent and feet flat, curling the head and shoulders up a small amount by hinging at the hips, holding, then lowering. The lower back stays neutral and down.")} className={`mq-fig ${paused ? "" : "mq-run"}`}>
      <StageDefs />
      <Stage />

      {/* STATIC lower body (breathes): one straight leg + one bent (foot flat) + pelvis.
          This is the supine curl-up setup — not happy-baby. */}
      <g className="mq-breathe">
        {/* straight leg (far, shade): hip → ankle along the mat */}
        <Bone pts={[296, 244, 360, 248, 392, 249]} w={18} tone={A} far />
        <Bone pts={[392, 249, 404, 244]} w={10} tone={A} far />
        {/* bent leg (near): hip → knee up → foot flat on the mat */}
        <Bone pts={[296, 244, 330, 216, 342, 249]} w={20} tone={A} />
        <Bone pts={[342, 249, 360, 249]} w={11} tone={A} />
        {/* pelvis mass — the planted anchor */}
        <Mass d="M 276 234 q 18 -6 32 2 q 8 6 4 14 q -16 8 -36 2 q -8 -10 0 -18 Z" tone={A} />
      </g>

      {/* MOVING trunk: small rigid lift, hinging at the hip (296,240). McGill
          curl-up = neutral spine, ~20° lift, head/shoulders come off the mat. */}
      <g className="mq-curl-torso">
        {/* near arm reaching toward the knees — darker shade so it reads apart from the trunk */}
        <Bone pts={[210, 236, 248, 250, 286, 240]} w={10} tone={A} far />
        {/* trunk: hip → chest → shoulder, lying just above the mat at rest */}
        <Bone pts={[294, 240, 250, 238, 206, 236]} w={30} tone={A} />
        {/* neck + head */}
        <Bone pts={[206, 236, 184, 234]} w={11} tone={A} />
        <Head x={166} y={232} r={14} tone={A} facing={-1} />
      </g>

      <style>{CSS}</style>
    </svg>
  );
}

/* ============================ SPOON ============================ */
function Spoon({ paused }: { paused: boolean }) {
  const RX: Tone = "a";
  const PT: Tone = "b";
  return (
    <svg {...svgProps("Spooning: two people lying on their sides, the partner behind nested against the receiver in front, both with knees drawn up, in a slow rhythmic motion.")} className={`mq-fig ${paused ? "" : "mq-run"}`}>
      <StageDefs />
      <Stage shadowCy={268} />
      <rect x={118} y={210} width={70} height={20} rx={10} fill="#efe6d2" stroke="#d9ccae" strokeWidth="1.2" />

      {/* BACK figure — partner (amber), behind and lifted ~14px so two distinct
          nested bodies read. Drawn FIRST so the receiver's silhouette occludes
          it where they touch. ONE clean bent leg (knee up-forward), and the top
          arm draped diagonally over the receiver — the "together" signal. */}
      <g className="mq-spoon-back">
        {/* trunk: shoulder → chest → hip, horizontal, slightly higher than front */}
        <Bone pts={[236, 220, 284, 224, 324, 228]} w={26} tone={PT} />
        {/* neck + head on the pillow, up-and-right of the receiver's head */}
        <Bone pts={[236, 220, 218, 218]} w={11} tone={PT} />
        <Head x={198} y={216} r={14} tone={PT} facing={-1} />
        {/* one bent leg: thigh up-forward, shin tucks down (nested above front leg) */}
        <Bone pts={[324, 228, 282, 214, 276, 238]} w={16} tone={PT} />
      </g>

      {/* FRONT figure — receiver (oxblood), nested in front and lower. Drawn
          LAST so its silhouette occludes the partner; the pair never merges.
          ONE clean bent leg parallel to the partner's, plus the down-arm on the mat. */}
      <g className="mq-spoon-front">
        {/* short far-thigh stub (shade) for grounding, clearly behind */}
        <Bone pts={[300, 244, 276, 234]} w={13} tone={RX} far />
        {/* trunk: shoulder → chest → hip, horizontal */}
        <Bone pts={[206, 238, 254, 240, 300, 242]} w={26} tone={RX} />
        {/* neck + head on the pillow */}
        <Bone pts={[206, 238, 188, 237]} w={11} tone={RX} />
        <Head x={168} y={234} r={14} tone={RX} facing={-1} />
        {/* one bent leg: thigh up-forward, shin to the mat */}
        <Bone pts={[300, 242, 258, 228, 252, 252]} w={16} tone={RX} />
        {/* forward arm resting along the mat */}
        <Bone pts={[208, 240, 238, 253]} w={9} tone={RX} />
      </g>

      {/* partner's top arm draped OVER the receiver — drawn last so it reads as
          an embrace in front of the front body. Rides with the back figure. */}
      <g className="mq-spoon-back">
        <Bone pts={[240, 222, 280, 240, 308, 250]} w={10} tone={PT} />
        {/* hand resting on the receiver's hip */}
        <Bone pts={[306, 249, 314, 251]} w={9} tone={PT} />
      </g>

      <style>{CSS}</style>
    </svg>
  );
}

export type MannequinKey = "curl-up" | "spoon";

export function Mannequin({ kind, paused = false, style }: { kind: MannequinKey; paused?: boolean; style?: CSSProperties }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", ...style }}>
      {kind === "curl-up" ? <CurlUp paused={paused} /> : <Spoon paused={paused} />}
    </div>
  );
}

export default Mannequin;
