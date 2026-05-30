# BackStroke Workout Demo System

## Chosen approach

The workout demos are now media-first. `MovementDemo` checks for a real video loop at `/demos/workout/<move>.mp4` or `/demos/workout/<move>.webm`; if no video is present, it plays a four-frame photoreal sprite sheet for the move. This gives the product a live, human demonstration immediately, keeps Cloudflare Workers SSR clean, and leaves a straight upgrade path to filmed clinician-reviewed loops without rewriting the app.

## Files

- `src/components/MovementDemo.tsx` renders the workout-only media player.
- `src/components/HumanFigure.tsx` remains a compatibility wrapper for the current `/session` route.
- `public/demos/workout/*.jpg` are compressed four-frame desktop sprite sheets, each under 200 KB.
- `public/demos/workout/*-sm.jpg` are mobile sprite sheets, each under 50 KB.
- No `vite.config.ts` changes are required.

## Current Assets

The bundled JPGs are AI-generated photoreal motion studies created for this project with the built-in image generation tool, then compressed with `sips`.

Desktop tier: `sips -Z 1920 -s format jpeg -s formatOptions 72`.

Mobile tier: `sips -Z 960 -s format jpeg -s formatOptions 68`.

Original generated PNGs remain in:

- Curl-up: `/Users/ericmass/.codex/generated_images/019e56c9-44dc-7dd3-8031-1b40b3b376c9/ig_06a09c0dbfa344d2016a12f3627060819181c6d2a69b93aa61.png`
- Side bridge: `/Users/ericmass/.codex/generated_images/019e56c9-44dc-7dd3-8031-1b40b3b376c9/ig_06a09c0dbfa344d2016a12ca27d4b4819187911e12dff985ce.png`
- Bird-dog: `/Users/ericmass/.codex/generated_images/019e56c9-44dc-7dd3-8031-1b40b3b376c9/ig_06a09c0dbfa344d2016a12ca513c348191b051122ebc3c6a46.png`
- Diaphragmatic breath: `/Users/ericmass/.codex/generated_images/019e56c9-44dc-7dd3-8031-1b40b3b376c9/ig_06a09c0dbfa344d2016a12caa5e6208191a58024ce79ed1c0e.png`
- Reverse kegel: `/Users/ericmass/.codex/generated_images/019e56c9-44dc-7dd3-8031-1b40b3b376c9/ig_06a09c0dbfa344d2016a12cacffe908191b37a92270ef1e766.png`
- Supported decompression: `/Users/ericmass/.codex/generated_images/019e56c9-44dc-7dd3-8031-1b40b3b376c9/ig_06a09c0dbfa344d2016a12cafdccfc8191a2e788c5340ac44d.png`

No third-party asset license applies to these generated studies. They should still be treated as visual drafts until a clinician reviews them. The current player crossfades frames with move-specific timing so the fallback reads as a motion study rather than a slow slide loop.

## Upgrading To Real Video

Drop a clinician-reviewed loop into `public/demos/workout/` using the move key:

- `curl-up.mp4`
- `side-plank.mp4`
- `bird-dog.mp4`
- `breath.mp4`
- `reverse-kegel.mp4`
- `decomp.mp4`

Keep each loop short, muted, and seamless. H.264 MP4 is the default; add a matching `.webm` only if you want a smaller browser-preferred source. The component will pick video automatically and use the JPG only as a poster/fallback.

## Adding A Seventh Move

1. Add the key to `MoveKey`.
2. Add a `MoveSpec` entry in `MOVES`.
3. Add either `/public/demos/workout/<key>.mp4` or both `/public/demos/workout/<key>.jpg` and `/public/demos/workout/<key>-sm.jpg`.
4. If using a sprite sheet, make it four equal horizontal frames and set `cycleSeconds`, `cadence`, and `frameHold`.
5. Add the move to the session protocol data.
