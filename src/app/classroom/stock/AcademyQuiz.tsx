'use client';
// 📄 路徑：src/app/classroom/stock/AcademyQuiz.tsx
// 測驗元件 — 內容由 AcademyLesson 傳入

import { useState } from 'react';
import type { Quiz } from './courses';
import '../classroom.css';

interface Props {
  quiz: Quiz;
  onComplete: () => void;
  onRetry: () => void;
}

export default function AcademyQuiz({ quiz, onComplete, onRetry }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;
  const isCorrect = answered && quiz.options[selected].correct;

  return (
    <div className="quiz-card">
      <div style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem', fontWeight: 600 }}>
        🧠 隨堂測驗
      </div>
      <p style={{ color: '#1a1a2e', fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', lineHeight: 1.6 }}>
        {quiz.question}
      </p>

      <div style={{ marginBottom: '1rem' }}>
        {quiz.options.map((opt, i) => {
          let extraClass = '';
          if (answered && i === selected) {
            extraClass = isCorrect ? ' correct' : ' wrong';
          } else if (answered && opt.correct) {
            extraClass = ' correct';
          }
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              className={`quiz-option${extraClass}`}
              style={{ cursor: answered ? 'default' : 'pointer' }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{
          background: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
          borderRadius: '8px', padding: '0.9rem 1rem', marginBottom: '1rem',
        }}>
          <div style={{ color: isCorrect ? '#15803d' : '#b91c1c', fontWeight: 700, marginBottom: '0.3rem' }}>
            {isCorrect ? '✅ 答對了！' : '❌ 答錯了'}
          </div>
          <div style={{ color: '#374151', fontSize: '0.85rem', lineHeight: 1.6 }}>
            {quiz.options[selected!].explanation}
          </div>
        </div>
      )}

      {answered && isCorrect && (
        <>
          <div style={{
            background: 'linear-gradient(135deg, #eef2ff, #f0fdf4)',
            border: '1px solid #c7d2fe',
            borderRadius: '12px', padding: '1.4rem', marginBottom: '1rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🏅</div>
            <div style={{ color: '#4338ca', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
              驚喜榮譽證書
            </div>
            <div style={{ color: '#374151', fontSize: '0.78rem', lineHeight: 1.6 }}>
              恭喜完成本堂課！<br />
              <span style={{ color: '#6366f1' }}>憑此證書至有的沒的小舖兌換專屬福利</span>
            </div>
          </div>
          <button className="btn-next" onClick={onComplete} style={{ width: '100%' }}>
            繼續下一課 →
          </button>
        </>
      )}

      {answered && !isCorrect && (
        <button
          onClick={onRetry}
          style={{
            width: '100%', padding: '12px',
            background: '#ffffff', border: '1px solid #7c3aed',
            borderRadius: '10px', color: '#7c3aed',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          ← 重新上課
        </button>
      )}
    </div>
  );
}
