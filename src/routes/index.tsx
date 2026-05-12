import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroCouple from "@/assets/hero-couple.jpg";
import portrait from "@/assets/portrait.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import intimate from "@/assets/intimate.jpg";
import backStudy from "@/assets/back-study.jpg";
import bedroomStudy from "@/assets/bedroom-study.jpg";
import mcgillStudy from "@/assets/mcgill-study.jpg";
import sheetGrip from "@/assets/sheet-grip.jpg";
import { LiveProtocol } from "@/components/LiveProtocol";
import { MoveList, StatStrip, BACK_MOVES, BEDROOM_MOVES, BACK_STATS, BEDROOM_STATS } from "@/components/MoveLibrary";
import { MobileImageCarousel } from "@/components/MobileImageCarousel";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

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
            <a href="#problem" className="hover:text-foreground transition-colors">The problem</a>
            <a href="#insight" className="hover:text-foreground transition-colors">The insight</a>
            <a href="#work" className="hover:text-foreground transition-colors">The work</a>
            <a href="#try" className="hover:text-foreground transition-colors" style={{color:"var(--brand-amber)"}}>◆ Try live</a>
          </nav>
          <a href="#signup" className="text-[12px] tracking-[0.14em] uppercase font-mono-label px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition">
            Get on the list
          </a>
        </div>
      </header>

      {/* 01 · HERO. Name the problem. Tease the thesis. One CTA. */}
      <section className="relative px-6 md:px-10 pt-16 md:pt-20 pb-28 border-b border-border overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7 relative z-10">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)] mb-6">
              ◆ FOR ADULTS WITH A BACK <span className="opacity-50">/</span> AND A SEX LIFE <span className="opacity-50">/</span> BOTH NEGOTIATING<span className="opacity-50">*</span>
            </p>
            <h1 className="font-serif-display text-[52px] md:text-[78px] lg:text-[96px] leading-[0.92] tracking-[-0.025em]">
              One pelvis.<br/>
              <span className="italic" style={{
                background:"var(--gradient-text)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"
              }}>Two jobs.</span><br/>
              <span className="italic" style={{color:"var(--brand-blush)", textShadow:"var(--glow-pink)"}}>Eight minutes a day.</span>
            </h1>

            <p className="mt-8 text-xl text-foreground max-w-xl leading-snug font-serif-display">
              BackStroke is eight minutes a day for adults whose back pain has started turning sex into a logistics problem. <span className="italic" style={{color:"var(--brand-amber)"}}>Same pelvis. Same nerves. Same eight muscles doing too much unpaid labor.</span> We train the overlap: spine PTs and pelvic-floor PTs on one chart, because two clinics ignoring each other is not a treatment plan.
            </p>

            {/* What you actually get */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border max-w-2xl">
              {[
                ["8 min", "a day. Floor optional."],
                ["1 protocol", "back + bedroom, one chart."],
                ["2 outcomes", "quieter spine, better sex."],
                ["0 candles", "0 jade eggs. 0 ashwagandha."],
              ].map(([v,l])=>(
                <div key={String(l)} className="bg-background/80 px-4 py-3">
                  <p className="font-serif-display text-2xl tracking-tight" style={{color:"var(--brand-amber)"}}>{v}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{l}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground max-w-xl leading-relaxed">
              Coached by McGill-trained spine PTs, APTA pelvic-health PTs, urology and sleep physicians, AASECT-certified therapists. <span className="text-foreground italic">No life coaches. No supplement stack. No guy in a weighted vest with a podcast about discipline.</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              <a href="#signup" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition self-start" style={{boxShadow:"var(--glow-teal)"}}>
                Get on the list <ArrowUpRight className="w-4 h-4"/>
              </a>
              <a href="#try" className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition">
                or try a session first <span className="opacity-50">→</span>
              </a>
            </div>

            <p className="mt-10 font-mono-label text-[9px] text-muted-foreground tracking-[0.16em] uppercase opacity-70 max-w-xl">
              <span className="opacity-60">*</span> yours, specifically. The one currently rolling sideways out of bed like it's launching a kayak.
            </p>
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
                    <span className="font-mono-label text-[8px]" style={{color:"var(--brand-pink)"}}>STREAK 12</span>
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

      {/* 02 · THE PROBLEM. Indict the category. */}
      <section id="problem" className="px-6 md:px-10 py-28 md:py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end mb-14">
            <div className="lg:col-span-8">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
                THE PROBLEM · 01
              </p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-[1.0] tracking-[-0.02em]">
                You have one body. <span className="italic text-muted-foreground">It has been quoted by four specialists, two apps, and a candle.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 text-base text-muted-foreground leading-relaxed">
              The protocol that fixes your back lives in one building. The protocol that fixes your sex life lives in another. The two clinicians have never met. The market is fine with this. Your pelvis is not.
            </p>
          </div>

          {/* The split */}
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border mb-14">
            <div className="bg-background p-7 md:p-9">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">TUESDAY · 11 AM</p>
              <p className="font-serif-display text-2xl md:text-3xl mt-3 leading-tight">
                Spine clinic. Bird-dog, McGill big-3, instructions to "stay active."
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Nobody asks how sex is going. Nobody mentions that the muscles being trained are the same ones running the show on Saturday night. Discharge note: "Patient is doing well." Patient is not.
              </p>
            </div>
            <div className="bg-background p-7 md:p-9" style={{background:"linear-gradient(180deg, var(--background), oklch(0.16 0.012 25 / 0.4))"}}>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-blush)"}}>THURSDAY · 4 PM</p>
              <p className="font-serif-display text-2xl md:text-3xl mt-3 leading-tight" style={{color:"var(--brand-blush)"}}>
                Pelvic-floor PT. Reverse kegels, breath cues, a homework PDF.
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Nobody asks about lumbar endurance. Nobody mentions that bracing all day for back pain is exactly why nothing down-trains at night. The two notes never end up in the same chart. Your insurance prefers it that way.
              </p>
            </div>
          </div>

          {/* The receipts */}
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border mb-14">
            {[
              ["619M", "people with active back pain. The category answer is a stretch reel and a $48 magnesium gummy in eucalyptus."],
              ["1 in 4", "adults with chronic low-back pain report sexual avoidance. None of their PT notes say so."],
              ["$140B", "spent annually on back pain. Mostly on furniture, herbal capsules, and one very confident podcast guest."],
            ].map(([v,l])=>(
              <div key={l} className="bg-background p-7 md:p-9">
                <p className="font-serif-display text-4xl md:text-5xl tracking-tight" style={{color:"var(--brand-amber)"}}>{v}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed">{l}</p>
              </div>
            ))}
          </div>

          {/* The villains, named with affection */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground">A SHORT, AFFECTIONATE LIST OF WHAT'S NOT WORKING</p>
            </div>
            <ul className="lg:col-span-7 space-y-3 font-serif-display text-lg md:text-xl leading-snug">
              <li className="flex gap-4"><span className="font-mono-label text-[10px] text-muted-foreground pt-2 shrink-0 w-8">01</span><span>The kegel app charging $9.99 to count reps like Duolingo, in haptic feedback, with a streak.</span></li>
              <li className="flex gap-4"><span className="font-mono-label text-[10px] text-muted-foreground pt-2 shrink-0 w-8">02</span><span>The supplement stack that fits in a small UPS truck and has done less for your spine than a chair without wheels.</span></li>
              <li className="flex gap-4"><span className="font-mono-label text-[10px] text-muted-foreground pt-2 shrink-0 w-8">03</span><span>The stretch-video influencer with two cats and zero patients.</span></li>
              <li className="flex gap-4"><span className="font-mono-label text-[10px] text-muted-foreground pt-2 shrink-0 w-8">04</span><span>The candle. Always the candle. Unscented, $96, sold next to a jade egg with no return policy.</span></li>
              <li className="flex gap-4"><span className="font-mono-label text-[10px] text-muted-foreground pt-2 shrink-0 w-8">05</span><span>The guy in a weighted vest with strong opinions about discipline and a podcast about it.</span></li>
            </ul>
          </div>

          <p className="font-script text-2xl md:text-3xl mt-14 italic text-center max-w-3xl mx-auto" style={{color:"var(--brand-blush)"}}>
            None of it is bad faith. <span style={{color:"var(--brand-amber)"}}>It is just the wrong unit of analysis.</span>
          </p>
        </div>
      </section>

      {/* 03 · THE INSIGHT. Same pelvis, two jobs. */}
      <section id="insight" className="relative px-6 md:px-10 py-28 md:py-32 border-b border-border overflow-hidden"
               style={{background:"radial-gradient(ellipse at 70% 40%, oklch(0.22 0.05 25) 0%, var(--brand-ink) 60%)"}}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-14 items-center relative">
          <div className="lg:col-span-6 relative">
            <img src={intimate} alt="" loading="lazy" width={1024} height={1280}
                 className="w-full aspect-[4/5] object-cover"
                 style={{boxShadow:"var(--shadow-ember)"}}/>
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/70">
              <span>FIG. 01 · AFTER DARK · NO CANDLE BUDGET</span>
              <span style={{color:"var(--brand-blush)"}}>● 22:47</span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-blush)"}}>
              THE INSIGHT · 02
            </p>
            <h2 className="font-serif-display text-5xl md:text-7xl mt-6 leading-[0.98] tracking-[-0.025em]">
              Same pelvis.<br/>
              <span className="italic" style={{
                background:"var(--gradient-ember)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"
              }}>Two jobs.</span><br/>
              One protocol.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              The eight muscles that stabilize your spine are the same eight that govern arousal, orgasm, continence and pain-free penetration. Your PT knows. Your GP knows. The app charging $9.99 to count kegels knows. They will not put it on the homepage, because someone in legal is on a call about it.
            </p>
            <p className="mt-6 text-lg text-foreground leading-relaxed max-w-xl">
              Train the body. Presence is downstream. Candles strictly optional. Jade eggs strictly discouraged. We will not sell you either.
            </p>

            <p className="font-serif-display text-2xl italic mt-10" style={{color:"var(--brand-amber)"}}>
              Strong back. Steady breath. Hot life.
            </p>
          </div>
        </div>
      </section>

      {/* 04 · METHODOLOGY · two editorial spreads */}
      <section className="px-6 md:px-10 py-28 md:py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">METHODOLOGY · 03</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.02] tracking-tight">
              How the one protocol does the two jobs.
            </h2>
          </div>

          <div className="space-y-24">
            {/* BACK spread */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 relative">
                <img src={mcgillStudy} alt="Overhead study, McGill curl-up engagement" loading="lazy" width={1280} height={1024}
                     className="w-full aspect-[5/4] object-cover" style={{boxShadow:"var(--shadow-lift)"}}/>
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono-label text-[9px] text-white/70">
                  <span>FIG. 02 · CURL-UP · 8 SEC HOLD</span>
                  <span style={{color:"var(--brand-amber)"}}>● THE BACK</span>
                </div>
                <div className="absolute -bottom-4 -right-4 hidden md:block bg-[var(--brand-ink)] border border-border px-4 py-3 rounded-sm" style={{boxShadow:"var(--glow-teal)"}}>
                  <p className="font-mono-label text-[8px] tracking-[0.2em] text-muted-foreground">DAILY DOSE</p>
                  <p className="font-serif-display text-2xl" style={{color:"var(--brand-amber)"}}>8 min</p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">For the back</p>
                <h3 className="font-serif-display text-3xl md:text-4xl mt-4 leading-[1.05]">
                  Eight minutes of McGill. The rent your spine pays.
                </h3>
                <p className="mt-5 text-muted-foreground leading-relaxed text-sm">
                  Curl-up, side plank, bird dog. Endurance, not range. The protocol that beat lumbar surgery in head-to-head trials, finally taught properly.
                </p>
                <StatStrip items={BACK_STATS} accent="amber" />
              </div>
            </div>

            {/* BEDROOM spread */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 lg:order-2 relative">
                <img src={sheetGrip} alt="Hands gripping linen, low light" loading="lazy" width={1280} height={1024}
                     className="w-full aspect-[5/4] object-cover" style={{boxShadow:"var(--shadow-lift)"}}/>
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono-label text-[9px] text-white/70">
                  <span>FIG. 03 · GRIP · INVOLUNTARY</span>
                  <span style={{color:"var(--brand-blush)"}}>● THE BEDROOM</span>
                </div>
                <div className="absolute -bottom-4 -left-4 hidden md:block bg-[var(--brand-ink)] border border-border px-4 py-3 rounded-sm" style={{boxShadow:"var(--glow-pink)"}}>
                  <p className="font-mono-label text-[8px] tracking-[0.2em] text-muted-foreground">SEQUENCE</p>
                  <p className="font-serif-display text-xl italic" style={{color:"var(--brand-blush)"}}>Down-train first</p>
                </div>
              </div>
              <div className="lg:col-span-5 lg:order-1">
                <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{color:"var(--brand-blush)"}}>For the bedroom</p>
                <h3 className="font-serif-display text-3xl md:text-4xl mt-4 leading-[1.05]">
                  Reverse kegel <span className="italic" style={{color:"var(--brand-blush)"}}>before</span> kegel.
                </h3>
                <p className="mt-5 text-muted-foreground leading-relaxed text-sm">
                  Erections and lubrication are the floor, not the ceiling. A chronically gripping pelvic floor is why arousal stalls and penetration hurts. Down-train, then up-train. APTA pelvic-health PTs, on video, in plain language.
                </p>
                <StatStrip items={BEDROOM_STATS} accent="blush" />
                <p className="mt-4 text-[11px] text-muted-foreground italic">
                  Postpartum and post-prostatectomy protocols built in. Same voice, softer register.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · THE WORK · two columns of tangible practice */}
      <section id="work" className="px-6 md:px-10 py-28 md:py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">THE WORK · 04 · TWO LISTS, NOTHING ELSE, NO TIER 3</p>
              <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.02] tracking-tight max-w-2xl">
                The whole product, on one page. <span className="italic text-muted-foreground">No mystery box. No 14-step funnel that lands on a quiz that recommends ashwagandha.</span>
              </h2>
            </div>
            <p className="font-mono-label text-[10px] text-muted-foreground max-w-xs leading-relaxed normal-case tracking-wide">
              Tap any move to expand the steps, cues and citations. There is no second page. No upsell deck. No hidden tier where the real protocol lives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
            {/* BACK column */}
            <div className="bg-background">
              {/* Mobile: tap-to-zoom carousel */}
              <div className="md:hidden">
                <MobileImageCarousel
                  accent="amber"
                  topLabel="FIG. 04 · LATERAL · L4-L5 · ● THE BACK"
                  bottomEyebrow="For the back"
                  bottomTitle="A quieter lumbar in two weeks."
                  images={[
                    { src: backStudy, alt: "Lateral study of the lumbar spine in a bird-dog plank", caption: "FIG. 04 · LATERAL · L4-L5" },
                    { src: mcgillStudy, alt: "Overhead study, McGill curl-up engagement", caption: "FIG. 02 · CURL-UP · 8 SEC HOLD" },
                    { src: portrait, alt: "Coach portrait, studio light", caption: "FIG. 06 · COACH · STUDIO" },
                  ]}
                />
              </div>
              {/* Desktop: original hero */}
              <div className="relative aspect-[16/10] overflow-hidden hidden md:block">
                <img src={backStudy} alt="Lateral study of the lumbar spine in a bird-dog plank" loading="lazy" width={1024} height={640}
                     className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(180deg, transparent 40%, oklch(0.12 0.012 30) 100%)"}}/>
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/70">
                  <span>FIG. 04 · LATERAL · L4-L5</span>
                  <span style={{color:"var(--brand-amber)"}}>● THE BACK</span>
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)] mb-1">For the back</p>
                  <h3 className="font-serif-display text-3xl md:text-4xl italic leading-[1.05]">A quieter lumbar in two weeks.</h3>
                </div>
              </div>
              <div className="p-7 md:p-9">
                <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-md">
                  Endurance, hinging, six habits the supplement aisle won't sell because none of them come in a tub.
                </p>
                <MoveList items={BACK_MOVES} accent="amber" />
              </div>
            </div>

            {/* BEDROOM column */}
            <div className="bg-background" style={{background:"linear-gradient(180deg, var(--background), oklch(0.16 0.012 25 / 0.4))"}}>
              {/* Mobile: tap-to-zoom carousel */}
              <div className="md:hidden">
                <MobileImageCarousel
                  accent="blush"
                  topLabel="FIG. 05 · 11:42 PM · ● THE BEDROOM"
                  bottomEyebrow="For the bedroom"
                  bottomTitle="Sex you're sincerely into. Again."
                  images={[
                    { src: bedroomStudy, alt: "Low-light bedroom study, two adults under linen", caption: "FIG. 05 · 11:42 PM · LIGHTS LOW" },
                    { src: sheetGrip, alt: "Hands gripping linen, low light", caption: "FIG. 03 · GRIP · INVOLUNTARY" },
                    { src: intimate, alt: "Two figures, close, low light", caption: "FIG. 07 · CLOSE · UNHURRIED" },
                  ]}
                />
              </div>
              {/* Desktop: original hero */}
              <div className="relative aspect-[16/10] overflow-hidden hidden md:block">
                <img src={bedroomStudy} alt="Low-light bedroom study, two adults under linen" loading="lazy" width={1024} height={640}
                     className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(180deg, transparent 40%, oklch(0.12 0.012 30) 100%)"}}/>
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/70">
                  <span>FIG. 05 · 11:42 PM · LIGHTS LOW</span>
                  <span style={{color:"var(--brand-blush)"}}>● THE BEDROOM</span>
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-1" style={{color:"var(--brand-blush)"}}>For the bedroom</p>
                  <h3 className="font-serif-display text-3xl md:text-4xl italic leading-[1.05]" style={{color:"var(--brand-blush)"}}>Sex you're sincerely into. Again.</h3>
                </div>
              </div>
              <div className="p-7 md:p-9">
                <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-md">
                  Not blood flow. Not getting it up or wet. Sex you finish thinking about the person, not your L4.
                </p>
                <MoveList items={BEDROOM_MOVES} accent="blush" />
              </div>
            </div>
          </div>

          <p className="font-script text-2xl md:text-3xl mt-12 italic text-center" style={{color:"var(--brand-blush)"}}>
            Two lists. <span style={{color:"var(--brand-amber)"}}>One pelvis. The whole company.</span>
          </p>
        </div>
      </section>

      {/* 06 · LIVE PROTOCOL */}
      <section id="try" className="px-6 md:px-10 py-28 md:py-32 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
             style={{ backgroundImage: "radial-gradient(var(--brand-amber) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1280px] mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
            <div className="lg:col-span-7">
              <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">◆ TRY IT · 05 · NO SIGNUP, NO QUIZ, NO EMAIL HOSTAGE</p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-[0.98] tracking-tight">
                Stop reading the pitch.<br/>
                <span className="italic" style={{ color: "var(--brand-blush)", textShadow: "var(--glow-pink)" }}>
                  Run a session.
                </span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-muted-foreground leading-relaxed max-w-md">
              Tap a zone. Log today's pain. Run a real flex set with breath pacing. Flip the switch and watch the after-dark protocol assemble around your spine, in public, on the marketing page. <span className="italic text-foreground">Most people will scroll past this. The ones who tap are the ones tying their shoes standing up in six weeks.</span>
            </p>
          </div>
          <LiveProtocol />
          <p className="font-mono-label text-[9px] text-muted-foreground mt-4 text-center">
            INTERACTIVE PREVIEW · NO ACCOUNT, NO COOKIE WALL, NO PDF EMAILED IN 3-5 BUSINESS DAYS
          </p>
        </div>
      </section>

      {/* 07 · FIELD NOTES · proof = numbers + quotes */}
      <section id="stories" className="px-6 md:px-10 py-28 md:py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">FIELD NOTES · 06 · UNPAID, UNEDITED, UNFLATTERING WHERE NEEDED</p>
          <h2 className="font-serif-display text-4xl md:text-6xl mt-5 max-w-2xl leading-[1.02] tracking-tight">
            From people who would, frankly, rather not sit this one out.
          </h2>

          {/* Numbers */}
          <div className="mt-12 grid sm:grid-cols-3 gap-px bg-border border border-border">
            {[
              ["−63%", "back-pain days · wk 8 (n=412)"],
              ["+58%", "rate sex 'genuinely enjoyable' · wk 10"],
              ["−71%", "report pain as a distraction in bed · wk 12"],
            ].map(([v,l])=>(
              <div key={l} className="bg-background px-6 py-7">
                <p className="font-serif-display text-4xl md:text-5xl tracking-tight" style={{color:"var(--brand-amber)"}}>{v}</p>
                <p className="text-xs text-muted-foreground mt-3 leading-snug">{l}</p>
              </div>
            ))}
          </div>

          {/* Quotes */}
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { img: t1, name: "Jake, 32", role: "L4-L5 herniation · Index 71 → 89", quote: "I am back on the bike. I am lifting. I am, and this is genuinely none of your business, having sex again. Six weeks. I owe my foam roller a written apology and possibly a card." },
              { img: t2, name: "Maya, 29", role: "Postpartum · Index 54 → 82",       quote: "Nobody told me about the down-train. Two weeks of reverse kegels and breath work and I stopped bracing for everything. Including, eventually, my husband. He noticed before I did." },
              { img: t3, name: "Chris, 35", role: "Sciatica · Index 62 → 84",        quote: "I bought four supplements, three apps and a foam roller before this. The Index is the first thing that told me what to do today, in a tone that didn't make me consider throwing my phone into a river." },
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

          <p className="mt-10 font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground text-center">
            Coached by McGill-trained spine PTs, APTA pelvic-health PTs, urology and sleep physicians, and AASECT-certified therapists.
          </p>
        </div>
      </section>

      {/* 08 · PRE-SIGNUP · terminal CTA */}
      <section id="signup" className="relative px-6 md:px-10 py-32 border-b border-border overflow-hidden bg-card/30">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
             style={{background:"radial-gradient(ellipse at 50% 50%, oklch(0.78 0.14 195 / 0.25), transparent 60%)"}}/>
        <div className="max-w-[900px] mx-auto text-center relative">
          <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-[var(--brand-amber)]">
            PRE-SIGNUP · 07 · COHORT 01 · SUMMER 2026
          </p>
          <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl mt-4 leading-[0.95] tracking-[-0.025em]">
            Don't let your back<br/>
            be the reason<br/>
            <span className="italic" style={{color:"var(--brand-amber)", textShadow:"var(--glow-teal)"}}>you stayed in.</span>
          </h2>
          <p className="mt-8 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We open intake in waves of 200, so the PT replies are still from a person. Pre-signup gets you week 1 of the protocol to read, the founding price locked, and one heads-up email 48 hours before the public link.
          </p>

          <div className="mt-10 max-w-lg mx-auto">
            <EarlyAccessForm accent="amber" />
          </div>

          <ul className="mt-10 grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto font-mono-label text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            <li className="flex items-center justify-center gap-2"><span style={{color:"var(--brand-amber)"}}>01</span> Skip the queue</li>
            <li className="flex items-center justify-center gap-2"><span style={{color:"var(--brand-amber)"}}>02</span> Read week 1 free</li>
            <li className="flex items-center justify-center gap-2"><span style={{color:"var(--brand-amber)"}}>03</span> Founding price locked</li>
          </ul>

          <p className="mt-12 text-[11px] text-muted-foreground max-w-xl mx-auto leading-relaxed italic font-serif-display">
            Not a medical device. If your back is screaming, see a PT. If sex hurts, if arousal has quietly left the chat, if your erection has been MIA for three months: see a pelvic-health PT, a gynecologist, a urologist. Pick the relevant one. We are coaches, not your doctor. Statistically, we know yours.
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
            <p>Eight minutes a day. The rent your spine pays. Non-negotiable. We don't make the rules. Gravity does.</p>
          </div>
          <div className="md:text-center">© BackStroke Labs · MMXXVI · a backstroke protocol · no candle revenue</div>
          <div className="md:text-right">Built for backs with a calendar and a sense of humour.</div>
        </div>
      </footer>
    </div>
  );
}
