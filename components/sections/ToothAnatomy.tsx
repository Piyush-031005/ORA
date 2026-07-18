'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, AdaptiveDpr, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

const TREATMENTS = [
  { name: { en: 'Root Canal Therapy', hi: 'रूट कैनाल थेरेपी' }, color: '#B81104', description: { en: 'Pain-free removal of infected pulp, preserving your natural tooth structure.', hi: 'संक्रमित पल्प को दर्द-मुक्त निकालकर प्राकृतिक दांत को बचाना।' } },
  { name: { en: 'Dental Crowns', hi: 'दंत मुकुट (क्राउन)' }, color: '#2563EB', description: { en: 'Custom-fitted porcelain caps restoring full strength and natural aesthetics.', hi: 'कस्टम पोर्सिलेन कैप जो दांत की पूरी ताकत और सौंदर्य बहाल करती हैं।' } },
  { name: { en: 'Dental Implants', hi: 'दंत प्रत्यारोपण' }, color: '#D97706', description: { en: 'Permanent titanium root replacements for a lifetime of natural-looking teeth.', hi: 'स्थायी टाइटेनियम रूट जो जीवन भर के लिए प्राकृतिक दांत देते हैं।' } },
  { name: { en: 'Gum Contouring', hi: 'मसूड़ों का समोच्च' }, color: '#059669', description: { en: 'Laser precision reshaping for a perfectly symmetrical, balanced smile line.', hi: 'लेजर तकनीक से मसूड़ों को परफेक्ट आकार देना।' } },
];

function AnatomyModel() {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/inside_my_tooth.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((n) => {
      if (n instanceof THREE.Mesh) {
        n.castShadow = true;
        n.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    // rotation={[0, 0, 0]} = front-straight view
    // The model's natural slant is fixed by rotating it on all axes to appear upright
    <group ref={ref} rotation={[0, 0, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

export default function ToothAnatomy() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  return (
    <section id="treatments-interactive" className="section-py bg-white relative overflow-hidden">
      <div className="container-ora">
        {/* Header */}
        <div className="text-center mb-16 max-w-[720px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#B81104]" />
            <span className="text-label text-[#B81104]">
              {t('Comprehensive Treatments', 'व्यापक उपचार')}
            </span>
            <div className="w-8 h-[1px] bg-[#B81104]" />
          </div>
          <h2 className="display-lg text-[var(--text-dark)] mb-2">
            {t('Mastering every layer', 'हर परत में महारत')}
          </h2>
          <p className="italic text-[var(--text-gray)]" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 46px)' }}>
            {t('of your oral health.', 'आपके मौखिक स्वास्थ्य की।')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* 3D Model — front-view, no box, transparent bg */}
          <div className="w-full lg:w-1/2 h-[520px] relative rounded-[24px] overflow-hidden bg-[#F8F9FA]">
            <Canvas
              camera={{ fov: 32, position: [0, 0, 7] }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={1.2} />
              <directionalLight intensity={3} color="#ffffff" position={[4, 6, 6]} />
              <directionalLight intensity={1.5} color="#FFE4E1" position={[-4, 2, -4]} />
              <pointLight color="#B81104" intensity={1.5} distance={12} position={[2, 3, 5]} />

              {/* OrbitControls: front-view default, NO auto-rotate on start */}
              <OrbitControls
                makeDefault
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.6}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />

              <AnatomyModel />
              <Environment preset="studio" />
              <AdaptiveDpr pixelated />
            </Canvas>

            {/* Overlay label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest px-4 py-2 rounded-full">
              {t('Rotate to explore', 'घुमाएं और देखें')}
            </div>
          </div>

          {/* Treatments list */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            {TREATMENTS.map((part) => (
              <div
                key={part.name.en}
                className={`p-6 rounded-[20px] cursor-pointer transition-all duration-300 border ${
                  hovered === part.name.en
                    ? 'bg-white border-[#B81104]/30 shadow-lg translate-x-1'
                    : 'bg-[#F8F9FA] border-transparent hover:bg-white hover:shadow-sm'
                }`}
                onMouseEnter={() => setHovered(part.name.en)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: hovered === part.name.en ? '#B81104' : part.color,
                      transform: hovered === part.name.en ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                  <div>
                    <h3 className="font-serif text-[17px] text-[var(--text-dark)] mb-1 leading-snug">
                      {lang === 'en' ? part.name.en : part.name.hi}
                    </h3>
                    <p className="text-[13px] text-[var(--text-gray)] leading-relaxed">
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

useGLTF.preload('/models/inside_my_tooth.glb');
