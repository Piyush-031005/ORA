'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/three/utils';

// ─── Elegant Solid Tooth Model ──────────────────────────────────
function ToothModel({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null!);
  const implantRef = useRef<THREE.Mesh>(null!);
  const { scene } = useGLTF('/models/tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        // Solid high-end ceramic/porcelain look
        node.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FFFFFF'),
          roughness: 0.1,
          metalness: 0.1,
          envMapIntensity: 2.5,
        });
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  const implantMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D3D5D7'),
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 3.0,
  }), []);

  useFrame(({ clock }) => {
    if (!group.current || !implantRef.current) return;
    const time = clock.getElapsedTime();
    // Elegant slow rotation
    group.current.rotation.y = time * 0.2;
    implantRef.current.rotation.y = time * 0.2;
    
    // Parallax on scroll
    const scrollProgress = Math.min(scrollY / 800, 1);
    group.current.position.y = lerp(0.8, 2.5, scrollProgress);
    implantRef.current.position.y = lerp(-1.2, 0.5, scrollProgress);
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={group} scale={[1.0, 1.0, 1.0]} position={[0, 0.8, 0]}>
          <primitive object={cloned} />
        </group>
      </Float>
      
      {/* Metallic Implant Rod Base */}
      <mesh ref={implantRef} position={[0, -1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 32]} />
        <primitive object={implantMaterial} attach="material" />
        
        {/* Screw threads detail */}
        <mesh position={[0, -0.4, 0]}>
           <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
           <primitive object={implantMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
           <cylinderGeometry args={[0.38, 0.38, 0.1, 32]} />
           <primitive object={implantMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
           <cylinderGeometry args={[0.34, 0.34, 0.1, 32]} />
           <primitive object={implantMaterial} attach="material" />
        </mesh>
        
        {/* Connector Top */}
        <mesh position={[0, 0.85, 0]}>
           <cylinderGeometry args={[0.15, 0.25, 0.3, 32]} />
           <primitive object={implantMaterial} attach="material" />
        </mesh>
      </mesh>
    </>
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
        opacity={0.2}
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
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 8] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <HeroScene scrollY={scrollY} />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
