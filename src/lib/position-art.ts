/**
 * Position illustrations · real, openly-licensed line art by Seedfeeder
 * (Wikimedia Commons), restyled to the BackStroke ink-on-paper duotone (baked
 * into the jpgs in /public/positions-art). This replaced the repeated photo
 * strips: the line art shows exactly what each position is, stays consistent
 * across all 37, and is accurate per position.
 *
 * Seven consistent plates from one artist. The supine and rear families
 * genuinely share one body arrangement (the pillow/wedge/angle is the only
 * real difference), so several positions map to the same plate; the card's
 * nickname, clinical name, and load badge carry the specifics, and a per-card
 * mirror + slight zoom keep neighbours from reading pixel-identical.
 *
 * Source: Seedfeeder, Wikimedia Commons, CC BY-SA 3.0/4.0. Restyled by
 * BackStroke; adaptations offered under CC BY-SA 4.0. Credit shown on /positions.
 */

const ART = (name: string) => `/positions-art/${name}.jpg`;

export const ART_BY_ID: Record<string, string> = {
  // side-lying / spoon
  p01: ART("spoons"),
  p18: ART("spoons"),
  p23: ART("spoons"),
  p28: ART("spoons"),
  p36: ART("spoons"),
  // side-lying facing / scissor / T
  p04: ART("tsquare"),
  p07: ART("tsquare"),
  p14: ART("tsquare"),
  // supine / missionary (one honest body arrangement; the support differs)
  p02: ART("missionary"),
  p03: ART("missionary"),
  p06: ART("missionary"),
  p13: ART("missionary"),
  p16: ART("missionary"),
  p22: ART("missionary"),
  p25: ART("missionary"),
  p29: ART("missionary"),
  p34: ART("missionary"),
  p38: ART("missionary"),
  // receiver on top
  p11: ART("cowgirl"),
  p12: ART("cowgirl"),
  p27: ART("cowgirl"),
  p37: ART("cowgirl"),
  // rear / quadruped / prone
  p08: ART("doggy"),
  p09: ART("doggy"),
  p10: ART("doggy"),
  p19: ART("doggy"),
  p30: ART("doggy"),
  p32: ART("doggy"),
  p33: ART("doggy"),
  // standing
  p15: ART("standing"),
  p24: ART("standing"),
  p26: ART("standing"),
  p39: ART("standing"),
  // seated / edge
  p05: ART("sitting"),
  p17: ART("sitting"),
  p31: ART("sitting"),
  p35: ART("sitting"),
};

/** Fallback by collapsed pictogram key, for surfaces that only know the
 * category (the ranker, the homepage), so they show illustrations too. */
export const ART_BY_KEY: Record<string, string> = {
  spoon: ART("spoons"),
  "supine-knees-up": ART("missionary"),
  missionary: ART("missionary"),
  "side-T": ART("tsquare"),
  scissor: ART("tsquare"),
  "cowgirl-upright": ART("cowgirl"),
  "doggy-supported": ART("doggy"),
  "doggy-kneeling": ART("doggy"),
  standing: ART("standing"),
  "seated-lap": ART("sitting"),
  "edge-bed": ART("missionary"),
};

export const artForId = (id?: string): string | undefined => (id ? ART_BY_ID[id] : undefined);
export const artForKey = (key?: string): string | undefined => (key ? ART_BY_KEY[key] : undefined);

/** Attribution shown on /positions (CC BY-SA requires credit + share-alike). */
export const ART_CREDIT =
  "Position illustrations by Seedfeeder (Wikimedia Commons), restyled by BackStroke. CC BY-SA; adaptations under CC BY-SA 4.0.";
