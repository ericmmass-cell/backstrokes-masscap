# BackStroke Position Demo System

`PositionDemo.tsx` is the media-first visual layer for the `/positions` route. It uses the same pattern as the workout demos: show a polished four-frame sprite sheet immediately, then let a real `.mp4` or `.webm` loop replace it later if one exists.

## Why this approach

The position library has forty scored entries, but most share a smaller set of bedroom geometries. The renderer maps each position ID to one of seventeen non-explicit visual archetypes:

- `side-spoon`
- `supine-support`
- `side-facing`
- `seated-upright`
- `cowgirl-upright`
- `reverse-cowgirl`
- `stirrup-missionary`
- `side-leg-held`
- `quadruped-support`
- `edge-bed`
- `standing-support`
- `standing-wall`
- `prone-pillow`
- `cradle-sitting`
- `squat-over`
- `solo-side`
- `solo-supine`

That keeps the visuals lifelike without requiring forty bespoke shoots or animations. The demos are intentionally clothed and non-explicit, but they should read as actual sexual positions. The visual job is to show pelvis/torso geometry, support props, and spine load without showing nudity or genital detail.

## Assets

Sprite sheets live in:

```txt
public/demos/positions/<visual-key>.jpg
public/demos/positions/<visual-key>-sm.jpg
```

Each sheet is eight equal panels. The shipped sheets are generated from four primary poses plus four blended in-between frames, which makes the loop read less like a slide carousel while staying small enough for mobile. Desktop sheets are `3840x640`; mobile sheets are `1920x320`. All current assets are under 500 KB each.

The current assets were generated with Codex's built-in image generation tool from project-specific prompts. They are not copied from third-party libraries, stock photography, Lottie, Mixamo, or public-domain plates. No external asset license applies. Treat them as production visual drafts until a clinician reviews the exact body mechanics.

If a clinician-reviewed video loop is later available, drop it beside the sprite sheet:

```txt
public/demos/positions/<visual-key>.mp4
public/demos/positions/<visual-key>.webm
```

The component probes for video and swaps it in without changing route code.

## Adding Another Position

If the new position fits an existing archetype, add the position to `src/lib/position-library.ts`, then map its ID in `POSITION_VISUAL_BY_ID` inside `src/components/PositionDemo.tsx`.

If it needs a new visual archetype:

1. Generate or shoot a four-frame horizontal sprite sheet.
2. Save desktop and mobile JPGs under `public/demos/positions/`.
3. Add a new key to `PositionVisualKey`.
4. Add a matching entry in `POSITION_VISUALS`.
5. Map the new position ID in `POSITION_VISUAL_BY_ID`.

The route does not need to change.
