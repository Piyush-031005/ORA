'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', backgroundColor: '#B81104' }} />
  )
});

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] bg-white overflow-hidden flex items-center"
      style={{ paddingTop: '100px', paddingBottom: '60px' }}
    >
      <div className="container-ora relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 items-center">
          {/* Content (Left) — shifted right with padding */}
          <div className="animate-fade-up md:pl-6 lg:pl-16">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-[2px] bg-[#B81104]" />
              <span className="text-label text-[#B81104]" style={{ fontSize: '13px', letterSpacing: '0.18em' }}>
                {t('Specialist-Led Dental Care', 'विशेषज्ञ दंत चिकित्सा')}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(56px, 8vw, 110px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.02em' }} className="text-[var(--text-dark)] mb-8">
              <span className="block">{t('A smile', 'एक मुस्कान')}</span>
              <span className="block italic text-[var(--text-gray)]">{t('carefully', 'ध्यान से')}</span>
              <span 
                className="inline-block bg-[#B81104] text-white font-serif italic mt-3 shadow-xl"
                style={{ padding: '8px 32px 12px', fontSize: 'clamp(50px, 7.5vw, 100px)', borderRadius: '4px' }}
              >
                {t('rebuilt.', 'बनाई गई।')}
              </span>
            </h1>

            <p className="max-w-[500px] mb-10 md:mb-12" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px, 2vw, 21px)', fontWeight: 300, lineHeight: 1.7, color: 'var(--text-gray)' }}>
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
            <div className="flex flex-wrap gap-10 mt-12 pt-8 border-t border-[var(--border-light)]">
              <div>
                <div className="text-[30px] font-serif text-[var(--text-dark)] leading-none mb-1">10k+</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-gray)]">
                  {t('Smiles Restored', 'मुस्कानें बहाल की गईं')}
                </div>
              </div>
              <div>
                <div className="text-[30px] font-serif text-[var(--text-dark)] leading-none mb-1">15</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-gray)]">
                  {t('Years Experience', 'वर्षों का अनुभव')}
                </div>
              </div>
            </div>
          </div>

          {/* 3D Canvas Container (Right) — Milano Red background with rounded corners */}
          <div className="relative w-full flex items-center justify-center" style={{ height: '65vh', minHeight: '420px', maxHeight: '650px' }}>
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
