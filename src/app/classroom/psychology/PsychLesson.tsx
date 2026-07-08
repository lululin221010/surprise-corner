'use client';
// 📄 路徑：src/app/classroom/psychology/PsychLesson.tsx

import { useState } from 'react';
import Image from 'next/image';
import type { Lesson } from './courses';
import '../classroom.css';

interface QuizProps {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  onPass: () => void;
  onRetry: () => void;
  onReread: () => void;
}

function PsychQuiz({ question, options, answerIndex, explanation, onPass, onRetry, onReread }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === answerIndex;

  return (
    <div className="slide-card">
      <div style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
        隨堂測驗
      </div>
      <p style={{ color: '#1e1b4b', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem', whiteSpace: 'pre-wrap' }}>
        {question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map((opt, i) => {
          let bg = '#ffffff';
          let border = '1px solid #e8e4ff';
          let color = '#374151';
          if (selected !== null) {
            if (i === answerIndex) { bg = '#f0fdf4'; border = '1px solid #22c55e'; color = '#15803d'; }
            else if (i === selected) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#b91c1c'; }
          }
          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => setSelected(i)}
              style={{
                background: bg, border, color, borderRadius: '10px',
                padding: '0.7rem 1rem', textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                fontSize: '0.88rem', lineHeight: 1.5, transition: 'all 0.2s',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(124,58,237,0.1)', borderRadius: '10px', border: '1px solid rgba(124,58,237,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Image
              src={correct ? '/images/lulu-expressions/魯魯_表情_高興.png' : '/images/lulu-expressions/魯魯_表情_沮喪.png'}
              alt={correct ? '魯魯高興' : '魯魯沮喪'}
              width={48} height={48}
              style={{ borderRadius: '50%', flexShrink: 0 }}
            />
            <div style={{ color: correct ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
              {correct ? '✅ 答對了！' : '❌ 再想想看'}
            </div>
          </div>
          <p style={{ color: '#4b5563', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{explanation}</p>
          {correct ? (
            <button
              onClick={onPass}
              style={{
                marginTop: '0.8rem', width: '100%',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                border: 'none', borderRadius: '30px', padding: '0.6rem',
                cursor: 'pointer',
              }}
            >
              完成這一組 →
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
              <button
                onClick={onRetry}
                style={{
                  flex: 1, background: 'rgba(124,58,237,0.2)',
                  color: '#7c3aed', fontWeight: 700, fontSize: '0.85rem',
                  border: '1px solid rgba(124,58,237,0.4)', borderRadius: '30px', padding: '0.55rem',
                  cursor: 'pointer',
                }}
              >
                再試一次
              </button>
              <button
                onClick={onReread}
                style={{
                  flex: 1, background: '#f3f4f6',
                  color: '#4b5563', fontWeight: 700, fontSize: '0.85rem',
                  border: '1px solid #e5e7eb', borderRadius: '30px', padding: '0.55rem',
                  cursor: 'pointer',
                }}
              >
                重新看講義
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface Props {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

export default function PsychLesson({ lesson, onComplete, onBack }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const safeIndex = Math.min(slideIndex, lesson.slides.length - 1);
  const slide = lesson.slides[safeIndex];
  const isLastSlide = safeIndex === lesson.slides.length - 1;
  const total = lesson.slides.length + lesson.quizzes.length;
  const current = showQuiz ? lesson.slides.length : slideIndex;
  const progress = Math.round((current / total) * 100);

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 頂部導航 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            ← 返回課程列表
          </button>
          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
            {lesson.emoji} {lesson.title}
          </div>
        </div>

        {/* 進度條 */}
        <div className="prog-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="prog-fill" style={{ width: `${progress}%` }} />
        </div>

        {showQuiz ? (
          <PsychQuiz
            {...lesson.quizzes[0]}
            onPass={onComplete}
            onRetry={() => setShowQuiz(false)}
            onReread={() => { setShowQuiz(false); setSlideIndex(0); }}
          />
        ) : (
          <div>
            <div className="slide-card" style={{ marginBottom: '1.2rem' }}>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-body" style={{ whiteSpace: 'pre-wrap' }}>{slide.body}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <button
                className="btn-prev"
                onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
                disabled={slideIndex === 0}
                style={{ flex: '0 0 auto' }}
              >
                ← 上一頁
              </button>
              <button
                className="btn-next"
                style={{ flex: 1 }}
                onClick={() => {
                  if (isLastSlide) setShowQuiz(true);
                  else setSlideIndex(i => i + 1);
                }}
              >
                {isLastSlide ? '做隨堂測驗（1題）→' : '下一頁 →'}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.78rem' }}>
              {slideIndex + 1} / {lesson.slides.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
