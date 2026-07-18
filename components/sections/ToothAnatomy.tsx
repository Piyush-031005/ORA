'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment, AdaptiveDpr, OrbitControls, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

const TREATMENTS = [
  { name: { en: 'Root Canal Therapy', hi: 'रूट कैनाल थेरेपी' }, color: '#B81104', description: { en: 'Pain-free extraction of infected pulp, saving your natural tooth.', hi: 'संक्रमित पल्प को दर्द-मुक्त निकालना, आपके प्राकृतिक दांत को बचाना।' }, position: [0.1, -0.2, 0.1] as [number, number, number] },
  { name: { en: 'Dental Crowns', hi: 'दंत मुकुट (क्राउन)' }, color: '#1E3A5F', description: { en: 'Custom porcelain caps to restore strength and aesthetics.', hi: 'ताकत और सौंदर्य को बहाल करने के लिए कस्टम चीनी मिट्टी के कैप।' }, position: [0, 0.8, 0] as [number, number, number] },
  { name: { en: 'Dental Implants', hi: 'दंत प्रत्यारोपण (इंप्लांट)' }, color: '#F59E0B', description: { en: 'Permanent titanium anchors for missing teeth replacement.', hi: 'गायब दांतों को बदलने के लिए स्थायी टाइटेनियम एंकर।' }, position: [-0.4, -0.6, 0] as [number, number, number] },
  { name: { en: 'Gum Contouring', hi: 'मसूड़ों का समोच्च' }, color: '#10B981', description: { en: 'Laser-assisted reshaping for a perfectly balanced smile.', hi: 'पूरी तरह से संतुलित मुस्कान के लिए लेजर-सहायता प्राप्त नया आकार देना।' }, position: [0.4, -0.1, 0.1] as [number, number, number] },
];

function TreatmentModel({ hovered, setHovered }: {
  hovered: string | null;
  setHovered: (v: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/inside_my_tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group}>
      <primitive object={cloned} />
      {/* Annotation dots */}
      {TREATMENTS.map((part) => (
        <mesh
          key={part.name.en}
          position={part.position}
          onClick={() => setHovered(hovered === part.name.en ? null : part.name.en)}
          onPointerOver={() => setHovered(part.name.en)}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color={hovered === part.name.en ? '#B81104' : part.color}
            transparent
            opacity={0.9}
          />
          {hovered === part.name.en && (
            <Html center distanceFactor={5} style={{ pointerEvents: 'none', zIndex: 50 }}>
              <div className="bg-white/95 backdrop-blur-md border border-[var(--border-light)] rounded-xl p-4 shadow-xl min-w-[200px]">
                <div className="font-serif font-bold text-[15px] text-[var(--text-dark)] mb-1">
                  {part.name.en}
                </div>
                <div className="text-[12px] text-[var(--text-gray)] leading-relaxed">
                  {part.description.en}
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
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight intensity={2.5} color="#ffffff" position={[5, 8, 5]} />
      <pointLight color="#B81104" intensity={2} distance={10} position={[-3, 2, -3]} />
      
      <Bounds fit clip observe margin={1.2}>
        <TreatmentModel hovered={hovered} setHovered={setHovered} />
      </Bounds>
      
      <OrbitControls makeDefault enableZoom={false} enablePan={false} autoRotate={!hovered} autoRotateSpeed={0.8} />
      
      <Environment preset="studio" />
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function ToothAnatomy() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  return (
    <section id="treatments-interactive" className="section-py bg-[var(--bg-cream)] relative overflow-hidden">
      <div className="container-ora">
        {/* Header */}
        <div className="text-center mb-16 max-w-[700px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#B81104]" />
            <span className="text-label text-[#B81104]">
              {t('Comprehensive Treatments', 'व्यापक उपचार')}
            </span>
            <div className="w-8 h-[1px] bg-[#B81104]" />
          </div>
          <h2 className="display-lg text-[var(--text-dark)] mb-6">
            {t('Mastering every layer', 'हर परत में महारत')} <br />
            <span className="italic text-[var(--text-gray)]">
              {t('of your oral health.', 'आपके मौखिक स्वास्थ्य की।')}
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* 3D Model */}
          <div className="w-full lg:w-1/2 h-[500px] bg-white rounded-[32px] overflow-hidden relative shadow-sm border border-[var(--border-light)]">
            <Canvas
              camera={{ fov: 40, position: [0, 0, 5] }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <AnatomyScene hovered={hovered} setHovered={setHovered} />
            </Canvas>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-widest text-[var(--text-gray)] bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
              {t('↻ Drag to rotate · Hover dots to explore', 'घुमाने के लिए खींचें · खोजने के लिए होवर करें')}
            </div>
          </div>

          {/* Parts list */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {TREATMENTS.map((part) => (
              <div
                key={part.name.en}
                className={`p-6 rounded-[24px] cursor-pointer transition-all duration-300 border ${
                  hovered === part.name.en 
                    ? 'bg-white border-[#B81104]/30 shadow-md scale-[1.02]' 
                    : 'bg-white/50 border-[var(--border-light)] hover:bg-white'
                }`}
                onMouseEnter={() => setHovered(part.name.en)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 transition-transform duration-300"
                    style={{ 
                      backgroundColor: hovered === part.name.en ? '#B81104' : part.color,
                      transform: hovered === part.name.en ? 'scale(1.5)' : 'scale(1)'
                    }} 
                  />
                  <div>
                    <h3 className="font-serif text-[18px] text-[var(--text-dark)] mb-2">
                      {lang === 'en' ? part.name.en : part.name.hi}
                    </h3>
                    <p className="text-[14px] text-[var(--text-gray)] leading-relaxed">
                      {lang === 'en' ? part.description.en : part.description.hi}
                    </p>
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
