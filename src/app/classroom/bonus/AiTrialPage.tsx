'use client';
// 📄 路徑：src/app/classroom/bonus/AiTrialPage.tsx
// AI書院各系列試讀本通用模板：入門3堂 + 進階2堂 + 高階1堂

import { useState } from 'react';
import Link from 'next/link';
import '../classroom.css';

// ── 型別 ──────────────────────────────────────────────────

export interface AiQuiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface AiSlide {
  title: string;
  body: string;
}

export interface AiLesson {
  id: string;
  title: string;
  emoji: string;
  description: string;
  duration: string;
  tier: 'basic' | 'intermediate' | 'advanced';
  slides: AiSlide[];
  quizzes: AiQuiz[];
}

export interface AiSeriesMeta {
  seriesTitle: string;    // e.g. "AI解剖書院"
  seriesEmoji: string;
  seriesNum: number;
  storePath: string;      // e.g. "/digital"
  catalog: {
    basic:        { label: string; price: string; lessons: { title: string; isTrial: boolean }[] };
    intermediate: { label: string; price: string; lessons: { title: string; isTrial: boolean }[] };
    advanced:     { label: string; price: string; lessons: { title: string; isTrial: boolean }[] };
  };
}

// ── 工具 ──────────────────────────────────────────────────

function renderBody(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={{ margin: '0 0 0.5rem 0', lineHeight: 1.75 }}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

function tierLabel(tier: AiLesson['tier']) {
  if (tier === 'basic') return '入門';
  if (tier === 'intermediate') return '進階';
  return '高階';
}

function lessonToGroupKey(lesson: AiLesson) {
  return lesson.tier === 'basic' ? 'basic' : lesson.tier === 'intermediate' ? 'intermediate' : 'advanced';
}

// ── 測驗 ──────────────────────────────────────────────────

function QuizPanel({ quiz, onPass }: { quiz: AiQuiz; onPass: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === quiz.answerIndex;

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>✏️ 隨堂測驗</div>
      <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.9rem', lineHeight: 1.6 }}>{quiz.question}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.9rem' }}>
        {quiz.options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.6)', border = '1px solid #e5e7eb', color = '#374151';
          if (answered) {
            if (i === quiz.answerIndex) { bg = '#f0fdf4'; border = '1px solid #22c55e'; color = '#15803d'; }
            else if (i === selected) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#b91c1c'; }
          }
          return (
            <button key={i} onClick={() => !answered && setSelected(i)}
              style={{ background: bg, border, color, borderRadius: '10px', padding: '0.65rem 0.9rem', textAlign: 'left', fontSize: '0.85rem', cursor: answered ? 'default' : 'pointer', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ background: correct ? '#f0fdf4' : '#fef2f2', border: `1px solid ${correct ? '#86efac' : '#fca5a5'}`, borderRadius: '10px', padding: '0.75rem', marginBottom: '0.9rem', fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>
          {correct ? '✅ 答對了！' : '❌ 再想想——'} {quiz.explanation}
        </div>
      )}
      {answered && (
        <button onClick={onPass}
          style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', borderRadius: '30px', padding: '0.65rem', cursor: 'pointer' }}>
          繼續 →
        </button>
      )}
    </div>
  );
}

// ── 單堂課 ────────────────────────────────────────────────

function LessonView({ lesson, onComplete, onBack }: { lesson: AiLesson; onComplete: () => void; onBack: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);

  const totalSteps = lesson.slides.length + lesson.quizzes.length;
  const currentStep = showQuiz ? lesson.slides.length + quizIdx : slideIdx;
  const progress = Math.round((currentStep / totalSteps) * 100);
  const slide = lesson.slides[slideIdx];
  const isLastSlide = slideIdx === lesson.slides.length - 1;

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer' }}>← 返回課程列表</button>
          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{lesson.emoji} {lesson.title}</div>
        </div>
        <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '1.2rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)', transition: 'width 0.3s', borderRadius: '2px' }} />
        </div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', minHeight: '320px' }}>
          {!showQuiz ? (
            <>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                {slideIdx + 1} / {lesson.slides.length} 頁
              </div>
              <h2 style={{ color: '#1e1b4b', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.9rem' }}>{slide.title}</h2>
              <div style={{ color: '#374151', fontSize: '0.9rem' }}>{renderBody(slide.body)}</div>
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.4rem' }}>
                {slideIdx > 0 && (
                  <button onClick={() => setSlideIdx(i => i - 1)}
                    style={{ flex: 1, background: '#f3f4f6', border: 'none', borderRadius: '30px', padding: '0.6rem', color: '#374151', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 600 }}>
                    ← 上一頁
                  </button>
                )}
                <button onClick={() => isLastSlide ? setShowQuiz(true) : setSlideIdx(i => i + 1)}
                  style={{ flex: 2, background: isLastSlide ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : '#ede9fe', border: 'none', borderRadius: '30px', padding: '0.6rem', color: isLastSlide ? '#fff' : '#5b21b6', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 700 }}>
                  {isLastSlide ? '開始測驗 →' : '下一頁 →'}
                </button>
              </div>
            </>
          ) : (
            <QuizPanel key={quizIdx} quiz={lesson.quizzes[quizIdx]} onPass={() => {
              if (quizIdx < lesson.quizzes.length - 1) setQuizIdx(q => q + 1);
              else onComplete();
            }} />
          )}
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.73rem', textAlign: 'center', marginTop: '0.8rem' }}>
          {tierLabel(lesson.tier)} · {lesson.duration} · 免費試讀
        </div>
      </div>
    </div>
  );
}

// ── 單堂完成頁 ────────────────────────────────────────────

function LessonDonePage({ groupKey, meta, onContinue }: { groupKey: string; meta: AiSeriesMeta; onContinue: () => void }) {
  const catalog = meta.catalog[groupKey as keyof typeof meta.catalog];
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            📖 {catalog.label} 完整目錄
            <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.5rem' }}>{catalog.price}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {catalog.lessons.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: l.isTrial ? 'rgba(124,58,237,0.08)' : 'transparent' }}>
                <span style={{ color: l.isTrial ? '#a78bfa' : '#d1d5db', fontSize: '0.7rem', flexShrink: 0, width: '1.4rem' }}>
                  {l.isTrial ? '✅' : `${i + 1}.`}
                </span>
                <span style={{ color: l.isTrial ? '#374151' : '#9ca3af', fontSize: '0.8rem' }}>{l.title}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#6b7280', fontSize: '0.78rem' }}>
            ✨ 以上精彩內容，前往小舖解鎖
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.78rem', lineHeight: 1.6 }}>本堂完成！可收藏紀念，無折抵功能</div>
        </div>
        <a href={`https://still-time-corner.vercel.app${meta.storePath}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', borderRadius: '30px', padding: '0.75rem', textDecoration: 'none', textAlign: 'center', marginBottom: '0.8rem' }}>
          前往小舖購買完整版 →
        </a>
        <div style={{ textAlign: 'center' }}>
          <button onClick={onContinue} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
            繼續下一堂 →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 主元件 ────────────────────────────────────────────────

interface Props {
  meta: AiSeriesMeta;
  lessons: AiLesson[];
  storageKey: string;
  bonusLabel: string;  // e.g. "好康書院" breadcrumb label
}

const GROUPS = [
  { key: 'basic',        label: '🤖 入門' },
  { key: 'intermediate', label: '⚙️ 進階' },
  { key: 'advanced',     label: '💡 高階' },
];

export default function AiTrialPage({ meta, lessons, storageKey, bonusLabel }: Props) {
  const [activeLesson, setActiveLesson] = useState<AiLesson | null>(null);
  const [doneGroupKey, setDoneGroupKey] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try { return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); }
    catch { return new Set(); }
  });

  function handleComplete() {
    if (!activeLesson) return;
    const next = new Set(completed).add(activeLesson.id);
    setCompleted(next);
    localStorage.setItem(storageKey, JSON.stringify([...next]));
    setDoneGroupKey(lessonToGroupKey(activeLesson));
    setActiveLesson(null);
  }

  if (doneGroupKey) {
    return <LessonDonePage groupKey={doneGroupKey} meta={meta} onContinue={() => setDoneGroupKey(null)} />;
  }
  if (activeLesson) {
    return <LessonView lesson={activeLesson} onComplete={handleComplete} onBack={() => setActiveLesson(null)} />;
  }

  let globalIdx = 0;
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', fontSize: '12px', color: '#64748b' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', textDecoration: 'none' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <Link href="/classroom/bonus" style={{ color: '#7c3aed', textDecoration: 'none' }}>{bonusLabel}</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>{meta.seriesTitle}試讀本</span>
        </div>

        <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          {meta.seriesEmoji} {meta.seriesTitle}試讀本
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          入門 3 堂 × 進階 2 堂 × 高階 1 堂，免費體驗完整學習路徑。
        </p>

        {GROUPS.map(group => {
          const groupLessons = lessons.filter(l => lessonToGroupKey(l) === group.key);
          if (groupLessons.length === 0) return null;
          return (
            <div key={group.key} style={{ marginBottom: '0.8rem' }}>
              <div style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', margin: '0 0 0.4rem 0.2rem' }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {groupLessons.map(lesson => {
                  const i = globalIdx++;
                  const done = completed.has(lesson.id);
                  return (
                    <button key={lesson.id} onClick={() => setActiveLesson(lesson)}
                      className={`course-list-item${done ? ' done' : ''}`}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: done ? '#dcfce7' : '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#15803d' : '#7c3aed', fontSize: '0.78rem', fontWeight: 700 }}>
                        {done ? '✓' : i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{lesson.emoji} {lesson.title}</div>
                        <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>⏱ {lesson.duration}</div>
                      </div>
                      <div style={{ color: done ? '#15803d' : '#a78bfa', fontSize: '0.8rem' }}>{done ? '✓' : '→'}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>想繼續學下去？</div>
          <div style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1rem' }}>購買電子書即可解鎖全部課堂，入門 NT$249 起</div>
          <a href={`https://still-time-corner.vercel.app${meta.storePath}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.6rem 1.8rem', borderRadius: '30px', textDecoration: 'none' }}>
            前往小舖購買 →
          </a>
        </div>
      </div>
    </div>
  );
}
