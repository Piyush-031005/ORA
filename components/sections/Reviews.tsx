'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const REVIEWS = [
  {
    text: {
      en: "I was terrified of the dentist for years until I found ORA. Dr. Sharma's approach was so gentle and professional.",
      hi: "ORA मिलने से पहले मैं सालों तक डेंटिस्ट से डरती थी। डॉ. शर्मा का दृष्टिकोण बहुत कोमल और पेशेवर था।"
    },
    author: "Neha Kapoor",
    treatment: "Full Mouth Rehabilitation",
    beforeImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=400&auto=format&fit=crop"
  },
  {
    text: {
      en: "The precision is unmatched. My implant procedure was completely painless, and the recovery was incredibly fast.",
      hi: "सटीकता बेजोड़ है। मेरी प्रत्यारोपण प्रक्रिया पूरी तरह से दर्द रहित थी, और रिकवरी अविश्वसनीय रूप से तेज थी।"
    },
    author: "Vikram Singh",
    treatment: "Dental Implants",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fea5f95b5cf4?q=80&w=400&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=400&auto=format&fit=crop"
  },
  {
    text: {
      en: "I couldn't stop smiling after my veneers were done. Dr. Patel delivered results that exceeded my expectations.",
      hi: "मेरे विनियर बन जाने के बाद मैं मुस्कुराना बंद नहीं कर सका। डॉ. पटेल ने उम्मीदों से बेहतर परिणाम दिए।"
    },
    author: "Aisha Desai",
    treatment: "Porcelain Veneers",
    beforeImage: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=400&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1522845015757-50bce044e5da?q=80&w=400&auto=format&fit=crop"
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
              className="bg-[var(--bg-cream)] rounded-[32px] border border-[var(--border-light)] relative overflow-hidden flex flex-col shadow-sm"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transition: `all 0.8s var(--ease-smooth) ${i * 0.15}s`,
              }}
            >
              {/* Before/After Images - Top Section */}
              <div className="flex w-full h-[180px] bg-gray-100 p-1">
                <div className="w-1/2 relative rounded-l-[28px] overflow-hidden group">
                  <img src={review.beforeImage} alt="Before" className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-full backdrop-blur-md">
                    Before
                  </div>
                </div>
                <div className="w-1/2 relative rounded-r-[28px] overflow-hidden group ml-1">
                  <img src={review.afterImage} alt="After" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 bg-[#B81104]/90 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-full backdrop-blur-md">
                    After
                  </div>
                </div>
              </div>

              {/* Review Content - Bottom Section */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="relative">
                  <span className="text-[#B81104] font-serif text-[48px] leading-none absolute -top-4 -left-2 opacity-20">
                    &ldquo;
                  </span>
                  <p className="text-[15px] text-[var(--text-dark)] leading-relaxed italic z-10 relative pt-2">
                    "{lang === 'en' ? review.text.en : review.text.hi}"
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-[var(--border-light)]">
                  <div className="font-serif font-bold text-[18px] text-[var(--text-dark)] mb-1">
                    {review.author}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-[#B81104]">
                    {review.treatment}
                  </div>
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
