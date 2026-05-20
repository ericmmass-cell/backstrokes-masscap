import { useState } from "react";
import { Eyebrow, MonoTag } from "@/components/editorial";

/**
 * Daily check-in. Six targeted questions, tap-only.
 *
 * Design rule: every option is observational, never moralizing. The chip text
 * is the chip — no follow-up "are you sure?" screen, no judgement copy when
 * "stomach" is picked. The Index moves on the answer; the brand stays quiet.
 *
 * Index math is intentionally simple — coherent feedback first, accurate
 * second. Replace with the clinician-derived weights when the council signs
 * off.
 */

type Answer = string;

type Question = {
  id: string;
  prompt: string;
  hint?: string;
  // Multi-select for body zones, single-select for everything else.
  multi?: boolean;
  options: Array<{
    value: Answer;
    label: string;
    /** Index delta when picked. Multi-selects sum. */
    delta: number;
  }>;
};

const QUESTIONS: Question[] = [
  {
    id: "back-zone",
    prompt: "Where is the back talking?",
    hint: "Pick everything that is speaking. We do not grade honesty. We grade patterns.",
    multi: true,
    options: [
      { value: "none", label: "Nothing worth naming", delta: +6 },
      { value: "lumbar", label: "Lower back · lumbar", delta: -3 },
      { value: "thoracic", label: "Mid-back · thoracic", delta: -1 },
      { value: "si", label: "SI joint", delta: -3 },
      { value: "hip-flexor", label: "Hip flexor", delta: -2 },
      { value: "glute", label: "Glute / piriformis", delta: -2 },
      { value: "sciatica", label: "Sciatica · referring", delta: -4 },
    ],
  },
  {
    id: "floor",
    prompt: "How does the pelvic floor feel today?",
    hint: "The floor does not lie. We mostly mistranslate.",
    options: [
      { value: "unnoticed", label: "Unnoticed", delta: +3 },
      { value: "relaxed", label: "Relaxed", delta: +4 },
      { value: "gripping", label: "Gripping", delta: -3 },
      { value: "leaky", label: "Leaky", delta: -2 },
      { value: "painful", label: "Painful", delta: -4 },
      { value: "unsure", label: "No idea, which is data", delta: 0 },
    ],
  },
  {
    id: "sex",
    prompt: "Sex in the past week?",
    hint: "Pain in the act, mostly. We do not ask why, with whom, or whether furniture was involved.",
    options: [
      { value: "good", label: "Pain-free", delta: +5 },
      { value: "ok", label: "Twinge · kept going", delta: +1 },
      { value: "stopped", label: "Pain enough to stop", delta: -4 },
      { value: "avoid", label: "Avoided it", delta: -2 },
      { value: "none", label: "Did not happen", delta: 0 },
      { value: "skip", label: "Mind your business, respectfully", delta: 0 },
    ],
  },
  {
    id: "sitting",
    prompt: "Sitting hours yesterday?",
    hint: "The chair you would not have chosen for any other reason counts twice emotionally, once mechanically.",
    options: [
      { value: "0-3", label: "0 – 3", delta: +5 },
      { value: "3-6", label: "3 – 6", delta: +2 },
      { value: "6-9", label: "6 – 9", delta: -3 },
      { value: "9+", label: "9 +", delta: -5 },
    ],
  },
  {
    id: "exercise",
    prompt: "Other load?",
    hint: "Sex counts as load. We are adults.",
    options: [
      { value: "walk", label: "Walked", delta: +2 },
      { value: "cardio", label: "Cardio", delta: +2 },
      { value: "lift", label: "Lifted", delta: +2 },
      { value: "sport", label: "Sport", delta: +1 },
      { value: "yoga", label: "Yoga / mobility", delta: +1 },
      { value: "sex", label: "Sex", delta: +1 },
      { value: "none", label: "Nothing, which is not a confession", delta: -1 },
    ],
  },
  {
    id: "sleep",
    prompt: "Sleep position?",
    hint: "Where you woke up, not where you started. Different position.",
    options: [
      { value: "side-pillow", label: "Side · pillow between knees", delta: +4 },
      { value: "back-knees", label: "Back · knees supported", delta: +3 },
      { value: "side", label: "Side · no pillow", delta: 0 },
      { value: "back", label: "Back · flat", delta: -1 },
      { value: "stomach", label: "Stomach, in open defiance of geometry", delta: -4 },
    ],
  },
  {
    id: "redflags",
    prompt: "Anything from this list, today?",
    hint: "No jokes here. If you pick anything but None, we route to a clinician before the session.",
    multi: true,
    options: [
      { value: "none-rf", label: "None", delta: 0 },
      { value: "weakness", label: "New weakness", delta: -8 },
      { value: "numbness", label: "Numbness or tingling", delta: -8 },
      { value: "fever", label: "Fever with back pain", delta: -8 },
      { value: "weight", label: "Unexplained weight loss", delta: -8 },
      { value: "bladder", label: "Loss of bladder or bowel control", delta: -8 },
      { value: "pelvic", label: "Severe pelvic pain", delta: -8 },
      { value: "surgery", label: "Recent surgery", delta: -8 },
    ],
  },
];

export type CheckInResult = {
  answers: Record<string, string[]>;
  delta: number;
  newIndex: number;
};

function computeDelta(
  answers: Record<string, string[]>,
): number {
  let total = 0;
  for (const q of QUESTIONS) {
    const picks = answers[q.id] ?? [];
    for (const value of picks) {
      const opt = q.options.find((o) => o.value === value);
      if (opt) total += opt.delta;
    }
  }
  return total;
}

/** Five-tier feedback line written in voice. Never punishes the user. */
function feedbackFor(delta: number): string {
  if (delta >= 12) return "Logged. The room agrees with you today. Do not get used to it. The disc is moody, and so is everyone who has ever been in a room with one.";
  if (delta >= 4) return "Logged. Sleep and sitting did more of the work than they were paid to. Hold the dose.";
  if (delta > -3) return "Logged. Mostly held the line. The chair is the variable, usually. The chair is almost always the variable.";
  if (delta > -10) return "Logged. The numbers are honest. Tomorrow is a flat number too. That is the protocol. We are coaches, not motivational speakers, and the wellness aisle has not paid us to pretend otherwise.";
  return "Logged. Yesterday was a long day. The protocol does not make a thing of it. Eight minutes, same as ever. Nobody is filming.";
}

export function CheckIn({
  baselineIndex,
  onSubmit,
}: {
  baselineIndex: number;
  onSubmit: (result: CheckInResult) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (q: Question, value: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      let next: string[];
      if (q.multi) {
        // If "none" picked, clear; if other picked, drop "none" first
        if (value === "none") {
          next = current.includes("none") ? [] : ["none"];
        } else {
          const without = current.filter((v) => v !== "none");
          next = current.includes(value)
            ? without.filter((v) => v !== value)
            : [...without, value];
        }
      } else {
        next = current[0] === value ? [] : [value];
      }
      return { ...prev, [q.id]: next };
    });
  };

  const submit = () => {
    const delta = computeDelta(answers);
    const newIndex = Math.max(0, Math.min(100, baselineIndex + delta));
    setSubmitted(true);
    onSubmit({ answers, delta, newIndex });
    try {
      const key = `bs.checkin.${new Date().toISOString().slice(0, 10)}`;
      localStorage.setItem(key, JSON.stringify({ answers, delta, newIndex, t: Date.now() }));
    } catch {}
    // Append to the event store. The Index engine reads this to compute
    // a real number from real check-ins instead of the seeded preview.
    try {
      // Lazy import so SSR / first paint isn't blocked.
      import("@/lib/events").then(({ track }) => {
        // Translate per-question answer codes to 0-10 axis scores the
        // index-engine expects. Defensive: if a question is unanswered,
        // we omit it and the engine substitutes a neutral 5.
        const props: Record<string, unknown> = { answers, delta, newIndex };
        const a1 = answers.q1?.[0]; // pain
        const a2 = answers.q2?.[0]; // sleep
        const a3 = answers.q3?.[0]; // floor
        const a4 = answers.q4?.[0]; // sex
        const painMap: Record<string, number> = { quiet: 1, dull: 3, noisy: 5, sharp: 8 };
        const sleepMap: Record<string, number> = { slept: 8, ok: 6, broken: 3, none: 1 };
        const floorMap: Record<string, number> = { released: 9, neutral: 5, gripped: 2 };
        const sexMap: Record<string, number> = { quiet: 8, present: 6, fearful: 3, gone: 1 };
        if (a1 && painMap[a1] !== undefined) props.pain = painMap[a1];
        if (a2 && sleepMap[a2] !== undefined) props.sleep = sleepMap[a2];
        if (a3 && floorMap[a3] !== undefined) props.floor = floorMap[a3];
        if (a4 && sexMap[a4] !== undefined) props.sex = sexMap[a4];
        // Q7 red flags become their own event so the index can react hard.
        const flags = answers.q7 ?? [];
        if (flags.length > 0 && !flags.includes("none")) {
          track("flare.flagged", { flags });
        }
        track("checkin.submitted", props);
      });
    } catch {}
  };

  const edit = () => {
    setSubmitted(false);
  };

  const delta = computeDelta(answers);
  const newIndex = Math.max(0, Math.min(100, baselineIndex + delta));
  const answered = Object.values(answers).filter((a) => a.length > 0).length;
  const canSubmit = answered >= 3;

  return (
    <article className="border border-border bg-background relative overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
      <header className="px-7 md:px-10 pt-8 pb-5 border-b border-border flex items-end justify-between gap-6 flex-wrap">
        <div>
          <Eyebrow>◆ Today, in particulars · 60 seconds</Eyebrow>
          <h2 className="font-serif-display text-3xl md:text-4xl italic mt-3 leading-tight">
            We'd rather know <span style={{ color: "var(--brand-amber)" }}>than guess.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xl italic">
            Six taps, no follow-up questions. The Index moves on what you log. We do not ask twice and we do not grade you for the stomach answer, which is in the data anyway.
          </p>
        </div>
        <div className="text-right">
          <MonoTag muted>{answered} of {QUESTIONS.length} answered</MonoTag>
          {answered > 0 && (
            <p
              className="font-serif-display text-3xl italic mt-1"
              style={{
                color: delta > 0 ? "var(--brand-amber)" : delta < 0 ? "var(--brand-blush)" : "var(--muted-foreground)",
              }}
            >
              {delta > 0 ? `+${delta}` : delta}
              <span className="text-sm text-muted-foreground italic ml-2 not-italic font-mono-label tracking-[0.18em]">
                preview
              </span>
            </p>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-px bg-border border-t border-border">
        {QUESTIONS.map((q, i) => {
          const picks = answers[q.id] ?? [];
          return (
            <div key={q.id} className="bg-background p-6 md:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
                  Q{String(i + 1).padStart(2, "0")} · {q.multi ? "Multi-select" : "Pick one"}
                </p>
                {picks.length > 0 && (
                  <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-amber)" }}>
                    ● answered
                  </p>
                )}
              </div>

              <h3 className="font-serif-display text-xl md:text-2xl mt-3 leading-tight italic">
                {q.prompt}
              </h3>
              {q.hint && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed italic">
                  {q.hint}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const active = picks.includes(o.value);
                  const isNegative = o.delta < 0;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      disabled={submitted}
                      onClick={() => toggle(q, o.value)}
                      className={`px-3.5 py-2 rounded-full font-mono-label text-[10px] tracking-[0.18em] uppercase transition disabled:opacity-70 disabled:cursor-default ${
                        active
                          ? "text-[var(--brand-ink)]"
                          : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/60"
                      }`}
                      style={
                        active
                          ? {
                              background: isNegative ? "var(--brand-blush)" : "var(--brand-amber)",
                              borderColor: isNegative ? "var(--brand-blush)" : "var(--brand-amber)",
                            }
                          : undefined
                      }
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="px-7 md:px-10 py-7 border-t border-border flex items-center justify-between gap-6 flex-wrap" style={{ background: "linear-gradient(180deg, transparent, oklch(0.13 0.012 28))" }}>
        {!submitted ? (
          <>
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground italic font-serif-display normal-case tracking-normal text-sm">
              {answered === 0
                ? "Pick the ones that apply. Skip the rest."
                : answered < 3
                  ? `${3 - answered} more before submit. After that it's optional.`
                  : "Ready when you are. The protocol begins after."}
            </p>
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[var(--brand-ink)] hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--brand-amber)", boxShadow: canSubmit ? "var(--glow-teal)" : "none" }}
            >
              ◆ Submit · Index becomes {newIndex}
            </button>
          </>
        ) : (
          <>
            <div>
              <Eyebrow accent={delta >= 0 ? "amber" : "blush"}>
                ◆ Logged · Index {baselineIndex} → {newIndex} ({delta > 0 ? `+${delta}` : delta})
              </Eyebrow>
              <p className="font-serif-display text-lg italic mt-2 leading-snug max-w-2xl">
                {feedbackFor(delta)}
              </p>
            </div>
            <button
              type="button"
              onClick={edit}
              className="font-mono-label text-[10px] tracking-[0.22em] uppercase border border-border px-5 py-3 rounded-full text-muted-foreground hover:text-foreground transition"
            >
              ◆ edit log
            </button>
          </>
        )}
      </footer>
    </article>
  );
}
