/**
 * Position library — 40 entries, each scored on four axes plus a clinical note.
 *
 * Scoring scale, 1–5:
 *   lumbarLoad        — how much load the lumbar takes. 1 = none, 5 = high.
 *   hipFlexion        — depth of hip flexion required. 1 = neutral, 5 = deep.
 *   breathAccess      — how easy it is to breathe diaphragmatically. 1 = poor, 5 = full.
 *   partnerMobility   — mobility demand on the partner. 1 = none, 5 = high.
 *
 * Council note is written in brand voice — observational, never coy.
 * Real anatomical names; we are not a dating app.
 */

export type Position = {
  id: string;
  name: string;
  category: "low-load" | "moderate" | "high-load";
  lumbarLoad: 1 | 2 | 3 | 4 | 5;
  hipFlexion: 1 | 2 | 3 | 4 | 5;
  breathAccess: 1 | 2 | 3 | 4 | 5;
  partnerMobility: 1 | 2 | 3 | 4 | 5;
  councilNote: string;
};

export const POSITIONS: Position[] = [
  { id: "p01", name: "Side-lying spoons, top knee supported",            category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 1, councilNote: "Pillow under the top knee keeps the lumbar neutral. The position the spine clinic would prescribe if it gave that advice." },
  { id: "p02", name: "Supine with wedge under pelvis",                   category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 2, councilNote: "7–10° pelvic tilt drops lumbar load 30–40%. The wedge is equipment, not weakness." },
  { id: "p03", name: "Supine, knees over pillow, missionary",            category: "low-load",  lumbarLoad: 2, hipFlexion: 2, breathAccess: 4, partnerMobility: 2, councilNote: "Knees-over-pillow restores the natural lordosis under load. Default for acute back days." },
  { id: "p04", name: "Side-lying, T-position",                           category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Receiving partner side-lying; top leg supported. Off-loads lumbar without sacrificing depth." },
  { id: "p05", name: "Seated, partner on lap, both upright",             category: "moderate",  lumbarLoad: 3, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Bench or sturdy chair. Both spines stacked. Breath access stays high if the receiving partner doesn't fold forward." },
  { id: "p06", name: "Supine, hips elevated on bolster",                 category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 2, councilNote: "Bolster does the work the lumbar would otherwise do. Most common modification for postpartum return." },
  { id: "p07", name: "Side-by-side, facing, knees interlocked",          category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 2, councilNote: "Both partners side-lying. Low demand on either spine; good for sciatica." },
  { id: "p08", name: "Standing, receiving partner bent over support",    category: "high-load", lumbarLoad: 4, hipFlexion: 3, breathAccess: 3, partnerMobility: 4, councilNote: "Hands on a sturdy waist-height surface. Lumbar load is higher than it looks. Not a default for acute days." },
  { id: "p09", name: "Quadruped, forearms down",                         category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 3, partnerMobility: 3, councilNote: "Forearms down (not hands) reduces lumbar extension. Pillow under chest if the upper back tires." },
  { id: "p10", name: "Quadruped, chest on bolster",                      category: "low-load",  lumbarLoad: 2, hipFlexion: 4, breathAccess: 4, partnerMobility: 3, councilNote: "Bolster takes upper-body load, which lets the lumbar stay neutral instead of bracing." },
  { id: "p11", name: "Reverse cowgirl, receiving partner reclining",     category: "moderate",  lumbarLoad: 3, hipFlexion: 3, breathAccess: 3, partnerMobility: 3, councilNote: "Lying-back version is friendlier to the lumbar than the upright. Eyes open to the ceiling, not the wall." },
  { id: "p12", name: "Cowgirl, upright, hands on partner's chest",       category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 2, councilNote: "Receiving partner controls depth, which is half the value. Watch for lumbar hyperextension at end-range." },
  { id: "p13", name: "Modified missionary, legs in stirrups",            category: "moderate",  lumbarLoad: 3, hipFlexion: 5, breathAccess: 3, partnerMobility: 4, councilNote: "Deep hip flexion. Skip if hip impingement or labral history. Wedge mandatory." },
  { id: "p14", name: "Side-lying, scissor",                              category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Both partners on their sides, perpendicular. Low lumbar demand on both. Underrated." },
  { id: "p15", name: "Standing, both upright, back to wall",             category: "moderate",  lumbarLoad: 3, hipFlexion: 2, breathAccess: 4, partnerMobility: 4, councilNote: "Wall does the bracing the lumbar otherwise would. Heel-toe stance keeps the load over the hips." },
  { id: "p16", name: "Edge-of-bed, receiving partner supine",            category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 5, partnerMobility: 2, councilNote: "Hips at the edge, feet flat or on partner's shoulders. Geometry the lumbar can sign off on." },
  { id: "p17", name: "Lap-sitting, facing, both upright",                category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 2, councilNote: "Receiving partner straddling, both sitting tall. Best if neither has thoracic kyphosis fatigue." },
  { id: "p18", name: "Side-lying, top leg in handheld stirrup",          category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Partner holds the top leg. Reduces hip abduction strain; preserves breath." },
  { id: "p19", name: "Doggy, but on the bed, knees on pillow",           category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 3, partnerMobility: 4, councilNote: "Pillow under the receiving knees prevents the over-arched lumbar people fall into without realizing." },
  { id: "p22", name: "Supine, double-pillow lumbar support",             category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 2, councilNote: "Two pillows: one under knees, one filling the lumbar arch. Acute-day default." },
  { id: "p23", name: "Side-lying, receiver supported by wedge",          category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 2, councilNote: "Wedge under torso plus pillow between knees. Geometry the spine can stop monitoring." },
  { id: "p24", name: "Standing, supported squat with partner",           category: "high-load", lumbarLoad: 4, hipFlexion: 5, breathAccess: 2, partnerMobility: 5, councilNote: "Both squat; one partner braced against a wall. High mobility demand. Not an acute-day choice." },
  { id: "p25", name: "Supine, both knees pulled to chest by hands",      category: "moderate",  lumbarLoad: 3, hipFlexion: 5, breathAccess: 3, partnerMobility: 3, councilNote: "Deep hip flexion. Receiving partner controls knee depth. Skip with herniated disc history." },
  { id: "p26", name: "Edge-of-bed, receiver standing, partner kneeling", category: "moderate",  lumbarLoad: 2, hipFlexion: 2, breathAccess: 5, partnerMobility: 3, councilNote: "Receiving partner stands at the bed edge; minimal lumbar load. Partner does the work from the floor." },
  { id: "p27", name: "Cowgirl, leaning back on partner's thighs",        category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 2, councilNote: "Backwards lean takes pressure off the receiving partner's lumbar at the cost of slightly less control." },
  { id: "p28", name: "Side-by-side, facing same direction, spooning",    category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 1, councilNote: "Pillow between knees keeps the lumbar neutral. The single safest position for both partners." },
  { id: "p29", name: "Supine, legs straight, ankles together",           category: "low-load",  lumbarLoad: 2, hipFlexion: 2, breathAccess: 4, partnerMobility: 3, councilNote: "Closed-leg supine. Lower lumbar demand than knees-bent for some bodies; experiment." },
  { id: "p30", name: "Quadruped, hands on headboard",                    category: "high-load", lumbarLoad: 4, hipFlexion: 4, breathAccess: 3, partnerMobility: 4, councilNote: "Hands gripping headboard pulls the thoracic into extension and loads the lumbar. Skip on day-of flare." },
  { id: "p31", name: "Couch edge, receiving partner reclined",           category: "moderate",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Couch edge replaces the bed-edge variant. Same geometry, different room." },
  { id: "p32", name: "Standing, hands on counter, partner behind",       category: "high-load", lumbarLoad: 4, hipFlexion: 3, breathAccess: 3, partnerMobility: 4, councilNote: "Counter at hip height is the variable. Higher counter = less lumbar load. Measure once." },
  { id: "p33", name: "Lying on stomach, pillow under hips",              category: "moderate",  lumbarLoad: 3, hipFlexion: 1, breathAccess: 3, partnerMobility: 4, councilNote: "Prone increases lumbar extension; the pillow flattens it. Avoid with facet-joint pain." },
  { id: "p34", name: "Supine, partner kneeling, no lumbar load",         category: "low-load",  lumbarLoad: 1, hipFlexion: 3, breathAccess: 5, partnerMobility: 4, councilNote: "Receiving partner does nothing. The most accessible high-pain-day option." },
  { id: "p35", name: "Cradle-sitting, facing, both legs wrapped",        category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 3, councilNote: "Slow, intimate, breath-led. Eye contact is the function, not a feature." },
  { id: "p36", name: "Side-lying, top leg straight back",                category: "moderate",  lumbarLoad: 3, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Top leg extended posteriorly. Loads the QL more than expected. Not for QL-spasm days." },
  { id: "p37", name: "Squatting over partner",                           category: "high-load", lumbarLoad: 4, hipFlexion: 5, breathAccess: 2, partnerMobility: 5, councilNote: "Receiving partner deep-squats. Highest mobility demand in the library. Save for steady weeks." },
  { id: "p38", name: "Supine, one knee bent and externally rotated",     category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Frog-leg supine. Off-loads the hip without spinal cost. Good for hip-impingement bodies." },
  { id: "p39", name: "Standing, both face-to-face, low partner squat",   category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 3, partnerMobility: 4, councilNote: "Partner with the more durable knees does the squat work. Decide who that is before, not during." },
];

/**
 * Map a 0–100 Index score to a recommended max lumbar load.
 * Low Index = high pain = lower allowable load.
 */
export function maxLoadForIndex(index: number): number {
  if (index < 40) return 1;
  if (index < 55) return 2;
  if (index < 70) return 3;
  if (index < 85) return 4;
  return 5;
}

/**
 * Surface the three positions safest for the current Index.
 * Ranks by: lumbar load ascending, then breath access descending.
 */
export function matchToTodaysBack(index: number, count = 3): Position[] {
  const cap = maxLoadForIndex(index);
  return [...POSITIONS]
    .filter((p) => p.lumbarLoad <= cap)
    .sort((a, b) => a.lumbarLoad - b.lumbarLoad || b.breathAccess - a.breathAccess)
    .slice(0, count);
}
