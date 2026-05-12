import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural 3D movement demo, v2 — stylised anatomical figure.
 *
 * Design rules:
 *   1. Anatomical proportions: head ≈ 1/7.5 of body length. Torso 2.5, upper
 *      arm 1.6, forearm 1.4, hand 0.65, thigh 2.1, shin 1.9, foot 0.8.
 *   2. Joint hierarchy: pelvis is the root; spine + shoulders chain up;
 *      arms branch from shoulders; legs branch from pelvis.
 *   3. Each move animates joint angles only — never re-creates meshes per frame.
 *   4. Materials: PBR with warm subsurface-feeling skin tone.
 *   5. Lighting: three-point (key gold + fill blush + rim) with shadow casting.
 *
 * The real production path is a rigged GLB (Mixamo / Ready Player Me) with
 * baked animations. Drop a .glb into src/assets/3d/ and swap in `useGLTF`
 * + `useAnimations` — the rest of the player is stable.
 */

type MoveKey = "curl-up" | "side-plank" | "bird-dog" | "breath" | "reverse-kegel" | "decomp";

/* ───────── Materials ───────── */

const SKIN = "#c98d65";
const SKIN_SHADOW = "#8a5d40";
const GOLD = "#d6a85a";
const BLUSH = "#b06a64";

function useSkinMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: SKIN,
        roughness: 0.55,
        metalness: 0.05,
        clearcoat: 0.15,
        clearcoatRoughness: 0.4,
        sheen: 0.3,
        sheenColor: new THREE.Color("#e8b88c"),
        sheenRoughness: 0.5,
      }),
    [],
  );
}

/* ───────── Body primitives ───────── */

function Segment({
  length,
  radius,
  taperTo = 1,
  material,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  children,
}: {
  length: number;
  radius: number;
  taperTo?: number;
  material: THREE.Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
  children?: React.ReactNode;
}) {
  // A segment is rendered as a tapered capsule, pivoting at its top (-Y end).
  // The +Y end is the distal joint where children attach.
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, length / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * taperTo, radius, length, 24, 1]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Joint capsule at proximal end */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[radius * 1.05, 20, 20]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Children attach at the distal end */}
      <group position={[0, length, 0]}>{children}</group>
    </group>
  );
}

function Head({ material }: { material: THREE.Material }) {
  return (
    <group>
      {/* Neck */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.12, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Jaw / chin shadow plane */}
      <mesh position={[0, 0.16, 0.08]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Hand({ material }: { material: THREE.Material }) {
  // Stylised hand: rounded paddle.
  return (
    <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]} castShadow>
      <sphereGeometry args={[0.07, 16, 16]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Foot({ material }: { material: THREE.Material }) {
  return (
    <mesh position={[0, 0.05, 0.08]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
      <capsuleGeometry args={[0.07, 0.18, 8, 12]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ───────── Torso — segmented spine ───────── */

function Torso({
  spineFlex,
  material,
}: {
  spineFlex: number; // 0 to 1, drives curl
  material: THREE.Material;
}) {
  // The spine is 4 segments stacked: sacrum → lumbar → thoracic → cervical
  // Each rotates slightly to produce the curl curve.
  const segs = [
    { len: 0.16, rot: spineFlex * 0.08 }, // sacrum
    { len: 0.18, rot: spineFlex * 0.16 }, // lumbar
    { len: 0.2, rot: spineFlex * 0.18 }, // thoracic
    { len: 0.1, rot: spineFlex * 0.12 }, // cervical
  ];

  return (
    <group>
      <Segment length={segs[0].len} radius={0.16} taperTo={0.96} material={material} rotation={[segs[0].rot, 0, 0]}>
        <Segment length={segs[1].len} radius={0.14} taperTo={0.92} material={material} rotation={[segs[1].rot, 0, 0]}>
          <Segment length={segs[2].len} radius={0.16} taperTo={0.95} material={material} rotation={[segs[2].rot, 0, 0]}>
            <Segment length={segs[3].len} radius={0.1} taperTo={0.9} material={material} rotation={[segs[3].rot, 0, 0]}>
              <Head material={material} />
            </Segment>
            {/* Shoulders */}
            <group position={[0, -0.02, 0]}>
              <Shoulder side="left" material={material} />
              <Shoulder side="right" material={material} />
            </group>
          </Segment>
        </Segment>
      </Segment>
    </group>
  );
}

function Shoulder({ side, material }: { side: "left" | "right"; material: THREE.Material }) {
  const dir = side === "left" ? -1 : 1;
  return (
    <group position={[dir * 0.22, 0, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

/* ───────── Arms ───────── */

function Arm({
  side,
  shoulderRot,
  elbowFlex,
  material,
}: {
  side: "left" | "right";
  shoulderRot: [number, number, number];
  elbowFlex: number; // 0 straight, 1 fully bent
  material: THREE.Material;
}) {
  return (
    <group rotation={shoulderRot}>
      <Segment length={0.34} radius={0.06} taperTo={0.85} material={material} rotation={[Math.PI, 0, 0]}>
        <group rotation={[-elbowFlex * 1.7, 0, 0]}>
          <Segment length={0.3} radius={0.05} taperTo={0.75} material={material}>
            <Hand material={material} />
          </Segment>
        </group>
      </Segment>
    </group>
  );
}

/* ───────── Legs ───────── */

function Leg({
  side,
  hipRot,
  kneeFlex,
  material,
}: {
  side: "left" | "right";
  hipRot: [number, number, number];
  kneeFlex: number;
  material: THREE.Material;
}) {
  return (
    <group position={[(side === "left" ? -1 : 1) * 0.14, 0, 0]} rotation={hipRot}>
      <Segment length={0.46} radius={0.09} taperTo={0.78} material={material} rotation={[Math.PI, 0, 0]}>
        <group rotation={[-kneeFlex * 1.8, 0, 0]}>
          <Segment length={0.42} radius={0.07} taperTo={0.75} material={material}>
            <Foot material={material} />
          </Segment>
        </group>
      </Segment>
    </group>
  );
}

/* ───────── Floor / environment ───────── */

function Environment() {
  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#0f0d0b" roughness={0.95} metalness={0} />
      </mesh>
      {/* Mat — gold rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
        <ringGeometry args={[0.6, 1.4, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.06} />
      </mesh>
      {/* Subtle inner mat ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0015, 0]} receiveShadow>
        <ringGeometry args={[0.5, 0.52, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} />
      </mesh>
    </>
  );
}

/* ───────── Animation curves ───────── */

const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const wrap = (t: number, period: number) => (t % period) / period;

function repCycle(t: number, period: number) {
  // Quarter rise, half hold, quarter lower. Returns 0–1.
  const c = wrap(t, period);
  if (c < 0.25) return ease(c / 0.25);
  if (c < 0.75) return 1;
  return 1 - ease((c - 0.75) / 0.25);
}

/* ───────── Per-move rigs ───────── */

function CurlUp({ t, material }: { t: number; material: THREE.Material }) {
  const rep = repCycle(t, 4);
  // Hip pivot rotation — curl flexes whole upper body. Spine adds the chin tuck.
  const hipRot = rep * THREE.MathUtils.degToRad(18);
  const spineFlex = rep;
  // Subtle breath
  const breath = Math.sin(t * 1.4) * 0.005;

  return (
    <group>
      <Environment />
      {/* Supine — body lies along +Z, hip pivot at origin */}
      <group position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Pelvis pivot */}
        <group rotation={[-hipRot, 0, 0]}>
          <Torso spineFlex={spineFlex} material={material} />
          {/* Arms — reach forward toward bent knee for hand-under-lumbar curl */}
          <group position={[0, 0.5, 0.02]}>
            <Arm side="left" shoulderRot={[-0.4 - rep * 0.2, 0.15, 0]} elbowFlex={0.7 + rep * 0.2} material={material} />
            <Arm side="right" shoulderRot={[-0.4 - rep * 0.2, -0.15, 0]} elbowFlex={0.7 + rep * 0.2} material={material} />
          </group>
        </group>

        {/* Legs branch from pelvis */}
        {/* Bent knee on left */}
        <group rotation={[-1.4, 0, 0]}>
          <Leg side="left" hipRot={[0, 0, 0]} kneeFlex={1.5 + breath} material={material} />
        </group>
        {/* Right leg long, on floor */}
        <group rotation={[0.1, 0, 0]}>
          <Leg side="right" hipRot={[0, 0, 0]} kneeFlex={0.05} material={material} />
        </group>
      </group>
    </group>
  );
}

function SidePlank({ t, material }: { t: number; material: THREE.Material }) {
  const rep = repCycle(t, 4);
  const lift = rep * 0.22; // hip lift off floor

  return (
    <group>
      <Environment />
      {/* Body lies on left side along X axis, lifts at hips. */}
      <group position={[0, 0.18 + lift, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Spine angles to match the side plank line */}
        <group rotation={[0, 0, -rep * 0.18]}>
          <Torso spineFlex={0} material={material} />

          {/* Supporting (down) forearm */}
          <group position={[0, 0.55, 0]}>
            <Arm
              side="left"
              shoulderRot={[1.5, 0, 0]}
              elbowFlex={0.9}
              material={material}
            />
          </group>

          {/* Top arm — vertical when lifted, lateral when down */}
          <group position={[0, 0.55, 0]}>
            <Arm
              side="right"
              shoulderRot={[-rep * 1.5, 0, 0]}
              elbowFlex={0.0}
              material={material}
            />
          </group>
        </group>

        {/* Legs stacked, slight knee bend (week 1) */}
        <group rotation={[0, 0, 0]}>
          <Leg side="left" hipRot={[0, 0, 0]} kneeFlex={0.4} material={material} />
        </group>
        <group rotation={[0, 0, 0]} position={[0.04, 0, 0]}>
          <Leg side="right" hipRot={[0, 0, 0]} kneeFlex={0.4} material={material} />
        </group>
      </group>
    </group>
  );
}

function BirdDog({ t, material }: { t: number; material: THREE.Material }) {
  // 6s cycle: side A lifts, holds, lowers, then side B does the same.
  const c = wrap(t, 6);
  let leftLift = 0;
  let rightLift = 0;
  if (c < 0.5) leftLift = repCycle(c * 4, 1);
  else rightLift = repCycle((c - 0.5) * 4, 1);

  return (
    <group>
      <Environment />
      {/* Quadruped — spine horizontal */}
      <group position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <Torso spineFlex={0} material={material} />

        {/* Right (support) arm — straight down */}
        <group position={[0, 0.55, 0]}>
          <Arm side="right" shoulderRot={[1.5, 0, 0]} elbowFlex={0} material={material} />
        </group>

        {/* Left arm — extends forward when leftLift > 0 */}
        <group position={[0, 0.55, 0]}>
          <Arm
            side="left"
            shoulderRot={[1.5 - leftLift * 1.5, 0, 0]}
            elbowFlex={leftLift * 0.05}
            material={material}
          />
        </group>

        {/* Left (support) leg — straight down */}
        <group position={[0, -0.05, 0]}>
          <Leg side="left" hipRot={[1.5, 0, 0]} kneeFlex={1.5} material={material} />
        </group>

        {/* Right leg — extends back when rightLift > 0 */}
        <group position={[0, -0.05, 0]}>
          <Leg
            side="right"
            hipRot={[1.5 + rightLift * 1.5, 0, 0]}
            kneeFlex={1.5 - rightLift * 1.5}
            material={material}
          />
        </group>
      </group>
    </group>
  );
}

function Supine({ t, material, color = GOLD }: { t: number; material: THREE.Material; color?: string }) {
  // 8s breath cycle — torso scales slightly with breath
  const breath = (Math.sin((t / 8) * Math.PI * 2) + 1) / 2;
  const scale = 1 + breath * 0.05;

  return (
    <group>
      <Environment />
      <group position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <group scale={[1, scale, 1]}>
          <Torso spineFlex={0} material={material} />
          <group position={[0, 0.5, 0]}>
            <Arm side="left" shoulderRot={[0.1, 0.4, 0]} elbowFlex={0.05} material={material} />
            <Arm side="right" shoulderRot={[0.1, -0.4, 0]} elbowFlex={0.05} material={material} />
          </group>
        </group>

        <group rotation={[-0.4, 0, 0]}>
          <Leg side="left" hipRot={[0, 0, 0]} kneeFlex={1.0} material={material} />
          <Leg side="right" hipRot={[0, 0, 0]} kneeFlex={1.0} material={material} />
        </group>
      </group>

      {/* Breath halo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.55, 0.55 + 0.45 * breath, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.06 + 0.08 * breath} />
      </mesh>
    </group>
  );
}

/* ───────── Scene ───────── */

function Scene({ moveKey, paused }: { moveKey: MoveKey; paused: boolean }) {
  const tRef = useRef(0);
  const camRotRef = useRef(0);
  const material = useSkinMaterial();

  useFrame((state, delta) => {
    if (!paused) tRef.current += delta;
    camRotRef.current += delta * 0.06;
    const cam = state.camera;
    // Camera framing per move
    let r = 2.6;
    let camY = 1.3;
    let lookY = 0.4;
    if (moveKey === "bird-dog") {
      r = 2.4;
      camY = 1.1;
      lookY = 0.55;
    } else if (moveKey === "side-plank") {
      r = 2.5;
      camY = 1.2;
      lookY = 0.4;
    }
    cam.position.x = Math.sin(camRotRef.current) * r;
    cam.position.z = Math.cos(camRotRef.current) * r;
    cam.position.y = camY;
    cam.lookAt(0, lookY, 0);
  });

  const t = tRef.current;

  switch (moveKey) {
    case "curl-up":
      return <CurlUp t={t} material={material} />;
    case "side-plank":
      return <SidePlank t={t} material={material} />;
    case "bird-dog":
      return <BirdDog t={t} material={material} />;
    case "breath":
      return <Supine t={t} material={material} color={BLUSH} />;
    case "reverse-kegel":
      return <Supine t={t} material={material} color={BLUSH} />;
    case "decomp":
      return <Supine t={t} material={material} color={GOLD} />;
  }
}

/* ───────── Public component ───────── */

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
        camera={{ position: [2.2, 1.3, 1.8], fov: 36 }}
        gl={{ antialias: true, alpha: false }}
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, #1f1a16 0%, #100c0a 60%, #050403 100%)",
        }}
      >
        {/* Key light — warm gold from above-front */}
        <directionalLight
          position={[2.4, 4.2, 2.6]}
          intensity={1.6}
          color="#f4d493"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0005}
        />
        {/* Fill light — blush from opposite */}
        <directionalLight position={[-2.6, 2.2, -1.4]} intensity={0.45} color="#b06a64" />
        {/* Rim light — cool from behind for separation */}
        <directionalLight position={[0, 2.4, -3]} intensity={0.5} color="#e8c69a" />
        {/* Ambient — minimal, so shadows read */}
        <ambientLight intensity={0.18} />

        <Suspense fallback={null}>
          <Scene moveKey={moveKey} paused={paused} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/*
  ─────────────────────────────────────────────────────────────────────────────
  Production swap path
  ─────────────────────────────────────────────────────────────────────────────
  When you have rigged GLB assets, replace the per-move <CurlUp/> etc. with:

      import { useGLTF, useAnimations } from "@react-three/drei";

      function CurlUpReal() {
        const { scene, animations } = useGLTF("/src/assets/3d/curl-up.glb");
        const { actions } = useAnimations(animations, scene);
        useEffect(() => actions.curlUp?.reset().play(), []);
        return <primitive object={scene} />;
      }

  Mixamo workflow:
    1. Pick a humanoid character (free at mixamo.com)
    2. For each move: search Mixamo (e.g. "crunch", "side plank", "bird dog")
    3. Export as FBX with animation
    4. Convert FBX → GLB with `npx fbx2gltf` or Blender
    5. Drop in src/assets/3d/{move-key}.glb

  This file's interface (the MoveKey union, the paused prop, the Canvas
  wrapper) stays the same. Only the per-move rig component changes.
  ─────────────────────────────────────────────────────────────────────────────
*/
