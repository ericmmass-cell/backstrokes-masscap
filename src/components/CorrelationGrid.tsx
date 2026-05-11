// Correlation grid: small multiples showing how each pillar correlates with the Performance Index.

const SERIES = [
  { label: "Spine ROM × Performance",      r: "+0.71", path: "M0,40 C20,38 35,30 50,25 C70,18 85,12 100,8" },
  { label: "Resting BP × Performance",     r: "−0.64", path: "M0,8 C25,12 40,20 55,28 C75,35 88,40 100,42" },
  { label: "HRV × Performance",            r: "+0.69", path: "M0,42 C20,38 30,32 50,26 C70,18 85,12 100,6" },
  { label: "Pelvic floor × Confidence",    r: "+0.62", path: "M0,38 C20,32 35,28 55,22 C75,16 88,11 100,9"  },
  { label: "Sleep continuity × Recovery",  r: "+0.74", path: "M0,40 C18,36 32,28 50,20 C72,12 88,7 100,5"   },
  { label: "Inflammation × Pain (next-day)", r: "+0.58", path: "M0,38 C20,34 32,28 50,22 C72,14 88,9 100,7" },
];

export function CorrelationGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
      {SERIES.map((s) => {
        const positive = s.r.startsWith("+");
        return (
          <div key={s.label} className="bg-background p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="font-mono-label text-[9px] text-muted-foreground leading-snug max-w-[60%]">
                {s.label}
              </p>
              <p
                className="font-serif-display text-lg leading-none"
                style={{ color: positive ? "var(--brand-amber)" : "var(--brand-clay)" }}
              >
                r {s.r}
              </p>
            </div>
            <svg viewBox="0 0 100 50" className="w-full h-14">
              <path d="M0,50 H100" stroke="oklch(1 0 0 / 0.06)" strokeWidth="0.5"/>
              <path d="M0,25 H100" stroke="oklch(1 0 0 / 0.04)" strokeWidth="0.5" strokeDasharray="1 2"/>
              <path d={s.path} fill="none"
                    stroke={positive ? "oklch(0.82 0.11 80)" : "oklch(0.62 0.12 35)"}
                    strokeWidth="1.4"/>
              {/* dots */}
              {[10,30,50,70,90].map((x,i)=>(
                <circle key={i} cx={x} cy={positive ? 40-i*7 : 12+i*7} r="1.2"
                        fill="oklch(0.96 0.01 80 / 0.55)"/>
              ))}
            </svg>
            <p className="font-mono-label text-[8px] text-muted-foreground mt-2">
              N = 12,847 SESSIONS · 90-DAY ROLLING
            </p>
          </div>
        );
      })}
    </div>
  );
}
