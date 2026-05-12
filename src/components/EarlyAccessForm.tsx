import { useState } from "react";

export function EarlyAccessForm({ accent = "amber" }: { accent?: "amber" | "blush" }) {
  const accentVar = accent === "amber" ? "var(--brand-amber)" : "var(--brand-blush)";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /.+@.+\..+/.test(email);
    if (!ok) {
      setStatus("err");
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem("bs.earlyAccess") ?? "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("bs.earlyAccess", JSON.stringify(list));
    } catch {}
    setStatus("ok");
  };

  if (status === "ok") {
    return (
      <div className="w-full md:max-w-md md:ml-auto rounded-2xl border border-border bg-background/60 p-6">
        <p
          className="font-mono-label text-[10px] tracking-[0.22em] uppercase"
          style={{ color: accentVar }}
        >
          You're on the list
        </p>
        <p className="font-serif-display text-2xl italic mt-2 leading-[1.1]">
          Spot saved. We'll write when intake opens.
        </p>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          One email when your cohort opens. No drip sequence. No "Hey friend" newsletters from a guy named Brayden.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full md:max-w-md md:ml-auto flex flex-col gap-3">
      <label
        htmlFor="early-email"
        className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground"
      >
        Reserve your spot
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="early-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "err") setStatus("idle");
          }}
          className="flex-1 px-4 py-3 rounded-full bg-background border border-border focus:border-foreground/40 focus:outline-none text-sm placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-mono-label text-[11px] tracking-[0.22em] uppercase text-[var(--brand-ink)] hover:opacity-90 transition"
          style={{ background: accentVar, boxShadow: "var(--shadow-ember)" }}
        >
          Get early access
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
      {status === "err" ? (
        <p className="font-mono-label text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--brand-blush)" }}>
          Real email, please. We're sending one, not a hundred.
        </p>
      ) : (
        <p className="font-mono-label text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
          Pre-signup. No card. One email when intake opens. Unsubscribe in one click.
        </p>
      )}
    </form>
  );
}
