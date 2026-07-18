'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, AdaptiveDpr, OrbitControls, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

const TREATMENTS = [
  { name: { en: 'Root Canal Therapy', hi: 'रूट कैनाल थेरेपी' }, desc: { en: 'Pain-free, preserve your natural tooth', hi: 'दर्द-मुक्त, प्राकृतिक दांत बचाएं' }, icon: '🦷' },
  { name: { en: 'Dental Crowns', hi: 'डेंटल क्राउन' }, desc: { en: 'Full strength restoration with porcelain', hi: 'पोर्सिलेन से पूर्ण मजबूती' }, icon: '👑' },
  { name: { en: 'Dental Implants', hi: 'डेंटल इंप्लांट' }, desc: { en: 'Lifetime titanium tooth replacement', hi: 'जीवन भर टाइटेनियम प्रत्यारोपण' }, icon: '⚙️' },
  { name: { en: 'Smile Design', hi: 'स्माइल डिज़ाइन' }, desc: { en: 'Veneers, whitening & makeovers', hi: 'विनियर, व्हाइटनिंग और मेकओवर' }, icon: '✨' },
  { name: { en: 'Gum Contouring', hi: 'मसूड़ों की देखभाल' }, desc: { en: 'Laser precision for a perfect smile line', hi: 'लेजर से परफेक्ट स्माइल लाइन' }, icon: '💉' },
  { name: { en: 'Orthodontics', hi: 'ऑर्थोडॉन्टिक्स' }, desc: { en: 'Invisible aligners & braces', hi: 'इनविज़िबल अलाइनर और ब्रेसेस' }, icon: '📐' },
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

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    // Rotate to counteract the natural diagonal slant of this model (pink gum block goes diagonally)
    <group ref={ref} rotation={[0.15, 0, 0.82]}>
      <primitive object={cloned} />
    </group>
  );
}

export default function ToothAnatomy() {
  const { lang, t } = useLanguage();

  return (
    <section id="treatments-interactive" className="section-py bg-white relative overflow-hidden">
      <div className="container-ora">

        {/* Header */}
        <div className="text-center mb-16 max-w-[760px] mx-auto">
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

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">

          {/* LEFT — 3D Model with quote */}
          <div className="w-full lg:w-[48%] flex flex-col gap-6">
            {/* Big quote */}
            <div className="text-center lg:text-left">
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 400, lineHeight: 1.2, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                {t('"Keep your teeth safe —', '"अपने दांतों की देखभाल करें —')}
                <br />
                <span className="italic" style={{ color: '#B81104' }}>
                  {t('they\'re meant to last a lifetime."', 'वो जीवन भर के लिए हैं।"')}
                </span>
              </p>
              <p className="mt-3" style={{ fontSize: '13px', color: 'var(--text-gray)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                {t('— ORA Dental Studio', '— ORA डेंटल स्टूडियो')}
              </p>
            </div>

            {/* 3D Model canvas */}
            <div className="w-full relative rounded-[24px] overflow-hidden bg-[#F4F6F9]" style={{ height: '460px' }}>
              <Canvas
                camera={{ fov: 30, position: [0, 0, 7] }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={1.4} />
                <directionalLight intensity={3.5} color="#ffffff" position={[4, 6, 6]} />
                <directionalLight intensity={1.8} color="#FFE4E1" position={[-4, 2, -4]} />
                <pointLight color="#B81104" intensity={2} distance={14} position={[2, 3, 5]} />

                <OrbitControls
                  makeDefault
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.5}
                />

                <Bounds fit clip observe margin={1.6}>
                  <AnatomyModel />
                </Bounds>
                <Environment preset="studio" />
                <AdaptiveDpr pixelated />
              </Canvas>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/25 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest px-4 py-2 rounded-full">
                {t('Drag to rotate', 'घुमाने के लिए खींचें')}
              </div>
            </div>
          </div>

          {/* RIGHT — Treatment cards in overlay style */}
          <div className="w-full lg:w-[52%] grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {TREATMENTS.map((item, i) => (
              <div
                key={item.name.en}
                className="group relative p-5 rounded-[20px] overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: i % 3 === 0
                    ? 'linear-gradient(135deg, #FFF1F0 0%, #FFE4E1 100%)'
                    : i % 3 === 1
                    ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
                    : 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl mb-4"
                  style={{
                    background: i % 3 === 0
                      ? 'rgba(184,17,4,0.1)'
                      : i % 3 === 1
                      ? 'rgba(37,99,235,0.1)'
                      : 'rgba(5,150,105,0.1)',
                  }}
                >
                  {item.icon}
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', color: 'var(--text-dark)', marginBottom: '6px', lineHeight: 1.3 }}>
                  {lang === 'en' ? item.name.en : item.name.hi}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-gray)', lineHeight: 1.65 }}>
                  {lang === 'en' ? item.desc.en : item.desc.hi}
                </p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: i % 3 === 0 ? '#B81104' : i % 3 === 1 ? '#2563EB' : '#059669' }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

useGLTF.preload('/models/inside_my_tooth.glb');
