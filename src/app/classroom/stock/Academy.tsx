'use client';
// 📄 路徑：src/app/classroom/stock/Academy.tsx
// 股市學院主介面 — 課程列表 + 課程進入點

import { useState } from 'react';
import Link from 'next/link';
import courses from './courses';
import type { Course, Lesson } from './courses';
import AcademyLesson from './AcademyLesson';

export default function Academy() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  function handleLessonComplete() {
    if (!activeLesson) return;
    setCompletedLessons(prev => new Set(prev).add(activeLesson.id));
    setActiveLesson(null);
  }

  // 上課中
  if (activeLesson && activeCourse) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a1628 0%, #0f1e0f 50%, #0a1628 100%)',
        padding: '2rem 1rem 6rem',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <AcademyLesson
            lesson={activeLesson}
            onComplete={handleLessonComplete}
            onBack={() => setActiveLesson(null)}
          />
        </div>
      </div>
    );
  }

  // 課程列表（選了某個課程）
  if (activeCourse) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a1628 0%, #0f1e0f 50%, #0a1628 100%)',
        padding: '2rem 1rem 6rem',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <button
            onClick={() => setActiveCourse(null)}
            style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1.5rem' }}
          >
            ← 所有課程
          </button>
          <h2 style={{ color: '#e9d5ff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            {activeCourse.emoji} {activeCourse.title}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>{activeCourse.desc}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {activeCourse.lessons.map((lesson, i) => {
              const done = completedLessons.has(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  style={{
                    background: done ? 'rgba(52,211,153,0.07)' : 'rgba(255,255,255,0.04)',
                    border: done ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(167,139,250,0.2)',
                    borderRadius: '14px', padding: '1.2rem 1.4rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                    background: done ? 'rgba(52,211,153,0.2)' : 'rgba(124,58,237,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: done ? '#34d399' : '#a78bfa', fontSize: '0.8rem', fontWeight: 700,
                  }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#e9d5ff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {lesson.emoji} {lesson.title}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.78rem' }}>⏱ {lesson.duration}</div>
                  </div>
                  <div style={{ color: '#4b5563', fontSize: '0.8rem' }}>→</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 主頁：所有課程總覽
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #0f1e0f 50%, #0a1628 100%)',
      padding: '2rem 1rem 6rem',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 返回 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/classroom" style={{ color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← 所有學院
          </Link>
        </div>

        {/* 標題 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>📈</div>
          <h1 style={{
            color: '#fff', fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem',
            background: 'linear-gradient(135deg, #fff 0%, #6ee7b7 60%, #34d399 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            股市學院
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            每篇5分鐘，看懂一個股市概念。<br />
            K線、法人籌碼、均線……說人話，不廢話。
          </p>
        </div>

        {/* 課程卡片 */}
        <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', margin: '0 0 1rem 0.2rem' }}>
          選擇課程
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => setActiveCourse(course)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: '16px', padding: '1.5rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{course.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>
                  {course.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {course.desc}
                </div>
                <div style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  {course.lessons.length} 堂課
                </div>
              </div>
              <div style={{ color: '#34d399', fontSize: '0.8rem', flexShrink: 0, alignSelf: 'center' }}>→</div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
