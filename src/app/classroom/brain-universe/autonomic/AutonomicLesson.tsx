'use client';
// 📄 路徑：src/app/classroom/brain-universe/autonomic/AutonomicLesson.tsx

import { useState } from 'react';
import Link from 'next/link';
import type { AutonomicLesson } from './courses';
import '../../classroom.css';

interface Props {
  lesson: AutonomicLesson;
  onBack: () => void;
}

export default function AutonomicLessonViewer({ lesson, onBack }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const totalSteps = lesson.slides.length + lesson.quizzes.length;
  const currentStep = showQuiz ? lesson.slides.length + quizIndex : slideIndex;
  const progress = Math.round((currentStep / totalSteps) * 100);
  const slide = lesson.slides[slideIndex];
  const quiz = lesson.quizzes[quizIndex];

  if (done) {
    return (
      <div className="classroom-content">
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', paddingTop: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Vol.{lesson.vol} 試讀完成！
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {lesson.cta.seriesNote}
          </p>
          <a
            href={lesson.cta.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem',
              borderRadius: '30px', padding: '0.8rem 1.5rem',
              textDecoration: 'none', marginBottom: '1rem',
            }}
          >
            {lesson.cta.text} →
          </a>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.88rem', cursor: 'pointer' }}
          >
            ← 返回自律神經學系
          </button>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    const isAnswered = selected !== null;
    const isCorrect = selected === quiz.answer;

    return (
      <div className="classroom-content">
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
          ← 返回課程列表
        </button>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
            <span>🧬 {lesson.title}</span>
            <span>測驗 {quizIndex + 1} / {lesson.quizzes.length}</span>
          </div>
          <div style={{ height: '4px', borderRadius: '2px', background: '#e0e7ff', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#6366f1', width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.2rem' }}>
          <p style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, margin: 0 }}>{quiz.question}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
          {quiz.options.map((opt, i) => {
            let bg = '#f8fafc';
            let border = '1px solid #e2e8f0';
            let color = '#1e293b';
            if (isAnswered) {
              if (i === quiz.answer) { bg = '#f0fdf4'; border = '1px solid #86efac'; color = '#15803d'; }
              else if (i === selected) { bg = '#fef2f2'; border = '1px solid #fca5a5'; color = '#b91c1c'; }
            }
            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => setSelected(i)}
                style={{ background: bg, border, color, borderRadius: '10px', padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.9rem', cursor: isAnswered ? 'default' : 'pointer', fontWeight: i === quiz.answer && isAnswered ? 700 : 400 }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <>
            <div style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`, borderRadius: '10px', padding: '1rem', marginBottom: '1rem', fontSize: '0.88rem', color: '#374151' }}>
              <strong>{isCorrect ? '✅ 正確！' : '❌ 再想想看'}</strong>
              <p style={{ margin: '0.5rem 0 0' }}>{quiz.explanation}</p>
            </div>
            <button
              onClick={() => {
                if (quizIndex < lesson.quizzes.length - 1) {
                  setQuizIndex(q => q + 1);
                  setSelected(null);
                } else {
                  setDone(true);
                }
              }}
              style={{ width: '100%', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '30px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {quizIndex < lesson.quizzes.length - 1 ? '下一題 →' : '完成本堂 🎉'}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="classroom-content">
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
        ← 返回課程列表
      </button>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          <span>🧬 {lesson.subtitle}</span>
          <span>{slideIndex + 1} / {lesson.slides.length}</span>
        </div>
        <div style={{ height: '4px', borderRadius: '2px', background: '#e0e7ff', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#6366f1', width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      <h2 style={{ color: '#1e1b4b', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem' }}>{slide.title}</h2>

      <div
        style={{ width: '100%', marginBottom: '1rem', borderRadius: '10px', overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: slide.visual }}
      />

      <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1.2rem', fontSize: '0.88rem', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
        {slide.content}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        {slideIndex > 0 && (
          <button
            onClick={() => setSlideIndex(i => i - 1)}
            style={{ flex: 1, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '30px', padding: '0.7rem', fontSize: '0.9rem', cursor: 'pointer' }}
          >
            ← 上一頁
          </button>
        )}
        <button
          onClick={() => {
            if (slideIndex < lesson.slides.length - 1) {
              setSlideIndex(i => i + 1);
            } else {
              setShowQuiz(true);
            }
          }}
          style={{ flex: 1, background: '#6366f1', color: '#fff', border: 'none', borderRadius: '30px', padding: '0.7rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
        >
          {slideIndex < lesson.slides.length - 1 ? '下一頁 →' : '進入測驗 →'}
        </button>
      </div>
    </div>
  );
}
