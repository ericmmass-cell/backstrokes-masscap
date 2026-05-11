import { createFileRoute } from "@tanstack/react-router";
import { Activity, Apple as AppleIcon, Brain, Heart, Waves, LineChart, Play, ArrowUpRight } from "lucide-react";
import heroCouple from "@/assets/hero-couple.jpg";
import nutrition from "@/assets/nutrition.jpg";
import meditation from "@/assets/meditation.jpg";
import workout from "@/assets/workout.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackBetter — A whole-body protocol for people with bad backs" },
      { name: "description", content: "Movement, nutrition, breathwork, pelvic floor, and vitals — one protocol designed around your back. Built for people who refuse to sit it out." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
});

const pillars = [
  { n: "01", icon: Activity, title: "Movement", desc: "Spine-safe strength and mobility programs that progress with you. Built by physiotherapists, tuned by your data." },
  { n: "02", icon: Waves, title: "Pelvic Floor", desc: "Guided kegel and core protocols that restore the deep stabilizers your back actually depends on." },
  { n: "03", icon: AppleIcon, title: "Nutrition", desc: "Anti-inflammatory plates, hydration targets, and supplement guidance — calibrated for connective tissue recovery." },
  { n: "04", icon: Brain, title: "Breath & Visualization", desc: "Down-regulate the nervous system. Pain-reframing meditations and HRV-paced breathwork before bed and before you train." },
  { n: "05", icon: Heart, title: "Vitals", desc: "Blood pressure, resting heart rate, sleep, HRV. Sync your wearable and we'll surface the patterns that move your pain." },
  { n: "06", icon: LineChart, title: "Progress", desc: "A weekly read-out of what's working — pain scores, range of motion, capacity. No vanity metrics." },
];

const testimonials = [
  { img: t1, name: "Jake", role: "L4–L5 herniation", quote: "Six weeks in, the morning stiffness is gone. I'm back on the bike and lifting again — without bracing for the next flare." },
  { img: t2, name: "Maya", role: "Postpartum, chronic low back", quote: "The pelvic floor work alone changed everything. The nutrition tracking was the part I didn't know I needed." },
  { img: t3, name: "Chris", role: "Office worker, sciatica", quote: "Felt like a real protocol, not a content app. The breathwork before bed cut my night-time pain in half." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 rounded-sm bg-[var(--brand-amber)]" />
            <span className="font-serif-display text-xl tracking-tight">BackBetter</span>
          </div>
          <nav className="hidden md:flex items-center gap-9 font-mono-label text-[11px] text-muted-foreground">
            <a href="#protocol" className="hover:text-foreground transition">Protocol</a>
            <a href="#pillars" className="hover:text-foreground transition">Pillars</a>
            <a href="#science" className="hover:text-foreground transition">Science</a>
            <a href="#stories" className="hover:text-foreground transition">Stories</a>
          </nav>
          <a href="#download" className="text-sm px-4 py-2 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition">
            Start
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-20 pb-28 grain">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono-label text-[11px] text-[var(--brand-amber)] mb-8">A protocol for the unsedentary spine</p>
            <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight">
              A bad back<br />
              shouldn't decide<br />
              <em className="italic text-[var(--brand-amber)]">how you live.</em>
            </h1>
            <p className="mt-10 text-lg text-muted-foreground max-w-xl leading-relaxed">
              BackBetter is one program built around six pillars — movement, pelvic floor, nutrition, breath, vitals, and progress. Designed for people whose back hurts but whose life shouldn't have to wait.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="#download" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-amber)] text-primary-foreground font-medium hover:opacity-90 transition">
                Begin your assessment <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#protocol" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                <Play className="w-4 h-4" /> 90-second walkthrough
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <img
              src={heroCouple}
              alt="A couple at ease at home"
              width={1024}
              height={1280}
              className="w-full aspect-[4/5] object-cover rounded-sm"
              style={{ boxShadow: "var(--shadow-soft)" }}
            />
            <div className="absolute -left-3 -bottom-3 hidden md:block bg-card border border-border rounded-sm p-4 max-w-[220px]">
              <p className="font-mono-label text-[10px] text-muted-foreground">Today · pain</p>
              <p className="font-serif-display text-3xl mt-1">2.1<span className="text-base text-muted-foreground">/10</span></p>
              <p className="text-xs text-[var(--brand-sage)] mt-1">↓ 38% from week one</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["72%", "report less daily pain by week 4"],
            ["3.4×", "increase in spine-safe capacity"],
            ["−11", "mmHg average resting BP shift"],
            ["18 min", "median daily commitment"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif-display text-3xl md:text-4xl">{v}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Protocol */}
      <section id="protocol" className="px-6 md:px-10 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono-label text-[11px] text-muted-foreground">The protocol</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              A back program isn't a back program if it ignores the rest of you.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Most apps hand you a list of stretches. Pain returns. We treat the spine as a system: the muscles that move it, the floor that supports it, the food that rebuilds it, the nervous system that interprets it, and the vitals that quietly drive it.
            </p>
            <p>
              You complete a 7-minute assessment. We assemble a six-pillar plan. It adapts weekly to your pain scores, mobility, sleep, and resting heart rate.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="px-6 md:px-10 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {pillars.map((p) => (
              <article key={p.n} className="border-r border-b border-border p-8 hover:bg-card/40 transition group">
                <div className="flex items-start justify-between">
                  <p className="font-mono-label text-[10px] text-muted-foreground">{p.n}</p>
                  <p.icon className="w-5 h-5 text-[var(--brand-amber)] opacity-80 group-hover:opacity-100 transition" />
                </div>
                <h3 className="font-serif-display text-2xl mt-10">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split — meditation */}
      <section id="science" className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <img src={meditation} alt="Breathwork session" loading="lazy" width={1024} height={768} className="w-full aspect-[5/4] object-cover rounded-sm" />
          <div>
            <p className="font-mono-label text-[11px] text-muted-foreground">Pillar 04 · Breath & Visualization</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              Pain is a signal. We teach your nervous system to read it differently.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              HRV-paced breathwork, body-scan visualization, and short pre-sleep protocols designed with chronic-pain clinicians. The same techniques used in tier-one rehab programs, on your phone, ten minutes at a time.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["4-7-8 down-regulation before bed", "Pain-reframing visualization sequences", "Vagal tone training paired with mobility"].map(x => (
                <li key={x} className="flex gap-3 items-baseline">
                  <span className="w-1 h-1 rounded-full bg-[var(--brand-amber)] mt-2" />
                  <span className="text-muted-foreground">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Editorial split — nutrition */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="lg:order-2">
            <img src={nutrition} alt="Anti-inflammatory plate" loading="lazy" width={1024} height={768} className="w-full aspect-[5/4] object-cover rounded-sm" />
          </div>
          <div className="lg:order-1">
            <p className="font-mono-label text-[11px] text-muted-foreground">Pillar 03 · Nutrition</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              The plate is part of the protocol.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Inflammation, hydration, and protein for connective tissue repair. Not a diet — a daily framework calibrated to your training load and sleep debt, with grocery lists you'll actually use.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[["Omega-3","2.5g/d"],["Protein","1.6g/kg"],["Water","2.4L"]].map(([k,v])=>(
                <div key={k} className="border border-border rounded-sm py-4">
                  <p className="font-serif-display text-xl">{v}</p>
                  <p className="font-mono-label text-[9px] text-muted-foreground mt-1">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vitals dashboard */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="font-mono-label text-[11px] text-muted-foreground">Pillar 05 · Vitals</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              The signals your back has been trying to send you.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Blood pressure trend, resting heart rate, HRV, sleep continuity. Synced from Apple Health, Oura, Whoop, or entered manually. We surface the correlations between your vitals and your pain — the ones you'd never spot on your own.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-md p-6 md:p-8" style={{boxShadow:"var(--shadow-soft)"}}>
              <div className="flex items-center justify-between mb-6">
                <p className="font-mono-label text-[10px] text-muted-foreground">Last 14 days</p>
                <p className="font-mono-label text-[10px] text-[var(--brand-sage)]">All trending well</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  {l:"Blood Pressure",v:"118/76",d:"−6 mmHg"},
                  {l:"Resting HR",v:"58",d:"−4 bpm"},
                  {l:"HRV",v:"62 ms",d:"+11"},
                  {l:"Sleep",v:"7h 24m",d:"+38 min"},
                ].map(x=>(
                  <div key={x.l}>
                    <p className="font-mono-label text-[9px] text-muted-foreground">{x.l}</p>
                    <p className="font-serif-display text-2xl mt-2">{x.v}</p>
                    <p className="text-[11px] text-[var(--brand-sage)] mt-1">{x.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-32 relative">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.11 75)" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="oklch(0.78 0.11 75)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C40,75 60,60 100,55 C140,50 180,70 220,55 C260,40 300,30 340,25 C370,22 390,20 400,18 L400,120 L0,120 Z" fill="url(#g)"/>
                  <path d="M0,80 C40,75 60,60 100,55 C140,50 180,70 220,55 C260,40 300,30 340,25 C370,22 390,20 400,18" fill="none" stroke="oklch(0.78 0.11 75)" strokeWidth="1.5"/>
                </svg>
                <p className="absolute bottom-0 left-0 font-mono-label text-[9px] text-muted-foreground">Pain score · weekly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movement / phone */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-mono-label text-[11px] text-muted-foreground">Pillar 01 · Movement</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              Eighteen minutes. Most days. That's the ask.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Spine-safe strength, mobility, and pelvic floor work — programmed by physiotherapists, sequenced for your phase, and adjusted by your daily pain check-in.
            </p>
          </div>
          <div className="relative mx-auto max-w-xs">
            <div className="bg-black rounded-[2.2rem] p-2.5 border border-border" style={{boxShadow:"var(--shadow-soft)"}}>
              <div className="bg-card rounded-[1.8rem] overflow-hidden">
                <div className="px-5 pt-5 pb-3 flex items-center justify-between text-[10px] text-muted-foreground font-mono-label">
                  <span>9:41</span><span>● ● ●</span>
                </div>
                <div className="px-5 pb-5">
                  <p className="font-mono-label text-[10px] text-muted-foreground">Today's session</p>
                  <h4 className="font-serif-display text-2xl mt-1 leading-tight">Lower back<br/>capacity build</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">18 min · Phase 2 · Week 4</p>
                  <img src={workout} alt="" loading="lazy" width={1024} height={768} className="rounded-md mt-4 w-full aspect-video object-cover"/>
                  <button className="w-full mt-4 py-2.5 rounded-full bg-[var(--brand-amber)] text-primary-foreground text-sm font-medium">Begin</button>
                  <div className="grid grid-cols-2 gap-2.5 mt-3">
                    <div className="bg-secondary rounded-sm p-3">
                      <p className="font-mono-label text-[8px] text-muted-foreground">Pain · AM</p>
                      <p className="font-serif-display text-xl mt-1">2<span className="text-xs text-muted-foreground">/10</span></p>
                    </div>
                    <div className="bg-secondary rounded-sm p-3">
                      <p className="font-mono-label text-[8px] text-muted-foreground">Mobility</p>
                      <p className="font-serif-display text-xl mt-1">+14%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono-label text-[11px] text-muted-foreground">Field notes</p>
          <h2 className="font-serif-display text-4xl md:text-5xl mt-4 max-w-2xl leading-[1.05]">From people who stopped sitting it out.</h2>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {testimonials.map((t)=>(
              <figure key={t.name}>
                <blockquote className="font-serif-display text-xl leading-snug">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={t.img} alt="" loading="lazy" width={512} height={512} className="w-10 h-10 rounded-full object-cover grayscale"/>
                  <div>
                    <p className="text-sm">{t.name}</p>
                    <p className="font-mono-label text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="px-6 md:px-10 py-32 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif-display text-5xl md:text-7xl leading-[1.02]">
            Begin with a <em className="italic text-[var(--brand-amber)]">7-minute assessment.</em>
          </h2>
          <p className="mt-8 text-muted-foreground max-w-lg mx-auto">
            Tell us where it hurts, how you move, and what you want back. We'll build the protocol. First two weeks free.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <a href="#" className="px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm">Download for iOS</a>
            <a href="#" className="px-6 py-3 rounded-full border border-border font-medium text-sm hover:bg-card transition">Download for Android</a>
          </div>
          <p className="mt-10 font-mono-label text-[10px] text-muted-foreground">Not a medical device. Consult your physician or physical therapist.</p>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-10 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono-label text-[10px] text-muted-foreground">
          <span>© BackBetter Labs · MMXXVI</span>
          <span>Made with care for backs that have things to do.</span>
        </div>
      </footer>
    </div>
  );
}
