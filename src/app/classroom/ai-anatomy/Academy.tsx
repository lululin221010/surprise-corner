'use client';
// 📄 路徑：src/app/classroom/ai-anatomy/Academy.tsx

import { useState } from 'react';
import Link from 'next/link';
import { usePreview } from '../PreviewContext';
import courses from './courses';
import type { Course, Lesson } from './courses';
import AcademyLesson from './AcademyLesson';
import '../classroom.css';

function buildTrialCourse(allCourses: Course[]): Course {
  const [basic, advanced, master] = allCourses;
  return {
    id: 'anatomy-trial',
    title: 'AI解剖試讀本',
    description: '入門 3 堂 × 進階 2 堂 × 高階 1 堂，免費體驗完整學習路徑。',
    emoji: '🎁',
    lessons: [
      ...basic.lessons.slice(0, 3).map(l => ({ ...l, id: `trial-b-${l.id}` })),
      ...advanced.lessons.slice(0, 2).map(l => ({ ...l, id: `trial-a-${l.id}` })),
      ...master.lessons.slice(0, 1).map(l => ({ ...l, id: `trial-m-${l.id}` })),
    ],
  };
}

const UNLOCK_KEYS: Record<string, string> = {
  'anatomy-intro':    'ss-anatomy-intro',
  'anatomy-advanced': 'ss-anatomy-advanced',
  'anatomy-master':   'ss-anatomy-master',
};

const PURCHASE_URLS: Record<string, string> = {
  'anatomy-intro':    'https://still-time-corner.vercel.app/digital',
  'anatomy-advanced': 'https://still-time-corner.vercel.app/digital',
  'anatomy-master':   'https://still-time-corner.vercel.app/digital',
};

const PRICES: Record<string, string> = {
  'anatomy-intro':    'NT$249',
  'anatomy-advanced': 'NT$349',
  'anatomy-master':   'NT$449',
};

export default function Academy() {
  const isPreview = usePreview();

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const keys = ['ss-anatomy-intro', 'ss-anatomy-advanced', 'ss-anatomy-master'];
    return new Set(keys.filter(k => localStorage.getItem(`sc_ai_unlock_${k}`) === 'true'));
  });

  const effectiveUnlocked = isPreview
    ? new Set(['ss-anatomy-intro', 'ss-anatomy-advanced', 'ss-anatomy-master'])
    : unlockedCourses;

  const trialCourse = buildTrialCourse(courses);
  const allCourses = [trialCourse, ...courses];

  async function handleVerifyCode() {
    const code = unlockCode.trim().toUpperCase();
    if (!code) return;
    setUnlockStatus('loading');
    try {
      const res = await fetch(`https://still-time-corner.vercel.app/api/verify-unlock?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem(`sc_ai_unlock_${data.target}`, 'true');
        setUnlockedCourses(prev => new Set(prev).add(data.target));
        setUnlockStatus('success');
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

  if (activeLesson && activeCourse) {
    const isFree = activeCourse.id === 'anatomy-trial';
    return (
      <AcademyLesson
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onBack={() => setActiveLesson(null)}
        isFree={isFree}
      />
    );
  }

  if (activeCourse) {
    const isTrial = activeCourse.id === 'anatomy-trial';
    const unlockKey = UNLOCK_KEYS[activeCourse.id] ?? '';
    const isUnlocked = isTrial || effectiveUnlocked.has(unlockKey);

    return (
      <div className="classroom-content">
        <button onClick={() => setActiveCourse(null)} style={{ background: 'none', border: 'none', color: '#0891b2', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.5rem', padding: 0 }}>
          ← 返回AI解剖書院
        </button>
        <div className="classroom-breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <button onClick={() => setActiveCourse(null)} className="classroom-back" style={{ fontSize: '12px' }}>AI解剖書院</button>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>{activeCourse.title}</span>
        </div>

        <h2 style={{ color: '#164e63', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          {activeCourse.emoji} {activeCourse.title}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{activeCourse.description}</p>

        {!isTrial && !isUnlocked && (
          <div style={{ background: 'rgba(8,145,178,0.05)', border: '1px solid rgba(8,145,178,0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ color: '#0e7490', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              🔑 輸入解鎖碼，或購買電子書解鎖本課程
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <input
                type="text"
                value={unlockCode}
                onChange={e => { setUnlockCode(e.target.value.toUpperCase()); setUnlockStatus('idle'); }}
                placeholder="SS-XXXX-XXXX"
                onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid rgba(8,145,178,0.35)', background: 'rgba(255,255,255,0.8)', color: '#164e63', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px' }}
              />
              <button onClick={handleVerifyCode} disabled={unlockStatus === 'loading'}
                style={{ padding: '8px 14px', background: '#0891b2', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {unlockStatus === 'loading' ? '…' : '解鎖'}
              </button>
            </div>
            {unlockStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>解鎖碼無效，請確認後再試</p>}
            {unlockStatus === 'success' && <p style={{ color: '#16a34a', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>✅ 解鎖成功！</p>}
            <a href={PURCHASE_URLS[activeCourse.id] ?? 'https://still-time-corner.vercel.app/digital'}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', background: 'linear-gradient(135deg,#0891b2,#2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', borderRadius: '20px', padding: '0.5rem', textDecoration: 'none', textAlign: 'center' }}>
              購買電子書解鎖（{PRICES[activeCourse.id] ?? 'NT$249'}） →
            </a>
          </div>
        )}

        {!isTrial && isUnlocked && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '0.5rem 0.8rem', marginBottom: '1.2rem', color: '#16a34a', fontSize: '0.8rem' }}>
            ✅ 已解鎖，全部課程開放閱讀
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeCourse.lessons.map((lesson, i) => {
            const done = completedLessons.has(lesson.id);
            const locked = !isTrial && !isUnlocked;
            return (
              <button
                key={lesson.id}
                onClick={() => !locked && setActiveLesson(lesson)}
                className={`course-list-item${done ? ' done' : ''}`}
                style={locked ? { opacity: 0.5, cursor: 'pointer' } : {}}
              >
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, background: done ? '#dcfce7' : locked ? '#f3f4f6' : '#cffafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#15803d' : locked ? '#9ca3af' : '#0891b2', fontSize: '0.78rem', fontWeight: 700 }}>
                  {done ? '✓' : locked ? '🔒' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: locked ? '#9ca3af' : '#164e63', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                    {lesson.emoji} {lesson.title}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {locked ? '🔒 付費解鎖' : `⏱ ${lesson.duration}`}
                  </div>
                </div>
                <div style={{ color: locked ? '#d1d5db' : '#0891b2', fontSize: '0.8rem' }}>→</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="classroom-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="classroom-breadcrumb" style={{ marginBottom: '0.6rem' }}>
          <Link href="/classroom" className="classroom-back" style={{ display: 'inline', fontSize: '12px' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>AI解剖書院</span>
        </div>
        <h1 style={{ color: '#164e63', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.3rem' }}>
          🔬 AI解剖書院
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
          3冊・33堂，從構造、產生到操作，把AI從裡到外拆給你看。不需技術背景，每堂15-25分鐘。
        </p>
      </div>

      <p style={{ color: '#0891b2', fontSize: '0.72rem', letterSpacing: '0.1em', margin: '0 0 0.8rem 0.2rem', fontWeight: 600 }}>
        選擇課程
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {allCourses.map(course => {
          const isTrial = course.id === 'anatomy-trial';
          const unlockKey = UNLOCK_KEYS[course.id] ?? '';
          const isUnlocked = isTrial || effectiveUnlocked.has(unlockKey);
          return (
            <button
              key={course.id}
              onClick={() => setActiveCourse(course)}
              className="course-list-item"
              style={{ padding: '1.2rem 1.4rem', borderRadius: '14px', border: `1px solid ${isUnlocked && !isTrial ? 'rgba(34,197,94,0.3)' : 'rgba(8,145,178,0.3)'}` }}
            >
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{course.emoji}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ color: '#164e63', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {course.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  {course.description}
                </div>
                <div style={{ color: '#0891b2', fontSize: '0.72rem', marginTop: '0.4rem' }}>
                  {course.lessons.length} 堂課
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                {isTrial ? (
                  <span style={{ background: 'rgba(8,145,178,0.1)', border: '1px solid rgba(8,145,178,0.3)', color: '#0891b2', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>全部免費</span>
                ) : isUnlocked ? (
                  <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>✅ 已解鎖</span>
                ) : (
                  <span style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#b45309', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>🔒 需解鎖</span>
                )}
                <span style={{ color: '#0891b2', fontSize: '0.8rem' }}>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
