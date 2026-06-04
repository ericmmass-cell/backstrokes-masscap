/** /for-clinicians — the practitioner bridge. The thing a PT / therapist hands the patient. */
import { createFileRoute } from "@tanstack/react-router";
import { CLINICIAN } from "@/content/guide";
import { GuideShell, PageEyebrow, PageTitle, Dek, Blocks, RankerCTA, OX, RULE, INK } from "@/components/GuideKit";

const SITE = "https://backstroke.mass-cap.com";

export const Route = createFileRoute("/for-clinicians")({
  component: ForClinicians,
  head: () => ({
    meta: [
      { title: `${CLINICIAN.seoTitle} · BackStroke` },
      { name: "description", content: CLINICIAN.seoDescription },
      { property: "og:title", content: CLINICIAN.seoTitle },
      { property: "og:description", content: CLINICIAN.seoDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/for-clinicians` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ForClinicians() {
  const c = CLINICIAN;
  return (
    <GuideShell>
      <PageEyebrow>{c.eyebrow}</PageEyebrow>
      <PageTitle>{c.h1}</PageTitle>
      <Dek>{c.dek}</Dek>

      <Blocks blocks={c.body} />

      <p className="font-serif-display italic leading-snug my-10 pl-5" style={{ fontSize: "clamp(22px, 3vw, 30px)", borderLeft: `3px solid ${OX}`, color: INK }}>
        {c.pullquote}
      </p>

      {/* patient handout */}
      <section className="rounded-2xl p-7" style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}>
        <p className="font-mono-label text-[11px] tracking-[0.22em] uppercase" style={{ color: OX }}>{c.handout.title}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {c.handout.lines.map((l, i) => (
            <li key={i} className="flex gap-3 leading-relaxed" style={{ fontSize: 16 }}>
              <span aria-hidden className="shrink-0 font-mono-label text-[12px]" style={{ color: OX }}>{i + 1}</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <RankerCTA line={c.cta} />
    </GuideShell>
  );
}
