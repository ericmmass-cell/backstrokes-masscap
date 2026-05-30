/**
 * Animation clip registry.
 *
 * Each move can optionally have a hand-authored Three.js AnimationClip
 * that drives the Mixamo skeleton through a keyframed pose. When a clip
 * exists, RiggedFigure plays it via AnimationMixer. When it doesn't, the
 * existing pose-data path runs.
 *
 * Why both: pose data is fast to iterate but every value must be tuned
 * against Mixamo's bone local frames (hard without a visual debugger).
 * Hand-authored clips can use the same primitives but get bedded into
 * AnimationMixer, which is the standard Three.js path and slots in cleanly
 * with any future Blender or Mixamo-exported .glb animation drops.
 *
 * Adding a clip:
 *   1. Create src/lib/clips/<moveKey>.ts exporting `buildClip(subject: 'a'|'b'): AnimationClip | null`
 *   2. Add the entry to CLIP_BUILDERS below
 *   3. RiggedFigure picks it up automatically
 *
 * Authoring tip: run the page with ?debug=1 to get OrbitControls +
 * SkeletonHelper. Spin the camera, watch the bones, dial the values.
 */

import * as THREE from "three";
import type { MoveKey } from "@/components/MovementDemo";

import { buildClip as buildSpoonClip } from "./spoon";

type Subject = "a" | "b";
type ClipBuilder = (subject: Subject) => THREE.AnimationClip | null;

const CLIP_BUILDERS: Partial<Record<MoveKey, ClipBuilder>> = {
  spoon: buildSpoonClip,
  // curl-up, side-plank, bird-dog, breath, reverse-kegel, decomp: pose-data path
};

const cache = new Map<string, THREE.AnimationClip | null>();

export function getClipFor(moveKey: MoveKey, subject: Subject): THREE.AnimationClip | null {
  const key = `${moveKey}:${subject}`;
  if (cache.has(key)) return cache.get(key) ?? null;
  const builder = CLIP_BUILDERS[moveKey];
  const clip = builder ? builder(subject) : null;
  cache.set(key, clip);
  return clip;
}
