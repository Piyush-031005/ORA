'use client';

import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const DOCTORS = [
  {
    name: 'Dr. Priya Sharma',
    specialization: 'Orthodontist & Implantologist',
    experience: '12 Years',
    patients: '4,200+',
    rating: '4.9',
    available: true,
    color: '#00D4FF',
    initials: 'PS',
  },
  {
    name: 'Dr. Rahul Mehta',
    specialization: 'Endodontist (Root Canal Specialist)',
    experience: '15 Years',
    patients: '6,800+',
    rating: '5.0',
    available: true,
    color: '#A78BFA',
    initials: 'RM',
  },
  {
    name: 'Dr. Ananya Patel',
    specialization: 'Cosmetic Dentist & Prosthodontist',
    experience: '9 Years',
    patients: '3,100+',
    rating: '4.8',
    available: false,
    color: '#C8F0E8',
    initials: 'AP',
  },
  {
    name: 'Dr. Vikram Joshi',
    specialization: 'Oral & Maxillofacial Surgeon',
    experience: '18 Years',
    patients: '9,500+',
    rating: '4.9',
    available: true,
    color: '#F59E0B',
    initials: 'VJ',
  },
];

function DoctorCard({ doctor, index }: { doctor: typeof DOCTORS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="card-glass"
      style={{
        padding: 28,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(50px)',
        transition: `all 0.7s var(--ease-out-expo) ${index * 0.12}s`,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover glow */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${doctor.color}15, transparent 70%)`,
        transition: 'opacity 0.4s',
        opacity: hovered ? 1 : 0,
        pointerEvents: 'none',
      }} />

      {/* Avatar */}
      <div className="flex items-start gap-4 mb-5">
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${doctor.color}30, rgba(39,24,125,0.5))`,
          border: `1.5px solid ${doctor.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 20,
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          color: doctor.color,
          boxShadow: hovered ? `0 0 30px ${doctor.color}30` : 'none',
          transition: 'box-shadow 0.4s',
        }}>
          {doctor.initials}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: 'var(--ghost)', marginBottom: 4 }}>
            {doctor.name}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.5 }}>{doctor.specialization}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 mb-5">
        {[
          { label: 'Exp.', value: doctor.experience },
          { label: 'Patients', value: doctor.patients },
          { label: 'Rating', value: `${doctor.rating}★` },
        ].map((s) => (
          <div key={s.label} style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--ghost)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Availability + CTA */}
      <div className="flex items-center justify-between">
        <div className={`badge ${doctor.available ? 'badge-done' : 'badge-waiting'}`}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          {doctor.available ? 'Available Today' : 'Fully Booked'}
        </div>
        <a
          href="#appointment"
          className="btn btn-sm"
          style={{
            background: doctor.available ? `${doctor.color}18` : 'rgba(247,247,255,0.04)',
            color: doctor.available ? doctor.color : 'var(--gray-600)',
            border: `1px solid ${doctor.available ? doctor.color + '30' : 'rgba(247,247,255,0.08)'}`,
            cursor: doctor.available ? 'pointer' : 'default',
          }}
        >
          {doctor.available ? 'Book Now' : 'Waitlist'}
        </a>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${doctor.color}60, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
      }} />
    </div>
  );
}

export default function Doctors() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="doctors" className="section-py" style={{ background: 'var(--midnight-soft)' }}>
      <div className="container-ora">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s var(--ease-out-expo)',
          }}
        >
          <div className="text-label mb-4" style={{ color: 'var(--cyan-glow)' }}>Our Specialists</div>
          <h2 className="display-lg" style={{ color: 'var(--ghost)', marginBottom: 16 }}>
            Meet the engineers<br />
            <span className="text-gradient-royal">behind your smile.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Every doctor at ORA is a specialist — not a generalist. Board-certified, precision-trained, and obsessed with outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.name} doctor={doc} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#appointment" className="btn btn-primary btn-lg">
            Book an Appointment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
