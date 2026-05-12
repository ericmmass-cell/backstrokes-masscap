/**
 * Editorial anatomical line marks. Single-stroke, currentColor.
 * No external assets. Use inside a colored "plate".
 */
type Props = { className?: string; stroke?: number };

export function SpineMark({ className, stroke = 1.25 }: Props) {
  return (
    <svg viewBox="0 0 200 320" className={className} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* skull cap */}
      <path d="M100 18 C 78 18 62 34 62 56 C 62 70 70 80 82 86" />
      <path d="M100 18 C 122 18 138 34 138 56 C 138 70 130 80 118 86" />
      {/* spine column - wavy lordosis/kyphosis */}
      <path d="M100 86 C 110 110 92 134 100 158 C 108 180 92 204 100 226 C 108 246 96 270 100 296" />
      {/* vertebrae ticks */}
      {Array.from({ length: 18 }).map((_, i) => {
        const t = i / 17;
        const y = 90 + t * 200;
        const x = 100 + Math.sin(t * Math.PI * 3) * 6;
        const w = 18 - t * 4;
        return <line key={i} x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} />;
      })}
      {/* sacrum */}
      <path d="M100 296 L 86 312 M100 296 L 114 312 M92 304 L 108 304" />
      {/* ribs - subtle */}
      <path d="M82 110 C 60 116 50 130 52 150" opacity="0.55" />
      <path d="M118 110 C 140 116 150 130 148 150" opacity="0.55" />
      <path d="M84 138 C 58 146 48 160 52 180" opacity="0.4" />
      <path d="M116 138 C 142 146 152 160 148 180" opacity="0.4" />
    </svg>
  );
}

export function PelvisMark({ className, stroke = 1.25 }: Props) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* iliac crests */}
      <path d="M30 40 C 70 30 110 60 140 90" />
      <path d="M290 40 C 250 30 210 60 180 90" />
      {/* pubic arch */}
      <path d="M140 90 C 150 130 170 130 180 90" />
      {/* sacrum (top center) */}
      <path d="M150 24 C 158 28 162 28 170 24 L 168 60 L 152 60 Z" />
      {/* sit bones */}
      <path d="M120 110 C 100 130 100 150 130 158" />
      <path d="M200 110 C 220 130 220 150 190 158" />
      {/* pelvic floor sling — the point of the figure */}
      <path d="M132 158 C 160 174 200 174 188 158" strokeDasharray="3 3" />
      <path d="M140 150 C 160 162 200 162 180 150" opacity="0.5" />
      {/* legend tick marks */}
      <line x1="160" y1="70" x2="160" y2="86" opacity="0.5" />
    </svg>
  );
}
