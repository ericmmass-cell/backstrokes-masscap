/**
 * Mannequin — ONE animated vector language for BOTH the exercises and the
 * sex positions. The brief, after the filled-figure attempt failed: the two
 * surfaces must share a design language, both must MOVE with motion you can
 * actually read, and the depictions must be correct.
 *
 * The language is a jointed artist's-mannequin / instructional diagram:
 *   - BONES are round-capped capsules (a dark casing line + a tone fill line).
 *   - JOINTS are pinned dots where the body articulates.
 *   - Motion is real joint ROTATION and TRANSLATION at large, legible
 *     amplitude (a ~20° curl, a clear rhythmic rock) — never the sub-2%
 *     wobble that made the old version unreadable.
 *   - Two figure tones (A = oxblood, B = amber) so a couple stays legible and
 *     "whose back is working" reads at a glance.
 *   - The same cream studio stage under every figure, so a position and an
 *     exercise look like they came from the same studio.
 *
 * Animation is CSS keyframes on nested <g> groups; each animated group sets
 * transform-box: view-box and a transform-origin AT its pivot joint (in
 * viewBox units) so rotation happens about the real anatomical hinge. All
 * motion is transform-only; prefers-reduced-motion freezes each figure at a
 * clear demonstrated pose.
 *
 * This file is the shared primitive plus the first two figures (curl-up,
 * spoon) for direction approval. Once the language is signed off, every other
 * exercise and position is authored against these same helpers.
 */

import type { CSSProperties } from "react";

/* ── palette (shared with the rest of the app) ── */
const PAPER_A = "#F7F2E7";
const PAPER_B = "#F4EFE3";
const PAPER_C = "#ECE4D2";
const INK = "#2a2620";

/* figure tone A — oxblood */
const A_FILL = "#a24642";
const A_CASE = "#5e2222";
/* figure tone B — amber */
const B_FILL = "#c79433";
const B_CASE = "#7e561a";

type Tone = "a" | "b";
const fillOf = (t: Tone) => (t === "a" ? A_FILL : B_FILL);
const caseOf = (t: Tone) => (t === "a" ? A_CASE : B_CASE);

/* ── shared paint servers (one instance per <svg>; ids resolve per-doc) ── */
function StageDefs() {
  return (
    <defs>
      <radialGradient id="mqPaper" cx="50%" cy="40%" r="80%">
        <stop offset="0" stopColor={PAPER_A} />
        <stop offset="0.7" stopColor={PAPER_B} />
        <stop offset="1" stopColor={PAPER_C} />
      </radialGradient>
      <radialGradient id="mqShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={INK} stopOpacity="0.20" />
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

/* studio floor: contact shadow + lit isometric mat */
function Stage({ shadowCx = 248, shadowCy = 262 }: { shadowCx?: number; shadowCy?: number }) {
  return (
    <>
      <rect width="480" height="360" fill="url(#mqPaper)" />
      <ellipse cx={shadowCx} cy={shadowCy} rx="186" ry="15" fill="url(#mqShadow)" />
      <polygon points="96,252 404,252 432,272 124,272" fill="url(#mqMat)" />
      <polygon points="124,272 432,272 432,286 124,286" fill="#c0a338" />
      <line x1="96" y1="252" x2="404" y2="252" stroke="rgba(42,38,32,0.20)" strokeWidth="1.1" />
    </>
  );
}

/* ── mannequin primitives ── */

/** a bone: round-capped capsule = dark casing line under a tone fill line */
function Bone({
  x1, y1, x2, y2, w, tone,
}: { x1: number; y1: number; x2: number; y2: number; w: number; tone: Tone }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={caseOf(tone)} strokeWidth={w + 2.6} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fillOf(tone)} strokeWidth={w} strokeLinecap="round" />
    </>
  );
}

/** a joint pin where the body articulates */
function Pin({ x, y, r = 4, tone }: { x: number; y: number; r?: number; tone: Tone }) {
  return (
    <>
      <circle cx={x} cy={y} r={r + 1.1} fill={caseOf(tone)} />
      <circle cx={x} cy={y} r={r * 0.45} fill={fillOf(tone)} />
    </>
  );
}

/** the head: a clean ball with a contour casing */
function Head({ x, y, r = 16, tone }: { x: number; y: number; r?: number; tone: Tone }) {
  return (
    <>
      <circle cx={x} cy={y} r={r + 1.3} fill={caseOf(tone)} />
      <circle cx={x} cy={y} r={r} fill={fillOf(tone)} />
    </>
  );
}

/* ── shared CSS (per-svg via <style>) ── */
const CSS = `
.mq-fig { --rep-dur: 4200ms; }

/* CURL-UP: the trunk hinges UP at the lumbar; the pelvis stays planted.
   Four phase: settle (anticipation) → lift → hold → slow lower. */
@keyframes mqCurl {
  0%   { transform: rotate(0deg); }
  8%   { transform: rotate(2.5deg); }   /* anticipation: chest settles toward mat */
  36%  { transform: rotate(-21deg); }   /* lift (concentric) */
  42%  { transform: rotate(-22deg); }   /* follow-through */
  60%  { transform: rotate(-21deg); }   /* hold (isometric) */
  92%  { transform: rotate(0deg); }     /* slow lower (eccentric) */
  100% { transform: rotate(0deg); }
}
.mq-curl-torso { transform-box: view-box; transform-origin: 286px 236px; }
.mq-run .mq-curl-torso { animation: mqCurl var(--rep-dur) ease-in-out infinite; }

/* the bent knee gives a small reciprocal nod so the figure reads alive */
@keyframes mqCurlKnee {
  0%,100% { transform: rotate(0deg); }
  36%,60% { transform: rotate(-5deg); }
}
.mq-curl-knee { transform-box: view-box; transform-origin: 300px 238px; }
.mq-run .mq-curl-knee { animation: mqCurlKnee var(--rep-dur) ease-in-out infinite; }

/* breathing idle on the otherwise-static lower body */
@keyframes mqBreathe { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.1px); } }
.mq-breathe { transform-box: view-box; transform-origin: 300px 240px; }
.mq-run .mq-breathe { animation: mqBreathe 4600ms ease-in-out infinite; }

/* SPOON: the back figure drives a clear, unhurried rhythmic rock toward the
   front figure and back; the front figure answers at a fraction of the
   amplitude. Tasteful, clinical, but unmistakably MOVING. */
@keyframes mqThrustBack {
  0%,100% { transform: translate(0px, 0px); }
  50%     { transform: translate(-13px, 3px); }
}
@keyframes mqThrustFront {
  0%,100% { transform: translate(0px, 0px); }
  50%     { transform: translate(-4px, 1px); }
}
.mq-spoon-back  { transform-box: view-box; transform-origin: 320px 232px; }
.mq-spoon-front { transform-box: view-box; transform-origin: 250px 240px; }
.mq-run .mq-spoon-back  { animation: mqThrustBack  2300ms ease-in-out infinite; }
.mq-run .mq-spoon-front { animation: mqThrustFront 2300ms ease-in-out infinite; }

/* the neutral-spine teaching mark, shared visual grammar across surfaces */
.mq-spine { opacity: 0.85; }

@media (prefers-reduced-motion: reduce) {
  .mq-fig * { animation: none !important; }
  .mq-curl-torso { transform: rotate(-16deg); }
  .mq-curl-knee  { transform: rotate(-4deg); }
  .mq-spoon-back { transform: translate(-7px, 2px); }
}
`;

function svgProps(label: string): {
  viewBox: string; xmlns: string; role: "img"; "aria-label": string; style: CSSProperties;
} {
  return {
    viewBox: "0 0 480 360",
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    "aria-label": label,
    style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  };
}

/* ============================ CURL-UP ============================ */
/* Supine, head at left. The trunk curls up at the waist a small, safe amount;
   the lumbar/pelvis stays neutral and planted. This is not a sit-up. */
function CurlUp({ paused }: { paused: boolean }) {
  const A: Tone = "a";
  return (
    <svg {...svgProps("Curl-up: lying on the back with one knee bent, the head and shoulders lift a small amount by hinging at the waist, hold, then lower slowly. The lower back stays neutral and on the mat.")}
      className={`mq-fig ${paused ? "" : "mq-run"}`}>
      <StageDefs />
      <Stage />

      {/* STATIC lower body (breathing): pelvis, one bent leg, one long leg */}
      <g className="mq-breathe">
        {/* long (straight) leg */}
        <Bone x1={300} y1={240} x2={392} y2={250} w={15} tone={A} />
        <Pin x={392} y={250} r={5} tone={A} />
        {/* bent leg — thigh up, shin down to the mat */}
        <g className="mq-curl-knee">
          <Bone x1={300} y1={240} x2={330} y2={200} w={16} tone={A} />
          <Bone x1={330} y1={200} x2={332} y2={250} w={13} tone={A} />
          <Pin x={330} y={201} r={5} tone={A} />
          <Pin x={332} y={251} r={4} tone={A} />
        </g>
        {/* pelvis block + hip pin (the anchor that must not move) */}
        <Bone x1={286} y1={238} x2={306} y2={239} w={22} tone={A} />
        <Pin x={300} y={239} r={5.5} tone={A} />
      </g>

      {/* MOVING trunk: hinges at the lumbar (286,236). Head + near arm ride with it. */}
      <g className="mq-curl-torso">
        {/* torso: lumbar → shoulder */}
        <Bone x1={286} y1={236} x2={196} y2={232} w={20} tone={A} />
        {/* neutral-spine teaching line along the trunk (same grammar as positions) */}
        <line className="mq-spine" x1={282} y1={231} x2={200} y2={227} stroke="#efe4cf" strokeWidth={2} strokeLinecap="round" strokeDasharray="2 5" />
        {/* near arm folded across the chest, reaches toward the knees */}
        <Bone x1={206} y1={232} x2={244} y2={244} w={11} tone={A} />
        <Bone x1={244} y1={244} x2={284} y2={236} w={10} tone={A} />
        <Pin x={206} y={232} r={4.5} tone={A} />
        <Pin x={244} y={244} r={4} tone={A} />
        {/* neck + head */}
        <Bone x1={196} y1={232} x2={172} y2={228} w={12} tone={A} />
        <Head x={150} y={224} r={16} tone={A} />
        {/* lumbar pin sits last, on top of the hinge */}
        <Pin x={286} y={236} r={5.5} tone={A} />
      </g>

      <style>{CSS}</style>
    </svg>
  );
}

/* ============================ SPOON ============================ */
/* Two figures lying on their sides, nested. Side view, both facing left, knees
   drawn up. Front figure = receiver (oxblood); back figure = the partner
   behind (amber). The back figure drives the rhythm; both spines stay in a
   supported neutral curve — in spoon the load is shared, both backs are easy. */
function Spoon({ paused }: { paused: boolean }) {
  const RX: Tone = "a"; // receiver, front
  const PT: Tone = "b"; // partner, back
  return (
    <svg {...svgProps("Spooning: two people lying on their sides, the partner behind nested against the receiver in front, both with knees drawn up. A slow rhythmic motion. Both spines stay in a neutral, supported curve.")}
      className={`mq-fig ${paused ? "" : "mq-run"}`}>
      <StageDefs />
      <Stage shadowCy={266} />

      {/* a soft pillow under both heads */}
      <g>
        <rect x={120} y={214} width={64} height={20} rx={10} fill="#efe6d2" stroke="#d9ccae" strokeWidth="1.2" />
      </g>

      {/* FRONT figure — receiver (oxblood), lying on side facing left, knees up */}
      <g className="mq-spoon-front">
        {/* curled torso: pelvis → lumbar → shoulder (a gentle C) */}
        <Bone x1={300} y1={244} x2={252} y2={236} w={20} tone={RX} />
        <Bone x1={252} y1={236} x2={200} y2={224} w={18} tone={RX} />
        {/* neutral-spine teaching curve along the back */}
        <path className="mq-spine" d="M 300 233 Q 252 224 202 214" fill="none" stroke="#5e2222" strokeOpacity="0.5" strokeWidth={2} strokeLinecap="round" strokeDasharray="2 5" />
        {/* neck + head */}
        <Bone x1={200} y1={224} x2={176} y2={222} w={12} tone={RX} />
        <Head x={156} y={222} r={15} tone={RX} />
        {/* thigh drawn forward + shin tucked under */}
        <Bone x1={300} y1={244} x2={262} y2={284} w={17} tone={RX} />
        <Bone x1={262} y1={284} x2={214} y2={296} w={14} tone={RX} />
        <Pin x={300} y={244} r={5.5} tone={RX} />
        <Pin x={262} y={284} r={5} tone={RX} />
        {/* forward arm resting along the mat */}
        <Bone x1={206} y1={228} x2={236} y2={252} w={9} tone={RX} />
      </g>

      {/* BACK figure — partner (amber), nested behind, pelvis to receiver's pelvis */}
      <g className="mq-spoon-back">
        {/* curled torso, shifted up + right so it reads as the body behind */}
        <Bone x1={324} y1={232} x2={278} y2={222} w={20} tone={PT} />
        <Bone x1={278} y1={222} x2={228} y2={210} w={18} tone={PT} />
        <path className="mq-spine" d="M 324 221 Q 278 211 230 200" fill="none" stroke="#7e561a" strokeOpacity="0.55" strokeWidth={2} strokeLinecap="round" strokeDasharray="2 5" />
        <Bone x1={228} y1={210} x2={206} y2={206} w={12} tone={PT} />
        <Head x={188} y={204} r={15} tone={PT} />
        {/* thigh forward, tucking behind the receiver's thigh */}
        <Bone x1={324} y1={232} x2={288} y2={272} w={17} tone={PT} />
        <Bone x1={288} y1={272} x2={242} y2={286} w={14} tone={PT} />
        <Pin x={324} y={232} r={5.5} tone={PT} />
        <Pin x={288} y={272} r={5} tone={PT} />
        {/* top arm draped over the receiver */}
        <Bone x1={236} y1={214} x2={272} y2={236} w={9} tone={PT} />
        <Pin x={236} y={214} r={4} tone={PT} />
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
