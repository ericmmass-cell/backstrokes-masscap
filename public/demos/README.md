# BackStroke movement videos — generation pack

Drop generated `.mp4` files into this directory. The session player auto-detects
them and falls back to the procedural figure if a clip is missing.

## File naming

The session player probes for `/demos/{move-key}.mp4` at runtime.

| Move key        | File                | Source            |
|-----------------|---------------------|-------------------|
| `curl-up`       | `curl-up.mp4`       | exercise, generate |
| `side-plank`    | `side-plank.mp4`    | exercise, generate |
| `bird-dog`      | `bird-dog.mp4`      | exercise, generate |
| `breath`        | `breath.mp4`        | down-train, generate |
| `reverse-kegel` | `reverse-kegel.mp4` | down-train, can reuse `breath.mp4` |
| `decomp`        | `decomp.mp4`        | down-train, generate |

Optional poster frames (`.jpg`, same base name) load before the video plays —
helps with the first-paint feel.

## Tool of choice

Best results, in order:

1. **Sora** (OpenAI) — best at "realistic adult performing an exercise" with
   prompt-level control over lighting and camera. Native MP4 output.
2. **Veo 3** (Google) — comparable. Good at slow controlled motion.
3. **Runway Gen-3** — slightly more stylized, faster turnaround.
4. **Pika 2** — last resort. Less reliable on body mechanics.

## Brand constraints — apply to every clip

These are *not* optional. Inconsistency reads as cheap.

- **Subject:** one real-feeling adult, mid-30s to mid-40s. Athletic but not
  bodybuilder. No celebrity look-alikes. Neutral expression — they are working,
  not modeling. Face de-emphasized; body is the subject.
- **Wardrobe:** fitted athletic. No visible logos. No bright colors. Charcoal,
  warm grey, deep amber, or cream. Skin shows on arms / shoulders / midsection
  if the move involves them. No shoes for floor-based moves.
- **Setting:** a single yoga mat on a dark hardwood or matte concrete floor.
  Empty room. No props beyond what the move requires (pillow for decomp).
- **Lighting:** one warm key light (gold / 2700K) at 45° from upper front-right.
  Soft fill from upper-left (subtle blush / cool). Practical-feeling, not studio.
  Dark moody falloff into the background.
- **Background:** matte amber-brown to near-black. No furniture, no windows,
  no posters. The body is the only subject.
- **Camera:** static. Slight slow drift or breathing handheld feel is fine, but
  no orbits or pans. Side view at floor level OR low 3/4 — never overhead and
  never directly front-on.
- **Aspect:** **16:9 landscape** (1920×1080) — the session player crops a 7/12
  column on desktop and full-width on mobile.
- **Length:** 6 seconds. Must loop seamlessly — last frame should match first.
- **No text on screen, no captions, no music, no breath sound design.** The app
  handles the audio bed separately. The video is silent.

## Per-move prompts

Use these verbatim, then add a closing line: *"Cinematic, magazine editorial
quality. 1920x1080. 6-second seamless loop. No text. Silent."*

### Curl-up

> A real adult, mid-30s, supine on a yoga mat in a dim studio. Hands placed
> beneath the lumbar arch. One knee bent up with foot flat on the mat, the
> other leg extended long. Performing a McGill curl-up: lifting the head and
> shoulders only 20 degrees off the mat — never further — holding for 4
> seconds, lowering for 1 second, then repeating. Side view, camera at floor
> level looking down the length of the body. Warm gold rim light from upper
> right, deep amber falloff into the background. Body in focus, face
> de-emphasized. Slow controlled tempo. No exaggeration. Athletic fitted
> charcoal clothing, no logos.

### Side plank

> A real adult performing a side plank on the right forearm on a yoga mat.
> Modified position: knees bent with shins angled back. Forearm directly under
> the shoulder, hips lifted in a straight line from shoulders to knees, top
> arm raised vertically. Holding the position with steady breath for 6
> seconds. Side view at floor level. Warm gold rim light from upper right.
> Dark amber background falloff. Athletic fitted clothing, no logos. Slow,
> controlled, no shaking.

### Bird dog

> A real adult on hands and knees on a yoga mat in a dim warm studio.
> Performing a bird-dog: extending the left arm forward parallel to the floor
> with thumb up, while simultaneously extending the right leg back with the
> heel at hip height. Body in one line from extended hand to extended heel.
> No rotation across the midline. Slow controlled tempo. 3/4 side view at
> floor level. Warm gold rim light. Dark amber background. Athletic fitted
> clothing, no logos. The figure breathes steadily, no shaking.

### Breath (4-7-8) — also covers reverse-kegel

> A real adult supine on a yoga mat in a dim warm studio. Knees bent up, feet
> flat. One hand resting on the belly, one on the chest. Performing slow
> diaphragmatic breath: belly rises slowly on the inhale (4 seconds), holds
> (7 seconds), falls on a long exhale (8 seconds). Eyes closed, jaw soft,
> shoulders down. The belly is the only thing visibly moving. Camera at 3/4
> floor level. Warm gold key light from upper right, dark amber falloff.
> Athletic fitted clothing, midsection slightly visible. Calm, intimate, not
> sleepy.

The same clip can serve `reverse-kegel.mp4` — the visual is identical; the
prompt text in the app changes the cue.

### Supported decompression

> A real adult supine on a yoga mat with a pillow supporting the bent knees.
> Arms overhead in a relaxed V, palms turned up. Eyes closed. Long, slow
> breath. The body is completely settled — no movement except the chest and
> belly rising softly. Side view at floor level. Warm gold rim light from
> upper right, deep amber background falloff. Athletic fitted clothing, no
> logos. 6-second seamless loop showing one full breath cycle. Calm,
> meditative, not asleep.

## Sex positions — when the time comes

The session player's two-subject mode is already wired (it auto-instantiates a
second subject when `pose.b` is set). For sex-position demos, the prompts need
a different register — implied, geometric, tasteful — to survive Sora / Veo
content policies. Two approaches that work:

1. **Silhouettes against warm light.** Two figures on a bed, low backlight,
   shoulder and torso silhouettes only. Read as intimacy without explicit
   anatomy. Survives most content filters.
2. **Editorial linen.** Two figures under a draped white linen sheet, only
   the geometry of the pose visible — knees, shoulders, the line of a spine.
   Reads as a Calvin Klein ad, not a porn site.

When you're ready to generate these, ask and I'll write the per-position
prompt pack with the 40 entries from the position library.

## After you have a clip — checklist

1. **Trim to 6.0 seconds exactly.** Off by 0.2s and the loop reads as a stutter.
2. **Loop-seam test.** Play it 3× in a row. The cut should be invisible.
3. **Re-encode H.264, web-optimized.** `ffmpeg -i in.mp4 -c:v libx264 -preset
   slow -crf 23 -movflags +faststart -pix_fmt yuv420p -an out.mp4`
4. **Strip audio.** `-an` above. Audio adds bytes and breaks autoplay on iOS
   if not muted at the element level.
5. **Aim for 2–4 MB per file.** Larger doesn't help; smaller starts to look
   compressed.
6. **Drop in this folder** with the exact filename from the table above.
7. **Refresh the session page.** The player auto-detects on next mount.

## Fallback

If a clip is missing, the session player renders the procedural 3D figure
with a small "◆ procedural · video TBD" tag in the bottom-right. No errors,
no broken state — the protocol still runs.
