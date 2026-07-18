'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

const STEPS = [
  {
    phase: '01',
    title: 'Diagnosis',
    subtitle: 'Digital X-Ray & Assessment',
    description: 'Advanced digital radiography reveals hidden issues invisible to the naked eye. Full oral health assessment in minutes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    color: '#00D4FF',
  },
  {
    phase: '02',
    title: 'Planning',
    subtitle: '3D Treatment Mapping',
    description: 'Your specialist designs a personalised treatment plan with clear timelines, costs, and expected outcomes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: '#A78BFA',
  },
  {
    phase: '03',
    title: 'Treatment',
    subtitle: 'Precision Procedures',
    description: 'State-of-the-art equipment. Pain-minimised techniques. Our specialists work with the accuracy of engineers.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: '#C8F0E8',
  },
  {
    phase: '04',
    title: 'Recovery',
    subtitle: 'Aftercare & Follow-up',
    description: 'Digital aftercare instructions. Scheduled follow-up reminders. We track your recovery until you are 100%.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: '#22C55E',
  },
];

function Step({ step, index, isLast }: { step: typeof STEPS[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className="flex gap-6 md:gap-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(40px)',
        transition: `all 0.7s var(--ease-out-expo) ${index * 0.15}s`,
      }}
    >
      {/* Connector */}
      <div className="flex flex-col items-center" style={{ minWidth: 56 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: `rgba(${step.color === '#00D4FF' ? '0,212,255' : step.color === '#A78BFA' ? '167,139,250' : step.color === '#C8F0E8' ? '200,240,232' : '34,197,94'},0.12)`,
            border: `1.5px solid ${step.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: step.color,
            flexShrink: 0,
            boxShadow: `0 0 24px ${step.color}20`,
          }}
        >
          {step.icon}
        </div>
        {!isLast && (
          <div style={{
            width: 1,
            flex: 1,
            marginTop: 12,
            background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
            minHeight: 60,
          }} />
        )}
      </div>

      {/* Content */}
      <div className="card-glass" style={{ flex: 1, marginBottom: isLast ? 0 : 24, padding: '24px 28px' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-label mb-2" style={{ color: step.color }}>Phase {step.phase}</div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: 'var(--ghost)', marginBottom: 6 }}>
              {step.title}
            </h3>
            <div style={{ fontSize: 13, color: step.color, marginBottom: 12, fontWeight: 500 }}>{step.subtitle}</div>
            <p style={{ color: 'var(--gray-400)', fontSize: 15, lineHeight: 1.7 }}>{step.description}</p>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 56,
              fontWeight: 800,
              color: 'rgba(247,247,255,0.04)',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {step.phase}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TreatmentJourney() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="section-py" style={{ background: 'var(--midnight)' }}>
      <div className="container-ora">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s var(--ease-out-expo)',
          }}
        >
          <div className="text-label mb-4" style={{ color: 'var(--cyan-glow)' }}>Treatment Process</div>
          <h2 className="display-lg" style={{ color: 'var(--ghost)', marginBottom: 16 }}>
            Your journey to a<br />
            <span className="text-gradient-royal">perfect smile.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Every treatment at ORA follows a precise, four-phase protocol. No surprises. Just results.
          </p>
        </div>

        <div className="flex flex-col max-w-2xl mx-auto">
          {STEPS.map((step, i) => (
            <Step key={step.phase} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
