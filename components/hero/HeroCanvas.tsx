'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

// ─── Tooth Crown ────────────────────────────────────────────────
function ToothCrown() {
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
    group.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.1}>
      <group ref={group} scale={2.2} position={[0, -0.5, 0]}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

// ─── Metallic Implant Rod ───────────────────────────────────────
function ImplantRod() {
  const group = useRef<THREE.Group>(null!);
  
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C0C2C4'),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 3.0,
  }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={group} position={[0, -1.7, 0]} scale={1.5}>
      {/* Main screw body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.26, 1.4, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Screw thread rings */}
      {[-0.4, -0.2, 0.0, 0.2, 0.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[0.21 + i * 0.01, 0.02, 8, 32]} />
          <primitive object={mat} attach="material" />
        </mesh>
      ))}
      {/* Top connector abutment */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.16, 0.2, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────
function HeroScene() {
  return (
    <>
      <ambientLight intensity={1.2} color="#FFFFFF" />
      <directionalLight intensity={3} color="#FFFFFF" position={[5, 8, 5]} castShadow />
      <directionalLight intensity={1.5} color="#FFE8E4" position={[-5, 3, -5]} />
      <spotLight color="#FFFFFF" intensity={4} distance={20} angle={0.5} penumbra={1} position={[0, 5, 5]} />

      <group position={[0, 0, 0]}>
        <ToothCrown />
        <ImplantRod />
      </group>

      <ContactShadows position={[0, -3.0, 0]} opacity={0.25} scale={12} blur={2.5} color="#8B0000" />
      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0, 8] }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, borderRadius: '32px' }}
    >
      <color attach="background" args={['#B81104']} />
      <HeroScene />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
