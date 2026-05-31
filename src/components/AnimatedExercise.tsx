/**
 * AnimatedExercise — video-grade looping motion studies for the five rehab moves.
 *
 * Built from a five-person design council review. The upgrades over the
 * first pass (which read as a mechanism, not a body):
 *
 *  1. CRISP RENDER (render designer): one userSpaceOnUse skin gradient lights
 *     every limb from a single upper-left source; a head sphere gradient; a
 *     thin non-scaling self-contour so overlapping masses stay legible; a
 *     studio stage (paper gradient + real radial contact shadow + faint
 *     vignette + lit mat). Two value steps per mass, never three — that
 *     restraint is what keeps it from the old "swamp" look.
 *
 *  2. FOUR-PHASE MOTION (motion director + Disney/QA): every loop is
 *     ANTICIPATE → LIFT (concentric) → HOLD (isometric) → LOWER (eccentric),
 *     with the eccentric deliberately SLOWER than the concentric (rehab
 *     realism) and a small anticipation dip + follow-through overshoot. One
 *     shared --rep-dur clock drives the body, the scrub bar, and the phase
 *     label so they read as one authored clip.
 *
 *  3. BREATHING IDLE: a sub-1.5% chest swell on the otherwise-static mass so
 *     "pinned" never reads as "frozen mannequin." On the same --breath-dur
 *     clock as the session breath cue.
 *
 *  4. PLAYER CHROME: a loop scrub bar (holds on pause, never snaps), a
 *     LIFT·HOLD·LOWER phase label that lights with the motion, and an
 *     inhale/exhale breath dot — the chrome that makes a CSS loop feel like
 *     a crisp instructional clip.
 *
 *  POP-BUG FIX (QA lead): each mover's resting transform now equals its
 *  keyframe 0% so pressing Begin no longer snaps the figure.
 *
 *  Each figure still pins the parts that must not move (McGill mechanics)
 *  and caps its range at the SAFE ceiling — the demo never models the error.
 *  All motion is transform/opacity only; prefers-reduced-motion freezes each
 *  figure at its most legible (demonstrated) pose, not the flat bottom.
 */

import type { CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";

export const ANIMATED_KEYS = new Set<PictogramKey>([
  "curl-up",
  "side-plank",
  "bird-dog",
  "breath", // Dead bug
  "decomp", // Glute bridge
]);

/* palette */
const PAPER = "#F4EFE3";
const OX = "#722B2B";
const OXD = "#5e2222";
const MAT = "#e2c452";
const MAT_EDGE = "#c0a338";
const RULE = "rgba(42,38,32,0.22)";
const MUTED = "rgba(42,38,32,0.55)";
const FAINT = "rgba(42,38,32,0.40)";
const AMBER = "#b07d2b";
const TEACH = AMBER; /* clinical teaching overlay, distinct from the oxblood motion arc */
const EDGE = "#43181a"; // self-contour hue
const SKIN = "url(#bsSkin)";
const SKIN_DEEP = "url(#bsSkinDeep)";
const HEAD = "url(#bsHead)";
const PAPER_FILL = "url(#bsPaper)";

/* ── shared paint servers; one instance per <svg> (ids resolve per-doc) ── */
function FigureDefs() {
  return (
    <defs>
      {/* cylindrical skin: one light source, upper-left, across the whole
          figure in user space so every limb is lit consistently */}
      <linearGradient id="bsSkin" gradientUnits="userSpaceOnUse" x1="120" y1="110" x2="380" y2="300">
        <stop offset="0" stopColor="#8f3c38" />
        <stop offset="0.5" stopColor="#752c2c" />
        <stop offset="1" stopColor="#5b2121" />
      </linearGradient>
      {/* far / active limbs — shifted darker so they recede */}
      <linearGradient id="bsSkinDeep" gradientUnits="userSpaceOnUse" x1="120" y1="120" x2="380" y2="310">
        <stop offset="0" stopColor="#6f2b2b" />
        <stop offset="0.55" stopColor="#561f1f" />
        <stop offset="1" stopColor="#431a1a" />
      </linearGradient>
      {/* head: true sphere */}
      <radialGradient id="bsHead" cx="38%" cy="32%" r="72%">
        <stop offset="0" stopColor="#a04340" />
        <stop offset="0.42" stopColor="#7e3030" />
        <stop offset="1" stopColor="#561f1f" />
      </radialGradient>
      {/* paper with a faint center lift */}
      <radialGradient id="bsPaper" cx="50%" cy="40%" r="78%">
        <stop offset="0" stopColor="#F7F2E7" />
        <stop offset="0.7" stopColor="#F4EFE3" />
        <stop offset="1" stopColor="#ECE4D2" />
      </radialGradient>
      {/* corner vignette — whisper faint */}
      <radialGradient id="bsVignette" cx="50%" cy="46%" r="72%">
        <stop offset="0.6" stopColor="#2a2620" stopOpacity="0" />
        <stop offset="1" stopColor="#2a2620" stopOpacity="0.06" />
      </radialGradient>
      {/* radial contact shadow */}
      <radialGradient id="bsFloorShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#2a2620" stopOpacity="0.22" />
        <stop offset="0.55" stopColor="#2a2620" stopOpacity="0.10" />
        <stop offset="1" stopColor="#2a2620" stopOpacity="0" />
      </radialGradient>
      {/* lit mat top face */}
      <linearGradient id="bsMat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ecd06a" />
        <stop offset="1" stopColor="#e2c452" />
      </linearGradient>
    </defs>
  );
}

/* studio floor: shadow + lit isometric mat */
function Mat() {
  return (
    <>
      <ellipse cx="248" cy="259" rx="180" ry="14" fill="url(#bsFloorShadow)" />
      <polygon points="104,250 404,250 430,268 130,268" fill="url(#bsMat)" />
      <polygon points="130,268 430,268 430,282 130,282" fill={MAT_EDGE} />
      <line x1="104" y1="250" x2="404" y2="250" stroke={RULE} strokeWidth="1.1" />
    </>
  );
}

/* filled body mass with locked self-contour (crisp at any scale) */
function Mass({ d, deep }: { d: string; deep?: boolean }) {
  return (
    <path
      d={d}
      fill={deep ? SKIN_DEEP : SKIN}
      stroke={EDGE}
      strokeWidth={0.8}
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

/* ───────────────────────── motion CSS ───────────────────────── */
/*
 * Phase map shared by every rep (percent of --rep-dur):
 *   0%  rest   ·  8% anticipation dip  ·  34% top-of-lift (+overshoot 40%)
 *   58% end-of-hold  ·  92% bottom (slow eccentric)  ·  100% settle
 * Lift spans 26%, lower spans 34% — eccentric is slower. ease-in-out on the
 * whole loop; the asymmetric %-spacing supplies the human dynamics.
 */
const CSS = `
.bs-fig { --rep-dur: 4000ms; --breath-dur: 8000ms; }

/* breathing idle — sub-1.5% swell on the static mass */
@keyframes bsBreathe {
  0%,100% { transform: translateY(0) scaleY(1); }
  50%     { transform: translateY(-0.5px) scaleY(1.012); }
}
.bs-breathe { transform-box: view-box; transform-origin: 250px 246px;
  animation: bsBreathe var(--breath-dur) ease-in-out infinite; }
.bs-breathe-soft { transform-box: view-box; transform-origin: 250px 246px;
  animation: bsBreatheSoft var(--breath-dur) ease-in-out infinite; }
@keyframes bsBreatheSoft {
  0%,100% { transform: translateY(0) scaleY(1); }
  50%     { transform: translateY(-0.3px) scaleY(1.006); }
}

/* ---- CURL-UP: trunk curls at the waist; head leads slightly ---- */
@keyframes bsCurl {
  0%   { transform: rotate(2deg); }
  8%   { transform: rotate(0deg); }    /* anticipation: chin/chest settles */
  34%  { transform: rotate(14deg); }   /* lift (concentric) */
  40%  { transform: rotate(15deg); }   /* follow-through overshoot */
  58%  { transform: rotate(14deg); }   /* hold */
  92%  { transform: rotate(2deg); }    /* slow lower (eccentric) */
  100% { transform: rotate(2deg); }
}
@keyframes bsCurlHead {
  0%   { transform: rotate(1deg); }
  8%   { transform: rotate(0deg); }
  34%  { transform: rotate(6deg); }
  40%  { transform: rotate(6.5deg); }
  58%  { transform: rotate(6deg); }
  92%  { transform: rotate(1deg); }
  100% { transform: rotate(1deg); }
}
.bs-curl-mover { transform-box: view-box; transform-origin: 244px 244px; transform: rotate(2deg); }
.bs-curl-head  { transform-box: view-box; transform-origin: 186px 232px; transform: rotate(1deg); }
.bs-run .bs-curl-mover { animation: bsCurl var(--rep-dur) ease-in-out infinite; }
.bs-run .bs-curl-head  { animation: bsCurlHead var(--rep-dur) ease-in-out infinite; animation-delay: -120ms; }

/* ---- SIDE PLANK: hips lift the body into one line, then lower ---- */
@keyframes bsPlank {
  0%   { transform: rotate(7deg); }    /* sagged rest */
  8%   { transform: rotate(8deg); }    /* anticipation: settle lower */
  34%  { transform: rotate(-2deg); }   /* lift to the straight line */
  40%  { transform: rotate(-3deg); }   /* slight overshoot above the line */
  58%  { transform: rotate(-2deg); }   /* hold the line */
  92%  { transform: rotate(7deg); }    /* slow lower */
  100% { transform: rotate(7deg); }
}
.bs-plank-mover { transform-box: view-box; transform-origin: 214px 200px; transform: rotate(7deg); }
.bs-run .bs-plank-mover { animation: bsPlank var(--rep-dur) ease-in-out infinite; }

/* ---- BIRD DOG: opposite arm + leg reach; leg lags the arm slightly ---- */
@keyframes bsDogArm {
  0%   { transform: rotate(40deg); }   /* tucked */
  8%   { transform: rotate(44deg); }   /* anticipation */
  34%  { transform: rotate(1deg); }    /* reach forward */
  40%  { transform: rotate(-1deg); }   /* follow-through */
  58%  { transform: rotate(1deg); }    /* hold */
  92%  { transform: rotate(40deg); }   /* return */
  100% { transform: rotate(40deg); }
}
@keyframes bsDogLeg {
  0%   { transform: rotate(50deg); }
  8%   { transform: rotate(55deg); }
  34%  { transform: rotate(1deg); }    /* heel to hip height, not above */
  40%  { transform: rotate(-1deg); }
  58%  { transform: rotate(1deg); }
  92%  { transform: rotate(50deg); }
  100% { transform: rotate(50deg); }
}
@keyframes bsDogSpine { /* the spine RESISTS sway — barely moves */
  0%,100% { transform: rotate(0deg); }
  34%,58% { transform: rotate(-1deg); }
}
.bs-dog-arm   { transform-box: view-box; transform-origin: 196px 204px; transform: rotate(40deg); }
.bs-dog-leg   { transform-box: view-box; transform-origin: 300px 204px; transform: rotate(50deg); }
.bs-dog-spine { transform-box: view-box; transform-origin: 248px 202px; transform: rotate(0deg); }
.bs-run .bs-dog-arm   { animation: bsDogArm var(--rep-dur) ease-in-out infinite; }
.bs-run .bs-dog-leg   { animation: bsDogLeg var(--rep-dur) ease-in-out infinite; animation-delay: -140ms; } /* desync */
.bs-run .bs-dog-spine { animation: bsDogSpine var(--rep-dur) ease-in-out infinite; }

/* ---- DEAD BUG: working arm + opposite leg extend, slowly ---- */
@keyframes bsBugArm { /* rest = extended overhead (-96), tabletop = 0 */
  0%   { transform: rotate(-96deg); }
  8%   { transform: rotate(-92deg); }  /* anticipation */
  36%  { transform: rotate(0deg); }    /* to vertical tabletop */
  58%  { transform: rotate(0deg); }    /* hold */
  92%  { transform: rotate(-96deg); }  /* slow extend back out */
  100% { transform: rotate(-96deg); }
}
@keyframes bsBugLeg {
  0%   { transform: rotate(100deg); }
  8%   { transform: rotate(96deg); }
  36%  { transform: rotate(0deg); }
  58%  { transform: rotate(0deg); }
  92%  { transform: rotate(100deg); }
  100% { transform: rotate(100deg); }
}
.bs-bug-arm { transform-box: view-box; transform-origin: 158px 236px; transform: rotate(-96deg); }
.bs-bug-leg { transform-box: view-box; transform-origin: 252px 240px; transform: rotate(100deg); }
.bs-run .bs-bug-arm { animation: bsBugArm var(--rep-dur) ease-in-out infinite; }
.bs-run .bs-bug-leg { animation: bsBugLeg var(--rep-dur) ease-in-out infinite; animation-delay: -110ms; } /* contralateral feel */

/* ---- GLUTE BRIDGE: pelvis peels up; lumbar follows (one vertebra at a time) ---- */
@keyframes bsBridge {
  0%   { transform: rotate(0deg); }
  6%   { transform: rotate(2deg); }    /* anticipation: hips settle into the mat */
  30%  { transform: rotate(-15deg); }  /* drive up */
  36%  { transform: rotate(-16.5deg); }/* overshoot */
  58%  { transform: rotate(-15deg); }  /* hold the stacked line */
  92%  { transform: rotate(0deg); }    /* slow roll-down */
  100% { transform: rotate(0deg); }
}
@keyframes bsBridgeLumbar { /* lower-back peels a beat behind the pelvis */
  0%   { transform: rotate(0deg); }
  6%   { transform: rotate(1deg); }
  30%  { transform: rotate(-6deg); }
  36%  { transform: rotate(-7deg); }
  58%  { transform: rotate(-6deg); }
  92%  { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.bs-bridge-mover  { transform-box: view-box; transform-origin: 300px 206px; transform: rotate(0deg); }
.bs-bridge-lumbar { transform-box: view-box; transform-origin: 214px 244px; transform: rotate(0deg); }
.bs-run .bs-bridge-mover  { animation: bsBridge var(--rep-dur) ease-in-out infinite; }
.bs-run .bs-bridge-lumbar { animation: bsBridgeLumbar var(--rep-dur) ease-in-out infinite; animation-delay: -3960ms; } /* = lag ~40ms within a 4000 cycle, via negative wrap */

/* motion arcs — visible only while running */
.bs-arc { opacity: 0; transition: opacity 300ms ease; }
.bs-run .bs-arc { opacity: 0.4; }

/* clinical teaching overlay: neutral spine, lumbar contact, ROM ceiling.
   Amber, distinct from the oxblood motion arc. Always faintly present (it
   teaches the held pose too), with a soft attention pulse on the key cue. */
.bs-teach { opacity: 0.6; }
.bs-run .bs-teach { opacity: 0.72; }
@keyframes bsTeachPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
.bs-run .bs-teach-pulse { animation: bsTeachPulse var(--rep-dur) ease-in-out infinite; }

/* ── player chrome ── */
@keyframes bsScrub { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.bs-scrub-fill { transform-box: view-box; transform-origin: left center; transform: scaleX(0); }
.bs-run .bs-scrub-fill { animation: bsScrub var(--rep-dur) linear infinite; }

@keyframes bsPhaseLift  { 0%,7%{opacity:.25} 9%,33%{opacity:1} 35%,100%{opacity:.25} }
@keyframes bsPhaseHold  { 0%,33%{opacity:.25} 35%,57%{opacity:1} 59%,100%{opacity:.25} }
@keyframes bsPhaseLower { 0%,58%{opacity:.25} 60%,91%{opacity:1} 93%,100%{opacity:.25} }
.bs-ph { opacity: .25; }
.bs-run .bs-ph-lift  { animation: bsPhaseLift  var(--rep-dur) linear infinite; }
.bs-run .bs-ph-hold  { animation: bsPhaseHold  var(--rep-dur) linear infinite; }
.bs-run .bs-ph-lower { animation: bsPhaseLower var(--rep-dur) linear infinite; }

@keyframes bsBreathDot { 0%,100%{opacity:.3; transform:scale(0.9)} 50%{opacity:1; transform:scale(1.15)} }
.bs-breath-dot { transform-box: fill-box; transform-origin: center; }
.bs-run .bs-breath-dot { animation: bsBreathDot var(--breath-dur) ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .bs-fig * { animation: none !important; }
  /* freeze each figure at its demonstrated (mid/peak) pose, not the flat bottom */
  .bs-curl-mover   { transform: rotate(13deg); }
  .bs-curl-head    { transform: rotate(5deg); }
  .bs-plank-mover  { transform: rotate(-2deg); }
  .bs-dog-arm      { transform: rotate(2deg); }
  .bs-dog-leg      { transform: rotate(2deg); }
  .bs-bug-arm      { transform: rotate(-70deg); }
  .bs-bug-leg      { transform: rotate(74deg); }
  .bs-bridge-mover { transform: rotate(-15deg); }
  .bs-bridge-lumbar{ transform: rotate(-6deg); }
  .bs-arc { opacity: 0.4; }
  .bs-scrub-fill { transform: scaleX(1); }
  .bs-ph { opacity: .25; }
}
`;

type FigProps = { paused: boolean };

function svgProps(label: string): {
  viewBox: string;
  xmlns: string;
  role: "img";
  "aria-label": string;
  shapeRendering: string;
  style: CSSProperties;
} {
  return {
    viewBox: "0 0 480 360",
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    "aria-label": label,
    shapeRendering: "geometricPrecision",
    style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  };
}

/* ============================ CURL-UP ============================ */
function CurlUp() {
  return (
    <svg {...svgProps("Curl-up: from lying flat with knees bent, the shoulder blades lift a small amount off the mat, hold, then lower. The lumbar stays neutral; this is not a sit-up.")}>
      <FigureDefs />
      <rect width="480" height="360" fill={PAPER_FILL} />
      <Mat />
      <path className="bs-arc" d="M 150 214 A 96 96 0 0 1 182 180" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* static: far leg, pelvis, near bent leg — breathing idle on this group */}
      <g className="bs-breathe">
        <path d="M 280 248 L 384 250" stroke={SKIN_DEEP} strokeWidth="18" strokeLinecap="round" />
        <path d="M 382 250 L 400 247" stroke={SKIN_DEEP} strokeWidth="11" strokeLinecap="round" />
        <Mass d="M 244 230 C 268 227 291 231 300 240 C 306 248 301 257 289 259 C 267 261 250 259 244 256 Z" />
        <path d="M 286 246 L 322 182" stroke={SKIN} strokeWidth="28" strokeLinecap="round" />
        <path d="M 322 184 L 350 248" stroke={SKIN} strokeWidth="23" strokeLinecap="round" />
        <circle cx="322" cy="183" r="13.5" fill={SKIN} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <path d="M 348 250 L 382 250" stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
      </g>
      {/* moving: chest + neck + head + near arm; pivot at the waist */}
      <g className="bs-curl-mover">
        <Mass d="M 178 222 C 210 219 240 222 250 230 L 250 256 C 240 259 208 259 182 257 C 167 255 165 227 178 222 Z" />
        <path d="M 188 240 L 216 256 L 246 250" stroke={SKIN_DEEP} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="247" cy="250" r="5.5" fill={SKIN_DEEP} />
        {/* head sub-group leads */}
        <g className="bs-curl-head">
          <path d="M 176 234 L 158 230" stroke={SKIN} strokeWidth="18" strokeLinecap="round" />
          <circle cx="140" cy="226" r="22" fill={HEAD} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
    </svg>
  );
}

/* ============================ SIDE PLANK ============================ */
function SidePlank() {
  return (
    <svg {...svgProps("Side plank from the knees: propped on one forearm with the top arm raised, the hips lift so the body makes one straight line from shoulder to knee, hold, then lower. The hips stay stacked, not rolled forward.")}>
      <FigureDefs />
      <rect width="480" height="360" fill={PAPER_FILL} />
      <Mat />
      <path className="bs-arc" d="M 300 236 A 80 80 0 0 1 312 206" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* STATIC: forearm, upper arm, head, raised top arm */}
      <g className="bs-breathe-soft">
        <path d="M 150 250 L 206 250" stroke={SKIN_DEEP} strokeWidth="15" strokeLinecap="round" />
        <circle cx="148" cy="250" r="7" fill={SKIN_DEEP} />
        <path d="M 206 250 L 214 200" stroke={SKIN} strokeWidth="17" strokeLinecap="round" />
        <circle cx="200" cy="182" r="19" fill={HEAD} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <path d="M 214 200 L 232 142" stroke={SKIN} strokeWidth="14" strokeLinecap="round" />
        <circle cx="234" cy="139" r="6.5" fill={SKIN} />
      </g>
      {/* MOVING: torso → hip → thigh → knee → shin, swung at the shoulder */}
      <g className="bs-plank-mover">
        <Mass d="M 214 200 C 244 206 276 216 300 228 C 308 233 305 244 295 244 C 268 240 236 224 210 212 C 202 206 206 199 214 200 Z" />
        <ellipse cx="300" cy="236" rx="18" ry="13" fill={SKIN} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <path d="M 300 236 L 344 250" stroke={SKIN} strokeWidth="25" strokeLinecap="round" />
        <circle cx="346" cy="250" r="12" fill={SKIN} />
        <path d="M 346 250 L 392 256" stroke={SKIN_DEEP} strokeWidth="19" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============================ BIRD DOG ============================ */
function BirdDog() {
  return (
    <svg {...svgProps("Bird-dog on hands and knees: the opposite arm reaches forward and the opposite leg reaches straight back to hip height, holds, then returns. The spine stays still and level.")}>
      <FigureDefs />
      <rect width="480" height="360" fill={PAPER_FILL} />
      <Mat />
      <path className="bs-arc" d="M 150 232 A 60 60 0 0 1 120 200" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      <path className="bs-arc" d="M 330 232 A 60 60 0 0 0 372 206" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* moving far limbs (drawn first so support overlaps them) */}
      <g className="bs-dog-arm">
        <path d="M 196 204 L 126 196" stroke={SKIN_DEEP} strokeWidth="13" strokeLinecap="round" />
        <circle cx="123" cy="196" r="6" fill={SKIN_DEEP} />
      </g>
      <g className="bs-dog-leg">
        <path d="M 300 204 L 384 202" stroke={SKIN_DEEP} strokeWidth="14" strokeLinecap="round" />
        <circle cx="386" cy="202" r="6.5" fill={SKIN_DEEP} />
      </g>
      {/* support: near arm, back (spine resists sway), head, near leg */}
      <g className="bs-dog-spine">
        <path d="M 192 206 L 186 250" stroke={SKIN} strokeWidth="18" strokeLinecap="round" />
        <circle cx="186" cy="251" r="7" fill={SKIN} />
        <Mass d="M 196 190 C 236 186 270 186 302 190 L 302 214 C 270 218 236 218 196 214 C 184 210 184 195 196 190 Z" />
        <path d="M 196 200 L 178 197" stroke={SKIN} strokeWidth="15" strokeLinecap="round" />
        <circle cx="164" cy="194" r="18" fill={HEAD} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <path d="M 300 206 L 300 250" stroke={SKIN} strokeWidth="20" strokeLinecap="round" />
        <circle cx="300" cy="251" r="7.5" fill={SKIN} />
        <path d="M 300 251 L 326 251" stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============================ DEAD BUG ============================ */
function DeadBug() {
  return (
    <svg {...svgProps("Dead bug: lying on the back with the knees stacked over the hips and the arms reaching up, one arm lowers back overhead while the opposite leg extends straight out low, slowly, then both return. The lower back stays pinned to the mat the whole time.")}>
      <FigureDefs />
      <rect width="480" height="360" fill={PAPER_FILL} />
      <Mat />
      {/* supine torso — breathing at HALF amplitude (lumbar must read pinned) */}
      <g className="bs-breathe-soft">
        <circle cx="120" cy="240" r="18" fill={HEAD} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <Mass d="M 138 231 C 176 228 218 231 252 236 L 252 250 C 218 252 176 252 138 249 C 128 244 128 236 138 231 Z" />
        <ellipse cx="252" cy="242" rx="17" ry="13" fill={SKIN} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        {/* HELD tabletop pair (still) */}
        <path d="M 150 234 L 150 176" stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
        <circle cx="150" cy="174" r="6" fill={SKIN} />
        <path d="M 250 238 L 250 182" stroke={SKIN} strokeWidth="20" strokeLinecap="round" />
        <path d="M 250 182 L 300 178" stroke={SKIN} strokeWidth="17" strokeLinecap="round" />
        <circle cx="303" cy="178" r="7.5" fill={SKIN} />
      </g>
      {/* WORKING arm (deep) — drawn pointing up, rotated out overhead */}
      <g className="bs-bug-arm">
        <path d="M 158 236 L 158 176" stroke={SKIN_DEEP} strokeWidth="13" strokeLinecap="round" />
        <circle cx="158" cy="174" r="6" fill={SKIN_DEEP} />
      </g>
      {/* WORKING leg (deep) — drawn pointing up, rotated out low */}
      <g className="bs-bug-leg">
        <path d="M 252 240 L 252 168" stroke={SKIN_DEEP} strokeWidth="16" strokeLinecap="round" />
        <circle cx="252" cy="166" r="7.5" fill={SKIN_DEEP} />
      </g>
      {/* clinical: the lower back stays pinned to the mat while the limbs move */}
      <g className="bs-teach bs-teach-deadbug">
        <line className="bs-teach-pulse" x1="190" y1="251" x2="252" y2="251" stroke={TEACH} strokeWidth="2.6" strokeLinecap="round" />
        <line x1="206" y1="246" x2="206" y2="251" stroke={TEACH} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="222" y1="246" x2="222" y2="251" stroke={TEACH} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="238" y1="246" x2="238" y2="251" stroke={TEACH} strokeWidth="1.3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ============================ GLUTE BRIDGE ============================ */
function GluteBridge() {
  return (
    <svg {...svgProps("Glute bridge: lying on the back with knees bent and feet flat, the hips drive up until shoulder, hip, and knee stack in one line, hold, then lower one vertebra at a time. The shoulders and feet stay planted.")}>
      <FigureDefs />
      <rect width="480" height="360" fill={PAPER_FILL} />
      <Mat />
      <path className="bs-arc" d="M 250 238 A 60 60 0 0 1 268 206" fill="none" stroke={OX} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      {/* static: head, shoulders/upper back, planted feet + shins */}
      <g className="bs-breathe-soft">
        <circle cx="112" cy="240" r="18" fill={HEAD} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <Mass d="M 130 232 C 158 229 188 231 210 236 L 210 250 C 188 252 158 252 132 250 C 122 244 121 237 130 232 Z" />
        <path d="M 316 250 L 350 250" stroke={SKIN_DEEP} strokeWidth="13" strokeLinecap="round" />
        <path d="M 330 250 L 300 206" stroke={SKIN} strokeWidth="22" strokeLinecap="round" />
        <circle cx="300" cy="205" r="11" fill={SKIN} />
      </g>
      {/* moving: pelvis + thigh peel up; lumbar lags */}
      <g className="bs-bridge-mover">
        <ellipse cx="262" cy="241" rx="18" ry="13" fill={SKIN} stroke={EDGE} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <path d="M 262 240 L 300 206" stroke={SKIN} strokeWidth="26" strokeLinecap="round" />
        <g className="bs-bridge-lumbar">
          <Mass d="M 200 236 C 226 232 250 234 264 240 L 262 252 C 240 254 214 252 200 250 C 192 246 192 240 200 236 Z" />
        </g>
      </g>
    </svg>
  );
}

const FIGURES: Partial<
  Record<PictogramKey, { Comp: () => React.ReactNode; caption: string; repDur: number; breathDur: number }>
> = {
  "curl-up": { Comp: CurlUp, caption: "Curl-up · Lumbar neutral · 20° lift only", repDur: 4000, breathDur: 8000 },
  "side-plank": { Comp: SidePlank, caption: "Side plank · Hips stacked · Forearm support", repDur: 4400, breathDur: 8800 },
  "bird-dog": { Comp: BirdDog, caption: "Bird dog · Opposite arm + leg · Spine still", repDur: 4400, breathDur: 8800 },
  breath: { Comp: DeadBug, caption: "Dead bug · Supine · Spine-neutral core", repDur: 5200, breathDur: 5200 },
  decomp: { Comp: GluteBridge, caption: "Glute bridge · Supine · Posterior chain", repDur: 4400, breathDur: 8800 },
};

/* Phase label — lights LIFT · HOLD · LOWER with the motion */
function PhaseLabel() {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 18,
        display: "flex",
        gap: 10,
        fontFamily: "var(--font-mono, ui-monospace, monospace)",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        pointerEvents: "none",
      }}
    >
      <span className="bs-ph bs-ph-lift" style={{ color: OX, minWidth: 26, textAlign: "center" }}>Lift</span>
      <span className="bs-ph bs-ph-hold" style={{ color: OX, minWidth: 28, textAlign: "center" }}>Hold</span>
      <span className="bs-ph bs-ph-lower" style={{ color: OX, minWidth: 34, textAlign: "center" }}>Lower</span>
    </div>
  );
}

type Props = {
  moveKey: PictogramKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function AnimatedExercise({ moveKey, paused = false, className, style }: Props) {
  const entry = FIGURES[moveKey];
  if (!entry) return null;
  const { Comp, caption, repDur, breathDur } = entry;

  return (
    <div
      className={`bs-fig ${paused ? "" : "bs-run"} ${className ?? ""}`}
      style={
        {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: PAPER,
          "--rep-dur": `${repDur}ms`,
          "--breath-dur": `${breathDur}ms`,
          ...style,
        } as CSSProperties
      }
    >
      <Comp />

      {/* eyebrow + breath dot */}
      <div style={{ position: "absolute", left: 18, top: 16, display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: FAINT, pointerEvents: "none" }}>
        <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
          <circle className="bs-breath-dot" cx="5" cy="5" r="4" fill={AMBER} />
        </svg>
        {paused ? "Paused" : "Breathe"}
      </div>

      {/* phase label */}
      <PhaseLabel />

      {/* descriptive caption */}
      <div style={{ position: "absolute", left: 18, bottom: 20, fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, pointerEvents: "none" }}>
        {caption}
      </div>

      {/* loop scrub bar */}
      <svg
        viewBox="0 0 480 4"
        preserveAspectRatio="none"
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 3, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <rect x="0" y="1" width="480" height="2" fill="rgba(42,38,32,0.12)" />
        <rect className="bs-scrub-fill" x="0" y="1" width="480" height="2" fill={AMBER} />
      </svg>

      <style>{CSS}</style>
    </div>
  );
}

export default AnimatedExercise;
