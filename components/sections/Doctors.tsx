'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const DOCTORS = [
  {
    name: 'Dr. Priya Sharma',
    qualifications: 'BDS, MDS (Orthodontics)',
    specialization: { en: 'Orthodontist & Implantologist', hi: 'ऑर्थोडॉन्टिस्ट और इंप्लांटोलॉजिस्ट' },
    experience: '12',
    description: { 
      en: 'With over 12 years of specialist experience, Dr. Sharma delivers advanced care for complex orthodontic and implant cases with unmatched precision.', 
      hi: '12 वर्षों से अधिक के अनुभव के साथ, डॉ. शर्मा जटिल ऑर्थोडॉन्टिक और दंत प्रत्यारोपण मामलों में विशेषज्ञ हैं।'
    },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    tags: ['Orthodontics', 'Implants', 'Clear Aligners'],
  },
  {
    name: 'Dr. Rahul Mehta',
    qualifications: 'BDS, MDS (Endodontics)',
    specialization: { en: 'Root Canal Specialist', hi: 'रूट कैनाल विशेषज्ञ' },
    experience: '15',
    description: { 
      en: 'Board-certified and microscope-trained, Dr. Mehta has mastered pain-free root canals and endodontic microsurgery over 15 years of practice.', 
      hi: 'बोर्ड-प्रमाणित और माइक्रोस्कोप-प्रशिक्षित, डॉ. मेहता 15 वर्षों के अभ्यास में दर्द रहित रूट कैनाल के विशेषज्ञ हैं।'
    },
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', 
    tags: ['Root Canal', 'Endodontics', 'Microsurgery'],
  },
  {
    name: 'Dr. Ananya Patel',
    qualifications: 'BDS, Fellowship in Aesthetic Dentistry',
    specialization: { en: 'Cosmetic Dentist', hi: 'कॉस्मेटिक डेंटिस्ट' },
    experience: '9',
    description: { 
      en: 'Dr. Patel blends art and science to craft stunning smile makeovers. Her expertise in veneers, whitening and smile design has transformed thousands of smiles.', 
      hi: 'डॉ. पटेल कला और विज्ञान का मिश्रण करके आश्चर्यजनक स्माइल मेकओवर तैयार करती हैं। विनियर और दांतों को सफेद करने में उनकी विशेषज्ञता ने हजारों मुस्कानों को बदला है।'
    },
    image: '/images/dr-ananya.png',
    tags: ['Veneers', 'Smile Design', 'Whitening'],
  },
  {
    name: 'Dr. Vikram Joshi',
    qualifications: 'BDS, MDS (Oral & Maxillofacial Surgery)',
    specialization: { en: 'Oral & Maxillofacial Surgeon', hi: 'ओरल सर्जन' },
    experience: '18',
    description: { 
      en: 'With 18 years of surgical excellence, Dr. Joshi handles complex extractions, bone grafting, and reconstructive surgeries with unparalleled precision and care.', 
      hi: '18 वर्षों की सर्जिकल उत्कृष्टता के साथ, डॉ. जोशी जटिल निष्कर्षण और पुनर्निर्माण सर्जरी को बेजोड़ सटीकता के साथ संभालते हैं।'
    },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    tags: ['Oral Surgery', 'Bone Grafting', 'Extractions'],
  },
];

function DoctorRow({ doctor, index }: { doctor: typeof DOCTORS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { lang } = useLanguage();
  const isEven = index % 2 === 0;

  // Common Info Panel content to keep the code DRY
  const infoPanel = (
    <div
      className="w-full flex flex-col justify-center p-8 md:p-12 lg:p-16 text-left relative overflow-hidden"
      style={{ backgroundColor: '#B81104', minHeight: '400px' }}
    >
      {/* Decorative watermark number */}
      <div
        className="absolute top-6 right-8 font-serif italic select-none pointer-events-none"
        style={{ fontSize: '120px', lineHeight: 1, color: 'rgba(255,255,255,0.06)', fontWeight: 400 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Experience badge */}
      <div className="inline-flex items-center gap-2 mb-6">
        <div className="w-8 h-[2px] bg-white/60" />
        <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
          {doctor.experience} {lang === 'en' ? 'Years Experience' : 'वर्षों का अनुभव'}
        </span>
      </div>

      {/* Name */}
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3vw, 38px)', color: '#FFFFFF', fontWeight: 400, lineHeight: 1.15, marginBottom: '8px', letterSpacing: '-0.01em' }}>
        {doctor.name}
      </h3>

      {/* Specialization */}
      <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: '4px' }}>
        {lang === 'en' ? doctor.specialization.en : doctor.specialization.hi}
      </p>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px', fontStyle: 'italic' }}>
        {doctor.qualifications}
      </p>

      {/* Divider */}
      <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '24px' }} />

      {/* Description */}
      <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, maxWidth: '460px', marginBottom: '28px' }}>
        {lang === 'en' ? doctor.description.en : doctor.description.hi}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {doctor.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full"
            style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const imagePanel = (
    <div className="relative w-full h-full min-h-[320px] md:min-h-full overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 60%)' }} />
    </div>
  );

  return (
    <div
      ref={ref}
      className="w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-[28px] shadow-md bg-[#B81104]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateY(50px)`,
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      {isEven ? (
        <>
          {/* Image Left, Info Right */}
          <div className="md:col-span-5 h-full">
            {imagePanel}
          </div>
          <div className="md:col-span-7 h-full">
            {infoPanel}
          </div>
        </>
      ) : (
        <>
          {/* Info Left, Image Right */}
          <div className="md:col-span-7 h-full">
            {infoPanel}
          </div>
          <div className="md:col-span-5 h-full">
            {imagePanel}
          </div>
        </>
      )}
    </div>
  );
}

export default function Doctors() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="doctors" className="section-py bg-[#F8F9FA]">
      <div className="container-ora">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 max-w-[700px] mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
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
            {t('Meet the specialists', 'मिलें विशेषज्ञों से')}{' '}
            <span className="italic text-[var(--text-gray)]">{t('behind your smile.', 'जो आपकी मुस्कान गढ़ते हैं।')}</span>
          </h2>
          <p className="text-body-lg">
            {t(
              'Every doctor at ORA is a specialist — board-certified, precision-trained, and obsessed with outcomes.',
              'ORA का हर डॉक्टर एक विशेषज्ञ है — बोर्ड-प्रमाणित और परिणामों के प्रति जुनूनी।'
            )}
          </p>
        </div>

        {/* Alternating doctor rows */}
        <div className="flex flex-col gap-6">
          {DOCTORS.map((doc, i) => (
            <DoctorRow key={doc.name} doctor={doc} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
