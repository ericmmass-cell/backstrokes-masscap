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

// Filled-silhouette exercise figures used inside the work-card SVG.
// Drawn at ~480x300 base coords; the parent group scales them down.
function WorkCurlUp() {
  return (
    <g>
      {/* Supine torso */}
      <path
        fill={INK}
        d="
          M 40 178
          C 30 174, 26 168, 30 158
          C 34 148, 44 142, 56 140
          C 70 138, 84 138, 100 136
          C 100 132, 102 128, 106 124
          C 110 120, 116 118, 122 118
          C 130 118, 134 122, 138 128
          C 142 134, 144 138, 148 140
          C 174 142, 220 144, 270 146
          C 310 148, 330 150, 340 152
          L 340 168
          C 320 170, 290 172, 250 174
          C 200 176, 140 180, 90 182
          C 70 184, 54 184, 46 182
          C 42 181, 40 180, 40 178 Z
        "
      />
      <circle cx="125" cy="118" r="14" fill={INK} />
      <path
        fill={INK}
        d="
          M 320 152
          C 332 150, 348 148, 358 142
          C 368 136, 374 128, 374 118
          C 374 110, 370 106, 364 108
          C 360 110, 358 116, 354 122
          C 350 130, 344 138, 332 148 Z
        "
      />
      <path
        fill={INK}
        d="
          M 364 116
          C 370 114, 378 116, 382 124
          C 386 134, 386 148, 384 162
          C 382 170, 378 174, 372 174
          C 368 174, 364 170, 362 162
          C 360 152, 360 138, 362 126
          C 362 122, 363 118, 364 116 Z
        "
      />
    </g>
  );
}

function WorkSidePlank() {
  return (
    <g>
      <path
        fill={INK}
        d="
          M 84 78
          C 80 70, 84 60, 92 56
          C 100 52, 110 56, 114 62
          L 144 102
          C 152 110, 160 118, 170 124
          L 280 198
          C 290 204, 302 208, 314 208
          C 326 208, 334 212, 336 220
          C 338 230, 334 240, 322 240
          L 280 240
          C 268 240, 256 234, 246 228
          L 162 168
          C 152 162, 142 152, 132 142
          L 102 100
          C 92 92, 84 86, 84 78 Z
        "
      />
      <circle cx="98" cy="62" r="13" fill={INK} />
      <path
        fill={INK}
        d="
          M 90 76
          C 86 78, 80 82, 76 90
          C 72 100, 70 124, 70 156
          C 70 184, 72 208, 78 218
          C 82 226, 90 230, 96 226
          C 102 222, 102 216, 98 208
          C 92 196, 88 184, 88 168
          C 88 152, 90 132, 96 110
          C 100 96, 100 86, 98 82
          C 96 78, 94 76, 90 76 Z
        "
      />
      <ellipse cx="84" cy="222" rx="22" ry="6" fill={INK} />
    </g>
  );
}

function WorkBirdDog() {
  return (
    <g>
      <path
        fill={INK}
        d="
          M 120 130
          C 110 128, 102 130, 100 138
          C 98 146, 102 154, 112 156
          C 130 158, 170 156, 210 154
          C 250 152, 290 152, 320 154
          C 332 156, 340 152, 342 144
          C 344 136, 338 130, 326 128
          C 290 124, 250 122, 210 124
          C 180 126, 150 128, 120 130 Z
        "
      />
      <circle cx="116" cy="124" r="13" fill={INK} />
      <path
        fill={INK}
        d="
          M 132 152
          C 128 158, 128 178, 130 196
          C 132 214, 136 230, 144 232
          C 154 234, 158 226, 156 214
          C 154 200, 152 184, 152 168
          C 152 158, 152 152, 146 150
          C 140 148, 134 150, 132 152 Z
        "
      />
      <ellipse cx="142" cy="234" rx="18" ry="5" fill={INK} />
      <path
        fill={INK}
        d="
          M 296 154
          C 292 162, 292 184, 296 204
          C 300 222, 308 232, 318 232
          C 326 232, 328 222, 322 204
          C 316 184, 312 168, 312 158
          C 312 152, 308 150, 302 150
          C 298 150, 296 152, 296 154 Z
        "
      />
      <ellipse cx="312" cy="234" rx="20" ry="5" fill={INK} />
      <path
        fill={INK}
        d="
          M 110 130
          C 102 124, 92 118, 80 110
          C 70 102, 60 96, 52 92
          C 46 88, 44 84, 48 80
          C 52 76, 60 78, 70 82
          C 86 88, 100 96, 116 108
          C 124 114, 128 120, 124 126
          C 122 130, 116 132, 110 130 Z
        "
      />
      <path
        fill={INK}
        d="
          M 330 148
          C 340 146, 354 144, 372 142
          C 388 140, 402 140, 410 142
          C 416 144, 418 148, 414 152
          C 410 156, 402 158, 388 158
          C 372 158, 354 160, 340 162
          C 332 162, 328 160, 328 156
          C 328 152, 328 150, 330 148 Z
        "
      />
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

      {/* Anatomical side-view human figure with clinical annotations */}
      <g transform="translate(150, 60)">
        {/* Full body silhouette — side profile, standing */}
        <path
          fill={INK}
          d="
            M 60 0
            C 46 0, 38 12, 38 28
            C 38 38, 42 46, 50 50
            C 46 54, 42 60, 40 70
            C 38 82, 38 96, 40 106
            C 42 112, 46 116, 52 118
            C 50 124, 48 132, 48 142
            C 48 158, 50 174, 54 184
            C 50 188, 46 196, 44 210
            C 42 230, 42 252, 44 268
            C 45 274, 48 276, 52 274
            C 56 272, 58 266, 58 252
            C 58 236, 60 220, 64 210
            C 64 222, 64 240, 62 256
            C 60 268, 62 274, 66 274
            C 70 274, 72 268, 72 252
            C 72 236, 74 218, 76 208
            C 78 198, 78 188, 76 184
            C 80 174, 82 158, 82 142
            C 82 132, 80 124, 78 118
            C 84 116, 88 112, 90 106
            C 92 96, 92 82, 90 70
            C 88 60, 84 54, 80 50
            C 88 46, 92 38, 92 28
            C 92 12, 84 0, 70 0
            C 67 -1, 63 -1, 60 0 Z
          "
          opacity="0.92"
        />

        {/* Lumbar region highlight — oxblood overlay where L4-L5 sits */}
        <rect x="48" y="112" width="34" height="14" fill={OX} opacity="0.85" />
        <line x1="82" y1="119" x2="118" y2="119" stroke={OX} strokeWidth="1.2" />
        <text x="122" y="122" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.6" fill={OX}>L4 · L5</text>

        {/* Pelvic floor band — oxblood arc across pelvis */}
        <path d="M 42 156 Q 65 168 88 156" fill="none" stroke={OX} strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="156" x2="8" y2="156" stroke={OX} strokeWidth="1.2" />
        <text x="4" y="159" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.6" fill={OX} textAnchor="end">FLOOR</text>

        {/* Hip / iliopsoas marker — oxblood dot at hip */}
        <circle cx="86" cy="148" r="4" fill={OX} />
        <line x1="90" y1="148" x2="120" y2="148" stroke={OX} strokeWidth="1.2" />
        <text x="124" y="151" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.6" fill={OX}>HIP · ILIOPSOAS</text>
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
