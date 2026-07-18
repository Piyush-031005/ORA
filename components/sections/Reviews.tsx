'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const REVIEWS = [
  {
    text: {
      en: "I had lost my two front teeth in an accident years ago. Dr. Sharma gave me implants that look completely natural. Nobody can tell the difference. I finally smile with confidence again.",
      hi: "मैंने सालों पहले एक दुर्घटना में अपने दो सामने के दांत खो दिए थे। डॉ. शर्मा ने मुझे ऐसे इंप्लांट दिए जो पूरी तरह प्राकृतिक दिखते हैं।"
    },
    author: "Rajesh Kumar",
    age: 42,
    treatment: "Dental Implants",
    image: "/images/before-after/case1.png"
  },
  {
    text: {
      en: "My teeth were badly decayed and discoloured for years. The full mouth rehabilitation at ORA completely transformed my smile. The team was patient and explained every step clearly.",
      hi: "मेरे दांत सालों से बुरी तरह सड़े हुए थे। ORA में पूर्ण मुख पुनर्वास ने मेरी मुस्कान को पूरी तरह बदल दिया।"
    },
    author: "Suresh Patel",
    age: 55,
    treatment: "Full Mouth Restoration",
    image: "/images/before-after/case2.png"
  },
  {
    text: {
      en: "I always hid my smile because of gaps and crooked teeth. The smile design treatment gave me perfectly aligned, bright white teeth. It changed my life and boosted my self-esteem.",
      hi: "मैं हमेशा अपनी मुस्कान छुपाता था क्योंकि दांतों में गैप और टेढ़ापन था। स्माइल डिज़ाइन ट्रीटमेंट ने मुझे बिल्कुल सीधे, चमकदार सफ़ेद दांत दिए।"
    },
    author: "Amit Verma",
    age: 38,
    treatment: "Smile Design",
    image: "/images/before-after/case3.png"
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
          <h2 className="display-lg text-[var(--text-dark)] mb-4">
            {t('Real results.', 'असली परिणाम।')}
          </h2>
          <p className="italic text-[var(--text-gray)]" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {t('Real smiles.', 'असली मुस्कान।')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div 
              key={i}
              className="bg-[var(--bg-cream)] rounded-[24px] border border-[var(--border-light)] overflow-hidden flex flex-col shadow-sm"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transition: `all 0.8s var(--ease-smooth) ${i * 0.15}s`,
              }}
            >
              {/* Before/After Image — cropped to show teeth specifically */}
              {review.image.includes('case3.png') ? (
                <div className="w-full h-[180px] relative overflow-hidden bg-[#1A1A1A] border-b border-[var(--border-light)]">
                  <img 
                    src={review.image} 
                    alt={`${review.author} - Before and After`} 
                    className="w-full h-full object-cover object-center opacity-95"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-sm">
                    Before → After
                  </div>
                </div>
              ) : (
                <div className="w-full h-[180px] flex relative overflow-hidden bg-[#1A1A1A] border-b border-[var(--border-light)]">
                  {/* Left: Before (top half of image) */}
                  <div className="w-1/2 h-full overflow-hidden relative border-r border-white/10">
                    <img 
                      src={review.image} 
                      alt="Before" 
                      className="w-full h-[210%] max-w-none object-cover"
                      style={{ objectPosition: 'center 12%' }}
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-sm">
                      Before
                    </div>
                  </div>
                  {/* Right: After (bottom half of image) */}
                  <div className="w-1/2 h-full overflow-hidden relative">
                    <img 
                      src={review.image} 
                      alt="After" 
                      className="w-full h-[210%] max-w-none object-cover"
                      style={{ objectPosition: 'center 88%' }}
                    />
                    <div className="absolute top-2 left-2 bg-[#B81104]/80 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-sm">
                      After
                    </div>
                  </div>
                </div>
              )}

              {/* Review Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-[14px] text-[var(--text-dark)] leading-relaxed mb-6">
                  "{lang === 'en' ? review.text.en : review.text.hi}"
                </p>
                
                <div className="pt-4 border-t border-[var(--border-light)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif text-[16px] text-[var(--text-dark)] mb-0.5">
                        {review.author}, {review.age}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-[#B81104] font-medium">
                        {review.treatment}
                      </div>
                    </div>
                    <div className="text-[#F59E0B] text-sm">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 items-center">
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
