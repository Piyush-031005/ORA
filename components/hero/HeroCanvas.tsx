'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, AdaptiveDpr, OrbitControls, Bounds } from '@react-three/drei';
import * as THREE from 'three';

function ToothCrown() {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((n) => {
      if (n instanceof THREE.Mesh) {
        n.material = new THREE.MeshStandardMaterial({
          color: '#F4F6FA',
          roughness: 0.05,
          metalness: 0.08,
          envMapIntensity: 3,
        });
        n.castShadow = true;
      }
    });
    return c;
  }, [scene]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.18;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.08}>
      <group ref={ref} scale={1.8} position={[0, 0.25, 0]}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

function ImplantRod() {
  const ref = useRef<THREE.Group>(null!);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#9DA3A8',
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 4,
  }), []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.18;
  });

  return (
    <group ref={ref} position={[0, -0.9, 0]} scale={1.2}>
      {/* Abutment (top connector) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.35, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Neck taper */}
      <mesh castShadow position={[0, -0.34, 0]}>
        <cylinderGeometry args={[0.18, 0.23, 0.22, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Main body */}
      <mesh castShadow position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.22, 0.2, 0.9, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Thread rings */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, -0.5 - i * 0.14, 0]} castShadow>
          <torusGeometry args={[0.22, 0.018, 8, 32]} />
          <primitive object={mat} attach="material" />
        </mesh>
      ))}
      {/* Tapered tip */}
      <mesh castShadow position={[0, -1.72, 0]}>
        <coneGeometry args={[0.2, 0.28, 32]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight intensity={3.5} color="#ffffff" position={[4, 8, 6]} castShadow />
      <directionalLight intensity={2} color="#FFD0CC" position={[-6, 4, -4]} />
      <spotLight intensity={5} color="#ffffff" position={[0, 10, 4]} angle={0.4} penumbra={0.8} />
      <pointLight color="#FF6B6B" intensity={1.5} position={[-3, -2, 3]} />

      <Bounds fit clip observe margin={1.25}>
        <group>
          <ToothCrown />
          <ImplantRod />
        </group>
      </Bounds>

      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0, 8] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
