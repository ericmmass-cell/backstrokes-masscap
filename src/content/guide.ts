/**
 * Guide / content model. The JSON files hold the copy (drafted to the
 * BackStroke voice); this module types it and exposes the lookups the
 * routes use.
 */
import lowback from "./guide-lowback.json";
import sciatica from "./guide-sciatica.json";
import aftersex from "./guide-aftersex.json";
import clinicianRaw from "./clinician.json";
import studyRaw from "./study.json";

export type Block =
  | { type: "h2" | "p" | "callout"; text: string }
  | { type: "list"; items: string[] };
export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  dek: string;
  body: Block[];
  faqs: Faq[];
  sources: string[];
  rankerCta: string;
};

export type Clinician = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  dek: string;
  body: Block[];
  pullquote: string;
  handout: { title: string; lines: string[] };
  cta: string;
};

export type SurveyQ = { q: string; options: string[] };
export type Study = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  dek: string;
  thesis: Block[];
  method: string[];
  privacy: string[];
  survey: SurveyQ[];
  resultsNote: string;
  cta: string;
};

const a = (x: unknown) => x as Article;

export const ARTICLES: Record<string, Article> = {
  [lowback.slug]: a(lowback),
  [sciatica.slug]: a(sciatica),
  [aftersex.slug]: a(aftersex),
};

/** display order for the hub + cross-links */
export const ARTICLE_ORDER: string[] = [lowback.slug, sciatica.slug, aftersex.slug];

export const CLINICIAN = clinicianRaw as unknown as Clinician;
export const STUDY = studyRaw as unknown as Study;
