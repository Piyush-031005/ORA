'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ position: 'absolute', inset: 0, background: '#080818', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-glow-pulse" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }} />
    </div>
  ),
});

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Text appears after particles (2.2s)
    const timer = setTimeout(() => setTextVisible(true), 2200);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textOpacity = Math.max(0, 1 - scrollY / 300);
  const textTranslateY = Math.min(scrollY * 0.4, 80);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: 600,
        overflow: 'hidden',
        background: '#080818',
      }}
    >
      {/* WebGL Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroCanvas scrollY={scrollY} />
      </div>

      {/* Radial gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(8,8,24,0.6) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, #080818, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          opacity: textVisible ? textOpacity : 0,
          transform: `translateY(${textVisible ? textTranslateY : 20}px)`,
          transition: textVisible ? 'opacity 0.1s linear' : 'opacity 1s ease, transform 1s var(--ease-out-expo)',
          pointerEvents: textOpacity < 0.1 ? 'none' : 'auto',
        }}
      >
        {/* Label */}
        <div
          className="text-label animate-fade-in"
          style={{
            color: 'var(--cyan-glow)',
            marginBottom: 24,
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          ORA Dental Studio — Mumbai
        </div>

        {/* Main headline */}
        <h1
          className="display-2xl"
          style={{
            color: 'var(--ghost)',
            maxWidth: 780,
            marginBottom: 12,
          }}
        >
          Healthy smiles<br />
          <span className="text-gradient-royal">
            aren't created.
          </span>
        </h1>

        <h2
          className="display-xl"
          style={{
            color: 'var(--ghost)',
            marginBottom: 32,
            fontStyle: 'italic',
            opacity: 0.6,
          }}
        >
          They're engineered.
        </h2>

        {/* Subtext */}
        <p
          style={{
            color: 'var(--gray-200)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          India's first digital dental experience. Cinematic precision meets modern oral care. Walk in. Walk out smiling.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="#queue" className="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Get Queue Number
          </Link>
          <Link href="#anatomy" className="btn btn-outline btn-lg">
            Explore Treatment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap gap-8 mt-16 justify-center"
          style={{ opacity: 0.7 }}
        >
          {[
            { n: '10,000+', label: 'Smiles Crafted' },
            { n: '15+', label: 'Years of Precision' },
            { n: '8', label: 'Specialist Doctors' },
            { n: '4.9★', label: 'Patient Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--ghost)',
                }}
              >
                {stat.n}
              </div>
              <div className="text-label" style={{ color: 'var(--gray-400)', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          opacity: textVisible ? Math.max(0, 1 - scrollY / 150) : 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span className="text-label" style={{ color: 'var(--gray-400)', fontSize: '10px' }}>SCROLL</span>
        <div
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '1.5px solid rgba(247,247,255,0.25)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'var(--cyan-glow)',
              animation: 'scroll-dot 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
