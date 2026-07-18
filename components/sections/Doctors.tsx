'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const DOCTORS = [
  {
    name: 'Dr. Priya Sharma',
    specialization: { en: 'Orthodontist & Implantologist', hi: 'ऑर्थोडॉन्टिस्ट और इंप्लांटोलॉजिस्ट' },
    experience: '12',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop', // Real life doctor image placeholder
  },
  {
    name: 'Dr. Rahul Mehta',
    specialization: { en: 'Endodontist (Root Canal)', hi: 'एंडोडोंटिस्ट (रूट कैनाल)' },
    experience: '15',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', 
  },
  {
    name: 'Dr. Ananya Patel',
    specialization: { en: 'Cosmetic Dentist', hi: 'कॉस्मेटिक डेंटिस्ट' },
    experience: '9',
    image: 'https://images.unsplash.com/photo-1594824432454-e0b04c8ec60a?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. Vikram Joshi',
    specialization: { en: 'Oral Surgeon', hi: 'ओरल सर्जन' },
    experience: '18',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
];

function DoctorCard({ doctor, index }: { doctor: typeof DOCTORS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(40px)',
        transition: `all 0.8s var(--ease-smooth) ${index * 0.15}s`,
      }}
    >
      <div className="relative overflow-hidden mb-6 aspect-[3/4]">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
      </div>
      <div className="text-center">
        <h3 className="font-serif text-[22px] text-[var(--text-dark)] mb-2">
          {doctor.name}
        </h3>
        <p className="text-[12px] uppercase tracking-[0.1em] text-[var(--text-gray)] mb-3 font-medium">
          {lang === 'en' ? doctor.specialization.en : doctor.specialization.hi}
        </p>
        <div className="w-8 h-[1px] bg-[var(--border-strong)] mx-auto mb-3" />
        <p className="text-[11px] text-[var(--text-light)] uppercase tracking-widest">
          {doctor.experience} YRS EXP
        </p>
      </div>
    </div>
  );
}

export default function Doctors() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="doctors" className="section-py bg-white">
      <div className="container-ora">
        <div
          ref={headerRef}
          className="text-center mb-20 max-w-[700px] mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s var(--ease-smooth)',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent-red)]" />
            <span className="text-label text-[var(--accent-red)]">
              {t('Our Consultants', 'हमारे सलाहकार')}
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent-red)]" />
          </div>
          <h2 className="display-lg text-[var(--text-dark)] mb-6">
            {t('Meet the specialists behind', 'मुस्कान के पीछे के विशेषज्ञ')} <br />
            <span className="italic text-[var(--text-gray)]">{t('your smile.', 'से मिलें।')}</span>
          </h2>
          <p className="text-body-lg">
            {t(
              'Every doctor at ORA is a specialist — not a generalist. Board-certified, precision-trained, and obsessed with outcomes.',
              'ORA का हर डॉक्टर एक विशेषज्ञ है — सामान्य चिकित्सक नहीं। बोर्ड-प्रमाणित, सटीक-प्रशिक्षित, और परिणामों के प्रति जुनूनी।'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.name} doctor={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
