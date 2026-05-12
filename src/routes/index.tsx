import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, Waves,
  ArrowUpRight,
} from "lucide-react";
import heroCouple from "@/assets/hero-couple.jpg";
import portrait from "@/assets/portrait.jpg";
import nutrition from "@/assets/nutrition.jpg";
import meditation from "@/assets/meditation.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import intimate from "@/assets/intimate.jpg";
import { LiveProtocol } from "@/components/LiveProtocol";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackStroke. The protocol Goop would have repackaged at $400 a candle." },
      { name: "description", content: "Eight minutes of McGill. A pelvic floor that knows how to exhale. Sex your L4 stays out of. Coached by people with letters after their name and a license they would prefer to keep." },
      { property: "og:title", content: "BackStroke. Same pelvis, two jobs, finally on speaking terms." },
      { property: "og:description", content: "The thing your PT would say at the bar after two drinks, if your PT drank. Built for the back. Settled in the bedroom." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
});


function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="11" cy="11" r="3" fill="currentColor"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-serif-display text-xl tracking-tight italic">
                Back<span style={{color:"var(--brand-amber)"}}>Stroke</span>
              </span>
              <span className="font-script text-[12px] text-muted-foreground -mt-0.5 tracking-wide">
                a members' protocol for <span className="italic" style={{color:"var(--brand-blush)"}}>the body that stopped negotiating</span>
              </span>
            </div>
            <sup className="font-mono-label text-[8px] text-muted-foreground ml-0.5">℠</sup>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono-label text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            <a href="#try" className="hover:text-foreground transition-colors" style={{color:"var(--brand-amber)"}}>◆ Try Live</a>
            <a href="#six" className="hover:text-foreground transition-colors">The Work</a>
            <a href="#stories" className="hover:text-foreground transition-colors">Stories</a>
          </nav>
          <a href="#try" className="text-[12px] tracking-[0.14em] uppercase font-mono-label px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition">
            Run a session
          </a>
        </div>
      </header>

      {/* HERO, bold, sexy, ad-style */}
      <section className="relative px-6 md:px-10 pt-16 md:pt-20 pb-28 border-b border-border overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7 relative z-10">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)] mb-6">
              ◆ THE INDEX FOR THE MODERN SPINE<span className="opacity-50">*</span>
            </p>
            <h1 className="font-serif-display text-[52px] md:text-[78px] lg:text-[96px] leading-[0.92] tracking-[-0.025em]">
              Fix the back.<br/>
              <span className="italic" style={{
                background:"var(--gradient-text)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"
              }}>Quiet the lumbar.</span><br/>
              <span className="italic" style={{color:"var(--brand-blush)", textShadow:"var(--glow-pink)"}}>Have the sex.</span>
            </h1>

            <p className="mt-8 text-xl text-foreground max-w-xl leading-snug font-serif-display">
              Two outcomes. <span className="italic" style={{color:"var(--brand-amber)"}}>A back that goes quiet. Sex you're sincerely into.</span> Same pelvis, same nerves, same eight muscles. Your anatomy was never going to keep them in separate rooms. The wellness category insisted on it for tax reasons.
            </p>

            <div className="mt-7 grid sm:grid-cols-3 gap-px bg-border border border-border max-w-xl">
              {[
                ["−63%", "back-pain days · wk 8 (n=412)"],
                ["+58%", "rate sex 'genuinely enjoyable' · wk 10"],
                ["−71%", "report pain as a distraction in bed · wk 12"],
              ].map(([v,l])=>(
                <div key={l} className="bg-background/80 px-4 py-3">
                  <p className="font-serif-display text-2xl" style={{color:"var(--brand-amber)"}}>{v}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{l}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground max-w-xl leading-relaxed">
              Directed by McGill-trained spine PTs, APTA pelvic-health PTs, urology and sleep physicians, and AASECT-certified therapists. <span className="text-foreground italic">No life coaches. No supplement stack. No man in a weighted vest with opinions about discipline. Nobody is going to call your spine a temple. It's a column. Treat it like one.</span>
            </p>
            <p className="mt-2 font-mono-label text-[9px] text-muted-foreground tracking-[0.16em] uppercase opacity-70">
              <span className="opacity-60">*</span> yours, specifically. The one currently rolling sideways out of bed like it's launching a kayak.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#cta" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition" style={{boxShadow:"var(--glow-teal)"}}>
                Get the protocol <ArrowUpRight className="w-4 h-4"/>
              </a>
              <span className="font-script text-2xl leading-tight max-w-[260px] italic" style={{color:"var(--brand-blush)"}}>
                Fit. Flex. <span style={{color:"var(--brand-amber)"}}>Fuck.</span> In that order. House rule.
              </span>
            </div>
          </div>

          {/* Right: hero image + phone mockup + neon stamp */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <img src={heroCouple} alt="" width={1024} height={1280}
                   className="w-full aspect-[4/5] object-cover rounded-sm" style={{boxShadow:"var(--shadow-lift)"}}/>
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/80">
                <span>SUBJECT 04 · DAY 42 · L4-L5, FORMERLY VOCAL</span>
                <span style={{color:"var(--brand-pink)"}}>● REC</span>
              </div>
              <span className="absolute -top-4 left-4 font-script text-2xl rotate-[-4deg] drop-shadow-lg" style={{color:"var(--brand-pink)"}}>
                Same pelvis. Two jobs.
              </span>
            </div>

            {/* Phone mockup */}
            <div className="hidden md:block absolute -left-20 lg:-left-36 bottom-[-30px] w-[220px] rotate-[-6deg]"
                 style={{filter:"drop-shadow(0 30px 40px rgba(0,0,0,0.7))"}}>
              <div className="rounded-[28px] border-[8px] border-[oklch(0.08_0_0)] bg-[var(--brand-ink)] overflow-hidden">
                <div className="px-4 pt-2 pb-1 flex items-center justify-between text-[8px] text-white/80 font-mono-label">
                  <span>9:41</span><span>● ● ●</span>
                </div>
                <div className="px-3 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif-display text-sm italic">Back<span style={{color:"var(--brand-amber)"}}>Stroke</span></span>
                    <span className="text-[9px]" style={{color:"var(--brand-pink)"}}>🔥 12</span>
                  </div>
                  <p className="font-mono-label text-[7px] text-muted-foreground">TODAY · 8 MIN · NO CANDLE</p>
                  <h4 className="font-serif-display text-base mt-0.5 leading-tight">McGill big-3<br/><span className="italic">+ reverse kegel</span></h4>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Floor. Now. No mat sold separately.</p>
                  <button className="mt-2 w-full py-1.5 rounded-md text-[10px] font-semibold bg-[var(--brand-teal)] text-[var(--brand-ink)]">Run session</button>
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    <div className="bg-card/80 rounded-md p-1.5">
                      <p className="text-[7px] text-muted-foreground">Pain</p>
                      <p className="font-serif-display text-base leading-none mt-0.5">2<span className="text-[8px] text-muted-foreground">/10</span></p>
                    </div>
                    <div className="bg-card/80 rounded-md p-1.5">
                      <p className="text-[7px] text-muted-foreground">Mobility</p>
                      <svg viewBox="0 0 60 24" className="mt-0.5 w-full h-5">
                        <polyline points="0,18 10,15 20,17 30,12 40,9 50,7 60,4"
                                  fill="none" stroke="var(--brand-teal)" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neon stamp */}
            <div className="absolute -right-2 lg:-right-8 top-[28%] w-[136px] h-[136px] rounded-full flex items-center justify-center text-center rotate-[6deg]"
                 style={{
                   border:"1px solid var(--brand-pink)",
                   boxShadow:"var(--glow-pink)",
                   background:"oklch(0.14 0.008 60 / 0.65)",
                   backdropFilter:"blur(6px)"
                 }}>
              <p className="font-display-bold text-[12px] leading-[1.15] tracking-[0.04em]" style={{color:"var(--brand-pink)"}}>
                MOVE BETTER<span className="opacity-60"> · </span>
                <span className="font-script normal-case text-[26px] tracking-normal block leading-none my-1">f*ck better</span>
                LIVE BETTER
              </p>
            </div>
          </div>
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.04]"
             style={{backgroundImage:"linear-gradient(to right, white 1px, transparent 1px)", backgroundSize:"calc(100%/12) 100%"}}/>
      </section>

      {/* TAGLINE STRIP, gold foil on velvet */}
      <div className="border-y border-border/70" style={{background:"linear-gradient(180deg, oklch(0.155 0.018 26), oklch(0.125 0.012 28))"}}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6 flex items-center justify-center gap-8 md:gap-14 font-serif-display italic text-lg md:text-3xl tracking-[-0.01em]" style={{color:"var(--brand-amber)"}}>
          <span className="opacity-40 text-xs not-italic">◆</span>
          <span>Fit.</span>
          <span className="opacity-30 not-italic font-mono-label text-[10px]">·</span>
          <span>Flex.</span>
          <span className="opacity-30 not-italic font-mono-label text-[10px]">·</span>
          <span style={{color:"var(--brand-blush)"}}>Fuck.</span>
          <span className="opacity-40 text-xs not-italic">◆</span>
        </div>
      </div>

      {/* CREDIBILITY BAND */}
      <div className="border-b border-border bg-card/40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-9 grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-center">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)] whitespace-nowrap">
            Coached by ↓
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-serif-display text-sm md:text-[15px] text-muted-foreground">
            <span><span className="text-foreground italic">McGill-trained</span> spine PTs</span>
            <span className="opacity-30">·</span>
            <span><span className="text-foreground italic">APTA</span> Pelvic Health (men &amp; women)</span>
            <span className="opacity-30">·</span>
            <span><span className="text-foreground italic">ISSWSH</span> + <span className="text-foreground italic">AASECT</span> sex therapists</span>
            <span className="opacity-30">·</span>
            <span><span className="text-foreground italic">UCSF</span> Urology &amp; Ob-Gyn consults</span>
          </div>
        </div>
        <div className="border-t border-border/60 bg-background/40">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono-label text-[9px] tracking-[0.16em] uppercase text-muted-foreground">
            <span className="text-[var(--brand-amber)]">Evidence base ·</span>
            <span>McGill spine endurance protocols</span>
            <span className="opacity-30">·</span>
            <span>NIH NIDDK pelvic floor (2023)</span>
            <span className="opacity-30">·</span>
            <span>ISSWSH female sexual function consensus</span>
            <span className="opacity-30">·</span>
            <span>AUA erectile + ejaculatory guidelines</span>
          </div>
        </div>
      </div>

      {/* LIVE PROTOCOL, actually fix, flex, f*ck */}
      <section id="try" className="px-6 md:px-10 py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
             style={{ backgroundImage: "radial-gradient(var(--brand-amber) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1280px] mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
            <div className="lg:col-span-7">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">◆ TRY THE PROTOCOL · NO SIGNUP, NO QUIZ, NO EMAIL HOSTAGE</p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-[0.98] tracking-tight">
                Stop reading the pitch.<br/>
                <span className="italic" style={{ color: "var(--brand-blush)", textShadow: "var(--glow-pink)" }}>
                  Run a session.
                </span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-muted-foreground leading-relaxed max-w-md">
              Tap a zone. Log today's pain. Run a real flex set with breath pacing. Flip the switch and watch the after-dark protocol assemble around your spine, in public, on the marketing page. <span className="italic text-foreground">Most people will scroll past this. The ones who tap are the ones tying their shoes standing up in six weeks, instead of giving the floor a TED talk.</span>
            </p>
          </div>
          <LiveProtocol />
          <p className="font-mono-label text-[9px] text-muted-foreground mt-4 text-center">
            FIG. 04 · INTERACTIVE PREVIEW · NO ACCOUNT, NO COOKIE WALL, NO PDF EMAILED IN 3-5 BUSINESS DAYS
          </p>
        </div>
      </section>

      {/* THE WORK · two columns of tangible practice */}
      <section id="six" className="px-6 md:px-10 py-24 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">THE WORK · TWO LISTS, NOTHING ELSE, NO TIER 3</p>
              <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.02] tracking-tight max-w-2xl">
                The whole product, on one page. <span className="italic text-muted-foreground">No mystery box. No 14-step funnel that lands on a quiz that recommends ashwagandha.</span>
              </h2>
            </div>
            <p className="font-mono-label text-[10px] text-muted-foreground max-w-xs leading-relaxed normal-case tracking-wide">
              These are the moves, drills and tools we coach. Each one is a thing your body does this week that moves a number we measure. That is the company. There is no second page, no upsell deck, no hidden tier where the real protocol lives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
            {/* BACK column */}
            <div className="bg-background p-8 md:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">FOR THE BACK</p>
                <Activity className="w-5 h-5 text-[var(--brand-amber)]" />
              </div>
              <h3 className="font-serif-display text-3xl italic leading-tight mb-2">A quieter lumbar in two weeks.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Not stretching. Endurance, hinging, and a small set of habits the wellness aisle won't sell you because none of them come in a tub.
              </p>
              <ol className="space-y-5">
                {[
                  ["McGill big-3", "Curl-up, side plank, bird dog. Eight minutes. The endurance trio that out-quiets disc pain better than every stretch your yoga teacher recommended in good faith and a Lululemon discount."],
                  ["Hip-hinge re-pattern", "How to pick up the laundry without folding your spine into a question mark. The single move that retires ninety percent of 'I tweaked it bending over to feed the cat.'"],
                  ["Glute bridge + 90/90 hip switch", "Reactivate the muscles supposed to be carrying your spine. They have been on paid leave since you accepted the desk job, with full benefits and a foam-roller stipend."],
                  ["Dead-hang + thoracic opener", "Two minutes a day. Decompresses the discs gravity has spent the day politely compressing while you nodded through a Zoom."],
                  ["Sleep position audit", "Pillow under the knees, not under the head. The boring change you make tonight that your morning lumbar writes you a thank-you note for, in cursive."],
                  ["Sitting protocol", "When to stand, what to perch on, how to drive a long haul without arriving as a folded napkin. Boring. Decisive. Free."],
                ].map(([h, b], i) => (
                  <li key={h} className="flex gap-4">
                    <span className="font-mono-label text-[10px] text-muted-foreground pt-1 w-6 shrink-0">B.0{i+1}</span>
                    <div>
                      <p className="font-serif-display text-lg leading-tight">{h}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* BEDROOM column */}
            <div className="bg-background p-8 md:p-10" style={{background:"linear-gradient(180deg, var(--background), oklch(0.16 0.012 25 / 0.4))"}}>
              <div className="flex items-baseline justify-between mb-6">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-blush)"}}>FOR THE BEDROOM</p>
                <Waves className="w-5 h-5" style={{color:"var(--brand-blush)"}} />
              </div>
              <h3 className="font-serif-display text-3xl italic leading-tight mb-2" style={{color:"var(--brand-blush)"}}>Sex you're sincerely into. Again.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Not "function." Not a baseline. Not "blood flow," whatever the supplement guys decided that means this quarter. Pelvic floor done properly, in both directions. A position library scored against your spine. The conversations your GP would clearly rather not have on a Tuesday at 4:50pm.
              </p>
              <ol className="space-y-5">
                {[
                  ["Reverse kegel + diaphragmatic drop", "Most adults can't relax their pelvic floor on command. That is why erections fade, why orgasms feel small, why penetration hurts. We coach the down-train first, then the up-train. The free app you downloaded skipped step one and called it a feature."],
                  ["Kegel done correctly", "The one your phone-app version got wrong by counting reps instead of teaching control. Eccentric load for ejaculatory timing in men, arousal and orgasmic depth in women. Counting was never the hard part."],
                  ["Perineal + internal release work", "External and (when indicated) internal trigger-point release. For dyspareunia, vaginismus, post-prostatectomy, postpartum, chronic pelvic pain. Done with a credentialed PT, not a shirtless man on YouTube with a lacrosse ball and a thesis."],
                  ["Position library, scored by spine", "Forty positions ranked by lumbar load, hip flexion, breath access. Pick the one your back can sign off on tonight. The end of pretending it didn't twinge and lying very still afterwards."],
                  ["Lube and tool literacy", "Silicone vs water vs hybrid. Dilator sets, vibrators, cock rings, wedges. What they actually do, when to use them, and which brands a clinician would hand you instead of the ones with the prettiest serif logo."],
                  ["Arousal as parasympathetic skill", "Four-seven-eight before, not after. We coach the breath cadence that lets your nervous system actually arrive on time. Apparently this was a teachable skill the entire time."],
                  ["The conversation script", "What to say to your partner about pain, pace, what you want. Written by AASECT therapists. Performed in your kitchen. Not in a clinic. Not in a group chat called Wine Witches."],
                ].map(([h, b], i) => (
                  <li key={h} className="flex gap-4">
                    <span className="font-mono-label text-[10px] text-muted-foreground pt-1 w-6 shrink-0">F.0{i+1}</span>
                    <div>
                      <p className="font-serif-display text-lg leading-tight" style={{color:"var(--brand-blush)"}}>{h}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p className="font-script text-2xl md:text-3xl mt-12 italic text-center" style={{color:"var(--brand-blush)"}}>
            Two lists. <span style={{color:"var(--brand-amber)"}}>One pelvis. The whole company.</span>
          </p>
        </div>
      </section>

      {/* MARQUEE OF SIGNALS */}
      <div className="border-b border-border overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 flex items-center gap-10 font-mono-label text-[10px] text-muted-foreground whitespace-nowrap overflow-x-auto">
          <span className="text-foreground">WE TRACK ·</span>
          {["Pain log","Range of motion","Sitting hours","Pelvic-floor tone","Erection / arousal log","Position comfort","Lube / tool use","Sleep position","Things we don't track: vibes"].map(x=>(
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>


      {/* AFTER DARK, the spicy thesis, named */}
      <section className="relative px-6 md:px-10 py-32 border-b border-border overflow-hidden"
               style={{background:"radial-gradient(ellipse at 70% 40%, oklch(0.22 0.05 25) 0%, var(--brand-ink) 60%)"}}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-14 items-center relative">
          <div className="lg:col-span-6 relative">
            <img src={intimate} alt="" loading="lazy" width={1024} height={1280}
                 className="w-full aspect-[4/5] object-cover"
                 style={{boxShadow:"var(--shadow-ember)"}}/>
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/70">
              <span>FIG. 03 · AFTER DARK · NO CANDLE BUDGET</span>
              <span style={{color:"var(--brand-blush)"}}>● 22:47</span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-blush)"}}>
              THE PART NOBODY ELSE WILL PUT ON THE WEBSITE
            </p>
            <h2 className="font-serif-display text-5xl md:text-7xl mt-6 leading-[0.98] tracking-[-0.025em]">
              The goal isn't<br/>
              <span className="italic" style={{
                background:"var(--gradient-ember)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"
              }}>"functional."</span><br/>
              The goal is sex<br/>
              you're sincerely into.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Lower back pain is the number-one reason couples stop having sex. Number two is the low-grade dread that something will twinge mid-act and someone will have to be a good sport about it. Most adults can't fully relax their pelvic floor. That is why erections fade, why orgasms feel small, why penetration hurts. None of this is a mystery. It is a protocol with seven moves and a breath count. The mystery is why nobody handed it to you, and why the ones who almost did wanted ninety dollars and your email.
            </p>
            <p className="mt-6 text-lg text-foreground leading-relaxed max-w-xl">
              Train the body. Presence is downstream. Candles strictly optional. We will not sell you one.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px border" style={{borderColor:"oklch(0.72 0.14 18 / 0.25)"}}>
              {[
                ["+58%","rate sex 'genuinely enjoyable' by week 8"],
                ["−71%","report pain as a distraction in bed"],
                ["2.1×","self-rated presence + confidence after 60 days"],
              ].map(([v,l])=>(
                <div key={l} className="p-5" style={{background:"oklch(0.18 0.02 25 / 0.6)"}}>
                  <p className="font-serif-display text-3xl" style={{color:"var(--brand-blush)"}}>{v}</p>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-snug">{l}</p>
                </div>
              ))}
            </div>

            <p className="font-serif-display text-2xl italic mt-10" style={{color:"var(--brand-amber)"}}>
              Strong back. Steady breath. Hot life.
            </p>
          </div>
        </div>
      </section>

      {/* PAPER SECTION, the pitch on light ground */}
      <section className="px-6 md:px-10 py-32 border-b border-border"
               style={{background:"var(--brand-paper)", color:"var(--brand-paper-ink)"}}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-clay)"}}>WHY NOW</p>
            <h2 className="font-serif-display text-4xl md:text-6xl mt-5 leading-[1.02] tracking-tight">
              Back pain hits 619M people. The market's answer is a stretch video and a magnesium gummy.
            </h2>
            <p className="mt-8 text-lg leading-relaxed" style={{color:"oklch(0.35 0.01 60)"}}>
              The category is fragmented across PT clinics, telehealth, supplements, and content apps that all stop talking the moment your pants come off. None of them touch sex, even though the muscles, nerves and breathwork are the same ones they were charging you for an hour ago. We're the first protocol that treats the back and the bedroom as one job — because anatomically, they always were. The taboo was a marketing decision.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                ["$140B", "Global back pain market"],
                ["1 in 4", "Adults with chronic LBP report sexual avoidance"],
                ["72%", "Of users report measurable Index gain by week 4"],
              ].map(([v,l])=>(
                <div key={l} className="border-t pt-4" style={{borderColor:"oklch(0.18 0.01 60 / 0.15)"}}>
                  <p className="font-serif-display text-3xl">{v}</p>
                  <p className="text-xs mt-2 leading-snug" style={{color:"oklch(0.4 0.01 60)"}}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <img src={portrait} alt="" loading="lazy" width={1024} height={1024}
                 className="w-full aspect-[4/5] object-cover"/>
            <p className="font-mono-label text-[9px] mt-3" style={{color:"oklch(0.4 0.01 60)"}}>
              SUBJECT 11 · WEEK 6 · INDEX +24
            </p>
          </div>
        </div>
      </section>

      {/* METHODOLOGY · two editorial spreads, back + bedroom */}
      <section className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto space-y-32">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <img src={meditation} alt="" loading="lazy" width={1024} height={768} className="w-full aspect-[5/4] object-cover"/>
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">FOR THE BACK</p>
              <h3 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
                Eight minutes of McGill, daily. The rent your spine pays to keep doing things you like.
              </h3>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Curl-up, side plank, bird dog. Paced for endurance, not range. Coached on video by spine PTs, scaled to today's pain. The protocol that beat lumbar surgery in head-to-head trials — finally taught properly, instead of buried under a comment thread arguing about whether sit-ups count.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="lg:order-2">
              <img src={nutrition} alt="" loading="lazy" width={1024} height={768} className="w-full aspect-[5/4] object-cover"/>
            </div>
            <div className="lg:order-1">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-blush)"}}>FOR THE BEDROOM</p>
              <h3 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
                Reverse kegel before kegel. The order your phone app got backwards.
              </h3>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                A chronically gripping pelvic floor is why arousal stalls, why erections fade, why penetration hurts. We coach the down-train first, with diaphragmatic breath, then the up-train for control. APTA pelvic-health PTs, on video, in plain language. Postpartum and post-prostatectomy protocols built in — same voice, softer register, no shortcuts and no jokes about the part that isn't funny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">FIELD NOTES</p>
          <h2 className="font-serif-display text-4xl md:text-6xl mt-5 max-w-2xl leading-[1.02] tracking-tight">
            From people who would rather not sit this one out.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { img: t1, name: "Jake, 32", role: "L4-L5 herniation · Index 71 → 89", quote: "I am back on the bike. I am lifting. I am — and this is genuinely none of your business — having sex again. Six weeks. I owe my foam roller an apology." },
              { img: t2, name: "Maya, 29", role: "Postpartum · Index 54 → 82",       quote: "Nobody told me about the down-train. Two weeks of reverse kegels and breath work and I stopped bracing for everything. Including, eventually, my husband." },
              { img: t3, name: "Chris, 35", role: "Sciatica · Index 62 → 84",        quote: "I bought four supplements, three apps and a foam roller before this. The Index is the first thing that told me what to do today, in a tone that didn't make me want to throw my phone." },
            ].map((t)=>(
              <figure key={t.name} className="bg-background p-8">
                <blockquote className="font-serif-display text-xl leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 pt-6 border-t border-border">
                  <img src={t.img} alt="" loading="lazy" width={512} height={512}
                       className="w-10 h-10 rounded-full object-cover grayscale"/>
                  <div>
                    <p className="text-sm">{t.name}</p>
                    <p className="font-mono-label text-[9px] text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative px-6 md:px-10 py-32 border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
             style={{background:"radial-gradient(ellipse at 50% 50%, oklch(0.78 0.14 195 / 0.25), transparent 60%)"}}/>
        <div className="max-w-[1100px] mx-auto text-center relative">
          <p className="font-script text-3xl md:text-4xl mb-4 italic" style={{color:"var(--brand-blush)"}}>
            Fit. Flex. <span style={{color:"var(--brand-amber)"}}>Fuck.</span> ◆
          </p>
          <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl mt-2 leading-[0.95] tracking-[-0.025em]">
            Don't let your back<br/>
            be the reason<br/>
            <span className="italic" style={{color:"var(--brand-amber)", textShadow:"var(--glow-teal)"}}>you stay home.</span>
          </h2>
          <p className="mt-10 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Seven-minute baseline. Your protocol assembles the same day. Two weeks free, then $24 a month — less than one PT visit, less than the supplement stack you almost added to cart at 1am last Tuesday.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 justify-center items-center">
            <a href="#" className="flex items-center gap-3 pl-5 pr-7 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              <span className="text-left leading-tight">
                <span className="block text-[9px] opacity-70 font-mono-label">DOWNLOAD ON THE</span>
                <span className="block text-base font-semibold">App Store</span>
              </span>
            </a>
            <a href="#" className="flex items-center gap-3 pl-5 pr-7 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition">
              <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="var(--brand-teal)" d="M3 2.5v19l9-9.5z"/><path fill="var(--brand-pink)" d="M3 2.5l13 7-4 3z"/><path fill="oklch(0.82 0.11 80)" d="M3 21.5l13-7-4-3z"/><path fill="oklch(0.62 0.12 35)" d="M21 12L16 9.5l-4 3 4 3z"/></svg>
              <span className="text-left leading-tight">
                <span className="block text-[9px] opacity-70 font-mono-label">GET IT ON</span>
                <span className="block text-base font-semibold">Google Play</span>
              </span>
            </a>
          </div>
          <p className="mt-12 text-[11px] text-muted-foreground max-w-xl mx-auto leading-relaxed italic font-serif-display">
            Not a medical device. If your back is screaming, see a PT. If your erection has been gone for three months, see a urologist. If you've been ignoring it for longer than that, see a urologist faster. We are coaches, not your doctor — though, statistically, we know yours.
          </p>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-12">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8 font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          <div>
            <div className="flex items-center gap-2 text-foreground mb-3">
              <svg width="16" height="16" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
                <circle cx="11" cy="11" r="3" fill="currentColor"/>
              </svg>
              <span className="font-serif-display text-base">BackStroke</span>
            </div>
            <p>Eight minutes a day. The rent your spine pays. Non-negotiable. Sorry.</p>
          </div>
          <div className="md:text-center">© BackStroke Labs · MMXXVI · a backstroke protocol</div>
          <div className="md:text-right">Built for backs with a calendar.</div>
        </div>
      </footer>
    </div>
  );
}
