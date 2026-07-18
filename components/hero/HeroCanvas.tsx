'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/three/utils';

// ─── Elegant Solid Tooth Model ──────────────────────────────────
function ToothModel({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        // Solid high-end ceramic/porcelain look
        node.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FFFFFF'),
          roughness: 0.15,
          metalness: 0.1,
          envMapIntensity: 2.0,
        });
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Elegant slow rotation
    group.current.rotation.y = clock.getElapsedTime() * 0.15;
    
    // Parallax on scroll
    const scrollProgress = Math.min(scrollY / 800, 1);
    group.current.position.y = lerp(0, 1.5, scrollProgress);
    group.current.position.z = lerp(0, -2, scrollProgress);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={group} scale={[1.2, 1.2, 1.2]} position={[0, -0.2, 0]}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

// ─── Scene ───────────────────────────────────────────────────────
function HeroScene({ scrollY }: { scrollY: number }) {
  return (
    <>
      <ambientLight intensity={0.8} color="#FFFFFF" />
      <directionalLight intensity={2.5} color="#FFFFFF" position={[5, 8, 5]} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight intensity={1.5} color="#F3F6F8" position={[-5, 3, -5]} />
      
      {/* Subtle rim light with the brand red */}
      <spotLight color="#B81104" intensity={8} distance={15} angle={0.6} penumbra={1} position={[4, -2, -4]} />

      <ToothModel scrollY={scrollY} />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.1}
        scale={10}
        blur={2.5}
        color="#1E3A5F"
      />

      {/* Studio environment for high-end reflections */}
      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────
export default function HeroCanvas({ scrollY }: { scrollY: number }) {
  return (
    <Canvas
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0, 7] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <HeroScene scrollY={scrollY} />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
