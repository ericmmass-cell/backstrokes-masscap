# Movements — pose-data pipeline

One humanoid skeleton, twenty bones, JSON poses. Adding any new movement — an
exercise or a sex position — is a data file. The renderer never changes.

## Bone schema

Twenty bones, anatomical hierarchy:

```
pelvis
├─ spineLumbar
│  └─ spineThoracic
│     ├─ spineCervical
│     │  └─ head
│     ├─ shoulderL → upperArmL → forearmL → handL
│     └─ shoulderR → upperArmR → forearmR → handR
├─ thighL → shinL → footL
└─ thighR → shinR → footR
```

Each bone has a 3-axis euler rotation (radians). The full set is defined in
`src/lib/pose.ts` as `BONE_NAMES`.

Plus per-subject root transform:

- `rootPosition: [x, y, z]` — world position of the pelvis
- `rootRotation: [x, y, z]` — orientation of the whole figure

## Authoring a single-subject movement (an exercise)

1. Create a file: `src/lib/movements/{your-move}.ts`
2. Export a `Movement` with keyframes:

```ts
import { deg, type Movement, type SubjectPose } from "@/lib/pose";

const RESTING: SubjectPose = {
  rootPosition: [0, 0.1, 0],
  rootRotation: [Math.PI / 2, 0, 0], // lying supine
  // ... bone rotations
};

const FLEXED: SubjectPose = {
  ...RESTING,
  spineThoracic: [deg(14), 0, 0],
};

export const YOUR_MOVE: Movement = {
  id: "your-move",
  label: "Your Move",
  duration: 4,
  loop: true,
  keyframes: [
    { time: 0, pose: { a: RESTING } },
    { time: 1, ease: "easeInOut", pose: { a: FLEXED } },
    { time: 3, ease: "linear", pose: { a: FLEXED } },
    { time: 4, ease: "easeInOut", pose: { a: RESTING } },
  ],
};
```

3. Register it in `src/lib/movements/index.ts`:

```ts
import { YOUR_MOVE } from "./your-move";

export const MOVEMENTS: Record<string, Movement> = {
  // ...
  "your-move": YOUR_MOVE,
};
```

Done. The session player and any other surface that calls `getMovement()` will
render it.

## Authoring a two-subject movement (a sex position)

Identical, but populate `pose.b` in every keyframe:

```ts
const A_SUPINE: SubjectPose = { /* ... */ };
const B_OVER: SubjectPose = {
  rootPosition: [0, 0.4, 0.6], // raised, behind A
  rootRotation: [0, 0, 0],
  // ... bone rotations
};

export const SIDE_BY_SIDE_SPOONS: Movement = {
  id: "p28-spoons",
  label: "Side-by-side spoons",
  duration: 6,
  loop: true,
  keyframes: [
    { time: 0, pose: { a: A_SUPINE, b: B_OVER } },
    { time: 3, ease: "easeInOut", pose: { a: A_SUPINE_BREATH, b: B_OVER_BREATH } },
    { time: 6, ease: "easeInOut", pose: { a: A_SUPINE, b: B_OVER } },
  ],
};
```

The renderer detects `pose.b` and auto-instantiates a second humanoid. Position
the two subjects relative to each other via their `rootPosition` fields.

The position library at `/positions` should eventually read from this registry
so each position card renders its actual 3D pose alongside the scored
attributes — but that's a wiring step, not a pipeline change.

## Coordinate system

- **+Y is up** (gravity points down, the floor is at y=0)
- **+X is right** (figure's left side when supine head pointing camera, due to mirror)
- **+Z is toward the camera** by default

The pelvis sits at the origin. `rootPosition` offsets the whole figure.
`rootRotation: [Math.PI/2, 0, 0]` tips the figure onto its back. `[0, 0,
Math.PI/2]` tips it onto its side.

## Joint angle reference

- **Shoulder flexion (arm forward)** → `upperArm: [-90°, 0, 0]`
- **Shoulder abduction (arm out to side)** → `upperArm: [0, 0, ±90°]`
- **Elbow flexion** → `forearm: [+90°, 0, 0]`
- **Hip flexion (thigh forward / up)** → `thigh: [-90°, 0, 0]` (supine context)
- **Knee flexion** → `shin: [+90°, 0, 0]`

The `deg()` helper from `pose.ts` converts degrees to radians, which is what
the renderer expects.

## Swapping to a real rigged GLB later

The bone names in this schema map cleanly to Mixamo / Ready Player Me's
standard humanoid rig (mixamorig:Spine, mixamorig:LeftArm, etc.).

When a real GLB lands in `src/assets/3d/`:

1. Load via `useGLTF`
2. Walk the skeleton, capture a `Record<BoneName, Bone>` map
3. In `applyPose`, set `bone.rotation` instead of the `<group>` rotation

The pose data — every keyframe in every Movement — works unchanged.

## Future: a pose editor

The honest next step for scaling to forty sex positions is a browser-based
pose editor: drag joints in 3D, save the result as JSON. The schema is
already simple enough to round-trip. That's a Phase 3 build.
