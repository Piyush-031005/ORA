'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/three/utils';

// ─── Particle System (Elegant Assembly) ──────────────────────────
function ParticleField({ count = 2000, progress }: { count?: number; progress: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { positions, targets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start in a wide, elegant ring
      const theta = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 2;
      positions[i3] = r * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 4;
      positions[i3 + 2] = r * Math.sin(theta);
      
      // Target tooth shape roughly
      const t2 = Math.random() * Math.PI;
      const tr = Math.random() * 0.4;
      targets[i3] = tr * Math.cos(t2) * 0.8;
      targets[i3 + 1] = (Math.random() - 0.3) * 1.8;
      targets[i3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return { positions, targets };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const t = Math.min(progress * 1.2, 1);
    const ease = 1 - Math.pow(1 - t, 4); // Smooth ease out
    for (let i = 0; i < count * 3; i++) {
      pos[i] = lerp(positions[i], targets[i], ease);
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.015,
    color: new THREE.Color('#A1140A'), // Premium red dust
    transparent: true,
    opacity: Math.max(0, 1 - progress * 1.5), // Fade out as tooth appears
    depthWrite: false,
  }), [progress]);

  return <points ref={mesh} geometry={geometry} material={material} />;
}

// ─── Elegant Tooth Model ─────────────────────────────────────────
function ToothModel({ visible, scrollY }: { visible: boolean; scrollY: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        // High-end ceramic/porcelain look
        node.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#FFFFFF'),
          metalness: 0.1,
          roughness: 0.2,
          transmission: 0.2, // Slight translucency like real teeth
          thickness: 1.5,
          envMapIntensity: 1.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          ior: 1.5,
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
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={group} scale={[1.8, 1.8, 1.8]} position={[0, -0.2, 0]}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

// ─── Scene ───────────────────────────────────────────────────────
function HeroScene({ particleProgress, scrollY }: { particleProgress: number; scrollY: number }) {
  return (
    <>
      <ambientLight intensity={0.6} color="#FFFACD" />
      <directionalLight intensity={2} color="#FFFFFF" position={[5, 8, 5]} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight intensity={1} color="#FFFACD" position={[-5, 3, -5]} />
      
      {/* Subtle rim light with the brand red */}
      <spotLight color="#A1140A" intensity={5} distance={10} angle={0.5} penumbra={1} position={[4, -2, -4]} />

      <ParticleField count={2000} progress={particleProgress} />

      {/* Fade in tooth */}
      <group visible={particleProgress > 0.4}>
        <ToothModel visible={true} scrollY={scrollY} />
      </group>

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.15}
        scale={10}
        blur={2.5}
        color="#1A1A1A"
      />

      {/* Studio environment for high-end reflections */}
      <Environment preset="city" />
      <AdaptiveDpr pixelated />
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────
export default function HeroCanvas({ scrollY }: { scrollY: number }) {
  const [particleProgress, setParticleProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 3500; // Slower, more elegant assembly
    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      setParticleProgress(Math.min(elapsed / duration, 1));
      if (elapsed < duration) requestAnimationFrame(step);
    }
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Canvas
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0, 6] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <HeroScene particleProgress={particleProgress} scrollY={scrollY} />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
