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
      <text x="18" y="27" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.5" fill={OX}>SUBJECT 04 · DAY 42 · L4–L5</text>
      <circle cx="395" cy="22" r="3" fill={OX} />
      <text x="386" y="27" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="2.2" fill={OX} textAnchor="end">ARMED</text>

      {/* Body silhouette — stylized lumbar / pelvis schematic */}
      <g transform="translate(140, 70)">
        {/* Head */}
        <circle cx="70" cy="18" r="14" fill={INK} opacity="0.16" stroke={INK} strokeWidth="1" />
        {/* Neck */}
        <line x1="70" y1="32" x2="70" y2="48" stroke={INK} strokeWidth="2" />
        {/* Shoulders */}
        <line x1="36" y1="48" x2="104" y2="48" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        {/* Torso */}
        <path d="M 42 50 L 50 142 L 90 142 L 98 50 Z" fill={INK} opacity="0.08" stroke={INK} strokeWidth="1.2" />
        {/* Spine */}
        <line x1="70" y1="50" x2="70" y2="142" stroke={INK} strokeWidth="1.4" strokeDasharray="2 3" />
        {/* Lumbar marker (L4-L5 region) */}
        <rect x="62" y="124" width="16" height="18" fill={OX} opacity="0.85" />
        <line x1="78" y1="133" x2="118" y2="133" stroke={OX} strokeWidth="1" />
        <text x="122" y="136" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.4" fill={OX}>L4 · L5</text>
        {/* Pelvis */}
        <path d="M 38 142 Q 70 174 102 142 Q 96 170 70 178 Q 44 170 38 142 Z" fill={INK} opacity="0.10" stroke={INK} strokeWidth="1.2" />
        {/* Pelvic floor band */}
        <path d="M 50 168 Q 70 178 90 168" fill="none" stroke={OX} strokeWidth="2.2" />
        <line x1="50" y1="168" x2="14" y2="168" stroke={OX} strokeWidth="1" />
        <text x="10" y="171" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.4" fill={OX} textAnchor="end">FLOOR</text>
        {/* Hip flexor markers */}
        <circle cx="46" cy="158" r="3" fill={OX} />
        <circle cx="94" cy="158" r="3" fill={OX} />
        <line x1="94" y1="158" x2="138" y2="158" stroke={OX} strokeWidth="1" />
        <text x="142" y="161" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.4" fill={OX}>HIP · ILIOPSOAS</text>
        {/* Quads */}
        <line x1="56" y1="178" x2="56" y2="232" stroke={INK} strokeWidth="2" />
        <line x1="84" y1="178" x2="84" y2="232" stroke={INK} strokeWidth="2" />
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
            {/* Move silhouette */}
            <g transform={`translate(320, ${m.y - 10})`}>
              {i === 0 && (
                // Curl-up: supine with knee up
                <g stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round">
                  <line x1="20" y1="60" x2="140" y2="60" />
                  <circle cx="20" cy="56" r="6" fill={INK} opacity="0.15" stroke={INK} strokeWidth="1.4" />
                  <path d="M 90 60 L 110 32 L 130 60" />
                </g>
              )}
              {i === 1 && (
                // Side bridge: forearm down
                <g stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round">
                  <line x1="30" y1="36" x2="100" y2="80" />
                  <line x1="30" y1="36" x2="36" y2="60" />
                  <line x1="36" y1="60" x2="60" y2="60" />
                  <line x1="100" y1="80" x2="140" y2="80" />
                  <circle cx="26" cy="32" r="6" fill={INK} opacity="0.15" stroke={INK} strokeWidth="1.4" />
                </g>
              )}
              {i === 2 && (
                // Bird-dog: quadruped opposite arm + leg
                <g stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round">
                  <line x1="20" y1="44" x2="120" y2="44" />
                  <line x1="40" y1="44" x2="40" y2="72" />
                  <line x1="100" y1="44" x2="100" y2="72" />
                  <line x1="20" y1="44" x2="0" y2="20" />
                  <line x1="120" y1="44" x2="146" y2="64" />
                  <circle cx="18" cy="40" r="5" fill={INK} opacity="0.15" stroke={INK} strokeWidth="1.4" />
                </g>
              )}
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
