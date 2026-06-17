'use client';
// 📄 路徑：src/app/classroom/bonus/BonusAcademy.tsx

import { useState } from 'react';
import { PSYCH_SERIES, FREE_LESSONS } from '../psychology/courses-data';
import type { PsychLesson } from '../psychology/courses-data';
import BonusLesson from './BonusLesson';
import '../classroom.css';

interface ActiveItem {
  lesson: PsychLesson;
  bookTitle: string;
}

export default function BonusAcademy() {
  const [active, setActive] = useState<ActiveItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  if (active) {
    return (
      <BonusLesson
        lesson={active.lesson}
        bookTitle={active.bookTitle}
        onBack={() => setActive(null)}
      />
    );
  }

  const series = PSYCH_SERIES.map(s => ({ id: s.id, label: s.label, emoji: s.emoji }));
  const filtered = filter === 'all'
    ? FREE_LESSONS
    : FREE_LESSONS.filter(f => f.seriesId === filter);

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 標題 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🎁</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>好康書院</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.5rem' }}>
            每本書精選第一組，完全免費。喜歡就去小舖買完整版。
          </p>
        </div>

        {/* 學系篩選 */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer',
              background: filter === 'all' ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
              border: filter === 'all' ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.1)',
              color: filter === 'all' ? '#a78bfa' : '#94a3b8',
            }}
          >
            全部 {FREE_LESSONS.length}
          </button>
          {series.map(s => {
            const count = FREE_LESSONS.filter(f => f.seriesId === s.id).length;
            return (
              <button key={s.id} onClick={() => setFilter(s.id)}
                style={{
                  padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer',
                  background: filter === s.id ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
                  border: filter === s.id ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.1)',
                  color: filter === s.id ? '#a78bfa' : '#94a3b8',
                }}
              >
                {s.emoji} {s.label.replace('心理學系', '')} {count}
              </button>
            );
          })}
        </div>

        {/* 課程列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filtered.map(item => (
            <div
              key={item.bookId}
              onClick={() => setActive({ lesson: item.lesson, bookTitle: item.bookTitle })}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: '0.9rem 1.1rem',
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.seriesEmoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.bookTitle}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.15rem' }}>
                  {item.series} · {item.lesson.slides.length} 頁 · 免費
                </div>
              </div>
              <div style={{ color: '#7c3aed', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                開始 →
              </div>
            </div>
          ))}
        </div>

        {/* 底部說明 */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
            💡 想看完整版？
          </div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
            前往小舖購買電子書，解鎖全書所有組別＋榮譽證書
          </div>
        </div>

      </div>
    </div>
  );
}
