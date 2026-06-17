'use client';
// 📄 路徑：src/app/classroom/psychology/PsychAcademy.tsx

import { useState } from 'react';
import courses from './courses';
import type { Course, Lesson } from './courses';
import PsychLesson from './PsychLesson';
import '../classroom.css';

export default function PsychAcademy() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  function handleLessonComplete() {
    if (!activeLesson) return;
    setCompletedLessons(prev => new Set(prev).add(activeLesson.id));
    setActiveLesson(null);
  }

  if (activeLesson && activeCourse) {
    return (
      <PsychLesson
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  if (activeCourse) {
    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <button
            onClick={() => setActiveCourse(null)}
            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1.2rem' }}
          >
            ← 返回書院
          </button>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{activeCourse.emoji}</div>
            <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{activeCourse.title}</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.4rem' }}>{activeCourse.description}</p>
          </div>

          <div style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>選擇組別</div>

          {activeCourse.lessons.map((lesson, idx) => {
            const done = completedLessons.has(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                style={{
                  background: done ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${done ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '14px', padding: '1rem 1.2rem',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  cursor: 'pointer', marginBottom: '0.6rem',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{done ? '✅' : lesson.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem' }}>
                    第{idx + 1}組：{lesson.title}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>{lesson.description}</div>
                </div>
                <div style={{ color: '#475569', fontSize: '1.2rem' }}>→</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 書院首頁 — 課程列表
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🧠</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>心理學書院</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.5rem' }}>
            讀懂人，讀懂自己。每組5分鐘，一個概念，一個測驗。
          </p>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>選擇課程</div>

        {courses.map(course => (
          <div
            key={course.id}
            onClick={() => setActiveCourse(course)}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '1rem 1.2rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
              cursor: 'pointer', marginBottom: '0.6rem',
            }}
          >
            <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{course.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1rem' }}>{course.title}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>{course.description}</div>
              <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.3rem' }}>{course.lessons.length} 組</div>
            </div>
            <div style={{ color: '#475569', fontSize: '1.2rem' }}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}
