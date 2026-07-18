'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#B81104' }} />
  ),
});

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] bg-white overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      <div className="relative w-full h-[100dvh] min-h-[640px] flex flex-col md:flex-row">

        {/* LEFT — Text Panel (shifted right) */}
        <div className="relative z-20 flex flex-col justify-center w-full md:w-[52%] px-10 md:pl-16 lg:pl-24 xl:pl-32 py-16 md:py-0">

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#B81104]" />
            <span style={{ fontSize: '11px', letterSpacing: '0.2em', fontWeight: 500, textTransform: 'uppercase', color: '#B81104' }}>
              {t('Specialist-Led Dental Care', 'विशेषज्ञ दंत चिकित्सा')}
            </span>
          </div>

          {/* "A smile carefully rebuilt." — restoring original hero text */}
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.025em', color: 'var(--text-dark)', fontSize: 'clamp(52px, 7vw, 96px)' }} className="mb-8">
            <span className="block">{t('A smile', 'एक मुस्कान')}</span>
            <span className="block italic" style={{ color: 'var(--text-gray)' }}>{t('carefully', 'ध्यान से')}</span>
            <span
              className="inline-block bg-[#B81104] text-white font-serif italic"
              style={{ padding: '6px 28px 10px', borderRadius: '4px', fontSize: 'clamp(48px, 6.5vw, 90px)', boxShadow: '0 12px 40px rgba(184,17,4,0.25)', marginTop: '4px' }}
            >
              {t('rebuilt.', 'बनाई गई।')}
            </span>
          </h1>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-gray)', maxWidth: '480px', marginBottom: '40px' }}>
            {t(
              'When life, time, or past dentistry leaves a mark, specialist-led care can rewrite the ending.',
              'जब जीवन, समय या पुरानी दंत चिकित्सा कोई निशान छोड़ जाती है, तो विशेषज्ञ देखभाल उसे बदल सकती है।'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="#queue"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#B81104', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.16em', boxShadow: '0 8px 32px rgba(184,17,4,0.3)' }}
            >
              {t('Book Consultation', 'परामर्श बुक करें')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="#treatments-interactive"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border transition-all duration-300 hover:border-[#B81104] hover:text-[#B81104]"
              style={{ fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.16em', borderColor: 'var(--border-strong)', color: 'var(--text-dark)' }}
            >
              {t("Discover What's Possible", 'हमारी विशेषज्ञता देखें')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-8 border-t" style={{ borderColor: 'var(--border-light)' }}>
            {[
              { n: '10k+', label: t('Smiles Restored', 'मुस्कानें') },
              { n: '15+', label: t('Years Experience', 'वर्षों का अनुभव') },
              { n: '4.9★', label: t('Google Rating', 'रेटिंग') },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-dark)', lineHeight: 1, marginBottom: '4px' }}>{s.n}</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-gray)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Milano Red 3D Canvas */}
        <div className="relative w-full md:w-[48%] h-[55vw] md:h-full" style={{ minHeight: '400px' }}>
          {/* Milano Red background */}
          <div className="absolute inset-0 bg-[#B81104]" style={{ clipPath: 'polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
          {/* Canvas */}
          <div className="absolute inset-0">
            <HeroCanvas />
          </div>
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,210,200,0.22) 0%, transparent 70%)' }} />
          {/* ORA watermark */}
          <div className="absolute bottom-8 right-8 font-serif italic pointer-events-none select-none hidden md:block" style={{ fontSize: 'clamp(60px, 8vw, 110px)', color: 'rgba(255,255,255,0.12)', lineHeight: 1 }}>
            ORA
          </div>
        </div>

      </div>
    </section>
  );
}
