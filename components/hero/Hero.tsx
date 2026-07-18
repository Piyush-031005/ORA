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
      {/* 3D Canvas Container - Positioned on the right for desktop, background for mobile */}
      <div className="absolute inset-0 md:left-1/2 md:inset-y-0 z-0 opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto">
        <HeroCanvas scrollY={scrollY} />
      </div>

      {/* Content */}
      <div className="container-ora relative z-10 w-full">
        <div className="max-w-[720px] animate-fade-up">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[var(--accent-red)]" />
            <span className="text-label text-[var(--accent-red)]">
              {t('Specialist-Led Dental Care', 'विशेषज्ञ दंत चिकित्सा')}
            </span>
          </div>

          <h1 className="display-2xl text-[var(--text-dark)] mb-6 leading-[1.05]">
            <span className="block">
              {t('A smile', 'एक मुस्कान')}
            </span>
            <span className="block italic text-[var(--text-gray)]">
              {t('carefully', 'ध्यान से')}
            </span>
            <span className="inline-block bg-[var(--accent-red)] text-white px-6 py-2 mt-2 font-serif italic" style={{ paddingBottom: '0.2em' }}>
              {t('rebuilt.', 'बनाई गई।')}
            </span>
          </h1>

          <p className="text-body-lg max-w-[420px] mb-12">
            {t(
              "When life, time, or past dentistry leaves a mark, specialist-led care can rewrite the ending. Cinematic precision meets modern oral care.",
              "जब जीवन, समय या पुरानी दंत चिकित्सा कोई निशान छोड़ जाती है, तो विशेषज्ञ देखभाल उसे बदल सकती है। आधुनिक दंत चिकित्सा का अनुभव करें।"
            )}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="#queue" className="btn btn-primary">
              {t('Book Consultation', 'परामर्श बुक करें')}
            </Link>
            <Link href="#about" className="btn btn-outline">
              {t('Discover What\'s Possible', 'हमारी विशेषज्ञता देखें')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 mt-20 pt-12 border-t border-[var(--border-light)]">
            <div>
              <div className="text-[32px] font-serif text-[var(--text-dark)] leading-none mb-2">10k+</div>
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)]">
                {t('Smiles Restored', 'मुस्कानें बहाल की गईं')}
              </div>
            </div>
            <div>
              <div className="text-[32px] font-serif text-[var(--text-dark)] leading-none mb-2">15</div>
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)]">
                {t('Years Experience', 'वर्षों का अनुभव')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
