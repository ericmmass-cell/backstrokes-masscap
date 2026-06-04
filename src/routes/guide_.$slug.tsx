/** /guide/$slug — a cornerstone article. Escapes the /guide hub layout (guide_.). */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, ARTICLE_ORDER } from "@/content/guide";
import { GuideShell, PageEyebrow, PageTitle, Dek, Blocks, Faqs, Sources, RankerCTA, OX, RULE, INK } from "@/components/GuideKit";

const SITE = "https://backstroke.mass-cap.com";

export const Route = createFileRoute("/guide_/$slug")({
  component: ArticlePage,
  head: ({ params }) => {
    const art = ARTICLES[params.slug];
    if (!art) return { meta: [{ title: "Guide · BackStroke" }] };
    const url = `${SITE}/guide/${art.slug}`;
    return {
      meta: [
        { title: `${art.seoTitle} · BackStroke` },
        { name: "description", content: art.seoDescription },
        { property: "og:title", content: art.seoTitle },
        { property: "og:description", content: art.seoDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const art = ARTICLES[slug];

  if (!art) {
    return (
      <GuideShell>
        <PageEyebrow>Not found</PageEyebrow>
        <PageTitle>That one is not on the shelf.</PageTitle>
        <Dek>
          The guide you are after does not exist (yet). Head back to the index and pick one that does.
        </Dek>
        <div className="mt-8">
          <Link to="/guide" className="font-mono-label text-[11px] tracking-[0.2em] uppercase underline" style={{ color: OX }}>
            ← Back to the guide
          </Link>
        </div>
      </GuideShell>
    );
  }

  const others = ARTICLE_ORDER.filter((s) => s !== slug).map((s) => ARTICLES[s]);

  return (
    <GuideShell>
      <PageEyebrow>{art.eyebrow}</PageEyebrow>
      <PageTitle>{art.h1}</PageTitle>
      <Dek>{art.dek}</Dek>

      <Blocks blocks={art.body} />

      <RankerCTA line={art.rankerCta} />

      <Faqs items={art.faqs} />

      {/* keep reading */}
      <section className="mt-14">
        <p className="font-mono-label text-[11px] tracking-[0.24em] uppercase" style={{ color: OX }}>Keep reading</p>
        <div className="mt-5 flex flex-col gap-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/guide/$slug"
              params={{ slug: o.slug }}
              className="block rounded-xl p-5 transition hover:-translate-y-0.5"
              style={{ border: `1px solid ${RULE}`, background: "#FBF7EC" }}
            >
              <h3 className="font-serif-display italic leading-tight" style={{ fontSize: 20, color: INK }}>{o.h1}</h3>
            </Link>
          ))}
        </div>
      </section>

      <Sources items={art.sources} />
    </GuideShell>
  );
}
