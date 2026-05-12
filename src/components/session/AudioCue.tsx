/**
 * Tiny Web Audio beep helpers. No assets.
 */
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function beep({ freq = 660, duration = 0.12, volume = 0.15 }: { freq?: number; duration?: number; volume?: number } = {}) {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 0;
  gain.gain.linearRampToValueAtTime(volume, c.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, c.currentTime + duration);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.02);
}

export const AudioCue = { transition: () => beep({ freq: 880, duration: 0.18 }), countdown: () => beep({ freq: 520, duration: 0.08 }), complete: () => { beep({ freq: 660 }); setTimeout(() => beep({ freq: 880, duration: 0.25 }), 180); } };
