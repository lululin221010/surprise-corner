'use client';
// 📄 路徑：src/app/classroom/stock/AcademyQuiz.tsx
// 測驗元件 — 內容由 AcademyLesson 傳入

import { useState } from 'react';
import type { Quiz } from './courses';

interface Props {
  quiz: Quiz;
  onComplete: () => void;
}

export default function AcademyQuiz({ quiz, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;
  const isCorrect = answered && quiz.options[selected].correct;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(167,139,250,0.25)',
      borderRadius: '16px',
      padding: '1.8rem',
    }}>
      <div style={{ color: '#c4b5fd', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
        🧠 隨堂測驗
      </div>
      <p style={{ color: '#e9d5ff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', lineHeight: 1.6 }}>
        {quiz.question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.2rem' }}>
        {quiz.options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.05)';
          let border = '1px solid rgba(255,255,255,0.1)';
          if (answered && i === selected) {
            bg = isCorrect ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)';
            border = `1px solid ${isCorrect ? 'rgba(52,211,153,0.5)' : 'rgba(239,68,68,0.5)'}`;
          } else if (answered && opt.correct) {
            bg = 'rgba(52,211,153,0.08)';
            border = '1px solid rgba(52,211,153,0.3)';
          }
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              style={{
                background: bg, border, borderRadius: '10px',
                padding: '0.85rem 1rem', textAlign: 'left',
                color: '#e9d5ff', fontSize: '0.9rem', cursor: answered ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{
          background: isCorrect ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)',
          border: `1px solid ${isCorrect ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}`,
          borderRadius: '10px', padding: '0.9rem 1rem', marginBottom: '1.2rem',
        }}>
          <div style={{ color: isCorrect ? '#34d399' : '#f87171', fontWeight: 700, marginBottom: '0.3rem' }}>
            {isCorrect ? '✅ 答對了！' : '❌ 答錯了'}
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.6 }}>
            {quiz.options[selected!].explanation}
          </div>
        </div>
      )}

      {answered && (
        <button
          onClick={onComplete}
          style={{
            width: '100%', padding: '0.85rem',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            border: 'none', borderRadius: '10px',
            color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
          }}
        >
          繼續下一課 →
        </button>
      )}
    </div>
  );
}
