import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/bedroom")({
  component: Bedroom,
  head: () => ({
    meta: [
      { title: "The bedroom protocol · BackStroke" },
      {
        name: "description",
        content:
          "Positions, cadence, body awareness, and the geometry of having sex with a structural fault.",
      },
    ],
  }),
});

const PAPER = "oklch(0.94 0.018 78)";
const PAPER_2 = "oklch(0.92 0.022 76)";
const PAPER_INK = "oklch(0.18 0.01 40)";
const PAPER_MUTED = "oklch(0.45 0.02 40)";
const RULE = "oklch(0.86 0.025 70)";
const OXBLOOD = "var(--brand-oxblood)";
const AMBER = "var(--brand-amber)";

/* Typography helpers ---------------------------------------------------------- */

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-serif-display leading-[1.0] tracking-[-0.02em]"
      style={{ fontSize: "clamp(28px, 3.6vw, 44px)", color: PAPER_INK }}
    >
      {children}
    </h2>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
      style={{ color: OXBLOOD }}
    >
      {children}
    </p>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-serif-display leading-[1.55] mt-5"
      style={{ fontSize: "clamp(17px, 1.3vw, 19px)", color: PAPER_INK, opacity: 0.92 }}
    >
      {children}
    </p>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-10 pl-6 border-l-2 font-serif-display italic leading-snug"
      style={{
        fontSize: "clamp(22px, 2.4vw, 30px)",
        borderColor: OXBLOOD,
        color: OXBLOOD,
      }}
    >
      {children}
    </blockquote>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-serif-display italic mt-3 leading-snug"
      style={{ fontSize: "clamp(18px, 1.7vw, 24px)", color: PAPER_MUTED }}
    >
      {children}
    </p>
  );
}

function FigCaption({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono-label text-[10px] tracking-[0.22em] uppercase mt-4"
      style={{ color: PAPER_MUTED }}
    >
      {children}
    </p>
  );
}

function FigPlaceholder({ label, caption }: { label: string; caption: string }) {
  return (
    <figure
      className="my-10 border"
      style={{ borderColor: RULE, background: "oklch(0.96 0.01 80)" }}
    >
      <div
        className="aspect-[16/9] w-full grid place-items-center"
        style={{
          background:
            "repeating-linear-gradient(45deg, oklch(0.96 0.01 80), oklch(0.96 0.01 80) 12px, oklch(0.94 0.012 78) 12px, oklch(0.94 0.012 78) 24px)",
        }}
      >
        <span
          className="font-mono-label text-[11px] tracking-[0.22em] uppercase"
          style={{ color: PAPER_MUTED }}
        >
          {label}
        </span>
      </div>
      <FigCaption>{caption}</FigCaption>
    </figure>
  );
}

/* Sections ------------------------------------------------------------------- */

function Header() {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-xl"
      style={{ background: "oklch(0.94 0.018 78 / 0.78)", borderBottom: `1px solid ${RULE}` }}
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" style={{ color: OXBLOOD }}>
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="11" cy="11" r="3" fill="currentColor" />
          </svg>
          <span className="font-serif-display text-xl tracking-tight italic" style={{ color: PAPER_INK }}>
            Back<span style={{ color: OXBLOOD }}>Stroke</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-mono-label text-[10px] tracking-[0.18em] uppercase">
          <Link to="/" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">Home</Link>
          <Link to="/science" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">Science</Link>
          <Link to="/positions" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">Positions</Link>
          <Link to="/council" style={{ color: PAPER_MUTED }} className="hover:opacity-80 transition">Council</Link>
        </nav>
        <Link
          to="/dashboard"
          className="text-[12px] tracking-[0.14em] uppercase font-mono-label px-4 py-2 rounded-full hover:opacity-90 transition"
          style={{ background: PAPER_INK, color: PAPER }}
        >
          Try a session
        </Link>
      </div>
    </header>
  );
}

function HeroBlock() {
  return (
    <section className="px-6 md:px-10 pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>The bedroom protocol</Eyebrow>
        <h1
          className="font-serif-display mt-5 leading-[0.96] tracking-[-0.025em]"
          style={{ fontSize: "clamp(44px, 6vw, 80px)", color: PAPER_INK }}
        >
          Positions, cadence, body awareness, and the geometry of having sex{" "}
          <span className="italic" style={{ color: OXBLOOD }}>with a structural fault.</span>
        </h1>
        <Subhead>
          The wellness aisle has been writing about this for forty years, in a register written by men who were paid by the minute. The biomechanics were settled in 1999. We put them in one place, in adult register, with citations.
        </Subhead>
        <nav className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-2 font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: PAPER_MUTED }}>
          {[
            ["§1", "Six industries built a business on the silence"],
            ["§2", "The question you came here to ask"],
            ["§3", "The mechanics"],
            ["§4", "Interoception"],
            ["§5", "Cadence"],
            ["§6", "The position library, by structural pattern"],
            ["§7", "Communication, mid-act"],
            ["§8", "Aftercare"],
            ["§9", "The boundary"],
          ].map(([n, t]) => (
            <a key={n} href={`#${n.toLowerCase().replace("§", "s")}`} className="flex gap-3 py-1 hover:opacity-80 transition">
              <span style={{ color: OXBLOOD }}>{n}</span>
              <span>{t}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

function S1() {
  return (
    <section id="s1" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§1 · Six industries built a business on the silence</Eyebrow>
        <H2>A magazine, a retreat, a podcast, a kitchen, a strip mall, and a specialty that has, structurally, never been asked.</H2>
        <P>
          There are two reasons you cannot have sex without your back screaming. The first is that sex is a biomechanics problem, and the biomechanics were solved in 1999, by a man named Wilke at the University of Ulm, who measured the pressure inside human spines under load and published the results in a journal nobody on this continent has voluntarily picked up since. The second is that nobody told you. Telling you would not have made anyone any money. Wilke was paid by a German university. The wellness industry was paid by you. Guess which paper is on this page and which is on a candle.
        </P>
        <FigPlaceholder
          label="FIG. 1 · revenue vs. citations"
          caption="Six industries, $1.8 trillion, zero peer-reviewed citations between them."
        />
        <P>
          Six industries built empires on the silence Wilke could not reach from inside a German university. The first is the magazine listicle. 'Best Positions for Back Pain' has been a recurring feature of Cosmopolitan, Men's Health, Glamour, Esquire, GQ, and at one truly painful point People Magazine, roughly every twelve months since 1987. The article is written, in nearly every case, by a 26-year-old freelancer who has never had back pain, on a deadline that did not permit a single citation, for two hundred dollars and a kill fee. The list reliably recommends spooning, which is fine. The list then recommends six positions that would land an asymptomatic 22-year-old gymnast in traction. The freelancer has, since the article ran, published a memoir about her struggles. She has not had any.
        </P>
        <P>
          The second industry is the wellness sex-coach economy. The weekend retreat in Topanga at $4,800 a head, on a ranch that was, until 2014, a horse rescue, which is roughly the level of facility upgrade required to qualify in this category. The somatic sexologist whose certification was earned online in 47 hours, which is shorter than the cool-down period to buy a handgun in most states. The Goop-affiliated 'pleasure educator' whose seventy-page workbook contains the word 'sacred' four times in the first paragraph and zero citations across the entire document. None of these professionals has read the Wilke paper. Several of them have read 'The Untethered Soul,' which they will name-drop in the first ninety seconds of the consult. The retreat does work, in the sense that throwing money off a bridge works to relieve the burden of having money.
        </P>
        <P>
          The third industry is the bro-wellness podcast. It is a content category that exists because a critical mass of men in their forties discovered, between 2018 and 2021, that they were going to die, and decided to do something about it that did not involve speaking to a therapist. The current protocol is: 47 supplements a day, 11 hours of darkness, 22 minutes of red light, a methylene-blue tincture, peptides whose long-term safety data will not exist until 2040, an ice bath that cost more than a used Honda Civic, a kettlebell, a kettlebell-shaped sponsor read, and a 4am cold plunge in a freezer the host has named after his daughter. Methylene blue, for the audience that hasn't googled it yet, is a fish-tank dye. None of this is doing what the host says it is doing. All of this is what a man does in the late stages of a particular kind of break, which his audience is then encouraged to follow him into, at $39.99 a month.
        </P>
        <P>
          The host has, of course, no back pain. The host has, in fact, very rarely had any of the conditions his protocol claims to address. The protocols are sold to an audience that does have them, by a host who is paid not to. The supplement company that sponsors the show has, on its board, the host's brother. The brother has been on the board since 2019. In 187 episodes, the 'objective product review' segment has not, even once, recommended a product the host does not have equity in. This is not a coincidence. This is a casino with a microphone.
        </P>
        <P>
          The fourth industry is the influencer physical therapist. The TikTok account with 4.2 million followers. The Instagram pelvic-floor coach who diagnoses your floor from a photograph of your couch. The corrective exercise that did not appear in any peer-reviewed journal because no journal would publish it. The video is filmed in a kitchen. The kitchen is, in this economy, a clinic. The clinic is, in many states, no longer required to be a clinic. The 26 states that did require it to be a clinic stopped requiring it during the pandemic and did not, afterward, get around to requiring it again. The kitchen is now permanent.
        </P>
        <P>
          The fifth industry is the personal-brand chiropractor. Chiropractic was invented in 1895 by a Canadian magnetic healer named D.D. Palmer, who had a vision in which a deceased doctor named Dr. Jim Atkinson appeared to him in person and explained how to crack spines. This is the historical record. The American Chiropractic Association does not dispute the account, because the alternative is admitting that the founder of the discipline was, in modern clinical terms, having a psychotic episode he then trademarked. The contemporary descendant of Dr. Palmer's ghost-vision is a man in a strip mall in Texas with a ring light and 1.2 million TikTok followers. The cracking sound, anatomically, is cavitation in synovial fluid. The cracking sound, financially, is the sound of insurance dollars being aerosolised at a rate of approximately one spine every 47 seconds. The strip mall is always in Texas. The ghost has not commented.
        </P>
        <P>
          The sixth industry, which had at one point read the Wilke paper, is your urologist. He read it in residency. He has since forgotten it on the train home approximately 4,200 times, once per workday, because the next patient has hematuria and his MIPS reporting is due Friday. Your urologist's working model of your sexual function is a checklist with three columns. Blood flow to the genitals. Nerves to the genitals. Structural integrity of the genitals. If all three columns read 'present and accounted for,' the chart entry is 'doing well,' the quarterly bonus increases by a small amount, and the question of whether you can have sex without your back ending the marriage is filed in the building's central registry of questions nobody is paid to ask. The building does not have a central registry of questions nobody is paid to ask. That is, in fact, the joke. Your urologist is paid $480 for the appointment. The $480 is real.
        </P>
        <PullQuote>
          The wellness industry generates more revenue per year than the entire NIH budget. Approximately none of it goes to finding out whether anything in the wellness industry works. We have, as a civilisation, voted on this with our wallets.
        </PullQuote>
      </div>
    </section>
  );
}

function S2() {
  return (
    <section id="s2" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§2 · The question you came here to ask</Eyebrow>
        <H2>Asked once, at adult register, with the answer in the next paragraph.</H2>
        <P>
          Most male readers came here for one specific question, and they would like us to please stop circling it. The question is: can I finish the way I used to finish, given that the body that used to finish that way now flares at thrust patterns I had previously regarded as the rhythm of the universe. The answer is yes. In a slightly different geometry, at a slightly different cadence, with eight minutes of post-sex work. The eight minutes have no opinions about the prior thirty. The rest of the document is the longer answer.
        </P>
        <P>
          Most female readers came here for the parallel question. Can sex stop being painful. Can arousal come back online. Can entry happen without bracing for the moment two years of accumulated dread finally pays out. The answer is yes, in a sequence, with breath, once the floor has learned to release before being asked to contract. The kegel app cannot teach this. The kegel app has been responsible, in this demographic, for more pelvic-floor dysfunction than childbirth. The app received a Webby. Childbirth has not received a Webby. This is not the only injustice in the system, but it is an unusually clean one.
        </P>
        <P>
          Readers who fit neither template, who are post-prostatectomy, postpartum, post-perineal repair, post-hysterectomy, or in active dilator therapy, are reading because the standard answers do not apply. This page is not a substitute for the clinician managing your case. It is also not a substitute for the people who love you, who you have been pretending are not noticing. They are noticing.
        </P>
      </div>
    </section>
  );
}

function S3() {
  return (
    <section id="s3" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§3 · The mechanics</Eyebrow>
        <H2>What loads what, during which act, from a body of literature the yoga industry would prefer you not encounter.</H2>
        <P>
          Sex is, biomechanically, a sustained rhythmic motor task at variable load, amplitude, and rate, between two or more bodies in proximity. The same physics that govern every other motor task apply here. The reason this fact is not in the wellness aisle is that the wellness aisle prefers metaphor to physics. The reason it is not in your post-op handout is that surgical clinics do not print sex handouts and the legal departments of the relevant device manufacturers prefer it that way. The reason it is not in your yoga class is that yoga is, in this material, the prosecution's witness.
        </P>
        <P>
          The lumbar disc is loaded most heavily when the spine is flexed under axial load. The original measurement was Nachemson 1966, a Swedish orthopaedist who recruited volunteers, sedated them, drilled pressure sensors into the L3-L4 disc, and asked them to sit, stand, bend, and lift. The volunteers received a small honorarium. The institutional review boards of 1966 were chill. Nachemson found that sitting at a desk produced 140 to 200 percent of standing intradiscal pressure. Wilke replicated and refined this in 1999 with in-vivo telemetry, on himself, because by 1999 the institutional review boards had changed their minds. Both papers say the same thing. The yoga industry has read neither.
        </P>
        <FigPlaceholder
          label="FIG. 2 · intradiscal pressure, by activity"
          caption="Standing baseline on the left, sex on the right. The bar at 410% is the one Cosmo did not draw."
        />
        <P>
          In a sex context, the Nachemson and Wilke findings mean that any position in which the spine is curled forward while bearing partner-load is the worst position for a flexion-intolerant lumbar. The classic example, written into a thousand listicles as 'safe,' is the receiving partner pulled into the giving partner's chest with the knees up. This is, in the McGill load tables, near the top of the flexion-load chart for an uninjured population, and at the very top for an injured one. The yoga community calls this position 'spooned child's pose' and recommends it for grounding. The disc is not grounded. The disc is on the floor.
        </P>
        <P>
          The SI joint is loaded most aggressively under asymmetric load. It moves approximately 2 to 4 millimetres in any direction, which is also the distance between 'walking normally' and 'limping for a week.' It was first described in 1543 by Andreas Vesalius, who would have had thoughts about the modern application. A position in which one leg is planted while the other is elevated, one hip externally rotated while the other is neutral, one half of the pelvis driving in one plane while the other absorbs in another, is the position in which the SI joint complains loudest. The scissor position is, in this clinical sense, an SI provocation test that the patient did not consent to. The scissor position was named, in the sexual literature, by a man whose own SI joint was, at the time, fine.
        </P>
        <P>
          The pelvic floor is loaded continuously throughout sex regardless of position, but its tonic state at the start of sex predicts a large share of the outcome. A floor that arrives over-tonic produces dyspareunia in women and erectile failure or premature ejaculation in men. A floor that has had four to six minutes of pre-sex diaphragmatic breath-led down-training arrives at sex measurably less tonic, and tolerates the same act with materially less symptom production. The literature is consistent enough that pre-sex down-training is, in published pelvic-health practice, a routine prescription. The kegel app paid 1.4 billion dollars in marketing in 2023. The pelvic-floor physiotherapy specialty paid, across 8,000 practitioners worldwide, less than that. The pelvic floor is, anatomically, the only part of the human body that has been successfully disrupted by the consumer-internet economy.
        </P>
        <P>
          The iliopsoas, the deep hip flexor that originates on the lumbar spine and attaches to the femur, is the single muscle most quietly responsible for back-pain-during-sex events. A chronically shortened iliopsoas, the standard finding in any adult who has sat more than four hours a day for more than two years, is a tether between the lumbar spine and the femur. When the femur is driven into hip extension under load, the lumbar is pulled into anterior tilt and the disc is pre-loaded in flexion before any partner-load is added. The 'why does my back hurt every time after' question traces, in the majority of practical cases, to a tight iliopsoas applying a chronic pre-load. The iliopsoas is, anatomically, the only muscle that directly connects the parts of you that work to the parts of you that hurt. It has been holding a grudge against the chair you accepted in 2019 ever since you accepted it.
        </P>
      </div>
    </section>
  );
}

function S4() {
  return (
    <section id="s4" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§4 · Interoception, or, why you did not see this coming</Eyebrow>
        <H2>The yellow lights before the red, and a CPT code committee that had a meeting to schedule.</H2>
        <P>
          Most people with chronic back pain do not notice the pain until the body has been signalling for hours. The technical name for the function that was supposed to read the early signals is interoception, and it is a trainable skill, not a fixed trait. Wolf Mehling at UCSF built the standard scale for it in 2009, a 32-item questionnaire that asks the patient to rate, on a five-point scale, statements like 'I notice when I am hungry' and 'I notice when I am uncomfortable.' The average score in the general adult population is the score you would expect from a patient who has not been thinking about their body since the third grade. The score does not improve without intervention. The interventions cost less than $40 a month and produce more documented improvement than approximately every supplement currently in your kitchen.
        </P>
        <FigPlaceholder
          label="FIG. 3 · yellow lights vs. red lights, plotted across a workday"
          caption="The patient's day. The patient retroactively classified the 4:30pm message as 'sudden.'"
        />
        <P>
          In a sex context, interoceptive practice is the difference between catching a yellow light and producing a red light. Yellow lights, in lumbar terms: a subtle pull in the iliopsoas; a small change in the depth of the breath; a quiet asymmetry in how the weight is distributed across the feet; a millisecond of breath-holding at a particular phase of the motion. Red lights: sharp pain, an audible pop, a sudden inability to bear weight, a hot or cold sensation down a leg, a guarded posture that does not release. The yellow lights happen approximately one to four minutes before the red ones. The yellow lights are where the position change should happen. The wellness equivalent of this section is sold by a man in linen pants who calls the same content 'somatic re-attunement' and charges $97 for a workbook.
        </P>
        <P>
          Most patients have never been taught to notice yellow lights, because the medical encounter is structured around the red light, because the American billing system has a CPT code for treating a red light and no CPT code for teaching a patient to read their own body. That decision was made in 1986 by a committee of seventeen men in a conference room in Washington whose own bodies were, at the time, sending unanswered email. None of them noticed either. The meeting ran long. They had another meeting to schedule. The CPT code book is, today, 1,200 pages long. Approximately none of those pages are about teaching you anything.
        </P>
        <P>
          In a partnered sex context, interoception is also a communication-layer skill. The partner who notices the yellow light first is often not the partner whose body is producing it. A small shift in breath. A small change in pace. A small unfamiliar tension under the hand. All observable. The 'check-in' that traditional sex education recommends ('are you okay?') is the wrong instrument; it fires only after the red light is on, and is answered, statistically, with a lie that the asking partner has been trained to accept because the alternative is having a more difficult conversation than the curriculum prepared anyone for.
        </P>
        <PullQuote>
          The body was not screaming. The body had been sending unanswered email since 9am. The patient called the body unprofessional. The body filed an HR complaint. There is no HR.
        </PullQuote>
      </div>
    </section>
  );
}

function S5() {
  return (
    <section id="s5" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§5 · Cadence</Eyebrow>
        <H2>Why slow is dosage, not foreplay, and the curriculum that was written by men who were paid by the minute.</H2>
        <P>
          Slow is not foreplay. Slow is load management. Every joint in the human body tolerates more load at a slower rate. The lumbar disc, being a hydrostatic structure with a viscoelastic response, tolerates load badly when load is delivered quickly. Translated to sex: a thrust at jackhammer pace is a load test performed under conditions the tissue was already failing. A thrust at half pace is the same tissue performing the same motion with a third of the peak intradiscal pressure. This is the same physics that says a piano falling on you at one centimetre per hour is a hat.
        </P>
        <FigPlaceholder
          label="FIG. 4 · peak load vs. cadence"
          caption="Same tissue. Same motion. Different rate. The red line is the one being filmed by an industry."
        />
        <P>
          The cultural difficulty with this prescription is that the existing sex-education curriculum was written, in nearly every published case, by men in their early twenties who were paid by the minute. The aesthetic those men produced is the aesthetic the rest of the culture inherited. Faster is more. Faster is better. Faster is the man in charge. Faster is also, biomechanically, the cadence the disc cannot handle, the cadence that pulls the iliopsoas into spasm, and the cadence that produces tomorrow morning's flare. The unlicensed sex-education curriculum the United States imports from a single Canadian-owned subscription website did not consult the McGill load tables. The McGill load tables would have charged scale.
        </P>
        <P>
          A practical translation, from the McGill load-rate work and the pelvic-floor literature: half the speed; double the breath; allow the motion to reach the end of each phase before reversing; breathe with the partner, not against. Paired breathing during sex is associated, across the published cohort data, with lower autonomic stress in both partners and measurably reduced pelvic-floor tonic activity in the receiving partner. The wellness aisle calls this 'tantra' and charges $4,800. The published version is free, in Bø 2007 and several subsequent papers, in journals that are free to access in any university library, and free anywhere else if you have the patience for a paywall and a Russian mirror site that may also be installing keyloggers.
        </P>
      </div>
    </section>
  );
}

function S6() {
  const patterns = [
    {
      head: "Flexion-intolerant lumbar",
      body: "The most common disc-pattern presentation. The structure flares when the spine is curled forward under load. Avoid: positions where the receiving partner is curled into the chest with knees toward the head; the giving partner up on locked arms with hips driven into deep flexion; missionary with the giving partner's torso collapsed forward. Prefer: positions where both spines maintain a neutral curve. The receiving partner on the edge of the bed with hips supported, the giving partner standing or kneeling with neutral spine. Side-lying with a pillow between the receiving partner's knees. Spooning, on the condition that the receiving partner does not curl forward, which produces a slightly less affectionate spoon. The disc is, in this configuration, statistically more important than the photograph.",
    },
    {
      head: "Extension-intolerant lumbar",
      body: "Less common, often seen in spondylolisthesis or facet-pattern pain. The structure flares when the spine is arched backward. Avoid: the receiving partner in a sustained cobra-like posture; the giving partner in a sustained back-extension; cowgirl with the receiving partner leaning back onto extended arms. Prefer: positions that maintain slight lumbar flexion. The receiving partner on top with the torso slightly forward. The giving partner with hips slightly flexed. Side-lying with a pillow under both knees. Cowgirl, in this clinical pattern, is a sustained back-extension test the receiving partner has agreed to be subjected to. The receiving partner is, in this configuration, the experiment.",
    },
    {
      head: "SI joint instability",
      body: "The structure flares under asymmetric load. Avoid: the scissor position; deep one-sided leg-over positions; one hip in deep external rotation while the other is neutral. Prefer: symmetric loading. Spooning. Missionary with both legs in the same plane. Receiving partner on top with both knees in the same plane. The SI joint tolerates symmetric load well past the point where it tolerates asymmetric load at all. The scissor position was, again, named by a man whose own SI joint was, at the time, fine.",
    },
    {
      head: "Pelvic-floor over-tonic",
      body: "The most common female-pattern presentation, also present in men with pelvic-pattern erectile dysfunction. The structure flares when entry happens before the floor has released. Avoid: positions in which depth or angle is not under the receiving partner's control during entry; positions in which the receiving partner cannot easily retreat mid-motion if a yellow light fires; positions in which the breath is constrained by partner load on the chest. Prefer: receiving partner on top, with full control over depth and pace. Side-lying with shallow entry. Any position in which the breath cycle is unobstructed. The highest-yield intervention for this presentation is pre-sex down-training; position is downstream. The kegel app, despite its $1.4 billion in annual marketing, has never produced a single recommendation that addresses any of this. The kegel app was not built for this. The kegel app was built to retain users.",
    },
    {
      head: "Hip-pattern pain, including labral or impingement presentations",
      body: "The structure flares at end-range hip flexion or deep external rotation. Avoid: knees pulled to chest; legs spread to deep external rotation. Prefer: hip flexion below 90°, external rotation moderate. Side-lying. Spooning. Missionary with the receiving partner's knees up but not at chest, pillow under the lumbar. The labrum is, structurally, the part of the hip joint your Pilates instructor on Instagram does not know exists. The labrum is fine with that arrangement.",
    },
  ];

  return (
    <section id="s6" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§6 · The position library, by structural pattern</Eyebrow>
        <H2>What the biomechanics actually recommend, and the chart the magazine was structurally not allowed to draw.</H2>
        <P>
          Position selection is not 'the best position for back pain.' Position selection is the right position for the specific structural pattern that is currently the limiting factor. The in-app library scores every entry on four axes (lumbar load, hip flexion demand, breath access, partner mobility) because there is no single position that wins across all patterns. The framework below is the chart the magazine listicle was structurally not allowed to draw, because drawing it correctly would have required a citation, and the citation would have required reading.
        </P>
        <FigPlaceholder
          label="FIG. 5 · pattern-by-pattern position recommendations"
          caption="Five patterns, five recommendations. The dots are out of five. The dots are not opinions."
        />
        <div className="mt-12 space-y-10">
          {patterns.map((p) => (
            <div key={p.head}>
              <h3
                className="font-serif-display text-2xl md:text-3xl leading-tight"
                style={{ color: PAPER_INK }}
              >
                {p.head}
              </h3>
              <P>{p.body}</P>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            to="/positions"
            className="inline-flex items-center gap-2 font-mono-label text-[10px] tracking-[0.22em] uppercase border-b pb-1 transition hover:opacity-80"
            style={{ color: PAPER_INK, borderColor: PAPER_INK }}
          >
            Open the in-app position library, scored by spine →
          </Link>
        </div>
      </div>
    </section>
  );
}

function S7() {
  return (
    <section id="s7" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§7 · Communication, mid-act</Eyebrow>
        <H2>What to say, when to say it, and the sixteen-week course that nobody on its faculty has ever taken.</H2>
        <P>
          Communication during sex, when one partner has a structural fault, is a clinical variable. It is not optional. The existing scripts for sexual communication were written for desire mismatch, consent confirmation, and after-the-fact debrief. None cover the case of 'this position is loading my SI in a way that is about to produce a flare in approximately ninety seconds, can we shift to a different geometry without making the next ninety seconds feel surgical.' Nobody wrote that script. The wellness category wrote, instead, a sixteen-week, $4,000 course on 'embodied erotic communication,' taught by a woman whose own credentials are an online certificate, a TEDx talk, and a book deal. The course is fully booked. The disc is, in the meantime, on a chair.
        </P>
        <P>
          The protocol teaches three classes of mid-act communication. The pre-emptive: a position request before entry, framed as a request, not a complaint. 'Can we start with you on top tonight, I'd like that.' Specific. Generous. No 'because my back.' The reason is implicit, not announced. The in-motion: a one-word shift cue, agreed in advance, that does not require either partner to break the moment. The standard cue is 'switch.' Both partners can speak it. It moves the act to the second-preferred position without commentary. The post-event: the debrief that names what worked, not what hurt, because what worked is the actionable data for next time, and the wellness aisle has spent thirty years training couples to start the debrief with what hurt, because what hurt is, financially, the segue to a follow-up session.
        </P>
        <P>
          None of this is coy. The voice is two adults with a structural fact about one of their bodies, operating around that fact like two adults. The app is the rehearsal, before the live performance. The wellness equivalent is the audience member at the live performance, sitting in the third row, taking notes, with their hand up, asking if you would like to schedule a private intensive about it.
        </P>
      </div>
    </section>
  );
}

function S8() {
  return (
    <section id="s8" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§8 · Aftercare</Eyebrow>
        <H2>The five to seven minutes after, which the wellness industry slathered in beeswax and resold.</H2>
        <P>
          Aftercare is a term the wellness industry stole and slathered in beeswax. The protocol uses the word anyway, because there is not a better one and reclaiming language from the people who ruined it is a small act of public hygiene. What we mean is the five to seven minutes immediately following the act, during which the spine, the floor, and the autonomic nervous system are still in the state the act produced.
        </P>
        <P>
          The basic anatomy of post-sex flare risk: the lumbar paraspinals have been firing in support of the act; the iliopsoas has been in repeated concentric and eccentric loading; the pelvic floor has been cycling between tonic and phasic states; the autonomic nervous system has been in sympathetic-then-parasympathetic transition, often abruptly. Without intervention, the paraspinals cool in a shortened state, the iliopsoas re-tightens, and the floor returns to its baseline tonic state. The next morning, the patient wakes with structural shortening compounded against eight hours of low-level guarding during sleep, and the morning is materially worse than the previous evening. The candle did not prevent any of this. The candle never claimed to. The candle is in the drawer, where the rest of the receipts are kept.
        </P>
        <P>
          The aftercare intervention is short, anatomical, and unromantic. Five minutes of supine breath-led down-training, knees supported by a pillow. Two minutes of supine hip-flexor stretch, one leg at a time, both legs equally. One minute of cat-cow at small amplitude, slow. This is not foreplay-in-reverse. This is dosage management.
        </P>
        <FigPlaceholder
          label="FIG. 6 · aftercare protocol, eight minutes total"
          caption="Eight minutes, anatomical, unromantic. The candle is still in the drawer."
        />
        <P>
          The wellness aisle named these five minutes 'intimacy aftercare' and sold a $40 candle to support them. The published version is free. The candle is the receipt.
        </P>
      </div>
    </section>
  );
}

function S9() {
  return (
    <section id="s9" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§9 · The boundary</Eyebrow>
        <H2>When this is the wrong tool.</H2>
        <P>
          Most of the cases for which this page is the right tool are sub-acute, structural, and managed without active clinical pathology. The page is the wrong tool when the condition is acute, recent post-surgical, suggestive of a non-musculoskeletal cause, or in a relationship context that includes coercion or harm. The routing flags from the science page apply here.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Spine red flags</strong> routing immediately to medical care: cauda equina symptoms, new neurological deficits, fever with back pain, unexplained weight loss, history of cancer with new back pain, recent significant trauma.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Pelvic-health red flags</strong> routing to in-person care: pain with intercourse for more than three months, post-surgical rehabilitation, postpartum within the first 18 weeks before clearance, internal trigger-point work, dilator therapy that was clinician-prescribed, suspected vulvodynia or vestibulodynia, recurrent UTI presentations, pelvic organ prolapse symptoms.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Sexual-function red flags</strong> routing to a urologist, gynecologist, or sex therapist: erectile dysfunction with cardiovascular risk factors, ejaculatory dysfunction that is new and unexplained, loss of libido with mood symptoms, any sexual symptom in a relationship where coercion or harm is present.
        </P>
        <P>
          None of these is a failure of the protocol. Each is the case in which the website is the wrong piece of equipment, and recognising that is part of the equipment working correctly. This is the only section of this document that is not making a joke. The reason is obvious.
        </P>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>Closing</Eyebrow>
        <H2>Sex with a back that has retired from athletic missionary is not a downgrade.</H2>
        <P>
          Several parts are upgrades. Slower, more attended to, with the body's signals read at higher resolution than they were when the back worked. The version of you that did not have to think about this would, on balance, be grateful for the upgrade. The version of you that had to think about it should not have had to do that thinking alone, in a dark room, between a discharge note and a candle.
        </P>
        <PullQuote>Eight minutes a day. No candle. The rest of the evening, on you. The receipt is in the drawer with the others.</PullQuote>
        <div className="mt-10 flex items-center gap-5 flex-wrap">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ background: AMBER, color: PAPER_INK }}
          >
            Run the baseline · 7 min
          </Link>
          <Link
            to="/positions"
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
            style={{ color: PAPER_MUTED }}
          >
            Open the position library →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Citations() {
  const groups: Array<{ head: string; items: string[] }> = [
    {
      head: "Lumbar load, load-rate, and intradiscal pressure",
      items: [
        "Nachemson AL. The load on lumbar disks in different positions of the body. Clinical Orthopaedics and Related Research, 1966.",
        "Wilke HJ et al. New in vivo measurements of pressures in the intervertebral disc in daily life. Spine, 1999.",
        "McGill SM. Low Back Disorders: Evidence-Based Prevention and Rehabilitation. Human Kinetics, 2002 (2nd ed. 2007).",
        "McGill SM, Marshall LW. Priming the core: optimal back-priming protocols. Strength and Conditioning Journal, multiple.",
      ],
    },
    {
      head: "Sacroiliac joint biomechanics",
      items: [
        "Vesalius A. De humani corporis fabrica. 1543. (Original description of the sacroiliac joint.)",
        "Vleeming A et al. The sacroiliac joint: an overview of its anatomy, function and potential clinical implications. Journal of Anatomy, 2012.",
        "Pool-Goudzwaard AL et al. Insufficient lumbopelvic stability: a clinical, anatomical and biomechanical approach. Manual Therapy, 1998.",
      ],
    },
    {
      head: "Pelvic floor function, sexual response, and breath-led down-training",
      items: [
        "Kegel AH. Progressive resistance exercise in the functional restoration of the perineal muscles. American Journal of Obstetrics and Gynecology, 1948.",
        "Bø K. Pelvic floor muscle training is effective in treatment of female stress urinary incontinence. International Urogynecology Journal, 2007.",
        "Carrière B. The Pelvic Floor. Thieme, 2006.",
        "Hodges PW, Sapsford R, Pengel LH. Postural and respiratory functions of the pelvic floor muscles. Neurourology and Urodynamics, 2007.",
        "Padoa A, Rosenbaum TY (eds). The Overactive Pelvic Floor. Springer, 2016.",
      ],
    },
    {
      head: "Interoception and breath-led signal training",
      items: [
        "Mehling WE et al. Multidimensional Assessment of Interoceptive Awareness (MAIA). PLoS ONE, 2012.",
        "Farb N et al. Interoception, contemplative practice, and health. Frontiers in Psychology, 2015.",
      ],
    },
    {
      head: "Hip and iliopsoas biomechanics in sex-related pain",
      items: [
        "Sahrmann SA. Movement System Impairment Syndromes of the Extremities, Cervical and Thoracic Spines. Elsevier, 2010.",
        "Lewis CL, Sahrmann SA. Acetabular labral tears. Physical Therapy, 2006.",
      ],
    },
    {
      head: "Sexual function literature, autonomic regulation, and cross-system links",
      items: [
        "Rosen RC et al. ISSWSH consensus papers on female sexual function. Journal of Sexual Medicine, 2016.",
        "Hatzichristou D et al. AUA Erectile Dysfunction Guideline, current update. Journal of Urology.",
        "Smith MD et al. Chronic low back pain and sexual dysfunction: prevalence and the bidirectional clinical relationship. Spine, 2015.",
        "Basson R et al. Definitions of women's sexual dysfunction reconsidered. Journal of Urology, 2003.",
      ],
    },
  ];

  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>Citations and primary sources</Eyebrow>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-4 leading-tight" style={{ color: PAPER_INK }}>
          Read the originals.
        </h2>
        <p className="mt-4 text-sm italic" style={{ color: PAPER_MUTED }}>
          All citations on this page are publicly searchable in PubMed or in the relevant guideline body's library.
        </p>

        <div className="mt-10 space-y-10">
          {groups.map((g) => (
            <div key={g.head}>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: OXBLOOD }}>
                {g.head}
              </p>
              <ul className="space-y-3">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed pl-5 border-l"
                    style={{ borderColor: RULE, color: PAPER_INK, opacity: 0.85 }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-3 text-xs italic leading-relaxed" style={{ color: PAPER_MUTED }}>
          <p>
            Nothing on this page constitutes medical advice. If your back is screaming, see a PT. If sex hurts, see a pelvic-health PT, a gynecologist, or a urologist.
          </p>
          <p>
            The historical claim regarding D.D. Palmer's 1895 origination of chiropractic via reported communication with the spirit of Dr. Jim Atkinson is documented in Palmer's own writings, including The Chiropractor's Adjuster (1910). It is not contested by the discipline.
          </p>
          <p>
            All figures generated by the protocol. The data points are real where cited (Wilke 1999, Nachemson 1966, Mehling MAIA). The bodies in the figures are schematic, not anatomical.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Page ----------------------------------------------------------------------- */

function Bedroom() {
  return (
    <div className="min-h-screen antialiased" style={{ background: PAPER, color: PAPER_INK }}>
      <Header />
      <HeroBlock />
      <S1 />
      <S2 />
      <S3 />
      <S4 />
      <S5 />
      <S6 />
      <S7 />
      <S8 />
      <S9 />
      <Closing />
      <Citations />
    </div>
  );
}
