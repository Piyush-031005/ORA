'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface QueueState {
  currentServing: number;
  nextUp: number[];
  waiting: number;
}

export default function QueueDisplay() {
  const [state, setState] = useState<QueueState>({
    currentServing: 3,
    nextUp: [4, 5, 6, 7],
    waiting: 12,
  });
  const [time, setTime] = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    // Time update
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    tick();
    const timeId = setInterval(tick, 1000);

    // Blink animation
    const blinkId = setInterval(() => setBlink(b => !b), 800);

    // Socket
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (BACKEND) {
      const socket = io(BACKEND);
      socket.on('queue:display', (data: QueueState) => setState(data));
      return () => { socket.disconnect(); clearInterval(timeId); clearInterval(blinkId); };
    }

    return () => { clearInterval(timeId); clearInterval(blinkId); };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      background: 'var(--midnight)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Background radial */}
      <div style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, rgba(39,24,125,0.2) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        padding: '24px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(247,247,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--royal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C10.5 3 9.5 3.8 9 5C8 7 8.5 10 10 12C10.5 13 11 14.5 11 16C11 17.5 11.5 19 12 19C12.5 19 13 17.5 13 16C13 14.5 13.5 13 14 12C15.5 10 16 7 15 5C14.5 3.8 13.5 3 12 3Z" fill="var(--ghost)" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ghost)' }}>ORA Dental Studio</div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Queue Display</div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--ghost)' }}>{time}</div>
          <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', padding: '48px', gap: 48, alignItems: 'stretch', minHeight: 0 }}>
        {/* Now Serving */}
        <div style={{
          flex: '0 0 auto',
          width: 480,
          background: 'rgba(39,24,125,0.15)',
          border: '1.5px solid rgba(0,212,255,0.3)',
          borderRadius: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          boxShadow: '0 0 80px rgba(0,212,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated ring */}
          <div style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            border: '1px solid rgba(0,212,255,0.1)',
            animation: 'ping-slow 3s ease-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            border: '1px solid rgba(0,212,255,0.15)',
            animation: 'ping-slow 3s ease-out infinite 1s',
          }} />

          <div style={{ fontSize: 20, color: 'var(--cyan-glow)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>
            Now Serving
          </div>

          <div style={{
            fontSize: 'clamp(120px, 20vw, 180px)',
            fontWeight: 900,
            color: 'var(--ghost)',
            lineHeight: 1,
            textShadow: '0 0 80px rgba(0,212,255,0.4)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(state.currentServing).padStart(3, '0')}
          </div>

          <div style={{
            width: 80,
            height: 3,
            background: 'linear-gradient(90deg, transparent, var(--cyan-glow), transparent)',
            marginTop: 24,
            marginBottom: 24,
            opacity: blink ? 1 : 0.3,
            transition: 'opacity 0.4s',
          }} />

          <div style={{ fontSize: 18, color: 'var(--gray-400)', textAlign: 'center' }}>
            Please proceed to the<br />
            <span style={{ color: 'var(--ghost)', fontWeight: 600 }}>Consultation Room</span>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32, minWidth: 0 }}>
          {/* Next up */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, color: 'var(--gray-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, fontWeight: 600 }}>
              Up Next
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {state.nextUp.slice(0, 4).map((no, i) => (
                <div
                  key={no}
                  style={{
                    background: i === 0 ? 'rgba(39,24,125,0.3)' : 'rgba(247,247,255,0.03)',
                    border: `1px solid ${i === 0 ? 'rgba(61,40,196,0.4)' : 'rgba(247,247,255,0.06)'}`,
                    borderRadius: 16,
                    padding: '20px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    opacity: 1 - i * 0.15,
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: i === 0 ? 'rgba(61,40,196,0.4)' : 'rgba(247,247,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: 'var(--gray-400)',
                    fontWeight: 600,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: i === 0 ? 'var(--ghost)' : 'var(--gray-400)', lineHeight: 1 }}>
                    {String(no).padStart(3, '0')}
                  </div>
                  {i === 0 && (
                    <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--royal-light)', fontWeight: 600 }}>
                      Please be ready
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              flex: 1,
              background: 'rgba(247,247,255,0.03)',
              border: '1px solid rgba(247,247,255,0.06)',
              borderRadius: 20,
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#F59E0B' }}>{state.waiting}</div>
              <div style={{ fontSize: 14, color: 'var(--gray-400)', marginTop: 4 }}>Patients Waiting</div>
            </div>
            <div style={{
              flex: 1,
              background: 'rgba(247,247,255,0.03)',
              border: '1px solid rgba(247,247,255,0.06)',
              borderRadius: 20,
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#22C55E' }}>~{state.waiting * 8}</div>
              <div style={{ fontSize: 14, color: 'var(--gray-400)', marginTop: 4 }}>Est. Wait (mins)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer ticker */}
      <div style={{
        padding: '16px 48px',
        borderTop: '1px solid rgba(247,247,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 10px #22C55E', flexShrink: 0 }} />
        <div style={{ fontSize: 14, color: 'var(--gray-400)' }}>
          ORA Dental Studio · +91 12345 67890 · 23, Dental Square, MG Road, Mumbai · Queue opens 8 AM daily
        </div>
      </div>
    </div>
  );
}
