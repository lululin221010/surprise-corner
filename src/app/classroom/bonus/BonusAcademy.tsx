'use client';
// 📄 路徑：src/app/classroom/bonus/BonusAcademy.tsx

import { useState } from 'react';
import Link from 'next/link';
import { PSYCH_SERIES, FREE_LESSONS } from '../psychology/courses-data';
import type { PsychLesson } from '../psychology/courses-data';
import BonusLesson from './BonusLesson';
import '../classroom.css';

interface ActiveItem {
  lesson: PsychLesson;
  bookTitle: string;
  allGroupTitles: string[];   // 完整書的所有組別標題，用於顯示目錄
}

// 書院分區定義（未來加股市/AI直接往這裡加）
const ACADEMY_SECTIONS = [
  {
    id: 'stock',
    label: '股市書院好康',
    emoji: '📈',
    comingSoon: false,
    items: [] as { lesson: PsychLesson; bookTitle: string; subtitle: string }[],
  },
  {
    id: 'ai',
    label: 'AI書院好康',
    emoji: '🤖',
    comingSoon: false,
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
        allGroupTitles={active.allGroupTitles}
        onBack={() => setActive(null)}
      />
    );
  }

  const psychSeries = PSYCH_SERIES.map(s => ({ id: s.id, label: s.label.replace('心理學系',''), emoji: s.emoji }));

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* 麵包屑 */}
        <div style={{ marginBottom: '0.8rem' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.8rem', textDecoration: 'none' }}>← 驚喜學院</Link>
        </div>

        {/* 標題 */}
        <div style={{ marginBottom: '1.8rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🎁</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>好康書院</h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            各書院精選第一組，完全免費。喜歡就去小舖買完整版。
          </p>
        </div>

        {ACADEMY_SECTIONS.map(section => (
          <div key={section.id} style={{ marginBottom: '2rem' }}>

            {/* 書院區塊標題 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{section.emoji}</span>
              <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.05rem' }}>{section.label}</span>
              {section.comingSoon && (
                <span style={{ background: 'rgba(100,116,139,0.3)', color: '#94a3b8', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '10px', border: '1px solid rgba(100,116,139,0.4)' }}>
                  即將開放
                </span>
              )}
            </div>

            {section.id === 'stock' ? (
              <Link href="/classroom/stock/trial" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '12px', padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer' }}>
                  <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>🎁</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem' }}>股市書院試讀本</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>入門 3 堂 × 進階 2 堂 × 高階 1 堂 · 免費</div>
                  </div>
                  <div style={{ color: '#a78bfa', fontSize: '0.88rem', fontWeight: 700, flexShrink: 0 }}>開始 →</div>
                </div>
              </Link>
            ) : section.id === 'ai' ? (
              <Link href="/classroom/bonus/ai-intro-1" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '12px', padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer' }}>
                  <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>🎁</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem' }}>AI書院・系列1試讀本</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>入門 3 堂 × 進階 2 堂 × 高階 1 堂 · 免費</div>
                  </div>
                  <div style={{ color: '#a78bfa', fontSize: '0.88rem', fontWeight: 700, flexShrink: 0 }}>開始 →</div>
                </div>
              </Link>
            ) : (
              <>
                {/* 心理學學系篩選 */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                  <button onClick={() => setPsychFilter('all')}
                    style={{ padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', cursor: 'pointer', background: psychFilter === 'all' ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.08)', border: psychFilter === 'all' ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.15)', color: psychFilter === 'all' ? '#c4b5fd' : '#cbd5e1' }}>
                    全部 {FREE_LESSONS.length}
                  </button>
                  {psychSeries.map(s => {
                    const count = FREE_LESSONS.filter(f => f.seriesId === s.id).length;
                    return (
                      <button key={s.id} onClick={() => setPsychFilter(s.id)}
                        style={{ padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', cursor: 'pointer', background: psychFilter === s.id ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.08)', border: psychFilter === s.id ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.15)', color: psychFilter === s.id ? '#c4b5fd' : '#cbd5e1' }}>
                        {s.emoji} {s.label} {count}
                      </button>
                    );
                  })}
                </div>

                {/* 課程列表 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {FREE_LESSONS
                    .filter(f => psychFilter === 'all' || f.seriesId === psychFilter)
                    .map(item => (
                      <div key={item.bookId}
                        onClick={() => {
                          const fullBook = PSYCH_SERIES.flatMap(s => s.books).find(b => b.id === item.bookId);
                          const allGroupTitles = fullBook ? fullBook.lessons.map(l => l.title) : [];
                          setActive({ lesson: item.lesson, bookTitle: item.bookTitle, allGroupTitles });
                        }}
                        style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                        <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.seriesEmoji}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.bookTitle}
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                            {item.series} · {item.lesson.slides.length} 頁 · 免費
                          </div>
                        </div>
                        <div style={{ color: '#a78bfa', fontSize: '0.88rem', fontWeight: 700, flexShrink: 0 }}>開始 →</div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}

        {/* 底部 CTA */}
        <div style={{ marginTop: '1rem', padding: '1.2rem', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '14px' }}>
          <div style={{ color: '#c4b5fd', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem', textAlign: 'center' }}>💡 想看完整版？</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.9rem', textAlign: 'center' }}>購買電子書取得解鎖碼，解鎖全書所有組別＋榮譽證書</div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.88rem', borderRadius: '30px', padding: '0.6rem', textDecoration: 'none', textAlign: 'center' }}>
              轉帳購買 →
            </a>
            <button
              onClick={() => alert('積分兌換即將整合，敬請期待～目前可至小舖查看積分餘額')}
              style={{ flex: 1, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', fontWeight: 700, fontSize: '0.88rem', borderRadius: '30px', padding: '0.6rem', cursor: 'pointer' }}>
              🪙 魯魯積分兌換
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
