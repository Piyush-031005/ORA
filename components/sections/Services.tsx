'use client';

import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const SERVICES = [
  {
    id: 'cleaning',
    name: 'Teeth Cleaning',
    price: 800,
    icon: '🪥',
    description: 'Professional ultrasonic scaling and polishing. Removes tartar, plaque, and stains.',
    duration: '45 min',
    category: 'Preventive',
    color: '#00D4FF',
  },
  {
    id: 'xray',
    name: 'Digital X-Ray',
    price: 400,
    icon: '📡',
    description: 'Full mouth or periapical digital radiography. Instant, low-radiation imaging.',
    duration: '15 min',
    category: 'Diagnostic',
    color: '#A78BFA',
  },
  {
    id: 'filling',
    name: 'Tooth Filling',
    price: 1200,
    icon: '🔬',
    description: 'Composite resin or amalgam fillings. Restores form, function, and aesthetics.',
    duration: '60 min',
    category: 'Restorative',
    color: '#C8F0E8',
  },
  {
    id: 'rct',
    name: 'Root Canal (RCT)',
    price: 6500,
    icon: '⚙️',
    description: 'Single-visit RCT using rotary files. Saves your natural tooth from extraction.',
    duration: '90 min',
    category: 'Endodontics',
    color: '#F59E0B',
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    price: 4500,
    icon: '✨',
    description: 'In-office LED-activated bleaching. Up to 8 shades whiter in a single session.',
    duration: '75 min',
    category: 'Cosmetic',
    color: '#FDE68A',
  },
  {
    id: 'implant',
    name: 'Dental Implant',
    price: 35000,
    icon: '🔩',
    description: 'Titanium implant with ceramic crown. Lifetime solution for missing teeth.',
    duration: '2-3 sessions',
    category: 'Implantology',
    color: '#22C55E',
  },
];

function ServiceCard({ service, selected, onToggle, index }: {
  service: typeof SERVICES[0];
  selected: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      className="card-glass"
      onClick={onToggle}
      style={{
        padding: 24,
        cursor: 'pointer',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(40px)',
        transition: `all 0.6s var(--ease-out-expo) ${index * 0.08}s, border-color 0.2s, background 0.2s, box-shadow 0.2s`,
        borderColor: selected ? service.color + '60' : undefined,
        background: selected ? `${service.color}08` : undefined,
        boxShadow: selected ? `0 0 40px ${service.color}15` : undefined,
        position: 'relative',
      }}
    >
      {/* Selected checkmark */}
      {selected && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: service.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div style={{ fontSize: 32, marginBottom: 12 }}>{service.icon}</div>

      <div className="badge" style={{
        background: `${service.color}15`,
        color: service.color,
        border: `1px solid ${service.color}30`,
        marginBottom: 12,
      }}>
        {service.category}
      </div>

      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: 'var(--ghost)', marginBottom: 8 }}>
        {service.name}
      </h3>

      <p style={{ color: 'var(--gray-400)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
        {service.description}
      </p>

      <div className="flex items-center justify-between">
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20, color: 'var(--ghost)' }}>
          ₹{service.price.toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>{service.duration}</div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<string[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  const total = SERVICES
    .filter(s => selected.includes(s.id))
    .reduce((acc, s) => acc + s.price, 0);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <section id="treatments" className="section-py" style={{ background: 'var(--midnight)' }}>
      <div className="container-ora">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s var(--ease-out-expo)',
          }}
        >
          <div className="text-label mb-4" style={{ color: 'var(--cyan-glow)' }}>Treatments & Pricing</div>
          <h2 className="display-lg" style={{ color: 'var(--ghost)', marginBottom: 16 }}>
            Transparent pricing.<br />
            <span className="text-gradient-royal">Zero surprises.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Select the treatments you need and get an instant cost estimate. No hidden fees, ever.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              selected={selected.includes(s.id)}
              onToggle={() => toggle(s.id)}
              index={i}
            />
          ))}
        </div>

        {/* Cost Estimator */}
        {selected.length > 0 && (
          <div
            className="glass-royal"
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 32,
              maxWidth: 600,
              margin: '0 auto',
              animation: 'slide-up 0.4s var(--ease-out-expo)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--ghost)', marginBottom: 20 }}>
              Cost Estimate
            </h3>
            <div className="flex flex-col gap-3 mb-5">
              {SERVICES.filter(s => selected.includes(s.id)).map(s => (
                <div key={s.id} className="flex justify-between items-center">
                  <span style={{ color: 'var(--gray-200)', fontSize: 15 }}>{s.name}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--ghost)' }}>
                    ₹{s.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div className="divider-glow mb-5" />
            <div className="flex justify-between items-center mb-6">
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: 'var(--ghost)' }}>
                Estimated Total
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 28,
                color: 'var(--cyan-glow)',
                textShadow: '0 0 20px rgba(0,212,255,0.4)',
              }}>
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <a href="#appointment" className="btn btn-primary w-full justify-center">
              Book These Treatments
            </a>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-600)', marginTop: 12 }}>
              * Prices may vary after consultation. GST included.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
