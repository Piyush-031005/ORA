'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const REVIEWS = [
  {
    text: {
      en: "I was terrified of the dentist for years until I found ORA. Dr. Sharma's approach was so gentle and professional. The entire experience felt more like a spa visit than a dental appointment.",
      hi: "ORA मिलने से पहले मैं सालों तक डेंटिस्ट से डरती थी। डॉ. शर्मा का दृष्टिकोण बहुत कोमल और पेशेवर था। पूरा अनुभव दंत चिकित्सा की नियुक्ति के बजाय स्पा यात्रा जैसा लगा।"
    },
    author: "Neha Kapoor",
    treatment: "Full Mouth Rehabilitation"
  },
  {
    text: {
      en: "The precision is unmatched. My implant procedure was completely painless, and the recovery was incredibly fast. The technology they use here is truly next level.",
      hi: "सटीकता बेजोड़ है। मेरी प्रत्यारोपण प्रक्रिया पूरी तरह से दर्द रहित थी, और रिकवरी अविश्वसनीय रूप से तेज थी। वे यहां जिस तकनीक का उपयोग करते हैं वह वास्तव में अगले स्तर की है।"
    },
    author: "Vikram Singh",
    treatment: "Dental Implants"
  },
  {
    text: {
      en: "I couldn't stop smiling after my veneers were done. Dr. Patel listened to exactly what I wanted and delivered results that exceeded my expectations. Worth every penny.",
      hi: "मेरे विनियर बन जाने के बाद मैं मुस्कुराना बंद नहीं कर सका। डॉ. पटेल ने ठीक वही सुना जो मैं चाहता था और ऐसे परिणाम दिए जो मेरी उम्मीदों से अधिक थे।"
    },
    author: "Aisha Desai",
    treatment: "Porcelain Veneers"
  }
];

export default function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const { t, lang } = useLanguage();

  return (
    <section id="reviews" className="section-py bg-white">
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
            <div className="w-8 h-[1px] bg-[#B81104]" />
            <span className="text-label text-[#B81104]">
              {t('Patient Success', 'रोगी की सफलता')}
            </span>
            <div className="w-8 h-[1px] bg-[#B81104]" />
          </div>
          <h2 className="display-lg text-[var(--text-dark)] mb-6">
            {t('Smiles that', 'मुस्कान जो')} <br />
            <span className="italic text-[var(--text-gray)]">
              {t('speak for themselves.', 'खुद बोलती हैं।')}
            </span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div 
              key={i}
              className="bg-[var(--bg-cream)] p-8 rounded-[32px] border border-[var(--border-light)] relative"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transition: `all 0.8s var(--ease-smooth) ${i * 0.15}s`,
              }}
            >
              <div className="text-[#B81104] font-serif text-[60px] leading-none absolute top-6 left-6 opacity-20">
                &ldquo;
              </div>
              <p className="text-[15px] text-[var(--text-dark)] leading-relaxed relative z-10 mb-8 pt-4 italic">
                "{lang === 'en' ? review.text.en : review.text.hi}"
              </p>
              <div className="pt-6 border-t border-[var(--border-light)] relative z-10">
                <div className="font-serif font-bold text-[18px] text-[var(--text-dark)] mb-1">
                  {review.author}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[#B81104]">
                  {review.treatment}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div 
          className="mt-16 flex flex-wrap justify-center gap-12 items-center opacity-0 animate-fade-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <div className="text-center">
            <div className="font-serif text-3xl text-[var(--text-dark)] mb-1">4.9/5</div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--text-gray)] flex items-center justify-center gap-2">
              <span className="text-[#F59E0B]">★★★★★</span> Google Reviews
            </div>
          </div>
          <div className="w-[1px] h-10 bg-[var(--border-light)] hidden md:block" />
          <div className="text-center">
            <div className="font-serif text-3xl text-[var(--text-dark)] mb-1">10k+</div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--text-gray)]">
              {t('Patients Treated', 'इलाज किए गए मरीज')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
