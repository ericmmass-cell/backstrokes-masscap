/**
 * Editorial schematic illustrations that replace stock photography.
 *
 * Three variants, all built as inline SVG so they match the cream-paper
 * palette exactly. The visual language: clinical anatomical chart meets
 * private control panel. Annotated, restrained, oxblood + ink + warm
 * muted on ivory paper. No bodies, no faces, no Shutterstock energy.
 */

const PAPER = "#F4EFE3";
const PAPER_2 = "#EFE7D2";
const INK = "#2A2620";
const MUTED = "#6F6859";
const OX = "#722B2B";
const RULE = "#D9CFB5";

type Props = { className?: string };

// ───── Filled exercise silhouettes for the work-card SVG ─────
// Built from modular limb segments so joints articulate properly.
// Drawn at ~480x300 base coords; the parent group scales them down.

function WorkLimb({ x1, y1, x2, y2, w1, w2 }: { x1: number; y1: number; x2: number; y2: number; w1: number; w2: number }) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy);
  if (!len) return null;
  const nx = -dy / len, ny = dx / len;
  return (
    <g>
      <circle cx={x1} cy={y1} r={w1} fill={INK} />
      <circle cx={x2} cy={y2} r={w2} fill={INK} />
      <path fill={INK} d={`M ${x1 + nx * w1} ${y1 + ny * w1} L ${x2 + nx * w2} ${y2 + ny * w2} L ${x2 - nx * w2} ${y2 - ny * w2} L ${x1 - nx * w1} ${y1 - ny * w1} Z`} />
    </g>
  );
}

function WorkMat() {
  return (
    <g>
      <rect x="20" y="248" width="440" height="14" rx="2" fill="rgba(42,38,32,0.06)" stroke="rgba(42,38,32,0.20)" strokeWidth="0.8" />
      <line x1="20" y1="250" x2="460" y2="250" stroke="rgba(42,38,32,0.36)" strokeWidth="1" />
    </g>
  );
}

function WorkCurlUp() {
  // Side view: supine, knee bent, chest curled up
  return (
    <g>
      <WorkMat />
      <ellipse cx="60" cy="252" rx="22" ry="6" fill="rgba(58,52,44,0.18)" stroke="rgba(58,52,44,0.42)" strokeWidth="1" />
      {/* Straight back leg */}
      <WorkLimb x1={260} y1={220} x2={400} y2={222} w1={18} w2={14} />
      <ellipse cx="408" cy="222" rx="20" ry="8" fill={INK} />
      {/* Torso supine, chest lifted */}
      <path
        fill={INK}
        d="M 110 230 Q 80 218 86 200 Q 90 188 110 184 Q 140 184 168 196 Q 200 210 250 218 Q 290 224 270 230 Q 220 236 168 234 Q 130 234 110 230 Z"
      />
      {/* Bent knee */}
      <WorkLimb x1={260} y1={218} x2={304} y2={166} w1={18} w2={15} />
      <WorkLimb x1={304} y1={166} x2={344} y2={220} w1={15} w2={13} />
      <ellipse cx="350" cy="222" rx="18" ry="7" fill={INK} />
      {/* Arm tucked under */}
      <ellipse cx="200" cy="228" rx="22" ry="5" fill="#2a261f" opacity="0.6" />
      {/* Head — lifted, chin tucked */}
      <ellipse cx="108" cy="180" rx="20" ry="22" fill={INK} />
    </g>
  );
}

function WorkSidePlank() {
  return (
    <g>
      <WorkMat />
      {/* Diagonal torso (hip lower-right to shoulder upper-left) */}
      <WorkLimb x1={140} y1={120} x2={340} y2={216} w1={32} w2={26} />
      {/* Top arm extended up */}
      <WorkLimb x1={146} y1={116} x2={146} y2={48} w1={14} w2={11} />
      <circle cx="146" cy="44" r="10" fill={INK} />
      {/* Supporting forearm down to floor */}
      <WorkLimb x1={130} y1={118} x2={92} y2={170} w1={14} w2={13} />
      <WorkLimb x1={92} y1={170} x2={74} y2={244} w1={13} w2={14} />
      <ellipse cx="68" cy="248" rx="32" ry="6" fill={INK} />
      {/* Knees down at hip end */}
      <WorkLimb x1={340} y1={216} x2={400} y2={246} w1={22} w2={18} />
      <ellipse cx="410" cy="248" rx="22" ry="6" fill={INK} />
      {/* Head */}
      <ellipse cx="166" cy="98" rx="18" ry="20" fill={INK} />
    </g>
  );
}

function WorkBirdDog() {
  return (
    <g>
      <WorkMat />
      {/* Horizontal back */}
      <WorkLimb x1={140} y1={160} x2={340} y2={162} w1={30} w2={30} />
      {/* Supporting arm down */}
      <WorkLimb x1={160} y1={184} x2={154} y2={244} w1={14} w2={12} />
      <ellipse cx="150" cy="248" rx="18" ry="6" fill={INK} />
      {/* Supporting knee down */}
      <WorkLimb x1={326} y1={186} x2={322} y2={246} w1={22} w2={18} />
      <ellipse cx="324" cy="248" rx="20" ry="6" fill={INK} />
      {/* Extended forward arm */}
      <WorkLimb x1={140} y1={158} x2={70} y2={130} w1={14} w2={12} />
      <WorkLimb x1={70} y1={130} x2={24} y2={120} w1={12} w2={10} />
      <circle cx="20" cy="120" r="9" fill={INK} />
      {/* Extended back leg */}
      <WorkLimb x1={342} y1={158} x2={410} y2={140} w1={22} w2={18} />
      <ellipse cx="416" cy="138" rx="18" ry="8" fill={INK} />
      {/* Head — looking forward */}
      <ellipse cx="130" cy="146" rx="16" ry="18" fill={INK} />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────
   HeroSchematic — the right-rail "control panel" replacing
   the stock portrait. Index gauge, annotated body chart,
   day ledger. 4:5 aspect.
   ───────────────────────────────────────────────────────── */
export function HeroSchematic({ className }: Props) {
  return (
    <svg
      viewBox="0 0 420 525"
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-label="BackStroke control panel: annotated lumbar schematic with today's Index, day ledger, and intervention checklist."
    >
      {/* Card body */}
      <rect x="0" y="0" width="420" height="525" fill={PAPER_2} />
      <rect x="0.5" y="0.5" width="419" height="524" fill="none" stroke={RULE} strokeWidth="1" />

      {/* Top instrument strip */}
      <rect x="0" y="0" width="420" height="44" fill={PAPER} />
      <line x1="0" y1="44" x2="420" y2="44" stroke={RULE} strokeWidth="1" />
      <text x="18" y="27" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.5" fill={OX}>DAY 42 · L4-L5 · FLOOR · GRIPPING</text>
      <circle cx="395" cy="22" r="3" fill={OX} />
      <text x="386" y="27" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="2.2" fill={OX} textAnchor="end">ARMED</text>

      {/* Anatomical side-view human figure — textbook quality */}
      <defs>
        <linearGradient id="hero-body-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a4338" />
          <stop offset="50%" stopColor={INK} />
          <stop offset="100%" stopColor="#2a261f" />
        </linearGradient>
      </defs>
      <g transform="translate(140, 50)">
        {/* HEAD — egg-shaped with subtle chin line */}
        <ellipse cx="70" cy="22" rx="20" ry="22" fill="url(#hero-body-grad)" />
        <path d="M 56 30 Q 70 44 84 30" fill="none" stroke="#2a261f" strokeWidth="0.8" opacity="0.5" />

        {/* NECK — narrow connector */}
        <path
          d="M 60 42 Q 62 50 64 56 L 76 56 Q 78 50 80 42 Z"
          fill="url(#hero-body-grad)"
        />

        {/* SHOULDERS — sloping yoke */}
        <path
          d="M 36 60 Q 70 50 104 60 L 100 68 Q 70 60 40 68 Z"
          fill="url(#hero-body-grad)"
        />

        {/* TORSO — chest narrow at top, ribcage flare, waist tuck, hip flare */}
        <path
          d="
            M 38 64
            Q 30 80, 28 100
            Q 26 116, 32 130
            Q 36 140, 40 150
            Q 38 162, 40 174
            Q 44 184, 56 188
            Q 70 192, 84 188
            Q 96 184, 100 174
            Q 102 162, 100 150
            Q 104 140, 108 130
            Q 114 116, 112 100
            Q 110 80, 102 64
            Q 86 70, 70 70
            Q 54 70, 38 64
            Z
          "
          fill="url(#hero-body-grad)"
        />

        {/* SPINE — visible as a slightly darker vertical line */}
        <path d="M 70 60 Q 70 100, 70 150 Q 70 170, 70 184" stroke="#2a261f" strokeWidth="1.5" opacity="0.6" fill="none" strokeDasharray="3 4" />

        {/* PELVIS — connector to thighs */}
        <path
          d="M 46 188 Q 70 198 94 188 Q 96 206 70 210 Q 44 206 46 188 Z"
          fill="#2a261f"
        />

        {/* THIGHS — two parallel muscle masses, side by side */}
        <path
          d="M 50 206 Q 46 240 48 270 Q 52 282 60 282 Q 66 282 66 270 Q 66 240 64 206 Z"
          fill="url(#hero-body-grad)"
        />
        <path
          d="M 76 206 Q 74 240 76 270 Q 80 282 86 282 Q 92 282 92 270 Q 92 240 90 206 Z"
          fill="url(#hero-body-grad)"
        />

        {/* L4-L5 marker — clinical highlight + label */}
        <rect x="56" y="148" width="28" height="14" rx="2" fill={OX} opacity="0.92" />
        <rect x="56" y="148" width="28" height="14" rx="2" fill="none" stroke={OX} strokeWidth="1.5" />
        <line x1="84" y1="155" x2="124" y2="155" stroke={OX} strokeWidth="1.2" />
        <line x1="124" y1="155" x2="128" y2="155" stroke={OX} strokeWidth="2" />
        <text x="132" y="158" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.8" fill={OX}>L4 · L5</text>

        {/* Pelvic floor band — oxblood arc across the base of pelvis */}
        <path d="M 46 198 Q 70 212 94 198" fill="none" stroke={OX} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="70" cy="207" r="2.5" fill={OX} />
        <line x1="46" y1="200" x2="4" y2="200" stroke={OX} strokeWidth="1.2" />
        <text x="0" y="203" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.8" fill={OX} textAnchor="end">FLOOR</text>

        {/* Hip / iliopsoas marker */}
        <circle cx="96" cy="188" r="5" fill={OX} stroke="#2a261f" strokeWidth="0.8" />
        <circle cx="96" cy="188" r="2" fill="#fff" opacity="0.4" />
        <line x1="101" y1="188" x2="126" y2="188" stroke={OX} strokeWidth="1.2" />
        <text x="130" y="191" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.8" fill={OX}>HIP · PSOAS</text>
      </g>

      {/* Hairline rule */}
      <line x1="40" y1="328" x2="380" y2="328" stroke={RULE} strokeWidth="1" />

      {/* INDEX gauge */}
      <text x="40" y="358" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.5" fill={MUTED}>TODAY · INDEX</text>
      <text x="40" y="430" fontFamily="Georgia, serif" fontSize="84" fontWeight="400" fontStyle="italic" fill={OX}>71</text>
      <text x="170" y="428" fontFamily="Inter, sans-serif" fontSize="13" letterSpacing="1.6" fill={OX}>+3</text>
      <text x="170" y="448" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="1.6" fill={MUTED}>vs YESTERDAY</text>

      {/* Right column: load cap meter */}
      <text x="380" y="358" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.5" fill={MUTED}>LOAD CAP</text>
      {[1, 2, 3, 4, 5].map((n, i) => (
        <rect key={n} x={300 + i * 16} y="378" width="12" height="32" fill={n <= 3 ? OX : "none"} stroke={OX} strokeWidth="1" opacity={n <= 3 ? 1 : 0.4} />
      ))}
      <text x="380" y="430" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="1.4" fill={MUTED}>3 of 5 · AMBER</text>

      {/* Bottom intervention strip */}
      <rect x="0" y="460" width="420" height="65" fill={PAPER} />
      <line x1="0" y1="460" x2="420" y2="460" stroke={RULE} strokeWidth="1" />
      <text x="18" y="480" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2.5" fill={OX}>TONIGHT'S PRESCRIPTION</text>
      <text x="18" y="500" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" fill={INK}>8 min spine · 30/3 chair rule · pillow under knees</text>
      <text x="18" y="516" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="1.4" fill={MUTED}>SIGNED · SPINE DESK · THU</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   WorkSchematic — the two homepage "work" cards. Variant
   "back" shows curl-up / side-plank / bird-dog stack;
   "bedroom" shows breath / down-train / position arc.
   5:6 aspect.
   ───────────────────────────────────────────────────────── */
export function WorkSchematic({
  variant,
  className,
}: {
  variant: "back" | "bedroom";
  className?: string;
}) {
  if (variant === "back") {
    return (
      <svg
        viewBox="0 0 500 600"
        className={className}
        style={{ display: "block", width: "100%", height: "auto" }}
        aria-label="Back protocol schematic: three McGill exercises stacked, with dosage."
      >
        <rect x="0" y="0" width="500" height="600" fill={PAPER_2} />

        {/* Header band */}
        <rect x="0" y="0" width="500" height="56" fill={PAPER} />
        <line x1="0" y1="56" x2="500" y2="56" stroke={RULE} strokeWidth="1" />
        <text x="28" y="34" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="2.8" fill={OX}>FIG. B · 8 MIN · DAILY</text>
        <text x="472" y="34" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="2.2" fill={MUTED}>McGILL · BIG 3</text>

        {/* Three move panels, stacked */}
        {[
          { y: 90, ref: "B.01a", name: "Curl-up", dose: "4 reps · 8 sec hold · each side" },
          { y: 250, ref: "B.01b", name: "Side bridge", dose: "4 reps · 8 sec hold · each side" },
          { y: 410, ref: "B.01c", name: "Bird-dog", dose: "4 reps · 8 sec hold · each side" },
        ].map((m, i) => (
          <g key={m.ref}>
            <line x1="28" y1={m.y - 16} x2="472" y2={m.y - 16} stroke={RULE} strokeWidth="1" />
            <text x="28" y={m.y + 4} fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.4" fill={OX}>{m.ref}</text>
            <text x="28" y={m.y + 38} fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={INK}>{m.name}</text>
            <text x="28" y={m.y + 62} fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="1.4" fill={MUTED}>{m.dose}</text>
            {/* Move silhouette — filled body figure, side profile */}
            <g transform={`translate(290, ${m.y - 30}) scale(0.42)`}>
              {i === 0 && <WorkCurlUp />}
              {i === 1 && <WorkSidePlank />}
              {i === 2 && <WorkBirdDog />}
            </g>
          </g>
        ))}

        {/* Footer */}
        <line x1="0" y1="556" x2="500" y2="556" stroke={RULE} strokeWidth="1" />
        <text x="28" y="580" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic" fill={MUTED}>Endurance, not range. The protocol the disc trials actually used.</text>
      </svg>
    );
  }

  // BEDROOM variant: breath → down-train → position arc
  return (
    <svg
      viewBox="0 0 500 600"
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-label="Bedroom protocol schematic: down-train, breath, position arc."
    >
      <rect x="0" y="0" width="500" height="600" fill={PAPER_2} />

      <rect x="0" y="0" width="500" height="56" fill={PAPER} />
      <line x1="0" y1="56" x2="500" y2="56" stroke={RULE} strokeWidth="1" />
      <text x="28" y="34" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="2.8" fill={OX}>FIG. F · 7 MIN · DAILY</text>
      <text x="472" y="34" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="2.2" fill={MUTED}>FLOOR · DOWN-TRAIN FIRST</text>

      {/* Three modules, stacked */}
      {[
        { y: 90, ref: "F.01", name: "Reverse kegel", dose: "4 × 10 breaths · belly rises, floor drops" },
        { y: 250, ref: "F.02", name: "Eccentric kegel", dose: "3 × 10 · the slow release is the rep" },
        { y: 410, ref: "F.04", name: "Position routing", dose: "Engine returns a three-act plan, ranked" },
      ].map((m, i) => (
        <g key={m.ref}>
          <line x1="28" y1={m.y - 16} x2="472" y2={m.y - 16} stroke={RULE} strokeWidth="1" />
          <text x="28" y={m.y + 4} fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.4" fill={OX}>{m.ref}</text>
          <text x="28" y={m.y + 38} fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={INK}>{m.name}</text>
          <text x="28" y={m.y + 62} fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="1.4" fill={MUTED}>{m.dose}</text>
          {/* Visual */}
          <g transform={`translate(320, ${m.y})`}>
            {i === 0 && (
              // Breath waveform descending — floor drops
              <g stroke={OX} strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M 0 30 Q 24 0 48 30 Q 72 64 96 30 Q 120 0 144 30" />
                <text x="148" y="34" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill={OX} letterSpacing="1.2">↓</text>
              </g>
            )}
            {i === 1 && (
              // Concentric/eccentric tempo bars
              <g>
                <rect x="0" y="20" width="24" height="20" fill={OX} opacity="0.95" />
                <rect x="32" y="20" width="24" height="20" fill={OX} opacity="0.55" />
                <rect x="64" y="20" width="80" height="20" fill="none" stroke={OX} strokeWidth="2" />
                <text x="12" y="56" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill={MUTED} textAnchor="middle" letterSpacing="1.2">3s</text>
                <text x="44" y="56" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill={MUTED} textAnchor="middle" letterSpacing="1.2">3s</text>
                <text x="104" y="56" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill={MUTED} textAnchor="middle" letterSpacing="1.2">5s · release</text>
              </g>
            )}
            {i === 2 && (
              // Three-act ladder
              <g>
                {["WARM", "MAIN", "DESS"].map((label, j) => (
                  <g key={label} transform={`translate(${j * 50}, 0)`}>
                    <rect x="0" y="14" width="42" height="32" fill="none" stroke={OX} strokeWidth="1.4" />
                    <text x="21" y="34" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.4" fill={OX}>{label}</text>
                  </g>
                ))}
                <line x1="42" y1="30" x2="50" y2="30" stroke={OX} strokeWidth="1" strokeDasharray="2 2" />
                <line x1="92" y1="30" x2="100" y2="30" stroke={OX} strokeWidth="1" strokeDasharray="2 2" />
              </g>
            )}
          </g>
        </g>
      ))}

      <line x1="0" y1="556" x2="500" y2="556" stroke={RULE} strokeWidth="1" />
      <text x="28" y="580" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic" fill={MUTED}>Down-train first. Up-train second. Eccentric control is the metric.</text>
    </svg>
  );
}
