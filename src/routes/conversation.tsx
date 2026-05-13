import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/conversation")({
  component: ConversationPage,
  head: () => ({
    meta: [
      { title: "Conversation script · F.07 · BackStroke" },
      {
        name: "description",
        content:
          "Generate a starter line in brand voice for the conversation your protocol asked you to have. Pick a topic, read it on screen, send via partner link, or print a card.",
      },
    ],
  }),
});

type Topic = {
  id: string;
  label: string;
  blurb: string;
  lines: string[];
};

const TOPICS: Topic[] = [
  {
    id: "pain-location",
    label: "Where it hurts (and where it doesn't)",
    blurb:
      "Name the specific zone, then name a zone that's fine. Specificity reduces guesswork and rules out a lot of bad guesses.",
    lines: [
      "My L4-L5 has been doing the talking this week. Left side, when I shift weight. The right side is fine. If you notice me flinching it's that, not anything you're doing.",
      "The back has been speaking up on the lower-left, especially when I'm side-lying with my top knee unsupported. Pillow between the knees and we're back in business.",
      "Lumbar is the loud one today. Hips and the floor itself are quiet. I'd like to try something that lets the lower back stay neutral and see how that lands.",
    ],
  },
  {
    id: "pace",
    label: "Pace · slower, longer pauses, less hurry",
    blurb:
      "Pace is a request, not a complaint. Frame it as what you want, not what isn't working.",
    lines: [
      "I'd like to go slower tonight. Not because anything's wrong. Because slower lets me actually feel what's happening, and I want that.",
      "Could we take longer pauses? Thirty seconds between things, not three. The body responds differently when it's not chasing the next part.",
      "I'm in the mood for unhurried. The clock doesn't need to be involved. We can stop and pick up later if we want.",
    ],
  },
  {
    id: "dilator",
    label: "Dilator use (clinical, on schedule)",
    blurb:
      "Dilator work is clinician-prescribed. The script frames it as the assignment it is, not a confession.",
    lines: [
      "I'm working on dilator progressions with my pelvic-health PT. Twice a week, paired with breath work. I want you to know what it is in case you see it on the nightstand. It's not a workaround. It's the work.",
      "The PT has me on a dilator series for the next eight weeks. The plan is to combine it with diaphragmatic breath, not force. It will probably make tonight easier, not harder.",
      "Tonight I'd like to do twenty minutes of the dilator protocol first. It's part of the rehab plan, and the rest of the evening is friendlier when I've done it.",
    ],
  },
  {
    id: "what-feels-good",
    label: "What's feeling good right now",
    blurb:
      "Start with what works, not what hurts. The clinical research is consistent on this. Naming the positive lowers defensiveness in both partners.",
    lines: [
      "When you're slow on the inside of my wrist before anything else happens, the rest of the evening lands very differently. I should have told you that a year ago.",
      "Side-by-side facing has been the best one for me this month. Both spines neutral, both faces visible, breath stays available. I'd like more of that.",
      "Mornings have been doing it for me lately. The lumbar is quieter, the breath is easier, nothing else is on the calendar yet. We can move the protocol around that if you want.",
    ],
  },
  {
    id: "what-doesnt",
    label: "What's not working, without making it a verdict",
    blurb:
      "Specific, observational, no 'always' and no 'you'. The line names the situation, not the partner.",
    lines: [
      "Quadruped with hands flat on the bed has been hurting the lumbar this week. Forearms down works. Just the position, not anything else.",
      "I notice I'm holding my breath when we're in the standing version, and that usually means the back has tightened up. Could we switch to side-lying if that comes up tonight?",
      "Deep hip flexion has been a no this month. I think it's the disc, not you. Wedge under the pelvis or knees over a pillow and it stops being an issue.",
    ],
  },
  {
    id: "what-would-feel-better",
    label: "What would feel better, said as a request",
    blurb:
      "A specific request: position, pace, pause, pressure. Specific is generous; vague is a trap.",
    lines: [
      "I'd like to try side-lying with a pillow between my knees tonight. Lower lumbar load, breath stays full, I can pay attention to you instead of monitoring my back.",
      "Could you stay where you are for the next thirty seconds? Nothing's wrong. I want to feel this part for a bit before we move.",
      "If we end up on the bed edge, can I be the one supine and you standing? It works for the lumbar and I can see your face the whole time.",
    ],
  },
];

function ConversationPage() {
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const [variant, setVariant] = useState(0);
  const [saved, setSaved] = useState(false);

  const line = topic.lines[variant % topic.lines.length];

  const save = () => {
    try {
      const list = JSON.parse(localStorage.getItem("bs.partnerLinks") ?? "[]");
      list.push({
        kind: "conversation",
        topicId: topic.id,
        topicLabel: topic.label,
        line,
        t: Date.now(),
        token: Math.random().toString(36).slice(2, 10),
      });
      localStorage.setItem("bs.partnerLinks", JSON.stringify(list));
      setSaved(true);
      setTimeout(() => setSaved(false), 2400);
    } catch {}
  };

  const print = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/60 print:hidden">
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

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-border print:hidden">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            F.07 · CONVERSATION SCRIPT · AASECT-SUPERVISED
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            Pick a thing. <span className="italic" style={{ color: "var(--brand-amber)" }}>We'll start the sentence.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Written like a smart friend who has done this before. Not clinical. Not coy. Not euphemistic. The line is a starter. Change a word, change the order, make it yours. The work is saying it out loud, which is the part the kegel app could not help you with.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 print:py-0">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-10 print:block">
          {/* Topic picker */}
          <aside className="lg:col-span-4 print:hidden">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
              Topics
            </p>
            <ul className="space-y-2">
              {TOPICS.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setTopic(t);
                      setVariant(0);
                    }}
                    className={`w-full text-left p-4 rounded-md border transition ${
                      t.id === topic.id
                        ? "border-[var(--brand-amber)] bg-card/60"
                        : "border-border hover:bg-card/40"
                    }`}
                  >
                    <p className="font-serif-display text-base leading-snug">{t.label}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.blurb}</p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Output */}
          <main className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card/30 p-8 md:p-12 print:border-0 print:bg-transparent">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
                {topic.label}
              </p>
              <p className="font-serif-display text-3xl md:text-4xl mt-6 leading-snug italic">
                &ldquo;{line}&rdquo;
              </p>
              <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mt-8">
                Variant {(variant % topic.lines.length) + 1} of {topic.lines.length}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
              <button
                type="button"
                onClick={() => setVariant((v) => v + 1)}
                className="px-5 py-3 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase border border-border hover:bg-card/40 transition"
              >
                ↻ Try another line
              </button>
              <button
                type="button"
                onClick={save}
                className="px-5 py-3 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase bg-foreground text-background hover:opacity-90 transition"
              >
                {saved ? "✓ Saved to partner queue" : "Save to partner queue"}
              </button>
              <button
                type="button"
                onClick={print}
                className="px-5 py-3 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase border border-border hover:bg-card/40 transition"
              >
                Print a nightstand card
              </button>
            </div>

            <p className="mt-8 text-xs text-muted-foreground italic leading-relaxed print:hidden">
              Voice supervised by the AASECT-certified clinician on the council. Specific, never coy. The line names the situation, not the partner. Use 'I notice' not 'you always.'
            </p>
          </main>
        </div>
      </section>
    </div>
  );
}
