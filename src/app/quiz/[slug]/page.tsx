'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import attachmentQuiz from '../../../data/quizzes/attachment.json';
import defenseQuiz from '../../../data/quizzes/defense.json';
import traumaResponseQuiz from '../../../data/quizzes/trauma-response.json';
import neverWrongQuiz from '../../../data/quizzes/never-wrong.json';
import selfDrainQuiz from '../../../data/quizzes/self-drain.json';
import socialPressureQuiz from '../../../data/quizzes/social-pressure.json';
import selfDoubtQuiz from '../../../data/quizzes/self-doubt.json';
import procrastinationQuiz from '../../../data/quizzes/procrastination.json';
import noGoodPeopleQuiz from '../../../data/quizzes/no-good-people.json';

type Option = { text: string; type: string };
type Question = { q: string; options: Option[] };
type ResultData = { title: string; label: string; body: string[]; book: string };
type QuizData = {
  slug: string; title: string; description: string; emoji: string;
  questions: Question[];
  results: Record<string, ResultData>;
};

const QUIZZES: Record<string, QuizData> = {
  attachment: attachmentQuiz as QuizData,
  defense: defenseQuiz as QuizData,
  'trauma-response': traumaResponseQuiz as QuizData,
  'never-wrong': neverWrongQuiz as QuizData,
  'self-drain': selfDrainQuiz as QuizData,
  'social-pressure': socialPressureQuiz as QuizData,
  'self-doubt': selfDoubtQuiz as QuizData,
  'procrastination': procrastinationQuiz as QuizData,
  'no-good-people': noGoodPeopleQuiz as QuizData,
};

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const quiz = QUIZZES[slug as string];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const BG = 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)';

  if (!quiz) {
    return (
      <main style={{ minHeight: '100vh', background: BG, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#7a788e', marginBottom: '1.5rem' }}>測驗不存在或尚未上線</p>
          <Link href="/quiz" style={{ color: '#8b5cf6', textDecoration: 'none' }}>← 回測驗列表</Link>
        </div>
      </main>
    );
  }

  function handleSelect(type: string, idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (current + 1 >= quiz.questions.length) {
        const counts: Record<string, number> = {};
        for (const a of newAnswers) counts[a] = (counts[a] || 0) + 1;
        const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        setAnswers(newAnswers);
        setResult(winner);
      } else {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 380);
  }

  function restart() {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setSelected(null);
    setStarted(false);
  }

  // ── 結果頁 ──────────────────────────────────────────────────────────────
  if (result) {
    const r = quiz.results[result];
    return (
      <main style={{ minHeight: '100vh', background: BG, color: '#fff', padding: '0 0 5rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.4rem 0' }}>

          {/* 截圖分享卡片 */}
          <div style={{
            background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1a5c 50%, #1a0f3c 100%)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '20px', padding: '2rem 2rem 1.6rem',
            marginBottom: '2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>{quiz.emoji}</div>
            <div style={{ color: '#6b5a8a', fontSize: '0.68rem', letterSpacing: '0.18em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              {quiz.title}
            </div>
            <div style={{
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: 900, margin: '0 0 0.5rem',
              background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 60%, #f0abfc 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2,
            }}>
              {r.title}
            </div>
            <p style={{ color: '#a78bda', fontSize: '0.95rem', fontStyle: 'italic', margin: '0 0 1.4rem' }}>
              {r.label}
            </p>
            <div style={{
              display: 'inline-block',
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '30px', padding: '0.3rem 1rem',
              color: '#8b5cf6', fontSize: '0.72rem', letterSpacing: '0.08em',
            }}>
              surprise-corner.vercel.app/quiz/{quiz.slug}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginBottom: '2.5rem' }}>
            {r.body.map((para, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderLeft: '3px solid rgba(139,92,246,0.6)',
                borderRadius: '12px', padding: '1.4rem 1.6rem',
              }}>
                <p style={{ color: '#d4d0ea', fontSize: '0.93rem', lineHeight: 1.85, margin: 0 }}>
                  {para}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: '14px', padding: '1.2rem 1.6rem', marginBottom: '2.5rem',
            fontSize: '0.85rem', color: '#a78bda', lineHeight: 1.7,
          }}>
            📚 {r.book}
          </div>

          {/* 購書 CTA */}
          <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '16px', padding: '1.2rem 1.6rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)')}
            >
              <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>📖</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#c4b5fd', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  想更深入了解自己？
                </div>
                <div style={{ color: '#7a6a9a', fontSize: '0.78rem', lineHeight: 1.5 }}>
                  心理學電子書系列——讀完有被翻底的感覺
                </div>
              </div>
              <div style={{ color: '#a855f7', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>
                看看 →
              </div>
            </div>
          </a>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={restart} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#c4b5fd', borderRadius: '30px', padding: '0.65rem 1.8rem',
              cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
            }}>
              重新測驗
            </button>
            <Link href="/quiz" style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#fff', borderRadius: '30px', padding: '0.65rem 1.8rem',
              textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700,
            }}>
              看其他測驗 →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── 開始頁 ──────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <main style={{ minHeight: '100vh', background: BG, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.4rem' }}>
        <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{quiz.emoji}</div>
          <h1 style={{
            fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, margin: '0 0 1rem',
            background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 60%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {quiz.title}
          </h1>
          <p style={{ color: '#7a788e', lineHeight: 1.75, marginBottom: '0.8rem', fontSize: '0.93rem' }}>
            {quiz.description}
          </p>
          <div style={{ color: '#4a4868', fontSize: '0.78rem', marginBottom: '2.5rem' }}>
            {quiz.questions.length} 題 · 約 3 分鐘
          </div>
          <button onClick={() => setStarted(true)} style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: '#fff', border: 'none', borderRadius: '30px',
            padding: '0.8rem 3rem', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            開始測驗
          </button>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/quiz" style={{ color: '#4a4868', fontSize: '0.82rem', textDecoration: 'none' }}>
              ← 回測驗列表
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── 作答頁 ──────────────────────────────────────────────────────────────
  const q = quiz.questions[current];
  const progress = (current / quiz.questions.length) * 100;

  return (
    <main style={{ minHeight: '100vh', background: BG, color: '#fff', padding: '0 0 5rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem 1.4rem 0' }}>

        {/* 進度條 */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#4a4868', fontSize: '0.74rem' }}>{quiz.title}</span>
            <span style={{ color: '#6b5a8a', fontSize: '0.74rem' }}>{current + 1} / {quiz.questions.length}</span>
          </div>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
              width: `${progress}%`, transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* 題目 */}
        <p style={{
          color: '#f0eeff', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
          fontWeight: 700, lineHeight: 1.65, marginBottom: '2rem',
        }}>
          {q.q}
        </p>

        {/* 選項 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.type, i)}
              style={{
                textAlign: 'left', padding: '1rem 1.3rem',
                borderRadius: '14px', cursor: selected !== null ? 'default' : 'pointer',
                fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 500,
                border: selected === i
                  ? '1px solid rgba(236,72,153,0.7)'
                  : '1px solid rgba(255,255,255,0.1)',
                background: selected === i
                  ? 'rgba(236,72,153,0.15)'
                  : 'rgba(255,255,255,0.04)',
                color: selected === i ? '#f9a8d4' : '#c4b5fd',
                transition: 'all 0.2s ease',
                opacity: selected !== null && selected !== i ? 0.45 : 1,
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
