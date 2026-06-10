/**
 * Distractions · short, dry, observational entries used to keep the user's
 * mind occupied during the eight-minute session.
 *
 * Four rotating themes. The brand voice does not change between them. The
 * joke is always in the framing.
 */

export type DistractionTheme = "roman" | "medical" | "wellness" | "saints";

export type Distraction = {
  id: string;
  theme: DistractionTheme;
  text: string;
  attribution: string;
  era: string;
  note?: string;
  kind?: "quote" | "anecdote" | "fact";
};

export const THEME_LABEL: Record<DistractionTheme, string> = {
  roman: "Roman rulers, in their own words (or close)",
  medical: "Things doctors used to do, on purpose",
  wellness: "The wellness industry · greatest hits, by year",
  saints: "Saints who took it too far · adherence is not the protocol",
};

export const THEME_SOURCES: Record<DistractionTheme, string> = {
  roman: "Suetonius · Tacitus · Dio Cassius · the Historia Augusta · all reasonably unreliable",
  medical: "Cited in The Lancet, JAMA, and various pamphlets later quietly withdrawn",
  wellness: "Advertised at the time · contemporaneous newspaper coverage · later, the FDA",
  saints: "Vatican hagiographies · Acta Sanctorum · medieval chroniclers who were also reasonably unreliable",
};

export const DISTRACTIONS: Distraction[] = [
  /* ───────── Roman rulers ───────── */
  {
    id: "caligula-one-neck",
    theme: "roman",
    text: "Would that the Roman people had but one neck.",
    attribution: "Caligula",
    era: "AD 37–41",
    note: "Reportedly said when he wished he could behead them all at once. Held the office for forty-three months.",
    kind: "quote",
  },
  {
    id: "vespasian-stink",
    theme: "roman",
    text: "Pecunia non olet.",
    attribution: "Vespasian",
    era: "AD 69–79",
    note: "\"Money does not stink.\" Said while defending his tax on urine collected from Rome's public toilets, used by laundries to bleach togas. When his son Titus objected, Vespasian held a gold coin to his nose and asked whether it smelled.",
    kind: "quote",
  },
  {
    id: "vespasian-god",
    theme: "roman",
    text: "Vae, puto deus fio.",
    attribution: "Vespasian",
    era: "AD 69–79",
    note: "\"Oh dear, I think I'm becoming a god.\" Last words. He had spent ten years denying his own divinity. He spent the moment of death being correct about it.",
    kind: "quote",
  },
  {
    id: "nero-artist",
    theme: "roman",
    text: "Qualis artifex pereo.",
    attribution: "Nero",
    era: "AD 54–68",
    note: "\"What an artist dies in me.\" Last words, ahead of arriving soldiers. He had been performing on stage for years and considered the Senate the more difficult audience.",
    kind: "quote",
  },
  {
    id: "caligula-seashells",
    theme: "roman",
    text: "Caligula declared war on Neptune.",
    attribution: "Caligula",
    era: "AD 37–41",
    note: "He marched his legions to the English Channel, ordered them into battle formation against the sea, then commanded them to gather seashells as 'spoils of the ocean.' The shells were sent to Rome and displayed in a triumph.",
    kind: "anecdote",
  },
  {
    id: "caligula-horse",
    theme: "roman",
    text: "Caligula appointed his horse a priest.",
    attribution: "Caligula",
    era: "AD 37–41",
    note: "The horse, Incitatus, lived in a marble stable, ate from an ivory manger, and was reportedly considered for the consulship. Pliny notes the horse drank wine from a gold cup, which may be the only verifiable detail.",
    kind: "anecdote",
  },
  {
    id: "domitian-flies",
    theme: "roman",
    text: "Not even a fly was with the emperor.",
    attribution: "Domitian",
    era: "AD 81–96",
    note: "Suetonius reports Domitian spent hours in a private chamber catching flies and stabbing them with a sharpened stylus. When an attendant was asked whether anyone was with the emperor, the answer was the above.",
    kind: "anecdote",
  },
  {
    id: "elagabalus-roses",
    theme: "roman",
    text: "Elagabalus smothered his dinner guests in roses.",
    attribution: "Elagabalus",
    era: "AD 218–222",
    note: "According to the (unreliable) Historia Augusta, he had so many rose petals dropped from the ceiling that several guests suffocated. He was assassinated at eighteen, having ruled four years.",
    kind: "anecdote",
  },

  /* ───────── Defunct medical theories ───────── */
  {
    id: "bloodletting",
    theme: "medical",
    text: "Bloodletting was the front-line treatment for nearly everything.",
    attribution: "Hippocrates et al.",
    era: "ca. 400 BC – AD 1900",
    note: "Used to treat coughs, headaches, fever, infections, melancholy, and (often) being a woman. The theory was that imbalanced humours caused disease. The practice persisted for 2,300 years before anyone seriously asked whether it was working.",
    kind: "fact",
  },
  {
    id: "lobotomy-nobel",
    theme: "medical",
    text: "The lobotomy won a Nobel Prize.",
    attribution: "Egas Moniz",
    era: "1949",
    note: "The Karolinska Institute gave Moniz the prize for inventing the prefrontal leucotomy. Walter Freeman, the American who popularised it, performed his version with an ice pick through the eye socket. The Nobel committee has, to date, declined to revoke it.",
    kind: "fact",
  },
  {
    id: "mercury-cure",
    theme: "medical",
    text: "Mercury was prescribed for syphilis, melancholy, and constipation.",
    attribution: "Various physicians",
    era: "ca. 1500 – 1940s",
    note: "Caused tremors, tooth loss, kidney failure, and death. Was considered, on balance, an improvement over untreated syphilis. The phrase 'mad as a hatter' refers to the felt-makers who used mercury and went mad.",
    kind: "fact",
  },
  {
    id: "cocaine-coke",
    theme: "medical",
    text: "Cocaine was in Coca-Cola.",
    attribution: "Pemberton's formula",
    era: "1886 – 1903",
    note: "Marketed as a brain tonic and a nerve cure. The 'Coca' was real, the leaf, until pressure from the temperance movement forced its removal. The 'Cola' was the kola nut, for caffeine, and remained.",
    kind: "fact",
  },
  {
    id: "heroin-cough",
    theme: "medical",
    text: "Heroin was sold over the counter for children's coughs.",
    attribution: "Bayer Pharmaceutical",
    era: "1898 – 1910s",
    note: "Marketed as non-addictive (it wasn't) and a safer alternative to morphine (it wasn't). The brand name was a marketing decision derived from 'heroisch,' German for heroic. Discontinued when the dependence numbers became impossible to ignore.",
    kind: "fact",
  },

  /* ───────── Wellness industry, greatest hits ───────── */
  {
    id: "radithor",
    theme: "wellness",
    text: "Radithor was radium-infused water, sold as a tonic for general malaise.",
    attribution: "Bailey Radium Laboratories",
    era: "1925 – 1932",
    note: "Endorsed by wealthy industrialist Eben Byers, who drank three bottles a day. His jaw fell off in 1932. The Wall Street Journal headline read: 'The Radium Water Worked Fine Until His Jaw Came Off.'",
    kind: "fact",
  },
  {
    id: "tapeworm-diet",
    theme: "wellness",
    text: "The tapeworm diet was a real thing, briefly endorsed.",
    attribution: "Various weight-loss pamphlets",
    era: "ca. 1900 – 1925",
    note: "Pills containing live tapeworm eggs, sold to women who wanted to eat what they wanted. The tapeworm would, in theory, consume the excess calories. In practice it consumed other things (organs, mostly) and had to be flushed out with toxic anti-parasitic regimens.",
    kind: "fact",
  },
  {
    id: "more-doctors-camels",
    theme: "wellness",
    text: "\"More doctors smoke Camels than any other cigarette.\"",
    attribution: "Camel cigarettes",
    era: "1946 – 1953",
    note: "An actual marketing campaign, with an actual survey behind it. The survey was conducted at medical conventions where R. J. Reynolds had handed out free packs of Camels at the door. The campaign ran for seven years.",
    kind: "quote",
  },
  {
    id: "vitaminwater-defense",
    theme: "wellness",
    text: "\"No reasonable consumer would believe Vitaminwater to be a health drink.\"",
    attribution: "Coca-Cola's legal team",
    era: "2010, lawsuit defense",
    note: "Coca-Cola was sued for marketing a 30g-of-sugar beverage as a health drink. Their defence, filed in court, was that no reasonable person would interpret the word 'vitamin' on the bottle of a sugar drink as a health claim. The court initially declined to dismiss the case. They settled in 2016.",
    kind: "quote",
  },
  {
    id: "vibrating-belts",
    theme: "wellness",
    text: "Vibrating belt machines were sold to shake the fat off.",
    attribution: "Reducing salons, then home gyms",
    era: "1920s – 1960s",
    note: "A wide canvas belt vibrated around the user's waist while they stood and read a magazine. Sold to gyms and homes for forty years. Nobody got thinner. Many got bruised. The marketing endorsed it; the FDA, eventually, did not.",
    kind: "fact",
  },
  {
    id: "jade-egg",
    theme: "wellness",
    text: "The jade egg was sold as a $66 cure for, among other things, hormonal imbalance.",
    attribution: "A wellness brand we will not name",
    era: "2017 – 2018",
    note: "Marketed to be worn internally. The brand paid $145,000 to settle false-advertising charges from the state of California. The egg remains for sale at the original price. The hormonal-imbalance claim does not.",
    kind: "fact",
  },

  /* ───────── Saints who took it too far ───────── */
  {
    id: "simeon-pillar",
    theme: "saints",
    text: "Simeon Stylites lived on top of a pillar for thirty-seven years.",
    attribution: "Saint Simeon the Elder",
    era: "AD 423 – 459",
    note: "It started at nine feet. He kept adding height. Disciples brought him food on ropes. Pilgrims travelled hundreds of miles to consult him. He died standing up. Adherents include, sensibly, nobody.",
    kind: "anecdote",
  },
  {
    id: "catherine-eucharist",
    theme: "saints",
    text: "Catherine of Siena ate only the Eucharist for the last eight years of her life.",
    attribution: "Saint Catherine of Siena",
    era: "Died 1380, aged 33",
    note: "Modern historians call it 'holy anorexia.' She also wrote 382 letters, convinced Pope Gregory XI to move back to Rome from Avignon, and was made a Doctor of the Church in 1970. Many things at once.",
    kind: "anecdote",
  },
  {
    id: "suso-nails",
    theme: "saints",
    text: "Henry Suso wore a hair shirt with 150 nails turned inward.",
    attribution: "Blessed Henry Suso",
    era: "d. 1366",
    note: "He also slept on a wooden cross with thirty more nails. He kept the practice for sixteen years. Eventually stopped, citing a vision. The vision, presumably, was common sense.",
    kind: "anecdote",
  },
  {
    id: "christina-astonishing",
    theme: "saints",
    text: "Christina the Astonishing reportedly levitated at her own funeral.",
    attribution: "Saint Christina the Astonishing",
    era: "d. AD 1224",
    note: "She is said to have climbed trees to escape the smell of unbaptized humans, lived on the milk of her own miraculous lactation, and rolled in fire without burning. The Vatican has not formally confirmed any of this. She remains a venerated saint regardless.",
    kind: "anecdote",
  },
  {
    id: "rose-of-lima",
    theme: "saints",
    text: "Saint Rose of Lima rubbed pepper on her face to ruin her own beauty.",
    attribution: "Saint Rose of Lima",
    era: "d. 1617",
    note: "When pepper failed she added quicklime. She wore a crown of silver thorns under her veil. The first canonised saint of the Americas. Patron of, among other things, gardeners.",
    kind: "anecdote",
  },

  /* ───────── Expansion pass · 20 new entries · May 2026 ───────── */

  /* Roman, +5 */
  {
    id: "caligula-horse-senator",
    theme: "roman",
    text: "Caligula made his horse a senator.",
    attribution: "Suetonius",
    era: "AD 37 – 41",
    note: "Incitatus had a stable of marble, ivory plates at dinner, and was rumoured for the consulship. The vote was overtaken by Caligula's assassination, by his own guard, in a palace tunnel. The horse outlived the emperor.",
    kind: "anecdote",
  },
  {
    id: "nero-talent-show",
    theme: "roman",
    text: "Nero performed at his own talent show.",
    attribution: "Nero",
    era: "Naples, AD 65",
    note: "The doors were locked. Women gave birth in the audience. Men feigned death to be carried out. Soldiers patrolled the rows recording reactions. Reception was reportedly mixed. Critics were later remembered, by name.",
    kind: "anecdote",
  },
  {
    id: "tiberius-capri",
    theme: "roman",
    text: "Tiberius retired to Capri and never came back.",
    attribution: "Tiberius",
    era: "AD 26 – 37",
    note: "The Senate kept legislating without him for eleven years. The Empire ran itself. He died at Misenum, possibly smothered with a pillow by the Prefect of the Guard, who had grown impatient. The Senate did not commission a portrait.",
    kind: "anecdote",
  },
  {
    id: "elagabalus-whoopee",
    theme: "roman",
    text: "Elagabalus may have invented the whoopee cushion.",
    attribution: "Historia Augusta",
    era: "AD 218 – 222",
    note: "He installed mechanisms under the dinner couches that made noises during state banquets. He also smothered guests with rose petals from a panelled ceiling, married a Vestal Virgin, and was assassinated at eighteen. The historians made no attempt to seem sad.",
    kind: "anecdote",
  },
  {
    id: "commodus-treasury",
    theme: "roman",
    text: "Commodus charged the treasury one million sesterces per gladiatorial appearance.",
    attribution: "Commodus",
    era: "AD 180 – 192",
    note: "He decapitated an ostrich in the arena and brandished the head at the senators in the front row, who were required, by edict, to applaud. He was strangled in his bath by his wrestling partner the next year. The Senate's first act was to repeal his statues.",
    kind: "anecdote",
  },

  /* Medical, +5 */
  {
    id: "heroin-cough-bayer",
    theme: "medical",
    text: "Bayer marketed heroin as a cough suppressant for children.",
    attribution: "Bayer Pharmaceutical",
    era: "1898 – 1910",
    note: "The bottle was branded 'the sedative for coughs' and sat on pharmacy shelves next to Bayer's other invention of that year, aspirin. The advertising specified it was non-addictive. Bayer were occasionally wrong.",
    kind: "fact",
  },
  {
    id: "wagner-malaria-nobel",
    theme: "medical",
    text: "Wagner-Jauregg won a Nobel for treating syphilis with malaria.",
    attribution: "Julius Wagner-Jauregg",
    era: "1927",
    note: "He infected paretic patients with Plasmodium vivax, induced a fever above 41°C, and treated the resulting malaria with quinine after a few cycles. The syphilis did die. So did 15 percent of the patients. The prize was awarded for the survivors.",
    kind: "fact",
  },
  {
    id: "shoe-fluoroscope",
    theme: "medical",
    text: "X-ray fluoroscopes were installed in shoe shops to confirm fit.",
    attribution: "Various retailers",
    era: "1920s – 1950s",
    note: "Children stood inside while parents looked at the bones of their feet through a viewer. Two of the three viewers were positioned for staff. Average exposure was around 13 roentgens per fitting. The annual maximum now recommended for adults is 0.5.",
    kind: "fact",
  },
  {
    id: "washington-bled",
    theme: "medical",
    text: "George Washington was bled four times in twelve hours and died of it.",
    attribution: "Three attending physicians",
    era: "December 14, 1799",
    note: "Diagnosis was acute epiglottitis. The treatment, agreed by three physicians, was to remove 124 ounces of blood, approximately 40 percent of his circulating volume. The hour of death is recorded. The medical consensus is not.",
    kind: "fact",
  },
  {
    id: "steedman-mercury",
    theme: "medical",
    text: "Mercury was given to children for teething.",
    attribution: "Steedman's Soothing Powders",
    era: "On UK pharmacy shelves until 1956",
    note: "Symptoms of mercury poisoning in infants were known at the time as 'pink disease.' The link was established in 1948. The product remained on shelves for eight years after.",
    kind: "fact",
  },

  /* Wellness, +5 */
  {
    id: "master-cleanse",
    theme: "wellness",
    text: "The Master Cleanse is lemon juice, maple syrup and cayenne pepper, drunk for ten days.",
    attribution: "Stanley Burroughs",
    era: "1940",
    note: "Originally prescribed for stomach ulcers, which it does not treat. Popularised in 2006 by Beyoncé, for a film role. The weight loss is mostly water and offence to the colon. The colon recovers; the supplement aisle, less so.",
    kind: "fact",
  },
  {
    id: "ear-candles",
    theme: "wellness",
    text: "Ear candling is a hollow cone of beeswax inserted into the ear and lit at the other end.",
    attribution: "FDA Consumer Safety Alert",
    era: "February 2010",
    note: "When cut open afterwards, the cone contains a brown residue often presented to the patient as 'extracted earwax.' Identical residue forms in candles lit on a tabletop, with no ear nearby. The FDA tally of burns is in the low hundreds.",
    kind: "fact",
  },
  {
    id: "activated-charcoal",
    theme: "wellness",
    text: "Activated charcoal absorbs whatever passes through it, including the medications you took that morning.",
    attribution: "2018 wellness boom",
    era: "2018",
    note: "It appeared in lemonade, in toothpaste, in pizza crust, in face wash, and briefly in a cocktail menu in Brooklyn. Poison-control centres reissued a guideline that year reminding the public it was a treatment for acute toxin exposure, not a beverage trend.",
    kind: "fact",
  },
  {
    id: "bulletproof-coffee",
    theme: "wellness",
    text: "Bulletproof coffee is butter and oil blended into espresso.",
    attribution: "Dave Asprey",
    era: "2011",
    note: "The origin story attaches the recipe to a yak-butter tea served in a guesthouse near Mount Kailash. The actual recipe is salted butter and MCT oil. The mountain has not been asked to comment.",
    kind: "fact",
  },
  {
    id: "goop-jade-eggs-second",
    theme: "wellness",
    text: "Goop sold $66 jade eggs to be placed inside the vagina.",
    attribution: "Goop",
    era: "2017",
    note: "The marketing copy claimed they balanced hormones and improved bladder control. The FTC fined the company $145,000 the following year for unsubstantiated claims. The eggs remained on sale, relabelled. The fine settled out of a single weekend's revenue.",
    kind: "fact",
  },

  /* Saints, +5 */
  {
    id: "catherine-pus",
    theme: "saints",
    text: "Saint Catherine of Siena drank the pus from a sick woman's wound, to test her own humility.",
    attribution: "Saint Catherine of Siena",
    era: "Italy, AD 1370s",
    note: "She wrote about it in a letter afterwards, noting that the taste had not bothered her. She fasted to death three years later, aged thirty-three. She is the patron saint of Italy.",
    kind: "anecdote",
  },
  {
    id: "wilgefortis",
    theme: "saints",
    text: "Saint Wilgefortis prayed to escape an arranged marriage and grew a beard.",
    attribution: "Saint Wilgefortis",
    era: "Twelfth century, somewhere in Iberia",
    note: "The prayer was answered overnight. Her father, the King of Portugal, had her crucified. Her body remained on the cross. Patron saint, by tradition, of women who would rather not.",
    kind: "anecdote",
  },
  {
    id: "joseph-cupertino",
    theme: "saints",
    text: "Saint Joseph of Cupertino levitated, often, in public.",
    attribution: "Saint Joseph of Cupertino",
    era: "AD 1603 – 1663",
    note: "The Vatican records describe him rising during Mass and getting stuck in the rafters. He was moved repeatedly to less popular monasteries to limit witnesses. He was canonised anyway. The rafter problem is not addressed in current liturgy.",
    kind: "anecdote",
  },
  {
    id: "christina-coffin",
    theme: "saints",
    text: "Saint Christina the Astonishing rose from her own coffin during her own funeral.",
    attribution: "Saint Christina the Astonishing",
    era: "Liège, AD 1150 – 1224",
    note: "She flew to the church beams and refused to come down, citing the unbearable smell of the human bodies in the pews below. Her account is preserved in the Acta Sanctorum. The bishop signed.",
    kind: "anecdote",
  },
  {
    id: "lucy-syracuse",
    theme: "saints",
    text: "Saint Lucy plucked out her own eyes to discourage a suitor.",
    attribution: "Saint Lucy",
    era: "Roman Sicily, AD 304",
    note: "She presented them to him on a plate. He was reportedly impressed but not deterred; she was killed shortly afterwards. She is depicted in art holding a plate of two eyes, which look up. Patron saint of the blind, of eye disorders, and in some regions of salesmen.",
    kind: "anecdote",
  },
];

/* ───────── Selection helpers ───────── */

export function todaysDistraction(): Distraction {
  const day = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return DISTRACTIONS[day % DISTRACTIONS.length];
}

/** Build a session deck that interleaves the four themes so users see variety. */
export function distractionsForSession(): Distraction[] {
  const buckets: Record<DistractionTheme, Distraction[]> = {
    roman: DISTRACTIONS.filter((d) => d.theme === "roman"),
    medical: DISTRACTIONS.filter((d) => d.theme === "medical"),
    wellness: DISTRACTIONS.filter((d) => d.theme === "wellness"),
    saints: DISTRACTIONS.filter((d) => d.theme === "saints"),
  };
  const day = Math.floor(Date.now() / 86400000);
  // Light shuffle inside each bucket by day-of-year.
  for (const k of Object.keys(buckets) as DistractionTheme[]) {
    const arr = buckets[k];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (day * 9301 + i * 49297) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Interleave: roman, medical, wellness, saints, roman, ...
  const order: DistractionTheme[] = ["roman", "medical", "wellness", "saints"];
  const out: Distraction[] = [];
  const max = Math.max(...Object.values(buckets).map((b) => b.length));
  for (let i = 0; i < max; i++) {
    for (const t of order) {
      const d = buckets[t][i];
      if (d) out.push(d);
    }
  }
  return out;
}
