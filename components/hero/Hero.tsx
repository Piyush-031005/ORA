'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ position: 'absolute', inset: 0, borderRadius: '28px', backgroundColor: '#B81104' }} />
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
      {/* Full-page layout inspired by Dentiva reference */}
      <div className="relative w-full h-[100dvh] min-h-[640px] flex flex-col md:flex-row">

        {/* LEFT — Text Panel */}
        <div className="relative z-20 flex flex-col justify-center w-full md:w-[48%] px-8 md:pl-16 lg:pl-24 py-16 md:py-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-[#B81104]" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#B81104]">
              {t('Specialist-Led Dental Care', 'विशेषज्ञ दंत चिकित्सा')}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 6.5vw, 92px)',
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: 'var(--text-dark)',
            }}
            className="mb-8"
          >
            <span className="block">
              {t('Exceptional', 'असाधारण')}
            </span>
            <span className="block italic" style={{ color: 'var(--text-gray)' }}>
              {t('Dental Care', 'दंत चिकित्सा')}
            </span>
            <span className="block">
              {t('& Straight', 'और सुंदर')}
            </span>
            <span
              className="inline-block font-serif italic"
              style={{
                color: '#B81104',
                fontSize: 'clamp(44px, 6vw, 88px)',
              }}
            >
              {t('Smile.', 'मुस्कान।')}
            </span>
          </h1>

          <p
            className="max-w-[420px] mb-10"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.8vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--text-gray)',
            }}
          >
            {t(
              'We combine specialist expertise with cinematic precision to ensure every smile transformation is the finest of your life.',
              'हम हर मुस्कान को सुंदर बनाने के लिए विशेषज्ञता और आधुनिक तकनीक का उपयोग करते हैं।'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="#queue"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-[13px] font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#B81104', boxShadow: '0 8px 32px rgba(184,17,4,0.3)' }}
            >
              {t('Book Consultation', 'परामर्श बुक करें')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="#treatments-interactive"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[13px] font-medium uppercase tracking-widest border border-[var(--border-strong)] hover:border-[#B81104] hover:text-[#B81104] transition-all duration-300"
              style={{ color: 'var(--text-dark)' }}
            >
              {t('Our Services', 'सेवाएं')}
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-8">
            {[
              { n: '10k+', label: t('Smiles Restored', 'मुस्कानें') },
              { n: '15+', label: t('Years Experience', 'वर्षों का अनुभव') },
              { n: '4.9★', label: t('Google Rating', 'रेटिंग') },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-[28px] text-[var(--text-dark)] leading-none mb-1">{s.n}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-gray)] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Milano Red 3D Canvas panel */}
        <div
          className="relative w-full md:w-[52%] h-[55vw] md:h-full"
          style={{ minHeight: '400px' }}
        >
          {/* Clip shape – diagonal edge on left side */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
              backgroundColor: '#B81104',
              borderRadius: '0 0 0 0',
            }}
          />
          {/* Canvas inside the red shape */}
          <div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          >
            <HeroCanvas />
          </div>

          {/* Subtle radial glow behind the tooth */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,200,190,0.25) 0%, transparent 70%)',
              clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* "Red" label watermark for feel */}
          <div
            className="absolute bottom-8 right-8 text-white/20 font-serif italic pointer-events-none select-none hidden md:block"
            style={{ fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: 1 }}
          >
            ORA
          </div>
        </div>
      </div>
    </section>
  );
}
