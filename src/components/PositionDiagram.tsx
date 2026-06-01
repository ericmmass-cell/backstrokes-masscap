/**
 * PositionDiagram — clean, instructional SVG diagrams of each sex position.
 *
 * The brief (Eric, 2026-06-01): stop chasing realistic art and stop fighting a
 * censored image generator. Draw the positions ourselves as clear, good-looking
 * instructional figures, the way a yoga card or an IKEA manual shows a move:
 * who goes where, how the two bodies join, and the motion. Free, unfilterable,
 * fully under our control.
 *
 * The figure language (learned from three earlier rejected attempts):
 *   - A body is a set of ROUND-CAPPED capsule strokes + a head circle. Same-tone
 *     strokes union into a clean limb silhouette (no spiky path math).
 *   - Two tones so the couple reads clearly: receiver = oxblood, partner = amber.
 *     Each limb is a dark contour stroke under a colored fill stroke (crisp outline).
 *   - Draw the FRONT body last so it occludes the back body; the pair never merges.
 *   - One dashed line marks the load-bearer's NEUTRAL SPINE (the teaching point).
 *   - A small motion arc + a gentle CSS rock show HOW IT MOVES. transform-only,
 *     prefers-reduced-motion freezes a clear demonstrated frame.
 *
 * viewBox 0 0 480 320. Floor/bed line ~ y=250. One <style> per svg.
 */

import type { CSSProperties } from "react";
import type { PictogramKey } from "./Pictogram";

/* ── palette ── */
const PAPER_A = "#F7F2E7";
const PAPER_B = "#F1EAD9";
const INK = "#2a2620";
const SPINE = "#b07d2b"; // teaching line (amber)
const ARROW = "#722B2B"; // motion arrow (oxblood)

const TONES = {
  rx: { fill: "#b5524a", line: "#5e2222" }, // receiver, oxblood
  pt: { fill: "#cf9a3f", line: "#7a531a" }, // partner, amber
} as const;
type Tone = keyof typeof TONES;

/* ── shared paint + stage ── */
function Defs() {
  return (
    <defs>
      <radialGradient id="pdPaper" cx="50%" cy="42%" r="80%">
        <stop offset="0" stopColor={PAPER_A} />
        <stop offset="1" stopColor={PAPER_B} />
      </radialGradient>
      <radialGradient id="pdShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={INK} stopOpacity="0.16" />
        <stop offset="0.6" stopColor={INK} stopOpacity="0.06" />
        <stop offset="1" stopColor={INK} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Floor({ y = 250, shadow = true }: { y?: number; shadow?: boolean }) {
  return (
    <>
      <rect width="480" height="320" fill="url(#pdPaper)" />
      {shadow && <ellipse cx="240" cy={y + 10} rx="200" ry="16" fill="url(#pdShadow)" />}
      <line x1="40" y1={y} x2="440" y2={y} stroke={INK} strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round" />
    </>
  );
}

/* a limb = dark contour stroke under a colored fill stroke (round caps). */
function Limb({ pts, w, tone }: { pts: number[]; w: number; tone: Tone }) {
  let d = `M ${pts[0]} ${pts[1]}`;
  for (let i = 2; i < pts.length; i += 2) d += ` L ${pts[i]} ${pts[i + 1]}`;
  const t = TONES[tone];
  return (
    <>
      <path d={d} fill="none" stroke={t.line} strokeWidth={w + 3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={t.fill} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Head({ x, y, r = 19, tone }: { x: number; y: number; r?: number; tone: Tone }) {
  const t = TONES[tone];
  return (
    <>
      <circle cx={x} cy={y} r={r + 1.5} fill={t.line} />
      <circle cx={x} cy={y} r={r} fill={t.fill} />
    </>
  );
}

/* support props */
function Bolster({ x, y, w = 64, h = 22 }: { x: number; y: number; w?: number; h?: number }) {
  return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />;
}
function Bed({ x = 60, y = 196, w = 250, h = 58 }: { x?: number; y?: number; w?: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      <rect x={x} y={y} width={w} height={12} rx={6} fill="#f6efdf" />
      <rect x={x + 8} y={y + h} width={10} height={26} fill="#d9ccae" />
      <rect x={x + w - 18} y={y + h} width={10} height={26} fill="#d9ccae" />
    </>
  );
}

/* neutral-spine teaching line (dashed) */
function Spine({ pts }: { pts: number[] }) {
  let d = `M ${pts[0]} ${pts[1]}`;
  for (let i = 2; i < pts.length; i += 2) d += ` L ${pts[i]} ${pts[i + 1]}`;
  return <path d={d} fill="none" stroke={SPINE} strokeWidth="2.4" strokeDasharray="2 6" strokeLinecap="round" />;
}

/* motion arc — a small curved arrow showing the rhythm direction */
function MotionArc({ x, y, dir = 1 }: { x: number; y: number; dir?: 1 | -1 }) {
  // a short double-headed horizontal arc centered at (x,y)
  const r = 18;
  return (
    <g className="pd-arc" opacity="0.7">
      <path d={`M ${x - r} ${y} Q ${x} ${y - 10} ${x + r} ${y}`} fill="none" stroke={ARROW} strokeWidth="2.2" strokeLinecap="round" />
      <path d={`M ${x + r - 5} ${y - 5} L ${x + r} ${y} L ${x + r - 6} ${y + 3}`} fill="none" stroke={ARROW} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x - r + 5} ${y - 5} L ${x - r} ${y} L ${x - r + 6} ${y + 3}`} fill="none" stroke={ARROW} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

const CSS = `
.pd-svg { display:block; width:100%; height:100%; }
.pd-move { transform-box: view-box; }
@keyframes pdRockH { 0%,100%{ transform: translateX(0); } 50%{ transform: translateX(-13px); } }
@keyframes pdRockV { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-9px); } }
@keyframes pdRockUp { 0%,100%{ transform: translateY(0) rotate(0deg);} 50%{ transform: translateY(-7px) rotate(-2deg);} }
@keyframes pdBreathe { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-1.5px);} }
.pd-run .pd-rockh { animation: pdRockH 2200ms ease-in-out infinite; }
.pd-run .pd-rockv { animation: pdRockV 2200ms ease-in-out infinite; }
.pd-run .pd-rockup { animation: pdRockUp 2600ms ease-in-out infinite; }
.pd-run .pd-breathe { animation: pdBreathe 4200ms ease-in-out infinite; }
.pd-arc { opacity:0; transition: opacity 300ms ease; }
.pd-run .pd-arc { opacity:0.7; }
@media (prefers-reduced-motion: reduce){
  .pd-run .pd-rockh,.pd-run .pd-rockv,.pd-run .pd-rockup,.pd-run .pd-breathe{ animation:none; transform:none; }
  .pd-arc{ opacity:0.7; }
}
`;

function svgWrap(label: string, paused: boolean, children: React.ReactNode) {
  return (
    <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={label} className={`pd-svg pd-fig ${paused ? "" : "pd-run"}`}>
      <Defs />
      {children}
      <style>{CSS}</style>
    </svg>
  );
}

/* ════════════════ POSES ════════════════ */

/* SPOON — both side-lying, nested, facing left. Partner (amber) behind rocks in. */
function Spoon(paused: boolean) {
  return svgWrap("Spoon: both partners lie on their sides, the partner behind nested against the receiver in front, knees drawn up. The partner behind rocks gently.", paused, (
    <>
      <Floor y={250} />
      {/* pillow */}
      <rect x={70} y={196} width={70} height={20} rx={10} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      {/* BACK figure = partner (amber), drawn first */}
      <g className="pd-rockh">
        {/* top leg forward over receiver */}
        <Limb pts={[322, 214, 290, 250, 250, 246]} w={20} tone="pt" />
        {/* torso hip->shoulder */}
        <Limb pts={[322, 212, 276, 202, 232, 196]} w={26} tone="pt" />
        {/* neck + head */}
        <Limb pts={[232, 196, 214, 193]} w={13} tone="pt" />
        <Head x={196} y={190} r={18} tone="pt" />
        {/* top arm draped over receiver */}
        <Limb pts={[240, 200, 276, 220, 300, 238]} w={11} tone="pt" />
        <Spine pts={[322, 203, 276, 193, 234, 187]} />
      </g>
      {/* FRONT figure = receiver (oxblood) */}
      <g>
        {/* top leg drawn up */}
        <Limb pts={[300, 246, 262, 232, 232, 250]} w={20} tone="rx" />
        {/* lower leg */}
        <Limb pts={[300, 250, 268, 250]} w={16} tone="rx" />
        {/* torso */}
        <Limb pts={[300, 244, 254, 234, 206, 226]} w={26} tone="rx" />
        {/* neck + head */}
        <Limb pts={[206, 226, 186, 223]} w={13} tone="rx" />
        <Head x={166} y={222} r={19} tone="rx" />
        {/* arm resting forward */}
        <Limb pts={[210, 230, 244, 250]} w={11} tone="rx" />
        <Spine pts={[300, 233, 254, 224, 208, 217]} />
      </g>
      <g className="pd-rockh"><MotionArc x={300} y={150} /></g>
    </>
  ));
}

/* MISSIONARY — receiver supine (oxblood), partner above in plank (amber). */
function Missionary(paused: boolean) {
  return svgWrap("Missionary: the receiving partner lies on their back with knees bent, the other partner holds a plank above them and rocks gently. The receiver's lower back stays neutral on the floor.", paused, (
    <>
      <Floor y={250} />
      {/* RECEIVER supine (breathing) */}
      <g className="pd-breathe">
        <Head x={96} y={236} r={18} tone="rx" />
        <Limb pts={[114, 238, 210, 244]} w={26} tone="rx" />
        {/* bent legs, knees up */}
        <Limb pts={[210, 244, 250, 206, 286, 246]} w={22} tone="rx" />
        <Limb pts={[206, 246, 240, 210, 270, 248]} w={20} tone="rx" />
        <Spine pts={[120, 232, 175, 235, 208, 238]} />
      </g>
      {/* PARTNER plank above, rocks down/forward */}
      <g className="pd-rockv">
        {/* arms down to floor beside receiver shoulders */}
        <Limb pts={[150, 250, 158, 206]} w={12} tone="pt" />
        {/* torso shoulder->hip on a downward diagonal */}
        <Limb pts={[158, 200, 226, 196, 286, 214]} w={26} tone="pt" />
        {/* head over receiver */}
        <Limb pts={[158, 202, 140, 208]} w={12} tone="pt" />
        <Head x={123} y={210} r={17} tone="pt" />
        {/* legs back to feet on floor */}
        <Limb pts={[286, 214, 330, 248]} w={22} tone="pt" />
        <Limb pts={[300, 220, 344, 250]} w={20} tone="pt" />
        <Spine pts={[162, 192, 226, 188, 286, 206]} />
      </g>
      <g className="pd-rockv"><MotionArc x={236} y={150} /></g>
    </>
  ));
}

/* SUPINE KNEES UP (modified missionary) — receiver supine knees over bolster, partner kneeling. */
function SupineKneesUp(paused: boolean) {
  return svgWrap("Modified missionary: the receiving partner lies on their back with knees bent over a bolster, the other partner kneels close. The bolster keeps the lower back neutral.", paused, (
    <>
      <Floor y={250} />
      <Bolster x={250} y={236} w={70} h={24} />
      {/* RECEIVER supine, knees over bolster */}
      <g className="pd-breathe">
        <Head x={92} y={236} r={18} tone="rx" />
        <Limb pts={[110, 238, 206, 244]} w={26} tone="rx" />
        <Limb pts={[206, 244, 250, 220, 252, 246]} w={22} tone="rx" />
        <Spine pts={[116, 232, 170, 235, 206, 238]} />
      </g>
      {/* PARTNER kneeling, rocks */}
      <g className="pd-rockh">
        <Limb pts={[300, 250, 300, 214]} w={22} tone="pt" />
        <Limb pts={[300, 250, 340, 250]} w={18} tone="pt" />
        <Limb pts={[300, 214, 296, 178]} w={24} tone="pt" />
        <Limb pts={[296, 182, 280, 206]} w={11} tone="pt" />
        <Head x={296} y={160} r={18} tone="pt" />
        <Spine pts={[300, 212, 297, 184]} />
      </g>
      <g className="pd-rockh"><MotionArc x={276} y={150} dir={-1} /></g>
    </>
  ));
}

/* SIDE-T — receiver side-lying, partner kneeling perpendicular. */
function SideT(paused: boolean) {
  return svgWrap("Side-lying T: the receiving partner lies on their side, the other partner kneels upright at a right angle. Side-lying keeps the spine neutral.", paused, (
    <>
      <Floor y={250} />
      <rect x={60} y={232} width={64} height={18} rx={9} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      {/* RECEIVER side-lying, facing up-right */}
      <g className="pd-breathe">
        <Head x={96} y={236} r={18} tone="rx" />
        <Limb pts={[114, 235, 200, 240]} w={26} tone="rx" />
        {/* legs: top leg lifted toward partner */}
        <Limb pts={[200, 240, 244, 220, 256, 248]} w={22} tone="rx" />
        <Limb pts={[200, 244, 250, 246]} w={18} tone="rx" />
        <Spine pts={[118, 230, 200, 234]} />
      </g>
      {/* PARTNER kneeling upright perpendicular, behind the lifted legs */}
      <g className="pd-rockh">
        <Limb pts={[286, 250, 286, 214]} w={22} tone="pt" />
        <Limb pts={[286, 250, 326, 250]} w={18} tone="pt" />
        <Limb pts={[286, 214, 284, 176]} w={24} tone="pt" />
        <Limb pts={[284, 182, 262, 214]} w={11} tone="pt" />
        <Head x={284} y={158} r={18} tone="pt" />
        <Spine pts={[286, 212, 284, 180]} />
      </g>
      <g className="pd-rockh"><MotionArc x={262} y={150} dir={-1} /></g>
    </>
  ));
}

/* EDGE OF BED — receiver supine at edge of a bed, partner standing. */
function EdgeBed(paused: boolean) {
  return svgWrap("Edge of bed: the receiving partner lies on their back with hips at the edge of the bed, the standing partner faces them. The mattress fully supports the spine.", paused, (
    <>
      <Floor y={288} shadow={false} />
      <Bed x={48} y={188} w={250} h={56} />
      {/* RECEIVER supine on bed, hips at right edge, knees up */}
      <g className="pd-breathe">
        <Head x={84} y={176} r={17} tone="rx" />
        <Limb pts={[101, 178, 210, 184]} w={25} tone="rx" />
        {/* hips at edge ~ x=300; knees up/out toward partner */}
        <Limb pts={[210, 184, 268, 158, 300, 188]} w={21} tone="rx" />
        <Limb pts={[206, 186, 262, 162, 296, 190]} w={19} tone="rx" />
        <Spine pts={[104, 172, 160, 176, 210, 180]} />
      </g>
      {/* PARTNER standing on floor at the bed edge */}
      <g className="pd-rockh">
        <Limb pts={[340, 288, 336, 232]} w={20} tone="pt" />
        <Limb pts={[340, 288, 360, 288]} w={16} tone="pt" />
        <Limb pts={[336, 232, 338, 168]} w={24} tone="pt" />
        <Limb pts={[338, 196, 312, 190]} w={12} tone="pt" />
        <Head x={340} y={150} r={18} tone="pt" />
        <Spine pts={[336, 230, 338, 172]} />
      </g>
      <g className="pd-rockh"><MotionArc x={312} y={150} dir={-1} /></g>
    </>
  ));
}

/* COWGIRL UPRIGHT — partner supine (amber), receiver straddling upright (oxblood). */
function CowgirlUpright(paused: boolean) {
  return svgWrap("Receiver on top: the partner lies on their back, the receiving partner sits upright straddling them and controls the rhythm. The upright spine stays tall and neutral.", paused, (
    <>
      <Floor y={250} />
      {/* PARTNER supine underneath (breathing) */}
      <g className="pd-breathe">
        <Head x={392} y={236} r={18} tone="pt" />
        <Limb pts={[374, 238, 280, 244]} w={26} tone="pt" />
        {/* bent knees up under the receiver */}
        <Limb pts={[280, 244, 250, 214, 222, 246]} w={22} tone="pt" />
        <Spine pts={[374, 232, 320, 236, 286, 240]} />
      </g>
      {/* RECEIVER straddling upright, rocks up/down */}
      <g className="pd-rockup">
        {/* shins folded down beside partner hips */}
        <Limb pts={[252, 248, 270, 222]} w={18} tone="rx" />
        <Limb pts={[252, 248, 232, 222]} w={18} tone="rx" />
        {/* hips -> tall torso */}
        <Limb pts={[252, 224, 252, 162]} w={26} tone="rx" />
        {/* arms reaching down to partner chest */}
        <Limb pts={[252, 180, 288, 210]} w={11} tone="rx" />
        <Head x={252} y={142} r={19} tone="rx" />
        <Spine pts={[252, 220, 252, 166]} />
      </g>
      <g className="pd-rockup"><MotionArc x={210} y={150} /></g>
    </>
  ));
}

/* DOGGY SUPPORTED — receiver chest-down on pillow stack, partner kneeling behind. */
function DoggySupported(paused: boolean) {
  return svgWrap("Supported rear-entry: the receiving partner rests chest-down on a stack of pillows with forearms on the floor, the other partner kneels behind. The chest support keeps the lower back neutral.", paused, (
    <>
      <Floor y={250} />
      {/* pillow stack under chest */}
      <rect x={86} y={214} width={70} height={20} rx={8} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      <rect x={92} y={228} width={64} height={20} rx={8} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />
      {/* RECEIVER chest-down: head low on pillow, hips high */}
      <g className="pd-breathe">
        <Head x={92} y={214} r={17} tone="rx" />
        {/* forearms on floor */}
        <Limb pts={[108, 220, 132, 248]} w={11} tone="rx" />
        {/* torso rising from chest(low) to hips(high) */}
        <Limb pts={[120, 216, 190, 196, 232, 206]} w={26} tone="rx" />
        {/* thighs down to knees */}
        <Limb pts={[232, 206, 236, 248]} w={22} tone="rx" />
        <Spine pts={[126, 210, 190, 190, 232, 200]} />
      </g>
      {/* PARTNER kneeling behind, rocks */}
      <g className="pd-rockh">
        <Limb pts={[286, 250, 286, 216]} w={22} tone="pt" />
        <Limb pts={[286, 250, 326, 250]} w={18} tone="pt" />
        <Limb pts={[286, 216, 282, 180]} w={24} tone="pt" />
        <Limb pts={[284, 200, 250, 206]} w={11} tone="pt" />
        <Head x={282} y={162} r={18} tone="pt" />
        <Spine pts={[286, 214, 283, 184]} />
      </g>
      <g className="pd-rockh"><MotionArc x={252} y={150} dir={-1} /></g>
    </>
  ));
}

/* DOGGY KNEELING — receiver hands+knees level, partner kneeling behind. */
function DoggyKneeling(paused: boolean) {
  return svgWrap("Rear-entry, kneeling: the receiving partner is on hands and knees with a level back, the other partner kneels upright behind. Keep the back level and neutral, not sagging.", paused, (
    <>
      <Floor y={250} />
      {/* RECEIVER hands and knees */}
      <g className="pd-breathe">
        {/* arms down */}
        <Limb pts={[120, 196, 120, 248]} w={12} tone="rx" />
        <Head x={104} y={194} r={17} tone="rx" />
        {/* neck + level back */}
        <Limb pts={[118, 192, 232, 192]} w={26} tone="rx" />
        {/* thighs down to knees */}
        <Limb pts={[232, 192, 236, 248]} w={22} tone="rx" />
        <Spine pts={[122, 184, 180, 183, 232, 184]} />
      </g>
      {/* PARTNER kneeling behind */}
      <g className="pd-rockh">
        <Limb pts={[286, 250, 286, 212]} w={22} tone="pt" />
        <Limb pts={[286, 250, 326, 250]} w={18} tone="pt" />
        <Limb pts={[286, 212, 282, 174]} w={24} tone="pt" />
        <Limb pts={[284, 194, 252, 192]} w={11} tone="pt" />
        <Head x={282} y={156} r={18} tone="pt" />
        <Spine pts={[286, 210, 283, 178]} />
      </g>
      <g className="pd-rockh"><MotionArc x={254} y={150} dir={-1} /></g>
    </>
  ));
}

/* SCISSOR — both side-lying, legs interleaved. */
function Scissor(paused: boolean) {
  return svgWrap("Side-lying scissor: both partners lie on their sides with legs interleaved. Side-lying keeps spinal load low for both.", paused, (
    <>
      <Floor y={250} />
      {/* RECEIVER side-lying, head left */}
      <g className="pd-breathe">
        <Head x={84} y={232} r={18} tone="rx" />
        <Limb pts={[102, 234, 196, 240]} w={26} tone="rx" />
        {/* one leg angled up (interleave) */}
        <Limb pts={[196, 240, 248, 224, 300, 244]} w={22} tone="rx" />
        <Spine pts={[106, 228, 196, 234]} />
      </g>
      {/* PARTNER side-lying, head right, mirrored, legs cross */}
      <g className="pd-rockh">
        <Head x={396} y={232} r={18} tone="pt" />
        <Limb pts={[378, 234, 284, 240]} w={26} tone="pt" />
        <Limb pts={[284, 240, 232, 228, 180, 246]} w={22} tone="pt" />
        <Spine pts={[374, 228, 284, 234]} />
      </g>
      <g className="pd-rockh"><MotionArc x={240} y={150} /></g>
    </>
  ));
}

/* SEATED LAP — partner seated upright, receiver straddling facing, both upright. */
function SeatedLap(paused: boolean) {
  return svgWrap("Seated lap embrace: one partner sits upright, the other straddles their lap facing them, both spines stacked and tall. Good for a neutral, upright back.", paused, (
    <>
      <Floor y={250} />
      {/* simple seat block */}
      <rect x={250} y={216} width={86} height={34} rx={4} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />
      {/* PARTNER seated upright (amber), facing left */}
      <g className="pd-breathe">
        {/* lower legs down off seat */}
        <Limb pts={[300, 248, 300, 250]} w={18} tone="pt" />
        <Limb pts={[300, 216, 300, 160]} w={26} tone="pt" />
        <Limb pts={[300, 184, 264, 196]} w={12} tone="pt" />
        <Head x={300} y={140} r={19} tone="pt" />
        <Spine pts={[300, 214, 300, 164]} />
      </g>
      {/* RECEIVER straddling lap, facing partner, upright, rocks */}
      <g className="pd-rockup">
        {/* knees tucked beside partner hips */}
        <Limb pts={[258, 226, 232, 244]} w={18} tone="rx" />
        <Limb pts={[258, 200, 258, 150]} w={26} tone="rx" />
        <Limb pts={[258, 172, 292, 184]} w={12} tone="rx" />
        <Head x={258} y={130} r={19} tone="rx" />
        <Spine pts={[258, 204, 258, 154]} />
      </g>
      <g className="pd-rockup"><MotionArc x={210} y={138} /></g>
    </>
  ));
}

/* STANDING REAR — both standing, partner behind, front braced forward. */
function StandingRear(paused: boolean) {
  return svgWrap("Standing, rear: both partners stand, the front partner braces forward with hands on a surface, the other stands close behind. Bracing keeps the front partner's spine supported.", paused, (
    <>
      <Floor y={288} />
      {/* brace surface (counter) */}
      <rect x={40} y={214} width={96} height={14} rx={3} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />
      <rect x={46} y={228} width={10} height={60} fill="#d9ccae" />
      <rect x={120} y={228} width={10} height={60} fill="#d9ccae" />
      {/* FRONT partner braced forward (receiver, oxblood) */}
      <g className="pd-breathe">
        {/* legs */}
        <Limb pts={[176, 288, 168, 234]} w={20} tone="rx" />
        {/* torso leaning forward toward counter */}
        <Limb pts={[168, 234, 130, 210]} w={26} tone="rx" />
        {/* arms to counter */}
        <Limb pts={[140, 216, 108, 220]} w={12} tone="rx" />
        <Head x={112} y={206} r={18} tone="rx" />
        <Spine pts={[170, 232, 134, 208]} />
      </g>
      {/* BACK partner standing close behind, rocks */}
      <g className="pd-rockh">
        <Limb pts={[226, 288, 220, 232]} w={20} tone="pt" />
        <Limb pts={[220, 232, 214, 172]} w={24} tone="pt" />
        <Limb pts={[216, 200, 184, 212]} w={12} tone="pt" />
        <Head x={214} y={152} r={18} tone="pt" />
        <Spine pts={[220, 230, 214, 176]} />
      </g>
      <g className="pd-rockh"><MotionArc x={186} y={150} dir={-1} /></g>
    </>
  ));
}

const DIAGRAMS: Partial<Record<PictogramKey, (paused: boolean) => React.ReactNode>> = {
  spoon: Spoon,
  "supine-knees-up": SupineKneesUp,
  "side-T": SideT,
  "edge-bed": EdgeBed,
  "cowgirl-upright": CowgirlUpright,
  "doggy-supported": DoggySupported,
  "doggy-kneeling": DoggyKneeling,
  scissor: Scissor,
  "seated-lap": SeatedLap,
  missionary: Missionary,
  standing: StandingRear,
  // NOTE: supine-bolster is the SOLO acute-day position; it must NOT borrow a
  // partnered diagram. The Pictogram dispatch renders its dedicated solo SVG.
};

export function hasDiagram(key: PictogramKey): boolean {
  return key in DIAGRAMS;
}

export function PositionDiagram({ positionKey, paused = false, style }: { positionKey: PictogramKey; paused?: boolean; style?: CSSProperties }) {
  const draw = DIAGRAMS[positionKey];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      {draw ? draw(paused) : null}
    </div>
  );
}

export default PositionDiagram;
