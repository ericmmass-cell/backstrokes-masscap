import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useSessionTimer, fmt } from "@/hooks/useSessionTimer";
import { PROTOCOL_V1, incrementStreak } from "@/lib/session-protocol";
import { AudioCue } from "@/components/session/AudioCue";

export function Player() {
  const t = useSessionTimer(PROTOCOL_V1);
  const lastBlockRef = useRef(0);
  const lastCountdownRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  // transition beeps
  useEffect(() => {
    if (t.blockIndex !== lastBlockRef.current) {
      AudioCue.transition();
      lastBlockRef.current = t.blockIndex;
    }
  }, [t.blockIndex]);

  // countdown beeps (3, 2, 1)
  useEffect(() => {
    if (t.status !== "running") return;
    const r = Math.ceil(t.remainingInBlock);
    if (r <= 3 && r > 0 && r !== lastCountdownRef.current) {
      lastCountdownRef.current = r;
      AudioCue.countdown();
    }
    if (r > 3) lastCountdownRef.current = null;
  }, [t.remainingInBlock, t.status]);

  // completion side-effects
  useEffect(() => {
    if (t.status === "complete" && !completedRef.current) {
      completedRef.current = true;
      AudioCue.complete();
      incrementStreak();
    }
  }, [t.status]);

  // keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space") {
        e.preventDefault();
        if (t.status === "idle") t.start();
        else if (t.status === "running") t.pause();
        else if (t.status === "paused") t.resume();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        if (t.status === "running" || t.status === "paused") t.skip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t]);

  if (t.status === "complete") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--brand-oxblood)", color: "var(--brand-paper)" }}>
        <p className="fig-label opacity-70">§ Session complete</p>
        <h1 className="display-mega text-[clamp(56px,12vw,180px)] mt-6 italic">The rent is paid.</h1>
        <p className="mt-8 measure font-serif-display text-xl opacity-90">Eight minutes. Logged. Tomorrow, again. That's the whole company.</p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <button onClick={() => { completedRef.current = false; t.reset(); t.start(); }} className="fig-label px-6 py-3 border border-current hover:opacity-80 transition">◆ Run again</button>
          <Link to="/" className="fig-label px-6 py-3 hover:opacity-80 transition opacity-70">← Back to index</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--brand-ink)", color: "var(--brand-paper)" }}>
      {/* Top bar */}
      <header className="px-6 md:px-10 pt-6">
        <div className="flex items-center justify-between fig-label opacity-70">
          <Link to="/" className="hover:opacity-100">← Backstroke</Link>
          <span>Session 01 / Daily · 8 min</span>
          <span>Total {fmt(t.totalRemaining)}</span>
        </div>
        {/* hairline progress */}
        <div className="mt-4 h-px bg-current opacity-20 relative">
          <div className="absolute left-0 top-0 h-px bg-current opacity-100 transition-[width] duration-200 ease-linear" style={{ width: `${t.progressPct}%`, background: "var(--brand-amber)" }} />
        </div>
        <div className="mt-2 flex justify-between fig-label opacity-50 text-[9px]">
          {PROTOCOL_V1.map((b, i) => (
            <span key={b.id} className={i === t.blockIndex ? "" : "opacity-50"} style={i === t.blockIndex ? { color: "var(--brand-amber)" } : undefined}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </header>

      {/* Center */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="fig-label opacity-70">Fig. {String(t.blockIndex + 1).padStart(2, "0")} / {String(t.blocksCount).padStart(2, "0")}</p>
        <h1 className="display-mega italic mt-6 text-[clamp(48px,10vw,160px)]" style={{ color: "var(--brand-paper)" }}>
          {t.current?.name}
        </h1>
        <p className="mt-6 fig-label opacity-70">{t.current?.detail}</p>

        <div className="mt-12 font-mono-label text-[clamp(56px,14vw,180px)] leading-none tabular-nums" style={{ color: "var(--brand-amber)", letterSpacing: "0.04em" }}>
          {fmt(t.remainingInBlock)}
        </div>

        <p className="mt-10 measure font-serif-display text-lg md:text-2xl italic opacity-90">
          {t.current?.cue}
        </p>

        {/* Controls */}
        <div className="mt-14 flex flex-wrap gap-3 justify-center fig-label">
          {t.status === "idle" && (
            <button onClick={t.start} className="px-8 py-4 border border-current hover:opacity-80 transition" style={{ background: "var(--brand-amber)", color: "var(--brand-ink)", borderColor: "var(--brand-amber)" }}>
              ▶ Start session
            </button>
          )}
          {t.status === "running" && (
            <>
              <button onClick={t.pause} className="px-6 py-3 border border-current hover:opacity-80 transition">❚❚ Pause</button>
              <button onClick={t.skip} className="px-6 py-3 border border-current opacity-70 hover:opacity-100 transition">Skip block →</button>
            </>
          )}
          {t.status === "paused" && (
            <>
              <button onClick={t.resume} className="px-6 py-3 border border-current hover:opacity-80 transition" style={{ background: "var(--brand-amber)", color: "var(--brand-ink)", borderColor: "var(--brand-amber)" }}>
                ▶ Resume
              </button>
              <button onClick={t.skip} className="px-6 py-3 border border-current opacity-70 hover:opacity-100 transition">Skip block →</button>
              <button onClick={t.reset} className="px-6 py-3 opacity-50 hover:opacity-100 transition">End</button>
            </>
          )}
        </div>
      </main>

      {/* Bottom: next up + key hints */}
      <footer className="px-6 md:px-10 pb-6">
        <div className="flex items-center justify-between fig-label opacity-50 text-[10px]">
          <span>{t.next ? `Next — ${t.next.name}` : "Last block"}</span>
          <span>Space play/pause · → skip</span>
        </div>
      </footer>
    </div>
  );
}
