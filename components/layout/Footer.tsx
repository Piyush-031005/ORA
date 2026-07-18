'use client';

import Link from 'next/link';

const services = ['Teeth Cleaning', 'Root Canal', 'Implants', 'Braces', 'Whitening', 'X-Ray'];
const social = [
  { label: 'Instagram', href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'Facebook', href: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: 'var(--midnight-soft)',
        borderTop: '1px solid rgba(247,247,255,0.06)',
      }}
    >
      {/* Glow top border */}
      <div className="divider-glow" />

      <div className="container-ora py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'var(--royal)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C10.5 3 9.5 3.8 9 5C8 7 8.5 10 10 12C10.5 13 11 14.5 11 16C11 17.5 11.5 19 12 19C12.5 19 13 17.5 13 16C13 14.5 13.5 13 14 12C15.5 10 16 7 15 5C14.5 3.8 13.5 3 12 3Z" fill="var(--ghost)" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '20px', color: 'var(--ghost)' }}>ORA</span>
            </div>
            <p style={{ color: 'var(--gray-400)', fontSize: '14px', lineHeight: '1.7' }}>
              A futuristic dental experience. Not just a clinic — a precision-engineered approach to your smile.
            </p>
            <div className="flex gap-3 mt-6">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(247,247,255,0.06)',
                    border: '1px solid rgba(247,247,255,0.1)',
                    color: 'var(--gray-400)',
                  }}
                  aria-label={s.label}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label mb-5" style={{ color: 'var(--gray-400)' }}>Treatments</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#treatments"
                    className="text-sm transition-colors hover:text-[var(--cyan-glow)]"
                    style={{ color: 'var(--gray-200)' }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label mb-5" style={{ color: 'var(--gray-400)' }}>Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Get Queue Number', href: '#queue' },
                { label: 'Book Appointment', href: '#appointment' },
                { label: 'Our Doctors', href: '#doctors' },
                { label: 'Cost Estimator', href: '#estimator' },
                { label: 'Patient Portal', href: '/admin' },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--cyan-glow)]"
                    style={{ color: 'var(--gray-200)' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label mb-5" style={{ color: 'var(--gray-400)' }}>Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" strokeWidth="1.5" className="shrink-0 mt-0.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ color: 'var(--gray-200)', fontSize: '14px', lineHeight: '1.6' }}>
                  Siltham Chauraha, near Clinic Area,<br />Pithoragarh, Uttarakhand 262501
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" strokeWidth="1.5" className="shrink-0">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919876543210" style={{ color: 'var(--gray-200)', fontSize: '14px' }}>+91 98765 43210</a>
              </li>
              <li className="flex gap-3 items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" strokeWidth="1.5" className="shrink-0">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ color: 'var(--gray-200)', fontSize: '14px', lineHeight: '1.6' }}>
                  Mon – Sat: 9 AM – 8 PM<br />Queue opens: 8 AM
                </span>
              </li>
              <li className="mt-2">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.0841804791334!2d80.2105151!3d29.5843794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a5ca0e5b0cb549%3A0xc34ccf3e2840cf11!2sSiltham%2520Chauraha%2520Pithoragarh!5e0!3m2!1sen!2sin!4v1721323328000!5m2!1sen!2sin"
                  width="100%" 
                  height="120" 
                  style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) opacity(0.85)' }} 
                  allowFullScreen={false} 
                  loading="lazy"
                ></iframe>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(247,247,255,0.06)' }}
        >
          <p style={{ color: 'var(--gray-600)', fontSize: '13px' }}>
            © 2026 ORA Dental Studio. Engineered with precision.
          </p>
          <div className="flex gap-6">
            <a href="#" style={{ color: 'var(--gray-600)', fontSize: '13px' }} className="hover:text-[var(--ghost)] transition-colors">Privacy Policy</a>
            <a href="#" style={{ color: 'var(--gray-600)', fontSize: '13px' }} className="hover:text-[var(--ghost)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
