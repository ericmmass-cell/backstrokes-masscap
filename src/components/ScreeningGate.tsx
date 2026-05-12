import { useState } from "react";

type Cohort = "postpartum" | "post-prostatectomy";

const CONTRAINDICATIONS: Record<Cohort, string[]> = {
  postpartum: [
    "If you are within 6 weeks of delivery, do not start active protocols. Pelvic-floor down-training and breathwork are generally appropriate; loaded spine work is not.",
    "Diastasis recti requires modification of the spine big-3 — bird-dog only, no curl-up, until cleared.",
    "Bleeding, infection, severe perineal pain, or unresolved dyspareunia: see a pelvic-health PT in person before any in-app session.",
  ],
  "post-prostatectomy": [
    "Wait for clearance from your urologist before starting any kegel work. Timing varies by procedure (open vs. robotic) and continence status.",
    "Catheter still in place: no pelvic-floor contraction work. Diaphragmatic breath is appropriate.",
    "New or worsening incontinence, pain, or unexpected bleeding: contact your urologist before continuing.",
  ],
};

const LABEL: Record<Cohort, string> = {
  postpartum: "Postpartum (within 18 months)",
  "post-prostatectomy": "Post-prostatectomy",
};

export function ScreeningGate({
  cohort,
  onConfirm,
}: {
  cohort: Cohort;
  onConfirm?: () => void;
}) {
  const [acknowledged, setAcknowledged] = useState(false);

  const confirm = () => {
    setAcknowledged(true);
    try {
      const log = JSON.parse(localStorage.getItem("bs.screening") ?? "[]");
      log.push({ cohort, t: Date.now() });
      localStorage.setItem("bs.screening", JSON.stringify(log));
    } catch {}
    onConfirm?.();
  };

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8">
      <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand-blush)" }}>
        SCREENING · {LABEL[cohort].toUpperCase()}
      </p>
      <h3 className="font-serif-display text-2xl md:text-3xl mt-3 leading-snug">
        Before this protocol starts, read this once.
      </h3>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        We're not gating you out. We're documenting that you've seen the clinical contraindications for your cohort and confirmed you want to proceed. This is informed consent on the record.
      </p>

      <ul className="mt-6 space-y-3">
        {CONTRAINDICATIONS[cohort].map((line) => (
          <li key={line} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span style={{ color: "var(--brand-blush)" }} className="mt-1">◆</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 border-t border-border pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[11px] text-muted-foreground italic max-w-md">
          If anything above applies and you have not seen a clinician about it, see one before you start. We'll be here.
        </p>
        {acknowledged ? (
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--brand-amber)" }}
          >
            ◆ noted — proceed
          </p>
        ) : (
          <button
            type="button"
            onClick={confirm}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-mono-label text-[10px] tracking-[0.22em] uppercase bg-foreground text-background hover:opacity-90 transition"
          >
            I've consulted my provider — continue
          </button>
        )}
      </div>
    </div>
  );
}
