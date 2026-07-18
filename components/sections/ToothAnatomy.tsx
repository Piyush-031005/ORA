'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, AdaptiveDpr, OrbitControls, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

const TREATMENTS = [
  { name: { en: 'Root Canal Therapy', hi: 'रूट कैनाल थेरेपी' }, color: '#B81104', description: { en: 'Pain-free extraction of infected pulp, saving your natural tooth.', hi: 'संक्रमित पल्प को दर्द-मुक्त निकालना, आपके प्राकृतिक दांत को बचाना।' } },
  { name: { en: 'Dental Crowns', hi: 'दंत मुकुट (क्राउन)' }, color: '#1E3A5F', description: { en: 'Custom porcelain caps to restore strength and aesthetics.', hi: 'ताकत और सौंदर्य को बहाल करने के लिए कस्टम चीनी मिट्टी के कैप।' } },
  { name: { en: 'Dental Implants', hi: 'दंत प्रत्यारोपण (इंप्लांट)' }, color: '#F59E0B', description: { en: 'Permanent titanium anchors for missing teeth replacement.', hi: 'गायब दांतों को बदलने के लिए स्थायी टाइटेनियम एंकर।' } },
  { name: { en: 'Gum Contouring', hi: 'मसूड़ों का समोच्च' }, color: '#10B981', description: { en: 'Laser-assisted reshaping for a perfectly balanced smile.', hi: 'पूरी तरह से संतुलित मुस्कान के लिए लेजर-सहायता प्राप्त नया आकार देना।' } },
];

function ToothModel() {
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
    group.current.rotation.y = clock.getElapsedTime() * 0.12;
  });

  return (
    <group ref={group}>
      <primitive object={cloned} />
    </group>
  );
}

function AnatomyScene() {
  return (
    <>
      <ambientLight intensity={0.9} color="#ffffff" />
      <directionalLight intensity={2.5} color="#ffffff" position={[5, 8, 5]} />
      <pointLight color="#B81104" intensity={2} distance={10} position={[-3, 2, -3]} />
      
      <Bounds fit clip observe margin={1.3}>
        <ToothModel />
      </Bounds>
      
      <OrbitControls makeDefault enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
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
          <h2 className="display-lg text-[var(--text-dark)] mb-4">
            {t('Mastering every layer', 'हर परत में महारत')}
          </h2>
          <p className="italic text-[var(--text-gray)] display-lg" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {t('of your oral health.', 'आपके मौखिक स्वास्थ्य की।')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* 3D Model — no container box */}
          <div className="w-full lg:w-1/2 h-[500px] relative">
            <Canvas
              camera={{ fov: 40, position: [0, 0, 5] }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <AnatomyScene />
            </Canvas>
          </div>

          {/* Treatments list */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {TREATMENTS.map((part) => (
              <div
                key={part.name.en}
                className={`p-6 rounded-[20px] cursor-pointer transition-all duration-300 border ${
                  hovered === part.name.en 
                    ? 'bg-white border-[#B81104]/20 shadow-md scale-[1.02]' 
                    : 'bg-white/50 border-[var(--border-light)] hover:bg-white hover:shadow-sm'
                }`}
                onMouseEnter={() => setHovered(part.name.en)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 transition-transform duration-300"
                    style={{ 
                      backgroundColor: hovered === part.name.en ? '#B81104' : part.color,
                      transform: hovered === part.name.en ? 'scale(1.4)' : 'scale(1)'
                    }} 
                  />
                  <div>
                    <h3 className="font-serif text-[18px] text-[var(--text-dark)] mb-1">
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
