'use client';
// 📄 路徑：src/app/classroom/brain-universe/autonomic/AutonomicLesson.tsx

import { useState } from 'react';
import Image from 'next/image';
import type { AutonomicLesson } from './courses';
import '../../classroom.css';

interface Props {
  lesson: AutonomicLesson;
  onBack: () => void;
  cta?: { text: string; url: string; seriesNote: string };
}

export default function AutonomicLessonViewer({ lesson, onBack, cta }: Props) {
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
            {lesson.isFree ? '試讀完成！' : '本堂完成！'}
          </h2>
          {cta ? (
            <>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {cta.seriesNote}
              </p>
              <a
                href={cta.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  borderRadius: '30px', padding: '0.8rem 1.5rem',
                  textDecoration: 'none', marginBottom: '1rem',
                }}
              >
                {cta.text} →
              </a>
            </>
          ) : (
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              繼續下一堂，或返回課程列表。
            </p>
          )}
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.88rem', cursor: 'pointer' }}
          >
            ← 返回課程列表
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
          <div className="prog-wrap">
            <div className="prog-fill" style={{ width: `${progress}%` }} />
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
            <div style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`, borderRadius: '10px', padding: '1rem', marginBottom: '1rem', fontSize: '0.88rem', color: '#374151', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <Image
                src={isCorrect ? '/images/lulu-expressions/魯魯_表情_高興.png' : '/images/lulu-expressions/魯魯_表情_沮喪.png'}
                alt={isCorrect ? '魯魯高興' : '魯魯沮喪'}
                width={70} height={70}
                style={{ borderRadius: '8px', flexShrink: 0, objectFit: 'cover' }}
              />
              <div>
                <strong>{isCorrect ? '✅ 正確！' : '❌ 再想想看'}</strong>
                <p style={{ margin: '0.5rem 0 0' }}>{quiz.explanation}</p>
              </div>
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
    <div className="classroom-content theme-brain">
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#6eb5c4', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
        ← 返回課程列表
      </button>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          <span>🧬 {lesson.title}</span>
          <span>{slideIndex + 1} / {lesson.slides.length}</span>
        </div>
        <div className="prog-wrap">
          <div className="prog-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="slide-shell" style={{ marginBottom: '1.2rem' }}>
        <div className="slide-card">
          <div className="slide-eyebrow">
            <span className="slide-num-badge">SLIDE {String(slideIndex + 1).padStart(2, '0')} · {lesson.slides.length}</span>
          </div>
          <h2 className="slide-title">{slide.title}</h2>
          {slide.visual && (
            <div
              style={{ width: '100%', marginBottom: '1rem', borderRadius: '10px', overflow: 'hidden' }}
              dangerouslySetInnerHTML={{ __html: slide.visual }}
            />
          )}
          <div className="slide-body" style={{ whiteSpace: 'pre-line' }}>
            {slide.content}
          </div>
        </div>
        {slide.lulu && (
          <div className="lulu-strip">
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🐱</span>
            <span className="lulu-strip-text">魯魯說：{slide.lulu}</span>
          </div>
        )}
      </div>

      <div className="slide-nav-wrap" style={{ display: 'flex', gap: '0.6rem' }}>
        {slideIndex > 0 && (
          <button className="btn-prev" onClick={() => setSlideIndex(i => i - 1)}>
            ← 上一頁
          </button>
        )}
        <button
          className="btn-next"
          style={{ flex: 1 }}
          onClick={() => {
            if (slideIndex < lesson.slides.length - 1) {
              setSlideIndex(i => i + 1);
            } else {
              setShowQuiz(true);
            }
          }}
        >
          {slideIndex < lesson.slides.length - 1 ? '下一頁 →' : '進入測驗 →'}
        </button>
      </div>

      <div className="slide-dots">
        {lesson.slides.map((_, i) => (
          <span key={i} className={`slide-dot${i === slideIndex ? ' active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
