import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { evaluateMovement, type Pose, type SubjectPose, BONE_NAMES } from "@/lib/pose";
import { getMovement } from "@/lib/movements";

/**
 * MovementDemo — bone-driven, pose-data-driven.
 *
 * One procedural humanoid is rendered per subject. Per frame, the movement
 * is evaluated to a pose; pose values are applied directly to the bone refs
 * (no React reconciliation per frame). This is how Three.js's own SkeletonHelper
 * does it; same pattern, fewer abstractions.
 *
 * Adding a new movement: just add a Movement to src/lib/movements/.
 * Adding sex positions: same, but populate `pose.b` for a second subject.
 *
 * Swapping to a real rigged GLB (Mixamo / Ready Player Me):
 *   1. Load the GLB via `useGLTF`.
 *   2. Walk the bone hierarchy, capture refs by name to a `bones[bonename]` map.
 *   3. Apply pose data the same way `applyPose` does here.
 *   4. Delete this file's Humanoid component; keep everything else.
 */

export type MoveKey = "curl-up" | "side-plank" | "bird-dog" | "breath" | "reverse-kegel" | "decomp";

/* ───────── Materials ───────── */

const SKIN = "#c98d65";
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

/* ───────── Bone refs ───────── */

type BoneRefs = Partial<Record<(typeof BONE_NAMES)[number] | "root", THREE.Group | null>>;

function applyPose(refs: BoneRefs, pose: SubjectPose) {
  if (refs.root && pose.rootPosition) {
    refs.root.position.set(...pose.rootPosition);
  }
  if (refs.root && pose.rootRotation) {
    refs.root.rotation.set(...pose.rootRotation);
  }
  for (const name of BONE_NAMES) {
    const rot = pose[name];
    const ref = refs[name];
    if (ref && rot) ref.rotation.set(rot[0], rot[1], rot[2]);
  }
}

/* ───────── Body primitives ───────── */

function Segment({
  length,
  radius,
  taperTo = 1,
  material,
}: {
  length: number;
  radius: number;
  taperTo?: number;
  material: THREE.Material;
}) {
  return (
    <>
      <mesh position={[0, length / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * taperTo, radius, length, 24, 1]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[radius * 1.05, 20, 20]} />
        <primitive object={material} attach="material" />
      </mesh>
    </>
  );
}

function HeadMesh({ material }: { material: THREE.Material }) {
  return (
    <>
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.12, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <primitive object={material} attach="material" />
      </mesh>
    </>
  );
}

function HandMesh({ material }: { material: THREE.Material }) {
  return (
    <mesh position={[0, 0.05, 0]} castShadow>
      <sphereGeometry args={[0.07, 16, 16]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function FootMesh({ material }: { material: THREE.Material }) {
  return (
    <mesh position={[0, 0.05, 0.08]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
      <capsuleGeometry args={[0.07, 0.18, 8, 12]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ───────── Humanoid — bone tree with refs ───────── */

function Humanoid({ refs, material }: { refs: BoneRefs; material: THREE.Material }) {
  // The bone hierarchy: pelvis → spine chain → head; pelvis branches to limbs.
  // Each <group> with a ref is a joint; its child <group> at +Y is the next joint.
  return (
    <group ref={(r) => { refs.root = r; }}>
      <group ref={(r) => { refs.pelvis = r; }}>
        {/* Spine chain — each segment pivots at the bottom, child at top */}
        <group ref={(r) => { refs.spineLumbar = r; }}>
          <Segment length={0.18} radius={0.15} taperTo={0.92} material={material} />
          <group position={[0, 0.18, 0]}>
            <group ref={(r) => { refs.spineThoracic = r; }}>
              <Segment length={0.22} radius={0.16} taperTo={0.95} material={material} />
              <group position={[0, 0.22, 0]}>
                <group ref={(r) => { refs.spineCervical = r; }}>
                  <Segment length={0.08} radius={0.1} taperTo={0.9} material={material} />
                  <group position={[0, 0.08, 0]}>
                    <group ref={(r) => { refs.head = r; }}>
                      <HeadMesh material={material} />
                    </group>
                  </group>
                </group>

                {/* Shoulders at top of thoracic */}
                <group position={[-0.22, 0.18, 0]}>
                  <mesh castShadow>
                    <sphereGeometry args={[0.1, 20, 20]} />
                    <primitive object={material} attach="material" />
                  </mesh>
                  <group ref={(r) => { refs.shoulderL = r; }}>
                    <group ref={(r) => { refs.upperArmL = r; }}>
                      <Segment length={0.32} radius={0.06} taperTo={0.85} material={material} />
                      <group position={[0, 0.32, 0]}>
                        <group ref={(r) => { refs.forearmL = r; }}>
                          <Segment length={0.3} radius={0.05} taperTo={0.78} material={material} />
                          <group position={[0, 0.3, 0]}>
                            <group ref={(r) => { refs.handL = r; }}>
                              <HandMesh material={material} />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>

                <group position={[0.22, 0.18, 0]}>
                  <mesh castShadow>
                    <sphereGeometry args={[0.1, 20, 20]} />
                    <primitive object={material} attach="material" />
                  </mesh>
                  <group ref={(r) => { refs.shoulderR = r; }}>
                    <group ref={(r) => { refs.upperArmR = r; }}>
                      <Segment length={0.32} radius={0.06} taperTo={0.85} material={material} />
                      <group position={[0, 0.32, 0]}>
                        <group ref={(r) => { refs.forearmR = r; }}>
                          <Segment length={0.3} radius={0.05} taperTo={0.78} material={material} />
                          <group position={[0, 0.3, 0]}>
                            <group ref={(r) => { refs.handR = r; }}>
                              <HandMesh material={material} />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* Legs — branch from pelvis, point down by default */}
        <group position={[-0.13, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <group ref={(r) => { refs.thighL = r; }}>
            <Segment length={0.44} radius={0.09} taperTo={0.78} material={material} />
            <group position={[0, 0.44, 0]}>
              <group ref={(r) => { refs.shinL = r; }}>
                <Segment length={0.4} radius={0.07} taperTo={0.75} material={material} />
                <group position={[0, 0.4, 0]}>
                  <group ref={(r) => { refs.footL = r; }}>
                    <FootMesh material={material} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group position={[0.13, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <group ref={(r) => { refs.thighR = r; }}>
            <Segment length={0.44} radius={0.09} taperTo={0.78} material={material} />
            <group position={[0, 0.44, 0]}>
              <group ref={(r) => { refs.shinR = r; }}>
                <Segment length={0.4} radius={0.07} taperTo={0.75} material={material} />
                <group position={[0, 0.4, 0]}>
                  <group ref={(r) => { refs.footR = r; }}>
                    <FootMesh material={material} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ───────── Environment ───────── */

function Environment() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#0f0d0b" roughness={0.95} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
        <ringGeometry args={[0.6, 1.4, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.06} />
      </mesh>
    </>
  );
}

/* ───────── Scene ───────── */

function Scene({ moveKey, paused }: { moveKey: MoveKey; paused: boolean }) {
  const movement = useMemo(() => getMovement(moveKey), [moveKey]);
  const material = useSkinMaterial();
  const aRefs = useRef<BoneRefs>({});
  const bRefs = useRef<BoneRefs>({});
  const tRef = useRef(0);
  const camRotRef = useRef(0);

  useFrame((state, delta) => {
    if (!paused) tRef.current += delta;
    const pose: Pose = evaluateMovement(movement, tRef.current);
    applyPose(aRefs.current, pose.a);
    if (pose.b) applyPose(bRefs.current, pose.b);

    // Slow orbit
    camRotRef.current += delta * 0.06;
    const cam = state.camera;
    let r = 2.4;
    let camY = 1.1;
    let lookY = 0.35;
    if (moveKey === "bird-dog") {
      r = 2.2;
      camY = 1.0;
      lookY = 0.55;
    } else if (moveKey === "side-plank") {
      r = 2.3;
      camY = 1.0;
      lookY = 0.4;
    }
    cam.position.x = Math.sin(camRotRef.current) * r;
    cam.position.z = Math.cos(camRotRef.current) * r;
    cam.position.y = camY;
    cam.lookAt(0, lookY, 0);
  });

  // Determine if this movement involves a second subject
  const hasSubjectB = movement.keyframes.some((k) => k.pose.b);

  return (
    <>
      <Environment />
      <Humanoid refs={aRefs.current} material={material} />
      {hasSubjectB && <Humanoid refs={bRefs.current} material={material} />}
    </>
  );
}

/* ───────── Procedural canvas (fallback) ───────── */

function ProceduralCanvas({
  moveKey,
  paused = false,
}: {
  moveKey: MoveKey;
  paused?: boolean;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [2.2, 1.1, 1.8], fov: 36 }}
      gl={{ antialias: true, alpha: false }}
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 30%, #1f1a16 0%, #100c0a 60%, #050403 100%)",
      }}
    >
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
      <directionalLight position={[-2.6, 2.2, -1.4]} intensity={0.45} color={BLUSH} />
      <directionalLight position={[0, 2.4, -3]} intensity={0.5} color="#e8c69a" />
      <ambientLight intensity={0.18} />

      <Suspense fallback={null}>
        <Scene moveKey={moveKey} paused={paused} />
      </Suspense>
    </Canvas>
  );
}

/* ───────── Video player ───────── */

function VideoPlayer({
  moveKey,
  paused = false,
}: {
  moveKey: MoveKey;
  paused?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused) v.pause();
    else void v.play().catch(() => {});
  }, [paused]);

  return (
    <video
      ref={ref}
      src={`/demos/${moveKey}.mp4`}
      poster={`/demos/${moveKey}.jpg`}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 30%, #1f1a16 0%, #100c0a 60%, #050403 100%)",
      }}
    />
  );
}

/* ───────── Public component — video-first, procedural fallback ───────── */

export function MovementDemo({
  moveKey,
  paused = false,
}: {
  moveKey: MoveKey;
  paused?: boolean;
}) {
  // null = probing, true = use video, false = fallback to procedural
  const [hasVideo, setHasVideo] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/demos/${moveKey}.mp4`, { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        setHasVideo(r.ok && r.headers.get("content-type")?.startsWith("video") !== false);
      })
      .catch(() => {
        if (!cancelled) setHasVideo(false);
      });
    return () => {
      cancelled = true;
    };
  }, [moveKey]);

  return (
    <div className="absolute inset-0">
      {hasVideo === true ? (
        <VideoPlayer moveKey={moveKey} paused={paused} />
      ) : (
        <ProceduralCanvas moveKey={moveKey} paused={paused} />
      )}

      {hasVideo === false && (
        <div className="absolute bottom-4 right-4 font-mono-label text-[9px] tracking-[0.22em] uppercase text-white/40 pointer-events-none">
          ◆ procedural · video TBD
        </div>
      )}
    </div>
  );
}
