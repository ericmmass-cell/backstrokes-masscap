/**
 * Exercise anatomy diagrams — vintage medical plate style.
 *
 * After three failed attempts to draw procedural humans out of SVG
 * primitives, the visual language changed entirely. No more torsos with
 * heads. No more limbs.
 *
 * Each move is now a side-view anatomical diagram of the spine and
 * pelvis in the position the exercise demands, with motion arrows,
 * labels, and a "what this asks of the body" caption.
 *
 * The breath / down-train moves get a posterior pelvic-ring + floor
 * sling view instead, since spine position is not the variable there.
 *
 * Reading order on screen: header (move name + role) → diagram (the
 * anatomy doing the work) → cue (the one-sentence teaching point).
 *
 * Component name "HumanFigure" preserved so /session and the rest of
 * the app keep importing the same thing without churn.
 */

import type { CSSProperties } from "react";

/* ---------- palette (matches Schematic.tsx engraving plates) ---------- */
const INK = "#2A2620";
const MUTED = "#6F6859";
const OX = "#722B2B";
const RULE = "#D9CFB5";
const PAPER = "#F4EFE3";
const PAPER_2 = "#EFE7D2";

type MoveKey =
  | "curl-up"
  | "side-plank"
  | "bird-dog"
  | "breath"
  | "reverse-kegel"
  | "decomp";

type Props = {
  moveKey: MoveKey;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

const META: Record<
  MoveKey,
  { fig: string; title: string; sub: string; cue: string }
> = {
  "curl-up": {
    fig: "IV.a",
    title: "Curl-up",
    sub: "Lumbar spine in neutral lordosis under upper-quadrant load",
    cue: "Hands under low back. Lift head and shoulders only. The lumbar curve does not flatten.",
  },
  "side-plank": {
    fig: "IV.b",
    title: "Side bridge",
    sub: "Lateral chain endurance with neutral spine",
    cue: "Knees stacked. Hips lift in one line from shoulder to knee. No sag at the waist.",
  },
  "bird-dog": {
    fig: "IV.c",
    title: "Bird-dog",
    sub: "Contralateral limb extension with spine held still",
    cue: "Opposite arm and leg. The spine does not rotate. The water glass on your back does not spill.",
  },
  "breath": {
    fig: "V.a",
    title: "Diaphragmatic breath",
    sub: "Inferior view, pelvic floor in repose",
    cue: "Side-lying, knees stacked. Inhale: floor drops. Exhale: floor returns. No squeezing.",
  },
  "reverse-kegel": {
    fig: "V.b",
    title: "Reverse kegel",
    sub: "Levator ani release vector",
    cue: "Drop the floor down and out. Opposite of what the kegel app taught.",
  },
  "decomp": {
    fig: "V.c",
    title: "Decompression",
    sub: "Sagittal traction at the lumbosacral junction",
    cue: "Knees to chest, slow rock. Discs rehydrate. The spine remembers length.",
  },
};

/* ============================================================
   Engraving toolkit — local copy so this file is self-contained
   ============================================================ */

function EngravingDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`hatch-sparse-${id}`} patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.5" />
      </pattern>
      <pattern id={`stipple-${id}`} patternUnits="userSpaceOnUse" width="4" height="4">
        <circle cx="1" cy="1" r="0.45" fill={INK} />
        <circle cx="3" cy="3" r="0.45" fill={INK} />
      </pattern>
      <pattern id={`hatch-ox-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="3" stroke={OX} strokeWidth="0.7" />
      </pattern>
      <pattern id={`paper-${id}`} patternUnits="userSpaceOnUse" width="60" height="60">
        <rect width="60" height="60" fill={PAPER} />
        <circle cx="13" cy="22" r="0.6" fill={INK} opacity="0.05" />
        <circle cx="44" cy="9" r="0.5" fill={INK} opacity="0.05" />
        <circle cx="31" cy="48" r="0.7" fill={INK} opacity="0.05" />
      </pattern>
    </defs>
  );
}

/**
 * Spine column composed from vertebra rectangles + stippled discs, laid
 * along a parametric path. Takes a function that returns (x,y,angle)
 * for t in [0,1] from cranial to caudal. This is how we get a curled
 * spine, a horizontal spine, a flexed spine — all from one primitive.
 */
function SpineColumn({
  path,
  labels = ["L1", "L2", "L3", "L4", "L5"],
  highlightInjured = true,
  defsId,
}: {
  path: (t: number) => { x: number; y: number; angle: number };
  labels?: string[];
  highlightInjured?: boolean;
  defsId: string;
}) {
  const n = labels.length;
  return (
    <g>
      {/* Discs */}
      {Array.from({ length: n - 1 }).map((_, i) => {
        const t = (i + 0.5) / (n - 1);
        const { x, y, angle } = path(t);
        const isInjured = highlightInjured && i === n - 2; // L4-L5
        return (
          <g key={`disc-${i}`} transform={`translate(${x}, ${y}) rotate(${angle})`}>
            <ellipse
              cx="0"
              cy="0"
              rx="18"
              ry="3.5"
              fill={isInjured ? `url(#hatch-ox-${defsId})` : `url(#stipple-${defsId})`}
              stroke={isInjured ? OX : INK}
              strokeWidth="0.9"
            />
          </g>
        );
      })}
      {/* Vertebrae */}
      {labels.map((label, i) => {
        const t = i / (n - 1);
        const { x, y, angle } = path(t);
        const highlight = highlightInjured && (label === "L4" || label === "L5");
        return (
          <g key={`v-${i}`} transform={`translate(${x}, ${y}) rotate(${angle})`}>
            {/* Vertebral body */}
            <rect x="-18" y="-9" width="36" height="18" rx="3" fill={PAPER_2} stroke={INK} strokeWidth="1.1" />
            {/* Spinous process points "back" (negative x in local frame) */}
            <path d={`M -18 -3 L -28 0 L -18 3 Z`} fill={PAPER_2} stroke={INK} strokeWidth="1" />
            {highlight && (
              <rect x="-20" y="-11" width="40" height="22" fill="none" stroke={OX} strokeWidth="1" strokeDasharray="2 2" />
            )}
            <text
              x="2"
              y="3"
              fontFamily="Spectral, Georgia, serif"
              fontStyle="italic"
              fontSize="9"
              fill={highlight ? OX : MUTED}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
      {/* Sacrum wedge at caudal end */}
      {(() => {
        const { x, y, angle } = path(1);
        return (
          <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
            <path d={`M -18 9 L 18 9 L 26 56 L -6 66 Z`} fill={PAPER_2} stroke={INK} strokeWidth="1.1" />
            <path d={`M -18 9 L 18 9 L 26 56 L -6 66 Z`} fill={`url(#hatch-sparse-${defsId})`} opacity="0.4" />
          </g>
        );
      })()}
    </g>
  );
}

/** Pelvis side-view bone outline (the ilium → ischium → pubis silhouette) */
function PelvisSagittal({ cx, cy, scale = 1, mirror = false }: { cx: number; cy: number; scale?: number; mirror?: boolean }) {
  const s = scale * (mirror ? -1 : 1);
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${s}, ${scale})`}>
      <path
        d="M -40 -34 Q -10 -50 30 -40 Q 50 -10 42 26 Q 28 40 -2 32 Q -34 22 -44 -2 Q -50 -22 -40 -34 Z"
        fill={PAPER_2}
        stroke={INK}
        strokeWidth="1.3"
      />
      <path
        d="M -40 -34 Q -10 -50 30 -40 Q 50 -10 42 26 Q 28 40 -2 32 Q -34 22 -44 -2 Q -50 -22 -40 -34 Z"
        fill="url(#hatch-sparse-spine)"
        opacity="0.3"
      />
      {/* Acetabulum (hip socket) */}
      <circle cx="0" cy="0" r="7" fill={PAPER} stroke={INK} strokeWidth="1" />
      <circle cx="0" cy="0" r="3" fill={INK} opacity="0.4" />
    </g>
  );
}

/** Femur/leg suggestion — bone shaft from pelvis going to ground */
function FemurStub({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len, ny = dx / len;
  return (
    <g>
      <path
        d={`M ${x1 + nx * 5} ${y1 + ny * 5} L ${x2 + nx * 4} ${y2 + ny * 4} L ${x2 - nx * 4} ${y2 - ny * 4} L ${x1 - nx * 5} ${y1 - ny * 5} Z`}
        fill={PAPER_2}
        stroke={INK}
        strokeWidth="1.1"
      />
      <circle cx={x1} cy={y1} r="6" fill={PAPER_2} stroke={INK} strokeWidth="1" />
      <circle cx={x2} cy={y2} r="5" fill={PAPER_2} stroke={INK} strokeWidth="1" />
    </g>
  );
}

/** Mat / floor / ground reference line */
function GroundLine({ y, w, label }: { y: number; w: number; label?: string }) {
  return (
    <g>
      <line x1="20" y1={y} x2={w - 20} y2={y} stroke={INK} strokeWidth="0.8" />
      {/* Hatch marks below ground */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 40 + i * ((w - 80) / 11);
        return <line key={i} x1={x} y1={y} x2={x - 4} y2={y + 8} stroke={INK} strokeWidth="0.5" />;
      })}
      {label && (
        <text x={w - 24} y={y + 18} fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="0.22em" fill={MUTED} textAnchor="end">
          {label}
        </text>
      )}
    </g>
  );
}

/** Motion arrow — straight, oxblood, with label */
function MotionArrow({
  x1, y1, x2, y2, label, anchor = "start",
}: {
  x1: number; y1: number; x2: number; y2: number; label?: string; anchor?: "start" | "end" | "middle";
}) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  const ax = x2 - ux * 8, ay = y2 - uy * 8;
  const px = -uy, py = ux;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={OX} strokeWidth="1.6" />
      <path d={`M ${ax + px * 5} ${ay + py * 5} L ${x2} ${y2} L ${ax - px * 5} ${ay - py * 5} Z`} fill={OX} />
      {label && (
        <text
          x={(x1 + x2) / 2 + px * 12}
          y={(y1 + y2) / 2 + py * 12}
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          letterSpacing="0.18em"
          fill={OX}
          textAnchor={anchor === "end" ? "end" : "start"}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Specimen-label callout: hairline + dot + italic label */
function Callout({
  x1, y1, x2, y2, label, sub, anchor = "start",
}: {
  x1: number; y1: number; x2: number; y2: number; label: string; sub?: string; anchor?: "start" | "end" | "middle";
}) {
  const labelX = anchor === "end" ? x2 - 4 : anchor === "middle" ? x2 : x2 + 4;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="0.6" />
      <circle cx={x1} cy={y1} r="1.3" fill={INK} />
      <text
        x={labelX}
        y={y2}
        fontFamily="Spectral, Georgia, serif"
        fontStyle="italic"
        fontSize="10"
        fill={INK}
        textAnchor={anchor}
        dominantBaseline="middle"
      >
        {label}
        {sub && (
          <tspan x={labelX} dy="11" fontFamily="JetBrains Mono, monospace" fontStyle="normal" fontSize="6.5" letterSpacing="0.18em" fill={MUTED}>
            {sub.toUpperCase()}
          </tspan>
        )}
      </text>
    </g>
  );
}

/* ============================================================
   Per-move anatomical compositions
   ============================================================ */

const VBOX_W = 560;
const VBOX_H = 360;

function CurlUpDiagram() {
  // Supine. Spine horizontal with preserved lumbar lordosis. Knees bent.
  // Head/shoulders lifted (shown as motion arrow upward at the cranial end
  // of the spine). Hands marked under the lumbar curve.
  const path = (t: number) => {
    // Spine runs left to right, with a small upward curve in the middle (lordosis from below)
    const x = 130 + t * 280;
    const y = 200 - Math.sin(t * Math.PI) * 12;
    const angle = 90; // vertical labels reading top-to-bottom of spine
    return { x, y, angle };
  };

  return (
    <>
      <GroundLine y={260} w={VBOX_W} label="MAT" />
      {/* Spine */}
      <SpineColumn path={path} defsId="spine" />
      {/* Pelvis at caudal end */}
      <PelvisSagittal cx={430} cy={210} scale={0.6} />
      {/* Bent leg — femur up, then shin down */}
      <FemurStub x1={430} y1={210} x2={488} y2={172} />
      <FemurStub x1={488} y1={172} x2={494} y2={252} />
      {/* "Lift head & shoulders" arrow upward at cranial end */}
      <MotionArrow x1={120} y1={210} x2={120} y2={170} label="LIFT 2-3°" />
      {/* Callout: hands under lumbar curve */}
      <Callout x1={270} y1={210} x2={250} y2={290} label="hands here" sub="preserve lumbar curve" anchor="start" />
      {/* Callout: lordotic curve preserved */}
      <Callout x1={270} y1={195} x2={310} y2={130} label="neutral lordosis" sub="do not flatten" anchor="start" />
    </>
  );
}

function SidePlankDiagram() {
  // Lateral view: knees stacked, hips lifted, body in straight line
  // from shoulder to knee. Spine drawn at an angle.
  const path = (t: number) => {
    const x = 150 + t * 230;
    const y = 230 - t * 40; // gentle rise from shoulder to hip
    const angle = 100;
    return { x, y, angle };
  };
  return (
    <>
      <GroundLine y={300} w={VBOX_W} label="MAT" />
      <SpineColumn path={path} defsId="spine" />
      {/* Pelvis at hip end */}
      <PelvisSagittal cx={395} cy={195} scale={0.55} />
      {/* Stacked knees — bent leg drops to ground */}
      <FemurStub x1={395} y1={195} x2={460} y2={258} />
      <FemurStub x1={460} y1={258} x2={476} y2={295} />
      {/* Supporting elbow contact at cranial end */}
      <circle cx="148" cy="240" r="6" fill={PAPER_2} stroke={INK} strokeWidth="1" />
      <text x="148" y="263" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="0.22em" fill={MUTED} textAnchor="middle">
        ELBOW
      </text>
      {/* Lift vector at hip */}
      <MotionArrow x1={395} y1={230} x2={395} y2={186} label="HIP LIFT" />
      <Callout x1={280} y1={208} x2={310} y2={150} label="one line" sub="shoulder → knee" />
    </>
  );
}

function BirdDogDiagram() {
  // Quadruped. Spine horizontal. Opposite arm extends forward, opposite
  // leg extends back. Spine must not rotate.
  const path = (t: number) => {
    const x = 180 + t * 220;
    const y = 200;
    const angle = 90;
    return { x, y, angle };
  };
  return (
    <>
      <GroundLine y={280} w={VBOX_W} label="MAT" />
      <SpineColumn path={path} defsId="spine" />
      {/* Pelvis */}
      <PelvisSagittal cx={415} cy={200} scale={0.55} />
      {/* Supporting hand (right side) */}
      <circle cx="180" cy="278" r="6" fill={PAPER_2} stroke={INK} strokeWidth="1" />
      {/* Supporting knee (right side) */}
      <circle cx="430" cy="278" r="6" fill={PAPER_2} stroke={INK} strokeWidth="1" />
      <FemurStub x1={415} y1={200} x2={430} y2={278} />
      {/* Extending arm forward */}
      <MotionArrow x1={170} y1={200} x2={80} y2={180} label="ARM EXTENDS" />
      {/* Extending leg backward */}
      <MotionArrow x1={440} y1={200} x2={520} y2={180} label="LEG EXTENDS" />
      <Callout x1={290} y1={200} x2={300} y2={130} label="spine still" sub="no rotation, no sag" />
    </>
  );
}

function BreathDiagram() {
  // Side-lying. Show the diaphragm + pelvic floor with breath vectors.
  return (
    <>
      <GroundLine y={300} w={VBOX_W} label="MAT" />
      {/* Torso outline as a simple oval (the *abdominal cavity* outline, not a person) */}
      <ellipse cx={280} cy={200} rx="180" ry="78" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
      {/* Diaphragm — dome at top */}
      <path d={`M 130 170 Q 280 130 430 170`} fill="none" stroke={INK} strokeWidth="1.6" />
      <text x="450" y="172" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="11" fill={INK}>
        diaphragm
      </text>
      {/* Pelvic floor — sling at bottom */}
      <path d={`M 150 240 Q 280 282 410 240`} fill="none" stroke={INK} strokeWidth="1.6" />
      {/* Sling fibers */}
      {Array.from({ length: 7 }).map((_, i) => {
        const t = (i + 1) / 8;
        const x = 150 + t * 260;
        const y = 240 + Math.sin(t * Math.PI) * 38;
        return <line key={i} x1={x - 3} y1={y - 1} x2={x + 3} y2={y + 1} stroke={INK} strokeWidth="0.6" opacity="0.6" />;
      })}
      <text x="450" y="270" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="11" fill={INK}>
        pelvic floor
      </text>
      {/* Breath vectors: inhale arrows down at floor, up at diaphragm settles down */}
      <MotionArrow x1={210} y1={250} x2={210} y2={280} label="INHALE · DROP" />
      <MotionArrow x1={350} y1={250} x2={350} y2={220} label="EXHALE · RETURN" anchor="end" />
      <text x="60" y={VBOX_H - 16} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.22em" fill={MUTED}>
        NO SQUEEZE &middot; LET THE PRESSURE DO THE WORK
      </text>
    </>
  );
}

function ReverseKegelDiagram() {
  // Inferior view of pelvic ring — same as BedroomPlate but in the
  // larger viewport, with an unambiguous "release down" vector.
  const cx = 280, cy = 200;
  return (
    <>
      {/* Pelvic ring */}
      <path
        d={`M ${cx - 110} ${cy - 60}
            Q ${cx - 130} ${cy} ${cx - 100} ${cy + 70}
            Q ${cx - 40} ${cy + 92} ${cx} ${cy + 88}
            Q ${cx + 40} ${cy + 92} ${cx + 100} ${cy + 70}
            Q ${cx + 130} ${cy} ${cx + 110} ${cy - 60}
            Q ${cx + 50} ${cy - 82} ${cx} ${cy - 78}
            Q ${cx - 50} ${cy - 82} ${cx - 110} ${cy - 60} Z`}
        fill={PAPER_2}
        stroke={INK}
        strokeWidth="1.4"
      />
      <path
        d={`M ${cx - 110} ${cy - 60}
            Q ${cx - 130} ${cy} ${cx - 100} ${cy + 70}
            Q ${cx - 40} ${cy + 92} ${cx} ${cy + 88}
            Q ${cx + 40} ${cy + 92} ${cx + 100} ${cy + 70}
            Q ${cx + 130} ${cy} ${cx + 110} ${cy - 60}
            Q ${cx + 50} ${cy - 82} ${cx} ${cy - 78}
            Q ${cx - 50} ${cy - 82} ${cx - 110} ${cy - 60} Z`}
        fill={`url(#hatch-sparse-spine)`}
        opacity="0.32"
      />
      {/* Levator ani sling — fibrous mesh */}
      <path
        d={`M ${cx - 86} ${cy - 42}
            Q ${cx - 60} ${cy + 36} ${cx} ${cy + 72}
            Q ${cx + 60} ${cy + 36} ${cx + 86} ${cy - 42}
            Q ${cx} ${cy - 24} ${cx - 86} ${cy - 42} Z`}
        fill="none"
        stroke={INK}
        strokeWidth="1.1"
      />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = -Math.PI / 2 + (i - 5) * 0.18;
        const x1 = cx + Math.cos(a) * 78;
        const y1 = cy + Math.sin(a) * 60;
        const x2 = cx + Math.cos(a) * 16;
        const y2 = cy + Math.sin(a) * 36;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="0.7" opacity="0.55" />;
      })}
      {/* Release vector — long oxblood arrow down */}
      <MotionArrow x1={cx} y1={cy - 6} x2={cx} y2={cy + 56} label="RELEASE" />
      <Callout x1={cx - 60} y1={cy - 22} x2={50} y2={cy - 30} label="puborectalis" sub="releases first" anchor="start" />
      <Callout x1={cx + 60} y1={cy - 22} x2={VBOX_W - 50} y2={cy - 30} label="iliococcygeus" sub="last to let go" anchor="end" />
      <text x={cx} y={cy + 100} fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="13" fill={INK} textAnchor="middle">
        Down and out. Opposite of the kegel.
      </text>
    </>
  );
}

function DecompDiagram() {
  // Side-view spine drawn in slight flexion (knees-to-chest position),
  // with a traction arrow lengthening the column.
  const path = (t: number) => {
    const x = 200 + t * 200;
    const y = 220 + Math.sin(t * Math.PI) * -6;
    const angle = 90;
    return { x, y, angle };
  };
  return (
    <>
      <GroundLine y={300} w={VBOX_W} label="MAT" />
      <SpineColumn path={path} defsId="spine" />
      <PelvisSagittal cx={415} cy={220} scale={0.55} />
      {/* Knees up — femur stub goes up-and-back */}
      <FemurStub x1={415} y1={220} x2={460} y2={150} />
      <FemurStub x1={460} y1={150} x2={420} y2={100} />
      {/* Traction vector */}
      <MotionArrow x1={195} y1={220} x2={120} y2={220} label="DECOMPRESS" anchor="end" />
      <Callout x1={300} y1={210} x2={310} y2={130} label="discs rehydrate" sub="3-5 mm over 60 sec" />
    </>
  );
}

/* ============================================================
   Public component
   ============================================================ */

export function HumanFigure({ moveKey, paused, className, style }: Props) {
  const meta = META[moveKey];
  const Diagram = {
    "curl-up": CurlUpDiagram,
    "side-plank": SidePlankDiagram,
    "bird-dog": BirdDogDiagram,
    "breath": BreathDiagram,
    "reverse-kegel": ReverseKegelDiagram,
    "decomp": DecompDiagram,
  }[moveKey];

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: PAPER,
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        width="100%"
        style={{ display: "block", maxWidth: 720 }}
        role="img"
        aria-label={`Anatomical diagram: ${meta.title} — ${meta.sub}`}
      >
        <EngravingDefs id="spine" />
        {/* Paper background */}
        <rect width={VBOX_W} height={VBOX_H} fill="url(#paper-spine)" />
        {/* Plate border */}
        <rect x="8" y="8" width={VBOX_W - 16} height={VBOX_H - 16} fill="none" stroke={RULE} strokeWidth="0.6" />

        {/* Header */}
        <text x="24" y="32" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0.28em" fill={OX}>
          FIG. {meta.fig} &middot; {meta.title.toUpperCase()}
        </text>
        <text x="24" y="50" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="12" fill={INK}>
          {meta.sub}
        </text>
        <line x1="24" y1="60" x2={VBOX_W - 24} y2="60" stroke={INK} strokeWidth="0.4" opacity="0.4" />

        {/* Anatomy */}
        <Diagram />

        {/* Cue footer */}
        <line x1="24" y1={VBOX_H - 50} x2={VBOX_W - 24} y2={VBOX_H - 50} stroke={INK} strokeWidth="0.4" opacity="0.35" />
        <text x="24" y={VBOX_H - 30} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.22em" fill={OX}>
          CUE
        </text>
        <text x="60" y={VBOX_H - 30} fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="11" fill={INK}>
          {meta.cue}
        </text>

        {paused && (
          <text x={VBOX_W - 24} y={VBOX_H - 30} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.22em" fill={MUTED} textAnchor="end">
            PAUSED
          </text>
        )}
      </svg>
    </div>
  );
}

export {};
