/**
 * PositionGuide — back-first guidance, FORKED BY ROLE.
 *
 * The core insight: the same position loads the giver and the receiver
 * completely differently. Missionary is fine for the receiver and the worst
 * one for a giver with a bad back. Receiver-on-top is the reverse. So the
 * guidance depends on who is hurting: pick Receiver, Giver, or Both, and the
 * card tailors to that role.
 *
 * Per role: a load read, what is good, what to watch, and how to protect the
 * low back. Voice: dry, specific, back-first. No em-dashes. Not medical advice.
 */
import type { PictogramKey } from "./Pictogram";

export type Role = "receiver" | "giver" | "both";
export type RoleGuide = { load: string; good: string; watch: string; protect: string[] };
export type Guide = { receiver: RoleGuide; giver: RoleGuide; bestIf: string };

export const POSITION_GUIDE: Partial<Record<PictogramKey, Guide>> = {
  spoon: {
    receiver: {
      load: "Low · passive, supported",
      good: "You are in front, on your side, doing nothing. Lumbar neutral and unloaded, no weight on you.",
      watch: "The only real risk is curling into a tight ball, which rounds the low back into flexion.",
      protect: ["Stay long, do not tuck into a hard C.", "Pillow between your knees so the top hip does not drop.", "Let your partner set the pace, you stay relaxed."],
    },
    giver: {
      load: "Low · side-lying, hip-driven",
      good: "You are also on your side, your own spine supported by the bed, bearing no weight. The work is a short hip drive, not a back movement.",
      watch: "Rounding your upper back to hug in and reach, or thrusting from the lumbar instead of the hips.",
      protect: ["Keep your own spine long, do not curl around your partner.", "Drive from the hips in a short range.", "Pillow under your waist if your side dips.", "Stay close so you are not reaching."],
    },
    bestIf: "Gentle for both. The first pick when either of you is flaring.",
  },
  "supine-knees-up": {
    receiver: {
      load: "Very low · decompression shape",
      good: "On your back with the knees over a cushion is the exact shape used to decompress the low back. Load near zero.",
      watch: "Lifting the hips to chase, which arches the back.",
      protect: ["Bolster under the knees, low back flat to the surface.", "Stay passive, hips down.", "Flatter pillow under the hips if it still arches."],
    },
    giver: {
      load: "Low to moderate · kneeling upright",
      good: "Kneeling tall between the legs, spine stacked, none of your weight on your partner.",
      watch: "Sitting back onto your heels and rounding, or arching hard to drive.",
      protect: ["Stay tall, drive from the hips, not the low back.", "Do not round forward and dump weight onto your partner.", "Knees a little wider for a stable base."],
    },
    bestIf: "Best when the receiver is the sore one and wants to be passive.",
  },
  missionary: {
    receiver: {
      load: "Low · if the hips are propped",
      good: "On your back, face to face, low load when a pillow holds your pelvis neutral.",
      watch: "Arching up to meet your partner is the flare.",
      protect: ["Pillow under your hips. Non-negotiable.", "Keep the low back quiet on the bed, do not arch to chase.", "Knees bent, feet flat."],
    },
    giver: {
      load: "High · you hold the plank",
      good: "Workable, but honestly this is the position that loads YOUR back the most as the giver.",
      watch: "Letting the hips sag drops your lumbar into a loaded arch, the classic giver flare. Holding the plank fatigues the back too.",
      protect: ["Honest plank, weight in hands and knees, ribs down.", "Brace the abs, do not let the hips sag.", "Drive from the hips.", "If your back is the bad one, flip it and take the bottom in receiver-on-top."],
    },
    bestIf: "Fine if the receiver is the sore one. Skip it if the giver's back is the problem.",
  },
  "side-T": {
    receiver: {
      load: "Low · side-lying",
      good: "You stay on your side, lumbar neutral and supported, while your partner does the work.",
      watch: "Twisting your shoulders and hips opposite ways to line up.",
      protect: ["Move as one unit, no spinal twist.", "Rest your top leg on your partner or a pillow.", "Let the angle come from your hips, not your back."],
    },
    giver: {
      load: "Low to moderate · kneeling",
      good: "Upright and square, spine stacked, no weight-bearing.",
      watch: "Leaning and twisting across to reach.",
      protect: ["Stay tall and square to your partner.", "Bring their hips to you instead of reaching.", "Drive from the hips."],
    },
    bestIf: "Good when one of you is sore and wants to lie still while the other works.",
  },
  "edge-bed": {
    receiver: {
      load: "Very low · fully held",
      good: "The mattress carries your whole spine in neutral. You do nothing.",
      watch: "Hips hanging off the edge into an arch.",
      protect: ["Hips on the mattress, not off it.", "Folded towel under the low back.", "Let your partner hold your legs."],
    },
    giver: {
      load: "Low to moderate · standing base",
      good: "You stand tall and the work comes from your legs and hips, so the spine can stay neutral.",
      watch: "Wrong height makes you hunch or arch to reach.",
      protect: ["Set the height so you stand tall, use a step if needed.", "Hinge from the hips, flat back.", "Hold their legs and bring them to you."],
    },
    bestIf: "Best when the receiver needs to be fully passive and held.",
  },
  "cowgirl-upright": {
    receiver: {
      load: "Moderate · you are active, upright",
      good: "You control depth, speed, and angle, so nothing gets pushed past your limit.",
      watch: "Leaning back into an arch, or a big bounce.",
      protect: ["Sit tall and stacked over the hips.", "Small range from the hips, no deep bounce.", "Hands on their chest or a headboard to share the load."],
    },
    giver: {
      load: "Very low · flat on your back",
      good: "The best one for a giver with a bad back. You lie flat, fully supported, and do nothing.",
      watch: "Thrusting up off the bed to meet, which arches you.",
      protect: ["Stay flat, let the top do the work.", "Knees up to brace if you like.", "Pillow under the hips optional."],
    },
    bestIf: "The move when the giver has the bad back. They rest, the receiver drives.",
  },
  "doggy-supported": {
    receiver: {
      load: "Low · chest supported",
      good: "Rear entry without holding your own back up. The pillow stack keeps your spine neutral instead of sagging.",
      watch: "Piking the hips up into a deep arch.",
      protect: ["Rest chest and head on a firm stack.", "Hips level with the shoulders, not hiked.", "Lower the hips and raise the support if the back arches."],
    },
    giver: {
      load: "Low to moderate · kneeling",
      good: "Upright kneeling behind, stacked spine, hip-driven.",
      watch: "Draping over your partner and rounding.",
      protect: ["Stay tall, do not lie over them.", "Drive from the hips.", "Keep the range controlled."],
    },
    bestIf: "The back-safe way to keep rear entry on the table for a sore receiver.",
  },
  "doggy-kneeling": {
    receiver: {
      load: "Moderate to high · your back holds the shape",
      good: "Familiar and direct, but only if you can hold a flat back the whole time.",
      watch: "On all fours the spine sags into extension, and most people arch harder under the drive. Rough for an extension-sensitive back.",
      protect: ["Hold a long, level, tabletop back. Brace the abs.", "Forearms down to calm the arch.", "If holding it hurts, switch to chest-supported. Do not power through."],
    },
    giver: {
      load: "Low to moderate · kneeling",
      good: "Upright behind, stacked, hip-driven. Fine for your back.",
      watch: "Rounding or leaning over to drive.",
      protect: ["Stay tall, drive from the hips.", "Keep the range controlled."],
    },
    bestIf: "Only if the receiver can hold a neutral back. Otherwise use supported rear-entry.",
  },
  scissor: {
    receiver: {
      load: "Very low · side-lying",
      good: "On your side, neutral and supported by the bed. One of the gentlest on your back.",
      watch: "Twisting to stay connected.",
      protect: ["Stay stacked, adjust from the hips.", "Pillow under the waist if it side-bends."],
    },
    giver: {
      load: "Very low · side-lying too",
      good: "You are also on your side, supported, bearing no weight, working from the hips. Rare in being gentle on the giver as well.",
      watch: "Twisting instead of sliding the hips.",
      protect: ["Keep your spine long and stacked.", "Adjust by sliding, not rotating.", "Small hip movements."],
    },
    bestIf: "The pick when both of you are dealing with a back.",
  },
  "seated-lap": {
    receiver: {
      load: "Moderate · upright, active",
      good: "Stacked spine, and you set a slow, controlled pace.",
      watch: "Slumping or arching under the upright load, or bouncing.",
      protect: ["Sit tall, spine stacked.", "Slow rock from the hips, not a bounce.", "Arms on their shoulders to share load."],
    },
    giver: {
      load: "Moderate · you bear some weight",
      good: "Upright and stacked, especially with a wall behind you.",
      watch: "Leaning back to support your partner, or slumping, both load the low back.",
      protect: ["Sit against a headboard or wall.", "Let your partner carry their own weight.", "Feet flat, tall spine."],
    },
    bestIf: "Good for closeness and control when neither back is acutely flared.",
  },
  standing: {
    receiver: {
      load: "Moderate · depends on the hinge",
      good: "Bracing on a surface lets you hinge from the hips and keep a flat back.",
      watch: "Bending from the waist, or arching, loads it fast.",
      protect: ["Brace both hands on a solid surface.", "Soft knees, hinge from the hips, flat back.", "Push the hips back, do not round."],
    },
    giver: {
      load: "Moderate to high · standing, driving",
      good: "Your legs and glutes can do the work if you stay tall.",
      watch: "Bending forward to reach, or arching to drive.",
      protect: ["Stand tall, hinge from the hips.", "Match heights with stance width or a step.", "Short, controlled range."],
    },
    bestIf: "Lowest priority for a sore back, either role. Brace and hinge if you do it.",
  },
};

const ROLE_TITLE: Record<"receiver" | "giver", string> = {
  receiver: "As the receiver",
  giver: "As the giver",
};

function Label({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "blood" }) {
  return (
    <p className="font-mono-label text-[10px] tracking-[0.22em] uppercase" style={{ color: tone === "blood" ? "var(--brand-oxblood)" : "oklch(0.45 0.02 40)" }}>
      {children}
    </p>
  );
}

/** map a load tag to a 1-4 level for the gauge */
function loadLevel(load: string): number {
  const s = load.toLowerCase();
  if (s.startsWith("very low")) return 1;
  if (s.includes("moderate to high")) return 4;
  if (s.startsWith("low")) return 2;
  if (s.startsWith("moderate")) return 3;
  if (s.startsWith("high")) return 4;
  return 2;
}
/** spinal-load gauge: four segments, green to oxblood, with a label */
function LoadMeter({ load }: { load: string }) {
  const lvl = loadLevel(load);
  const color = (i: number) => (i <= 2 ? "#6b8f5e" : i === 3 ? "#cf9a3f" : "#9a2f2f");
  return (
    <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }} aria-label={`spinal load ${lvl} of 4`}>
      <span className="font-mono-label text-[9px] tracking-[0.18em] uppercase" style={{ color: "oklch(0.5 0.02 40)" }}>
        Spine load
      </span>
      <span style={{ display: "inline-flex", gap: 3 }}>
        {[1, 2, 3, 4].map((i) => (
          <span key={i} style={{ width: 16, height: 6, borderRadius: 3, background: i <= lvl ? color(i) : "rgba(42,38,32,0.12)", transition: "background 200ms" }} />
        ))}
      </span>
    </span>
  );
}

function RoleBlock({ rg, heading }: { rg: RoleGuide; heading?: string }) {
  return (
    <div>
      {heading && (
        <p className="font-serif-display italic text-lg" style={{ color: "var(--brand-oxblood)" }}>{heading}</p>
      )}
      <div className="flex items-center gap-3 mt-1 flex-wrap">
        <p className="font-mono-label text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--brand-oxblood)" }}>
          {rg.load}
        </p>
        <LoadMeter load={rg.load} />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <Label tone="blood">Good for the back</Label>
          <p className="mt-1.5 text-sm leading-relaxed">{rg.good}</p>
        </div>
        <div>
          <Label tone="blood">Watch out</Label>
          <p className="mt-1.5 text-sm leading-relaxed">{rg.watch}</p>
        </div>
        <div>
          <Label tone="blood">Protect the low back</Label>
          <ul className="mt-2 flex flex-col gap-1.5">
            {rg.protect.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-snug">
                <span aria-hidden className="shrink-0" style={{ color: "var(--brand-oxblood)" }}>&middot;</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PositionGuide({ pkey, role }: { pkey: PictogramKey; role: Role }) {
  const g = POSITION_GUIDE[pkey];
  if (!g) return null;
  return (
    <div>
      {role === "both" ? (
        <div className="flex flex-col gap-7">
          <RoleBlock rg={g.receiver} heading={ROLE_TITLE.receiver} />
          <div style={{ borderTop: "1px solid oklch(0.86 0.025 70)" }} />
          <RoleBlock rg={g.giver} heading={ROLE_TITLE.giver} />
        </div>
      ) : (
        <RoleBlock rg={g[role]} />
      )}
      <div className="mt-6">
        <Label>Best if</Label>
        <p className="mt-1.5 text-sm italic leading-relaxed" style={{ color: "oklch(0.45 0.02 40)" }}>{g.bestIf}</p>
      </div>
    </div>
  );
}

export default PositionGuide;
