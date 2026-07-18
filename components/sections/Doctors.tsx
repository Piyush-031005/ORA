'use client';

import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const DOCTORS = [
  {
    name: 'Dr. Priya Sharma',
    qualifications: 'BDS, MDS (Orthodontics)',
    specialization: { en: 'Orthodontist & Implantologist', hi: 'ऑर्थोडॉन्टिस्ट और इंप्लांटोलॉजिस्ट' },
    experience: '12',
    description: { 
      en: 'With over 12 years of experience, Dr. Sharma is an expert in delivering advanced specialist-led care for complex orthodontic and dental implant cases.', 
      hi: '12 वर्षों से अधिक के अनुभव के साथ, डॉ. शर्मा जटिल ऑर्थोडॉन्टिक और दंत प्रत्यारोपण मामलों के लिए उन्नत विशेषज्ञ-नेतृत्व वाली देखभाल प्रदान करने में विशेषज्ञ हैं।'
    },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. Rahul Mehta',
    qualifications: 'BDS, MDS (Endodontics)',
    specialization: { en: 'Endodontist (Root Canal Specialist)', hi: 'एंडोडोंटिस्ट (रूट कैनाल)' },
    experience: '15',
    description: { 
      en: 'Board-certified and precision-trained, Dr. Mehta specializes in pain-free root canals and preserving natural teeth using microscope-assisted dentistry.', 
      hi: 'बोर्ड-प्रमाणित और सटीक-प्रशिक्षित, डॉ. मेहता दर्द रहित रूट कैनाल और प्राकृतिक दांतों को संरक्षित करने में विशेषज्ञ हैं।'
    },
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', 
  },
  {
    name: 'Dr. Ananya Patel',
    qualifications: 'BDS, Fellowship in Aesthetic Dentistry',
    specialization: { en: 'Cosmetic Dentist', hi: 'कॉस्मेटिक डेंटिस्ट' },
    experience: '9',
    description: { 
      en: 'Dr. Patel blends art and science to craft stunning smiles. Her expertise lies in veneers, teeth whitening, and complete smile makeovers.', 
      hi: 'डॉ. पटेल आश्चर्यजनक मुस्कान गढ़ने के लिए कला और विज्ञान का मिश्रण करती हैं। उनकी विशेषज्ञता विनियर और दांतों को सफेद करने में है।'
    },
    image: 'https://images.unsplash.com/photo-1594824432454-e0b04c8ec60a?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. Vikram Joshi',
    qualifications: 'BDS, MDS (Oral & Maxillofacial Surgery)',
    specialization: { en: 'Oral Surgeon', hi: 'ओरल सर्जन' },
    experience: '18',
    description: { 
      en: 'A leading oral surgeon, Dr. Joshi handles complex extractions, bone grafting, and reconstructive surgeries with unmatched precision.', 
      hi: 'एक प्रमुख ओरल सर्जन, डॉ. जोशी जटिल निष्कर्षण, अस्थि ग्राफ्टिंग और पुनर्निर्माण सर्जरी को बेजोड़ सटीकता के साथ संभालते हैं।'
    },
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
      className="group relative overflow-hidden rounded-[20px] aspect-[3/4] cursor-pointer bg-[var(--bg-cream)] shadow-sm"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(40px)',
        transition: `all 0.8s var(--ease-smooth) ${index * 0.15}s`,
      }}
    >
      <img 
        src={doctor.image} 
        alt={doctor.name}
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
      
      {/* Permanent subtle gradient at bottom so names would be visible, but we are hiding everything until hover as requested */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-colors duration-500" />
      
      {/* Default State (Name visible at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
        <h3 className="font-serif text-[24px] text-white drop-shadow-md mb-1">
          {doctor.name}
        </h3>
        <p className="text-[12px] uppercase tracking-[0.1em] text-white/90 font-medium drop-shadow-md">
          {lang === 'en' ? doctor.specialization.en : doctor.specialization.hi}
        </p>
      </div>

      {/* Hover State Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-center text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
        <h3 className="font-serif text-[28px] text-white mb-2 leading-tight">
          {doctor.name}
        </h3>
        <p className="text-[12px] uppercase tracking-[0.1em] text-[#B81104] font-bold mb-4 bg-white px-3 py-1 rounded-full">
          {lang === 'en' ? doctor.specialization.en : doctor.specialization.hi}
        </p>
        
        <div className="w-12 h-[1px] bg-white/30 mx-auto mb-4" />
        
        <p className="text-[11px] text-white/80 uppercase tracking-widest mb-4">
          {doctor.qualifications}
        </p>
        
        <p className="text-[14px] text-white/90 leading-relaxed max-w-[90%] mx-auto line-clamp-4">
          {lang === 'en' ? doctor.description.en : doctor.description.hi}
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
          className="text-center mb-16 max-w-[700px] mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s var(--ease-smooth)',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#B81104]" />
            <span className="text-label text-[#B81104]">
              {t('Our Consultants', 'हमारे सलाहकार')}
            </span>
            <div className="w-8 h-[1px] bg-[#B81104]" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.name} doctor={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
