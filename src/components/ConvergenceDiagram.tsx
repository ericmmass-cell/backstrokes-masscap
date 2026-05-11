// Signature graphic: 6 health data streams converging into a single performance index.
// Pure SVG, scales to container, no external deps.

const STREAMS = [
  { id: "spine",   label: "Spine load & ROM",     angle: 200, color: "var(--brand-amber)" },
  { id: "pelvic",  label: "Pelvic floor tone",    angle: 230, color: "var(--brand-clay)"  },
  { id: "vitals",  label: "BP · HRV · RHR",       angle: 260, color: "var(--brand-amber)" },
  { id: "breath",  label: "Breath & nervous sys", angle: 290, color: "var(--brand-sage)"  },
  { id: "fuel",    label: "Nutrition & hydration",angle: 320, color: "var(--brand-clay)"  },
  { id: "sleep",   label: "Sleep continuity",     angle: 350, color: "var(--brand-sage)"  },
];

const OUTPUTS = [
  { label: "Pain ↓",        y: 90  },
  { label: "Capacity ↑",    y: 130 },
  { label: "Confidence ↑",  y: 170 },
  { label: "Performance ↑", y: 210 },
];

export function ConvergenceDiagram() {
  const cx = 560, cy = 150, r = 130;

  return (
    <svg
      viewBox="0 0 800 320"
      className="w-full h-auto"
      role="img"
      aria-label="Six health data streams converging into the BackBetter Performance Index"
    >
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="oklch(0.82 0.11 80)" stopOpacity="0.9"/>
          <stop offset="60%" stopColor="oklch(0.82 0.11 80)" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="oklch(0.82 0.11 80)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%"  stopColor="currentColor" stopOpacity="0.05"/>
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.95"/>
        </linearGradient>
      </defs>

      {/* Streams (left side) → core (right) */}
      {STREAMS.map((s, i) => {
        const x1 = 60;
        const y1 = 40 + i * 40;
        // smooth bezier into core
        const d = `M${x1},${y1} C${x1 + 200},${y1} ${cx - 200},${cy} ${cx - 6},${cy}`;
        return (
          <g key={s.id} style={{ color: s.color }}>
            <path d={d} fill="none" stroke="url(#line)" strokeWidth="1.2"/>
            <circle cx={x1} cy={y1} r="3.5" fill="currentColor"/>
            <text x={x1 - 10} y={y1 + 4} textAnchor="end"
                  fontFamily="JetBrains Mono, ui-monospace" fontSize="10"
                  fill="oklch(0.72 0.02 80)" letterSpacing="0.08em">
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Core glow + ring */}
      <circle cx={cx} cy={cy} r={r} fill="url(#core)"/>
      <circle cx={cx} cy={cy} r={70} fill="none"
              stroke="oklch(0.82 0.11 80)" strokeOpacity="0.35" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={50} fill="oklch(0.14 0.008 60)"
              stroke="oklch(0.82 0.11 80)" strokeOpacity="0.6" strokeWidth="1"/>

      {/* Index value */}
      <text x={cx} y={cy - 4} textAnchor="middle"
            fontFamily="Fraunces, Georgia, serif" fontSize="32"
            fill="oklch(0.96 0.01 80)">87</text>
      <text x={cx} y={cy + 14} textAnchor="middle"
            fontFamily="JetBrains Mono, ui-monospace" fontSize="8"
            fill="oklch(0.72 0.02 80)" letterSpacing="0.18em">
        PERFORMANCE INDEX
      </text>

      {/* Outputs */}
      {OUTPUTS.map((o, i) => {
        const x = cx + 90;
        const y = o.y;
        return (
          <g key={o.label}>
            <path d={`M${cx + 50},${cy} C${cx + 70},${cy} ${x - 20},${y} ${x},${y}`}
                  fill="none" stroke="oklch(0.82 0.11 80)" strokeOpacity={0.55 - i*0.07} strokeWidth="1"/>
            <circle cx={x} cy={y} r="3" fill="oklch(0.82 0.11 80)"/>
            <text x={x + 10} y={y + 4}
                  fontFamily="JetBrains Mono, ui-monospace" fontSize="10"
                  fill="oklch(0.96 0.01 80)" letterSpacing="0.08em">
              {o.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Subtle frame ticks */}
      <g fontFamily="JetBrains Mono, ui-monospace" fontSize="8"
         fill="oklch(0.55 0.02 80)" letterSpacing="0.18em">
        <text x="20" y="18">FIG. 01 · CONVERGENCE</text>
        <text x="780" y="312" textAnchor="end">v 4.2 · ADAPTIVE</text>
      </g>
    </svg>
  );
}
