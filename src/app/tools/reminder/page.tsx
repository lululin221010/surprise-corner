'use client';
// 📄 路徑：src/app/tools/reminder/page.tsx

import { useState, useEffect, useRef } from 'react';

interface ReminderItem {
  id: string;
  content: string;
  datetime: string; // ISO string
}

interface FeedbackItem {
  _id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(167,139,250,0.25)',
  borderRadius: '16px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
};

const btnStyle = (active = false): React.CSSProperties => ({
  background: active ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'rgba(255,255,255,0.08)',
  color: '#fff',
  border: 'none',
  borderRadius: '30px',
  padding: '0.5rem 1.2rem',
  cursor: 'pointer',
  fontWeight: active ? 700 : 400,
  fontSize: '0.85rem',
  transition: 'all 0.2s',
});

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(167,139,250,0.3)',
  borderRadius: '10px',
  color: '#fff',
  padding: '0.7rem 1rem',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

export default function ReminderPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [remindersLoaded, setRemindersLoaded] = useState(false);
  const [trialExpired, setTrialExpired] = useState(false);

  // Form
  const [formContent, setFormContent] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [audioFileName, setAudioFileName] = useState('');
  const audioUrlRef = useRef<string>('');

  // Alarm
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmItem, setAlarmItem] = useState<ReminderItem | null>(null);
  const alarmActiveRef = useRef(false);
  const remindersRef = useRef<ReminderItem[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Feedback
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [fbNickname, setFbNickname] = useState('');
  const [fbContent, setFbContent] = useState('');
  const [fbMsg, setFbMsg] = useState('');

  // ── Init ──────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reminder-items');
      if (saved) setReminders(JSON.parse(saved));
    } catch {}
    setRemindersLoaded(true);

    const trialStart = localStorage.getItem('reminder-trial-start');
    if (!trialStart) {
      localStorage.setItem('reminder-trial-start', new Date().toISOString());
    } else {
      const days = (Date.now() - new Date(trialStart).getTime()) / 86400000;
      if (days > 7) setTrialExpired(true);
    }

    fetchFeedbacks();
  }, []);

  // Keep remindersRef in sync
  useEffect(() => {
    remindersRef.current = reminders;
  }, [reminders]);

  // Save to localStorage
  useEffect(() => {
    if (!remindersLoaded) return;
    try { localStorage.setItem('reminder-items', JSON.stringify(reminders)); } catch {}
  }, [reminders, remindersLoaded]);

  // ── Alarm logic ───────────────────────────────────
  function triggerAlarm(item: ReminderItem) {
    alarmActiveRef.current = true;
    setAlarmItem(item);
    setAlarmActive(true);
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';

    if (audioUrlRef.current) {
      const audio = new Audio(audioUrlRef.current);
      audio.loop = true;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } else {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        audioContextRef.current = ctx;
        oscillatorRef.current = osc;
      } catch {}
    }
  }

  function stopAlarm() {
    alarmActiveRef.current = false;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (oscillatorRef.current) { try { oscillatorRef.current.stop(); } catch {} oscillatorRef.current = null; }
    if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; }
    setAlarmActive(false);
    setAlarmItem(null);
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  function snooze(minutes: number) {
    const content = alarmItem?.content || '';
    stopAlarm();
    const dt = new Date(Date.now() + minutes * 60000);
    const newR: ReminderItem = { id: Date.now().toString(), content, datetime: dt.toISOString() };
    setReminders(prev => [...prev, newR]);
  }

  // Check every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (alarmActiveRef.current) return;
      const now = new Date();
      const current = remindersRef.current;
      const triggered = current.filter(r => new Date(r.datetime) <= now);
      if (triggered.length > 0) {
        setReminders(current.filter(r => new Date(r.datetime) > now));
        triggerAlarm(triggered[0]);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // ── Handlers ──────────────────────────────────────
  function handleAudioSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFileName(file.name);
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    audioUrlRef.current = URL.createObjectURL(file);
  }

  function addReminder() {
    if (!formContent.trim() || !formDate || !formTime) return;
    const newR: ReminderItem = {
      id: Date.now().toString(),
      content: formContent.trim(),
      datetime: new Date(`${formDate}T${formTime}`).toISOString(),
    };
    setReminders(prev => [...prev, newR]);
    setFormContent(''); setFormDate(''); setFormTime('');
  }

  // ── Feedback ──────────────────────────────────────
  async function fetchFeedbacks() {
    try {
      const res = await fetch('/api/reminder/feedback');
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch {}
  }

  async function submitFeedback() {
    if (!fbNickname.trim() || !fbContent.trim()) { setFbMsg('❌ 請填寫暱稱和留言'); return; }
    try {
      const res = await fetch('/api/reminder/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: fbNickname.trim(), content: fbContent.trim() }),
      });
      if (res.ok) {
        setFbMsg('✅ 留言成功，謝謝！');
        setFbNickname(''); setFbContent('');
        fetchFeedbacks();
      } else { setFbMsg('❌ 送出失敗'); }
    } catch { setFbMsg('❌ 網路錯誤'); }
  }

  // ── Helpers ───────────────────────────────────────
  function fmtDT(iso: string) {
    return new Date(iso).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  const sortedReminders = [...reminders].sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

  // ── Render ────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes reminderPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes waveA {
          0%,100% { height: 6px; }
          50% { height: 22px; }
        }
        @keyframes waveB {
          0%,100% { height: 16px; }
          50% { height: 6px; }
        }
        @keyframes waveC {
          0%,100% { height: 10px; }
          33% { height: 24px; }
          66% { height: 6px; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

          {/* Trial expired banner */}
          {trialExpired && (
            <div style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: '12px', padding: '0.8rem 1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <span style={{ color: '#fcd34d', fontSize: '0.9rem' }}>⏳ 免費試用已結束，會員功能即將開放</span>
            </div>
          )}

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>⏰ 全螢幕提醒鬧鐘</h1>
            <p style={{ color: '#a78bfa', margin: 0 }}>時間到強制全螢幕，手動關閉才算真的看到</p>
          </div>

          {/* Warning card */}
          <div style={{ ...cardStyle, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)', marginBottom: '1.5rem' }}>
            <p style={{ color: '#fca5a5', fontWeight: 700, margin: '0 0 0.7rem', fontSize: '0.9rem' }}>⚠️ 使用前請確認</p>
            {[
              '🔋 手機要充電，沒電的手機不會叫你',
              '🔔 音量要開，靜音只有震動',
              '🛏️ 不要設在睡覺時間，設了也是白搭',
              '📍 手機放在自己身邊，放別的房間聽不到',
              '👥 公共場合注意音量，被別人關掉你還是不知道',
            ].map((tip, i) => (
              <p key={i} style={{ color: '#fecaca', fontSize: '0.85rem', margin: i === 0 ? 0 : '0.25rem 0 0' }}>{tip}</p>
            ))}
          </div>

          {/* Add reminder form */}
          <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1.2rem' }}>➕ 新增提醒</h2>

            <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>提醒內容</label>
            <textarea
              value={formContent}
              onChange={e => setFormContent(e.target.value)}
              placeholder="例：喝水、吃藥、開會..."
              rows={3}
              style={{ ...inputStyle, marginTop: '0.4rem', marginBottom: '1rem', resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '140px' }}>
                <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>日期</label>
                <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)}
                  style={{ ...inputStyle, marginTop: '0.4rem', colorScheme: 'dark' }} />
              </div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>時間</label>
                <input type="time" value={formTime} onChange={e => setFormTime(e.target.value)}
                  style={{ ...inputStyle, marginTop: '0.4rem', colorScheme: 'dark' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>警報聲音（選填）</label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', ...btnStyle(), padding: '0.5rem 1.2rem', cursor: 'pointer' }}>
                🎵 選擇手機音樂
                <input type="file" accept="audio/*" onChange={handleAudioSelect} style={{ display: 'none' }} />
              </label>
              <span style={{ color: audioFileName ? '#a78bfa' : '#6b7280', fontSize: '0.8rem', marginLeft: '0.8rem' }}>
                {audioFileName ? `✓ ${audioFileName}` : '未選擇，將用嗶嗶聲'}
              </span>
            </div>

            <button
              onClick={addReminder}
              disabled={!formContent.trim() || !formDate || !formTime}
              style={{ ...btnStyle(true), width: '100%', padding: '0.8rem', fontSize: '1rem', opacity: (!formContent.trim() || !formDate || !formTime) ? 0.45 : 1 }}
            >
              ＋ 新增提醒
            </button>
          </div>

          {/* Reminder list */}
          <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1rem' }}>📋 已設定的提醒（{reminders.length} 筆）</h2>
            {sortedReminders.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '1rem 0' }}>還沒有提醒，新增一個吧！</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {sortedReminders.map(r => (
                  <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.8rem 1rem' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#f3f4f6', margin: '0 0 0.2rem', fontSize: '0.95rem' }}>{r.content}</p>
                      <p style={{ color: '#a78bfa', margin: 0, fontSize: '0.8rem' }}>⏰ {fmtDT(r.datetime)}</p>
                    </div>
                    <button
                      onClick={() => setReminders(prev => prev.filter(x => x.id !== r.id))}
                      style={{ background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '20px', color: '#f87171', cursor: 'pointer', padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      刪除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback section */}
          <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#e9d5ff', margin: '0 0 1.2rem' }}>💬 用過之後覺得怎麼樣？</h2>
            <input
              value={fbNickname}
              onChange={e => setFbNickname(e.target.value)}
              placeholder="你的暱稱"
              maxLength={20}
              style={{ ...inputStyle, marginBottom: '0.6rem' }}
            />
            <textarea
              value={fbContent}
              onChange={e => setFbContent(e.target.value)}
              placeholder="說說你的使用心得..."
              rows={3}
              maxLength={300}
              style={{ ...inputStyle, marginBottom: '0.8rem', resize: 'vertical' }}
            />
            <button onClick={submitFeedback} style={btnStyle(true)}>📤 送出留言</button>
            {fbMsg && (
              <p style={{ color: fbMsg.startsWith('✅') ? '#6ee7b7' : '#fca5a5', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>{fbMsg}</p>
            )}
            {feedbacks.length > 0 && (
              <div style={{ marginTop: '1.2rem', borderTop: '1px solid rgba(167,139,250,0.2)', paddingTop: '1rem' }}>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: '0 0 0.7rem' }}>最新留言：</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {feedbacks.map((fb, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '0.7rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ color: '#c4b5fd', fontSize: '0.82rem', fontWeight: 700 }}>{fb.nickname}</span>
                        <span style={{ color: '#4b5563', fontSize: '0.75rem' }}>{new Date(fb.createdAt).toLocaleDateString('zh-TW')}</span>
                      </div>
                      <p style={{ color: '#e5e7eb', fontSize: '0.88rem', margin: 0 }}>{fb.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Back link */}
          <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
            <a href="/tools" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '0.9rem' }}>← 返回工具箱</a>
          </div>
        </div>
      </div>

      {/* Fullscreen alarm overlay */}
      {alarmActive && (
        <div style={{ position: 'fixed', inset: 0, background: '#1a0a2e', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>

          <p style={{ color: '#9ca3af', fontSize: '0.85rem', letterSpacing: '0.1em', margin: '0 0 1.2rem' }}>提醒事項</p>

          {/* Sound wave */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1.5rem', height: '32px' }}>
            {(['waveA','waveB','waveC','waveB','waveA'] as const).map((anim, i) => (
              <div key={i} style={{
                width: '5px',
                background: 'linear-gradient(to top, #7c3aed, #ec4899)',
                borderRadius: '3px',
                animation: `${anim} ${0.7 + i * 0.12}s ease-in-out infinite`,
                animationDelay: `${i * 0.08}s`,
              }} />
            ))}
          </div>

          {/* Bell */}
          <div style={{ fontSize: '5rem', animation: 'reminderPulse 1s ease-in-out infinite', marginBottom: '1.5rem', lineHeight: 1 }}>🔔</div>

          {/* Content */}
          <div style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '20px', padding: '1.5rem 2rem', maxWidth: '500px', width: '100%', marginBottom: '0.8rem' }}>
            <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: 0, lineHeight: 1.5 }}>
              {alarmItem?.content}
            </p>
          </div>

          <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 2rem' }}>
            設定時間：{alarmItem ? fmtDT(alarmItem.datetime) : ''}
          </p>

          {/* Close */}
          <button
            onClick={stopAlarm}
            style={{ ...btnStyle(true), padding: '0.9rem 2rem', fontSize: '1rem', width: '100%', maxWidth: '380px', marginBottom: '1rem' }}
          >
            ✓ 我已看到，關閉提醒
          </button>

          {/* Snooze */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ label: '5分鐘後再提醒', min: 5 }, { label: '10分鐘後', min: 10 }, { label: '30分鐘後', min: 30 }].map(s => (
              <button key={s.min} onClick={() => snooze(s.min)} style={{ ...btnStyle(), fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                ⏱ {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
