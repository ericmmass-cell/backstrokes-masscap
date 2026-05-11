import { createFileRoute } from "@tanstack/react-router";
import { Activity, Flame, MessageCircleHeart, Flower2, Trophy, Apple, Play, Star } from "lucide-react";
import heroCouple from "@/assets/hero-couple.jpg";
import workout from "@/assets/workout.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BackBetter — Strong Back. Hotter Life." },
      { name: "description", content: "The integrated health & fitness app for people with bad backs who don't just sit at home. Stronger back, better performance, more confidence." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap" },
    ],
  }),
});

const features = [
  { icon: Activity, title: "STRONGER BACK.", title2: "BETTER PERFORMANCE.", desc: "Targeted exercises to reduce pain, increase mobility, and unlock your best moves—everywhere.", color: "var(--neon-purple)" },
  { icon: Flame, title: "BUILT FOR REAL LIFE", title2: "(AND REAL NIGHTS).", desc: "Short, effective workouts you can do anywhere. Feel better so you can play harder.", color: "var(--neon-pink)" },
  { icon: MessageCircleHeart, title: "DATE CONFIDENTLY.", title2: "ENERGIZE YOUR GAME.", desc: "More confidence. More stamina. Less pain. Your back won't be the reason you call it early.", color: "var(--neon-teal)" },
  { icon: Flower2, title: "LESS PAIN. MORE PLEASURE.", title2: "BETTER RECOVERY.", desc: "Mobility, stretching, and recovery tools to keep your body (and mind) ready for whatever comes next.", color: "var(--neon-purple)" },
  { icon: Trophy, title: "TRACK IT. IMPROVE IT.", title2: "OWN IT.", desc: "Track your progress, beat pain patterns, and level up your life.", color: "var(--neon-teal)" },
];

const testimonials = [
  { img: t1, name: "Jake, 32", quote: "My back pain used to be a buzzkill. Now I'm the one they don't want to let leave." },
  { img: t2, name: "Maya, 29", quote: "Finally an app that gets it. Strong back, confident body, unforgettable dates." },
  { img: t3, name: "Chris, 35", quote: "More energy, less pain, way more action. Best app I've ever downloaded." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="relative z-20 px-6 md:px-12 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-teal)] to-[var(--neon-purple)] glow-teal" />
          <span className="text-2xl font-bold tracking-tight">
            Back<span className="text-[var(--neon-teal)]">Better</span>
            <sup className="text-xs ml-0.5 text-muted-foreground">™</sup>
          </span>
        </div>
        <a href="#download" className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--neon-teal)] text-primary-foreground font-semibold text-sm hover:opacity-90 transition glow-teal">
          Get the App
        </a>
      </header>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-12 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <p className="font-script text-2xl md:text-3xl mb-4">
              <span className="text-foreground">Strong back. </span>
              <span className="text-[var(--neon-pink)]">Hotter life.</span>
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] uppercase">
              Good in bed.<br />
              Great in life.<br />
              <span className="text-gradient">Unstoppable<br />in both.</span>
              <span className="text-[var(--neon-pink)] ml-2">♡</span>
            </h1>
            <div className="mt-8 h-px w-32 bg-[var(--neon-pink)]" />
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              The integrated health & fitness app for people with bad backs who <em className="text-foreground underline decoration-[var(--neon-teal)]">don't just</em> sit at home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#download" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] text-white font-semibold glow-pink hover:scale-105 transition">
                <Play className="w-4 h-4 fill-current" /> Start Free Trial
              </a>
              <a href="#features" className="inline-flex items-center px-7 py-3.5 rounded-full border border-border text-foreground font-semibold hover:bg-card transition">
                See how it works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-br from-[var(--neon-pink)]/20 via-[var(--neon-purple)]/20 to-[var(--neon-teal)]/20 blur-3xl rounded-full" />
            <img
              src={heroCouple}
              alt="Confident couple embracing — strong back, hotter life"
              width={1024}
              height={1024}
              className="relative rounded-3xl w-full object-cover aspect-square shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div className="space-y-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-5 group">
                <div
                  className="shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition group-hover:scale-110"
                  style={{ borderColor: f.color, boxShadow: `0 0 20px ${f.color}` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-wide">
                    {f.title}<br />{f.title2}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-12 space-y-8">
            <div className="text-center space-y-3">
              <p className="font-script text-3xl text-[var(--neon-teal)]">Healthy back.</p>
              <p className="font-script text-3xl text-[var(--neon-pink)]">High confidence.</p>
              <p className="font-script text-3xl text-[var(--neon-teal)]">More yes.</p>
            </div>

            {/* Phone mockup */}
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--neon-teal)]/30 to-[var(--neon-pink)]/30 blur-2xl rounded-[3rem]" />
              <div className="relative bg-black rounded-[2.5rem] p-3 border border-border shadow-2xl">
                <div className="bg-card rounded-[2rem] overflow-hidden">
                  <div className="px-6 pt-6 pb-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>9:41</span>
                    <span>•••</span>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl font-bold">Back<span className="text-[var(--neon-teal)]">Better</span></span>
                      <span className="flex items-center gap-1 text-sm"><Flame className="w-4 h-4 text-[var(--neon-pink)]"/>12</span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Today's Plan</p>
                    <h4 className="text-2xl font-bold mt-1">Perform with Confidence 😉</h4>
                    <p className="text-xs text-muted-foreground mt-1">20 min • Core & Lower Back</p>
                    <img src={workout} alt="Workout" loading="lazy" width={1024} height={768} className="rounded-2xl mt-4 w-full aspect-video object-cover" />
                    <button className="w-full mt-4 py-3 rounded-full bg-[var(--neon-teal)] text-primary-foreground font-semibold">Start Workout</button>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-secondary rounded-xl p-3">
                        <p className="text-[10px] text-muted-foreground">Pain Check-In</p>
                        <p className="text-2xl font-bold mt-1">2<span className="text-sm text-muted-foreground">/10</span></p>
                        <p className="text-xs text-[var(--neon-teal)]">Mild</p>
                      </div>
                      <div className="bg-secondary rounded-xl p-3">
                        <p className="text-[10px] text-muted-foreground">Mobility</p>
                        <svg viewBox="0 0 100 40" className="w-full mt-2">
                          <polyline fill="none" stroke="oklch(0.82 0.15 195)" strokeWidth="2" points="0,30 20,25 40,28 60,15 80,10 100,5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 top-1/3 hidden md:block">
                <div className="rounded-full border-2 border-[var(--neon-pink)] px-5 py-6 text-center text-xs font-bold leading-tight text-[var(--neon-pink)] ring-neon-pink rotate-6">
                  MOVE<br/>BETTER.<br/><span className="font-script text-base">F*ck</span><br/>BETTER.<br/>LIVE<br/>BETTER.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="font-script text-3xl text-[var(--neon-pink)] mb-8">Real people. Real results. Real nights.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-5 hover:border-[var(--neon-teal)] transition">
                <div className="flex gap-4 items-start">
                  <img src={t.img} alt={t.name} loading="lazy" width={512} height={512} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({length:5}).map((_,i)=><Star key={i} className="w-3 h-3 fill-[var(--neon-teal)] text-[var(--neon-teal)]"/>)}
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
                    <p className="text-xs mt-2 text-[var(--neon-pink)]">— {t.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase">
            Don't let your back<br />be the reason you miss out.
          </h2>
          <p className="font-script text-3xl md:text-4xl text-[var(--neon-teal)] mt-4">
            Fix it. Flex it. Enjoy it. <span className="text-[var(--neon-pink)]">♡</span>
          </p>
          <p className="mt-10 text-sm uppercase tracking-widest text-muted-foreground">Download BackBetter today</p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a href="#" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:scale-105 transition">
              <Apple className="w-7 h-7" />
              <span className="text-left leading-tight"><span className="block text-[10px] font-normal">Download on the</span>App Store</span>
            </a>
            <a href="#" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:scale-105 transition">
              <Play className="w-6 h-6 fill-current" />
              <span className="text-left leading-tight"><span className="block text-[10px] font-normal">GET IT ON</span>Google Play</span>
            </a>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">Not a medical device. Consult your doctor or physical therapist for personalized advice.</p>
        </div>
      </section>

      {/* Footer band */}
      <footer className="px-6 md:px-12 py-6 bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-pink)] to-[var(--neon-teal)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-2xl">♡</span>
          <p className="font-script text-lg md:text-2xl text-white tracking-wide font-bold uppercase" style={{fontFamily:"'Anton',sans-serif"}}>
            Stronger back. Hotter life. Better dates.
          </p>
          <Flame className="w-6 h-6 text-white" />
        </div>
      </footer>
    </div>
  );
}
