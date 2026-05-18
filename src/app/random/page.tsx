'use client';
import { useState } from 'react';
import Link from 'next/link';
import surprisesRaw from '../../data/surprises.json';

type SurpriseEntry = { id: string; date: string; image?: string; caption?: string; title?: string; text: string; category?: string };
const surprises = surprisesRaw as SurpriseEntry[];

export default function RandomPage() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * surprises.length));

  function next() {
    setIdx(i => {
      if (surprises.length <= 1) return i;
      let n = Math.floor(Math.random() * (surprises.length - 1));
      if (n >= i) n += 1;
      return n;
    });
  }

  const entry = surprises[idx];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.2rem',
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(168,85,247,0.35)',
        borderRadius: '24px',
        padding: '2.2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
        textAlign: 'center',
      }}>
        <span style={{ color: '#a855f7', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em' }}>✨ 隨手驚喜</span>

        {entry.image && (
          <img
            src={entry.image}
            alt={entry.caption || ''}
            style={{
              width: '100%', height: 'auto',
              borderRadius: '16px', 
              border: '3px solid rgba(168,85,247,0.45)',
              boxShadow: '0 0 30px rgba(168,85,247,0.35)',
            }}
          />
        )}

        {entry.caption && (
          <span style={{ color: '#7c6fa0', fontSize: '0.78rem' }}>{entry.caption}</span>
        )}

        <p style={{ color: '#e2d9f3', fontSize: '1rem', lineHeight: 1.85, margin: 0 }}>
          {entry.text}
        </p>

        <button
          onClick={next}
          style={{
            marginTop: '0.4rem',
            background: 'linear-gradient(135deg, #7c50ee, #9333ea)',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '11px 28px',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124,80,238,0.45)',
          }}
        >
          再來一個 🎲
        </button>
      </div>

      <Link href="/" style={{ marginTop: '2rem', color: '#4a4868', fontSize: '0.8rem', textDecoration: 'none' }}>
        ← 回首頁
      </Link>
    </main>
  );
}