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

export default function StockTrial() {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  function handleComplete() {
    if (!activeLesson) return;
    setCompletedLessons(prev => new Set(prev).add(activeLesson.id));
    setActiveLesson(null);
  }

  if (activeLesson) {
    return (
      <AcademyLesson
        lesson={activeLesson}
        onComplete={handleComplete}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

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
                <div style={{ color: '#a78bfa', fontSize: '0.8rem' }}>→</div>
              </button>
            );
          })}
        </div>

        {/* 底部 CTA */}
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
            style={{
              display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
              padding: '0.6rem 1.8rem', borderRadius: '30px', textDecoration: 'none',
            }}
          >
            前往小舖購買 →
          </a>
        </div>
      </div>
    </div>
  );
}
