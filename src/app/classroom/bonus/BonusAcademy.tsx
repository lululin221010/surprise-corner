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

// 書院分區定義（未來加股市/AI直接往這裡加）
const ACADEMY_SECTIONS = [
  {
    id: 'stock',
    label: '股市書院好康',
    emoji: '📈',
    comingSoon: true,    // 尚未建置
    items: [] as { lesson: PsychLesson; bookTitle: string; subtitle: string }[],
  },
  {
    id: 'psychology',
    label: '心理學書院好康',
    emoji: '🧠',
    comingSoon: false,
    items: FREE_LESSONS.map(f => ({
      lesson: f.lesson,
      bookTitle: f.bookTitle,
      subtitle: `${f.series} · ${f.lesson.slides.length} 頁`,
    })),
  },
  // 未來：AI書院、理財書院...
];

export default function BonusAcademy() {
  const [active, setActive] = useState<ActiveItem | null>(null);
  const [psychFilter, setPsychFilter] = useState<string>('all');

  if (active) {
    return (
      <BonusLesson
        lesson={active.lesson}
        bookTitle={active.bookTitle}
        onBack={() => setActive(null)}
      />
    );
  }

  const psychSeries = PSYCH_SERIES.map(s => ({ id: s.id, label: s.label.replace('心理學系',''), emoji: s.emoji }));

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 標題 */}
        <div style={{ marginBottom: '1.8rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🎁</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>好康書院</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.5rem' }}>
            各書院精選第一組，完全免費。喜歡就去小舖買完整版。
          </p>
        </div>

        {ACADEMY_SECTIONS.map(section => (
          <div key={section.id} style={{ marginBottom: '2rem' }}>

            {/* 書院區塊標題 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{section.emoji}</span>
              <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1rem' }}>{section.label}</span>
              {section.comingSoon && (
                <span style={{ background: 'rgba(100,116,139,0.2)', color: '#64748b', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px', border: '1px solid rgba(100,116,139,0.3)' }}>
                  即將開放
                </span>
              )}
            </div>

            {section.comingSoon ? (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem', color: '#475569', fontSize: '0.85rem', textAlign: 'center' }}>
                股市書院入門・進階・高階第1組即將免費開放
              </div>
            ) : (
              <>
                {/* 心理學學系篩選 */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                  <button onClick={() => setPsychFilter('all')}
                    style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', background: psychFilter === 'all' ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)', border: psychFilter === 'all' ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.08)', color: psychFilter === 'all' ? '#a78bfa' : '#64748b' }}>
                    全部 {FREE_LESSONS.length}
                  </button>
                  {psychSeries.map(s => {
                    const count = FREE_LESSONS.filter(f => f.seriesId === s.id).length;
                    return (
                      <button key={s.id} onClick={() => setPsychFilter(s.id)}
                        style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', background: psychFilter === s.id ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)', border: psychFilter === s.id ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.08)', color: psychFilter === s.id ? '#a78bfa' : '#64748b' }}>
                        {s.emoji} {s.label} {count}
                      </button>
                    );
                  })}
                </div>

                {/* 課程列表 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {FREE_LESSONS
                    .filter(f => psychFilter === 'all' || f.seriesId === psychFilter)
                    .map(item => (
                      <div key={item.bookId}
                        onClick={() => setActive({ lesson: item.lesson, bookTitle: item.bookTitle })}
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                        <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.seriesEmoji}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.bookTitle}
                          </div>
                          <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.1rem' }}>
                            {item.series} · {item.lesson.slides.length} 頁 · 免費
                          </div>
                        </div>
                        <div style={{ color: '#7c3aed', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>開始 →</div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}

        {/* 底部說明 */}
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>💡 想看完整版？</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>前往小舖購買電子書，解鎖全書所有組別＋榮譽證書</div>
        </div>
      </div>
    </div>
  );
}
