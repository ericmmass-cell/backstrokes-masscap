import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { ChevronRight, Clock, Activity, FileText } from "lucide-react";

export type MoveDetail = {
  key: string;
  ref?: string;        // B.01 / F.01
  label: string;       // headline
  blurb?: string;      // one-liner shown in chip
  sets?: string;
  duration?: string;
  steps: string[];
  cues?: string[];
  why?: string;
  evidence?: string;
};

type Accent = "amber" | "blush";

const accentVar = (a: Accent) => (a === "blush" ? "var(--brand-blush)" : "var(--brand-amber)");

/* ----------- DATA ----------- */

export const BACK_MOVES: MoveDetail[] = [
  {
    key: "mcgill",
    ref: "B.01",
    label: "McGill big-3",
    blurb: "Curl-up, side plank, bird dog. 8 min. Out-quiets discs.",
    sets: "Circuit × 3",
    duration: "8 min",
    steps: [
      "Curl-up: hands under lumbar, one knee bent. Lift head and shoulders 20° only. Hold 8 sec. 4 reps each side.",
      "Side plank: forearm down, knees bent for week 1, full plank week 2. Hold 8 sec. 4 reps each side.",
      "Bird dog: opposite arm + leg, draw a square in the air with the heel before returning. 4 reps each side.",
    ],
    cues: ["Brace abs like you're about to be poked.", "Exhale on every hold.", "No lumbar flexion. Ever."],
    why: "Endurance, not range. Stuart McGill's lab showed disc patients respond to isometric endurance, not stretching. Stretching feels good, doesn't quiet symptoms.",
    evidence: "McGill SM. Low Back Disorders, 3rd ed. (2015). Endurance > flexibility for disc-related LBP.",
  },
  {
    key: "hinge",
    ref: "B.02",
    label: "Hip-hinge re-pattern",
    blurb: "Pick up laundry without folding into a question mark.",
    sets: "3 × 10",
    duration: "4 min",
    steps: [
      "Stand with dowel along spine: head, mid-back, sacrum touching.",
      "Push hips back, knees soft, dowel stays glued. Stop when torso is 45°.",
      "Drive heels through floor to stand. 10 reps. 3 sets.",
    ],
    cues: ["Hinge from hips, not waist.", "Shins stay nearly vertical.", "If dowel lifts off lumbar, you flexed. Reset."],
    why: "Most 'I tweaked my back' incidents are spinal flexion under load. Re-patterning the hinge transfers that load to the hips, where the load belongs.",
    evidence: "Contreras B, et al. Hip extension biomechanics in lifting (2020).",
  },
  {
    key: "glute",
    ref: "B.03",
    label: "Glute bridge + 90/90",
    blurb: "Reactivate the muscles on paid leave since the desk job.",
    sets: "3 × 6",
    duration: "6 min",
    steps: [
      "Glute bridge: feet flat, knees over ankles. Drive through heels. Squeeze glutes at top. Hold 3 sec. 10 reps.",
      "90/90 hip switch: seated, knees at 90°, rotate both legs to one side, then the other. 6 each side.",
    ],
    cues: ["Ribs down, glutes do the lift.", "Don't extend through the lumbar."],
    why: "Glutes off, lumbar on. Restoring hip extension and internal rotation takes the spine off the hook.",
  },
  {
    key: "deadhang",
    ref: "B.04",
    label: "Dead-hang + thoracic opener",
    blurb: "2 min. Decompresses what Zoom spent the day compressing.",
    sets: "30 sec × 2",
    duration: "2 min",
    steps: [
      "Bar at full extension. Hang passive 30 sec. Repeat once.",
      "Foam roller across mid-back. Arms overhead. Breathe 5 cycles.",
    ],
    cues: ["Don't kip, don't shrug.", "If shoulders aren't ready, use a band-assisted hang."],
    why: "Axial decompression and thoracic extension restore what 8 hours of forward-load took.",
  },
  {
    key: "sleep",
    ref: "B.05",
    label: "Sleep position audit",
    blurb: "Pillow under the knees. Tomorrow's lumbar writes a thank-you.",
    duration: "Tonight",
    steps: [
      "Side sleeper: pillow between knees, top knee not crossing midline.",
      "Back sleeper: pillow under knees, second pillow under arch of low back if floating.",
      "Stomach sleeper: rotate. Today.",
    ],
    cues: ["Pillow height = shoulder width when on the side."],
    why: "8 hours of bad geometry overrides 8 minutes of good geometry. Bedding is dosage.",
  },
  {
    key: "sit",
    ref: "B.06",
    label: "Sitting protocol",
    blurb: "When to stand, what to perch on. Boring. Decisive. Free.",
    duration: "All day",
    steps: [
      "30/3 rule: every 30 min, stand 3 min. Set a timer.",
      "Lumbar support: rolled towel or wedge. Pelvis tilted slightly forward.",
      "Long drive: stop every 90 min, walk 5 min, do 1 hip-hinge set.",
    ],
    cues: ["Best chair = the next chair.", "Standing desk only helps if you actually move."],
    why: "Static loading kills tissue. Position changes are the protocol.",
  },
];

export const BEDROOM_MOVES: MoveDetail[] = [
  {
    key: "reverse-kegel",
    ref: "F.01",
    label: "Reverse kegel + diaphragm drop",
    blurb: "Down-train the floor. The step the $9.99 app skipped.",
    sets: "4 × 10 breaths",
    duration: "7 min",
    steps: [
      "Lie on back, knees bent. One hand on belly, one on chest.",
      "Inhale 4 sec, let belly rise and pelvic floor drop, like initiating urination then stopping.",
      "Exhale 6 sec, passive return. Do not contract.",
      "10 breaths. Rest 30 sec. Repeat × 4.",
    ],
    cues: ["The drop is what you're training, not the lift.", "If you feel the contraction, you're doing a kegel."],
    why: "Most pelvic floors are over-tonic, not weak. Kegels on a chronically gripping floor reinforce the dysfunction. Down-train first, always.",
    evidence: "Padoa A, et al. The overactive pelvic floor: a clinical update (2021).",
  },
  {
    key: "kegel",
    ref: "F.02",
    label: "Kegel, done correctly",
    blurb: "Eccentric load. For ejaculatory control and orgasmic depth.",
    sets: "3 × 10",
    duration: "5 min",
    steps: [
      "Concentric: contract pelvic floor (lift sit-bones together) 3 sec.",
      "Hold 3 sec.",
      "Eccentric: release over 5 sec. The slow release is the rep.",
      "10 reps. 3 sets.",
    ],
    cues: ["Don't recruit glutes or abs.", "If you can't slow the release, you're not in control yet."],
    why: "Counting reps is what the apps got wrong. Eccentric control is what produces ejaculatory timing in men and orgasmic depth in women.",
  },
  {
    key: "release",
    ref: "F.03",
    label: "Perineal + internal release",
    blurb: "PT-led trigger work. Dyspareunia, vaginismus, post-partum, post-prostatectomy.",
    sets: "PT-prescribed",
    duration: "Variable",
    steps: [
      "External: gentle perineal pressure, 60 sec per trigger point.",
      "Internal: only with a credentialed pelvic-health PT, dilator set when indicated.",
      "Track pain, frequency, response. Slow ramp.",
    ],
    cues: ["No bravado. Less is more.", "Stop before guarding starts."],
    why: "Trigger points refer pain. Releasing them restores tissue mobility and reduces pain with penetration. Done with a PT, not a YouTube tutorial.",
    evidence: "FitzGerald MP, et al. Pelvic floor physical therapy for women with chronic pelvic pain (2009).",
  },
  {
    key: "positions",
    ref: "F.04",
    label: "Position library, scored by spine",
    blurb: "40 positions ranked by lumbar load and breath access.",
    duration: "Tonight",
    steps: [
      "Filter by current pain level.",
      "Each position scored: lumbar load, hip flexion required, breath access.",
      "Pick one your back can sign off on. Save two for later.",
    ],
    cues: ["If breath stops, position is too loaded.", "Pillows are equipment, not weakness."],
    why: "Pain avoidance kills sex more than pain itself. A position that lets you breathe is a position you'll repeat.",
  },
  {
    key: "tools",
    ref: "F.05",
    label: "Lube + tool literacy",
    blurb: "Silicone vs water. Dilators, wedges, rings. What clinicians actually hand you.",
    steps: [
      "Lube: silicone for longevity, water for toy compatibility, hybrid for most cases.",
      "Dilators: graded set, used with diaphragmatic breath, not force.",
      "Wedges: 7-10° pelvic tilt eliminates 30-40% lumbar load.",
      "Rings: vascular tool, not a virility token. Removed within 30 min.",
    ],
    cues: ["Skip anything fragranced.", "Read the ingredient list. Glycerin out, parabens out."],
    why: "Tools are leverage. Used badly they injure. Used correctly they make protocols accessible to bodies that wouldn't otherwise tolerate them.",
  },
  {
    key: "arousal",
    ref: "F.06",
    label: "Arousal as parasympathetic skill",
    blurb: "4-7-8 before, not after. Apparently this was teachable.",
    sets: "4 cycles",
    duration: "3 min",
    steps: [
      "Inhale through nose 4 sec.",
      "Hold 7 sec.",
      "Exhale through mouth 8 sec.",
      "4 cycles, 20 min before sex.",
    ],
    cues: ["If you can't hold 7, scale to 4-4-4 and build up."],
    why: "Arousal is parasympathetic. The nervous system can't be sympathetic and aroused at once. Breath cadence is the switch.",
  },
  {
    key: "script",
    ref: "F.07",
    label: "The conversation script",
    blurb: "What to say about pain, pace, what you want. Written by AASECT.",
    duration: "10 min",
    steps: [
      "Start with what works, not what hurts.",
      "Specific request: 'slower', 'shallower', 'pause for 30 sec'.",
      "End with a check-in. Not over text. Not in the morning.",
    ],
    cues: ["Use 'I notice', not 'you always'.", "Practice once before you need it."],
    why: "Pain unspoken becomes avoidance. Written by AASECT-certified therapists, performed in your kitchen, not a clinic.",
  },
];

export const BACK_STATS: MoveDetail[] = [
  {
    key: "stat-3moves",
    label: "3",
    blurb: "moves",
    duration: "Per session",
    steps: [
      "Curl-up · trains anterior-chain endurance without spinal flexion.",
      "Side plank · loads quadratus lumborum and obliques isometrically.",
      "Bird dog · trains contra-lateral co-contraction across the lumbar.",
    ],
    why: "Three moves cover all three planes of spinal stability. Anything more is decoration, anything less leaves a gap.",
  },
  {
    key: "stat-8min",
    label: "8 min",
    blurb: "daily",
    duration: "8 min",
    steps: [
      "2 min curl-up (4 reps × 8 sec hold each side)",
      "3 min side plank (4 reps × 8 sec hold each side)",
      "3 min bird dog (4 reps × 8 sec hold each side)",
    ],
    why: "Eight minutes is the dose at which adherence holds and the lumbar adapts. Twenty minutes is the dose at which you stop after week 2.",
  },
  {
    key: "stat-wk2",
    label: "wk 2",
    blurb: "first drop",
    duration: "14 days",
    steps: [
      "Day 1-3: nervous-system down-regulation, no measurable change.",
      "Day 4-8: pain frequency drops, intensity unchanged.",
      "Day 9-14: intensity drops, pain-free intervals double.",
    ],
    why: "Endurance training takes 10-14 days to express. The studies showing 'no effect' at week 1 measured the wrong week.",
    evidence: "McGill SM. Ultimate Back Fitness, 6th ed. Adaptation timeline.",
  },
];

export const BEDROOM_STATS: MoveDetail[] = [
  {
    key: "stat-down",
    label: "1.",
    blurb: "down-train",
    duration: "Week 1-2",
    steps: [
      "Reverse kegel: lengthen, don't contract.",
      "Diaphragm drop: belly-breath, ribs wide.",
      "4 × 10 breaths daily, 7 min total.",
    ],
    why: "An over-tonic floor cannot be trained for strength. Down-train first. Weeks 1-2 are spent unlearning what previous apps drilled in.",
  },
  {
    key: "stat-up",
    label: "2.",
    blurb: "up-train",
    duration: "Week 3-4",
    steps: [
      "Concentric kegel 3 sec.",
      "Eccentric release 5 sec, the slow part is the rep.",
      "3 × 10, twice a day.",
    ],
    why: "Once the floor releases on command, contraction can be trained. Eccentric control is the metric, not rep count.",
  },
  {
    key: "stat-load",
    label: "3.",
    blurb: "load",
    duration: "Week 5+",
    steps: [
      "Add eccentric load: weighted kegel cones (women), resistance trainers (men).",
      "Integrate with breath. Inhale = release. Exhale = control.",
      "Progress every 10 days.",
    ],
    why: "Progressive overload applies to the pelvic floor like every other muscle. Most apps stop at step one and call it a feature.",
  },
];

/* ----------- COMPONENTS ----------- */

export function MoveList({
  items,
  accent,
}: {
  items: MoveDetail[];
  accent: Accent;
}) {
  const [active, setActive] = useState<MoveDetail | null>(null);
  const accentColor = accentVar(accent);

  return (
    <>
      <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
        {items.map((m) => (
          <li key={m.key} className="border-t border-border/60">
            <button
              type="button"
              onClick={() => setActive(m)}
              className="group w-full flex gap-3 py-3 text-left cursor-pointer transition-colors hover:bg-card/40 -mx-2 px-2 rounded-sm"
              aria-label={`Open instructions for ${m.label}`}
            >
              <span className="font-mono-label text-[9px] pt-1 shrink-0" style={{ color: accentColor }}>
                {m.ref}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif-display text-base leading-tight" style={{ color: accent === "blush" ? accentColor : undefined }}>
                  {m.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.blurb}</p>
              </div>
              <ChevronRight
                className="w-4 h-4 mt-1 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition shrink-0"
                style={{ color: accentColor }}
              />
            </button>
          </li>
        ))}
      </ol>
      <DetailDialog move={active} accent={accent} onClose={() => setActive(null)} />
    </>
  );
}

export function StatStrip({
  items,
  accent,
}: {
  items: MoveDetail[];
  accent: Accent;
}) {
  const [active, setActive] = useState<MoveDetail | null>(null);
  const accentColor = accentVar(accent);

  return (
    <>
      <ul className="mt-6 grid grid-cols-3 gap-px bg-border border border-border">
        {items.map((s) => (
          <li key={s.key} className="bg-background">
            <button
              type="button"
              onClick={() => setActive(s)}
              className="group w-full px-3 py-3 text-left cursor-pointer hover:bg-card/60 transition relative"
              aria-label={`Expand ${s.label} ${s.blurb}`}
            >
              <p className="font-serif-display text-lg" style={{ color: accentColor }}>
                {s.label}
              </p>
              <p className="font-mono-label text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">
                {s.blurb}
              </p>
              <ChevronRight
                className="absolute top-2 right-2 w-3 h-3 opacity-30 group-hover:opacity-100 transition"
                style={{ color: accentColor }}
              />
            </button>
          </li>
        ))}
      </ul>
      <DetailDialog move={active} accent={accent} onClose={() => setActive(null)} />
    </>
  );
}

function DetailDialog({
  move,
  accent,
  onClose,
}: {
  move: MoveDetail | null;
  accent: Accent;
  onClose: () => void;
}) {
  const accentColor = accentVar(accent);

  return (
    <Dialog open={!!move} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[88vh] overflow-y-auto bg-card border-border p-0"
        style={{ boxShadow: "var(--shadow-lift)" }}
      >
        {move && (
          <>
            <DialogHeader className="px-7 pt-7 pb-5 border-b border-border" style={{ background: "linear-gradient(180deg, var(--card), transparent)" }}>
              <div className="flex items-baseline gap-3 mb-2">
                {move.ref && (
                  <span className="font-mono-label text-[9px] tracking-[0.2em]" style={{ color: accentColor }}>
                    {move.ref}
                  </span>
                )}
                <span className="font-mono-label text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                  Step-by-step
                </span>
              </div>
              <DialogTitle className="font-serif-display text-3xl italic leading-tight" style={{ color: accent === "blush" ? accentColor : "var(--foreground)" }}>
                {move.label}
              </DialogTitle>
              {move.blurb && (
                <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {move.blurb}
                </DialogDescription>
              )}
              {(move.sets || move.duration) && (
                <div className="flex items-center gap-4 mt-4">
                  {move.sets && (
                    <span className="inline-flex items-center gap-1.5 font-mono-label text-[10px] text-muted-foreground">
                      <Activity className="w-3 h-3" style={{ color: accentColor }} />
                      {move.sets}
                    </span>
                  )}
                  {move.duration && (
                    <span className="inline-flex items-center gap-1.5 font-mono-label text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" style={{ color: accentColor }} />
                      {move.duration}
                    </span>
                  )}
                </div>
              )}
            </DialogHeader>

            <div className="px-7 py-6 space-y-6">
              <section>
                <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase mb-3" style={{ color: accentColor }}>
                  Steps
                </p>
                <ol className="space-y-3">
                  {move.steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="font-mono-label text-[10px] shrink-0 w-5 h-5 rounded-full border flex items-center justify-center"
                        style={{ borderColor: accentColor, color: accentColor }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/90">{s}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {move.cues && move.cues.length > 0 && (
                <section className="border-t border-border pt-5">
                  <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                    Coaching cues
                  </p>
                  <ul className="space-y-2">
                    {move.cues.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground italic leading-relaxed">
                        <span style={{ color: accentColor }} className="mr-2">·</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {move.why && (
                <section className="border-t border-border pt-5">
                  <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                    Why it works
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{move.why}</p>
                </section>
              )}

              {move.evidence && (
                <section className="border-t border-border pt-5 flex gap-3">
                  <FileText className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
                  <p className="text-[11px] text-muted-foreground italic leading-relaxed">{move.evidence}</p>
                </section>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
