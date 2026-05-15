'use client';
import { useState } from 'react';
import Link from 'next/link';
import quizData from '../../../data/quizzes/intro.json';

type Option = { text: string; next: string };
type Question = { q: string; options: Option[] };
type RecommendedQuiz = { slug: string; emoji: string; title: string; why: string };
type Result = { title: string; label: string; body: string; recommended: RecommendedQuiz[] };

const questions = quizData.questions as Record<string, Question>;
const results = quizData.results as Record<string, Result>;

const BG = 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)';

export default function IntroQuizPage() {
  const [started, setStarted] = useState(false);
  const [currentId, setCurrentId] = useState(quizData.start);
  const [path, setPath] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(next: string, idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      setPath(p => [...p, currentId]);
      if (next.startsWith('result_')) {
        setResult(results[next]);
      } else {
        setCurrentId(next);
        setSelected(null);
      }
    }, 380);
  }

  function restart() {
    setStarted(false);
    setCurrentId(quizData.start);
    setPath([]);
    setResult(null);
    setSelected(null);
  }

  // ── 結果頁 ──────────────────────────────────────────────────────────────
  if (result) {
    return (
      <main style={{ minHeight: '100vh', background: BG, color: '#fff', padding: '0 0 5rem' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '3rem 1.4rem 0' }}>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#4a4060', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              你走了 {path.length + 1} 步 · 找到了
            </div>
            <h1 style={{
              fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, margin: '0 0 0.5rem',
              background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 55%, #f0abfc 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {result.title}
            </h1>
            <p style={{ color: '#9d8fc4', fontSize: '0.95rem', fontStyle: 'italic' }}>{result.label}</p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.2)',
            borderLeft: '3px solid rgba(139,92,246,0.6)',
            borderRadius: '14px', padding: '1.6rem', marginBottom: '2.5rem',
          }}>
            <p style={{ color: '#d4d0ea', fontSize: '0.93rem', lineHeight: 1.85, margin: 0 }}>
              {result.body}
            </p>
          </div>

          {/* 推薦深入測驗 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.72rem', color: '#6b5a8a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ✦ 推薦你的下一關
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {result.recommended.map((rec, i) => (
                <Link key={rec.slug} href={`/quiz/${rec.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: i === 0 ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.03)',
                    border: i === 0 ? '1px solid rgba(139,92,246,0.35)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px', padding: '1.2rem 1.4rem',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      {i === 0 && <span style={{ fontSize: '0.65rem', background: '#7c3aed', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '20px', fontWeight: 700 }}>第一關</span>}
                      {i === 1 && <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', color: '#9d8fc4', padding: '0.1rem 0.5rem', borderRadius: '20px', fontWeight: 700 }}>第二關</span>}
                      <span style={{ fontSize: '1.1rem' }}>{rec.emoji}</span>
                      <span style={{ color: '#e5e1ff', fontWeight: 700, fontSize: '0.93rem' }}>{rec.title}</span>
                    </div>
                    <p style={{ color: '#6b5a8a', fontSize: '0.8rem', margin: '0 0 0 0.3rem', lineHeight: 1.5 }}>{rec.why}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={restart} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#c4b5fd', borderRadius: '30px', padding: '0.6rem 1.6rem',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            }}>
              重新來過
            </button>
            <Link href="/quiz" style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#fff', borderRadius: '30px', padding: '0.6rem 1.6rem',
              textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700,
            }}>
              看全部測驗 →
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
        <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧭</div>
          <h1 style={{
            fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, margin: '0 0 0.8rem',
            background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 60%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {quizData.title}
          </h1>
          <p style={{ color: '#7a788e', lineHeight: 1.75, marginBottom: '0.7rem', fontSize: '0.93rem' }}>
            {quizData.description}
          </p>
          <p style={{ color: '#4a4060', fontSize: '0.78rem', marginBottom: '2.5rem' }}>
            每個人走的路不一樣 · 沒有固定幾題
          </p>
          <button onClick={() => setStarted(true)} style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: '#fff', border: 'none', borderRadius: '30px',
            padding: '0.8rem 3rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
          }}>
            出發 →
          </button>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/quiz" style={{ color: '#4a4060', fontSize: '0.82rem', textDecoration: 'none' }}>
              ← 回測驗列表
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── 作答頁 ──────────────────────────────────────────────────────────────
  const q = questions[currentId];
  const depth = path.length;

  return (
    <main style={{ minHeight: '100vh', background: BG, color: '#fff', padding: '0 0 5rem' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto', padding: '2.5rem 1.4rem 0' }}>

        {/* 路徑指示 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {Array.from({ length: depth + 1 }, (_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: i < depth ? 'rgba(139,92,246,0.6)' : '#a855f7',
                display: 'inline-block',
              }} />
              {i < depth && <span style={{ color: '#3d3558', fontSize: '0.7rem' }}>▸</span>}
            </span>
          ))}
          <span style={{ color: '#4a4060', fontSize: '0.72rem', marginLeft: '0.2rem' }}>
            第 {depth + 1} 步
          </span>
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
              onClick={() => handleSelect(opt.next, i)}
              style={{
                textAlign: 'left', padding: '1rem 1.3rem',
                borderRadius: '14px', cursor: selected !== null ? 'default' : 'pointer',
                fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 500,
                border: selected === i ? '1px solid rgba(168,85,247,0.7)' : '1px solid rgba(255,255,255,0.1)',
                background: selected === i ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.04)',
                color: selected === i ? '#e9d5ff' : '#c4b5fd',
                opacity: selected !== null && selected !== i ? 0.4 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {/* 返回上一題 */}
        {path.length > 0 && selected === null && (
          <button onClick={() => {
            const prev = path[path.length - 1];
            setPath(p => p.slice(0, -1));
            setCurrentId(prev);
          }} style={{
            background: 'none', border: 'none', color: '#4a4060',
            fontSize: '0.78rem', cursor: 'pointer', marginTop: '1.5rem',
            padding: 0, textDecoration: 'underline',
          }}>
            ← 回上一步
          </button>
        )}
      </div>
    </main>
  );
}
