import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * /diagnosis · the free, account-free, screenshot-built front door.
 *
 * Six deadpan questions produce a mock-clinical "diagnosis" card, generated
 * deterministically in the browser (no account, no server, no AI). The card is
 * built to be screenshotted and watermarked, and routes the curious into /rank
 * and then /buy. The growth thesis: a banned-ad-rail category can only be sold
 * by the one thing that travels for free, which is a funny picture of yourself.
 *
 * Voice: punches up at office-chair modernity and the wellness aisle, never at
 * the person taking it. The diagnosis is a joke; the recommendation is real.
 * It diagnoses nothing clinical and says so.
 */

export const Route = createFileRoute("/diagnosis")({
  component: Diagnosis,
  head: () => ({
    meta: [
      { title: "Diagnose your back (mock-clinically) · BackStroke" },
      {
        name: "description",
        content:
          "Six questions. One deadpan, mock-clinical diagnosis of what your chair has been doing to your back. Free, no login. Not a real diagnosis; we are legally and morally clear about that.",
      },
    ],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_2 = "oklch(0.92 0.022 76)";
const INK = "oklch(0.18 0.01 40)";
const MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OX = "var(--brand-oxblood)";

/* ── the questionnaire ──────────────────────────────────────────────────── */

type Q = {
  key: string;
  prompt: string;
  help: string;
  options: { value: string; label: string; tag: string }[];
};

const QUESTIONS: Q[] = [
  {
    key: "hours",
    prompt: "Hours a day in a chair?",
    help: "Be honest. The chair already knows.",
    options: [
      { value: "low", label: "Under four. I move for a living.", tag: "mobile" },
      { value: "mid", label: "Four to eight. A normal job.", tag: "desk" },
      { value: "high", label: "Eight to twelve. A serious job.", tag: "deskheavy" },
      { value: "transcended", label: "I have a standing desk I stand at twice", tag: "aspirational" },
    ],
  },
  {
    key: "chair",
    prompt: "Describe the chair.",
    help: "The one doing the most damage, not the nice one in the photo.",
    options: [
      { value: "ergo", label: "Ergonomic, adjusted, smug", tag: "ergo" },
      { value: "office", label: "Office default, picked in 2019 by nobody", tag: "office" },
      { value: "kitchen", label: "A kitchen chair, structurally", tag: "kitchen" },
      { value: "couch", label: "The couch. I work from the couch.", tag: "couch" },
    ],
  },
  {
    key: "flare",
    prompt: "How often does the back file a complaint?",
    help: "A flare, a twinge, a morning where you negotiate with your socks.",
    options: [
      { value: "rare", label: "Rarely. I am here out of curiosity.", tag: "rare" },
      { value: "monthly", label: "Monthly-ish. A recurring guest.", tag: "monthly" },
      { value: "weekly", label: "Weekly. We are acquainted.", tag: "weekly" },
      { value: "lifestyle", label: "It is less an event than a lifestyle", tag: "chronic" },
    ],
  },
  {
    key: "tried",
    prompt: "What have you already tried?",
    help: "No judgment. Some judgment.",
    options: [
      { value: "youtube", label: "Stretching videos from a man named Brad", tag: "youtube" },
      { value: "gadget", label: "A gadget that now lives in a drawer", tag: "gadget" },
      { value: "supplement", label: "A supplement the internet swore by", tag: "supplement" },
      { value: "denial", label: "Nothing. Denial is free.", tag: "denial" },
    ],
  },
  {
    key: "role",
    prompt: "In bed, you are usually the one…",
    help: "The only question that matters for the ranker. No wrong answer.",
    options: [
      { value: "receiver", label: "Underneath, or being entered", tag: "receiver" },
      { value: "giver", label: "On top, or doing the driving", tag: "giver" },
      { value: "switch", label: "Depends on the night", tag: "switch" },
      { value: "private", label: "That is between me and my lumbar", tag: "private" },
    ],
  },
  {
    key: "interrupt",
    prompt: "What does the back interrupt most?",
    help: "The honest one.",
    options: [
      { value: "sleep", label: "Sleep", tag: "sleep" },
      { value: "sitting", label: "Sitting through anything", tag: "sit" },
      { value: "sex", label: "Sex, specifically", tag: "sex" },
      { value: "yes", label: "Yes", tag: "all" },
    ],
  },
];

/* ── the deterministic generator ────────────────────────────────────────── */

type Dx = {
  condition: string;
  prognosis: string;
  recommended: string;
  differential: string;
  bridge: string;
};

/** Stable per-string hash so the same answers always yield the same card. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  return h;
}
const pick = <T,>(bank: T[], seed: number) => bank[seed % bank.length];

function diagnose(ans: Record<string, string>): Dx {
  const tag = (k: string) => {
    const q = QUESTIONS.find((x) => x.key === k);
    return q?.options.find((o) => o.value === ans[k])?.tag ?? "";
  };
  const seed = hash(QUESTIONS.map((q) => ans[q.key] ?? "_").join("|"));

  const CORE: Record<string, string> = {
    ergo: "Smug-Chair Paradox",
    office: "Acute Ikea-Chair Lordosis",
    kitchen: "Kitchen-Chair Civilian Spine",
    couch: "Couch-Structural Collapse",
  };
  const ACUITY: Record<string, string> = {
    rare: "Early-Stage",
    monthly: "Intermittent",
    weekly: "Established",
    chronic: "Stage IV (Lifestyle)",
  };
  const SECONDARY: Record<string, string> = {
    youtube: "secondary Brad Dependency",
    gadget: "secondary Drawer-Gadget Syndrome",
    supplement: "secondary Ashwagandha Faith",
    denial: "secondary Avoidance",
  };

  const core = CORE[tag("chair")] ?? "Generalised Desk-Adjacent Disc Grief";
  const acuity = ACUITY[tag("flare")] ?? "Early-Stage";
  const secondary = SECONDARY[tag("tried")] ?? "secondary Optimism";
  const condition = `${acuity} ${core}, with ${secondary}`;

  const prognosis = pick(
    [
      "Excellent, annoyingly. The disc cannot heal, but it adapts, and adaptation is on the table.",
      "Better than you fear, worse than you'll admit. Treatable on a calendar, not a deadline.",
      "Genuinely good. The structure is fine. The hours you spend folded into furniture are the problem.",
    ],
    seed,
  );

  const recommended = pick(
    [
      "Eight minutes, three moves, and the radical step of believing your own spine over a fascia influencer.",
      "Endurance, not stretching. Stand up every thirty minutes. Stop asking a $66 jade egg to do a chair's job.",
      "Three boring exercises that work, and the chair conversation you have been avoiding since 2019.",
    ],
    seed >> 2,
  );

  const DIFF: Record<string, string> = {
    youtube: "Ruled out: a personality. Ruled in: a man named Brad and a yoga mat you have rolled out twice.",
    gadget: "Imaging reveals one (1) massage gun, fully charged, never used, achieving sentience in a drawer.",
    supplement: "Bloodwork shows therapeutic levels of hope and a supplement with the clinical profile of a gummy bear.",
    denial: "Patient presents with no prior treatment and a confident theory that it will sort itself out. It will not.",
    "": "Differential inconclusive. Patient is suspiciously well-adjusted about all of this.",
  };
  const differential = DIFF[tag("tried")] ?? DIFF[""];

  const role = tag("role");
  const bridge =
    role === "private"
      ? "Your back and your bedroom share one nervous system whether you discuss it with us or not. The ranker is two questions and zero judgment away."
      : role === "switch"
        ? "Whichever role the night takes, the ranker scores both backs. It is two questions away."
        : role === "giver"
          ? "As the one doing the driving, the load is mostly yours. The ranker tells you which positions agree to that. Two questions."
          : "As the one underneath, you have more good options than anyone admits. The ranker finds them in two questions.";

  return { condition, prognosis, recommended, differential, bridge };
}

/* ── share payload in the hash (no server, opens anywhere) ──────────────── */

function encodeAnswers(ans: Record<string, string>): string {
  const compact = QUESTIONS.map((q) => ans[q.key] ?? "").join(",");
  return btoa(unescape(encodeURIComponent(compact)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function decodeAnswers(hashStr: string): Record<string, string> | null {
  try {
    const b64 = hashStr.replace(/-/g, "+").replace(/_/g, "/");
    const compact = decodeURIComponent(escape(atob(b64)));
    const parts = compact.split(",");
    if (parts.length !== QUESTIONS.length) return null;
    const ans: Record<string, string> = {};
    QUESTIONS.forEach((q, i) => {
      if (parts[i]) ans[q.key] = parts[i];
    });
    return Object.keys(ans).length === QUESTIONS.length ? ans : null;
  } catch {
    return null;
  }
}

/* ── component ──────────────────────────────────────────────────────────── */

function Diagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // A shared link (/diagnosis#payload) reconstructs the exact card.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash.slice(1);
    if (!h) return;
    const decoded = decodeAnswers(h);
    if (decoded) {
      setAnswers(decoded);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    if (!done) return;
    import("@/lib/events").then(({ track }) => track("diagnosis.completed", { answers })).catch(() => {});
  }, [done, answers]);

  const choose = (qKey: string, value: string) => {
    const next = { ...answers, [qKey]: value };
    setAnswers(next);
    // Completion is derived from the answers, not the step counter, so rapid
    // taps can never advance past the last question into an undefined slot.
    const answeredAll = QUESTIONS.every((qq) => next[qq.key]);
    window.setTimeout(() => {
      if (answeredAll) setDone(true);
      else setStep((s) => Math.min(s + 1, QUESTIONS.length - 1));
    }, 240);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const shareLink = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/diagnosis#${encodeAnswers(answers)}`;
  };
  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  const dx = done ? diagnose(answers) : null;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

  return (
    <main style={{ background: PAPER, color: INK }} className="min-h-screen">
      <SiteHeader />

      <article className="max-w-[760px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-24">
        {!done && (
          <>
            <p className="font-mono-label text-[10px] tracking-[0.28em] uppercase" style={{ color: OX }}>
              Free · No login · Not a real diagnosis · Question {step + 1} of {QUESTIONS.length}
            </p>
            <h1
              className="font-serif-display italic tracking-[-0.025em] leading-[0.98] mt-5"
              style={{ fontSize: "clamp(34px, 5.2vw, 64px)" }}
            >
              {q.prompt}
            </h1>
            <p className="font-serif-display mt-4 italic" style={{ fontSize: 18, color: MUTED }}>
              {q.help}
            </p>

            <div className="mt-9 grid sm:grid-cols-2 gap-3">
              {q.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => choose(q.key, o.value)}
                  className="text-left rounded-2xl border px-5 py-4 transition hover:opacity-90"
                  style={{
                    borderColor: answers[q.key] === o.value ? OX : RULE,
                    background: answers[q.key] === o.value ? "oklch(0.96 0.04 28 / 0.5)" : "#FBF7EC",
                  }}
                >
                  <span className="font-serif-display" style={{ fontSize: 18 }}>{o.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-5 font-mono-label text-[11px] tracking-[0.18em] uppercase">
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="hover:opacity-70 transition" style={{ color: MUTED }}>
                  ← back
                </button>
              )}
              <Link to="/rank" search={{ t: undefined, r: undefined }} className="hover:opacity-70 transition" style={{ color: MUTED }}>
                skip to the ranker →
              </Link>
            </div>
          </>
        )}

        {done && dx && (
          <>
            {/* The card. Built to be screenshotted. */}
            <section
              className="rounded-3xl border overflow-hidden"
              style={{ borderColor: OX, background: "#FBF7EC", boxShadow: "0 30px 70px -40px rgba(60,30,20,0.5)" }}
            >
              <div className="px-7 md:px-10 py-8 md:py-10">
                <p className="font-mono-label text-[10px] tracking-[0.3em] uppercase" style={{ color: OX }}>
                  ◆ BackStroke · Mock-Clinical Diagnosis
                </p>
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mt-5" style={{ color: MUTED }}>
                  Condition
                </p>
                <h1
                  className="font-serif-display italic tracking-[-0.02em] leading-[1.02] mt-2"
                  style={{ fontSize: "clamp(28px, 4.4vw, 50px)" }}
                >
                  {dx.condition}
                </h1>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-8">
                  <div>
                    <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OX }}>Prognosis</p>
                    <p className="font-serif-display mt-2 leading-snug" style={{ fontSize: 18 }}>{dx.prognosis}</p>
                  </div>
                  <div>
                    <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OX }}>Recommended</p>
                    <p className="font-serif-display mt-2 leading-snug" style={{ fontSize: 18 }}>{dx.recommended}</p>
                  </div>
                </div>

                <div className="mt-7 pt-6 border-t" style={{ borderColor: RULE }}>
                  <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: MUTED }}>Differential</p>
                  <p className="font-serif-display italic mt-2 leading-snug" style={{ fontSize: 17, color: MUTED }}>{dx.differential}</p>
                </div>

                <p className="mt-8 font-mono-label text-[9px] tracking-[0.24em] uppercase" style={{ color: MUTED }}>
                  backstroke.mass-cap.com/diagnosis · not medical advice, obviously
                </p>
              </div>
            </section>

            {/* Share + restart */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyShare}
                className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                style={{ background: INK, color: PAPER, padding: "12px 22px" }}
              >
                {copied ? "Copied. Inflict it on someone." : "Copy my diagnosis link"}
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                style={{ background: "transparent", color: INK, border: `1.5px solid ${RULE}`, padding: "12px 22px" }}
              >
                Take it again
              </button>
            </div>

            {/* The bridge to the product */}
            <div className="mt-12 rounded-2xl p-7 md:p-9" style={{ border: `1px solid ${RULE}`, background: PAPER_2 }}>
              <p className="font-serif-display italic leading-snug" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
                {dx.bridge}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/rank"
                  search={{ t: undefined, r: undefined }}
                  className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ background: OX, color: PAPER, padding: "13px 24px" }}
                >
                  Rank my positions free →
                </Link>
                <Link
                  to="/buy"
                  className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ background: "transparent", color: OX, border: `1.5px solid ${OX}`, padding: "13px 24px" }}
                >
                  See the part that fixes it →
                </Link>
              </div>
            </div>

            <p className="mt-10 text-xs italic leading-relaxed" style={{ color: MUTED }}>
              This is a joke with a real recommendation inside it. It diagnoses nothing. If your back comes with
              numbness, weakness, fever, unexplained weight loss, or any loss of bladder or bowel control, close the
              tab and call a clinician today. That part is not a joke.
            </p>
          </>
        )}
      </article>
    </main>
  );
}
