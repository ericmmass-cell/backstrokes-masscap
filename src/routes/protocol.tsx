import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/protocol")({
  component: Protocol,
  head: () => ({
    meta: [
      { title: "Run the 7-minute baseline · BackStroke" },
      {
        name: "description",
        content:
          "The 7-minute BackStroke baseline. Pain-zone tap, range-of-motion, sitting hours, pelvic-floor self-screen. Your starting line, no candle required.",
      },
    ],
  }),
});

type Step = {
  key: string;
  eyebrow: string;
  prompt: string;
  blurb: string;
  field: "pain-zone" | "rom" | "sitting" | "floor-screen" | "cohort" | "review";
};

const STEPS: Step[] = [
  {
    key: "pain-zone",
    eyebrow: "01 · WHERE IT LIVES",
    prompt: "Tap the zone that's been doing the talking.",
    blurb:
      "Pick one. We'll route the rest of the baseline around it. You can change it later — bodies update.",
    field: "pain-zone",
  },
  {
    key: "rom",
    eyebrow: "02 · WHAT MOVES",
    prompt: "Log your range of motion in three positions.",
    blurb:
      "Forward fold · seated rotation · single-leg balance. Eyeball it. We're not grading geometry — we're picking a starting dose.",
    field: "rom",
  },
  {
    key: "sitting",
    eyebrow: "03 · HOW LONG YOU SAT",
    prompt: "Average sitting hours per weekday.",
    blurb:
      "Closest of: 0–3, 3–6, 6–9, 9+. Eight hours of bad geometry overrides eight minutes of good geometry. Bedding and chairs are dosage.",
    field: "sitting",
  },
  {
    key: "floor-screen",
    eyebrow: "04 · THE FLOOR SCREEN",
    prompt: "Self-screen the pelvic floor.",
    blurb:
      "Four yes/no questions about urgency, leakage, pain with intimacy, and post-event spasm. We use this to decide whether to down-train, up-train, or route you to a clinician.",
    field: "floor-screen",
  },
  {
    key: "cohort",
    eyebrow: "05 · WHICH COHORT",
    prompt: "Anything in here apply?",
    blurb:
      "Postpartum (within 18 months) · post-prostatectomy · chronic pelvic pain · history of disc surgery. Triggers the right contraindication screen.",
    field: "cohort",
  },
  {
    key: "review",
    eyebrow: "06 · YOUR PROTOCOL",
    prompt: "Here's what week 1 looks like for your body.",
    blurb:
      "Three sessions. Eight minutes each. Sleep audit tonight. One conversation script, AASECT-written, for the weekend.",
    field: "review",
  },
];

function track(event: string, props?: Record<string, unknown>) {
  // Minimal local-first analytics. Replace with PostHog / Segment / Plausible when wired.
  try {
    const log = JSON.parse(localStorage.getItem("bs.events") ?? "[]");
    log.push({ event, props, t: Date.now() });
    localStorage.setItem("bs.events", JSON.stringify(log.slice(-200)));
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible(event, { props });
    }
  } catch {}
}

function Protocol() {
  const [idx, setIdx] = useState(0);
  const total = STEPS.length;
  const step = STEPS[idx];
  const isLast = idx === total - 1;

  useEffect(() => {
    track("protocol.step.view", { step: step.key, index: idx });
    const onUnload = () => {
      if (!isLast) track("protocol.dropoff", { step: step.key, index: idx });
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [idx, isLast, step.key]);

  const next = () => {
    track("protocol.step.complete", { step: step.key, index: idx });
    if (!isLast) setIdx((i) => i + 1);
    else track("protocol.complete");
  };

  const back = () => {
    if (idx > 0) setIdx((i) => i - 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="11" cy="11" r="3" fill="currentColor" />
            </svg>
            <span className="font-serif-display text-xl tracking-tight italic">
              Back<span style={{ color: "var(--brand-amber)" }}>Stroke</span>
            </span>
          </Link>
          <Link to="/" className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition">
            ← back to home
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
              {step.eyebrow}
            </p>
            <p className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              {idx + 1} of {total}
            </p>
          </div>

          <div className="mt-3 h-1 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{ width: `${((idx + 1) / total) * 100}%`, background: "var(--brand-amber)" }}
            />
          </div>

          <h1 className="font-serif-display text-4xl md:text-6xl mt-10 leading-[0.98] tracking-[-0.02em]">
            {step.prompt}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{step.blurb}</p>

          <div className="mt-10 rounded-2xl border border-border bg-background/60 p-8">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Field · {step.field}
            </p>
            <p className="font-serif-display text-2xl italic mt-3 leading-snug text-muted-foreground">
              Interactive control coming in the next pass.
            </p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              This page scaffolds the 7-minute baseline. The pain-zone tap-target, the range-of-motion logging, the sitting-hours selector, and the pelvic-floor self-screen will land next, each as its own component, each with its own contraindication branch.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={idx === 0}
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← back
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition"
            >
              {isLast ? "Finish baseline" : "Next →"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
