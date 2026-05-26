import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  distractionsForSession,
  THEME_LABEL,
  THEME_SOURCES,
  type Distraction,
} from "@/lib/distractions";
import { HumanFigure } from "@/components/HumanFigure";

type MoveKey = "curl-up" | "side-plank" | "bird-dog" | "breath" | "decomp";

export const Route = createFileRoute("/session")({
  component: SessionPlayer,
  head: () => ({ meta: [{ title: "Session · BackStroke" }] }),
});

type Move = {
  ref: string;
  label: string;
  dose: string;
  cue: string;
  secs: number;
  moveKey: MoveKey;
  formNotes: string[];
};

const PROTOCOL: Move[] = [
  {
    ref: "B.01a",
    label: "Curl-up",
    dose: "4 reps · 8 sec hold each side",
    cue: "Curl-up. Neutral spine. Small lift. Hold. This is not a sit-up. Sit-ups had their century and used it poorly.",
    secs: 120,
    moveKey: "curl-up",
    formNotes: [
      "Small lift · neck long · shoulder blades lighten",
      "Hands beneath the lumbar arch",
      "One knee bent · other leg long",
      "Exhale on the hold · 8 sec",
    ],
  },
  {
    ref: "B.01b",
    label: "Side plank",
    dose: "4 reps · 8 sec hold each side",
    cue: "Side bridge. Ribs stacked. Hips quiet. The mat is not an enemy. It is a witness.",
    secs: 180,
    moveKey: "side-plank",
    formNotes: [
      "Forearm directly under the shoulder",
      "Hips lifted · body in one line",
      "Knees bent · week 1 default",
      "Stop one rep before you want to",
    ],
  },
  {
    ref: "B.01c",
    label: "Bird dog",
    dose: "4 reps · 8 sec hold each side",
    cue: "Bird-dog. Opposite arm and leg. No lumbar sway. Imagine a glass of very judgmental water on your back.",
    secs: 180,
    moveKey: "bird-dog",
    formNotes: [
      "Opposite arm forward · thumb up",
      "Opposite leg back · heel level with hip",
      "Brace · no shift across midline",
      "Trace a square with the heel before returning",
    ],
  },
];

const DOWN_TRAIN: Move[] = [
  {
    ref: "F.01a",
    label: "Diaphragmatic breath",
    dose: "10 slow breaths",
    cue: "Inhale. Lower ribs widen, lower abdomen rises. Exhale. Everything returns to rest. The cheapest down-regulator the autonomic nervous system has, and nobody sells a subscription for it.",
    secs: 150,
    moveKey: "breath",
    formNotes: [
      "One hand on lower ribs · one on lower abdomen",
      "Inhale ~3 sec · lower abdomen rises",
      "Ribs widen laterally · not just upward",
      "Exhale ~3 sec · slow as you can stand",
    ],
  },
  {
    ref: "B.04m",
    label: "Supported decompression",
    dose: "Hold, breathe through it",
    cue: "Pillow or rolled towel under the knees. Arms relaxed at sides. No mat sold separately.",
    secs: 90,
    moveKey: "decomp",
    formNotes: [
      "Arms relaxed at sides · palms easy",
      "Pillow or roll under the knees",
      "Lumbar floats · don't flatten it",
      "Breathe through the position · 90 sec",
    ],
  },
];

const mmss = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

const QUOTE_INTERVAL = 18;

/* ───────── Workout demo panel with form notes alongside ───────── */

function DemoPanel({
  move,
  moveIdx,
  total,
  paused,
}: {
  move: Move;
  moveIdx: number;
  total: number;
  paused: boolean;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden grid grid-cols-12">
      <div className="col-span-12 md:col-span-8 relative" style={{ background: "#F4EFE3" }}>
        <HumanFigure moveKey={move.moveKey} paused={paused} />
      </div>

      {/* Form notes column — separated from the 3D viewport, no overlap */}
      <aside className="col-span-12 md:col-span-4 border-l border-border bg-card/30 px-5 py-6 flex flex-col gap-3">
        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
          ◆ Form notes · {move.ref}
        </p>
        <ul className="flex flex-col gap-2 mt-1">
          {move.formNotes.map((note, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span
                className="font-mono-label text-[10px] tracking-[0.18em] shrink-0 mt-0.5"
                style={{ color: "var(--brand-amber)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif-display text-sm md:text-base italic leading-snug text-foreground/90">
                {note}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-border">
          <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            ◆ Demo · {paused ? "paused" : "looping"}
          </p>
          <p className="font-serif-display text-xs italic text-muted-foreground mt-2 leading-snug">
            The movement is shown on the left. The form checkpoints stay here so the body gets to be the body.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ───────── Distractions panel ───────── */

function DistractionsPanel({
  deck,
  isRunning,
}: {
  deck: Distraction[];
  isRunning: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [secondsToNext, setSecondsToNext] = useState(QUOTE_INTERVAL);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = window.setInterval(() => {
      setSecondsToNext((s) => {
        if (s <= 1) {
          setFade(true);
          window.setTimeout(() => {
            setIdx((i) => (i + 1) % deck.length);
            setFade(false);
          }, 220);
          return QUOTE_INTERVAL;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isRunning, deck.length]);

  const d = deck[idx];
  const isQuote = d.kind === "quote" || !d.kind;

  return (
    <article
      className="border-t border-border px-7 md:px-10 py-7 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.92 0.022 76) 0%, oklch(0.94 0.018 78) 100%)",
        minHeight: 280,
      }}
    >
      {/* Header — small, single line */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
          ◆ The distraction · {THEME_LABEL[d.theme]}
        </p>
        <div className="flex items-center gap-4">
          <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            {idx + 1} of {deck.length}
          </p>
          {/* Tiny countdown bar */}
          <div className="w-16 h-px bg-border relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 transition-all"
              style={{
                width: `${(secondsToNext / QUOTE_INTERVAL) * 100}%`,
                background: "var(--brand-amber)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="transition-opacity duration-200"
        style={{ opacity: fade ? 0 : 1 }}
      >
        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mt-5 text-muted-foreground">
          {d.attribution} · {d.era}
        </p>

        <blockquote
          className="mt-3 font-serif-display italic leading-[1.12]"
          style={{
            fontSize: "clamp(24px, 2.6vw, 36px)",
            background: "var(--gradient-text)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {isQuote ? `“${d.text}”` : d.text}
        </blockquote>

        {d.note && (
          <p className="mt-4 font-serif-display text-sm md:text-base italic leading-snug text-muted-foreground max-w-3xl">
            {d.note}
          </p>
        )}

        <p className="mt-5 font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
          ◆ {THEME_SOURCES[d.theme]}
        </p>
      </div>
    </article>
  );
}

/* ───────── Player ───────── */

function SessionPlayer() {
  const navigate = useNavigate();

  const [moves, setMoves] = useState<Move[]>(PROTOCOL);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bs.user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u?.flareSwapped) setMoves(DOWN_TRAIN);
      }
    } catch {}
  }, []);

  const total = useMemo(() => moves.reduce((a, m) => a + m.secs, 0), [moves]);
  const deck = useMemo(() => distractionsForSession(), []);

  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(moves[0].secs);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(true);
  const [done, setDone] = useState(false);
  const tickRef = useRef<number | null>(null);

  useEffect(() => setRemaining(moves[idx].secs), [idx, moves]);

  useEffect(() => {
    if (paused || done) return;
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setElapsed((e) => e + 1);
          setIdx((i) => {
            if (i + 1 >= moves.length) {
              setDone(true);
              return i;
            }
            return i + 1;
          });
          return moves[Math.min(idx + 1, moves.length - 1)].secs;
        }
        setElapsed((e) => e + 1);
        return r - 1;
      });
    }, 1000) as unknown as number;
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [paused, done, idx, moves]);

  const current = moves[idx];
  const percent = Math.min(100, Math.round((elapsed / total) * 100));
  const isRunning = !paused && !done;

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased grid place-items-center px-6 py-16">
        <div className="max-w-xl text-center">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
            ◆ SESSION COMPLETE · NO HORSE WAS APPOINTED · STREAK HOLDS
          </p>
          <h1 className="font-serif-display text-6xl md:text-8xl mt-6 leading-[0.95] tracking-[-0.025em] italic">
            Done.
          </h1>
          <p className="mt-6 font-serif-display text-xl italic text-muted-foreground leading-snug">
            The lumbar will not send flowers. It may, around day nine, stop interrupting meetings.
          </p>
          <p className="mt-4 font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            ◆ {mmss(elapsed)} elapsed · {deck.length} entries available, {Math.min(deck.length, Math.floor(elapsed / QUOTE_INTERVAL) + 1)} shown
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-[var(--brand-ink)] hover:opacity-90 transition"
              style={{ background: "var(--brand-amber)", boxShadow: "var(--glow-teal)" }}
            >
              ← back to today
            </Link>
            <Link to="/positions" className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition">
              tonight's read →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <header className="px-6 md:px-10 py-4 flex items-center justify-between border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="11" cy="11" r="3" fill="currentColor" />
          </svg>
          <span className="font-serif-display text-base italic">
            Back<span style={{ color: "var(--brand-amber)" }}>Stroke</span>
          </span>
        </Link>
        <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          ◆ SESSION · {mmss(elapsed)} / {mmss(total)}
        </p>
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition"
        >
          quit · streak holds
        </button>
      </header>

      {/* Progress strip */}
      <div className="px-6 md:px-10 pt-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{ width: `${percent}%`, background: "var(--brand-amber)", boxShadow: "var(--glow-teal)" }}
            />
            {moves.map((_, i) => {
              const left = (moves.slice(0, i).reduce((a, m) => a + m.secs, 0) / total) * 100;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{
                    left: `${left}%`,
                    background: i <= idx ? "var(--brand-amber)" : "oklch(0.3 0.01 30)",
                    border: "1px solid var(--brand-paper)",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-3 flex justify-between font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
            {moves.map((m, i) => (
              <span key={m.ref} style={{ color: i === idx ? "var(--brand-amber)" : undefined, opacity: i < idx ? 0.5 : 1 }}>
                {m.ref} · {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 grid lg:grid-cols-12">
        <div className="lg:col-span-7 border-r border-border flex flex-col">
          <div className="relative flex-1 min-h-[46vh]">
            <DemoPanel move={current} moveIdx={idx} total={moves.length} paused={paused} />
          </div>
          <DistractionsPanel deck={deck} isRunning={isRunning} />
        </div>

        <div className="lg:col-span-5 px-6 md:px-10 py-10 grid place-items-center" style={{ background: "linear-gradient(180deg, oklch(0.96 0.012 80) 0%, oklch(0.92 0.022 76) 100%)" }}>
          <div className="max-w-md w-full text-center">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              {current.ref} · {current.label}
            </p>

            <h1
              className="font-serif-display tracking-[-0.025em] mt-6 leading-none"
              style={{
                fontSize: "clamp(110px, 16vw, 180px)",
                background: "var(--gradient-text)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {mmss(remaining)}
            </h1>

            <p className="mt-8 font-serif-display text-lg md:text-xl italic leading-snug text-foreground/85">
              &ldquo;{current.cue}&rdquo;
            </p>

            <div className="mt-10 flex items-center justify-center">
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  background: "var(--brand-amber)",
                  boxShadow: "var(--glow-teal)",
                  animation: paused ? "none" : "bs-pulse 8s ease-in-out infinite",
                }}
                aria-hidden
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
                className="px-4 py-2.5 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase border border-border text-muted-foreground hover:text-foreground transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← prev
              </button>
              <button
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[var(--brand-ink)] hover:opacity-90 transition"
                style={{ background: "var(--brand-amber)", boxShadow: "var(--glow-teal)" }}
              >
                {paused ? (elapsed === 0 ? "◆ Begin" : "Resume") : "Pause"}
              </button>
              <button
                onClick={() => {
                  if (idx + 1 < moves.length) setIdx((i) => i + 1);
                  else setDone(true);
                }}
                className="px-4 py-2.5 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase border border-border text-muted-foreground hover:text-foreground transition"
              >
                skip →
              </button>
            </div>

            <p className="mt-5 font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
              {paused ? "Paused. The clock waits. The Romans, less so." : "Inhale on dim, exhale on bright."}
            </p>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes bs-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.7); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
