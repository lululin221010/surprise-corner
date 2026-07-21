'use client';
// 📄 路徑：src/app/classroom/brain-universe/autonomic/Academy.tsx

import { useState } from 'react';
import Link from 'next/link';
import { usePreview } from '../../PreviewContext';
import autonomicVolumes from './courses';
import type { AutonomicVolume, AutonomicLesson } from './courses';
import AutonomicLessonViewer from './AutonomicLesson';
import '../../classroom.css';

const UNLOCK_KEYS: Record<string, string> = {
  '01': 'ss-autonomic-new01',
  '02': 'ss-autonomic-new02',
  '03': 'ss-autonomic-new03',
};

export default function AutonomicAcademy() {
  const isPreview = usePreview();

  const [activeVolume, setActiveVolume] = useState<AutonomicVolume | null>(null);
  const [activeLesson, setActiveLesson] = useState<AutonomicLesson | null>(null);
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlockedCodes, setUnlockedCodes] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const keys = Object.values(UNLOCK_KEYS);
    return new Set(keys.filter(k => localStorage.getItem(`sc_autonomic_unlock_${k}`) === 'true'));
  });

  const unlockedVols = isPreview ? new Set(Object.values(UNLOCK_KEYS)) : unlockedCodes;

  async function handleVerifyCode() {
    const code = unlockCode.trim().toUpperCase();
    if (!code) return;
    setUnlockStatus('loading');
    try {
      const res = await fetch(`https://still-time-corner.vercel.app/api/verify-unlock?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem(`sc_autonomic_unlock_${data.target}`, 'true');
        setUnlockedCodes(prev => new Set(prev).add(data.target));
        setUnlockStatus('success');
      } else {
        setUnlockStatus('error');
      }
    } catch {
      setUnlockStatus('error');
    }
  }

  if (activeLesson && activeVolume) {
    return (
      <AutonomicLessonViewer
        lesson={activeLesson}
        onBack={() => setActiveLesson(null)}
        cta={activeLesson.isFree ? activeVolume.cta : undefined}
      />
    );
  }

  if (activeVolume) {
    const unlockKey = UNLOCK_KEYS[activeVolume.vol];
    const isUnlocked = unlockedVols.has(unlockKey);

    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <button onClick={() => setActiveVolume(null)} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.5rem', padding: 0 }}>
            ← 返回自律神經學系
          </button>
          <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: '#7c3aed' }}>
            <Link href="/classroom" style={{ color: '#7c3aed', textDecoration: 'none' }}>驚喜學院</Link>
            <span style={{ color: '#c4b5fd' }}>›</span>
            <button onClick={() => setActiveVolume(null)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}>自律神經學系</button>
            <span style={{ color: '#c4b5fd' }}>›</span>
            <span style={{ color: '#1e1b4b', fontWeight: 600 }}>{activeVolume.title}</span>
          </div>

          <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.3rem' }}>
            {activeVolume.emoji} {activeVolume.title}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.2rem' }}>{activeVolume.subtitle}</p>

          {!isUnlocked && (
            <div style={{ background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ color: '#5b21b6', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                🔑 輸入解鎖碼，或購買本書解鎖本課程
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <input
                  type="text"
                  value={unlockCode}
                  onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
                  placeholder="SS-XXXX-XXXX"
                  onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                  style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(124,58,237,0.35)', background: 'rgba(255,255,255,0.8)', color: '#1e1b4b', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
                />
                <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
                  style={{ padding: '8px 14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {unlockStatus === 'loading' ? '…' : '解鎖'}
                </button>
              </div>
              {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>解鎖碼無效，請確認後再試</p>}
              {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>✅ 解鎖成功！</p>}
              <a href={activeVolume.cta.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', borderRadius: '20px', padding: '0.5rem', textDecoration: 'none', textAlign: 'center' }}>
                購買本書解鎖課程 →
              </a>
            </div>
          )}

          {isUnlocked && (
            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '0.5rem 0.8rem', marginBottom: '1.2rem', color: '#16a34a', fontSize: '0.8rem' }}>
              ✅ 已解鎖，全部{activeVolume.lessons.length}堂開放閱讀
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeVolume.lessons.map((lesson, i) => {
              const locked = !lesson.isFree && !isUnlocked;
              return (
                <button
                  key={lesson.id}
                  onClick={() => !locked && setActiveLesson(lesson)}
                  className="course-list-item"
                  style={{ padding: '0.9rem 1.1rem', borderRadius: '12px', border: '1px solid #e5e7eb', opacity: locked ? 0.6 : 1, cursor: locked ? 'pointer' : 'pointer' }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: locked ? '#f3f4f6' : '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: locked ? '#9ca3af' : '#7c3aed', fontSize: '0.75rem', fontWeight: 700 }}>
                    {locked ? '🔒' : i + 1}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ color: locked ? '#9ca3af' : '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.1rem' }}>
                      {lesson.title}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                      {locked ? '🔒 付費解鎖' : `${lesson.slides.length} 頁 · ${lesson.quizzes.length} 題${lesson.isFree ? ' · 免費試讀' : ''}`}
                    </div>
                  </div>
                  <div style={{ color: locked ? '#d1d5db' : '#7c3aed', fontSize: '0.8rem' }}>→</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const unlockedVolumes = autonomicVolumes.filter(v => unlockedVols.has(UNLOCK_KEYS[v.vol]));
  const hasAnyUnlock = unlockedVolumes.length > 0;

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 麵包屑 */}
        <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: '#7c3aed' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', textDecoration: 'none' }}>驚喜學院</Link>
          <span style={{ color: '#c4b5fd' }}>›</span>
          <span style={{ color: '#6b7280' }}>腦中宇宙書院</span>
          <span style={{ color: '#c4b5fd' }}>›</span>
          <span style={{ color: '#1e1b4b', fontWeight: 600 }}>自律神經學系</span>
        </div>

        {/* 標題 */}
        <div style={{ marginBottom: '1.8rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🧬</div>
          <h1 style={{ color: '#1e1b4b', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>自律神經學系</h1>
          <p style={{ color: '#4b5563', fontSize: '0.92rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            這裡收錄已購買讀者的完整課程內容
          </p>
        </div>

        {/* 解鎖碼輸入 */}
        <div style={{ background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#5b21b6', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            🔑 輸入解鎖碼開通已購買的冊
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <input
              type="text"
              value={unlockCode}
              onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
              placeholder="SS-XXXX-XXXX"
              onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
              style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(124,58,237,0.35)', background: 'rgba(255,255,255,0.8)', color: '#1e1b4b', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
            />
            <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
              style={{ padding: '8px 14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {unlockStatus === 'loading' ? '…' : '解鎖'}
            </button>
          </div>
          {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: 0 }}>解鎖碼無效，請確認後再試</p>}
          {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: 0 }}>✅ 解鎖成功！</p>}
          {!hasAnyUnlock && (
            <p style={{ color: '#6b7280', fontSize: '0.78rem', margin: '0.6rem 0 0' }}>
              還沒讀過試讀？<Link href="/classroom/bonus" style={{ color: '#7c3aed' }}>前往好康書院 →</Link>
            </p>
          )}
        </div>

        {/* 已解鎖的冊列表（未解鎖的完全不顯示） */}
        {hasAnyUnlock && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
            {unlockedVolumes.map(volume => (
              <button
                key={volume.vol}
                onClick={() => setActiveVolume(volume)}
                style={{
                  background: '#faf5ff', border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '12px', padding: '1rem 1.2rem',
                  display: 'flex', alignItems: 'center', gap: '0.9rem',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{volume.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#4c1d95', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                    Vol.{volume.vol}
                  </div>
                  <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.92rem' }}>{volume.title}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.1rem' }}>
                    {volume.lessons.length} 堂課
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                  <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>✅ 已解鎖</span>
                  <span style={{ color: '#7c3aed', fontSize: '0.85rem', fontWeight: 700 }}>開始 →</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 返回 */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
        </div>

      </div>
    </div>
  );
}
