/**
 * Position library · 40 entries, each scored on four axes plus a clinical note.
 *
 * Scoring scale, 1–5:
 *   lumbarLoad        · how much load the lumbar takes. 1 = none, 5 = high.
 *   hipFlexion        · depth of hip flexion required. 1 = neutral, 5 = deep.
 *   breathAccess      · how easy it is to breathe diaphragmatically. 1 = poor, 5 = full.
 *   partnerMobility   · mobility demand on the partner. 1 = none, 5 = high.
 *
 * Council note is written in brand voice · observational, never coy.
 * Real anatomical names; we are not a dating app.
 */

export type Position = {
  id: string;
  name: string;
  /** Sardonic shorthand shown as the card headline; the clinical name becomes the
   * subtitle. A named position is a meme; "Position 27" is a spreadsheet. Aspirational
   * for the low-load winners, honest for the high-load traps. Punches at the geometry,
   * never the user. */
  nickname: string;
  category: "low-load" | "moderate" | "high-load";
  lumbarLoad: 1 | 2 | 3 | 4 | 5;
  hipFlexion: 1 | 2 | 3 | 4 | 5;
  breathAccess: 1 | 2 | 3 | 4 | 5;
  partnerMobility: 1 | 2 | 3 | 4 | 5;
  councilNote: string;
};

export const POSITIONS: Position[] = [
  { id: "p01", name: "Side-lying spoons, top knee supported", nickname: "The Diplomat",            category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 1, councilNote: "Pillow under the top knee keeps the lumbar neutral. The position the spine clinic would prescribe if it gave that advice." },
  { id: "p02", name: "Supine with wedge under pelvis", nickname: "The Cheat Code",                   category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 2, councilNote: "7–10° pelvic tilt drops lumbar load 30–40%. The wedge is equipment, not weakness." },
  { id: "p03", name: "Supine, knees over pillow, missionary", nickname: "The Default Setting",            category: "low-load",  lumbarLoad: 2, hipFlexion: 2, breathAccess: 4, partnerMobility: 2, councilNote: "Knees-over-pillow restores the natural lordosis under load. Default for acute back days." },
  { id: "p04", name: "Side-lying, T-position", nickname: "The Compromise",                           category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Receiving partner side-lying; top leg supported. Off-loads lumbar without sacrificing depth." },
  { id: "p05", name: "Seated, partner on lap, both upright", nickname: "The Board Meeting",             category: "moderate",  lumbarLoad: 3, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Bench or sturdy chair. Both spines stacked. Breath access stays high if the receiving partner doesn't fold forward." },
  { id: "p06", name: "Supine, hips elevated on bolster", nickname: "The Outsourced",                 category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 2, councilNote: "Bolster does the work the lumbar would otherwise do. Most common modification for postpartum return." },
  { id: "p07", name: "Side-by-side, facing, knees interlocked", nickname: "The Truce",          category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 2, councilNote: "Both partners side-lying. Low demand on either spine; good for sciatica." },
  { id: "p08", name: "Standing, receiving partner bent over support", nickname: "The Optimist",    category: "high-load", lumbarLoad: 4, hipFlexion: 3, breathAccess: 3, partnerMobility: 4, councilNote: "Hands on a sturdy waist-height surface. Lumbar load is higher than it looks. Not a default for acute days." },
  { id: "p09", name: "Quadruped, forearms down", nickname: "The Negotiation",                         category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 3, partnerMobility: 3, councilNote: "Forearms down (not hands) reduces lumbar extension. Pillow under chest if the upper back tires." },
  { id: "p10", name: "Quadruped, chest on bolster", nickname: "The Negotiated Settlement",                      category: "low-load",  lumbarLoad: 2, hipFlexion: 4, breathAccess: 4, partnerMobility: 3, councilNote: "Bolster takes upper-body load, which lets the lumbar stay neutral instead of bracing." },
  { id: "p11", name: "Reverse cowgirl, receiving partner reclining", nickname: "The Plot Twist",     category: "moderate",  lumbarLoad: 3, hipFlexion: 3, breathAccess: 3, partnerMobility: 3, councilNote: "Lying-back version is friendlier to the lumbar than the upright. Eyes open to the ceiling, not the wall." },
  { id: "p12", name: "Cowgirl, upright, hands on partner's chest", nickname: "The Control Tower",       category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 2, councilNote: "Receiving partner controls depth, which is half the value. Watch for lumbar hyperextension at end-range." },
  { id: "p13", name: "Modified missionary, legs in stirrups", nickname: "The Overachiever",            category: "moderate",  lumbarLoad: 3, hipFlexion: 5, breathAccess: 3, partnerMobility: 4, councilNote: "Deep hip flexion. Skip if hip impingement or labral history. Wedge mandatory." },
  { id: "p14", name: "Side-lying, scissor", nickname: "The Underrated",                              category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Both partners on their sides, perpendicular. Low lumbar demand on both. Underrated." },
  { id: "p15", name: "Standing, both upright, back to wall", nickname: "The Lean",             category: "moderate",  lumbarLoad: 3, hipFlexion: 2, breathAccess: 4, partnerMobility: 4, councilNote: "Wall does the bracing the lumbar otherwise would. Heel-toe stance keeps the load over the hips." },
  { id: "p16", name: "Edge-of-bed, receiving partner supine", nickname: "The Houseguest",            category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 5, partnerMobility: 2, councilNote: "Hips at the edge, feet flat or on partner's shoulders. Geometry the lumbar can sign off on." },
  { id: "p17", name: "Lap-sitting, facing, both upright", nickname: "The Posture Audit",                category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 2, councilNote: "Receiving partner straddling, both sitting tall. Best if neither has thoracic kyphosis fatigue." },
  { id: "p18", name: "Side-lying, top leg in handheld stirrup", nickname: "The Assist",          category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Partner holds the top leg. Reduces hip abduction strain; preserves breath." },
  { id: "p19", name: "Doggy, but on the bed, knees on pillow", nickname: "The Reformed Doggy",           category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 3, partnerMobility: 4, councilNote: "Pillow under the receiving knees prevents the over-arched lumbar people fall into without realizing." },
  { id: "p22", name: "Supine, double-pillow lumbar support", nickname: "The Throne",             category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 2, councilNote: "Two pillows: one under knees, one filling the lumbar arch. Acute-day default." },
  { id: "p23", name: "Side-lying, receiver supported by wedge", nickname: "The Off-Duty",          category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 2, councilNote: "Wedge under torso plus pillow between knees. Geometry the spine can stop monitoring." },
  { id: "p24", name: "Standing, supported squat with partner", nickname: "The Trust Fall",           category: "high-load", lumbarLoad: 4, hipFlexion: 5, breathAccess: 2, partnerMobility: 5, councilNote: "Both squat; one partner braced against a wall. High mobility demand. Not an acute-day choice." },
  { id: "p25", name: "Supine, both knees pulled to chest by hands", nickname: "The Overcommitment",      category: "moderate",  lumbarLoad: 3, hipFlexion: 5, breathAccess: 3, partnerMobility: 3, councilNote: "Deep hip flexion. Receiving partner controls knee depth. Skip with herniated disc history." },
  { id: "p26", name: "Edge-of-bed, receiver standing, partner kneeling", nickname: "The Floor Show", category: "moderate",  lumbarLoad: 2, hipFlexion: 2, breathAccess: 5, partnerMobility: 3, councilNote: "Receiving partner stands at the bed edge; minimal lumbar load. Partner does the work from the floor." },
  { id: "p27", name: "Cowgirl, leaning back on partner's thighs", nickname: "The Recline",        category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 2, councilNote: "Backwards lean takes pressure off the receiving partner's lumbar at the cost of slightly less control." },
  { id: "p28", name: "Side-by-side, facing same direction, spooning", nickname: "The Peace Treaty",    category: "low-load",  lumbarLoad: 1, hipFlexion: 2, breathAccess: 5, partnerMobility: 1, councilNote: "Pillow between knees keeps the lumbar neutral. The single safest position for both partners." },
  { id: "p29", name: "Supine, legs straight, ankles together", nickname: "The Minimalist",           category: "low-load",  lumbarLoad: 2, hipFlexion: 2, breathAccess: 4, partnerMobility: 3, councilNote: "Closed-leg supine. Lower lumbar demand than knees-bent for some bodies; experiment." },
  { id: "p30", name: "Quadruped, hands on headboard", nickname: "The Headboard Incident",                    category: "high-load", lumbarLoad: 4, hipFlexion: 4, breathAccess: 3, partnerMobility: 4, councilNote: "Hands gripping headboard pulls the thoracic into extension and loads the lumbar. Skip on day-of flare." },
  { id: "p31", name: "Couch edge, receiving partner reclined", nickname: "The Change of Scenery",           category: "moderate",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Couch edge replaces the bed-edge variant. Same geometry, different room." },
  { id: "p32", name: "Standing, hands on counter, partner behind", nickname: "The Countertop Gamble",       category: "high-load", lumbarLoad: 4, hipFlexion: 3, breathAccess: 3, partnerMobility: 4, councilNote: "Counter at hip height is the variable. Higher counter = less lumbar load. Measure once." },
  { id: "p33", name: "Lying on stomach, pillow under hips", nickname: "The Prone Risk",              category: "moderate",  lumbarLoad: 3, hipFlexion: 1, breathAccess: 3, partnerMobility: 4, councilNote: "Prone increases lumbar extension; the pillow flattens it. Avoid with facet-joint pain." },
  { id: "p34", name: "Supine, partner kneeling, no lumbar load", nickname: "The Guest of Honor",         category: "low-load",  lumbarLoad: 1, hipFlexion: 3, breathAccess: 5, partnerMobility: 4, councilNote: "Receiving partner does nothing. The most accessible high-pain-day option." },
  { id: "p35", name: "Cradle-sitting, facing, both legs wrapped", nickname: "The Slow Movement",        category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 4, partnerMobility: 3, councilNote: "Slow, intimate, breath-led. Eye contact is the function, not a feature." },
  { id: "p36", name: "Side-lying, top leg straight back", nickname: "The QL Tax",                category: "moderate",  lumbarLoad: 3, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Top leg extended posteriorly. Loads the QL more than expected. Not for QL-spasm days." },
  { id: "p37", name: "Squatting over partner", nickname: "The Boss Fight",                           category: "high-load", lumbarLoad: 4, hipFlexion: 5, breathAccess: 2, partnerMobility: 5, councilNote: "Receiving partner deep-squats. Highest mobility demand in the library. Save for steady weeks." },
  { id: "p38", name: "Supine, one knee bent and externally rotated", nickname: "The Frog Prince",     category: "low-load",  lumbarLoad: 2, hipFlexion: 3, breathAccess: 4, partnerMobility: 3, councilNote: "Frog-leg supine. Off-loads the hip without spinal cost. Good for hip-impingement bodies." },
  { id: "p39", name: "Standing, both face-to-face, low partner squat", nickname: "The Delegation",   category: "moderate",  lumbarLoad: 3, hipFlexion: 4, breathAccess: 3, partnerMobility: 4, councilNote: "Partner with the more durable knees does the squat work. Decide who that is before, not during." },
];

/* ───────── Condition encyclopedia ─────────
 *
 * "What's good for sciatica? For a disc? For standing-pain stenosis?"
 * Each back condition has a direction it does NOT want loaded, and a
 * geometry that spares it. These are mapped from each position's scored
 * axes (lumbar load, hip flexion) plus its geometry (read from the name:
 * prone, standing, deep-flexion). Informational, not prescriptive · it
 * surfaces what tends to spare each condition; the body is the referee.
 */
export type Condition =
  | "sciatica"
  | "disc"
  | "stenosis"
  | "si-joint"
  | "hip"
  | "flare";

export const CONDITIONS: { key: Condition; label: string; blurb: string }[] = [
  { key: "sciatica", label: "Sciatica", blurb: "Radiating leg pain. Neutral spine, low rotation, no deep hip flexion." },
  { key: "disc", label: "Disc / bending pain", blurb: "Worse bending forward. Keep the spine neutral; skip deep folding." },
  { key: "stenosis", label: "Stenosis / standing pain", blurb: "Worse arching or standing. A little flexion helps; avoid prone extension." },
  { key: "si-joint", label: "SI joint", blurb: "Favor symmetric, supported geometry; avoid one-sided and standing load." },
  { key: "hip", label: "Hip / impingement", blurb: "Avoid deep hip flexion." },
  { key: "flare", label: "Acute flare", blurb: "Contact and lowest load only." },
];

/** Which conditions a position tends to spare. Derived from its scored
 *  axes + geometry. */
export function conditionsFor(p: Position): Condition[] {
  const n = p.name.toLowerCase();
  const prone = /stomach|prone/.test(n);
  const standing = /standing/.test(n);
  const deepFlexion = p.hipFlexion >= 4 || /knees pulled to chest|stirrup/.test(n);
  const out: Condition[] = [];

  // Sciatica: neutral, supported, no deep flexion, low lumbar load.
  if (p.lumbarLoad <= 2 && p.hipFlexion <= 3) out.push("sciatica");
  // Disc / flexion-intolerant: avoid forward folding; neutral spine, shallow flexion.
  if (p.lumbarLoad <= 2 && p.hipFlexion <= 2 && !deepFlexion) out.push("disc");
  // Stenosis / extension-intolerant: flexion is fine, prone/standing extension is not.
  if (p.lumbarLoad <= 3 && !prone && !(standing && p.lumbarLoad >= 4)) out.push("stenosis");
  // SI joint: symmetric, supported, low load, off the feet.
  if (p.lumbarLoad <= 2 && !standing) out.push("si-joint");
  // Hip / impingement: shallow hip flexion only.
  if (!deepFlexion && p.hipFlexion <= 3) out.push("hip");
  // Acute flare: lowest load, contact-level only.
  if (p.lumbarLoad <= 1) out.push("flare");

  return out;
}

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

/* ───────── Role-aware lumbar load ─────────
 *
 * The same position loads the two partners' backs very differently. In
 * supine missionary the receiving partner lies supported while the
 * penetrating partner's lumbar does the thrusting; cowgirl flips it; a
 * standing squat punishes both. So "whose back is working" depends on
 * your role tonight.
 *
 * LOAD_BEARER[id] names whose lumbar carries the headline load (the
 * catalogued `lumbarLoad`). The other role gets the easier side.
 * "shared" means both carry it (stacked-spine or both-standing geometry)
 * and neither gets a discount. Classified by body geometry from each
 * position's name.
 */
export type Role = "penetrator" | "receiver" | "either";

const LOAD_BEARER: Record<string, "penetrator" | "receiver" | "shared"> = {
  p01: "shared",     // side-lying spoons · both side-lying, both quiet
  p02: "penetrator", // supine wedge · receiver supported
  p03: "penetrator", // supine missionary · receiver supine
  p04: "penetrator", // side-lying T · partner kneeling does the work
  p05: "shared",     // seated lap, both upright
  p06: "penetrator", // supine on bolster · receiver supported
  p07: "shared",     // side-by-side facing
  p08: "receiver",   // standing, receiver bent over support
  p09: "receiver",   // quadruped, forearms down
  p10: "receiver",   // quadruped, chest on bolster
  p11: "receiver",   // reverse cowgirl · receiver on top
  p12: "receiver",   // cowgirl upright · receiver on top
  p13: "penetrator", // modified missionary, stirrups · receiver supine
  p14: "shared",     // side-lying scissor
  p15: "shared",     // standing, both upright, wall
  p16: "penetrator", // edge-of-bed, receiver supine
  p17: "shared",     // lap-sitting, both upright
  p18: "penetrator", // side-lying stirrup · receiver side-lying quiet
  p19: "receiver",   // doggy on the bed · receiver in quadruped
  p22: "penetrator", // supine double-pillow · receiver supported
  p23: "shared",     // side-lying, receiver wedge · both side-lying
  p24: "shared",     // standing supported squat · both work
  p25: "receiver",   // supine knees-to-chest · receiver's deep flexion
  p26: "penetrator", // edge-of-bed, receiver standing, partner kneels
  p27: "receiver",   // cowgirl leaning back · receiver on top
  p28: "shared",     // side-by-side spooning
  p29: "penetrator", // supine legs straight · receiver supine
  p30: "receiver",   // quadruped, hands on headboard
  p31: "penetrator", // couch edge, receiver reclined
  p32: "receiver",   // standing, receiver bent over counter
  p33: "receiver",   // prone, pillow under hips · receiver prone
  p34: "penetrator", // supine, partner kneeling · receiver does nothing
  p35: "shared",     // cradle-sitting, both wrapped
  p36: "shared",     // side-lying, top leg back
  p37: "receiver",   // squatting over partner · receiver on top
  p38: "penetrator", // supine one knee bent · receiver supine
  p39: "shared",     // standing face-to-face, low squat
};

export function loadBearerFor(p: Position): "penetrator" | "receiver" | "shared" {
  return LOAD_BEARER[p.id] ?? "shared";
}

/** Lumbar load for a given role. "either" (depends on the day) returns
 *  the cautious headline load so nothing unsafe slips through. */
/**
 * Per-role lumbar load: [penetrator, receiver], 1 (easy) .. 5 (heavy). A
 * heuristic read from each position's geometry, NOT one number fudged by role:
 * the supported / lying-down partner scores low; the kneeling, standing,
 * squatting, or on-top working partner scores higher. This is what lets
 * "penetrating + bad back" rank by the PENETRATOR's spine. Worth an advisor pass.
 */
const PER_ROLE_LOAD: Record<string, [number, number]> = {
  p01: [1, 1], p02: [3, 1], p03: [3, 1], p04: [3, 2], p05: [3, 3], p06: [3, 1],
  p07: [2, 2], p08: [3, 4], p09: [3, 3], p10: [3, 2], p11: [1, 3], p12: [1, 3],
  p13: [3, 3], p14: [2, 2], p15: [3, 3], p16: [3, 1], p17: [3, 3], p18: [3, 2],
  p19: [3, 3], p22: [3, 1], p23: [2, 2], p24: [4, 4], p25: [3, 4], p26: [3, 2],
  p27: [2, 3], p28: [1, 1], p29: [3, 2], p30: [3, 4], p31: [3, 2], p32: [3, 4],
  p33: [3, 3], p34: [3, 1], p35: [3, 3], p36: [2, 2], p37: [1, 5], p38: [3, 2],
  p39: [4, 3],
};

/** Both sides of a position's load, [penetrator, receiver]. Null when unmapped. */
export function perRoleLoad(p: Position): [number, number] | null {
  return PER_ROLE_LOAD[p.id] ?? null;
}

export function roleLoad(p: Position, role: Role): number {
  const pr = PER_ROLE_LOAD[p.id];
  if (role === "either") {
    // Cautious by contract: with no role chosen we gate on the HEAVIER side,
    // so nothing unsafe slips through the default view.
    return pr ? Math.max(pr[0], pr[1]) : p.lumbarLoad;
  }
  if (pr) return role === "penetrator" ? pr[0] : pr[1];
  // fallback to the older bearer model for any unmapped position
  const bearer = loadBearerFor(p);
  if (bearer === "shared") return p.lumbarLoad;
  const youBearIt =
    (role === "penetrator" && bearer === "penetrator") ||
    (role === "receiver" && bearer === "receiver");
  return youBearIt ? p.lumbarLoad : Math.max(1, p.lumbarLoad - 2);
}

/** One-line, role-aware read on whose back is working. Derived from the same
 * per-role loads the ranking uses, so the sentence can never contradict the
 * number printed beside it. */
export function roleLoadNote(p: Position, role: Role): string {
  const pr = PER_ROLE_LOAD[p.id];
  const [pen, rec] = pr ?? [p.lumbarLoad, p.lumbarLoad];
  if (pen === rec) return "Shared load. Both spines work here.";
  const bearer = pen > rec ? "penetrator" : "receiver";
  if (role === "either") {
    return bearer === "penetrator"
      ? "The penetrating partner's back carries this one."
      : "The receiving partner's back carries this one.";
  }
  const youBearIt = role === bearer;
  return youBearIt
    ? "Your back is the one working here. Mind the cap."
    : "Your back gets the easier side here.";
}

/**
 * Surface the three positions safest for the current Index and role.
 * Ranks by: role-aware lumbar load ascending, then breath access descending.
 */
export function matchToTodaysBack(index: number, count = 3, role: Role = "either"): Position[] {
  const cap = maxLoadForIndex(index);
  return [...POSITIONS]
    .filter((p) => roleLoad(p, role) <= cap)
    .sort((a, b) => roleLoad(a, role) - roleLoad(b, role) || b.breathAccess - a.breathAccess)
    .slice(0, count);
}

/* ═══════════════════════ THE POP ATLAS ═══════════════════════
 *
 * Two kinds of pop, scored honestly from the four axes already on every
 * position. No new per-position data, no schema change. The double meaning
 * is the whole feature:
 *
 *   RELIEF  · the kind your back wants. How much room the spine gets.
 *   HEAT    · the good kind of pop. How much the geometry is worth doing.
 *
 * COPY FIREWALL (enforce in review on every UI string):
 *   RELIEF may say: spares, eases, takes pressure off, lets the back stay
 *     neutral, decompresses, gives the spine room.
 *   RELIEF may NOT say: treats, heals, fixes, therapeutic, corrects,
 *     realigns, cures, "good for your back". RELIEF is room, not therapy.
 *   HEAT describes the SHAPE, never the user or the partner. A low heat
 *     means "this shape is sleepy", never "you are".
 *
 * Safety always leads: matchToTodaysBack() stays the default order, POP only
 * decorates and offers an optional sort, and no POP sort ever expands the
 * allowed set (every sort is applied AFTER the load-cap partition).
 */

/** RELIEF, role-aware, 0-100. The relief pop: how much room the back gets.
 *  Lower role-aware lumbar load + freer breath = more relief. */
export function reliefFor(p: Position, role: Role = "either"): number {
  const loadTerm = (5 - roleLoad(p, role)) / 4; // 0 (load 5) .. 1 (load 1)
  const breathTerm = (p.breathAccess - 1) / 4; // 0 .. 1
  return Math.round(100 * (0.65 * loadTerm + 0.35 * breathTerm));
}

/** HEAT, geometry-only, 0-100. The good pop: how dynamic/worth-doing the
 *  shape is. Never role-aware, never a grade on a person. */
export function heatFor(p: Position): number {
  const mob = (p.partnerMobility - 1) / 4;
  const flex = (p.hipFlexion - 1) / 4;
  const catWeight = ({ "low-load": 0, moderate: 1, "high-load": 2 }[p.category] ?? 0) / 2;
  const drive = loadBearerFor(p) !== "shared" ? 0.12 : 0;
  return Math.round(100 * Math.min(1, 0.4 * mob + 0.28 * flex + 0.2 * catWeight + drive));
}

/** The single combined POP read, 0-100. A banded blend that keeps RELIEF the
 *  heavier hand (this is a back app) while real HEAT genuinely lifts a
 *  position. Nothing scores high unless it is both survivable AND hot. */
export function popFor(p: Position, role: Role = "either"): number {
  const relief = reliefFor(p, role) / 100;
  const heat = heatFor(p) / 100;
  return Math.round(100 * Math.sqrt(relief * (0.35 + 0.65 * heat)));
}

/** 0-3 "pops" · the literal pop pop pop, rendered as amber eyebrow glyphs. */
export function popPips(p: Position, role: Role = "either"): 0 | 1 | 2 | 3 {
  const pop = popFor(p, role);
  if (pop >= 75) return 3;
  if (pop >= 55) return 2;
  if (pop >= 35) return 1;
  return 0;
}

/** The rare both-at-once: survivable AND hot. Earns the oxblood pill. */
export function popSweetSpot(p: Position, role: Role = "either"): boolean {
  return reliefFor(p, role) >= 60 && heatFor(p) >= 45;
}

/* ───────── Back-pain AREA taxonomy ─────────
 * Five clean regions the user can point at. Four derive straight from the
 * existing conditionsFor() tags; only thoracic adds a one-line heuristic
 * (no 39 hand values). Framed everywhere as "tends to spare", never as a
 * diagnosis. */
export type PainArea = "lumbar" | "si" | "sciatic" | "hip" | "thoracic";

export const PAIN_AREAS: { key: PainArea; label: string; blurb: string }[] = [
  { key: "lumbar", label: "Low back", blurb: "The lumbar itself. We sort toward the lowest load your role carries." },
  { key: "si", label: "SI joint", blurb: "The pelvis seam. Symmetric, supported geometry tends to spare it." },
  { key: "sciatic", label: "Sciatic / glute", blurb: "Radiating leg pain. Neutral, low-flexion shapes tend to spare it." },
  { key: "hip", label: "Hip / groin", blurb: "Impingement and groin. Shallow hip flexion tends to spare it." },
  { key: "thoracic", label: "Upper back", blurb: "The mid and upper back. Upright, breath-led shapes tend to spare it." },
];

/** Upright, breath-led geometry tends to spare the upper back; a headboard
 *  or counter grip pulls the thoracic into extension. Heuristic, not a finding. */
export function sparesThoracic(p: Position): boolean {
  return p.breathAccess >= 4 && !/headboard|hands on (the )?(counter|headboard)/i.test(p.name);
}

/** Which back areas a position tends to spare. Derived from conditionsFor()
 *  plus the one thoracic heuristic. */
export function painAreasFor(p: Position): PainArea[] {
  const conds = conditionsFor(p);
  const out: PainArea[] = [];
  if (conds.includes("disc") || conds.includes("flare")) out.push("lumbar");
  if (conds.includes("si-joint")) out.push("si");
  if (conds.includes("sciatica")) out.push("sciatic");
  if (conds.includes("hip")) out.push("hip");
  if (sparesThoracic(p)) out.push("thoracic");
  return out;
}
