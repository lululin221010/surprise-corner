'use client';
// 📄 路徑：src/app/classroom/stock/trial/StockTrial.tsx
// 股市書院試讀本（放在好康書院）：入門3堂 + 進階2堂 + 高階1堂

import { useState } from 'react';
import Link from 'next/link';
import courses from '../courses';
import type { Lesson } from '../courses';
import AcademyLesson from '../AcademyLesson';
import '../../../classroom/classroom.css';

function buildTrialLessons() {
  const [basic, advanced, master] = courses;
  return [
    ...basic.lessons.slice(0, 3).map(l => ({ ...l, id: `trial-b-${l.id}` })),
    ...advanced.lessons.slice(0, 2).map(l => ({ ...l, id: `trial-a-${l.id}` })),
    ...master.lessons.slice(0, 1).map(l => ({ ...l, id: `trial-m-${l.id}` })),
  ];
}

const TRIAL_LESSONS = buildTrialLessons();

// ── 全部完成後的最終頁 ─────────────────────────────────────
function AllDonePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>

        {/* 好康體驗證書 */}
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.4rem', marginBottom: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.3rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.82rem', lineHeight: 1.7 }}>
            恭喜完成股市書院試讀本全 6 堂！<br />
            <span style={{ color: '#a16207', fontSize: '0.72rem' }}>可收藏紀念，無折抵功能</span>
          </div>
        </div>

        {/* 課程目錄預覽 */}
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.6rem' }}>
            📖 股市書院完整課程一覽
          </div>
          {[
            { label: '📈 股市入門', count: 15, price: 'NT$249' },
            { label: '📊 股市進階', count: 10, price: 'NT$349' },
            { label: '🏆 股市高階', count: 9,  price: 'NT$449' },
          ].map(c => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.8rem', borderRadius: '8px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.1)', marginBottom: '0.35rem' }}>
              <span style={{ color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>{c.label}</span>
              <span style={{ color: '#9ca3af', fontSize: '0.78rem' }}>{c.count} 堂 · {c.price}</span>
            </div>
          ))}
          <div style={{ marginTop: '0.7rem', padding: '0.55rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#6b7280', fontSize: '0.78rem' }}>
            ✨ 以上精彩內容，前往小舖解鎖
          </div>
        </div>

        {/* 購買按鈕 */}
        <a
          href="https://still-time-corner.vercel.app/digital"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '1rem', borderRadius: '30px', padding: '0.85rem', textDecoration: 'none', textAlign: 'center', marginBottom: '0.8rem' }}
        >
          前往小舖購買完整版 →
        </a>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer' }}>
            ← 回好康書院繼續逛
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 主元件 ────────────────────────────────────────────────
export default function StockTrial() {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showAllDone, setShowAllDone] = useState(false);

  function handleComplete() {
    if (!activeLesson) return;
    const next = new Set(completedLessons).add(activeLesson.id);
    setCompletedLessons(next);
    setActiveLesson(null);
    if (next.size >= TRIAL_LESSONS.length) setShowAllDone(true);
  }

  if (showAllDone) return <AllDonePage onBack={() => setShowAllDone(false)} />;

  if (activeLesson) {
    return (
      <AcademyLesson
        lesson={activeLesson}
        onComplete={handleComplete}
        onBack={() => setActiveLesson(null)}
        isFree={true}
      />
    );
  }

  const allDone = completedLessons.size >= TRIAL_LESSONS.length;

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* 麵包屑 */}
        <div className="classroom-breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline', fontSize: '12px' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <Link href="/classroom/bonus" className="classroom-back" style={{ fontSize: '12px' }}>好康書院</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>股市書院試讀本</span>
        </div>

        <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          🎁 股市書院試讀本
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          入門 3 堂 × 進階 2 堂 × 高階 1 堂，免費體驗完整學習路徑。
        </p>

        {/* 課堂列表 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TRIAL_LESSONS.map((lesson, i) => {
            const done = completedLessons.has(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`course-list-item${done ? ' done' : ''}`}
              >
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                  background: done ? '#dcfce7' : '#ede9fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: done ? '#15803d' : '#7c3aed', fontSize: '0.78rem', fontWeight: 700,
                }}>
                  {done ? '✓' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                    {lesson.emoji} {lesson.title}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>⏱ {lesson.duration}</div>
                </div>
                <div style={{ color: done ? '#15803d' : '#a78bfa', fontSize: '0.8rem' }}>
                  {done ? '✓' : '→'}
                </div>
              </button>
            );
          })}
        </div>

        {/* 全完成：顯示領證書按鈕；未完成：顯示一般 CTA */}
        {allDone ? (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>🎖️</div>
            <div style={{ color: '#92400e', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.8rem' }}>
              6 堂全部完成！領取好康體驗證書
            </div>
            <button
              onClick={() => setShowAllDone(true)}
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', borderRadius: '30px', padding: '0.6rem 1.8rem', cursor: 'pointer' }}
            >
              領取證書 →
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              想繼續學下去？
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1rem' }}>
              購買電子書即可解鎖全部課堂，入門 NT$249 起
            </div>
            <a
              href="https://still-time-corner.vercel.app/digital"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.6rem 1.8rem', borderRadius: '30px', textDecoration: 'none' }}
            >
              前往小舖購買 →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
