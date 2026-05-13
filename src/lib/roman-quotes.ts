/**
 * Weird quotes from Roman rulers — and a few anecdotes about them — used to
 * distract the user during their eight-minute session.
 *
 * Voice rule for new entries: the joke is in the framing, not the punchline.
 * Quotations are accurate (Suetonius, Tacitus, Dio Cassius, the SHA — caveat
 * for ancient sourcing). Anecdotes are reported, not invented. We are not
 * making fun of the emperor. We are making fun of the wellness industry's
 * conviction that you must be Present during a curl-up.
 */

export type RomanQuote = {
  id: string;
  text: string;
  attribution: string;
  reignedFrom: string;
  reignedTo: string;
  // One short observational line. Often the funny part.
  note?: string;
  kind: "quote" | "anecdote";
};

export const ROMAN_QUOTES: RomanQuote[] = [
  {
    id: "caligula-one-neck",
    text: "Would that the Roman people had but one neck.",
    attribution: "Caligula",
    reignedFrom: "AD 37",
    reignedTo: "AD 41",
    note: "Reportedly said when he wished he could behead them all at once. Held the office for forty-three months.",
    kind: "quote",
  },
  {
    id: "vespasian-stink",
    text: "Pecunia non olet.",
    attribution: "Vespasian",
    reignedFrom: "AD 69",
    reignedTo: "AD 79",
    note: "\"Money does not stink.\" Said while defending his tax on the urine collected from Rome's public toilets, used by laundries to bleach togas. When his son Titus objected, Vespasian held a gold coin to his nose and asked whether it smelled.",
    kind: "quote",
  },
  {
    id: "vespasian-god",
    text: "Vae, puto deus fio.",
    attribution: "Vespasian",
    reignedFrom: "AD 69",
    reignedTo: "AD 79",
    note: "\"Oh dear, I think I'm becoming a god.\" Last words. He had spent ten years denying his own divinity. He spent the moment of death being correct about it.",
    kind: "quote",
  },
  {
    id: "tiberius-hate",
    text: "Oderint, dum metuant.",
    attribution: "Tiberius",
    reignedFrom: "AD 14",
    reignedTo: "AD 37",
    note: "\"Let them hate me, so long as they fear me.\" The line is borrowed from a tragedian, but he liked to say it. He retired to Capri for the last decade of his reign and ran the empire by letter.",
    kind: "quote",
  },
  {
    id: "nero-artist",
    text: "Qualis artifex pereo.",
    attribution: "Nero",
    reignedFrom: "AD 54",
    reignedTo: "AD 68",
    note: "\"What an artist dies in me.\" Last words, as he was preparing to take his own life ahead of arriving soldiers. He had been performing on stage for years and considered the senate the more difficult audience.",
    kind: "quote",
  },
  {
    id: "augustus-marble",
    text: "I found Rome a city of bricks and left it a city of marble.",
    attribution: "Augustus",
    reignedFrom: "27 BC",
    reignedTo: "AD 14",
    note: "Reigned for forty-one years. Did not, in fact, leave Rome entirely in marble. The line was mostly a press release.",
    kind: "quote",
  },
  {
    id: "hadrian-soul",
    text: "Animula vagula blandula…",
    attribution: "Hadrian",
    reignedFrom: "AD 117",
    reignedTo: "AD 138",
    note: "\"Little soul, gentle and wandering, where will you now stay?\" His death poem to his own soul. He had also built a wall across Britain to keep the Scots out, which has held up rather better.",
    kind: "quote",
  },
  {
    id: "caligula-strike",
    text: "Strike so that he may feel that he is dying.",
    attribution: "Caligula",
    reignedFrom: "AD 37",
    reignedTo: "AD 41",
    note: "Instructing his executioners. Apparently a craftsman about the work. Was himself stabbed thirty times by his own guard.",
    kind: "quote",
  },
  {
    id: "caligula-seashells",
    text: "Caligula declared war on Neptune.",
    attribution: "Caligula",
    reignedFrom: "AD 37",
    reignedTo: "AD 41",
    note: "He marched his legions to the English Channel, ordered them into battle formation against the sea, then commanded them to gather seashells as \"spoils of the ocean.\" The shells were sent to Rome and displayed in a triumph.",
    kind: "anecdote",
  },
  {
    id: "caligula-horse",
    text: "Caligula appointed his horse a priest.",
    attribution: "Caligula",
    reignedFrom: "AD 37",
    reignedTo: "AD 41",
    note: "The horse, Incitatus, lived in a marble stable, ate from an ivory manger, and was reportedly considered for the consulship. Pliny notes the horse drank wine from a gold cup, which may be the only verifiable detail.",
    kind: "anecdote",
  },
  {
    id: "domitian-flies",
    text: "Not even a fly was with the emperor.",
    attribution: "Domitian",
    reignedFrom: "AD 81",
    reignedTo: "AD 96",
    note: "Suetonius reports Domitian spent hours in a private chamber catching flies and stabbing them with a sharpened stylus. When an attendant was asked whether anyone was with the emperor, the answer was the above.",
    kind: "anecdote",
  },
  {
    id: "elagabalus-roses",
    text: "Elagabalus smothered his dinner guests in roses.",
    attribution: "Elagabalus",
    reignedFrom: "AD 218",
    reignedTo: "AD 222",
    note: "According to the (unreliable) Historia Augusta, he had so many rose petals dropped from the ceiling that several guests suffocated. He was assassinated at eighteen, having ruled four years.",
    kind: "anecdote",
  },
  {
    id: "commodus-gladiator",
    text: "Commodus fought in the Colosseum.",
    attribution: "Commodus",
    reignedFrom: "AD 180",
    reignedTo: "AD 192",
    note: "He insisted on fighting as a gladiator. He always won. The Senate, for the record, was made to attend.",
    kind: "anecdote",
  },
  {
    id: "caesar-three-words",
    text: "Veni, vidi, vici.",
    attribution: "Julius Caesar",
    reignedFrom: "49 BC",
    reignedTo: "44 BC",
    note: "\"I came, I saw, I conquered.\" Sent to the Roman Senate after the Battle of Zela, which had taken three days. The line, not Caesar's most successful campaign, is what survived.",
    kind: "quote",
  },
];

/** A short teaser quote suitable for the dashboard footer. Picks by day-of-year. */
export function todaysQuote(): RomanQuote {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return ROMAN_QUOTES[dayOfYear % ROMAN_QUOTES.length];
}

/** A deterministic-ish rotation for the session player. */
export function quotesForSession(seed = Date.now()): RomanQuote[] {
  // Shuffle deterministically based on the day so a re-run in the same session
  // doesn't loop the same three quotes immediately.
  const arr = [...ROMAN_QUOTES];
  const day = Math.floor(seed / 86400000);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (day * 9301 + i * 49297) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
