'use client';
// 📄 路徑：src/app/classroom/stock/AcademyLesson.tsx
// 上課翻頁元件 — 接收 lesson，管理 slide 翻頁 + 測驗

import { useState } from 'react';
import type { Lesson } from './courses';
import AcademyQuiz from './AcademyQuiz';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

export default function AcademyLesson({ lesson, onComplete, onBack }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const slide = lesson.slides[slideIndex];
  const isLast = slideIndex === lesson.slides.length - 1;

  return (
    <div>
      {/* 頂部導航 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          ← 返回課程列表
        </button>
        <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
          {lesson.emoji} {lesson.title}
        </div>
      </div>

      {/* 進度條 */}
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px', marginBottom: '2rem' }}>
        <div style={{
          background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
          height: '100%', borderRadius: '4px',
          width: `${((slideIndex + (showQuiz ? 1 : 0)) / (lesson.slides.length + 1)) * 100}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {showQuiz ? (
        <AcademyQuiz quiz={lesson.quiz} onComplete={onComplete} />
      ) : (
        <div>
          {/* Slide */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', minHeight: '200px',
          }}>
            <h2 style={{ color: '#e9d5ff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              {slide.title}
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {slide.body}
            </p>
          </div>

          {/* 翻頁按鈕 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <button
              onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
              disabled={slideIndex === 0}
              style={{
                flex: 1, padding: '0.85rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', color: slideIndex === 0 ? '#374151' : '#9ca3af',
                fontSize: '0.9rem', cursor: slideIndex === 0 ? 'default' : 'pointer',
              }}
            >
              ← 上一頁
            </button>
            <button
              onClick={() => isLast ? setShowQuiz(true) : setSlideIndex(i => i + 1)}
              style={{
                flex: 2, padding: '0.85rem',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                border: 'none', borderRadius: '10px',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
              }}
            >
              {isLast ? '做隨堂測驗 →' : '下一頁 →'}
            </button>
          </div>

          {/* slide 頁碼 */}
          <div style={{ textAlign: 'center', marginTop: '1rem', color: '#4b5563', fontSize: '0.78rem' }}>
            {slideIndex + 1} / {lesson.slides.length}
          </div>
        </div>
      )}
    </div>
  );
}
