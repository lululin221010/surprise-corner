'use client';
// 📄 路徑：src/app/classroom/stock/trial/StockTrial.tsx
// 股市書院試讀本：入門3堂 + 進階2堂 + 高階1堂
// 每堂完成 → 顯示該書院目錄 + 好康體驗證書

import { useState } from 'react';
import Link from 'next/link';
import courses from '../courses';
import type { Lesson } from '../courses';
import AcademyLesson from '../AcademyLesson';
import '../../../classroom/classroom.css';

// ── 靜態資料 ─────────────────────────────────────────────

function buildTrialGroups() {
  const [basic, advanced, master] = courses;
  return [
    { key: 'basic',    label: '📈 入門', lessons: basic.lessons.slice(0, 3).map(l => ({ ...l, id: `trial-b-${l.id}` })) },
    { key: 'advanced', label: '📊 進階', lessons: advanced.lessons.slice(0, 2).map(l => ({ ...l, id: `trial-a-${l.id}` })) },
    { key: 'master',   label: '🏆 高階', lessons: master.lessons.slice(0, 1).map(l => ({ ...l, id: `trial-m-${l.id}` })) },
  ];
}

const TRIAL_GROUPS = buildTrialGroups();
const TRIAL_LESSONS = TRIAL_GROUPS.flatMap(g => g.lessons);

const CATALOG_BY_KEY = {
  basic:    { label: '📈 股市入門', price: 'NT$249', lessons: courses[0].lessons.map((l, i) => ({ title: l.title, isTrial: i < 3 })) },
  advanced: { label: '📊 股市進階', price: 'NT$349', lessons: courses[1].lessons.map((l, i) => ({ title: l.title, isTrial: i < 2 })) },
  master:   { label: '🏆 股市高階', price: 'NT$449', lessons: courses[2].lessons.map((l, i) => ({ title: l.title, isTrial: i < 1 })) },
};

type CatalogKey = keyof typeof CATALOG_BY_KEY;

function lessonToCatalogKey(lessonId: string): CatalogKey {
  if (lessonId.startsWith('trial-b-')) return 'basic';
  if (lessonId.startsWith('trial-a-')) return 'advanced';
  return 'master';
}

// ── 單堂完成頁 ────────────────────────────────────────────

function LessonDonePage({ catalogKey, onContinue }: { catalogKey: CatalogKey; onContinue: () => void }) {
  const catalog = CATALOG_BY_KEY[catalogKey];
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>

        {/* 課程目錄 */}
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            📖 {catalog.label} 完整目錄
            <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.5rem' }}>{catalog.price}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {catalog.lessons.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: l.isTrial ? 'rgba(124,58,237,0.08)' : 'transparent' }}>
                <span style={{ color: l.isTrial ? '#a78bfa' : '#d1d5db', fontSize: '0.7rem', flexShrink: 0, width: '1.4rem' }}>
                  {l.isTrial ? '✅' : `${i + 1}.`}
                </span>
                <span style={{ color: l.isTrial ? '#374151' : '#9ca3af', fontSize: '0.8rem' }}>{l.title}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#6b7280', fontSize: '0.78rem' }}>
            ✨ 以上精彩內容，前往小舖解鎖
          </div>
        </div>

        {/* 好康體驗證書 */}
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.78rem', lineHeight: 1.6 }}>
            本堂完成！可收藏紀念，無折抵功能
          </div>
        </div>

        {/* 購買按鈕 */}
        <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', borderRadius: '30px', padding: '0.75rem', textDecoration: 'none', textAlign: 'center', marginBottom: '0.8rem' }}>
          前往小舖購買完整版 →
        </a>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onContinue} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
            繼續下一堂 →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 主元件 ────────────────────────────────────────────────

const STORAGE_KEY = 'sc_stock_trial_done';

export default function StockTrial() {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [doneCatalogKey, setDoneCatalogKey] = useState<CatalogKey | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  });

  function handleComplete() {
    if (!activeLesson) return;
    const next = new Set(completedLessons).add(activeLesson.id);
    setCompletedLessons(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    setDoneCatalogKey(lessonToCatalogKey(activeLesson.id));
    setActiveLesson(null);
  }

  // 單堂完成頁
  if (doneCatalogKey) {
    return <LessonDonePage catalogKey={doneCatalogKey} onContinue={() => setDoneCatalogKey(null)} />;
  }

  // 上課中
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

        {/* 課堂列表（依書院分組） */}
        {(() => {
          let globalIdx = 0;
          return TRIAL_GROUPS.map(group => (
            <div key={group.key} style={{ marginBottom: '0.8rem' }}>
              <div style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', margin: '0 0 0.4rem 0.2rem' }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {group.lessons.map(lesson => {
                  const i = globalIdx++;
                  const done = completedLessons.has(lesson.id);
                  return (
                    <button key={lesson.id} onClick={() => setActiveLesson(lesson)}
                      className={`course-list-item${done ? ' done' : ''}`}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, background: done ? '#dcfce7' : '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#15803d' : '#7c3aed', fontSize: '0.78rem', fontWeight: 700 }}>
                        {done ? '✓' : i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{lesson.emoji} {lesson.title}</div>
                        <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>⏱ {lesson.duration}</div>
                      </div>
                      <div style={{ color: done ? '#15803d' : '#a78bfa', fontSize: '0.8rem' }}>{done ? '✓' : '→'}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ));
        })()}

        {/* 底部 CTA */}
        <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>想繼續學下去？</div>
          <div style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1rem' }}>購買電子書即可解鎖全部課堂，入門 NT$249 起</div>
          <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.6rem 1.8rem', borderRadius: '30px', textDecoration: 'none' }}>
            前往小舖購買 →
          </a>
        </div>
      </div>
    </div>
  );
}
