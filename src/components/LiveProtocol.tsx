import { useEffect, useRef, useState } from "react";
import { Activity, Dumbbell, Flame, Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

type Mode = "fix" | "flex" | "fuck";

const ZONES = [
  { id: "cervical", label: "Neck", y: 14 },
  { id: "thoracic", label: "Mid-back", y: 32 },
  { id: "lumbar", label: "Low back", y: 54 },
  { id: "sacral", label: "Sacrum", y: 70 },
  { id: "pelvic", label: "Pelvic floor", y: 82 },
] as const;

type ZoneId = typeof ZONES[number]["id"];

const FIX_PRESCRIPTION: Record<ZoneId, { move: string; sets: string; why: string }> = {
  cervical: { move: "Chin tuck + thoracic opener", sets: "3 × 8 · 4 min", why: "Decompress C5-C7. Resets desk-loaded cervical curve." },
  thoracic: { move: "Quadruped thread-the-needle", sets: "2 × 10/side · 5 min", why: "Restores rotation. The segment that fails when the lumbar overworks." },
  lumbar:   { move: "McGill big-3 + hip airplane", sets: "Circuit × 3 · 9 min", why: "Endurance over flexibility. The protocol that actually quiets discs." },
  sacral:   { move: "90/90 hip switches + glute bridge", sets: "3 × 6 · 6 min", why: "Frees the SI joint, fires the glutes that should be carrying the spine." },
  pelvic:   { move: "Reverse kegel + diaphragmatic breath", sets: "4 × 10 · 7 min", why: "Down-regulates over-tonic floor. Pre-requisite for everything below." },
};

const FLEX_SETS = [
  { name: "Dead bug",         reps: 8,  cue: "Ribs down. Exhale on extension." },
  { name: "Bird dog",         reps: 10, cue: "Drive heel to wall. Pause 2 sec." },
  { name: "Side plank",       reps: 6,  cue: "Stack hips. Breathe through nose." },
  { name: "Hip airplane",     reps: 6,  cue: "Slow eccentric. Don't rush." },
  { name: "Reverse kegel",    reps: 10, cue: "Inhale, drop the floor. Then release." },
];

const POSITIONS = [
  {
    id: "01", name: "The Reclined Pivot",
    safeFor: ["lumbar", "sacral", "thoracic"],
    why: "Zero spinal flexion. Hips supported. Pelvic floor in neutral.",
    breath: "4-in · 6-out", durationMin: 12,
  },
  {
    id: "02", name: "Side-Lying Spoon",
    safeFor: ["lumbar", "cervical", "sacral", "pelvic"],
    why: "Spine fully neutral. Easiest re-entry post-flare.",
    breath: "5-in · 5-out", durationMin: 18,
  },
  {
    id: "03", name: "Seated Lotus Lift",
    safeFor: ["pelvic", "thoracic", "cervical"],
    why: "Engages pelvic floor + breath sync. Eye contact maintained.",
    breath: "4-in · 7-hold · 8-out", durationMin: 22,
  },
  {
    id: "04", name: "Stacked Recovery",
    safeFor: ["sacral", "pelvic", "lumbar"],
    why: "Post-session down-regulation. Vagal reset, oxytocin window.",
    breath: "Box · 4-4-4-4", durationMin: 8,
  },
];

export function LiveProtocol() {
  const [mode, setMode] = useState<Mode>("fix");
  const [pain, setPain] = useState(4);
  const [zone, setZone] = useState<ZoneId>("lumbar");

  // Flex state
  const [setIdx, setSetIdx] = useState(0);
  const [reps, setReps] = useState(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number | null>(null);
  const currentSet = FLEX_SETS[setIdx];

  useEffect(() => {
    if (!running) return;
    tickRef.current = window.setInterval(() => {
      setReps((r) => {
        if (r + 1 >= currentSet.reps) {
          if (setIdx + 1 < FLEX_SETS.length) {
            setSetIdx(setIdx + 1);
            return 0;
          }
          setRunning(false);
          return currentSet.reps;
        }
        return r + 1;
      });
    }, 900);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running, setIdx, currentSet.reps]);

  const totalReps = FLEX_SETS.reduce((s, x) => s + x.reps, 0);
  const doneReps = FLEX_SETS.slice(0, setIdx).reduce((s, x) => s + x.reps, 0) + reps;
  const flexPct = (doneReps / totalReps) * 100;

  // F*ck state
  const [afterDark, setAfterDark] = useState(false);
  const matched = POSITIONS.filter((p) => p.safeFor.includes(zone));

  // Index calc, reactive to user input
  const baseIndex = 62;
  const painPenalty = pain * 2.5;
  const flexBonus = (doneReps / totalReps) * 14;
  const darkBonus = afterDark ? 6 : 0;
  const liveIndex = Math.round(baseIndex - painPenalty + flexBonus + darkBonus);

  const rx = FIX_PRESCRIPTION[zone];

  return (
    <div className="border border-border bg-card/40 backdrop-blur-sm rounded-sm overflow-hidden"
         style={{ boxShadow: "var(--shadow-lift)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--brand-pink)", boxShadow: "var(--glow-pink)" }} />
          <p className="font-mono-label text-[10px] text-muted-foreground">LIVE PROTOCOL · TRY IT NOW</p>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="font-mono-label text-[9px] text-muted-foreground">INDEX</p>
          <p className="font-serif-display text-2xl tabular-nums" style={{ color: "var(--brand-amber)" }}>
            {liveIndex}
          </p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="relative">
        <p className="absolute top-2 left-4 font-mono-label text-[8px] tracking-[0.22em] uppercase text-[var(--brand-amber)] z-10 pointer-events-none">
          Pick one ↓
        </p>
        <div role="tablist" aria-label="Protocol mode" className="grid grid-cols-3 border-b border-border">
          {([
            { id: "fix",  label: "Fix",   sub: "the back",     icon: Activity },
            { id: "flex", label: "Flex",  sub: "the system",   icon: Dumbbell },
            { id: "fuck", label: "F*ck",  sub: "the lights off", icon: Flame },
          ] as const).map((t, i) => {
            const Icon = t.icon;
            const active = mode === t.id;
            const accent = t.id === "fuck" ? "var(--brand-blush)" : "var(--brand-amber)";
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(t.id)}
                className={`group relative px-4 pt-7 pb-4 text-left cursor-pointer transition-colors ${i > 0 ? "border-l border-border" : ""} ${active ? "bg-background" : "bg-transparent hover:bg-background/60"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 transition-colors" style={{ color: active ? accent : "var(--muted-foreground)" }} />
                    <span className="font-serif-display text-2xl italic transition-colors" style={{ color: active ? (t.id === "fuck" ? "var(--brand-blush)" : "var(--foreground)") : "var(--muted-foreground)" }}>
                      {t.label}
                    </span>
                  </div>
                  {!active && (
                    <span className="font-mono-label text-[8px] tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: accent }}>
                      Tap →
                    </span>
                  )}
                </div>
                <p className="font-mono-label text-[9px] text-muted-foreground mt-1">{t.sub}</p>
                <span className="absolute left-0 right-0 bottom-0 h-[2px] transition-opacity"
                      style={{ background: accent, opacity: active ? 1 : 0.2 }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 min-h-[360px]">
        {mode === "fix" && (
          <div className="grid grid-cols-[120px_1fr] gap-6">
            {/* Body map */}
            <div className="relative bg-background border border-border rounded-sm h-[320px]">
              <p className="absolute top-2 left-2 font-mono-label text-[8px] text-muted-foreground">TAP A ZONE</p>
              <svg viewBox="0 0 60 100" className="w-full h-full">
                <ellipse cx="30" cy="9" rx="6" ry="7" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-muted-foreground/60" />
                <path d="M22 18 L38 18 L42 50 L40 78 L36 95 L24 95 L20 78 L18 50 Z"
                      fill="none" stroke="currentColor" strokeWidth="0.4" className="text-muted-foreground/60" />
                {ZONES.map((z) => {
                  const active = zone === z.id;
                  return (
                    <g key={z.id} onClick={() => setZone(z.id)} className="cursor-pointer">
                      <circle
                        cx={30} cy={z.y} r={active ? 4 : 2.6}
                        fill={active ? "var(--brand-amber)" : "var(--brand-blush)"}
                        opacity={active ? 1 : 0.45}
                        style={active ? { filter: "drop-shadow(0 0 6px var(--brand-amber))" } : undefined}
                      />
                      {active && (
                        <circle cx={30} cy={z.y} r={6} fill="none" stroke="var(--brand-amber)" strokeWidth="0.3" opacity="0.6" />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="font-mono-label text-[10px] text-muted-foreground">PAIN TODAY</p>
                  <p className="font-serif-display text-xl tabular-nums">
                    <span style={{ color: pain >= 7 ? "var(--brand-blush)" : pain >= 4 ? "var(--brand-amber)" : "var(--brand-teal)" }}>
                      {pain}
                    </span>
                    <span className="text-muted-foreground text-sm">/10</span>
                  </p>
                </div>
                <input
                  type="range" min={0} max={10} value={pain}
                  onChange={(e) => setPain(Number(e.target.value))}
                  className="w-full mt-2 accent-[var(--brand-amber)]"
                />
                <div className="flex justify-between font-mono-label text-[8px] text-muted-foreground mt-1">
                  <span>NONE</span><span>MANAGEABLE</span><span>FLARE</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">
                  RX · {ZONES.find(z => z.id === zone)?.label.toUpperCase()}
                </p>
                <p className="font-serif-display text-2xl mt-1 leading-tight">{rx.move}</p>
                <p className="font-mono-label text-[10px] text-muted-foreground mt-1">{rx.sets}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed italic">{rx.why}</p>
              </div>

              <button
                type="button"
                onClick={() => setMode("flex")}
                className="w-full flex items-center justify-between px-4 py-3 bg-foreground text-background font-mono-label text-[10px] hover:opacity-90 transition"
              >
                <span>QUEUE THE FLEX SET</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {mode === "flex" && (
          <div className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">SET {setIdx + 1} / {FLEX_SETS.length}</p>
                <h3 className="font-serif-display text-3xl mt-1">{currentSet.name}</h3>
                <p className="text-sm text-muted-foreground italic mt-1">{currentSet.cue}</p>
              </div>
              <div className="text-right">
                <p className="font-serif-display text-6xl tabular-nums leading-none" style={{ color: "var(--brand-amber)" }}>
                  {reps}
                </p>
                <p className="font-mono-label text-[10px] text-muted-foreground mt-1">/ {currentSet.reps} REPS</p>
              </div>
            </div>

            {/* Progress */}
            <div className="h-1 bg-border relative">
              <div className="h-full transition-all duration-300"
                   style={{ width: `${flexPct}%`, background: "var(--brand-amber)", boxShadow: "var(--glow-teal)" }} />
            </div>

            {/* Breath orb */}
            <div className="bg-background border border-border p-6 flex items-center justify-center min-h-[140px] relative overflow-hidden">
              <div
                className="w-24 h-24 rounded-full transition-transform"
                style={{
                  background: "radial-gradient(circle, var(--brand-blush), transparent 70%)",
                  transform: running ? "scale(1.4)" : "scale(0.9)",
                  transitionDuration: "900ms",
                }}
              />
              <p className="absolute font-script text-2xl italic" style={{ color: "var(--brand-blush)" }}>
                {running ? "breathe" : "ready"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 font-mono-label text-[11px] transition"
                style={{
                  background: running ? "transparent" : "var(--brand-amber)",
                  color: running ? "var(--brand-amber)" : "var(--brand-ink)",
                  border: `1px solid var(--brand-amber)`,
                }}
              >
                {running ? <><Pause className="w-4 h-4" /> PAUSE</> : <><Play className="w-4 h-4" /> {doneReps === 0 ? "START SET" : "RESUME"}</>}
              </button>
              <button
                type="button"
                onClick={() => { setRunning(false); setSetIdx(0); setReps(0); }}
                className="flex items-center justify-center gap-2 px-3 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition font-mono-label text-[11px]"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RESET
              </button>
            </div>

            {flexPct >= 100 && (
              <button
                type="button"
                onClick={() => setMode("fuck")}
                className="w-full flex items-center justify-between px-4 py-3 font-mono-label text-[10px] transition"
                style={{ background: "var(--brand-blush)", color: "var(--brand-ink)", boxShadow: "var(--glow-pink)" }}
              >
                <span>SET COMPLETE · UNLOCK AFTER DARK</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {mode === "fuck" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono-label text-[10px]" style={{ color: "var(--brand-blush)" }}>
                  AFTER DARK · MATCHED TO YOUR {ZONES.find(z => z.id === zone)?.label.toUpperCase()}
                </p>
                <h3 className="font-serif-display text-3xl italic mt-1">
                  {afterDark ? "Tonight's plan." : "Lights off?"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAfterDark(v => !v)}
                className="relative w-14 h-7 rounded-full border transition"
                style={{
                  borderColor: afterDark ? "var(--brand-blush)" : "var(--border)",
                  background: afterDark ? "var(--brand-blush)" : "transparent",
                  boxShadow: afterDark ? "var(--glow-pink)" : "none",
                }}
                aria-label="Toggle after dark"
              >
                <span
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
                  style={{
                    left: afterDark ? "calc(100% - 22px)" : "2px",
                    background: afterDark ? "var(--brand-ink)" : "var(--muted-foreground)",
                  }}
                />
              </button>
            </div>

            {!afterDark ? (
              <div className="bg-background border border-border p-8 text-center">
                <p className="text-sm text-muted-foreground italic max-w-sm mx-auto leading-relaxed">
                  Flip the switch. We'll match positions to your spine, your pelvic floor, and the breath cadence your nervous system needs to actually arrive.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border animate-fade-in">
                {matched.map((p) => (
                  <article key={p.id} className="bg-background p-5 group hover:bg-card/60 transition">
                    <div className="flex items-baseline justify-between">
                      <p className="font-mono-label text-[9px] text-muted-foreground">POSITION {p.id}</p>
                      <p className="font-mono-label text-[9px]" style={{ color: "var(--brand-blush)" }}>{p.durationMin} MIN</p>
                    </div>
                    <h4 className="font-serif-display text-xl italic mt-2 leading-tight"
                        style={{ color: "var(--brand-blush)", textShadow: "var(--glow-pink)" }}>
                      {p.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.why}</p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <span className="font-mono-label text-[9px] text-muted-foreground">BREATH</span>
                      <span className="font-mono-label text-[9px]" style={{ color: "var(--brand-amber)" }}>{p.breath}</span>
                    </div>
                  </article>
                ))}
                {matched.length === 0 && (
                  <p className="bg-background p-8 col-span-2 text-sm text-muted-foreground italic">
                    Today's flare is too acute. Recovery protocol queued instead, sleep + breath only.
                  </p>
                )}
              </div>
            )}

            <p className="font-script text-xl italic text-center pt-2" style={{ color: "var(--brand-amber)" }}>
              The protocol doesn't end at lights-out. It begins there.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
