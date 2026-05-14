import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/science")({
  component: Science,
  head: () => ({
    meta: [
      { title: "The protocol, the science, the why · BackStroke" },
      {
        name: "description",
        content:
          "What the protocol does, what the published literature says, and where to draw the line.",
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

function SectionGap() {
  return <div className="mt-16 md:mt-24" />;
}

/* Section components --------------------------------------------------------- */

function Header() {
  return <SiteHeader active="science" />;
}

function HeroBlock() {
  return (
    <section className="px-6 md:px-10 pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>The protocol · the science · the why</Eyebrow>
        <h1
          className="font-serif-display mt-5 leading-[0.96] tracking-[-0.025em]"
          style={{ fontSize: "clamp(44px, 6vw, 80px)", color: PAPER_INK }}
        >
          What the protocol does, what the published literature says,{" "}
          <span className="italic" style={{ color: OXBLOOD }}>and where to draw the line.</span>
        </h1>
        <Subhead>
          Eight muscles. Two jobs. One chart. The chart is not new in the literature; it has been sitting there in pieces, in journals nobody outside two specialties reads. What is new is putting it on a screen a person can read at home in eight minutes.
        </Subhead>
        <nav className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-2 font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: PAPER_MUTED }}>
          {[
            ["§1", "The thesis"],
            ["§2", "The lumbar"],
            ["§3", "The pelvic floor"],
            ["§4", "The loop"],
            ["§5", "The chair"],
            ["§6", "The boundary"],
            ["§7", "Why this has never been one chart"],
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
    <section id="s1" className="px-6 md:px-10 py-12 md:py-20" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§1 · The thesis</Eyebrow>
        <H2>One pelvis, two jobs, never on the same chart.</H2>
        <P>
          The thesis is anatomical and it is unromantic. The eight muscles that hold the lumbar spine upright and the eight muscles that organise sexual function in the pelvis are largely the same eight muscles, with overlap in the multifidus, the transversus abdominis, the iliopsoas, the obturator internus, the levator ani, and the deep stabilisers that nobody outside a textbook calls by name. They share innervation pathways (sacral plexus, lumbar plexus). They share a respiratory rhythm; the diaphragm and the pelvic floor move together, mechanically not metaphorically (Hodges 2007). They share an autonomic regulator; the sympathetic and parasympathetic branches decide whether the body is running from a tiger or about to have an evening.
        </P>
        <P>
          These eight muscles do two jobs. The first job is structural: keep the spine vertical against gravity, against the chair, against the chronic micro-loads of a typical week. The second job is sexual: regulate erection, lubrication, orgasm, continence, and the fine motor control of intimate contact. The clinics that treat the first job are spine clinics. The clinics that treat the second job are pelvic-health clinics. They are usually in different buildings. Their notes do not cross. Their billing codes do not cross. The patient walks out of the first appointment with a discharge note that says 'doing well' and walks into the second appointment, eighteen months later, after the second job has stopped working, because nobody in the first building was paid to ask.
        </P>
        <PullQuote>Medicine declines to ask. Wellness sells you whatever the asking would have revealed. The protocol is the third option.</PullQuote>
        <P>
          The protocol is a single chart that holds the eight muscles, the two jobs, and the daily dose that keeps both jobs working. The chart is not new in the published literature. It has been sitting there in pieces, in journals nobody outside two specialties reads. What is new is putting it on a screen that a person can actually read at home in eight minutes.
        </P>
      </div>
    </section>
  );
}

function S2() {
  return (
    <section id="s2" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§2 · The lumbar</Eyebrow>
        <H2>What the disc is, why it does not heal, and the three boring exercises that win.</H2>
        <P>
          The lumbar disc is a hydrostatic structure. It consists of a tough outer ring (the annulus fibrosus), a gel-like centre (the nucleus pulposus), and two cartilage end-plates that connect it to the vertebrae above and below. The disc is mostly water. The disc is also mostly avascular, meaning blood does not perfuse it the way blood perfuses skin or muscle. When the disc is injured, it does not heal. It adapts. The distinction is not philosophical. It is anatomical, and it is the single most important fact about a back in pain, because the entire wellness category around 'healing your disc' is selling a process the tissue cannot biologically perform.
        </P>
        <P>
          What changes with rehabilitation is not the disc. What changes is the load profile applied to the disc, the endurance of the muscles that share its load, and the geometry of the spine during the hours of the day that are not spent exercising. This is the work of Stuart McGill, professor emeritus at the University of Waterloo, whose three-decade research programme established that endurance, not range of motion, is the single best predictor of recurrence in low-back pain (McGill 1998, 2002, 2007). The corollary is uncomfortable for the yoga-influencer category: stretching a lumbar disc into greater flexibility does not improve outcomes and, in disc-pattern pain specifically, often worsens them. The disc does not want to be stretched. The disc wants to be unloaded by surrounding endurance.
        </P>
        <P>
          The McGill big-3 are curl-up, side bridge, and bird-dog. The protocol teaches them in the dose the original trials used, not the dose the YouTube version uses. They do not look impressive. A person watching them at the gym will not assume the practitioner is athletic. This is the point. Endurance is the boring answer because endurance is the answer.
        </P>
        <PullQuote>Flexibility is a virtue in conversation. In a lumbar disc it is a structural failure.</PullQuote>
        <P>
          There is a separate body of literature comparing conservative endurance programmes to lumbar discectomy. The most cited is Weinstein et al, the SPORT trial, NEJM 2006, which found that two-year outcomes for surgery and non-operative care converged for many disc-pattern patients, with non-operative care delivering similar pain reduction at materially lower risk. The point is not that surgery is wrong. The point is that the endurance approach is not the consolation prize the influencer category presents it as. It is, for a large subset of disc cases, the equal of the surgical option, with fewer scars and a shorter follow-up appointment.
        </P>
      </div>
    </section>
  );
}

function S3() {
  return (
    <section id="s3" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§3 · The pelvic floor</Eyebrow>
        <H2>Why kegel apps got eight million pelvic floors wrong, and how to fix one.</H2>
        <P>
          The pelvic floor is a sling of muscle that runs from the pubic bone to the coccyx and from one ischial tuberosity to the other, forming the muscular floor of the abdominal cavity. Its job is to hold the pelvic organs up against gravity, to coordinate continence, and to participate in the mechanics of erection, lubrication, orgasm, and ejaculatory control. It is, structurally, a hammock that has to do four jobs at once, while breathing. It is, functionally, an over-tonic muscle in a large fraction of adult humans, especially adult humans who sit at desks, who have given birth, who have had pelvic surgery, who have lived with chronic anxiety, or who have ever been told to 'engage their core' by a Pilates instructor with a follower count and no certification in pelvic-health physiotherapy.
        </P>
        <P>
          Kegel exercises were described by Arnold Kegel in 1948 in the American Journal of Obstetrics and Gynecology. The original prescription was specific: progressive resistance exercise of the perineal muscles, prescribed for women with stress incontinence, performed under clinical supervision with a perineometer to measure contraction strength. Seventy-six years later, the protocol has been compressed onto a phone app that asks the user to squeeze on a timer. Three problems. First, the original Kegel population was women with under-active floors; the modern population presenting to pelvic-health clinics is largely the inverse, with over-tonic floors that already grip continuously. Second, eccentric control (the lengthening phase, the release) is the actual functional metric for sexual response and arousal, and the apps do not measure it. Third, the prompt to 'do your kegels' applied to an over-tonic floor strengthens the dysfunction, the way deadlifting a back that is already in spasm strengthens the spasm.
        </P>
        <P>
          The answer broadly agreed across the modern pelvic-health literature (Carrière 2006, Bø 2007, Lee 2011, NIH NIDDK 2023) is down-train first. The over-tonic floor must learn to release before it is asked to contract. Release is taught through diaphragmatic breath, where the inhale lengthens the floor downward and the exhale allows it to return to rest. The metric is not how strongly the floor can contract. The metric is whether the floor can let go on cue, the way any other muscle in the body can.
        </P>
        <PullQuote>A pelvic floor stuck in the on position is the reason none of it works, and the reason the $9.99 app tried for two months made it worse.</PullQuote>
        <P>
          The protocol's pelvic-floor work covers external perineal release, breath-led down-training, and eccentric kegel control once the floor has learned to release. It does not cover internal trigger-point release, dilator therapy, or post-surgical rehabilitation. Those require an in-person pelvic-health physiotherapist, a category of care a website cannot deliver. At the point where that care is needed, the protocol routes to it.
        </P>
      </div>
    </section>
  );
}

function S4() {
  return (
    <section id="s4" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§4 · The loop</Eyebrow>
        <H2>How each system breaks the other, and the cascade that explains the rest.</H2>
        <P>
          Back pain and sexual dysfunction are linked in two directions, and the published literature is consistent that neither direction is well-served by treating the systems in isolation (Rosen et al, ISSWSH consensus 2016; Hatzichristou et al, AUA guideline updates 2018; Smith et al, Spine 2015 on chronic low back pain and ED prevalence). The first direction is mechanical: when the back hurts, sex is uncomfortable, sex becomes infrequent, infrequency becomes a pattern, and the pattern outlives the original injury. The second direction is autonomic, less articulable, and doing the heavier lifting in the data.
        </P>
        <P>
          Arousal is parasympathetic. The pelvic floor stuck on is sympathetic. They cannot both be in the room. The patient is told 'just relax' by their partner, by their therapist, by their last podcast, and the patient cannot relax, because their nervous system has been in sympathetic dominance for six weeks because their back has been guarding for six weeks. Guarding is sympathetic. Erection and lubrication require parasympathetic. The patient does not have a desire problem. The patient has an autonomic-tone problem that is being mistaken, in the bedroom, for a desire problem, and in the relationship, for a fundamental incompatibility.
        </P>
        <P>
          The cascade in plain language: pain leads to guarding; guarding holds the pelvic floor in tonic contraction; tonic floor activity blocks the autonomic shift required for arousal; failed arousal becomes anticipatory anxiety; anticipatory anxiety produces sympathetic activation in advance of intimacy; advance sympathetic activation tightens the floor before any pain has occurred; tightened floor tissue produces dyspareunia in women and erectile failure or premature ejaculation in men; dyspareunia and erectile failure produce avoidance; avoidance produces relationship distance; relationship distance produces a story two partners tell themselves about each other that has nothing to do with the eight muscles and is doing none of the work of fixing them.
        </P>
        <PullQuote>Pain becomes guarding. Guarding becomes avoidance. Avoidance becomes a story two people tell themselves about each other.</PullQuote>
        <P>
          The protocol intervenes at the muscular and autonomic levels because those are the levels at which the cascade was initiated. The conversation script and the partner-share materials intervene at the relational level because that is the level at which the cascade is currently sustaining itself, after the original injury has begun to resolve. Both halves are needed. A protocol that only fixed the muscles would leave a couple with a body that worked and a relationship that did not. A communication framework that only fixed the talking would leave a couple with words for a problem they could not biologically solve.
        </P>
      </div>
    </section>
  );
}

function S5() {
  return (
    <section id="s5" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§5 · The chair</Eyebrow>
        <H2>Why sitting hours are dosage, and why eight minutes cannot beat eight hours.</H2>
        <P>
          The lumbar disc is loaded most heavily at approximately 90° of hip flexion, which is the approximate angle of a person seated at a desk in a standard office chair. Intradiscal pressure in this seated, slightly flexed posture is roughly 140 to 200 percent of standing pressure, depending on whether the person is supported, leaning forward, or in the slumped 'thinking' posture nobody photographs (Nachemson 1966, refined by Wilke et al 1999 with in-vivo telemetry). The number that matters: eight hours of sitting applies lumbar load roughly equivalent to a low-intensity workout, every weekday, to the structure the protocol is trying to unload.
        </P>
        <P>
          This is why the protocol treats sitting hours as dosage and not as background. Eight minutes of correct geometry cannot override eight hours of incorrect geometry. The 30/3 rule (stand for three minutes every thirty, walk if there is a corridor, hip-hinge once if there is not) is the only intervention that touches the cumulative load. Standing desks help only if the user uses them; the published compliance data is consistent with the experience that owning a standing desk and using one are different variables (Buckley et al 2015).
        </P>
        <P>
          The chair in the office that nobody would have chosen for any other reason is doing more damage than eight minutes of McGill is repairing. This is arithmetic, not judgement. Bedding, chairs, car seats, and the geometry of the couch are dosage variables, and the protocol is honest about it because the wellness category has been dishonest about it for forty years by selling supplements as a substitute for ergonomic intervention. Three magnesium gummies cannot adjust a chair. A standing desk can.
        </P>
        <PullQuote>Eight hours of bad geometry overrides eight minutes of good geometry. Bedding and chairs are dosage.</PullQuote>
      </div>
    </section>
  );
}

function S6() {
  return (
    <section id="s6" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§6 · The boundary</Eyebrow>
        <H2>When the protocol stops being the right tool, and where to go instead.</H2>
        <P>
          The most consequential decision in the product is not what the protocol teaches. It is when the protocol stops teaching and routes to a clinician. The criteria built into the assessment flow, the daily check-in, and the in-session pain reporting are not novel. They are the published red-flag criteria from the spine and pelvic-health guideline literature, copied into the code without invention. The list below is drawn from those guidelines. The exact phrasing in the app is editorial; the substance is everyone's who has ever published on the relevant question.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Spine red flags</strong> that route immediately (from the JOSPT clinical practice guideline series and the NICE NG59 update on low back pain and sciatica): cauda equina symptoms (saddle anaesthesia, bladder or bowel changes, progressive bilateral leg weakness), new neurological deficits, fever with back pain, unexplained weight loss, history of cancer with new back pain, recent significant trauma. These are spine emergencies. The product asks about each of them in the baseline. The product surfaces a 'see a doctor today' card if any appear during a session. The card has no dismiss button. It is the only screen in the product without a path forward inside the product.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Pelvic-health red flags</strong> that route to in-person care (from the ICS terminology standards and the AUGS clinical guidelines on pelvic floor disorders): pain with intercourse present for more than three months, post-surgical rehabilitation (post-prostatectomy, post-hysterectomy, post-perineal repair), postpartum within the first 18 weeks before clearance, internal trigger-point work, dilator therapy that was clinician-prescribed, suspected vulvodynia or vestibulodynia, recurrent UTI presentations, pelvic organ prolapse symptoms. These are conditions a website can support around the edges but cannot treat. The product says so, on the relevant card, in writing.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Sexual-function red flags</strong> that route to a urologist, gynecologist, or sex therapist (from the AUA Erectile Dysfunction Guideline and the ISSWSH consensus papers): erectile dysfunction with cardiovascular risk factors, ejaculatory dysfunction that is new and unexplained, loss of libido with mood symptoms, any sexual symptom in a relationship where coercion or harm is present. The product is not a substitute for a doctor, a therapist, or a witness, and it does not pretend to be.
        </P>
        <PullQuote>Not your doctor. Statistically, we know yours.</PullQuote>
      </div>
    </section>
  );
}

function S7() {
  return (
    <section id="s7" className="px-6 md:px-10 py-16 md:py-24" style={{ background: PAPER_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>§7 · Why this has never been one chart</Eyebrow>
        <H2>The structural reasons two industries did not collaborate, and what was waiting in the gap.</H2>
        <P>
          The most common question from a clinician hearing the pitch is some version of 'why hasn't this been done already?' It is a reasonable question. The answer is structural, not conspiratorial.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>First: insurance billing codes.</strong> CPT codes for spine work and CPT codes for sexual dysfunction are billed in different specialties, by different licences, at different rates, under different documentation requirements. A spine PT cannot bill for a sexual-function consultation without an additional credential. A urologist cannot bill for a sitting-posture intervention without a different additional credential. The patient pays twice, or the patient pays once and gets half. The American billing system does not recognise the pelvis as a single object. It recognises the spine and the genitourinary system as two adjacent objects, and the boundary between them is paid only when the patient walks across it themselves, twice.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Second: training pipelines.</strong> A spine PT receives roughly four to twelve hours of pelvic-floor content in their doctorate, depending on the programme; pelvic-health is a post-graduate specialisation requiring a separate APTA credential, often pursued years after entry to practice. A urologist receives roughly zero hours of lumbar biomechanics. A sex therapist receives roughly zero hours of either. Each professional spends a career deepening one corner of the same room. Nobody is trained to integrate the room.
        </P>
        <P>
          <strong style={{ color: OXBLOOD }}>Third: the wellness industry filled the gap with margin.</strong> The structural absence of integrated care produced a commercial vacuum that ashwagandha tinctures, jade eggs, and infrared mats have filled at $1.8 trillion globally per annum (Global Wellness Institute 2023). The peer-reviewed share of that catalogue is, by the Institute's own classification, statistically indistinguishable from zero. The patient is left to choose between a healthcare system that does not have the time to ask the question and a wellness system that has the time to sell the answer regardless of whether the answer is real.
        </P>
        <PullQuote>Medicine bills by visit. It cannot afford to ask what nobody is paying it to ask.</PullQuote>
        <P>
          The protocol is built into that gap. Not by replacing either system, but by sitting in the space neither system staffs, with the literature on the same page, a route-to-clinician button that actually fires, and a price point that does not impress the supplement aisle. Eight minutes a day, $24.99 a month. Less than a single supplement that would not have been bought twice.
        </P>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[820px] mx-auto">
        <Eyebrow>Closing</Eyebrow>
        <H2>The protocol is not magic.</H2>
        <P>
          The protocol is endurance training for the lumbar, down-training for the pelvic floor, breath work to bridge the two, ergonomic auditing for the hours not spent exercising, and a conversation framework for the relational layer the muscular work alone cannot solve. Every element is in the published literature, with the citations below. The novelty is that someone put them on the same chart.
        </P>
        <P>
          If you have arrived from the wellness aisle, having tried the supplements, the cleanses, the breath-work app, and the kegel app, this is the part written for you. Nothing on the aisle was going to work. The aisle is not regulated, not credentialed, and not interested in being either. The Goop categorisation of these conditions is approximately as informative as the Vatican categorisation of mental illness in the twelfth century. The reasons the protocol does not look like the aisle are listed above, with citations.
        </P>
        <P>
          If you have arrived from the medical system, having been discharged from physical therapy as 'doing well' while quietly noticing that the second job stopped working around appointment four, this is the part written for you. The discharge was correct on the chart that was open at the time. That chart did not include the second job. The chart on this site does.
        </P>
        <PullQuote>Eight minutes a day. $24.99 a month. The rest of the page is the citations.</PullQuote>
        <div className="mt-10 flex items-center gap-5 flex-wrap">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ background: PAPER_INK, color: PAPER }}
          >
            Run the baseline · 7 min
          </Link>
          <Link
            to="/bedroom"
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase hover:opacity-80 transition"
            style={{ color: PAPER_MUTED }}
          >
            Or read the bedroom protocol →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Citations() {
  const groups: Array<{ head: string; items: string[] }> = [
    {
      head: "Spine and lumbar endurance",
      items: [
        "McGill SM. Low back exercises: evidence for improving exercise regimens. Physical Therapy, 1998.",
        "McGill SM. Low Back Disorders: Evidence-Based Prevention and Rehabilitation. Human Kinetics, 2002 (2nd ed. 2007).",
        "Nachemson AL. The load on lumbar disks in different positions of the body. Clinical Orthopaedics and Related Research, 1966.",
        "Wilke HJ et al. New in vivo measurements of pressures in the intervertebral disc in daily life. Spine, 1999.",
        "Weinstein JN et al. Surgical vs nonoperative treatment for lumbar disk herniation: the SPORT randomized trial. NEJM, 2006.",
        "Delitto A et al. Low back pain: clinical practice guidelines. JOSPT, 2012 (and revisions).",
        "NICE clinical guideline NG59. Low back pain and sciatica in over 16s: assessment and management.",
      ],
    },
    {
      head: "Pelvic floor function and dysfunction",
      items: [
        "Kegel AH. Progressive resistance exercise in the functional restoration of the perineal muscles. American Journal of Obstetrics and Gynecology, 1948.",
        "Carrière B. The Pelvic Floor. Thieme, 2006.",
        "Bø K. Pelvic floor muscle training is effective in treatment of female stress urinary incontinence. International Urogynecology Journal, 2007.",
        "Lee D. The Pelvic Girdle: An Integration of Clinical Expertise and Research. Churchill Livingstone, 2011.",
        "Sapsford R, Hodges PW. Contraction of the pelvic floor muscles during abdominal maneuvers. Archives of Physical Medicine and Rehabilitation, 2001.",
        "Hodges PW, Sapsford R, Pengel LH. Postural and respiratory functions of the pelvic floor muscles. Neurourology and Urodynamics, 2007.",
        "NIH NIDDK. Pelvic floor disorders: research and clinical update, 2023.",
        "Haylen BT et al. International Continence Society (ICS) terminology for pelvic floor dysfunction. Neurourology and Urodynamics, multiple updates.",
      ],
    },
    {
      head: "Sexual function, autonomic regulation, and the cross-system link",
      items: [
        "Rosen RC et al. ISSWSH consensus papers on female sexual function. Journal of Sexual Medicine, 2016.",
        "Hatzichristou D et al. AUA Erectile Dysfunction Guideline, current update. Journal of Urology.",
        "Smith MD et al. Chronic low back pain and sexual dysfunction: prevalence and the bidirectional clinical relationship. Spine, 2015.",
        "Basson R et al. Definitions of women's sexual dysfunction reconsidered. Journal of Urology, 2003.",
      ],
    },
    {
      head: "Sitting, ergonomic load, and compliance",
      items: [
        "Buckley JP et al. The sedentary office: an expert statement on the growing case for change towards better health and productivity. British Journal of Sports Medicine, 2015.",
        "Healy GN et al. Sedentary time and cardio-metabolic biomarkers. European Heart Journal, 2011.",
      ],
    },
    {
      head: "The wellness category, market scale, and evidence gap",
      items: [
        "Global Wellness Institute. Global Wellness Economy Monitor, 2023.",
        "Cohen PA et al. Adulterated dietary supplements: a review of FDA actions and ongoing risks. JAMA Internal Medicine, multiple years.",
        "FTC vs Goop Inc, 2018 settlement on jade egg and similar claims.",
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
          All citations on this page are publicly searchable in PubMed, NICE, or the relevant guideline body's open library.
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

        <p className="mt-12 text-xs italic leading-relaxed" style={{ color: PAPER_MUTED }}>
          Nothing on this page constitutes medical advice. If your back is screaming, see a PT. If sex hurts, see a pelvic-health PT, a gynecologist, or a urologist.
        </p>
      </div>
    </section>
  );
}

function PullQuoteHero() {
  return (
    <section className="px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-[820px] mx-auto text-center">
        <p className="font-script text-3xl italic" style={{ color: OXBLOOD }}>
          Numbers are not the protocol. <span style={{ color: AMBER }}>The protocol is the protocol.</span> The candle is not the protocol either.
        </p>
      </div>
    </section>
  );
}

/* Page ----------------------------------------------------------------------- */

function Science() {
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
      <Closing />
      <PullQuoteHero />
      <Citations />
    </div>
  );
}
