'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const JOURNEY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    title: { en: 'Clinical Precision', hi: 'सटीक नैदानिक देखभाल' },
    desc: { en: 'State-of-the-art diagnostic imaging for exact treatment mapping.', hi: 'सटीक उपचार योजना के लिए अत्याधुनिक नैदानिक इमेजिंग।' }
  },
  {
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    title: { en: 'Luxury Environment', hi: 'शानदार माहौल' },
    desc: { en: 'Designed for comfort to reduce anxiety and elevate your experience.', hi: 'चिंता कम करने और आपके अनुभव को बेहतर बनाने के लिए डिज़ाइन किया गया।' }
  },
  {
    src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop',
    title: { en: 'Advanced Procedures', hi: 'उन्नत प्रक्रियाएं' },
    desc: { en: 'Microscope-assisted dentistry ensures no detail is overlooked.', hi: 'माइक्रोस्कोप की मदद से दंत चिकित्सा सुनिश्चित करती है कि कोई विवरण न छूटे।' }
  }
];

export default function TreatmentJourney() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const { t, lang } = useLanguage();

  return (
    <section id="journey" className="section-py bg-[var(--bg-cream)]">
      <div className="container-ora">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 max-w-[700px] mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s var(--ease-smooth)',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent-red)]" />
            <span className="text-label text-[var(--accent-red)]">
              {t('The ORA Experience', 'ORA का अनुभव')}
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent-red)]" />
          </div>
          <h2 className="display-lg text-[var(--text-dark)] mb-6">
            {t('Not just treatment.', 'सिर्फ इलाज नहीं।')} <br />
            <span className="italic text-[var(--text-gray)]">
              {t('A masterclass in care.', 'देखभाल में एक मास्टरक्लास।')}
            </span>
          </h2>
        </div>

        {/* Real-life image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNEY_IMAGES.map((item, i) => (
            <div 
              key={i} 
              className="group cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transition: `all 0.8s var(--ease-smooth) ${i * 0.15}s`,
              }}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-[var(--border-light)]">
                <img 
                  src={item.src} 
                  alt={lang === 'en' ? item.title.en : item.title.hi}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-[22px] text-[var(--text-dark)] mb-2">
                  {lang === 'en' ? item.title.en : item.title.hi}
                </h3>
                <p className="text-body-lg text-[15px]">
                  {lang === 'en' ? item.desc.en : item.desc.hi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
