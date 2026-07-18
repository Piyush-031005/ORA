'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, Environment, AdaptiveDpr, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

const PARTS = [
  { name: 'Enamel', color: '#E8E8F5', description: 'The hardest substance in the human body. Protects against decay.', position: [0, 0.9, 0] as [number, number, number] },
  { name: 'Dentin', color: '#F5E6C8', description: 'Yellow-tinted layer beneath enamel. Contains microscopic tubules.', position: [0.4, 0.3, 0] as [number, number, number] },
  { name: 'Pulp', color: '#E8A0A0', description: 'Living tissue at the core. Houses nerves and blood vessels.', position: [0, 0, 0] as [number, number, number] },
  { name: 'Root', color: '#D4C4A8', description: 'Anchors the tooth firmly into the jawbone socket.', position: [-0.3, -0.7, 0] as [number, number, number] },
  { name: 'Nerve', color: '#C8F0E8', description: 'Transmits pain and temperature signals to the brain.', position: [0.2, -0.4, 0] as [number, number, number] },
  { name: 'Cementum', color: '#B8D4B8', description: 'Covers the root, connecting it to the periodontal ligament.', position: [-0.5, -0.3, 0] as [number, number, number] },
];

function AnatomyModel({ hovered, setHovered }: {
  hovered: string | null;
  setHovered: (v: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/inside_my_tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        const originalMat = node.material as THREE.MeshStandardMaterial;
        node.material = new THREE.MeshPhysicalMaterial({
          color: originalMat.color || new THREE.Color('#F0F0FF'),
          metalness: 0.05,
          roughness: 0.2,
          transmission: 0.05,
          clearcoat: 0.3,
          envMapIntensity: 1.5,
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
    <group ref={group} scale={[1.2, 1.2, 1.2]}>
      <primitive object={cloned} />
      {/* Annotation dots */}
      {PARTS.map((part) => (
        <mesh
          key={part.name}
          position={part.position}
          onClick={() => setHovered(hovered === part.name ? null : part.name)}
          onPointerOver={() => setHovered(part.name)}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial
            color={hovered === part.name ? '#00D4FF' : part.color}
            transparent
            opacity={0.9}
          />
          {hovered === part.name && (
            <Html center distanceFactor={4} style={{ pointerEvents: 'none' }}>
              <div style={{
                background: 'rgba(8,8,24,0.92)',
                border: '1px solid rgba(0,212,255,0.4)',
                borderRadius: 10,
                padding: '10px 14px',
                minWidth: 160,
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 30px rgba(0,212,255,0.2)',
              }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: '#00D4FF', marginBottom: 4 }}>
                  {part.name}
                </div>
                <div style={{ fontSize: 12, color: '#E8E8F8', lineHeight: 1.5 }}>
                  {part.description}
                </div>
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  );
}

function AnatomyScene({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  return (
    <>
      <color attach="background" args={['#0D0D2B']} />
      <ambientLight intensity={0.4} />
      <directionalLight intensity={3} color="#ffffff" position={[5, 8, 5]} />
      <pointLight color="#27187D" intensity={2} distance={10} position={[-3, 2, -3]} />
      <pointLight color="#00D4FF" intensity={1.5} distance={8} position={[3, -2, 3]} />
      <AnatomyModel hovered={hovered} setHovered={setHovered} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!hovered} autoRotateSpeed={0.8} />
      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function ToothAnatomy() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="anatomy"
      className="section-py"
      style={{ background: 'var(--midnight-soft)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(39,24,125,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-ora">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-label mb-4" style={{ color: 'var(--cyan-glow)' }}>Interactive Anatomy</div>
          <h2 className="display-lg" style={{ color: 'var(--ghost)', marginBottom: 16 }}>
            Your tooth.<br />
            <span className="text-gradient-royal">Engineered by nature.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Hover over the glowing points to explore each layer of your tooth. Understanding your teeth is the first step to protecting them.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* 3D Model */}
          <div style={{ flex: '1 1 500px', height: 520, borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative' }}>
            <div className="glass" style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)' }} />
            <Canvas
              camera={{ fov: 40, position: [0, 0, 5] }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ borderRadius: 'var(--radius-xl)' }}
            >
              <AnatomyScene hovered={hovered} setHovered={setHovered} />
            </Canvas>
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 12,
              color: 'var(--gray-600)',
              fontFamily: 'var(--font-sans)',
              whiteSpace: 'nowrap',
            }}>
              ↻ Drag to rotate  ·  Hover dots to explore
            </div>
          </div>

          {/* Parts list */}
          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PARTS.map((part) => (
              <div
                key={part.name}
                className="card-glass"
                style={{
                  padding: '16px 20px',
                  cursor: 'pointer',
                  borderColor: hovered === part.name ? 'rgba(0,212,255,0.4)' : undefined,
                  background: hovered === part.name ? 'rgba(0,212,255,0.05)' : undefined,
                  boxShadow: hovered === part.name ? '0 0 30px rgba(0,212,255,0.1)' : undefined,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setHovered(part.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: hovered === part.name ? '#00D4FF' : part.color,
                    boxShadow: hovered === part.name ? '0 0 12px #00D4FF' : undefined,
                    flexShrink: 0,
                    transition: 'all 0.3s',
                  }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--ghost)', marginBottom: 3 }}>
                      {part.name}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.5 }}>
                      {part.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload('/models/inside_my_tooth.glb');
