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
      <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem', whiteSpace: 'pre-wrap' }}>
        {question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.05)';
          let border = '1px solid rgba(255,255,255,0.1)';
          let color = '#cbd5e1';
          if (selected !== null) {
            if (i === answerIndex) { bg = 'rgba(34,197,94,0.15)'; border = '1px solid #22c55e'; color = '#86efac'; }
            else if (i === selected) { bg = 'rgba(239,68,68,0.15)'; border = '1px solid #ef4444'; color = '#fca5a5'; }
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
            <div style={{ color: correct ? '#86efac' : '#fca5a5', fontWeight: 700 }}>
              {correct ? '✅ 答對了！' : '❌ 再想想看'}
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{explanation}</p>
          {correct ? (
            <button onClick={onPass} style={{ marginTop: '0.8rem', width: '100%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', borderRadius: '30px', padding: '0.6rem', cursor: 'pointer' }}>
              完成！看完整課程 →
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
              <button onClick={onRetry} style={{ flex: 1, background: 'rgba(124,58,237,0.2)', color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '30px', padding: '0.55rem', cursor: 'pointer' }}>
                再試一次
              </button>
              <button onClick={onReread} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', padding: '0.55rem', cursor: 'pointer' }}>
                重新看講義
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── 購買指引頁 ────────────────────────────────────────────
function PurchaseGuide({ bookTitle, onBack }: { bookTitle: string; onBack: () => void }) {
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem', textAlign: 'center' }}>
        <Image src="/images/lulu-expressions/魯魯_表情_想通了.png" alt="魯魯想通了" width={80} height={80} style={{ borderRadius: '50%', margin: '0 auto 1rem' }} />
        <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          喜歡這一組嗎？
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          《{bookTitle}》完整版還有更多組別，<br />
          買電子書即可解鎖全部內容，永久可讀。
        </p>

        <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem', textAlign: 'left' }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '0.6rem' }}>📦 買電子書包含</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 2 }}>
            ✓ 全書完整組別（包含今天這組）<br />
            ✓ 每組一題情境測驗<br />
            ✓ 完讀後取得榮譽證書<br />
            ✓ 永久可讀，跨裝置
          </div>
        </div>

        <a
          href="https://still-time-corner.vercel.app/digital"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: '30px', padding: '0.85rem', cursor: 'pointer', textDecoration: 'none', marginBottom: '0.8rem' }}
        >
          前往小舖購買電子書 →
        </a>

        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}>
          ← 回好康書院繼續逛
        </button>
      </div>
    </div>
  );
}

// ── 主元件 ───────────────────────────────────────────────
interface Props {
  lesson: PsychLesson;
  bookTitle: string;
  onBack: () => void;
}

export default function BonusLesson({ lesson, bookTitle, onBack }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  if (showPurchase) return <PurchaseGuide bookTitle={bookTitle} onBack={onBack} />;

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
