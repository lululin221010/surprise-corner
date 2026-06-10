'use client';
// 📄 路徑：src/app/classroom/stock/Academy.tsx
// 股市書院主介面 — 課程列表 + 課程進入點

import { useState } from 'react';
import Link from 'next/link';
import courses from './courses';
import type { Course, Lesson } from './courses';
import AcademyLesson from './AcademyLesson';
import '../classroom.css';

export default function Academy() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

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
        {/* 麵包屑 */}
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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeCourse.lessons.map((lesson, i) => {
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
        {courses.map(course => (
          <button
            key={course.id}
            onClick={() => setActiveCourse(course)}
            className="course-list-item"
            style={{ padding: '1.2rem 1.4rem', borderRadius: '14px' }}
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
            <div style={{ color: '#7c3aed', fontSize: '0.8rem', flexShrink: 0 }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}
