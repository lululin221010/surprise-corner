'use client';
// 📄 路徑：src/app/classroom/bonus/BonusLesson.tsx
// 好康書院課程閱讀器 — 讀完顯示購買指引，不顯示任何鎖頭

import { useState } from 'react';
import Image from 'next/image';
import type { PsychLesson, PsychQuiz } from '../psychology/courses-data';
import '../classroom.css';

// ── 測驗元件 ──────────────────────────────────────────────
interface QuizProps extends PsychQuiz {
  onPass: () => void;
  onRetry: () => void;
  onReread: () => void;
}

function BonusQuiz({ question, options, answerIndex, explanation, onPass, onRetry, onReread }: QuizProps) {
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
            <button key={i} disabled={selected !== null} onClick={() => setSelected(i)}
              style={{ background: bg, border, color, borderRadius: '10px', padding: '0.7rem 1rem', textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer', fontSize: '0.88rem', lineHeight: 1.5 }}>
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
              alt={correct ? '魯魯高興' : '魯魯沮喪'} width={48} height={48}
              style={{ borderRadius: '50%', flexShrink: 0 }}
            />
            <div style={{ color: correct ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
              {correct ? '✅ 答對了！' : '❌ 再想想看'}
            </div>
          </div>
          <p style={{ color: '#4b5563', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{explanation}</p>
          {correct ? (
            <button onClick={onPass} style={{ marginTop: '0.8rem', width: '100%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', borderRadius: '30px', padding: '0.6rem', cursor: 'pointer' }}>
              完成！看完整課程 →
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
              <button onClick={onRetry} style={{ flex: 1, background: 'rgba(124,58,237,0.2)', color: '#7c3aed', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '30px', padding: '0.55rem', cursor: 'pointer' }}>
                再試一次
              </button>
              <button onClick={onReread} style={{ flex: 1, background: '#f3f4f6', color: '#4b5563', fontWeight: 700, fontSize: '0.85rem', border: '1px solid #e5e7eb', borderRadius: '30px', padding: '0.55rem', cursor: 'pointer' }}>
                重新看講義
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── 購買指引頁（含目錄 + 好康證書）────────────────────────
function PurchaseGuide({ bookTitle, allGroupTitles, onBack }: { bookTitle: string; allGroupTitles: string[]; onBack: () => void }) {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>

        {/* 好康收藏證書 */}
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.8rem', lineHeight: 1.6 }}>
            已完成《{bookTitle}》第一組體驗<br />
            <span style={{ color: '#a16207', fontSize: '0.72rem' }}>可收藏紀念，無折抵功能</span>
          </div>
        </div>

        {/* 本書目錄 */}
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.6rem' }}>
            📖 《{bookTitle}》完整目錄
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {allGroupTitles.map((title, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.45rem 0.7rem', borderRadius: '8px', background: i === 0 ? 'rgba(124,58,237,0.15)' : '#f9fafb', border: i === 0 ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent' }}>
                <span style={{ color: i === 0 ? '#7c3aed' : '#475569', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                  {i === 0 ? '✅' : `第${i + 1}組`}
                </span>
                <span style={{ color: i === 0 ? '#5b21b6' : '#64748b', fontSize: '0.82rem' }}>{title}</span>
              </div>
            ))}
          </div>
          {allGroupTitles.length > 1 && (
            <div style={{ marginTop: '0.8rem', padding: '0.6rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#94a3b8', fontSize: '0.78rem' }}>
              ✨ 以上精彩內容，前往小舖解鎖
            </div>
          )}
        </div>

        {/* 購買按鈕 */}
        <a
          href="https://still-time-corner.vercel.app/digital"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: '30px', padding: '0.85rem', cursor: 'pointer', textDecoration: 'none', marginBottom: '0.8rem', textAlign: 'center' }}
        >
          前往小舖購買完整版 →
        </a>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}>
            ← 回好康書院繼續逛
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 主元件 ───────────────────────────────────────────────
interface Props {
  lesson: PsychLesson;
  bookTitle: string;
  allGroupTitles: string[];
  onBack: () => void;
}

export default function BonusLesson({ lesson, bookTitle, allGroupTitles, onBack }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  if (showPurchase) return <PurchaseGuide bookTitle={bookTitle} allGroupTitles={allGroupTitles} onBack={onBack} />;

  const safeIndex = Math.min(slideIndex, lesson.slides.length - 1);
  const slide = lesson.slides[safeIndex];
  const isLastSlide = safeIndex === lesson.slides.length - 1;
  const total = lesson.slides.length + (lesson.quizzes.length > 0 ? 1 : 0);
  const current = showQuiz ? lesson.slides.length : safeIndex;
  const progress = Math.round((current / total) * 100);

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer' }}>
            ← 返回好康書院
          </button>
          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
            🆓 {lesson.title}
          </div>
        </div>

        <div className="prog-wrap" style={{ marginBottom: '1.5rem' }}>
          <div className="prog-fill" style={{ width: `${progress}%` }} />
        </div>

        {showQuiz ? (
          <BonusQuiz
            {...lesson.quizzes[0]}
            onPass={() => setShowPurchase(true)}
            onRetry={() => setShowQuiz(false)}
            onReread={() => { setShowQuiz(false); setSlideIndex(0); }}
          />
        ) : (
          <div>
            <div className="slide-card" style={{ marginBottom: '1.2rem' }}>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-body" style={{ whiteSpace: 'pre-wrap' }}>{slide.body}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn-prev" onClick={() => setSlideIndex(i => Math.max(0, i - 1))} disabled={slideIndex === 0} style={{ flex: '0 0 auto' }}>
                ← 上一頁
              </button>
              <button className="btn-next" style={{ flex: 1 }}
                onClick={() => {
                  if (isLastSlide) {
                    if (lesson.quizzes.length > 0) setShowQuiz(true);
                    else setShowPurchase(true);
                  } else {
                    setSlideIndex(i => i + 1);
                  }
                }}>
                {isLastSlide ? (lesson.quizzes.length > 0 ? '做隨堂測驗（1題）→' : '看完整課程 →') : '下一頁 →'}
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.78rem' }}>
              {safeIndex + 1} / {lesson.slides.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
