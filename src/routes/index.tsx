import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  Activity, Apple as AppleIcon, Brain, Heart, Waves, Moon,
  ArrowUpRight, ArrowRight, Plus,
} from "lucide-react";

type Pillar = {
  n: string;
  icon: ComponentType<{ className?: string }>;
  name: string;
  what: string;
  perf: string;
  bed: string;
};

function PillarCard({ p }: { p: Pillar }) {
  const [mode, setMode] = useState<"daily" | "dark">("daily");
  const [open, setOpen] = useState(false);
  const Icon = p.icon;
  const active = mode === "daily" ? p.perf : p.bed;

  return (
    <article
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="bg-background p-7 transition-colors duration-300 hover:bg-card/60 group relative cursor-pointer"
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-start justify-between mb-6">
        <p className="font-mono-label text-[10px] text-muted-foreground">PILLAR {p.n}</p>
        <Icon className="w-5 h-5 text-[var(--brand-amber)] opacity-70 group-hover:opacity-100 transition" />
      </div>
      <h3 className="font-serif-display text-3xl italic">{p.name}</h3>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.what}</p>

      <div className="mt-6 pt-5 border-t border-border">
        <div className="flex items-center gap-1 mb-4" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => { setMode("daily"); setOpen(true); }}
            className={`font-mono-label text-[10px] px-2.5 py-1.5 border transition ${
              mode === "daily"
                ? "border-[var(--brand-amber)] text-[var(--brand-amber)] bg-[var(--brand-amber)]/5"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            ↗ DAILY LIFE
          </button>
          <button
            type="button"
            onClick={() => { setMode("dark"); setOpen(true); }}
            className={`font-mono-label text-[10px] px-2.5 py-1.5 border transition ${
              mode === "dark"
                ? "border-[var(--brand-blush)] text-[var(--brand-blush)] bg-[var(--brand-blush)]/5"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
            style={mode === "dark" ? { borderColor: "var(--brand-blush)", color: "var(--brand-blush)" } : undefined}
          >
            ◆ AFTER DARK
          </button>
          <Plus
            className={`w-3.5 h-3.5 ml-auto text-muted-foreground transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          />
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p
              key={mode}
              className={`text-[15px] leading-snug ${mode === "dark" ? "italic" : ""}`}
              style={{ color: mode === "dark" ? "var(--brand-blush)" : "var(--foreground)" }}
            >
              {active}
            </p>
          </div>
        </div>

        {!open && (
          <p className="font-mono-label text-[10px] text-muted-foreground/70">
            Tap to reveal the outcome →
          </p>
        )}
      </div>
    </article>
  );
}
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
import { LiveProtocol } from "@/components/LiveProtocol";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackStroke — The Performance Index for spines that have a life" },
      { name: "description", content: "BackStroke converges spine, vitals, pelvic floor, breath, nutrition and sleep into a single Performance Index — the first integrated protocol linking back health to sexual performance and longevity." },
      { property: "og:title", content: "BackStroke — Performance Index for the modern spine" },
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
              <span className="font-serif-display text-xl tracking-tight italic">
                Back<span style={{color:"var(--brand-amber)"}}>Stroke</span>
              </span>
              <span className="font-script text-[12px] text-muted-foreground -mt-0.5 tracking-wide">
                a members' protocol for <span className="italic" style={{color:"var(--brand-blush)"}}>the well-lived body</span>
              </span>
            </div>
            <sup className="font-mono-label text-[8px] text-muted-foreground ml-0.5">℠</sup>
          </div>
          <nav className="hidden md:flex items-center gap-9 font-mono-label text-[10px] text-muted-foreground">
            <a href="#try" className="hover:text-foreground transition" style={{color:"var(--brand-amber)"}}>◆ Try Live</a>
            <a href="#thesis" className="hover:text-foreground transition">Thesis</a>
            <a href="#index" className="hover:text-foreground transition">The Index</a>
            <a href="#pillars" className="hover:text-foreground transition">Protocol</a>
            <a href="#evidence" className="hover:text-foreground transition">Evidence</a>
            <a href="#stories" className="hover:text-foreground transition">Stories</a>
          </nav>
          <a href="#try" className="text-sm px-4 py-2 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition">
            Try the Protocol
          </a>
        </div>
      </header>

      {/* HERO — bold, sexy, ad-style */}
      <section className="relative px-6 md:px-10 pt-16 md:pt-20 pb-28 border-b border-border overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7 relative z-10">
            <p className="font-mono-label text-[10px] text-[var(--brand-amber)] mb-6">
              ◆ THE PERFORMANCE INDEX FOR THE MODERN SPINE
            </p>
            <h1 className="font-serif-display text-[52px] md:text-[78px] lg:text-[96px] leading-[0.92] tracking-[-0.025em]">
              Fix the back.<br/>
              <span className="italic" style={{
                background:"var(--gradient-text)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"
              }}>Unlock the body.</span><br/>
              <span className="italic" style={{color:"var(--brand-blush)", textShadow:"var(--glow-pink)"}}>Reclaim the bedroom.</span>
            </h1>

            <p className="mt-8 text-xl text-foreground max-w-xl leading-snug font-serif-display">
              The clinically-built operating system for the male body after 30 — converging <span className="italic" style={{color:"var(--brand-amber)"}}>spine, pelvic floor, vascular, breath, nutrition and sleep</span> into one adaptive Performance Index. Built on the literature your urologist hasn't read yet.
            </p>

            <div className="mt-7 grid sm:grid-cols-3 gap-px bg-border border border-border max-w-xl">
              {[
                ["−63%", "back-pain days · wk 8 (n=412)"],
                ["+11%", "morning testosterone · wk 12"],
                ["+18 pts", "Performance Index · wk 6"],
              ].map(([v,l])=>(
                <div key={l} className="bg-background/80 px-4 py-3">
                  <p className="font-serif-display text-2xl" style={{color:"var(--brand-amber)"}}>{v}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{l}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground max-w-xl leading-relaxed">
              Directed by sports-medicine MDs, pelvic-floor PTs, urology and sleep physicians, AASECT-certified therapists and registered dietitians. <span className="text-foreground italic">No life coaches. No supplement stack. No guy in a tank top yelling about discipline.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#cta" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-amber)] text-[var(--brand-ink)] text-sm font-semibold hover:opacity-90 transition" style={{boxShadow:"var(--glow-teal)"}}>
                Request the Index <ArrowUpRight className="w-4 h-4"/>
              </a>
              <span className="font-script text-2xl leading-tight max-w-[260px] italic" style={{color:"var(--brand-blush)"}}>
                Fit. Flex. <span style={{color:"var(--brand-amber)"}}>F*ck.</span> — in that order, darling.
              </span>
            </div>
          </div>

          {/* Right: hero image + phone mockup + neon stamp */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <img src={heroCouple} alt="" width={1024} height={1280}
                   className="w-full aspect-[4/5] object-cover rounded-sm" style={{boxShadow:"var(--shadow-lift)"}}/>
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-label text-[9px] text-white/80">
                <span>SUBJECT 04 · DAY 42</span>
                <span style={{color:"var(--brand-pink)"}}>● LIVE</span>
              </div>
              <span className="absolute -top-4 left-4 font-script text-2xl rotate-[-4deg] drop-shadow-lg" style={{color:"var(--brand-pink)"}}>
                Your best come-from-behind story yet.
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
                  <p className="font-mono-label text-[7px] text-muted-foreground">TODAY'S PLAN</p>
                  <h4 className="font-serif-display text-base mt-0.5 leading-tight">Perform with<br/>Confidence 😉</h4>
                  <p className="text-[9px] text-muted-foreground mt-0.5">20 min · Core & Lower Back</p>
                  <button className="mt-2 w-full py-1.5 rounded-md text-[10px] font-semibold bg-[var(--brand-teal)] text-[var(--brand-ink)]">Start Workout</button>
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
            <div className="absolute -right-2 lg:-right-8 top-[28%] w-[130px] h-[130px] rounded-full flex items-center justify-center text-center rotate-[8deg]"
                 style={{
                   border:"2px solid var(--brand-pink)",
                   boxShadow:"var(--glow-pink)",
                   background:"oklch(0.16 0.008 60 / 0.55)",
                   backdropFilter:"blur(4px)"
                 }}>
              <p className="font-display-bold text-[13px] leading-tight" style={{color:"var(--brand-pink)"}}>
                Move better.<br/>
                <span className="font-script normal-case text-2xl block leading-none my-0.5">F*ck better.</span>
                Live better.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.04]"
             style={{backgroundImage:"linear-gradient(to right, white 1px, transparent 1px)", backgroundSize:"calc(100%/12) 100%"}}/>
      </section>

      {/* TAGLINE STRIP — gold foil on velvet */}
      <div className="border-y border-border" style={{background:"linear-gradient(180deg, oklch(0.16 0.02 26), oklch(0.13 0.012 28))"}}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 flex items-center justify-center gap-6 md:gap-12 font-serif-display italic text-base md:text-2xl tracking-tight" style={{color:"var(--brand-amber)"}}>
          <span className="opacity-50">◆</span>
          <span>Fit.</span>
          <span className="opacity-40 not-italic font-mono-label text-xs">·</span>
          <span>Flex.</span>
          <span className="opacity-40 not-italic font-mono-label text-xs">·</span>
          <span style={{color:"var(--brand-blush)"}}>F*ck.</span>
          <span className="opacity-50">◆</span>
        </div>
      </div>

      {/* CREDIBILITY BAND — the experts behind the protocol */}
      <div className="border-b border-border bg-card/40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-7 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <p className="font-mono-label text-[10px] text-[var(--brand-amber)] whitespace-nowrap">
            CLINICALLY DIRECTED BY ↓
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-serif-display text-sm md:text-base text-muted-foreground">
            <span><span className="text-foreground italic">Sports Medicine</span> MDs</span>
            <span className="opacity-40">·</span>
            <span><span className="text-foreground italic">Doctors</span> of Physiotherapy</span>
            <span className="opacity-40">·</span>
            <span><span className="text-foreground italic">Pelvic Floor</span> Specialists</span>
            <span className="opacity-40">·</span>
            <span><span className="text-foreground italic">Registered</span> Dietitians</span>
            <span className="opacity-40">·</span>
            <span><span className="text-foreground italic">AASECT</span> Sex Therapists</span>
            <span className="opacity-40">·</span>
            <span><span className="text-foreground italic">Sleep</span> Physicians</span>
          </div>
        </div>
      </div>

      {/* LIVE PROTOCOL — actually fix, flex, f*ck */}
      <section id="try" className="px-6 md:px-10 py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
             style={{ backgroundImage: "radial-gradient(var(--brand-amber) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1280px] mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
            <div className="lg:col-span-7">
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">◆ TRY THE PROTOCOL · NO SIGNUP</p>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-[0.98] tracking-tight">
                Stop reading the pitch.<br/>
                <span className="italic" style={{ color: "var(--brand-blush)", textShadow: "var(--glow-pink)" }}>
                  Run a session.
                </span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-muted-foreground leading-relaxed max-w-md">
              Tap a zone, log today's pain, run a real flex set with breath pacing — then flip the switch and watch the after-dark protocol assemble itself around your spine.
            </p>
          </div>
          <LiveProtocol />
          <p className="font-mono-label text-[9px] text-muted-foreground mt-4 text-center">
            FIG. 04 · INTERACTIVE PREVIEW · YOUR INDEX SCORE UPDATES IN REAL TIME ABOVE
          </p>
        </div>
      </section>

      {/* SIX PILLARS — fast, specific, performance + bedroom outcomes */}
      <section id="six" className="px-6 md:px-10 py-24 border-b border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="font-mono-label text-[10px] text-[var(--brand-amber)]">THE SIX · WHAT EACH ONE ACTUALLY DOES</p>
              <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.02] tracking-tight max-w-2xl">
                Six systems. <span className="italic text-muted-foreground">One body that performs — in the gym, on the floor, and in bed.</span>
              </h2>
            </div>
            <p className="font-mono-label text-[10px] text-muted-foreground max-w-xs">
              Train them in isolation and you get six mediocre wins. Train them as one stack and the body recomposes around capability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                n: "01", icon: Activity, name: "Spine",
                what: "Segmental mobility, deep-load tolerance, hip-hinge reprogramming. Targets the discs, erectors and QL — the structural reason you flinch.",
                perf: "Lift, run, carry kids, sit through a 4-hour flight without bracing.",
                bed: "Eliminates the 'wrong angle' problem. Hold positions longer, finish without spasm.",
              },
              {
                n: "02", icon: Waves, name: "Pelvic Floor",
                what: "The deep stabilizers nobody trains: levator ani, transverse abdominis, multifidus. Same muscles that hold your spine hold your erection — and your orgasm.",
                perf: "Core that braces under load. End leak-on-sneeze. Postpartum recovery that actually finishes.",
                bed: "Harder erections, delayed ejaculation, stronger orgasms (yes, both sexes). This is the one nobody is selling you.",
              },
              {
                n: "03", icon: Heart, name: "Cardio-Vitals",
                what: "Resting BP, HRV, endothelial function. The plumbing. Same arteries feed the lumbar discs and the cavernosal tissue.",
                perf: "Recover faster between sets, between days, between decades.",
                bed: "Erectile capacity is a vascular event. Lower BP by 10 points and the bedroom notices before the doctor does.",
              },
              {
                n: "04", icon: Brain, name: "Breath & CNS",
                what: "Vagal tone, 4-7-8 down-regulation, pain-reframing visualization. Built with chronic-pain clinicians and sex therapists.",
                perf: "Lower next-morning pain. Lower resting heart rate. A nervous system that stops bracing for impact.",
                bed: "Arousal is parasympathetic. You can't perform from a sympathetic state. This is the unlock most men miss.",
              },
              {
                n: "05", icon: AppleIcon, name: "Nutrition",
                what: "Anti-inflammatory plate, hydration math, connective-tissue protein, polyphenol load. Calibrated to today's training and last night's sleep.",
                perf: "Joint pain down inside two weeks. Energy that doesn't crash at 3pm.",
                bed: "Lower inflammation = higher free testosterone, better blood flow, steadier libido. Not a supplement. Food.",
              },
              {
                n: "06", icon: Moon, name: "Sleep",
                what: "Continuity, depth, and the 90-minute REM windows where tissue rebuilds and hormones reset.",
                perf: "This is where tomorrow's pain is decided. Skip it and the other five pillars stop compounding.",
                bed: "Testosterone is made between 2am and 6am. Morning erections are a vital sign. Protect the window.",
              },
            ].map((p) => (
              <PillarCard key={p.n} p={p} />
            ))}
          </div>

          <p className="font-script text-2xl md:text-3xl mt-10 italic text-center" style={{color:"var(--brand-blush)"}}>
            Six pillars. One Index. <span style={{color:"var(--brand-amber)"}}>A body that shows up.</span>
          </p>
        </div>
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
              The chronic-pain category is fragmented across PT clinics, telehealth, supplements, and content apps. None of them touch sexual function — even though the data is identical to the data that predicts it. BackStroke is the first product to integrate the stack and own the most underserved outcome in adult health.
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
      <section id="cta" className="relative px-6 md:px-10 py-32 border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
             style={{background:"radial-gradient(ellipse at 50% 50%, oklch(0.78 0.14 195 / 0.25), transparent 60%)"}}/>
        <div className="max-w-[1100px] mx-auto text-center relative">
          <p className="font-script text-3xl md:text-4xl mb-4 italic" style={{color:"var(--brand-blush)"}}>
            Fit. Flex. <span style={{color:"var(--brand-amber)"}}>F*ck.</span> ◆
          </p>
          <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl mt-2 leading-[0.95] tracking-[-0.025em]">
            Don't let your back<br/>
            be the reason<br/>
            <span className="italic" style={{color:"var(--brand-amber)", textShadow:"var(--glow-teal)"}}>you stay home.</span>
          </h2>
          <p className="mt-10 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            7-minute baseline. Your protocol assembles the same day. Two weeks free, then $24/month — less than one PT visit.
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
              <span className="font-serif-display text-base">BackStroke</span>
            </div>
            <p>The Performance Index for the modern spine.</p>
          </div>
          <div className="md:text-center">© BackStroke Labs · MMXXVI</div>
          <div className="md:text-right">Built for backs that have things to do.</div>
        </div>
      </footer>
    </div>
  );
}
