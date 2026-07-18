'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const navLinks = [
  { en: 'About', hi: 'हमारे बारे में', href: '#about' },
  { en: 'Treatments', hi: 'उपचार', href: '#treatments' },
  { en: 'Doctors', hi: 'डॉक्टर', href: '#doctors' },
  { en: 'Gallery', hi: 'गैलरी', href: '#gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-[600ms] ${
          scrolled ? 'py-4 shadow-sm' : 'py-8'
        }`}
        style={scrolled ? {
          background: 'rgba(253, 251, 247, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-light)',
        } : {}}
      >
        <div className="container-ora flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#A1140A] text-white transition-transform duration-500 group-hover:rotate-[360deg]">
              <span className="font-serif text-[24px] italic leading-none pr-1">O</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-serif tracking-[0.1em] uppercase text-[var(--text-dark)] leading-none mb-[2px]">
                ORA
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] font-medium text-[var(--text-gray)] leading-none">
                Dental Studio
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.en}>
                <a
                  href={link.href}
                  className="text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)] hover:text-[var(--accent-red)] transition-colors"
                >
                  {lang === 'en' ? link.en : link.hi}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Area */}
          <div className="flex items-center gap-6">
            
            {/* Language Toggle */}
            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)]">
              <button 
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-[var(--text-dark)] border-b border-[var(--text-dark)]' : 'hover:text-[var(--text-dark)]'}`}
              >
                EN
              </button>
              <span>/</span>
              <button 
                onClick={() => setLang('hi')}
                className={`transition-colors ${lang === 'hi' ? 'text-[var(--text-dark)] border-b border-[var(--text-dark)]' : 'hover:text-[var(--text-dark)]'}`}
              >
                HI
              </button>
            </div>

            {/* CTA */}
            <Link
              href="#queue"
              className="hidden md:flex btn btn-primary"
            >
              {t('Book Consultation', 'परामर्श बुक करें')}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 text-[var(--text-dark)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px] w-6">
                <span className={`block h-[1px] w-full bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-[1px] w-full bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1px] w-full bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg-cream)] border-b border-[var(--border-light)] overflow-hidden transition-all duration-[600ms] ${menuOpen ? 'max-h-[400px] py-6 shadow-sm' : 'max-h-0 py-0'}`}
        >
          <div className="container-ora">
            <ul className="flex flex-col gap-4 mb-8">
              {navLinks.map((link) => (
                <li key={link.en}>
                  <a
                    href={link.href}
                    className="block text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--text-dark)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {lang === 'en' ? link.en : link.hi}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--text-gray)]">Language:</span>
              <button 
                onClick={() => setLang('en')}
                className={`text-[12px] font-bold ${lang === 'en' ? 'text-[var(--accent-red)]' : 'text-[var(--text-dark)]'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('hi')}
                className={`text-[12px] font-bold ${lang === 'hi' ? 'text-[var(--accent-red)]' : 'text-[var(--text-dark)]'}`}
              >
                HI
              </button>
            </div>
            <Link href="#queue" className="btn btn-primary w-full" onClick={() => setMenuOpen(false)}>
              {t('Book Consultation', 'परामर्श बुक करें')}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
