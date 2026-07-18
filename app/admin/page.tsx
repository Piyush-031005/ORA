'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import * as XLSX from 'xlsx';

type Status = 'WAITING' | 'CALLED' | 'INSIDE' | 'DONE' | 'CANCELLED';

interface QueueEntry {
  id: number;
  queueNo: number;
  name: string;
  age: number;
  mobile: string;
  problem: string;
  doctor: string;
  status: Status;
  fees?: number;
  treatment?: string;
  createdAt: string;
}

// Demo data for when backend is not connected
const DEMO_DATA: QueueEntry[] = [
  { id: 1, queueNo: 1, name: 'Rahul Joshi', age: 28, mobile: '9876543210', problem: 'Tooth Pain / Toothache', doctor: 'Dr. Rahul Mehta', status: 'DONE', fees: 6500, treatment: 'Root Canal', createdAt: new Date().toISOString() },
  { id: 2, queueNo: 2, name: 'Priya Singh', age: 34, mobile: '9123456780', problem: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'DONE', fees: 800, treatment: 'Cleaning', createdAt: new Date().toISOString() },
  { id: 3, queueNo: 3, name: 'Amit Kumar', age: 45, mobile: '8765432190', problem: 'Tooth Sensitivity', doctor: 'Dr. Ananya Patel', status: 'INSIDE', fees: 1200, treatment: 'Filling', createdAt: new Date().toISOString() },
  { id: 4, queueNo: 4, name: 'Sunita Devi', age: 52, mobile: '7890123456', problem: 'Swelling / Abscess', doctor: 'Dr. Vikram Joshi', status: 'CALLED', fees: undefined, treatment: undefined, createdAt: new Date().toISOString() },
  { id: 5, queueNo: 5, name: 'Rohit Verma', age: 22, mobile: '9012345678', problem: 'Braces / Orthodontics', doctor: 'Dr. Priya Sharma', status: 'WAITING', fees: undefined, treatment: undefined, createdAt: new Date().toISOString() },
  { id: 6, queueNo: 6, name: 'Meena Sharma', age: 38, mobile: '8901234567', problem: 'Whitening / Cosmetic', doctor: 'Dr. Ananya Patel', status: 'WAITING', fees: undefined, treatment: undefined, createdAt: new Date().toISOString() },
];

const STATUS_CONFIG: Record<Status, { label: string; badge: string; next: Status | null; nextLabel: string }> = {
  WAITING: { label: 'Waiting', badge: 'badge-waiting', next: 'CALLED', nextLabel: 'Call Patient' },
  CALLED: { label: 'Called', badge: 'badge-called', next: 'INSIDE', nextLabel: 'Mark Inside' },
  INSIDE: { label: 'Inside', badge: 'badge-inside', next: 'DONE', nextLabel: 'Mark Done' },
  DONE: { label: 'Done', badge: 'badge-done', next: null, nextLabel: '' },
  CANCELLED: { label: 'Cancelled', badge: 'badge-cancelled', next: null, nextLabel: '' },
};

export default function AdminDashboard() {
  const [queue, setQueue] = useState<QueueEntry[]>(DEMO_DATA);
  const [filter, setFilter] = useState<Status | 'ALL'>('ALL');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [today] = useState(new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

  useEffect(() => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (!BACKEND) return;

    const s: Socket = io(BACKEND, { transports: ['websocket'] });
    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    s.on('queue:full', (data: QueueEntry[]) => setQueue(data));
    s.on('queue:update', (entry: QueueEntry) => {
      setQueue(prev => prev.map(e => e.id === entry.id ? entry : e));
    });
    s.on('queue:new', (entry: QueueEntry) => {
      setQueue(prev => [...prev, entry]);
    });
    setSocket(s);

    // Fetch today's queue
    fetch(`${BACKEND}/api/queue/today`)
      .then(r => r.json())
      .then(data => setQueue(data))
      .catch(() => {});

    return () => { s.disconnect(); };
  }, []);

  const updateStatus = async (id: number, status: Status) => {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (BACKEND) {
      await fetch(`${BACKEND}/api/queue/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } else {
      setQueue(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    }
  };

  const exportToExcel = () => {
    const rows = queue.map(e => ({
      'Queue No': e.queueNo,
      'Name': e.name,
      'Age': e.age,
      'Mobile': e.mobile,
      'Problem': e.problem,
      'Doctor': e.doctor,
      'Treatment': e.treatment || '',
      'Fees (₹)': e.fees || '',
      'Status': e.status,
      'Time': new Date(e.createdAt).toLocaleTimeString('en-IN'),
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 6 }, { wch: 15 }, { wch: 25 }, { wch: 25 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ORA Queue');
    XLSX.writeFile(wb, `ORA_Queue_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const filtered = filter === 'ALL' ? queue : queue.filter(e => e.status === filter);

  const stats = {
    total: queue.length,
    waiting: queue.filter(e => e.status === 'WAITING').length,
    inside: queue.filter(e => e.status === 'INSIDE').length,
    done: queue.filter(e => e.status === 'DONE').length,
    revenue: queue.filter(e => e.status === 'DONE').reduce((acc, e) => acc + (e.fees || 0), 0),
    currentServing: queue.find(e => e.status === 'INSIDE')?.queueNo || queue.find(e => e.status === 'CALLED')?.queueNo,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', color: 'var(--ghost)' }}>
      {/* Header */}
      <div
        className="glass-dark"
        style={{ padding: '20px 32px', borderBottom: '1px solid rgba(247,247,255,0.06)', position: 'sticky', top: 0, zIndex: 50 }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: 'var(--ghost)' }}>
              ORA <span style={{ color: 'var(--cyan-glow)' }}>Reception</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 2 }}>{today}</div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: connected ? '#22C55E' : '#EF4444',
                boxShadow: connected ? '0 0 10px #22C55E' : 'none',
              }} />
              <span style={{ fontSize: 13, color: connected ? '#22C55E' : '#EF4444' }}>
                {connected ? 'Live' : 'Demo Mode'}
              </span>
            </div>

            {/* TV mode link */}
            <a href="/queue/display" target="_blank" className="btn btn-outline btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
              </svg>
              TV Display
            </a>

            {/* Export */}
            <button onClick={exportToExcel} className="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px' }}>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Today', value: stats.total, color: 'var(--ghost)' },
            { label: 'Waiting', value: stats.waiting, color: '#F59E0B' },
            { label: 'Inside', value: stats.inside, color: '#A78BFA' },
            { label: 'Completed', value: stats.done, color: '#22C55E' },
            { label: "Today's Revenue", value: `₹${stats.revenue.toLocaleString('en-IN')}`, color: 'var(--cyan-glow)' },
          ].map(s => (
            <div key={s.label} className="card-glass" style={{ padding: '20px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Current Serving Banner */}
        {stats.currentServing && (
          <div
            className="glass-royal"
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: '20px 32px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              borderColor: 'rgba(0,212,255,0.3)',
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(0,212,255,0.15)',
              border: '1.5px solid rgba(0,212,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 22,
              color: 'var(--cyan-glow)',
              animation: 'glow-pulse 2s ease-in-out infinite',
            }}>
              {String(stats.currentServing).padStart(3, '0')}
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--cyan-glow)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Now Serving</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--ghost)' }}>
                {queue.find(e => e.queueNo === stats.currentServing)?.name}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--gray-400)' }}>
              {stats.waiting} patient{stats.waiting !== 1 ? 's' : ''} waiting
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['ALL', 'WAITING', 'CALLED', 'INSIDE', 'DONE', 'CANCELLED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn btn-sm"
              style={{
                background: filter === f ? 'var(--royal)' : 'rgba(247,247,255,0.04)',
                color: filter === f ? 'var(--ghost)' : 'var(--gray-400)',
                border: `1px solid ${filter === f ? 'rgba(61,40,196,0.5)' : 'rgba(247,247,255,0.08)'}`,
              }}
            >
              {f} {f !== 'ALL' && `(${queue.filter(e => e.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Queue Table */}
        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(247,247,255,0.03)', borderBottom: '1px solid rgba(247,247,255,0.06)' }}>
                  {['No.', 'Patient', 'Age', 'Mobile', 'Problem', 'Doctor', 'Status', 'Action'].map(h => (
                    <th key={h} style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--gray-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, i) => {
                  const cfg = STATUS_CONFIG[entry.status];
                  return (
                    <tr
                      key={entry.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? '1px solid rgba(247,247,255,0.04)' : 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(247,247,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '16px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: 'var(--ghost)' }}>
                        {String(entry.queueNo).padStart(3, '0')}
                      </td>
                      <td style={{ padding: '16px', fontWeight: 600, color: 'var(--ghost)' }}>{entry.name}</td>
                      <td style={{ padding: '16px', color: 'var(--gray-400)' }}>{entry.age}</td>
                      <td style={{ padding: '16px', color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>
                        <a href={`tel:${entry.mobile}`} style={{ color: 'var(--cyan-glow)' }}>{entry.mobile}</a>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--gray-200)', maxWidth: 160, fontSize: 13 }}>{entry.problem}</td>
                      <td style={{ padding: '16px', color: 'var(--gray-400)', fontSize: 13, whiteSpace: 'nowrap' }}>{entry.doctor}</td>
                      <td style={{ padding: '16px' }}>
                        <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="flex gap-2">
                          {cfg.next && (
                            <button
                              onClick={() => updateStatus(entry.id, cfg.next!)}
                              className="btn btn-sm"
                              style={{
                                background: 'rgba(39,24,125,0.4)',
                                color: 'var(--ghost)',
                                border: '1px solid rgba(61,40,196,0.4)',
                                fontSize: 12,
                                padding: '7px 12px',
                              }}
                            >
                              {cfg.nextLabel}
                            </button>
                          )}
                          {entry.status === 'WAITING' && (
                            <button
                              onClick={() => updateStatus(entry.id, 'CANCELLED')}
                              className="btn btn-sm"
                              style={{
                                background: 'rgba(239,68,68,0.1)',
                                color: '#EF4444',
                                border: '1px solid rgba(239,68,68,0.2)',
                                fontSize: 12,
                                padding: '7px 12px',
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-600)' }}>
                      No patients in this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
