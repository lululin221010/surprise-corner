'use client';
// 📄 路徑：src/app/classroom/stock/Academy.tsx
// 股市書院主介面 — 課程列表 + 課程進入點

import { useState } from 'react';
import Link from 'next/link';
import courses from './courses';
import type { Course, Lesson } from './courses';
import AcademyLesson from './AcademyLesson';
import '../classroom.css';

// 試讀本：入門前3堂 + 進階前2堂 + 高階前1堂，動態組合，不複製內容
function buildTrialCourse(allCourses: Course[]): Course {
  const [basic, advanced, master] = allCourses;
  return {
    id: 'stock-trial',
    title: '股市書院試讀本',
    description: '入門 3 堂 × 進階 2 堂 × 高階 1 堂，免費體驗完整學習路徑。',
    emoji: '🎁',
    lessons: [
      ...basic.lessons.slice(0, 3).map(l => ({ ...l, id: `trial-b-${l.id}` })),
      ...advanced.lessons.slice(0, 2).map(l => ({ ...l, id: `trial-a-${l.id}` })),
      ...master.lessons.slice(0, 1).map(l => ({ ...l, id: `trial-m-${l.id}` })),
    ],
  };
}

export default function Academy() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const keys = ['ss-stock-intro', 'ss-stock-advanced', 'ss-stock-master'];
    return new Set(keys.filter(k => localStorage.getItem(`sc_stock_unlock_${k}`) === 'true'));
  });

  async function handleVerifyCode() {
    const code = unlockCode.trim().toUpperCase();
    if (!code) return;
    setUnlockStatus('loading');
    try {
      const res = await fetch(`https://still-time-corner.vercel.app/api/verify-unlock?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem(`sc_stock_unlock_${data.target}`, 'true');
        setUnlockedCourses(prev => new Set(prev).add(data.target));
        setUnlockStatus('success');
        // 成功後 1.5 秒自動消除提示（inline 模式不需關閉 modal）
      } else {
        setUnlockStatus('error');
      }
    } catch {
      setUnlockStatus('error');
    }
  }

  function handleLessonComplete() {
    if (!activeLesson) return;
    setCompletedLessons(prev => new Set(prev).add(activeLesson.id));
    setActiveLesson(null);
  }

  // 上課中 — 交給 AcademyLesson 自己管背景
  if (activeLesson && activeCourse) {
    return (
      <AcademyLesson
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  // 課程列表（選了某個課程）
  if (activeCourse) {
    return (
      <div className="classroom-content">
        {/* 返回 + 麵包屑 */}
        <button onClick={() => setActiveCourse(null)} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.5rem', padding: 0 }}>
          ← 返回股市書院
        </button>
        <div className="classroom-breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <button onClick={() => setActiveCourse(null)} className="classroom-back" style={{ fontSize: '12px' }}>股市書院</button>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>{activeCourse.title}</span>
        </div>

        <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          {activeCourse.emoji} {activeCourse.title}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{activeCourse.description}</p>

        {/* 未解鎖時的 inline 解鎖區塊 */}
        {activeCourse.id !== 'stock-trial' && !unlockedCourses.has(
          activeCourse.id === 'stock-advanced' ? 'ss-stock-advanced'
          : activeCourse.id === 'stock-master' ? 'ss-stock-master' : 'ss-stock-intro'
        ) && (
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ color: '#b45309', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              🔑 輸入解鎖碼，或購買電子書解鎖本課程
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input
                type="text"
                value={unlockCode}
                onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
                placeholder="SS-XXXX-XXXX"
                onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.4)', background: 'rgba(255,255,255,0.7)', color: '#1e1b4b', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
              />
              <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
                style={{ padding: '8px 14px', background: '#f59e0b', color: '#1c1917', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {unlockStatus === 'loading' ? '…' : '解鎖'}
              </button>
            </div>
            {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>解鎖碼無效，請確認後再試</p>}
            {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>✅ 解鎖成功！</p>}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a
                href={activeCourse.id === 'stock-master'
                  ? 'https://still-time-corner.vercel.app/digital/6a2ff36082d80248e37382fa'
                  : activeCourse.id === 'stock-advanced'
                  ? 'https://still-time-corner.vercel.app/digital/6a2ff35f82d80248e37382f9'
                  : 'https://still-time-corner.vercel.app/digital/6a2965ef6a2fdbc340cab167'}
                target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', borderRadius: '20px', padding: '0.5rem', textDecoration: 'none', textAlign: 'center' }}>
                轉帳購買{activeCourse.id === 'stock-master' ? '（NT$449）' : activeCourse.id === 'stock-advanced' ? '（NT$349）' : '（NT$249）'} →
              </a>
            </div>
          </div>
        )}

        {/* 已解鎖提示 */}
        {activeCourse.id !== 'stock-trial' && unlockedCourses.has(
          activeCourse.id === 'stock-advanced' ? 'ss-stock-advanced'
          : activeCourse.id === 'stock-master' ? 'ss-stock-master' : 'ss-stock-intro'
        ) && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '0.5rem 0.8rem', marginBottom: '1.2rem', color: '#16a34a', fontSize: '0.8rem' }}>
            ✅ 已解鎖，全部課程開放閱讀
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeCourse.lessons.map((lesson, i) => {
            const done = completedLessons.has(lesson.id);
            const isFree = activeCourse.id === 'stock-trial';
            const courseUnlockKey = activeCourse.id === 'stock-advanced' ? 'ss-stock-advanced'
              : activeCourse.id === 'stock-master' ? 'ss-stock-master' : 'ss-stock-intro';
            const locked = !isFree && !unlockedCourses.has(courseUnlockKey);
            return (
              <button
                key={lesson.id}
                onClick={() => !locked && setActiveLesson(lesson)}
                className={`course-list-item${done ? ' done' : ''}`}
                style={locked ? { opacity: 0.5, cursor: 'pointer' } : {}}
              >
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                  background: done ? '#dcfce7' : locked ? '#f3f4f6' : '#ede9fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: done ? '#15803d' : locked ? '#9ca3af' : '#7c3aed', fontSize: '0.78rem', fontWeight: 700,
                }}>
                  {done ? '✓' : locked ? '🔒' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: locked ? '#9ca3af' : '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                    {lesson.emoji} {lesson.title}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {locked ? '🔒 付費解鎖' : `⏱ ${lesson.duration}`}
                  </div>
                </div>
                <div style={{ color: locked ? '#d1d5db' : '#a78bfa', fontSize: '0.8rem' }}>→</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 主頁：所有課程總覽
  return (
    <div className="classroom-content">
      {/* 學院 Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="classroom-breadcrumb" style={{ marginBottom: '0.6rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline', fontSize: '12px' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>股市書院</span>
        </div>
        <h1 style={{ color: '#1e1b4b', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.3rem' }}>
          📈 股市書院
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
          每篇5分鐘，看懂一個股市概念。K線、法人籌碼、均線……說人話，不廢話。
        </p>
      </div>

      {/* 課程卡片 */}
      <p style={{ color: '#a78bfa', fontSize: '0.72rem', letterSpacing: '0.1em', margin: '0 0 0.8rem 0.2rem', fontWeight: 600 }}>
        選擇課程
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {courses.map(course => {
          const isFree = false;
          const unlockKey = course.id === 'stock-advanced' ? 'ss-stock-advanced'
            : course.id === 'stock-master' ? 'ss-stock-master' : 'ss-stock-intro';
          const isUnlocked = isFree || unlockedCourses.has(unlockKey);
          return (
            <button
              key={course.id}
              onClick={() => setActiveCourse(course)}
              className="course-list-item"
              style={{ padding: '1.2rem 1.4rem', borderRadius: '14px', border: `1px solid ${isUnlocked && !isFree ? 'rgba(34,197,94,0.3)' : 'rgba(196,181,253,0.4)'}` }}
            >
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{course.emoji}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {course.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  {course.description}
                </div>
                <div style={{ color: '#a78bfa', fontSize: '0.72rem', marginTop: '0.4rem' }}>
                  {course.lessons.length} 堂課
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                {isFree ? (
                  <span style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', color: '#7c3aed', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>全部免費</span>
                ) : isUnlocked ? (
                  <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>✅ 已解鎖</span>
                ) : (
                  <span style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#b45309', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>🔒 需解鎖</span>
                )}
                <span style={{ color: '#7c3aed', fontSize: '0.8rem' }}>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
