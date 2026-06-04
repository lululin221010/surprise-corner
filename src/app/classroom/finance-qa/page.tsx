'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import qaData from '@/data/finance-personality-qa.json';

type QAType = 'vault' | 'analyst' | 'aggressive' | 'emotional';

const TYPE_MAP: Record<string, QAType> = {
  vault:      'vault',
  analyst:    'analyst',
  active:     'aggressive',
  aggressive: 'aggressive',
  follower:   'emotional',
  emotional:  'emotional',
};

const BG_COLOR: Record<QAType, string> = {
  vault:      'rgba(59,130,246,0.08)',
  analyst:    'rgba(139,92,246,0.08)',
  aggressive: 'rgba(245,158,11,0.08)',
  emotional:  'rgba(6,182,212,0.08)',
};

const BORDER_COLOR: Record<QAType, string> = {
  vault:      'rgba(59,130,246,0.25)',
  analyst:    'rgba(139,92,246,0.25)',
  aggressive: 'rgba(245,158,11,0.25)',
  emotional:  'rgba(6,182,212,0.25)',
};

const ACCENT_COLOR: Record<QAType, string> = {
  vault:      '#3b82f6',
  analyst:    '#8b5cf6',
  aggressive: '#f59e0b',
  emotional:  '#06b6d4',
};

function FinanceQAContent() {
  const params = useSearchParams();
  const rawType = params.get('type') ?? 'analyst';
  const type: QAType = TYPE_MAP[rawType] ?? 'analyst';
  const data = (qaData as Record<string, typeof qaData.analyst>)[type];

  const accent = ACCENT_COLOR[type];
  const bg = BG_COLOR[type];
  const border = BORDER_COLOR[type];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)',
      color: '#e5e7eb',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Back */}
        <Link href="/quiz/finance-personality" style={{
          color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none',
          display: 'block', marginBottom: '1.5rem',
        }}>
          ← 回測驗
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{data.emoji}</div>
          <div style={{
            display: 'inline-block',
            background: bg, border: `1px solid ${border}`,
            color: accent, fontSize: '0.75rem', fontWeight: 700,
            padding: '3px 12px', borderRadius: '20px', marginBottom: '0.6rem',
          }}>{data.label}</div>
          <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.4rem' }}>
            {data.label}同學最常問的坑
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: 0 }}>
            {data.hint}
          </p>
        </div>

        {/* Q&A List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {data.qa.map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              {/* 同學問 */}
              <div style={{
                padding: '1rem 1.2rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', gap: '0.8rem', alignItems: 'flex-start',
              }}>
                <span style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50%', width: '28px', height: '28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', flexShrink: 0, marginTop: '1px',
                }}>🙋</span>
                <p style={{ color: '#d1d5db', fontSize: '0.92rem', lineHeight: 1.65, margin: 0, fontWeight: 600 }}>
                  {item.q}
                </p>
              </div>
              {/* LuLu 回 */}
              <div style={{
                padding: '1rem 1.2rem',
                background: bg,
                display: 'flex', gap: '0.8rem', alignItems: 'flex-start',
              }}>
                <span style={{
                  background: accent + '33',
                  border: `1px solid ${accent}55`,
                  borderRadius: '50%', width: '28px', height: '28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: accent,
                  flexShrink: 0, marginTop: '1px',
                }}>L</span>
                <p style={{ color: '#c4b5fd', fontSize: '0.88rem', lineHeight: 1.75, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          <p style={{ color: '#e5e7eb', fontWeight: 700, margin: '0 0 0.4rem' }}>
            想更了解你的財務人格？
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '0 0 1rem' }}>
            回去做完整測驗，看看你的四維雷達分析
          </p>
          <Link href="/quiz/finance-personality" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            color: '#fff', fontWeight: 700,
            padding: '0.6rem 1.6rem', borderRadius: '30px',
            textDecoration: 'none', fontSize: '0.9rem',
          }}>
            重新測驗 →
          </Link>
        </div>

        {/* All types nav */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#4b5563', fontSize: '0.78rem', marginBottom: '0.8rem' }}>看其他類型</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {([
              ['vault',      '🔒', '保險庫型'],
              ['analyst',    '📊', '穩健分析型'],
              ['aggressive', '⚡', '積極出擊型'],
              ['emotional',  '🌊', '情緒驅動型'],
            ] as const).map(([t, emoji, label]) => (
              <Link key={t} href={`/classroom/finance-qa?type=${t}`} style={{
                display: 'inline-block',
                background: t === type ? bg : 'rgba(255,255,255,0.04)',
                border: `1px solid ${t === type ? border : 'rgba(255,255,255,0.08)'}`,
                color: t === type ? accent : '#6b7280',
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                textDecoration: 'none', fontSize: '0.78rem', fontWeight: t === type ? 700 : 400,
              }}>
                {emoji} {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function FinanceQAPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#0f0c29', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280' }}>載入中...</p>
      </div>
    }>
      <FinanceQAContent />
    </Suspense>
  );
}
