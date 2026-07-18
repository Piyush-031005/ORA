'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { io, Socket } from 'socket.io-client';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number({ coerce: true }).min(1).max(120),
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

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Check if queue is open (8 AM – 8 PM)
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

  // Socket.IO live stats
  useEffect(() => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (!BACKEND) return;
    const socket: Socket = io(BACKEND, { transports: ['websocket'] });
    socket.on('queue:stats', (data) => setLiveStats(data));
    return () => { socket.disconnect(); };
  }, []);

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
        // Demo mode
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

  const handleReset = () => {
    reset();
    setStep('form');
    setQueueData(null);
  };

  return (
    <section id="queue" className="section-py" style={{ background: 'var(--midnight)', position: 'relative', overflow: 'hidden' }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, rgba(39,24,125,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container-ora" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-label mb-4" style={{ color: 'var(--cyan-glow)' }}>Live Queue System</div>
          <h2 className="display-lg" style={{ color: 'var(--ghost)', marginBottom: 16 }}>
            Skip the waiting.<br />
            <span className="text-gradient-royal">Not the care.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Register from home. Know your exact position. Walk in right when it's your turn.
          </p>
        </div>

        {/* Live Stats Bar */}
        <div
          className="glass"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '20px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40,
            maxWidth: 700,
            margin: '0 auto 40px',
          }}
        >
          {/* Queue open status */}
          <div className="flex items-center gap-3">
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: isOpen ? '#22C55E' : '#EF4444',
              boxShadow: isOpen ? '0 0 12px #22C55E' : 'none',
            }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: isOpen ? '#22C55E' : '#EF4444', fontSize: 14 }}>
              Queue {isOpen ? 'Open · 8AM – 8PM' : 'Closed · Opens 8AM'}
            </span>
          </div>
          <div style={{ height: 30, width: 1, background: 'rgba(247,247,255,0.08)' }} className="hide-mobile" />
          <div className="flex gap-8">
            {[
              { label: 'Now Serving', value: liveStats.currentServing || '—' },
              { label: 'Waiting', value: liveStats.waiting },
              { label: 'Today Total', value: liveStats.total },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 700, color: 'var(--ghost)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div
          className="glass-royal"
          style={{
            maxWidth: 560,
            margin: '0 auto',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(28px,5vw,48px)',
          }}
        >
          {step === 'form' ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: 'var(--ghost)', marginBottom: 28 }}>
                Register for Today's Queue
              </h3>

              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="input-label">Full Name *</label>
                  <input {...register('name')} className="input-ora" placeholder="e.g. Rahul Joshi" />
                  {errors.name && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 6 }}>{errors.name.message}</p>}
                </div>

                {/* Age + Mobile */}
                <div className="flex gap-4">
                  <div style={{ flex: 1 }}>
                    <label className="input-label">Age *</label>
                    <input {...register('age')} type="number" min={1} max={120} className="input-ora" placeholder="25" />
                    {errors.age && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 6 }}>{errors.age.message}</p>}
                  </div>
                  <div style={{ flex: 2 }}>
                    <label className="input-label">Mobile Number *</label>
                    <input {...register('mobile')} type="tel" className="input-ora" placeholder="98xxxxxxxx" />
                    {errors.mobile && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 6 }}>{errors.mobile.message}</p>}
                  </div>
                </div>

                {/* Problem */}
                <div>
                  <label className="input-label">Chief Complaint *</label>
                  <select {...register('problem')} className="input-ora" style={{ cursor: 'pointer' }}>
                    <option value="">Select your concern...</option>
                    {PROBLEMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.problem && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 6 }}>{errors.problem.message}</p>}
                </div>

                {/* Doctor preference */}
                <div>
                  <label className="input-label">Preferred Doctor</label>
                  <select {...register('doctor')} className="input-ora" style={{ cursor: 'pointer' }}>
                    {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isOpen}
                  className="btn btn-primary btn-lg w-full justify-center"
                  style={{ marginTop: 8, opacity: (!isOpen || isSubmitting) ? 0.5 : 1, cursor: (!isOpen || isSubmitting) ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                      </svg>
                      Registering...
                    </>
                  ) : !isOpen ? (
                    'Queue Opens at 8 AM'
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Get My Queue Number
                    </>
                  )}
                </button>

                {!isOpen && (
                  <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-600)' }}>
                    Queue registration opens at 8:00 AM daily
                  </p>
                )}
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center">
              {/* Animated ticket */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(39,24,125,0.4), rgba(0,212,255,0.1))',
                  border: '2px solid rgba(0,212,255,0.4)',
                  margin: '0 auto 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 60px rgba(0,212,255,0.2)',
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                <div style={{ fontSize: 13, color: 'var(--cyan-glow)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Your Number</div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 72,
                  fontWeight: 800,
                  color: 'var(--ghost)',
                  lineHeight: 1,
                  textShadow: '0 0 40px rgba(0,212,255,0.4)',
                }}>
                  {String(queueData?.queueNo).padStart(3, '0')}
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 8 }}>{queueData?.date}</div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 700, color: 'var(--ghost)', marginBottom: 10 }}>
                You're in the queue!
              </h3>

              {queueData && queueData.waitTime > 0 && (
                <div className="badge badge-called" style={{ display: 'inline-flex', marginBottom: 16 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Est. wait: ~{queueData.waitTime} min
                </div>
              )}

              <p style={{ color: 'var(--gray-400)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                You'll be notified when your turn is near. Please arrive 10 minutes before your estimated time.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a href="/queue/display" className="btn btn-outline btn-sm" target="_blank">
                  View Live Screen
                </a>
                <button onClick={handleReset} className="btn btn-ghost btn-sm" style={{ color: 'var(--gray-400)' }}>
                  Register Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
