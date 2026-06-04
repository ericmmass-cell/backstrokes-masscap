/** /guide — the public content hub. Cornerstone articles + the clinician and study pages. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, ARTICLE_ORDER, CLINICIAN, STUDY } from "@/content/guide";
import { GuideShell, PageEyebrow, PageTitle, Dek, RankerCTA, OX, RULE, INK } from "@/components/GuideKit";

const SITE = "https://backstroke.mass-cap.com";
const TITLE = "The back-and-sex guide nobody else wrote";
const DESC = "Plain, researched answers on sex and lower back pain: which positions work, sciatica, the morning-after flare, and a free ranker for your spine.";

export const Route = createFileRoute("/guide")({
  component: GuideHub,
  head: () => ({
    meta: [
      { title: `${TITLE} · BackStroke` },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/guide` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function GuideHub() {
  const extras = [
    { to: "/for-clinicians" as const, eyebrow: CLINICIAN.eyebrow, h1: "For the clinician who got asked the question", dek: "The take-home resource for the back-care visit that never had a good answer for the bedroom." },
    { to: "/study" as const, eyebrow: STUDY.eyebrow, h1: "The number nobody measured", dek: "Science mapped the spine during sex. Nobody published the human cost. We are collecting it." },
  ];
  return (
    <GuideShell>
      <PageEyebrow>The guide</PageEyebrow>
      <PageTitle>Everything they were too embarrassed to put in one place.</PageTitle>
      <Dek>
        The people who treat backs do not talk about sex, and the people who talk about sex do not know what a disc
        is. We sit in that gap on purpose. Plain answers, real biomechanics, zero candles.
      </Dek>

      <div className="mt-12 flex flex-col gap-4">
        {ARTICLE_ORDER.map((slug) => {
          const art = ARTICLES[slug];
          return (
            <Link
              key={slug}
              to="/guide/$slug"
              params={{ slug }}
              className="group block rounded-2xl p-6 transition hover:-translate-y-0.5"
              style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}
            >
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OX }}>{art.eyebrow}</p>
              <h2 className="font-serif-display italic mt-2 leading-tight" style={{ fontSize: 26, color: INK }}>{art.h1}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 40)" }}>{art.dek}</p>
            </Link>
          );
        })}

        {extras.map((x) => (
          <Link
            key={x.to}
            to={x.to}
            className="group block rounded-2xl p-6 transition hover:-translate-y-0.5"
            style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}
          >
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: OX }}>{x.eyebrow}</p>
            <h2 className="font-serif-display italic mt-2 leading-tight" style={{ fontSize: 26, color: INK }}>{x.h1}</h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 40)" }}>{x.dek}</p>
          </Link>
        ))}
      </div>

      <RankerCTA line="Or skip the reading. Two questions and we rank the positions against your actual spine." />
    </GuideShell>
  );
}
