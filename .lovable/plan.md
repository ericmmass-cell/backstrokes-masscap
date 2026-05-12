## Scope

Two tracks, in order:

**Track A — Homepage redesign (editorial / print)**
**Track B — Functionality: the daily 8-minute Session Player (route + working prototype)**

Voice stays locked to BackStroke brand voice. No new copy direction; only tightening to fit new layout.

---

## Track A — Homepage redesign

Goal: make the page read like a magazine spread, not a SaaS landing page. Less scroll-fatigue, more typographic authority.

### New section order (cut, merge, restructure)

```
1. Masthead              header bar — wordmark left, ISSUE No. / date center, nav right
2. Cover                 oversized Fraunces headline, oxblood plate, single Fig. 01 anatomical mark
3. Dek + lede            standfirst paragraph, 2-column grid, drop cap
4. The thesis            3 numbered tenets (01 / 02 / 03), hairline rules, ivory plate
5. The protocol          8-minute breakdown as an editorial table (time | block | why)
6. Fig. 02 — the link    spine ↔ pelvic floor diagram, full-bleed ivory, caption typeset like a plate
7. Field notes           2 testimonials as pull-quotes, oversized opening glyph, attribution in small caps
8. The index             pricing as a single typeset price card, no boxes
9. Colophon / CTA        run-a-session CTA + masthead-style footer with credits
```

Cuts: convergence diagram section, correlation grid, the multi-card "why now" block, the redundant "after dark" block. Their content folds into Cover, Thesis, and Fig. 02.

### Visual system upgrades (editorial / print)

- Type: Fraunces for all display, oversized (clamp up to ~12rem on cover), tighter tracking (-0.04em). JetBrains Mono for figure labels and captions only. Inter for body, with proper measure (~62ch).
- Drop cap on the lede (Fraunces, 5 lines).
- Hairline rules (0.5px) instead of boxed cards everywhere.
- Numbered figure system: every diagram/section gets `Fig. 0N — Title` in mono caps.
- Two-column grid on desktop for body sections; single column on mobile with generous leading.
- Color: lean harder on existing oxblood + ivory + candlelight gold. One oxblood "plate" per spread for contrast. Add subtle paper grain layer (already in `.grain`).
- New SVG anatomical line marks (spine, pelvic floor) as Fig. 01 and Fig. 02 — minimal, single-stroke, ivory on oxblood / oxblood on ivory.
- Section transitions: hairline + mono caps section number `§ 02 — The Thesis`, no big card backgrounds.
- Remove emoji-feeling gradients/glows; keep one warm gold glow only on the cover.

### Layout polish

- Full-bleed sections alternating ink → paper → ink for editorial rhythm.
- Consistent vertical rhythm using 8px baseline.
- Mobile: stack to single column, headline cap at ~6rem, captions stay mono.

### Files touched

- `src/routes/index.tsx` — restructured, ~40% shorter
- `src/styles.css` — add `.drop-cap`, `.rule-hairline`, `.plate-ink`, `.plate-paper`, `.fig-label` utilities; one new font weight import if needed
- `src/components/AnatomyMark.tsx` (new) — inline SVG component for Fig. 01 / Fig. 02 / etc. (no external assets)
- Remove or stop importing: `ConvergenceDiagram`, `CorrelationGrid` (kept on disk, unimported)

---

## Track B — Functionality: 8-minute Session Player

Goal: a working, no-auth, no-DB prototype anyone can run in the browser today. Hooks for future personalization and progress tracking are stubbed but not built yet.

### Route

- `src/routes/session.tsx` — `/session`
- Hero "Run a session" button + footer CTA point here.

### Player structure

A single 8-minute block, hardcoded protocol (V1):

```
00:00–01:30  McGill curl-up           (3 × 20s holds, 10s rest)
01:30–03:00  Side plank — both sides  (2 × 20s each side)
03:00–04:30  Bird dog                 (2 × 30s each side)
04:30–06:00  Reverse kegel + breath   (8 cycles, 4s in / 6s out)
06:00–07:30  Hip hinge reset          (10 reps, slow)
07:30–08:00  Down-regulate            (box breath, eyes closed)
```

### Player UI

- Full-screen editorial layout, ivory on oxblood.
- Massive Fraunces current-block name, mono time remaining (MM:SS), thin progress hairline across the top, `Fig. 0N / 06` block counter.
- Controls: Start, Pause, Skip block, End session. Spacebar = play/pause, → = skip.
- Audio cue (Web Audio API beep) at block transitions and final 3-second countdown — no audio files needed.
- "Next up" peek line at bottom in mono caps.
- After 08:00: completion screen — "Session complete. The rent is paid." + Run again / Back to home.

### State

- Local React state only. No Cloud, no auth.
- `localStorage` key `bs.sessions.completed` increments on completion (simple streak counter shown on home: "N sessions logged"). This is the only persistence in V1.

### Files

- `src/routes/session.tsx` — route + player
- `src/lib/session-protocol.ts` — the V1 block list (typed, easy to swap)
- `src/components/session/Player.tsx` — timer, controls, transitions
- `src/components/session/AudioCue.tsx` — Web Audio beeps
- `src/hooks/useSessionTimer.ts` — interval, pause, skip logic

### Explicitly NOT in V1 (mapped, deferred)

- Intake quiz / personalization tracks (postpartum, post-prostatectomy)
- Auth, accounts, paid access
- Long-term progress dashboard, pain/erection/sex quality logging
- Video demonstrations of each block
- Multiple protocol tracks

These get their own routes later: `/intake`, `/login`, `/progress`, `/library`. The current build leaves clean seams for them (typed protocol module, localStorage stub).

---

## Deliverable order

1. Restructure `index.tsx` + new editorial CSS utilities + AnatomyMark SVGs.
2. Build `/session` with working timer, audio cue, completion screen, localStorage streak.
3. Wire homepage CTAs to `/session` and surface streak count on the cover.

No backend changes. No new dependencies.