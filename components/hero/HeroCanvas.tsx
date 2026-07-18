'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, AdaptiveDpr, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/three/utils';

// ─── Tooth Crown ────────────────────────────────────────────────
function ToothCrown({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FFFFFF'),
          roughness: 0.08,
          metalness: 0.05,
          envMapIntensity: 2.5,
        });
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.2;
    const scrollProgress = Math.min(scrollY / 800, 1);
    group.current.position.y = lerp(0, 1, scrollProgress);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
      <group ref={group} position={[0, 0.6, 0]}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

// ─── Metallic Implant Rod ───────────────────────────────────────
function ImplantRod({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null!);
  
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C0C2C4'),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 3.0,
  }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.2;
    const scrollProgress = Math.min(scrollY / 800, 1);
    group.current.position.y = lerp(-1.1, -0.5, scrollProgress);
  });

  return (
    <group ref={group} position={[0, -1.1, 0]}>
      {/* Main screw body - tapered */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.28, 1.2, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Screw thread rings */}
      {[-0.35, -0.15, 0.05, 0.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[0.22 + i * 0.015, 0.025, 8, 32]} />
          <primitive object={mat} attach="material" />
        </mesh>
      ))}
      {/* Top connector abutment */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.18, 0.25, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────
function HeroScene({ scrollY }: { scrollY: number }) {
  return (
    <>
      <ambientLight intensity={0.9} color="#FFFFFF" />
      <directionalLight intensity={2.5} color="#FFFFFF" position={[5, 8, 5]} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight intensity={1.2} color="#E8EEF3" position={[-5, 3, -5]} />
      <spotLight color="#B81104" intensity={5} distance={15} angle={0.6} penumbra={1} position={[3, -3, -3]} />

      <Bounds fit clip observe margin={1.1}>
        <group>
          <ToothCrown scrollY={scrollY} />
          <ImplantRod scrollY={scrollY} />
        </group>
      </Bounds>

      <ContactShadows position={[0, -2.2, 0]} opacity={0.15} scale={8} blur={2.5} color="#1E3A5F" />
      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────
export default function HeroCanvas({ scrollY }: { scrollY: number }) {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 6] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <HeroScene scrollY={scrollY} />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
