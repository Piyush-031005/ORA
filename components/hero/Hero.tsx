'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <div style={{ position: 'absolute', inset: 0 }} />
});

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] bg-[var(--bg-cream)] overflow-hidden flex items-center"
      style={{ paddingTop: '100px', paddingBottom: '60px' }}
    >
      <div className="container-ora relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12 items-center">
          {/* Content (Left) */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-[#B81104]" />
              <span className="text-label text-[#B81104]">
                {t('Specialist-Led Dental Care', 'विशेषज्ञ दंत चिकित्सा')}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 6vw, 80px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }} className="text-[var(--text-dark)] mb-6">
              <span className="block">{t('A smile', 'एक मुस्कान')}</span>
              <span className="block italic text-[var(--text-gray)]">{t('carefully', 'ध्यान से')}</span>
              <span 
                className="inline-block bg-[#B81104] text-white font-serif italic mt-2"
                style={{ padding: '4px 20px 6px', fontSize: 'clamp(38px, 5.5vw, 74px)' }}
              >
                {t('rebuilt.', 'बनाई गई।')}
              </span>
            </h1>

            <p className="text-body-lg max-w-[480px] mb-10">
              {t(
                "When life, time, or past dentistry leaves a mark, specialist-led care can rewrite the ending.",
                "जब जीवन, समय या पुरानी दंत चिकित्सा कोई निशान छोड़ जाती है, तो विशेषज्ञ देखभाल उसे बदल सकती है।"
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="#queue" className="btn btn-primary" style={{ backgroundColor: '#B81104' }}>
                {t('Book Consultation', 'परामर्श बुक करें')}
              </Link>
              <Link href="#treatments-interactive" className="btn btn-outline">
                {t("Discover What's Possible", 'हमारी विशेषज्ञता देखें')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-[var(--border-light)]">
              <div>
                <div className="text-[28px] font-serif text-[var(--text-dark)] leading-none mb-1">10k+</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-gray)]">
                  {t('Smiles Restored', 'मुस्कानें बहाल की गईं')}
                </div>
              </div>
              <div>
                <div className="text-[28px] font-serif text-[var(--text-dark)] leading-none mb-1">15</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-gray)]">
                  {t('Years Experience', 'वर्षों का अनुभव')}
                </div>
              </div>
            </div>
          </div>

          {/* 3D Canvas Container (Right) — fixed height, centered */}
          <div className="relative w-full flex items-center justify-center" style={{ height: '70vh', minHeight: '450px', maxHeight: '700px' }}>
            <HeroCanvas scrollY={scrollY} />
          </div>
        </div>
      </div>
    </section>
  );
}
