'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { io, Socket } from 'socket.io-client';
import { useLanguage } from '@/context/LanguageContext';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(1).max(120),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  problem: z.string().min(3, 'Describe your concern'),
  doctor: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PROBLEMS = [
  'Tooth Pain / Toothache',
  'Bleeding Gums',
  'Tooth Sensitivity',
  'Broken / Chipped Tooth',
  'Swelling / Abscess',
  'Loose Tooth',
  'Cavity / Decay',
  'Whitening / Cosmetic',
  'Braces / Orthodontics',
  'Implants / Prosthetics',
  'Root Canal',
  'Routine Checkup',
  'Other',
];

const DOCTORS = [
  'No Preference',
  'Dr. Priya Sharma (Orthodontist)',
  'Dr. Rahul Mehta (Root Canal)',
  'Dr. Ananya Patel (Cosmetic)',
  'Dr. Vikram Joshi (Surgery)',
];

export default function QueueBooking() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [queueData, setQueueData] = useState<{ queueNo: number; waitTime: number; date: string } | null>(null);
  const [liveStats, setLiveStats] = useState({ total: 0, waiting: 0, currentServing: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const h = now.getHours();
      setIsOpen(h >= 8 && h < 20);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (!BACKEND) return;
    const socket: Socket = io(BACKEND, { transports: ['websocket'] });
    socket.on('queue:stats', (data) => setLiveStats(data));
    return () => { socket.disconnect(); };
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      let queueNo: number;
      let waitTime: number;

      if (BACKEND) {
        const res = await fetch(`${BACKEND}/api/queue/join`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        queueNo = json.queueNo;
        waitTime = json.estimatedWait;
      } else {
        await new Promise(r => setTimeout(r, 1200));
        queueNo = liveStats.total + 1;
        waitTime = liveStats.waiting * 8;
      }

      setQueueData({
        queueNo,
        waitTime,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
      setStep('success');
      setLiveStats(prev => ({ ...prev, total: prev.total + 1, waiting: prev.waiting + 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="queue" className="section-py bg-[#F3F6F8]">
      <div className="container-ora relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header */}
        <div className="text-center mb-14 max-w-[700px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#1E3A5F]" />
            <span className="text-label text-[#1E3A5F]">
              {t('Live Queue System', 'लाइव कतार प्रणाली')}
            </span>
            <div className="w-8 h-[1px] bg-[#1E3A5F]" />
          </div>
          <h2 className="display-lg text-[var(--text-dark)] mb-6">
            {t('Skip the waiting.', 'इंतजार छोड़ें।')} <br />
            <span className="italic text-[var(--text-gray)]">
              {t('Not the care.', 'देखभाल नहीं।')}
            </span>
          </h2>
          <p className="text-body-lg">
            {t(
              "Register from home. Know your exact position. Walk in right when it's your turn.",
              "घर से पंजीकरण करें। अपनी सटीक स्थिति जानें। अपनी बारी आने पर ही अंदर आएं।"
            )}
          </p>
        </div>

        {/* Live Stats */}
        <div className="bg-white rounded-[32px] p-6 md:p-8 flex flex-wrap gap-8 justify-between items-center mb-10 w-full max-w-[660px] shadow-sm border border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} />
            <span className={`font-semibold text-sm ${isOpen ? 'text-[#1E4620]' : 'text-[#A1140A]'}`}>
              {t('Queue', 'कतार')} {isOpen ? 'Open · 8AM – 8PM' : 'Closed · Opens 8AM'}
            </span>
          </div>
          <div className="hidden md:block w-[1px] h-10 bg-[var(--border-light)]" />
          <div className="flex gap-8 md:gap-12">
            {[
              { label: t('Now Serving', 'अभी सेवा दे रहे'), value: liveStats.currentServing || '—' },
              { label: t('Waiting', 'प्रतीक्षा में'), value: liveStats.waiting },
              { label: t('Today Total', 'आज का कुल'), value: liveStats.total },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl text-[var(--text-dark)] mb-1">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-gray)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#B81104] text-white rounded-[40px] p-8 md:p-12 w-full max-w-[660px] shadow-2xl shadow-[#B81104]/20 relative overflow-hidden">
          {/* Subtle bg decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          {step === 'form' ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-10">
              <h3 className="font-serif text-[28px] mb-8 text-center text-white">
                {t("Register for Today's Queue", "आज की कतार के लिए पंजीकरण करें")}
              </h3>

              <div className="flex flex-col gap-6">
                <div>
                  <input 
                    {...register('name')} 
                    className="w-full bg-[#900e03] border border-white/10 rounded-[20px] px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-[#a01003] transition-all"
                    placeholder={t("Full Name (e.g. Rahul Joshi)", "पूरा नाम (उदा. राहुल जोशी)")} 
                  />
                  {errors.name && <p className="text-red-200 text-xs mt-2 ml-4">{errors.name.message}</p>}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      {...register('age')} 
                      type="number" min={1} max={120} 
                      className="w-full bg-[#900e03] border border-white/10 rounded-[20px] px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-[#a01003] transition-all"
                      placeholder={t("Age", "आयु")} 
                    />
                  </div>
                  <div className="flex-[2]">
                    <input 
                      {...register('mobile')} 
                      type="tel" 
                      className="w-full bg-[#900e03] border border-white/10 rounded-[20px] px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-[#a01003] transition-all"
                      placeholder={t("Mobile Number", "मोबाइल नंबर")} 
                    />
                  </div>
                </div>
                {(errors.age || errors.mobile) && (
                  <div className="flex gap-4 mt-[-16px] ml-4 text-red-300 text-xs">
                    <div className="flex-1">{errors.age?.message}</div>
                    <div className="flex-[2]">{errors.mobile?.message}</div>
                  </div>
                )}

                <div>
                  <select 
                    {...register('problem')} 
                    className="w-full bg-[#900e03] border border-white/10 rounded-[20px] px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-[#a01003] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="text-black">{t("Select your concern...", "अपनी समस्या चुनें...")}</option>
                    {PROBLEMS.map(p => <option key={p} value={p} className="text-black">{p}</option>)}
                  </select>
                  {errors.problem && <p className="text-red-200 text-xs mt-2 ml-4">{errors.problem.message}</p>}
                </div>

                <div>
                  <select 
                    {...register('doctor')} 
                    className="w-full bg-[#900e03] border border-white/10 rounded-[20px] px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-[#a01003] transition-all appearance-none cursor-pointer"
                  >
                    {DOCTORS.map(d => <option key={d} value={d} className="text-black">{d}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isOpen}
                  className="mt-4 bg-white text-[#B81104] font-bold uppercase tracking-widest text-sm rounded-[100px] py-5 w-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10"
                >
                  {isSubmitting ? t("Registering...", "पंजीकरण हो रहा है...") : !isOpen ? t("Queue Opens at 8 AM", "कतार सुबह 8 बजे खुलेगी") : t("Get Queue Number", "कतार नंबर प्राप्त करें")}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-32 h-32 rounded-full border-4 border-white/20 flex flex-col items-center justify-center mx-auto mb-8 bg-white/5">
                <span className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{t("Ticket", "टिकट")}</span>
                <span className="font-serif text-5xl text-white">{String(queueData?.queueNo).padStart(3, '0')}</span>
              </div>
              <h3 className="font-serif text-3xl mb-4 text-white">
                {t("You're in the queue!", "आप कतार में हैं!")}
              </h3>
              <p className="text-white/70 text-sm mb-8">
                {t("We will notify you when your turn is near. Please arrive 10 minutes prior.", "आपकी बारी आने पर हम आपको सूचित करेंगे। कृपया 10 मिनट पहले आएं।")}
              </p>
              <button 
                onClick={() => { reset(); setStep('form'); }} 
                className="text-white border border-white/30 rounded-full px-6 py-2 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                {t("Register Another", "एक और पंजीकरण करें")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
