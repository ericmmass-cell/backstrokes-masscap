import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

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
    id: "what-you-want",
    label: "What you actually want, when the back is quiet",
    blurb:
      "The line nobody on the council was going to write for you. Pleasure-led, not pain-managed. The back appears nowhere in these three sentences. The back has had its turn.",
    lines: [
      "I want a slow evening with you tonight. No agenda except the one we make as we go. The clock is not in the room.",
      "I have been thinking about your hands on the back of my neck for two days. Not as a build to anything. As the thing itself. I want that first, for a while, before anything else.",
      "I want to be the person who initiates tonight. I have not been that person in a while and I miss it. Say yes, say later, say something else. I just wanted you to know.",
    ],
  },
  {
    id: "pain-location",
    label: "Where it hurts (and where it doesn't)",
    blurb:
      "Name the specific zone, then name a zone that's fine. Specificity reduces guesswork and rules out a lot of bad guesses.",
    lines: [
      "My L4-L5 has been doing the talking this week. Left side, when I shift weight. The right side is fine. If you notice me flinching it's that, not anything you're doing.",
      "The back has been speaking up on the lower-left, especially when I'm side-lying with my top knee unsupported. Pillow between the knees and we're back in business.",
      "Lumbar is the loud one today. Hips are quiet and the legs are fine. I'd like to try something that lets the lower back stay neutral and see how that lands.",
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
    id: "aftercare",
    label: "The five minutes after",
    blurb:
      "Aftercare is the cheapest single thing you can do to keep tomorrow's back from billing you for tonight. Frame it as a practice, not an apology.",
    lines: [
      "Could we do five minutes of supine breath after? Not because anything was bad. Because the next morning is materially better when the paraspinals are not allowed to cool in a shortened state.",
      "I have a small post-sex routine I want to try tonight. Two minutes of side-lying, two minutes of knees-over-pillow, then we are done. It is for the back, and it is short.",
      "Aftercare for me is decompression, not cuddling. The cuddling can happen during the decompression. The decompression has to happen.",
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
      <div className="print:hidden">
        <SiteHeader active="scripts" />
      </div>

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-border print:hidden">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            F.07 · SCRIPTS · ADULT SENTENCES, READY TO COPY
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            Say the thing <span className="italic" style={{ color: "var(--brand-amber)" }}>before the body says it for you.</span>
          </h1>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Scripts for the moment before silence becomes a whole theory. They sound like a human, not a therapist, not a hostage note, not a brand manager trying to make intimacy on-platform. The line is a starter. Change a word, change the order, make it yours. The work is saying it out loud.
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
              Specific, never coy. The line names the situation, not the partner. Use 'I notice' not 'you always.' Education and coaching, not therapy.
            </p>
          </main>
        </div>
      </section>
    </div>
  );
}
