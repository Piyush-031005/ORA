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
      className="relative w-full min-h-[100dvh] bg-[var(--bg-cream)] overflow-hidden flex items-center pt-20"
    >
      <div className="container-ora relative z-10 w-full h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center h-full">
          {/* Content (Left) */}
          <div className="animate-fade-up pt-20 md:pt-0 max-w-[600px]">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-[1px] bg-[var(--accent-red)]" />
              <span className="text-label text-[var(--accent-red)] text-xs md:text-sm">
                {t('Specialist-Led Dental Care', 'विशेषज्ञ दंत चिकित्सा')}
              </span>
            </div>

            <h1 className="display-2xl text-[var(--text-dark)] mb-4 md:mb-6 leading-[1.15]">
              <span className="block mb-2">
                {t('A smile', 'एक मुस्कान')}
              </span>
              <span className="block italic text-[var(--text-gray)] mb-4">
                {t('carefully', 'ध्यान से')}
              </span>
              <span className="inline-block bg-[#B81104] text-white px-4 py-1 md:px-6 md:py-2 mt-2 font-serif italic align-bottom" style={{ paddingBottom: '0.2em' }}>
                {t('rebuilt.', 'बनाई गई।')}
              </span>
            </h1>

            <p className="text-body-lg mb-8 md:mb-12">
              {t(
                "When life, time, or past dentistry leaves a mark, specialist-led care can rewrite the ending. Cinematic precision meets modern oral care.",
                "जब जीवन, समय या पुरानी दंत चिकित्सा कोई निशान छोड़ जाती है, तो विशेषज्ञ देखभाल उसे बदल सकती है। आधुनिक दंत चिकित्सा का अनुभव करें।"
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link href="#queue" className="btn btn-primary" style={{ backgroundColor: '#B81104' }}>
                {t('Book Consultation', 'परामर्श बुक करें')}
              </Link>
              <Link href="#anatomy" className="btn btn-outline">
                {t('Discover What\'s Possible', 'हमारी विशेषज्ञता देखें')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 md:gap-12 mt-12 md:mt-20 pt-8 md:pt-12 border-t border-[var(--border-light)]">
              <div>
                <div className="text-[28px] md:text-[32px] font-serif text-[var(--text-dark)] leading-none mb-2">10k+</div>
                <div className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)]">
                  {t('Smiles Restored', 'मुस्कानें बहाल की गईं')}
                </div>
              </div>
              <div>
                <div className="text-[28px] md:text-[32px] font-serif text-[var(--text-dark)] leading-none mb-2">15</div>
                <div className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)]">
                  {t('Years Experience', 'वर्षों का अनुभव')}
                </div>
              </div>
            </div>
          </div>

          {/* 3D Canvas Container (Right) */}
          <div className="relative w-full h-[50vh] md:h-full min-h-[400px]">
            <HeroCanvas scrollY={scrollY} />
          </div>
        </div>
      </div>
    </section>
  );
}
