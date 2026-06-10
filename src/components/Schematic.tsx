/**
 * Anatomical engravings · vintage medical-plate style.
 *
 * After three rounds of trying to draw procedural humans out of primitives,
 * we stopped. SVG-composed people will always read as clip art. The right
 * visual language for this product is the same one Eric grew up looking at
 * in his orthopedist's waiting room: vintage anatomy textbook plates.
 * Hatched shading, italic serif labels with hairline callouts, ink on paper.
 *
 * Scope note (2026 narrowing): pelvic-floor anatomy was removed as a
 * product axis. The hero plate now labels lumbar + sacrum + psoas only;
 * the bedroom work plate now shows hip + sacrum geometry, not a floor
 * sling.
 *
 * Two exports preserved for the rest of the app:
 *
 *   <HeroSchematic />            · sagittal lumbar spine + sacrum + psoas.
 *                                  Used on /dashboard and homepage hero.
 *   <WorkSchematic variant=… />  · exercise-specific anatomical diagram.
 *                                  "back"    → lumbar spine in protective
 *                                              endurance position with load
 *                                              vectors.
 *                                  "bedroom" → hip + sacrum cross-section
 *                                              with safe-load vectors.
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
   SHARED PRIMITIVES · vintage engraving toolkit
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
      {/* Oxblood crosshatch · used to mark the L4-L5 disc, the injury */}
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

/** Plate caption · bottom-right, italic, like an old textbook figure number. */
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
   LUMBAR SPINE · sagittal cross-section, vintage plate
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
      {/* Spinous process · points posterior (left of column) */}
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
          {/* Posterior bulge · the herniation */}
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
      aria-label="Anatomical plate: lumbar spine in sagittal section, with the L4–L5 disc highlighted and the iliopsoas attachment line shown"
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
        PLATE I &middot; LUMBAR &amp; ILIOPSOAS
      </text>
      <text x={W / 2} y="56" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="14" fill={INK} textAnchor="middle">
        Sagittal section, right lateral aspect
      </text>
      <line x1="80" y1="68" x2={W - 80} y2="68" stroke={INK} strokeWidth="0.6" />

      {/* Sacrum · wedge below L5 */}
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

      {/* Pubic bone stub · kept for hip-girdle context */}
      <ellipse cx={sx + 64} cy={startY + 5 * vSpacing + 28} rx="6" ry="3" fill={PAPER_2} stroke={INK} strokeWidth="1" />

      {/* Psoas attachment line · runs anterior from T12 down to lesser trochanter */}
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
        label="hip girdle"
        sub="acetabulum + sacrum interface"
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
      <PlateCaption fig="I" label="after gray, modified · backstroke ℠" w={W} h={H} />
    </svg>
  );
}

/* ============================================================
   WORK SCHEMATIC · exercise / anatomy diagrams for homepage cards
   variant="back"     → spine + pelvis in supine endurance position
                        with load vectors and "30/3" annotation.
   variant="bedroom"  → lumbar-load-by-position chart (three small
                        disc icons + gauge bars), drawn in the
                        Sidorkewicz / McGill 2014 spirit.
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

      {/* Spine column · side view, gently lordotic curve */}
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

      {/* Load vectors · vertical compressive arrow on top of spine */}
      <g>
        <line x1={120} y1={56} x2={120} y2={80} stroke={OX} strokeWidth="1.6" />
        <path d={`M ${120 - 4} ${78} L ${120} ${86} L ${120 + 4} ${78} Z`} fill={OX} />
        <text x="130" y="74" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.18em" fill={OX}>
          AXIAL LOAD
        </text>
      </g>

      {/* Annotation block · protocol summary */}
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
      aria-label="Anatomical chart showing relative lumbar disc load by sex position, in the manner of the McGill / Sidorkewicz 2014 load tables"
      style={{ display: "block" }}
    >
      <EngravingDefs id="bed" />
      <rect width={W} height={H} fill="url(#paper-bed)" />
      <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke={RULE} strokeWidth="0.6" />

      {/* Header */}
      <text x="24" y="32" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0.28em" fill={OX}>
        PLATE III &middot; LUMBAR LOAD BY POSITION
      </text>
      <text x="24" y="50" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="13" fill={INK}>
        Sagittal section, partner-load chart (Sidorkewicz / McGill 2014)
      </text>
      <line x1="24" y1="60" x2={W - 24} y2="60" stroke={INK} strokeWidth="0.5" opacity="0.4" />

      {/* Three lumbar-disc icons in a column, each with a load gauge */}
      {[
        { y: 100, label: "Spoon",        sub: "lateral · low spinal load",            level: 0.22, tone: "green" as const },
        { y: 170, label: "Missionary",   sub: "supine receiver · moderate load",       level: 0.55, tone: "amber" as const },
        { y: 240, label: "Cowgirl back-leaning", sub: "extension · highest disc load", level: 0.92, tone: "red"   as const },
      ].map((row) => (
        <g key={row.label} transform={`translate(0, ${row.y})`}>
          {/* Mini-disc icon: oval annulus + nucleus dot */}
          <ellipse cx="60" cy="0" rx="22" ry="9" fill={PAPER_2} stroke={INK} strokeWidth="1.2" />
          <ellipse cx="60" cy="0" rx="22" ry="9" fill="url(#hatch-sparse-bed)" opacity="0.4" />
          <ellipse cx="60" cy="0" rx="8" ry="3.5" fill={INK} opacity="0.55" />
          {/* Vertebrae above + below for context */}
          <rect x="42" y="-22" width="36" height="10" rx="2" fill={PAPER_2} stroke={INK} strokeWidth="1" />
          <rect x="42" y="12" width="36" height="10" rx="2" fill={PAPER_2} stroke={INK} strokeWidth="1" />

          {/* Label */}
          <text x="100" y="-4" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="15" fill={INK}>
            {row.label}
          </text>
          <text x="100" y="14" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.18em" fill={MUTED}>
            {row.sub.toUpperCase()}
          </text>

          {/* Load gauge bar */}
          <rect x="100" y="22" width="180" height="6" fill={PAPER_2} stroke={INK} strokeWidth="0.6" />
          <rect
            x="100"
            y="22"
            width={180 * row.level}
            height="6"
            fill={row.tone === "green" ? "#5a7a3a" : row.tone === "amber" ? "#b08a3a" : OX}
          />
        </g>
      ))}

      <PlateCaption fig="III" label="lumbar load by sex position &middot; Sidorkewicz / McGill" w={W} h={H} />
    </svg>
  );
}
