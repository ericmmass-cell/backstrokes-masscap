import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, Apple as AppleIcon, Brain, Heart, Waves, Moon,
  ArrowUpRight, ArrowRight,
} from "lucide-react";
import heroCouple from "@/assets/hero-couple.jpg";
import portrait from "@/assets/portrait.jpg";
import nutrition from "@/assets/nutrition.jpg";
import meditation from "@/assets/meditation.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import intimate from "@/assets/intimate.jpg";
import { ConvergenceDiagram } from "@/components/ConvergenceDiagram";
import { CorrelationGrid } from "@/components/CorrelationGrid";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackBetter — The Performance Index for spines that have a life" },
      { name: "description", content: "BackBetter converges spine, vitals, pelvic floor, breath, nutrition and sleep into a single Performance Index — the first integrated protocol linking back health to sexual performance and longevity." },
      { property: "og:title", content: "BackBetter — Performance Index for the modern spine" },
      { property: "og:description", content: "Six data streams. One adaptive protocol. Measurable gains in pain, capacity, confidence and performance." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
});

const PILLARS = [
  { n: "01", icon: Activity,   title: "Spine",        desc: "Strength, mobility, and load tolerance — programmed by physiotherapists, sequenced to your phase." },
  { n: "02", icon: Waves,      title: "Pelvic Floor", desc: "The deep stabilizers your back depends on — and the muscles that govern intimate performance." },
  { n: "03", icon: Heart,      title: "Cardio-Vitals",desc: "Resting BP, heart rate, HRV. Vascular health is sexual health. Your back rides on it." },
  { n: "04", icon: Brain,      title: "Breath & CNS", desc: "HRV-paced breathwork and pain-reframing visualization. Down-regulate to perform up." },
  { n: "05", icon: AppleIcon,  title: "Nutrition",    desc: "Anti-inflammatory plate, hydration, and connective-tissue protein targets — calibrated daily." },
  { n: "06", icon: Moon,       title: "Sleep",        desc: "Continuity and depth. Where tissue rebuilds, hormones reset, and tomorrow's pain is decided." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/75 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
              <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="11" cy="11" r="3" fill="currentColor"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-serif-display text-xl tracking-tight">
                Back<span className="text-[var(--brand-teal)]">Better</span>
              </span>
              <span className="font-script text-[13px] text-muted-foreground -mt-0.5">
                Strong back. <span className="italic" style={{color:"var(--brand-pink)"}}>Hotter life.</span>
              </span>
            </div>
            <sup className="font-mono-label text-[8px] text-muted-foreground ml-0.5">™</sup>
          </div>
          <nav className="hidden md:flex items-center gap-9 font-mono-label text-[10px] text-muted-foreground">
            <a href="#thesis" className="hover:text-foreground transition">Thesis</a>
            <a href="#index" className="hover:text-foreground transition">The Index</a>
            <a href="#pillars" className="hover:text-foreground transition">Protocol</a>
            <a href="#evidence" className="hover:text-foreground transition">Evidence</a>
            <a href="#stories" className="hover:text-foreground transition">Stories</a>
          </nav>
          <a href="#cta" className="text-sm px-4 py-2 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition">
            Get the Index
          </a>
        </div>
      </header>

      {/* HERO — sharp thesis */}
      <section className="relative px-6 md:px-10 pt-24 pb-32 border-b border-border overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 font-mono-label text-[10px] text-muted-foreground mb-10">
              <span className="w-6 h-px bg-[var(--brand-amber)]" />
              <span>FIG. 00 · A NEW CATEGORY OF SPINE CARE</span>
            </div>
            <h1 className="font-serif-display text-[44px] md:text-[68px] lg:text-[84px] leading-[0.98] tracking-[-0.025em]">
              Your back<br/>
              isn't a problem<br/>
              to manage.<br/>
              <span className="text-[var(--brand-amber)] italic">It's the system that runs your life.</span>
            </h1>
            <p className="mt-10 text-lg text-muted-foreground max-w-xl leading-relaxed">
              BackBetter is the first integrated protocol that converges six health signals — spine, pelvic floor, vitals, breath, nutrition, sleep — into a single, adaptive <em className="not-italic text-foreground">Performance Index</em>. The result: less pain, more capacity, and the part nobody else will say out loud — measurably better sex.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--brand-amber)] text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                Calculate your Index <ArrowUpRight className="w-4 h-4"/>
              </a>
              <a href="#thesis" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                Read the thesis <ArrowRight className="w-4 h-4"/>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative">
              <img src={heroCouple} alt="" width={1024} height={1280}
                   className="w-full aspect-[4/5] object-cover" style={{boxShadow:"var(--shadow-lift)"}}/>
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/80">
                <span>SUBJECT 04 · DAY 42</span>
                <span>● LIVE</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-white">
                {[["INDEX","87"],["PAIN","2.1"],["BP","118/76"]].map(([k,v])=>(
                  <div key={k} className="backdrop-blur-md bg-black/30 px-3 py-2 rounded-sm">
                    <p className="font-mono-label text-[8px] opacity-70">{k}</p>
                    <p className="font-serif-display text-lg leading-none mt-1">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.04]"
             style={{backgroundImage:"linear-gradient(to right, white 1px, transparent 1px)", backgroundSize:"calc(100%/12) 100%"}}/>
      </section>

      {/* MARQUEE OF SIGNALS */}
      <div className="border-b border-border overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 flex items-center gap-10 font-mono-label text-[10px] text-muted-foreground whitespace-nowrap overflow-x-auto">
          <span className="text-foreground">SIGNALS INGESTED ·</span>
          {["Apple Health","Oura","Whoop","Garmin","Withings BP","Continuous Glucose","Manual Pain Log","Pelvic EMG","Sleep Stage","HRV"].map(x=>(
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>

      {/* THESIS — the value prop spelled out */}
      <section id="thesis" className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">THE THESIS</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-5 leading-[1.02] tracking-tight">
              Back pain isn't a back problem.<br/>
              <span className="italic text-muted-foreground">It's a convergence problem.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-2 grid md:grid-cols-2 gap-x-12 gap-y-8 text-muted-foreground leading-relaxed">
            <p>
              <span className="font-serif-display text-2xl text-foreground block mb-2">Vascular.</span>
              Resting blood pressure, HRV and endothelial function predict both spinal recovery and erectile capacity. The same circulatory system runs both.
            </p>
            <p>
              <span className="font-serif-display text-2xl text-foreground block mb-2">Neuromuscular.</span>
              The pelvic floor and deep core are the same muscle group that stabilizes the spine and governs intimate performance. Train one, you train the other.
            </p>
            <p>
              <span className="font-serif-display text-2xl text-foreground block mb-2">Inflammatory.</span>
              Diet, sleep debt and chronic stress raise systemic inflammation. Inflammation drives next-day pain and depresses testosterone in the same 24-hour window.
            </p>
            <p>
              <span className="font-serif-display text-2xl text-foreground block mb-2">Neurological.</span>
              The nervous system that interprets pain is the nervous system that gates arousal. Down-regulate the first, you unlock the second.
            </p>
          </div>
        </div>
      </section>

      {/* THE INDEX — signature graphic */}
      <section id="index" className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">THE PERFORMANCE INDEX</p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-5 leading-[1.02] tracking-tight">
                One number,<br/>built from six.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Every signal you sync — wearable, manual, or sensor — feeds a proprietary model that surfaces a single, daily Index score. The Index is what your protocol optimizes against. It's how you know whether yesterday's choices made today's body more, or less, capable.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm p-6 md:p-12" style={{boxShadow:"var(--shadow-soft)"}}>
            <ConvergenceDiagram />
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              ["INPUTS",       "26 signals"],
              ["UPDATE RATE",  "Every 4 hrs"],
              ["MODEL",        "Adaptive · per-user baseline"],
              ["OUTPUT",       "0–100 Index + 4 sub-scores"],
            ].map(([k,v])=>(
              <div key={k} className="bg-background p-5">
                <p className="font-mono-label text-[9px] text-muted-foreground">{k}</p>
                <p className="font-serif-display text-lg mt-2 leading-snug">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCE / CORRELATIONS */}
      <section id="evidence" className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">EVIDENCE</p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-5 leading-[1.02] tracking-tight">
                The correlations<br/>
                <span className="italic text-muted-foreground">nobody is mapping.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-3">
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Pulled from anonymized cohort data across 12,847 sessions and 90-day rolling windows. Pearson coefficients shown. The numbers below are why we built one app instead of six.
              </p>
            </div>
          </div>
          <CorrelationGrid />
          <p className="font-mono-label text-[9px] text-muted-foreground mt-4">
            FIG. 02 · INTERNAL COHORT, MMXXVI · NOT A CLINICAL TRIAL · DIRECTIONAL ONLY
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">THE PROTOCOL</p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-5 leading-[1.02] tracking-tight">
                Six pillars.<br/>One daily plan.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-3">
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                You don't choose between strength and breathwork, or stretching and nutrition. The Index decides what the spine and the system most need today, and your plan reorders itself around it.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {PILLARS.map((p)=>(
              <article key={p.n} className="bg-background p-8 hover:bg-card/50 transition group">
                <div className="flex items-start justify-between">
                  <p className="font-mono-label text-[10px] text-muted-foreground">{p.n}</p>
                  <p.icon className="w-5 h-5 text-[var(--brand-amber)] opacity-70 group-hover:opacity-100 transition"/>
                </div>
                <h3 className="font-serif-display text-3xl mt-12">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* AFTER DARK — the spicy thesis, named */}
      <section className="relative px-6 md:px-10 py-32 border-b border-border overflow-hidden"
               style={{background:"radial-gradient(ellipse at 70% 40%, oklch(0.22 0.05 25) 0%, var(--brand-ink) 60%)"}}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-14 items-center relative">
          <div className="lg:col-span-6 relative">
            <img src={intimate} alt="" loading="lazy" width={1024} height={1280}
                 className="w-full aspect-[4/5] object-cover"
                 style={{boxShadow:"var(--shadow-ember)"}}/>
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/70">
              <span>FIG. 03 · AFTER DARK</span>
              <span style={{color:"var(--brand-blush)"}}>● 22:47</span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="font-mono-label text-[10px]" style={{color:"var(--brand-blush)"}}>
              THE PART NOBODY ELSE WILL SAY
            </p>
            <h2 className="font-serif-display text-5xl md:text-7xl mt-6 leading-[0.98] tracking-[-0.025em]">
              You don't want a<br/>
              <span className="italic" style={{
                background:"var(--gradient-ember)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"
              }}>functional spine.</span><br/>
              You want a life<br/>
              that uses it.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Lower back pain is the #1 reason couples avoid intimacy. The same six signals that govern recovery — circulation, pelvic floor, breath, sleep, inflammation, mobility — are the exact six that govern arousal, stamina and confidence in bed.
            </p>
            <p className="mt-6 text-lg text-foreground leading-relaxed max-w-xl">
              Train the system. The bedroom is downstream.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px border" style={{borderColor:"oklch(0.72 0.14 18 / 0.25)"}}>
              {[
                ["+34%","reported intimate frequency, week 8"],
                ["−47%","of users no longer cite pain as a barrier"],
                ["2.1×","self-rated confidence after 60 days"],
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

      {/* PAPER SECTION — the pitch on light ground */}
      <section className="px-6 md:px-10 py-32 border-b border-border"
               style={{background:"var(--brand-paper)", color:"var(--brand-paper-ink)"}}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono-label text-[10px]" style={{color:"var(--brand-clay)"}}>WHY NOW</p>
            <h2 className="font-serif-display text-4xl md:text-6xl mt-5 leading-[1.02] tracking-tight">
              Back pain affects 619M people. The market's answer is a stretch video.
            </h2>
            <p className="mt-8 text-lg leading-relaxed" style={{color:"oklch(0.35 0.01 60)"}}>
              The chronic-pain category is fragmented across PT clinics, telehealth, supplements, and content apps. None of them touch sexual function — even though the data is identical to the data that predicts it. BackBetter is the first product to integrate the stack and own the most underserved outcome in adult health.
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

      {/* METHODOLOGY — editorial split with breath/nutrition */}
      <section className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto space-y-32">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <img src={meditation} alt="" loading="lazy" width={1024} height={768} className="w-full aspect-[5/4] object-cover"/>
            <div>
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">PILLAR 04 · BREATH & CNS</p>
              <h3 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
                The shortest path between a calm nervous system and a confident body.
              </h3>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Vagal training, 4-7-8 down-regulation, body-scan visualization. Built with chronic-pain clinicians and sex therapists. Ten minutes, measurably lower next-morning pain and resting heart rate.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="lg:order-2">
              <img src={nutrition} alt="" loading="lazy" width={1024} height={768} className="w-full aspect-[5/4] object-cover"/>
            </div>
            <div className="lg:order-1">
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">PILLAR 05 · NUTRITION</p>
              <h3 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
                The plate that lowers inflammation also raises performance.
              </h3>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Omega-3, polyphenols, hydration, connective-tissue protein. Calibrated to today's training load and last night's sleep. Grocery lists you'll actually use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="px-6 md:px-10 py-32 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">FIELD NOTES</p>
          <h2 className="font-serif-display text-4xl md:text-6xl mt-5 max-w-2xl leading-[1.02] tracking-tight">
            From people who refuse to sit it out.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { img: t1, name: "Jake, 32", role: "L4–L5 herniation · Index 71 → 89", quote: "Six weeks in, the morning stiffness is gone. I'm back on the bike, lifting, and I stopped scheduling life around my back." },
              { img: t2, name: "Maya, 29", role: "Postpartum · Index 54 → 82",       quote: "The pelvic floor and breath work changed everything. I had no idea those numbers were connected to how I was feeling at night." },
              { img: t3, name: "Chris, 35", role: "Sciatica · Index 62 → 84",        quote: "It's the only product that treats me like a whole system. The Index makes the trade-offs obvious." },
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
      <section id="cta" className="px-6 md:px-10 py-40 border-b border-border">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">BEGIN</p>
          <h2 className="font-serif-display text-5xl md:text-8xl mt-6 leading-[0.98] tracking-[-0.025em]">
            Find your<br/>
            <span className="italic text-[var(--brand-amber)]">Performance Index.</span>
          </h2>
          <p className="mt-10 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            A 7-minute baseline. We assemble your protocol the same day. Two weeks free, then $24/month — less than one PT visit.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <a href="#" className="px-7 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-90 transition">Download for iOS</a>
            <a href="#" className="px-7 py-3.5 rounded-full border border-border font-medium text-sm hover:bg-card transition">Download for Android</a>
          </div>
          <p className="mt-12 font-mono-label text-[9px] text-muted-foreground">
            NOT A MEDICAL DEVICE · CONSULT YOUR PHYSICIAN OR PHYSICAL THERAPIST
          </p>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-12">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8 font-mono-label text-[10px] text-muted-foreground">
          <div>
            <div className="flex items-center gap-2 text-foreground mb-3">
              <svg width="16" height="16" viewBox="0 0 22 22" className="text-[var(--brand-amber)]">
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
                <circle cx="11" cy="11" r="3" fill="currentColor"/>
              </svg>
              <span className="font-serif-display text-base">BackBetter</span>
            </div>
            <p>The Performance Index for the modern spine.</p>
          </div>
          <div className="md:text-center">© BackBetter Labs · MMXXVI</div>
          <div className="md:text-right">Built for backs that have things to do.</div>
        </div>
      </footer>
    </div>
  );
}
