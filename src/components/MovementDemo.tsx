import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural 3D movement demo.
 *
 * A stylised humanoid built from spheres and capsules, animated per-move with
 * keyframed joint rotations. The point isn't anatomical accuracy — the point
 * is that the user can see the rhythm of the move (rise / hold / lower) while
 * the timer runs.
 *
 * Per-move animations live in `animate{MoveName}`. Each returns the joint
 * angles given a time offset, smoothed with `easeInOutSine`.
 *
 * In production this gets replaced with a rigged GLB shot by the council.
 */

type MoveKey = "curl-up" | "side-plank" | "bird-dog" | "breath" | "reverse-kegel" | "decomp";

const SKIN = "#c89665"; // warm amber-stone
const ACCENT_GOLD = "#d6a85a";
const ACCENT_BLUSH = "#b06a64";

const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const wrap = (t: number, period: number) => (t % period) / period;

/* ───────── Body parts ───────── */

function Limb({
  length = 0.6,
  radius = 0.07,
  color = SKIN,
}: {
  length?: number;
  radius?: number;
  color?: string;
}) {
  // Capsule = cylinder + two spheres. Center at origin, length along Y.
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.08} />
      </mesh>
      <mesh position={[0, length / 2, 0]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.08} />
      </mesh>
      <mesh position={[0, -length / 2, 0]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.08} />
      </mesh>
    </group>
  );
}

function Head() {
  return (
    <mesh>
      <sphereGeometry args={[0.16, 24, 24]} />
      <meshStandardMaterial color={SKIN} roughness={0.55} metalness={0.1} />
    </mesh>
  );
}

function Torso() {
  return (
    <mesh>
      <capsuleGeometry args={[0.18, 0.7, 8, 16]} />
      <meshStandardMaterial color={SKIN} roughness={0.55} metalness={0.1} />
    </mesh>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
      <planeGeometry args={[8, 6]} />
      <meshStandardMaterial color="#0c0c0d" roughness={1} metalness={0} />
    </mesh>
  );
}

/* ───────── Curl-up rig ───────── */

function CurlUp({ t }: { t: number }) {
  // 4-second rep cycle: 1s rise, 2s hold (mostly), 1s lower.
  const cycle = wrap(t, 4);
  // Curve: rises from 0 to 1 in first 25%, holds at 1 until 75%, drops back.
  let rise = 0;
  if (cycle < 0.25) rise = ease(cycle / 0.25);
  else if (cycle < 0.75) rise = 1;
  else rise = 1 - ease((cycle - 0.75) / 0.25);

  const tiltDeg = 22 * rise; // 0–22°
  const torsoRot = THREE.MathUtils.degToRad(tiltDeg);

  return (
    <group>
      {/* Floor */}
      <Floor />

      {/* Whole body laid supine along +X. Hip pivot at origin, head at +X. */}
      <group rotation={[0, 0, Math.PI / 2]}>
        {/* From here y+ is along the body. Hip at y=0, head end at y=1. */}

        {/* Bent leg (right): thigh up, shin back. Hinge at hip going forward. */}
        <group position={[0, -0.05, 0.18]}>
          {/* Thigh */}
          <group rotation={[-Math.PI / 2.4, 0, 0]}>
            <group position={[0, 0.3, 0]}>
              <Limb length={0.6} />
            </group>
          </group>
          {/* Shin (going back to floor) */}
          <group position={[0, 0, 0.55]} rotation={[Math.PI / 1.4, 0, 0]}>
            <group position={[0, -0.3, 0]}>
              <Limb length={0.6} />
            </group>
          </group>
        </group>

        {/* Straight leg (left) */}
        <group position={[0, -0.05, -0.18]}>
          <group position={[0, -0.6, 0]}>
            <Limb length={1.2} />
          </group>
        </group>

        {/* Upper body group — this is what rotates for the curl */}
        <group rotation={[torsoRot, 0, 0]}>
          {/* Torso */}
          <group position={[0, 0.45, 0]}>
            <Torso />
          </group>

          {/* Head */}
          <group position={[0, 0.95, 0]}>
            <Head />
          </group>

          {/* Arms: hands resting under the lumbar (palms toward back) */}
          <group position={[0, 0.3, 0.2]}>
            <group rotation={[0.2, 0, 0]} position={[0, -0.05, 0]}>
              <Limb length={0.65} />
            </group>
          </group>
          <group position={[0, 0.3, -0.2]}>
            <group rotation={[0.2, 0, 0]} position={[0, -0.05, 0]}>
              <Limb length={0.65} />
            </group>
          </group>
        </group>
      </group>

      {/* Subtle floor highlight under hips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.5, 1.2, 32]} />
        <meshBasicMaterial color={ACCENT_GOLD} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/* ───────── Side plank rig ───────── */

function SidePlank({ t }: { t: number }) {
  // 4-second cycle: rise 1s, hold 2s, lower 1s
  const cycle = wrap(t, 4);
  let rise = 0;
  if (cycle < 0.25) rise = ease(cycle / 0.25);
  else if (cycle < 0.75) rise = 1;
  else rise = 1 - ease((cycle - 0.75) / 0.25);

  const lift = 0.35 * rise; // 0 to 0.35 hip lift

  return (
    <group>
      <Floor />
      {/* Whole body on side, length along +X */}
      <group rotation={[0, 0, 0]} position={[0, 0.15, 0]}>
        {/* Forearm down at one end, supporting */}
        <group position={[-0.55, -0.05 - lift * 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <Limb length={0.5} radius={0.07} />
        </group>

        {/* Torso lifted */}
        <group position={[0, lift, 0]} rotation={[0, 0, 0]}>
          <group rotation={[0, 0, Math.PI / 2]}>
            <Torso />
          </group>

          {/* Head */}
          <group position={[-0.55, 0.05, 0]}>
            <Head />
          </group>

          {/* Top arm */}
          <group position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
            <Limb length={0.65} />
          </group>
        </group>

        {/* Legs stacked, bent (week 1) */}
        <group position={[0.5, -0.1 - lift * 0.2, 0]}>
          <group rotation={[0, 0, Math.PI / 2.6]}>
            <Limb length={0.7} />
          </group>
        </group>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.4, 1.0, 32]} />
        <meshBasicMaterial color={ACCENT_GOLD} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/* ───────── Bird dog rig ───────── */

function BirdDog({ t }: { t: number }) {
  // 6s cycle: 1.5 rise side A, 1.5 hold A, switch, 1.5 rise side B, 1.5 hold B
  const cycle = wrap(t, 6);
  let leftLift = 0;
  let rightLift = 0;
  if (cycle < 0.25) leftLift = ease(cycle / 0.25);
  else if (cycle < 0.5) leftLift = 1 - ease((cycle - 0.25) / 0.25);
  else if (cycle < 0.75) rightLift = ease((cycle - 0.5) / 0.25);
  else rightLift = 1 - ease((cycle - 0.75) / 0.25);

  return (
    <group>
      <Floor />

      {/* Quadruped — torso horizontal, supported by 4 limbs */}
      <group position={[0, 0.5, 0]}>
        {/* Torso horizontal along X */}
        <group rotation={[0, 0, Math.PI / 2]}>
          <Torso />
        </group>

        {/* Head forward */}
        <group position={[0.55, 0.04, 0]}>
          <Head />
        </group>

        {/* Support arm (right) */}
        <group position={[0.35, -0.05, 0.18]} rotation={[0, 0, Math.PI]}>
          <group position={[0, 0.3, 0]}>
            <Limb length={0.55} />
          </group>
        </group>
        {/* Lifted arm (left) — extends forward when leftLift > 0 */}
        <group position={[0.35, 0, -0.18]}>
          <group
            rotation={[
              0,
              0,
              THREE.MathUtils.degToRad(180 - 90 * leftLift),
            ]}
            position={[Math.sin(leftLift * Math.PI / 2) * 0.25, leftLift * 0.05, 0]}
          >
            <group position={[0, 0.3, 0]}>
              <Limb length={0.55} />
            </group>
          </group>
        </group>

        {/* Support leg (left) */}
        <group position={[-0.35, -0.05, -0.18]} rotation={[0, 0, Math.PI]}>
          <group position={[0, 0.3, 0]}>
            <Limb length={0.55} />
          </group>
        </group>
        {/* Lifted leg (right) — extends back when rightLift > 0 */}
        <group position={[-0.35, 0, 0.18]}>
          <group
            rotation={[
              0,
              0,
              THREE.MathUtils.degToRad(180 + 90 * rightLift),
            ]}
            position={[-Math.sin(rightLift * Math.PI / 2) * 0.25, rightLift * 0.05, 0]}
          >
            <group position={[0, 0.3, 0]}>
              <Limb length={0.55} />
            </group>
          </group>
        </group>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.5, 1.2, 32]} />
        <meshBasicMaterial color={ACCENT_GOLD} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/* ───────── Breath / decomp / kegel — supine, gentle pulse ───────── */

function SupineWithPulse({ t, color = ACCENT_GOLD }: { t: number; color?: string }) {
  // 8s cycle for 4-7-8 breath: 4s inhale-expand, 4s exhale-contract
  const cycle = wrap(t, 8);
  let scale = 1;
  if (cycle < 0.5) scale = 1 + 0.06 * ease(cycle / 0.5);
  else scale = 1 + 0.06 * (1 - ease((cycle - 0.5) / 0.5));

  return (
    <group>
      <Floor />
      {/* Lying flat */}
      <group rotation={[0, 0, Math.PI / 2]} position={[0, 0.15, 0]}>
        {/* Legs (bent slightly, knees up) */}
        <group position={[0, -0.5, 0]} rotation={[-0.3, 0, 0]}>
          <Limb length={1.0} />
        </group>

        {/* Torso pulses gently */}
        <group position={[0, 0.45, 0]} scale={[1, 1, scale]}>
          <Torso />
        </group>

        {/* Head */}
        <group position={[0, 0.95, 0]}>
          <Head />
        </group>

        {/* Arms by sides (palms up for decomp / kegel) */}
        <group position={[0, 0.3, 0.22]} rotation={[0.1, 0, 0]}>
          <Limb length={0.65} />
        </group>
        <group position={[0, 0.3, -0.22]} rotation={[0.1, 0, 0]}>
          <Limb length={0.65} />
        </group>
      </group>

      {/* Breath halo — gentle pulsing ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.5, 0.5 + 0.4 * scale, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.08 * scale} />
      </mesh>
    </group>
  );
}

/* ───────── Scene wrapper ───────── */

function Scene({ moveKey, paused }: { moveKey: MoveKey; paused: boolean }) {
  const tRef = useRef(0);
  const cameraRotation = useRef(0);

  useFrame((state, delta) => {
    if (!paused) tRef.current += delta;
    // Subtle camera orbit
    cameraRotation.current += delta * 0.08;
    const cam = state.camera;
    const r = 2.6;
    cam.position.x = Math.sin(cameraRotation.current) * r;
    cam.position.z = Math.cos(cameraRotation.current) * r;
    cam.position.y = 1.4;
    cam.lookAt(0, 0.3, 0);
  });

  const t = tRef.current;
  switch (moveKey) {
    case "curl-up":
      return <CurlUp t={t} />;
    case "side-plank":
      return <SidePlank t={t} />;
    case "bird-dog":
      return <BirdDog t={t} />;
    case "breath":
      return <SupineWithPulse t={t} color={ACCENT_BLUSH} />;
    case "reverse-kegel":
      return <SupineWithPulse t={t} color={ACCENT_BLUSH} />;
    case "decomp":
      return <SupineWithPulse t={t} color={ACCENT_GOLD} />;
  }
}

export function MovementDemo({
  moveKey,
  paused = false,
}: {
  moveKey: MoveKey;
  paused?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        camera={{ position: [2.2, 1.4, 1.8], fov: 38 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "radial-gradient(ellipse at 40% 30%, #1d1916 0%, #0e0c0a 60%, #050403 100%)" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} color="#f4d493" castShadow />
        <directionalLight position={[-2, 2, -2]} intensity={0.35} color="#b06a64" />
        <pointLight position={[0, 2, 0]} intensity={0.4} color="#e6c690" />

        <Suspense fallback={null}>
          <Scene moveKey={moveKey} paused={paused} />
        </Suspense>
      </Canvas>
    </div>
  );
}
