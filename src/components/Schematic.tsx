/**
 * Anatomical engravings — vintage medical-plate style.
 *
 * After three rounds of trying to draw procedural humans out of primitives,
 * we stopped. SVG-composed people will always read as clip art. The right
 * visual language for this product is the same one Eric grew up looking at
 * in his orthopedist's waiting room: vintage anatomy textbook plates.
 * Hatched shading, italic serif labels with hairline callouts, ink on paper.
 *
 * Two exports preserved for the rest of the app:
 *
 *   <HeroSchematic />            — sagittal lumbar spine + pelvic floor.
 *                                  Used on /dashboard and homepage hero.
 *   <WorkSchematic variant=… />  — exercise-specific anatomical diagram.
 *                                  "back"    → lumbar spine in protective
 *                                              endurance position with load
 *                                              vectors.
 *                                  "bedroom" → pelvis cross-section with
 *                                              pelvic floor sling labeled.
 *
 * No human figures. No heads. No limbs. Just anatomy.
 */

const INK = "#2A2620";
const INK_THIN = "#3A342C";
const MUTED = "#6F6859";
const OX = "#722B2B";
const RULE = "#D9CFB5";
const PAPER = "#F4EFE3";
const PAPER_2 = "#EFE7D2";

type Props = { className?: string };

/* ============================================================
   SHARED PRIMITIVES — vintage engraving toolkit
   ============================================================ */

/**
 * Crosshatch pattern, declared once and reused via fill="url(#hatch-…)".
 * Two patterns: a dense one for shadow regions, a sparse one for
 * mid-tone. Plate background gets a third, very faint texture to read
 * as old paper.
 */
function EngravingDefs({ id }: { id: string }) {
  return (
    <defs>
      {/* Dense diagonal hatching for muscle / shadow */}
      <pattern id={`hatch-dense-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="3" stroke={INK} strokeWidth="0.6" />
      </pattern>
      {/* Sparse hatching for bone shadow */}
      <pattern id={`hatch-sparse-${id}`} patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.5" />
      </pattern>
      {/* Stipple for cartilage / disc */}
      <pattern id={`stipple-${id}`} patternUnits="userSpaceOnUse" width="4" height="4">
        <circle cx="1" cy="1" r="0.45" fill={INK} />
        <circle cx="3" cy="3" r="0.45" fill={INK} />
      </pattern>
      {/* Oxblood crosshatch — used to mark the L4-L5 disc, the injury */}
      <pattern id={`hatch-ox-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="3" stroke={OX} strokeWidth="0.7" />
      </pattern>
      {/* Faint paper tone */}
      <pattern id={`paper-${id}`} patternUnits="userSpaceOnUse" width="60" height="60">
        <rect width="60" height="60" fill={PAPER} />
        <circle cx="13" cy="22" r="0.6" fill={INK} opacity="0.05" />
        <circle cx="44" cy="9" r="0.5" fill={INK} opacity="0.05" />
        <circle cx="31" cy="48" r="0.7" fill={INK} opacity="0.05" />
        <circle cx="55" cy="37" r="0.5" fill={INK} opacity="0.04" />
      </pattern>
    </defs>
  );
}

/** Specimen-label callout: hairline + dot + italic-serif label. */
function Callout({
  x1, y1, x2, y2, label, sub, anchor = "start",
}: {
  x1: number; y1: number; x2: number; y2: number;
  label: string; sub?: string; anchor?: "start" | "end" | "middle";
}) {
  const labelX = anchor === "end" ? x2 - 4 : anchor === "middle" ? x2 : x2 + 4;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="0.7" />
      <circle cx={x1} cy={y1} r="1.4" fill={INK} />
      <text
        x={labelX}
        y={y2}
        fontFamily="Spectral, Georgia, serif"
        fontStyle="italic"
        fontSize="11"
        fill={INK}
        textAnchor={anchor}
        dominantBaseline="middle"
      >
        {label}
        {sub && (
          <tspan x={labelX} dy="13" fontFamily="JetBrains Mono, monospace" fontStyle="normal" fontSize="7" letterSpacing="0.18em" fill={MUTED}>
            {sub.toUpperCase()}
          </tspan>
        )}
      </text>
    </g>
  );
}

/** Plate caption — bottom-right, italic, like an old textbook figure number. */
function PlateCaption({ fig, label, w, h }: { fig: string; label: string; w: number; h: number }) {
  return (
    <g>
      <line x1={w - 220} y1={h - 28} x2={w - 16} y2={h - 28} stroke={INK} strokeWidth="0.6" />
      <text
        x={w - 16}
        y={h - 14}
        fontFamily="Spectral, Georgia, serif"
        fontStyle="italic"
        fontSize="11"
        fill={INK}
        textAnchor="end"
      >
        <tspan fontFamily="JetBrains Mono, monospace" fontStyle="normal" fontSize="8" letterSpacing="0.22em" fill={OX}>
          FIG. {fig}
        </tspan>
        <tspan dx="8">{label}</tspan>
      </text>
    </g>
  );
}

/* ============================================================
   LUMBAR SPINE — sagittal cross-section, vintage plate
   Used by <HeroSchematic />
   ============================================================ */

function VertebraSagittal({
  cx, cy, w = 38, h = 16, label, highlight = false,
}: {
  cx: number; cy: number; w?: number; h?: number; label: string; highlight?: boolean;
}) {
  // Vertebral body: rounded-rectangle from the side. Spinous process
  // protrudes back. Subtle hatching on the inferior surface for shadow.
  const left = cx - w / 2, right = cx + w / 2, top = cy - h / 2, bot = cy + h / 2;
  return (
    <g>
      {/* Vertebral body */}
      <path
        d={`M ${left} ${top} Q ${cx} ${top - 2} ${right} ${top} L ${right} ${bot} Q ${cx} ${bot + 2} ${left} ${bot} Z`}
        fill={PAPER_2}
        stroke={INK}
        strokeWidth="1.2"
      />
      {/* Shadow hatching on inferior third */}
      <path
        d={`M ${left + 3} ${cy + 2} Q ${cx} ${bot + 1} ${right - 3} ${cy + 2} L ${right - 3} ${bot - 1} Q ${cx} ${bot} ${left + 3} ${bot - 1} Z`}
        fill="url(#hatch-sparse-hero)"
        opacity="0.5"
      />
      {/* Spinous process — points posterior (left of column) */}
      <path
        d={`M ${left} ${cy - 4} L ${left - 22} ${cy - 2} L ${left - 22} ${cy + 4} L ${left} ${cy + 4} Z`}
        fill={PAPER_2}
        stroke={INK}
        strokeWidth="1"
      />
      {/* Highlight overlay for the injured disc level */}
      {highlight && (
        <rect
          x={left - 2}
          y={top - 1}
          width={w + 4}
          height={h + 2}
          fill="none"
          stroke={OX}
          strokeWidth="1.2"
          strokeDasharray="3 2"
        />
      )}
      {/* Vertebra label inside body */}
      <text
        x={cx + 2}
        y={cy + 3}
        fontFamily="Spectral, Georgia, serif"
        fontSize="9"
        fontStyle="italic"
        fill={highlight ? OX : MUTED}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function Disc({
  cx, cy, w = 38, h = 5, herniated = false,
}: {
  cx: number; cy: number; w?: number; h?: number; herniated?: boolean;
}) {
  const left = cx - w / 2, right = cx + w / 2, top = cy - h / 2, bot = cy + h / 2;
  return (
    <g>
      <ellipse
        cx={cx}
        cy={cy}
        rx={w / 2}
        ry={h / 2}
        fill={herniated ? `url(#hatch-ox-hero)` : `url(#stipple-hero)`}
        stroke={herniated ? OX : INK}
        strokeWidth="1"
      />
      {herniated && (
        <>
          {/* Posterior bulge — the herniation */}
          <path
            d={`M ${left + 2} ${cy} Q ${left - 6} ${cy + 1} ${left - 10} ${cy + 4} Q ${left - 6} ${cy + 6} ${left + 2} ${cy + 3} Z`}
            fill={OX}
            opacity="0.85"
          />
        </>
      )}
    </g>
  );
}

export function HeroSchematic({ className }: Props) {
  // Plate dimensions. Tall portrait, like a real anatomy figure.
  const W = 420, H = 560;

  // Spine column centered horizontally at x = 250 (offset right to leave
  // room for posterior spinous processes and left-side callouts).
  const sx = 250;
  // Five lumbar vertebrae stacked from top. Disc between each.
  const startY = 110;
  const vSpacing = 32; // vertebra + disc total height per level
  const levels = ["L1", "L2", "L3", "L4", "L5"];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      className={className}
      role="img"
      aria-label="Anatomical plate: lumbar spine in sagittal section, with the L4–L5 disc highlighted and the pelvic floor sling labeled"
      style={{ display: "block", maxWidth: 480 }}
    >
      <EngravingDefs id="hero" />

      {/* Paper plate background */}
      <rect width={W} height={H} fill="url(#paper-hero)" />
      {/* Plate hairline border */}
      <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke={RULE} strokeWidth="0.8" />
      <rect x="14" y="14" width={W - 28} height={H - 28} fill="none" stroke={RULE} strokeWidth="0.4" />

      {/* Plate header */}
      <text x={W / 2} y="36" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0.32em" fill={OX} textAnchor="middle">
        PLATE I &middot; LUMBAR &amp; PELVIC FLOOR
      </text>
      <text x={W / 2} y="56" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="14" fill={INK} textAnchor="middle">
        Sagittal section, right lateral aspect
      </text>
      <line x1="80" y1="68" x2={W - 80} y2="68" stroke={INK} strokeWidth="0.6" />

      {/* Sacrum — wedge below L5 */}
      <g transform={`translate(0, 0)`}>
        <path
          d={`M ${sx - 22} ${startY + 5 * vSpacing - 10} L ${sx + 18} ${startY + 5 * vSpacing - 12} L ${sx + 28} ${startY + 5 * vSpacing + 50} L ${sx - 8} ${startY + 5 * vSpacing + 60} Z`}
          fill={PAPER_2}
          stroke={INK}
          strokeWidth="1.2"
        />
        <path
          d={`M ${sx - 22} ${startY + 5 * vSpacing - 10} L ${sx + 18} ${startY + 5 * vSpacing - 12} L ${sx + 28} ${startY + 5 * vSpacing + 50} L ${sx - 8} ${startY + 5 * vSpacing + 60} Z`}
          fill="url(#hatch-sparse-hero)"
          opacity="0.4"
        />
        <text x={sx + 4} y={startY + 5 * vSpacing + 28} fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="10" fill={MUTED} textAnchor="middle">
          sacrum
        </text>
      </g>

      {/* Coccyx tail */}
      <path
        d={`M ${sx + 6} ${startY + 5 * vSpacing + 60} Q ${sx + 14} ${startY + 5 * vSpacing + 80} ${sx + 4} ${startY + 5 * vSpacing + 96}`}
        fill="none"
        stroke={INK}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Discs between vertebrae */}
      {levels.map((_, i) => {
        if (i === 0) return null;
        const dy = startY + (i - 1) * vSpacing + 16;
        const isInjured = i === 4; // L4-L5 disc
        return <Disc key={i} cx={sx} cy={dy} w={36} h={6} herniated={isInjured} />;
      })}
      {/* Disc below L5 to sacrum */}
      <Disc cx={sx} cy={startY + 5 * vSpacing - 6} w={34} h={5} />

      {/* Vertebrae */}
      {levels.map((label, i) => (
        <VertebraSagittal
          key={label}
          cx={sx}
          cy={startY + i * vSpacing}
          label={label}
          highlight={label === "L4" || label === "L5"}
        />
      ))}

      {/* Pelvic floor sling — drawn as hammock from pubis (right of sacrum) to coccyx */}
      <g>
        <path
          d={`M ${sx + 60} ${startY + 5 * vSpacing + 30} Q ${sx + 30} ${startY + 5 * vSpacing + 78} ${sx + 4} ${startY + 5 * vSpacing + 88}`}
          fill="none"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Fiber texture for the muscle sling */}
        {Array.from({ length: 6 }).map((_, i) => {
          const t = (i + 1) / 7;
          const px = sx + 60 - t * 56 + Math.sin(t * Math.PI) * 6;
          const py = startY + 5 * vSpacing + 30 + t * 58 + Math.sin(t * Math.PI) * 8;
          return (
            <line
              key={i}
              x1={px - 3}
              y1={py - 1}
              x2={px + 3}
              y2={py + 1}
              stroke={INK}
              strokeWidth="0.5"
              opacity="0.55"
            />
          );
        })}
        {/* Pubic bone stub */}
        <ellipse cx={sx + 64} cy={startY + 5 * vSpacing + 28} rx="6" ry="3" fill={PAPER_2} stroke={INK} strokeWidth="1" />
      </g>

      {/* Psoas attachment line — runs anterior from T12 down to lesser trochanter */}
      <g>
        <path
          d={`M ${sx + 22} ${startY - 8} Q ${sx + 38} ${startY + 70} ${sx + 52} ${startY + 5 * vSpacing + 24}`}
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity="0.7"
        />
      </g>

      {/* Callouts */}
      <Callout
        x1={sx - 20}
        y1={startY + 3 * vSpacing + 16}
        x2={68}
        y2={startY + 3 * vSpacing + 16}
        label="L4 · L5 disc"
        sub="herniation, posterolateral"
        anchor="end"
      />
      <Callout
        x1={sx + 30}
        y1={startY + 5 * vSpacing + 60}
        x2={W - 44}
        y2={startY + 5 * vSpacing + 70}
        label="pelvic floor"
        sub="levator ani sling"
        anchor="end"
      />
      <Callout
        x1={sx + 38}
        y1={startY + 70}
        x2={W - 44}
        y2={startY + 60}
        label="psoas major"
        sub="hip flexor, T12 – L5"
        anchor="end"
      />
      <Callout
        x1={sx - 20}
        y1={startY}
        x2={68}
        y2={startY - 10}
        label="L1"
        sub="thoracolumbar junction"
        anchor="end"
      />

      {/* Plate caption */}
      <PlateCaption fig="I" label="after gray, modified — backstroke ℠" w={W} h={H} />
    </svg>
  );
}

/* ============================================================
   WORK SCHEMATIC — exercise / anatomy diagrams for homepage cards
   variant="back"     → spine + pelvis in supine endurance position
                        with load vectors and "30/3" annotation.
   variant="bedroom"  → pelvic ring cross-section with floor sling
                        labeled, plus a "release" arrow inverted from
                        a typical kegel diagram.
   ============================================================ */

type WorkVariant = "back" | "bedroom";

export function WorkSchematic({
  variant,
  className,
}: {
  variant: WorkVariant;
  className?: string;
}) {
  if (variant === "back") return <BackPlate className={className} />;
  return <BedroomPlate className={className} />;
}

function BackPlate({ className }: Props) {
  const W = 480, H = 320;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      className={className}
      role="img"
      aria-label="Anatomical diagram of the lumbar spine and pelvis in protective endurance position with load vectors"
      style={{ display: "block" }}
    >
      <EngravingDefs id="back" />
      <rect width={W} height={H} fill="url(#paper-back)" />
      <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke={RULE} strokeWidth="0.6" />

      {/* Header */}
      <text x="24" y="32" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0.28em" fill={OX}>
        PLATE II &middot; LUMBAR ENDURANCE
      </text>
      <text x="24" y="50" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="13" fill={INK}>
        Spine column under the load that matters
      </text>
      <line x1="24" y1="60" x2={W - 24} y2="60" stroke={INK} strokeWidth="0.5" opacity="0.4" />

      {/* Spine column — side view, gently lordotic curve */}
      <g transform="translate(120, 90)">
        {/* Five lumbar vertebrae with discs */}
        {[0, 1, 2, 3, 4].map((i) => {
          const cy = i * 32;
          const cx = Math.sin((i / 4) * Math.PI) * 14; // lordotic curve
          const label = ["L1", "L2", "L3", "L4", "L5"][i];
          const highlight = label === "L4" || label === "L5";
          return (
            <g key={i}>
              {i > 0 && (
                <ellipse
                  cx={(cx + Math.sin(((i - 1) / 4) * Math.PI) * 14) / 2}
                  cy={cy - 16}
                  rx="18"
                  ry="3"
                  fill="url(#stipple-back)"
                  stroke={INK}
                  strokeWidth="0.8"
                />
              )}
              <rect
                x={cx - 18}
                y={cy - 9}
                width="36"
                height="18"
                rx="3"
                fill={PAPER_2}
                stroke={INK}
                strokeWidth="1.1"
              />
              {/* Spinous process pointing posterior (left) */}
              <path
                d={`M ${cx - 18} ${cy - 3} L ${cx - 30} ${cy} L ${cx - 18} ${cy + 3} Z`}
                fill={PAPER_2}
                stroke={INK}
                strokeWidth="1"
              />
              {highlight && (
                <rect
                  x={cx - 20}
                  y={cy - 11}
                  width="40"
                  height="22"
                  fill="none"
                  stroke={OX}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}
              <text x={cx + 2} y={cy + 3} fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="9" fill={highlight ? OX : MUTED} textAnchor="middle">
                {label}
              </text>
            </g>
          );
        })}
        {/* Sacrum wedge */}
        <path
          d={`M ${Math.sin(Math.PI) * 14 - 18} ${4 * 32 + 9} L ${Math.sin(Math.PI) * 14 + 18} ${4 * 32 + 9} L ${Math.sin(Math.PI) * 14 + 26} ${4 * 32 + 56} L ${Math.sin(Math.PI) * 14 - 6} ${4 * 32 + 66} Z`}
          fill={PAPER_2}
          stroke={INK}
          strokeWidth="1.1"
        />
        <path
          d={`M ${Math.sin(Math.PI) * 14 - 18} ${4 * 32 + 9} L ${Math.sin(Math.PI) * 14 + 18} ${4 * 32 + 9} L ${Math.sin(Math.PI) * 14 + 26} ${4 * 32 + 56} L ${Math.sin(Math.PI) * 14 - 6} ${4 * 32 + 66} Z`}
          fill="url(#hatch-sparse-back)"
          opacity="0.4"
        />
      </g>

      {/* Load vectors — vertical compressive arrow on top of spine */}
      <g>
        <line x1={120} y1={56} x2={120} y2={80} stroke={OX} strokeWidth="1.6" />
        <path d={`M ${120 - 4} ${78} L ${120} ${86} L ${120 + 4} ${78} Z`} fill={OX} />
        <text x="130" y="74" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.18em" fill={OX}>
          AXIAL LOAD
        </text>
      </g>

      {/* Annotation block — protocol summary */}
      <g transform={`translate(${W - 220}, 110)`}>
        <line x1="0" y1="0" x2="200" y2="0" stroke={INK} strokeWidth="0.5" />
        <text x="0" y="16" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.22em" fill={OX}>
          PROTOCOL · ENDURANCE
        </text>
        <text x="0" y="40" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="18" fill={INK}>
          Curl-up.
        </text>
        <text x="0" y="62" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="18" fill={INK}>
          Side bridge.
        </text>
        <text x="0" y="84" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="18" fill={INK}>
          Bird-dog.
        </text>
        <line x1="0" y1="98" x2="200" y2="98" stroke={INK} strokeWidth="0.5" opacity="0.5" />
        <text x="0" y="116" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.18em" fill={MUTED}>
          8 MIN · DAILY · CUMULATIVE
        </text>
        <text x="0" y="132" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.18em" fill={MUTED}>
          30/3 RULE · ALL DAY
        </text>
      </g>

      <PlateCaption fig="II" label="endurance over range &middot; mcgill, 1995" w={W} h={H} />
    </svg>
  );
}

function BedroomPlate({ className }: Props) {
  const W = 480, H = 320;
  const cx = 180, cy = 170; // pelvic ring center

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      className={className}
      role="img"
      aria-label="Anatomical diagram of the pelvic ring viewed from above with the pelvic floor sling labeled and a release vector"
      style={{ display: "block" }}
    >
      <EngravingDefs id="bed" />
      <rect width={W} height={H} fill="url(#paper-bed)" />
      <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke={RULE} strokeWidth="0.6" />

      {/* Header */}
      <text x="24" y="32" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0.28em" fill={OX}>
        PLATE III &middot; PELVIC FLOOR
      </text>
      <text x="24" y="50" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="13" fill={INK}>
        Inferior view, levator ani in repose
      </text>
      <line x1="24" y1="60" x2={W - 24} y2="60" stroke={INK} strokeWidth="0.5" opacity="0.4" />

      {/* Pelvic ring — drawn as oval bone outline from below */}
      <g>
        {/* Outer ring (pubic arch + ischium + ilium suggestion) */}
        <path
          d={`M ${cx - 90} ${cy - 50}
              Q ${cx - 110} ${cy} ${cx - 80} ${cy + 60}
              Q ${cx - 30} ${cy + 80} ${cx} ${cy + 76}
              Q ${cx + 30} ${cy + 80} ${cx + 80} ${cy + 60}
              Q ${cx + 110} ${cy} ${cx + 90} ${cy - 50}
              Q ${cx + 40} ${cy - 70} ${cx} ${cy - 66}
              Q ${cx - 40} ${cy - 70} ${cx - 90} ${cy - 50} Z`}
          fill={PAPER_2}
          stroke={INK}
          strokeWidth="1.4"
        />
        {/* Bone hatching on outer ring */}
        <path
          d={`M ${cx - 90} ${cy - 50}
              Q ${cx - 110} ${cy} ${cx - 80} ${cy + 60}
              Q ${cx - 30} ${cy + 80} ${cx} ${cy + 76}
              Q ${cx + 30} ${cy + 80} ${cx + 80} ${cy + 60}
              Q ${cx + 110} ${cy} ${cx + 90} ${cy - 50}
              Q ${cx + 40} ${cy - 70} ${cx} ${cy - 66}
              Q ${cx - 40} ${cy - 70} ${cx - 90} ${cy - 50} Z`}
          fill="url(#hatch-sparse-bed)"
          opacity="0.35"
        />
        {/* Pubic symphysis (front, top) */}
        <ellipse cx={cx} cy={cy - 64} rx="8" ry="4" fill={INK} opacity="0.7" />
        {/* Coccyx (back, bottom) */}
        <ellipse cx={cx} cy={cy + 78} rx="6" ry="3" fill={INK} opacity="0.7" />
      </g>

      {/* Levator ani sling — drawn as fibrous mesh inside the ring */}
      <g>
        {/* Sling outline */}
        <path
          d={`M ${cx - 72} ${cy - 36}
              Q ${cx - 50} ${cy + 30} ${cx} ${cy + 60}
              Q ${cx + 50} ${cy + 30} ${cx + 72} ${cy - 36}
              Q ${cx} ${cy - 20} ${cx - 72} ${cy - 36} Z`}
          fill="none"
          stroke={INK}
          strokeWidth="1.1"
        />
        {/* Muscle fibers — radial */}
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (-Math.PI / 2) + (i - 4) * 0.18;
          const x1 = cx + Math.cos(a) * 64;
          const y1 = cy + Math.sin(a) * 50;
          const x2 = cx + Math.cos(a) * 14;
          const y2 = cy + Math.sin(a) * 30;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="0.7" opacity="0.55" />
          );
        })}
        {/* Central tendinous hub */}
        <ellipse cx={cx} cy={cy + 6} rx="6" ry="3" fill={INK} opacity="0.45" />
      </g>

      {/* Release vector — arrow pointing DOWN (opposite of kegel up-and-in) */}
      <g>
        <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 40} stroke={OX} strokeWidth="2" />
        <path d={`M ${cx - 5} ${cy + 36} L ${cx} ${cy + 46} L ${cx + 5} ${cy + 36} Z`} fill={OX} />
        <text x={cx + 12} y={cy + 24} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.18em" fill={OX}>
          RELEASE
        </text>
        <text x={cx + 12} y={cy + 38} fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="10" fill={MUTED}>
          (down · out)
        </text>
      </g>

      {/* Callouts */}
      <Callout x1={cx} y1={cy - 64} x2={W - 30} y2={cy - 70} label="pubic symphysis" sub="anterior" anchor="end" />
      <Callout x1={cx + 60} y1={cy + 10} x2={W - 30} y2={cy} label="levator ani" sub="puborectalis, iliococcygeus" anchor="end" />
      <Callout x1={cx} y1={cy + 78} x2={W - 30} y2={cy + 80} label="coccyx" sub="posterior" anchor="end" />

      {/* Bottom note */}
      <text x="24" y={H - 32} fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="12" fill={INK}>
        Reverse kegel <tspan fill={MUTED}>before kegel.</tspan>
      </text>
      <text x="24" y={H - 16} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.22em" fill={MUTED}>
        A FLOOR STUCK ON IS THE REASON NONE OF IT WORKS
      </text>

      <PlateCaption fig="III" label="release vector &middot; opposite of the wellness app" w={W} h={H} />
    </svg>
  );
}
