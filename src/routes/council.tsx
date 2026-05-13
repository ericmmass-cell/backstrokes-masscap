import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/council")({
  component: Council,
  head: () => ({
    meta: [
      { title: "The Clinical Council · BackStroke" },
      {
        name: "description",
        content:
          "Four named clinicians (a McGill-trained spine PT, an APTA pelvic-health PT, a urologist, an AASECT-certified sex therapist) who keep the BackStroke protocol honest.",
      },
    ],
  }),
});

export type CouncilMember = {
  slot: string;
  name: string;
  credentials: string;
  consultsOn: string;
  bioShort: string;
  bioLong: string;
  status: "tbd" | "confirmed";
};

export const COUNCIL: CouncilMember[] = [
  {
    slot: "Spine PT",
    name: "TBD · McGill-trained spine PT",
    credentials: "DPT · McGill spine lineage",
    consultsOn: "Lumbar endurance · hip hinge · disc-pattern programming",
    bioShort:
      "A clinician trained in the McGill endurance approach. Authors the back-side of the protocol: curl-up, side plank, bird-dog, hinge re-pattern, sitting and sleep dosage.",
    bioLong:
      "Reviews every back-side video for cueing, dosage, and red-flag handling. Signs off on the curl-up tempo, the side-plank progression, the bird-dog cadence, and the sleep-position library. Final say on what we tell users to do when pain is acute vs. chronic, and when we route to a clinician instead of a session.",
    status: "tbd",
  },
  {
    slot: "Pelvic Health PT",
    name: "TBD · APTA-certified pelvic-health PT",
    credentials: "DPT · APTA pelvic-health credential · WCS preferred",
    consultsOn: "Pelvic-floor down-training · postpartum · post-prostatectomy",
    bioShort:
      "An APTA-credentialed pelvic-health physical therapist. Owns down-train-first sequencing, the reverse-kegel taxonomy, and the postpartum and post-prostatectomy modifications.",
    bioLong:
      "Reviews every pelvic-floor cue. Owns the line between what an app can teach (external perineal release, breath-led down-training, eccentric kegel control) and what requires an in-person clinician (internal trigger-point release, dilator work, post-surgical rehab). Authors the 'find a clinician' routing copy and the contraindication screens for the postpartum and post-prostatectomy onboarding paths.",
    status: "tbd",
  },
  {
    slot: "Urologist",
    name: "TBD · Board-certified urologist",
    credentials: "MD · ABU board-certified",
    consultsOn: "Erectile and ejaculatory workup · referral · red flags",
    bioShort:
      "Board-certified urologist. Owns the male side of red-flag screening, the language around erectile and ejaculatory dysfunction, and the threshold for when an app stops being the right tool.",
    bioLong:
      "Reviews male-specific protocol content for accuracy against AUA guidelines. Signs off on the screening logic that surfaces 'see a urologist' inside the assessment flow, and on the post-prostatectomy onboarding screen. Final say on what the product is allowed to suggest about erection quality, ejaculatory control, and pelvic-floor work after prostate surgery.",
    status: "tbd",
  },
  {
    slot: "Sex Therapist",
    name: "TBD · AASECT-certified sex therapist",
    credentials: "AASECT-certified · LMFT / LCSW",
    consultsOn: "Communication scripts · arousal · couple-level work",
    bioShort:
      "AASECT-certified sex therapist. Owns the arousal-as-skill content, the conversation scripts, and the language we use about desire, avoidance, and pleasure.",
    bioLong:
      "Reviews every line of copy that addresses arousal, desire, communication, or couple-level dynamics. Authors the conversation script in F.07 and the in-app prompts that handle 'pain unspoken becomes avoidance'. Final say on what the brand is allowed to claim about confidence, satisfaction, and the bedroom-side of the cohort numbers.",
    status: "tbd",
  },
];

function MemberCard({ m }: { m: CouncilMember }) {
  return (
    <article className="bg-background p-7 md:p-10">
      <div className="flex items-start gap-6">
        <div
          className="shrink-0 w-24 h-24 rounded-full border border-border bg-card/40 grid place-items-center font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground"
          aria-hidden
        >
          TBD
          <br />
          photo
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            {m.slot}
          </p>
          <h3 className="font-serif-display text-2xl md:text-3xl mt-2 leading-tight">{m.name}</h3>
          <p className="font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-2">
            {m.credentials}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-6 leading-relaxed">{m.bioLong}</p>
      <div className="mt-6 border-t border-border pt-4">
        <p className="font-mono-label text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
          Consults on
        </p>
        <p className="text-sm mt-2 leading-snug">{m.consultsOn}</p>
      </div>
    </article>
  );
}

function Council() {
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

      <section className="px-6 md:px-10 py-16 md:py-24 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            THE COUNCIL · FOUR CLINICIANS · ONE PROTOCOL
          </p>
          <h1 className="font-serif-display text-5xl md:text-7xl mt-5 leading-[0.98] tracking-[-0.025em] max-w-3xl">
            People with letters after their name <span className="italic" style={{ color: "var(--brand-amber)" }}>and a license they would prefer to keep.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Every protocol line is reviewed by four clinicians. None of them are advisors-in-name-only. None of them are paid in equity to ignore the parts they would, in a clinic, send to someone else. Each owns a specific domain and a specific veto.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 border-b border-border">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-px bg-border border border-border">
          {COUNCIL.map((m) => (
            <MemberCard key={m.slot} m={m} />
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-script text-2xl md:text-3xl italic" style={{ color: "var(--brand-blush)" }}>
            We don't take the council's name in vain. <span style={{ color: "var(--brand-amber)" }}>And we don't take it off the page when the lawyers visit.</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition">
              ← back to the protocol
            </Link>
            <Link to="/science" className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition">
              see the cohort data →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
