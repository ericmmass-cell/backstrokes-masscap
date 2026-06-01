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

/* ════════════════════════════════════════════════════════════════
   figure engine — clean UNIFIED silhouettes.
   The fix for "can't tell what's happening": draw each body as one
   silhouette (all outline shapes first, then all fills) so the seams
   between limbs vanish, give it a real pelvis + chest + hands + feet,
   a hair-cap that shows which way the head faces, and a paper-colored
   HALO on the front body so it lifts cleanly off the body behind it.
   ════════════════════════════════════════════════════════════════ */

const HALO = "#F5F0E4"; // paper-colored separation ring

type Seg =
  | { k: "bone"; pts: number[]; w: number } // limb / torso polyline (round caps)
  | { k: "mass"; cx: number; cy: number; rx: number; ry?: number } // pelvis / chest / head
  | { k: "dot"; cx: number; cy: number; r: number }; // hand / foot

function segPath(pts: number[]) {
  let d = `M ${pts[0]} ${pts[1]}`;
  for (let i = 2; i < pts.length; i += 2) d += ` L ${pts[i]} ${pts[i + 1]}`;
  return d;
}

/* one full pass over a body's parts, in a single color, grown by `g` px */
function pass(segs: Seg[], color: string, g: number) {
  return segs.map((s, i) => {
    if (s.k === "bone")
      return (
        <path key={i} d={segPath(s.pts)} fill="none" stroke={color} strokeWidth={s.w + g} strokeLinecap="round" strokeLinejoin="round" />
      );
    if (s.k === "mass")
      return <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx + g / 2} ry={(s.ry ?? s.rx) + g / 2} fill={color} />;
    return <circle key={i} cx={s.cx} cy={s.cy} r={s.r + g / 2} fill={color} />;
  });
}

/* hair-cap on the BACK hemisphere of the head -> shows facing (face = opposite) */
function Hair({ x, y, r, face, tone }: { x: number; y: number; r: number; face: number; tone: Tone }) {
  const back = face + 180;
  const rr = r * 0.82;
  const rad = (d: number) => (d * Math.PI) / 180;
  const x0 = x + rr * Math.cos(rad(back - 95));
  const y0 = y + rr * Math.sin(rad(back - 95));
  const x1 = x + rr * Math.cos(rad(back + 95));
  const y1 = y + rr * Math.sin(rad(back + 95));
  return (
    <path d={`M ${x0} ${y0} A ${rr} ${rr} 0 1 1 ${x1} ${y1}`} fill="none" stroke={TONES[tone].line} strokeWidth={r * 0.5} strokeLinecap="round" />
  );
}

/* a whole person: unified silhouette + optional head + hair + halo */
function Figure({
  segs,
  tone,
  head,
  halo = false,
}: {
  segs: Seg[];
  tone: Tone;
  head?: { x: number; y: number; r: number; face: number };
  halo?: boolean;
}) {
  const t = TONES[tone];
  const all: Seg[] = head ? [...segs, { k: "mass", cx: head.x, cy: head.y, rx: head.r }] : segs;
  return (
    <g>
      {halo && <g>{pass(all, HALO, 13)}</g>}
      <g>{pass(all, t.line, 4.5)}</g>
      <g>{pass(all, t.fill, 0)}</g>
      {head && <Hair x={head.x} y={head.y} r={head.r} face={head.face} tone={tone} />}
    </g>
  );
}

/* bold neutral-spine teaching line */
function Spine2({ pts }: { pts: number[] }) {
  return <path d={segPath(pts)} fill="none" stroke={SPINE} strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" opacity="0.9" />;
}

/* bold double-headed motion arrow (with paper halo so it reads over figures) */
function MotionArrow({ x, y, axis = "h", len = 28 }: { x: number; y: number; axis?: "h" | "v"; len?: number }) {
  const x0 = axis === "h" ? x - len : x;
  const y0 = axis === "v" ? y - len : y;
  const x1 = axis === "h" ? x + len : x;
  const y1 = axis === "v" ? y + len : y;
  const dx = axis === "h" ? 1 : 0;
  const dy = axis === "v" ? 1 : 0;
  const head = (hx: number, hy: number, sx: number, sy: number) => {
    const s = 11, b = 8;
    const bx = hx - sx * s, by = hy - sy * s;
    const px = -sy, py = sx;
    return `M ${hx} ${hy} L ${bx + px * b} ${by + py * b} L ${bx - px * b} ${by - py * b} Z`;
  };
  return (
    <g className="pd-arc">
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={HALO} strokeWidth={12} strokeLinecap="round" />
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={ARROW} strokeWidth={5} strokeLinecap="round" />
      <path d={head(x1, y1, dx, dy)} fill={ARROW} />
      <path d={head(x0, y0, -dx, -dy)} fill={ARROW} />
    </g>
  );
}

/* ── anatomy: the connection (what makes the position legible) ──
   The penetrating member bridges the two pelvises so you can see who
   enters whom and where. Drawn in the penetrator's tone (it is their
   body). Clinical, not lurid — just the point of contact. */
const FLESH = { fill: "#cf8b78", line: "#8a4a3b" }; // genital flesh, distinct from both bodies

function Member({ base, tip, w = 11 }: { base: [number, number]; tip: [number, number]; w?: number }) {
  const d = `M ${base[0]} ${base[1]} L ${tip[0]} ${tip[1]}`;
  const g = w / 2 + 2; // glans radius
  return (
    <g className="pd-member">
      <path d={d} fill="none" stroke={FLESH.line} strokeWidth={w + 3} strokeLinecap="round" />
      <circle cx={tip[0]} cy={tip[1]} r={g + 1.5} fill={FLESH.line} />
      <path d={d} fill="none" stroke={FLESH.fill} strokeWidth={w} strokeLinecap="round" />
      <circle cx={tip[0]} cy={tip[1]} r={g} fill={FLESH.fill} />
    </g>
  );
}

/* the receiver's vulva — a small cleft mark at the point of entry */
function Vulva({ x, y, angle = 0, r = 9 }: { x: number; y: number; angle?: number; r?: number }) {
  const a = (angle * Math.PI) / 180;
  const dx = Math.cos(a) * r, dy = Math.sin(a) * r;
  return (
    <g>
      <path d={`M ${x - dx} ${y - dy} L ${x + dx} ${y + dy}`} stroke={FLESH.line} strokeWidth="6" strokeLinecap="round" />
      <path d={`M ${x - dx * 0.7} ${y - dy * 0.7} L ${x + dx * 0.7} ${y + dy * 0.7}`} stroke="#5e2a26" strokeWidth="2.5" strokeLinecap="round" />
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
  return svgWrap("Spoon: both partners lie on their sides facing the same way, the partner behind nested against the receiver's back with knees drawn up, the top arm draped over. The partner behind rocks gently.", paused, (
    <>
      <Floor y={255} />
      {/* pillow under both heads */}
      <rect x={74} y={210} width={84} height={22} rx={11} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      {/* RECEIVER — front comma (head left, horizontal trunk, knees curled up). Under. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 120, y: 214, r: 24, face: 180 }}
          segs={[
            { k: "mass", cx: 164, cy: 216, rx: 22, ry: 20 }, // chest
            { k: "bone", pts: [158, 216, 224, 220, 282, 224], w: 27 }, // horizontal trunk
            { k: "mass", cx: 290, cy: 226, rx: 27, ry: 23 }, // pelvis
            { k: "bone", pts: [150, 220, 126, 240, 152, 252], w: 13 }, // front arm on floor
            { k: "dot", cx: 154, cy: 253, r: 8 }, // hand
            { k: "bone", pts: [288, 226, 248, 244], w: 24 }, // thigh (knee curls fwd-left)
            { k: "bone", pts: [248, 244, 262, 272], w: 20 }, // shin (down to floor)
            { k: "dot", cx: 264, cy: 273, r: 10 }, // foot
          ]}
        />
        <Spine2 pts={[156, 206, 222, 210, 282, 215]} />
      </g>
      {/* PARTNER — same comma, nested directly behind+above (offset up+right). On top, halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 150, y: 168, r: 24, face: 180 }}
          segs={[
            { k: "mass", cx: 194, cy: 170, rx: 21, ry: 19 }, // chest
            { k: "bone", pts: [188, 170, 254, 174, 312, 178], w: 26 }, // horizontal trunk
            { k: "mass", cx: 320, cy: 180, rx: 26, ry: 22 }, // pelvis (behind receiver's)
            { k: "bone", pts: [186, 178, 228, 202, 262, 216], w: 14 }, // top arm draped over receiver's waist
            { k: "dot", cx: 264, cy: 217, r: 8 }, // hand
            { k: "bone", pts: [314, 180, 280, 188], w: 23 }, // top thigh (knee tucks toward chest)
            { k: "bone", pts: [280, 188, 306, 208], w: 19 }, // shin folds back, nested above receiver
            { k: "dot", cx: 309, cy: 209, r: 10 }, // foot
          ]}
        />
        {/* rear-entry connection: partner enters from behind */}
        <Member base={[316, 198]} tip={[294, 216]} w={11} />
      </g>
      <g className="pd-rockh"><MotionArrow x={330} y={150} axis="h" len={26} /></g>
    </>
  ));
}

/* MISSIONARY — receiver supine (oxblood), partner above in plank (amber). */
function Missionary(paused: boolean) {
  return svgWrap("Missionary: the receiving partner lies on their back with knees bent, the other partner holds a plank above them and rocks gently. The receiver's lower back stays neutral on the floor.", paused, (
    <>
      <Floor y={252} />
      {/* RECEIVER supine on the floor, knees bent up (face up). */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 92, y: 238, r: 21, face: 270 }}
          segs={[
            { k: "mass", cx: 132, cy: 238, rx: 21, ry: 18 }, // chest
            { k: "bone", pts: [116, 240, 172, 242, 210, 244], w: 26 }, // trunk on floor
            { k: "mass", cx: 218, cy: 244, rx: 25, ry: 21 }, // pelvis
            { k: "bone", pts: [216, 242, 248, 210], w: 23 }, // thigh up (knee bent)
            { k: "bone", pts: [248, 210, 280, 240], w: 19 }, // shin down to floor
            { k: "dot", cx: 282, cy: 241, r: 10 }, // foot
            { k: "bone", pts: [118, 242, 92, 250], w: 11 }, // arm flat on floor
            { k: "dot", cx: 90, cy: 251, r: 7 }, // hand
          ]}
        />
        <Spine2 pts={[120, 233, 172, 236, 210, 239]} />
        <Vulva x={212} y={240} angle={64} />
      </g>
      {/* PARTNER in a plank/press over the receiver, rocking. On top + halo. */}
      <g className="pd-rockv">
        <Figure
          tone="pt"
          halo
          head={{ x: 140, y: 206, r: 17, face: 215 }}
          segs={[
            { k: "bone", pts: [166, 206, 152, 250], w: 13 }, // arm to floor by receiver's shoulder
            { k: "dot", cx: 151, cy: 251, r: 8 }, // hand
            { k: "mass", cx: 180, cy: 202, rx: 19, ry: 17 }, // chest
            { k: "bone", pts: [176, 202, 206, 212, 230, 222], w: 25 }, // trunk down to hips over receiver
            { k: "mass", cx: 234, cy: 224, rx: 22, ry: 19 }, // pelvis OVER receiver's pelvis
            { k: "bone", pts: [234, 226, 274, 244], w: 21 }, // thigh back
            { k: "bone", pts: [274, 244, 302, 250], w: 17 }, // shin to floor
            { k: "dot", cx: 304, cy: 251, r: 9 }, // foot
          ]}
        />
        {/* front entry: partner enters downward into the receiver */}
        <Member base={[230, 230]} tip={[216, 240]} w={11} />
      </g>
      <g className="pd-rockv"><MotionArrow x={250} y={158} axis="v" len={20} /></g>
    </>
  ));
}

/* SUPINE KNEES UP (modified missionary) — receiver supine knees over bolster, partner kneeling. */
function SupineKneesUp(paused: boolean) {
  return svgWrap("Modified missionary: the receiving partner lies on their back with knees bent over a bolster, the other partner kneels close. The bolster keeps the lower back neutral.", paused, (
    <>
      <Floor y={252} />
      <Bolster x={250} y={238} w={74} h={24} />
      {/* RECEIVER supine, knees draped over the bolster (face up). */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 90, y: 240, r: 21, face: 270 }}
          segs={[
            { k: "mass", cx: 130, cy: 240, rx: 21, ry: 18 }, // chest
            { k: "bone", pts: [114, 242, 168, 244, 206, 246], w: 26 }, // trunk
            { k: "mass", cx: 214, cy: 246, rx: 24, ry: 20 }, // pelvis
            { k: "bone", pts: [212, 244, 250, 226], w: 22 }, // thigh up over bolster
            { k: "bone", pts: [250, 226, 258, 248], w: 18 }, // shin down behind bolster
            { k: "dot", cx: 259, cy: 249, r: 9 }, // foot
            { k: "bone", pts: [116, 244, 92, 251], w: 11 }, // arm on floor
            { k: "dot", cx: 90, cy: 252, r: 7 },
          ]}
        />
        <Spine2 pts={[118, 235, 168, 238, 206, 241]} />
        <Vulva x={214} y={241} angle={64} />
      </g>
      {/* PARTNER kneeling between the receiver's legs, hips at the receiver's pelvis. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 240, y: 152, r: 20, face: 180 }}
          segs={[
            { k: "bone", pts: [282, 250, 242, 248], w: 18 }, // shin flat on floor
            { k: "bone", pts: [242, 248, 242, 212], w: 23 }, // thigh vertical (kneeling)
            { k: "mass", cx: 242, cy: 208, rx: 22, ry: 19 }, // pelvis at receiver's
            { k: "bone", pts: [242, 208, 240, 172], w: 24 }, // torso upright
            { k: "mass", cx: 240, cy: 172, rx: 19, ry: 17 }, // chest
            { k: "bone", pts: [241, 182, 214, 196], w: 12 }, // arm braced over receiver
            { k: "dot", cx: 212, cy: 197, r: 7 },
          ]}
        />
        {/* front entry, kneeling */}
        <Member base={[238, 226]} tip={[218, 240]} w={11} />
      </g>
      <g className="pd-rockh"><MotionArrow x={250} y={150} axis="h" len={20} /></g>
    </>
  ));
}

/* SIDE-T — receiver side-lying, partner kneeling perpendicular. */
function SideT(paused: boolean) {
  return svgWrap("Side-lying T: the receiving partner lies on their side, the other partner kneels upright at a right angle. Side-lying keeps the spine neutral.", paused, (
    <>
      <Floor y={252} />
      <rect x={60} y={234} width={66} height={18} rx={9} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      {/* RECEIVER side-lying, head left, top leg lifted toward partner. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 94, y: 236, r: 21, face: 180 }}
          segs={[
            { k: "mass", cx: 134, cy: 237, rx: 21, ry: 18 }, // chest
            { k: "bone", pts: [114, 237, 168, 240, 200, 242], w: 26 }, // trunk
            { k: "mass", cx: 208, cy: 244, rx: 24, ry: 20 }, // pelvis
            { k: "bone", pts: [206, 246, 250, 248], w: 18 }, // bottom leg extended
            { k: "dot", cx: 252, cy: 249, r: 9 },
            { k: "bone", pts: [208, 238, 248, 216], w: 22 }, // top leg lifted (thigh)
            { k: "bone", pts: [248, 216, 258, 244], w: 18 }, // shin
            { k: "dot", cx: 260, cy: 245, r: 9 },
          ]}
        />
        <Spine2 pts={[116, 231, 168, 234, 200, 237]} />
        <Vulva x={210} y={244} angle={18} />
      </g>
      {/* PARTNER kneeling at the receiver's hips, perpendicular. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 252, y: 154, r: 20, face: 180 }}
          segs={[
            { k: "bone", pts: [292, 250, 252, 248], w: 18 }, // shin flat
            { k: "bone", pts: [252, 248, 252, 212], w: 23 }, // thigh vertical
            { k: "mass", cx: 252, cy: 210, rx: 22, ry: 19 }, // pelvis at receiver's hips
            { k: "bone", pts: [252, 210, 250, 174], w: 24 }, // torso
            { k: "mass", cx: 250, cy: 174, rx: 19, ry: 17 }, // chest
            { k: "bone", pts: [251, 182, 226, 200], w: 12 }, // arm over receiver
            { k: "dot", cx: 224, cy: 201, r: 7 },
          ]}
        />
        {/* entry at the hips */}
        <Member base={[250, 226]} tip={[222, 240]} w={11} />
      </g>
      <g className="pd-rockh"><MotionArrow x={228} y={150} axis="h" len={20} /></g>
    </>
  ));
}

/* EDGE OF BED — receiver supine at edge of a bed, partner standing. */
function EdgeBed(paused: boolean) {
  return svgWrap("Edge of bed: the receiving partner lies on their back with hips at the edge of the bed, the standing partner faces them. The mattress fully supports the spine.", paused, (
    <>
      <Floor y={290} shadow={false} />
      <Bed x={44} y={190} w={252} h={56} />
      {/* RECEIVER supine on the bed, hips at the right edge, knees up toward partner. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 72, y: 178, r: 18, face: 270 }}
          segs={[
            { k: "mass", cx: 110, cy: 178, rx: 19, ry: 16 }, // chest
            { k: "bone", pts: [91, 180, 182, 182, 252, 184], w: 25 }, // trunk on bed
            { k: "mass", cx: 282, cy: 186, rx: 24, ry: 20 }, // pelvis AT the edge
            { k: "bone", pts: [282, 182, 302, 150], w: 22 }, // thigh up (knee raised)
            { k: "bone", pts: [302, 150, 320, 176], w: 19 }, // shin (foot up toward partner)
            { k: "dot", cx: 322, cy: 177, r: 9 },
          ]}
        />
        <Spine2 pts={[94, 174, 182, 177, 252, 180]} />
      </g>
      {/* PARTNER standing on the floor at the bed edge, facing the receiver. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 328, y: 150, r: 19, face: 180 }}
          segs={[
            { k: "bone", pts: [330, 290, 326, 230], w: 20 }, // leg to floor
            { k: "dot", cx: 338, cy: 290, r: 9 }, // foot
            { k: "mass", cx: 326, cy: 226, rx: 22, ry: 20 }, // pelvis at the edge
            { k: "bone", pts: [326, 226, 328, 174], w: 24 }, // torso upright
            { k: "mass", cx: 328, cy: 176, rx: 19, ry: 18 }, // chest
            { k: "bone", pts: [327, 196, 300, 184], w: 12 }, // hands at receiver's raised legs
            { k: "dot", cx: 298, cy: 183, r: 7 },
          ]}
        />
        {/* front entry at the bed edge */}
        <Member base={[320, 206]} tip={[298, 188]} w={11} />
      </g>
      <g className="pd-rockh"><MotionArrow x={306} y={150} axis="h" len={20} /></g>
    </>
  ));
}

/* COWGIRL UPRIGHT — partner supine (amber), receiver straddling upright (oxblood). */
function CowgirlUpright(paused: boolean) {
  return svgWrap("Receiver on top: the partner lies on their back, the receiving partner sits upright straddling them and controls the rhythm. The upright spine stays tall and neutral.", paused, (
    <>
      <Floor y={252} />
      {/* PARTNER supine underneath, head right, knees bent up under the receiver. */}
      <g className="pd-breathe">
        <Figure
          tone="pt"
          head={{ x: 392, y: 238, r: 21, face: 270 }}
          segs={[
            { k: "mass", cx: 352, cy: 238, rx: 21, ry: 18 }, // chest
            { k: "bone", pts: [374, 240, 320, 242, 286, 244], w: 26 }, // trunk
            { k: "mass", cx: 280, cy: 244, rx: 24, ry: 20 }, // pelvis
            { k: "bone", pts: [282, 242, 250, 214], w: 22 }, // thigh up
            { k: "bone", pts: [250, 214, 224, 240], w: 19 }, // shin down
            { k: "dot", cx: 222, cy: 241, r: 10 },
          ]}
        />
        <Spine2 pts={[374, 233, 320, 237, 286, 240]} />
        {/* receiver rides; the connection shows at the junction */}
        <Member base={[274, 240]} tip={[260, 231]} w={11} />
      </g>
      {/* RECEIVER sitting upright astride the partner's hips, riding. On top + halo. */}
      <g className="pd-rockup">
        <Figure
          tone="rx"
          halo
          head={{ x: 256, y: 150, r: 20, face: 0 }}
          segs={[
            { k: "bone", pts: [256, 232, 234, 248], w: 17 }, // shin folded down (near)
            { k: "dot", cx: 232, cy: 249, r: 8 },
            { k: "bone", pts: [256, 232, 282, 246], w: 16 }, // other knee fwd
            { k: "mass", cx: 256, cy: 228, rx: 22, ry: 19 }, // hips
            { k: "bone", pts: [256, 226, 256, 168], w: 25 }, // tall torso
            { k: "mass", cx: 256, cy: 174, rx: 19, ry: 18 }, // chest
            { k: "bone", pts: [256, 182, 290, 206], w: 12 }, // arm down to partner chest
            { k: "dot", cx: 292, cy: 207, r: 7 },
          ]}
        />
      </g>
      <g className="pd-rockup"><MotionArrow x={214} y={160} axis="v" len={24} /></g>
    </>
  ));
}

/* DOGGY SUPPORTED — receiver chest-down on pillow stack, partner kneeling behind. */
function DoggySupported(paused: boolean) {
  return svgWrap("Supported rear-entry: the receiving partner rests chest-down on a stack of pillows with forearms on the floor, the other partner kneels behind. The chest support keeps the lower back neutral.", paused, (
    <>
      <Floor y={252} />
      {/* pillow stack under the chest */}
      <rect x={84} y={216} width={72} height={20} rx={8} fill="#efe6d2" stroke="#d9ccae" strokeWidth="2" />
      <rect x={90} y={230} width={66} height={20} rx={8} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />
      {/* RECEIVER chest-down on the pillows, hips high, forearms on floor. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 90, y: 216, r: 17, face: 200 }}
          segs={[
            { k: "bone", pts: [106, 222, 130, 248], w: 11 }, // forearm to floor
            { k: "dot", cx: 132, cy: 249, r: 7 },
            { k: "mass", cx: 124, cy: 216, rx: 18, ry: 15 }, // chest low on pillow
            { k: "bone", pts: [122, 216, 186, 198, 230, 206], w: 26 }, // back rising to hips
            { k: "mass", cx: 236, cy: 208, rx: 25, ry: 22 }, // pelvis high
            { k: "bone", pts: [236, 210, 240, 246], w: 22 }, // thigh down
            { k: "bone", pts: [240, 246, 270, 250], w: 18 }, // shin on floor
            { k: "dot", cx: 272, cy: 250, r: 9 },
          ]}
        />
        <Spine2 pts={[128, 210, 186, 193, 230, 201]} />
      </g>
      {/* PARTNER kneeling behind, rocking. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 288, y: 158, r: 19, face: 180 }}
          segs={[
            { k: "bone", pts: [326, 250, 288, 248], w: 18 }, // shin flat
            { k: "bone", pts: [288, 248, 288, 212], w: 23 }, // thigh vertical
            { k: "mass", cx: 288, cy: 210, rx: 22, ry: 19 }, // pelvis
            { k: "bone", pts: [288, 210, 286, 176], w: 24 }, // torso
            { k: "mass", cx: 286, cy: 176, rx: 19, ry: 17 }, // chest
            { k: "bone", pts: [287, 184, 254, 200], w: 12 }, // arm to receiver's hips
            { k: "dot", cx: 252, cy: 201, r: 7 },
          ]}
        />
        {/* rear entry into the raised hips */}
        <Member base={[286, 220]} tip={[256, 203]} w={11} />
      </g>
      <g className="pd-rockh"><MotionArrow x={256} y={150} axis="h" len={22} /></g>
    </>
  ));
}

/* DOGGY KNEELING — receiver hands+knees level, partner kneeling behind. */
function DoggyKneeling(paused: boolean) {
  return svgWrap("Rear-entry, kneeling: the receiving partner is on hands and knees with a level back, the other partner kneels upright behind. Keep the back level and neutral, not sagging.", paused, (
    <>
      <Floor y={252} />
      {/* RECEIVER on hands and knees, level back, head left. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 100, y: 194, r: 17, face: 180 }}
          segs={[
            { k: "bone", pts: [120, 198, 120, 248], w: 12 }, // arm to floor
            { k: "dot", cx: 120, cy: 250, r: 8 }, // hand
            { k: "mass", cx: 130, cy: 194, rx: 18, ry: 16 }, // shoulders
            { k: "bone", pts: [124, 193, 182, 192, 234, 193], w: 26 }, // level back
            { k: "mass", cx: 240, cy: 194, rx: 24, ry: 21 }, // pelvis
            { k: "bone", pts: [240, 196, 244, 246], w: 22 }, // thigh down
            { k: "bone", pts: [244, 246, 268, 250], w: 18 }, // shin on floor
            { k: "dot", cx: 270, cy: 250, r: 9 },
          ]}
        />
        <Spine2 pts={[126, 185, 182, 184, 234, 185]} />
      </g>
      {/* PARTNER kneeling behind, rocking. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 290, y: 154, r: 19, face: 180 }}
          segs={[
            { k: "bone", pts: [328, 250, 290, 248], w: 18 }, // shin flat
            { k: "bone", pts: [290, 248, 290, 210], w: 23 }, // thigh vertical
            { k: "mass", cx: 290, cy: 208, rx: 22, ry: 19 }, // pelvis
            { k: "bone", pts: [290, 208, 288, 172], w: 24 }, // torso
            { k: "mass", cx: 288, cy: 172, rx: 19, ry: 17 }, // chest
            { k: "bone", pts: [289, 180, 256, 192], w: 12 }, // arm to receiver's hips
            { k: "dot", cx: 254, cy: 193, r: 7 },
          ]}
        />
        {/* rear entry */}
        <Member base={[288, 216]} tip={[260, 196]} w={11} />
      </g>
      <g className="pd-rockh"><MotionArrow x={258} y={150} axis="h" len={22} /></g>
    </>
  ));
}

/* SCISSOR — both side-lying, legs interleaved. */
function Scissor(paused: boolean) {
  return svgWrap("Side-lying scissor: both partners lie on their sides with legs interleaved. Side-lying keeps spinal load low for both.", paused, (
    <>
      <Floor y={252} />
      {/* RECEIVER side-lying, head left; hips meet partner's in the centre. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 80, y: 230, r: 19, face: 180 }}
          segs={[
            { k: "mass", cx: 120, cy: 232, rx: 20, ry: 17 }, // chest
            { k: "bone", pts: [100, 232, 160, 236, 210, 240], w: 25 }, // trunk
            { k: "mass", cx: 218, cy: 242, rx: 23, ry: 19 }, // pelvis (centre, meets partner)
            { k: "bone", pts: [218, 240, 260, 226], w: 21 }, // top leg toward partner
            { k: "bone", pts: [260, 226, 300, 240], w: 17 }, // shin crossing
            { k: "dot", cx: 302, cy: 241, r: 9 },
            { k: "bone", pts: [220, 244, 266, 248], w: 15 }, // bottom leg
            { k: "dot", cx: 268, cy: 249, r: 7 },
          ]}
        />
        <Spine2 pts={[102, 226, 156, 230, 196, 234]} />
      </g>
      {/* PARTNER side-lying, head right (mirrored), legs interleave. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 400, y: 230, r: 19, face: 0 }}
          segs={[
            { k: "mass", cx: 360, cy: 232, rx: 20, ry: 17 }, // chest
            { k: "bone", pts: [380, 232, 320, 236, 264, 240], w: 25 }, // trunk
            { k: "mass", cx: 256, cy: 242, rx: 23, ry: 19 }, // pelvis (centre, meets receiver)
            { k: "bone", pts: [256, 240, 214, 226], w: 21 }, // top leg toward receiver
            { k: "bone", pts: [214, 226, 178, 240], w: 17 }, // shin crossing
            { k: "dot", cx: 176, cy: 241, r: 9 },
            { k: "bone", pts: [254, 244, 208, 248], w: 15 }, // bottom leg
            { k: "dot", cx: 206, cy: 249, r: 7 },
          ]}
        />
        {/* the connection where the pelvises meet */}
        <Member base={[250, 242]} tip={[230, 242]} w={10} />
      </g>
      <g className="pd-rockh"><MotionArrow x={240} y={150} axis="h" len={24} /></g>
    </>
  ));
}

/* SEATED LAP — partner seated upright, receiver straddling facing, both upright. */
function SeatedLap(paused: boolean) {
  return svgWrap("Seated lap embrace: one partner sits upright, the other straddles their lap facing them, both spines stacked and tall. Good for a neutral, upright back.", paused, (
    <>
      <Floor y={252} />
      {/* seat */}
      <rect x={280} y={220} width={84} height={32} rx={4} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />
      {/* PARTNER seated upright on the seat, facing left toward the receiver. */}
      <g className="pd-breathe">
        <Figure
          tone="pt"
          head={{ x: 304, y: 142, r: 20, face: 180 }}
          segs={[
            { k: "bone", pts: [304, 218, 266, 236], w: 22 }, // thigh forward
            { k: "bone", pts: [266, 236, 252, 250], w: 18 }, // shin to floor
            { k: "dot", cx: 250, cy: 251, r: 9 },
            { k: "mass", cx: 304, cy: 216, rx: 22, ry: 19 }, // pelvis on seat
            { k: "bone", pts: [304, 214, 304, 162], w: 24 }, // torso upright
            { k: "mass", cx: 304, cy: 172, rx: 19, ry: 18 }, // chest
            { k: "bone", pts: [304, 182, 272, 196], w: 12 }, // arm around receiver
            { k: "dot", cx: 270, cy: 197, r: 7 },
          ]}
        />
        <Spine2 pts={[304, 210, 304, 166]} />
        {/* face-to-face entry at the lap */}
        <Member base={[296, 222]} tip={[280, 222]} w={10} />
      </g>
      {/* RECEIVER astride the partner's lap, facing them, upright, rocking. On top + halo. */}
      <g className="pd-rockup">
        <Figure
          tone="rx"
          halo
          head={{ x: 264, y: 138, r: 19, face: 0 }}
          segs={[
            { k: "bone", pts: [266, 222, 240, 240], w: 17 }, // knee tucked beside partner
            { k: "dot", cx: 238, cy: 241, r: 7 },
            { k: "mass", cx: 266, cy: 220, rx: 20, ry: 18 }, // hips on lap
            { k: "bone", pts: [266, 218, 264, 160], w: 24 }, // torso upright
            { k: "mass", cx: 264, cy: 170, rx: 18, ry: 17 }, // chest
            { k: "bone", pts: [264, 178, 296, 192], w: 11 }, // arm around partner
            { k: "dot", cx: 298, cy: 193, r: 7 },
          ]}
        />
      </g>
      <g className="pd-rockup"><MotionArrow x={224} y={150} axis="v" len={20} /></g>
    </>
  ));
}

/* STANDING REAR — both standing, partner behind, front braced forward. */
function StandingRear(paused: boolean) {
  return svgWrap("Standing, rear: both partners stand, the front partner braces forward with hands on a surface, the other stands close behind. Bracing keeps the front partner's spine supported.", paused, (
    <>
      <Floor y={290} />
      {/* brace surface (counter) */}
      <rect x={36} y={216} width={100} height={14} rx={3} fill="#e7d39a" stroke="#c9ab5e" strokeWidth="2" />
      <rect x={44} y={230} width={10} height={60} fill="#d9ccae" />
      <rect x={120} y={230} width={10} height={60} fill="#d9ccae" />
      {/* FRONT partner (receiver) braced forward, hands on the counter. */}
      <g className="pd-breathe">
        <Figure
          tone="rx"
          head={{ x: 116, y: 206, r: 17, face: 180 }}
          segs={[
            { k: "bone", pts: [178, 290, 170, 236], w: 20 }, // leg to floor
            { k: "dot", cx: 180, cy: 291, r: 9 },
            { k: "mass", cx: 168, cy: 234, rx: 22, ry: 20 }, // hips (pushed back)
            { k: "bone", pts: [166, 232, 136, 212], w: 25 }, // torso leaning fwd
            { k: "mass", cx: 132, cy: 210, rx: 18, ry: 16 }, // chest
            { k: "bone", pts: [140, 214, 112, 222], w: 12 }, // arm to counter
            { k: "dot", cx: 110, cy: 223, r: 7 },
          ]}
        />
        <Spine2 pts={[166, 228, 140, 212]} />
      </g>
      {/* BACK partner standing close behind, rocking. On top + halo. */}
      <g className="pd-rockh">
        <Figure
          tone="pt"
          halo
          head={{ x: 214, y: 152, r: 19, face: 180 }}
          segs={[
            { k: "bone", pts: [228, 290, 222, 232], w: 20 }, // leg to floor
            { k: "dot", cx: 230, cy: 291, r: 9 },
            { k: "mass", cx: 221, cy: 230, rx: 22, ry: 20 }, // pelvis
            { k: "bone", pts: [221, 230, 216, 174], w: 24 }, // torso upright
            { k: "mass", cx: 216, cy: 178, rx: 19, ry: 18 }, // chest
            { k: "bone", pts: [218, 200, 186, 210], w: 12 }, // arm to receiver's hips
            { k: "dot", cx: 184, cy: 211, r: 7 },
          ]}
        />
        {/* rear entry, standing */}
        <Member base={[214, 240]} tip={[190, 236]} w={10} />
      </g>
      <g className="pd-rockh"><MotionArrow x={186} y={150} axis="h" len={22} /></g>
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
