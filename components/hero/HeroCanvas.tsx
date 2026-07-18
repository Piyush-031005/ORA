'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/three/utils';

// ─── Particle System ─────────────────────────────────────────────
function ParticleField({ count = 3000, progress }: { count?: number; progress: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { positions, targets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // random sphere (scattered start)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      // converge to a tooth silhouette
      const t2 = Math.random() * Math.PI;
      const tr = Math.random() * 0.4;
      targets[i3] = tr * Math.cos(t2) * 0.6;
      targets[i3 + 1] = (Math.random() - 0.3) * 1.6;
      targets[i3 + 2] = (Math.random() - 0.5) * 0.3;
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
    const t = Math.min(progress * 1.5, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = lerp(positions[i], targets[i], ease);
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.025,
    color: new THREE.Color('#00D4FF'),
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  return <points ref={mesh} geometry={geometry} material={material} />;
}

// ─── Mouse Light ─────────────────────────────────────────────────
function MouseLight() {
  const light = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    if (!light.current) return;
    light.current.position.x = lerp(light.current.position.x, mouse.x * viewport.width * 0.5, 0.05);
    light.current.position.y = lerp(light.current.position.y, mouse.y * viewport.height * 0.5, 0.05);
  });

  return (
    <pointLight
      ref={light}
      color="#00D4FF"
      intensity={6}
      distance={8}
      position={[0, 0, 3]}
    />
  );
}

// ─── Tooth Model ─────────────────────────────────────────────────
function ToothModel({ visible, scrollY }: { visible: boolean; scrollY: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#F0F0FF'),
          metalness: 0.08,
          roughness: 0.15,
          transmission: 0.1,
          thickness: 0.5,
          envMapIntensity: 2,
          clearcoat: 0.5,
          clearcoatRoughness: 0.1,
        });
        node.castShadow = true;
      }
    });
    return c;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.25;
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.08;
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.08;
    // Scroll: push back and fade
    const scrollProgress = Math.min(scrollY / 600, 1);
    group.current.position.z = lerp(0, -4, scrollProgress);
    group.current.scale.setScalar(lerp(1, 0.2, scrollProgress));
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group} scale={[1.4, 1.4, 1.4]}>
        <primitive object={cloned} />
      </group>
    </Float>
  );
}

// ─── Scene ───────────────────────────────────────────────────────
function HeroScene({ particleProgress, scrollY }: { particleProgress: number; scrollY: number }) {
  return (
    <>
      <color attach="background" args={['#080818']} />
      <fog attach="fog" args={['#080818', 10, 30]} />

      {/* Lights */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight intensity={3} color="#ffffff" position={[5, 8, 5]} castShadow />
      <pointLight color="#27187D" intensity={2} distance={12} position={[-4, 2, -3]} />
      <pointLight color="#00D4FF" intensity={2} distance={10} position={[0, -3, -4]} />
      <pointLight color="#C8F0E8" intensity={1} distance={8} position={[0, 5, 0]} />
      <MouseLight />

      {/* Particles */}
      <ParticleField count={4000} progress={particleProgress} />

      {/* Tooth (visible after particles assemble) */}
      {particleProgress > 0.6 && (
        <ToothModel visible={particleProgress > 0.6} scrollY={scrollY} />
      )}

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={8}
        blur={2}
        color="#27187D"
      />

      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────
export default function HeroCanvas({ scrollY }: { scrollY: number }) {
  const [particleProgress, setParticleProgress] = useState(0);

  useEffect(() => {
    // Animate particle convergence on mount
    let start: number | null = null;
    const duration = 2800;
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
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 4.5] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <HeroScene particleProgress={particleProgress} scrollY={scrollY} />
    </Canvas>
  );
}

useGLTF.preload('/models/tooth.glb');
