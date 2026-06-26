/**
 * Position illustrations · "accuracy or nothing."
 *
 * There are only 7 genuinely usable licensed plates (Seedfeeder, Wikimedia
 * Commons, restyled to the BackStroke ink-on-cream duotone). Each plate truly
 * depicts ONE canonical position, so it is shown on exactly that position. Every
 * other position shows NO figure (a clean editorial plate keyed by family),
 * because a generic illustration that contradicts the description is worse than
 * none. This is the deliberate trade chosen over stretching 7 plates across 37.
 *
 * Source: Seedfeeder, Wikimedia Commons, CC BY-SA. Restyled by BackStroke;
 * adaptations under CC BY-SA 4.0. Credit shown on /positions.
 */

const ART = (name: string) => `/positions-art/${name}.jpg`;

/** Library position id -> illustration. ONLY the canonical match for each plate.
 * Everything else is intentionally absent (editorial card). */
export const ART_BY_ID: Record<string, string> = {
  p01: ART("spoons"), // Side-lying spoons, top knee supported (canonical spoon)
  p03: ART("missionary"), // Supine, knees over pillow, missionary (canonical missionary)
  p12: ART("cowgirl"), // Cowgirl, upright (canonical woman-on-top)
  p19: ART("doggy"), // Doggy, on the bed, knees on pillow (canonical rear)
  p15: ART("standing"), // Standing, both upright (canonical standing, face to face)
  p05: ART("sitting"), // Seated, partner on lap, both upright (canonical seated)
  p04: ART("tsquare"), // Side-lying, T-position (canonical T)
};

/** Archetype -> plate, for surfaces that only know the category (the ranker),
 * where the match is accurate at the archetype level. Not used on /positions. */
export const ART_BY_KEY: Record<string, string> = {
  spoon: ART("spoons"),
  "supine-knees-up": ART("missionary"),
  missionary: ART("missionary"),
  "cowgirl-upright": ART("cowgirl"),
  "doggy-supported": ART("doggy"),
  "doggy-kneeling": ART("doggy"),
  standing: ART("standing"),
  "seated-lap": ART("sitting"),
  "side-T": ART("tsquare"),
  scissor: ART("tsquare"),
};

/** Family word shown on the editorial (no-figure) plate, by pictogram key. */
export const FAMILY_LABEL: Record<string, string> = {
  spoon: "Side-lying",
  "supine-knees-up": "Supine",
  missionary: "Supine",
  "side-T": "Side-lying",
  scissor: "Side-lying",
  "cowgirl-upright": "On top",
  "doggy-supported": "Rear",
  "doggy-kneeling": "Rear",
  standing: "Standing",
  "seated-lap": "Seated",
  "edge-bed": "Edge of bed",
};

export const artForId = (id?: string): string | undefined => (id ? ART_BY_ID[id] : undefined);
export const artForKey = (key?: string): string | undefined => (key ? ART_BY_KEY[key] : undefined);
export const familyLabel = (key?: string): string => (key && FAMILY_LABEL[key]) || "Position";

/** Attribution shown on /positions (CC BY-SA requires credit + share-alike). */
export const ART_CREDIT =
  "Position illustrations by Seedfeeder (Wikimedia Commons), restyled by BackStroke. CC BY-SA; adaptations under CC BY-SA 4.0. Where no faithful illustration exists, the card shows the family and the spine read instead of a misleading one.";
