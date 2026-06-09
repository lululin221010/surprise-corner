'use client';
// 📄 路徑：src/app/classroom/stock/AcademyQuiz.tsx

import { useState } from 'react';
import type { Quiz } from './courses';
import '../classroom.css';

interface Props {
  quiz: Quiz;
  onPass: () => void;    // 答對 → 下一題或完課
  onRetry: () => void;   // 重新上課 → 回 slide 1
}

export default function AcademyQuiz({ quiz, onPass, onRetry }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;
  const isCorrect = answered && selected === quiz.answerIndex;

  function handleRetryQuiz() {
    setSelected(null); // 只清選擇，重新作答同一題
  }

  return (
    <div className="quiz-card">
      <p className="quiz-question">{quiz.question}</p>

      <div style={{ marginBottom: '0.8rem' }}>
        {quiz.options.map((opt, i) => {
          let extraClass = '';
          if (answered) {
            if (i === quiz.answerIndex) extraClass = ' correct';
            else if (i === selected) extraClass = ' wrong';
          }
          return (
            <button
              key={i}
              className={`quiz-option${extraClass}`}
              onClick={() => !answered && setSelected(i)}
              style={{ cursor: answered ? 'default' : 'pointer' }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* 解說 */}
      {answered && (
        <div className={isCorrect ? 'quiz-result-ok' : 'quiz-result-no'} style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>
            {isCorrect ? '✅ 答對了！' : '❌ 答錯了'}
          </div>
          {quiz.explanation}
        </div>
      )}

      {/* 答對：榮譽證書 + 繼續 */}
      {answered && isCorrect && (
        <>
          <div style={{
            background: 'linear-gradient(135deg, #eef2ff, #f0fdf4)',
            border: '1px solid #c7d2fe',
            borderRadius: '12px', padding: '1.2rem', marginBottom: '0.8rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🏅</div>
            <div style={{ color: '#4338ca', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>
              驚喜榮譽證書
            </div>
            <div style={{ color: '#374151', fontSize: '0.78rem', lineHeight: 1.6 }}>
              恭喜答對！<br />
              <span style={{ color: '#6366f1' }}>憑此證書至有的沒的小舖兌換專屬福利</span>
            </div>
          </div>
          <button className="btn-next" onClick={onPass} style={{ width: '100%' }}>
            繼續下一題 →
          </button>
        </>
      )}

      {/* 答錯：重新測驗 + 重新上課 */}
      {answered && !isCorrect && (
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={handleRetryQuiz}
            className="btn-next"
            style={{ flex: 1 }}
          >
            重新測驗
          </button>
          <button
            onClick={onRetry}
            className="btn-prev"
            style={{ flex: 1 }}
          >
            ← 重新上課
          </button>
        </div>
      )}
    </div>
  );
}
