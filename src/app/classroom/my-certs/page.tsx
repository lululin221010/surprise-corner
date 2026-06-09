'use client';
// 📄 路徑：src/app/classroom/my-certs/page.tsx
// 我的驚喜榮譽證書 — 輸入 Email 查詢已儲存的證書

import { useState } from 'react';
import Link from 'next/link';
import '../classroom.css';

interface CertRecord {
  lessonId: string;
  lessonTitle: string;
  quizIndex: number;
  earnedAt: string;
}

const LESSON_EMOJI: Record<string, string> = {
  kline: '🕯️',
  volume: '📊',
  ma: '📉',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

export default function MyCertsPage() {
  const [email, setEmail] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [certs, setCerts] = useState<CertRecord[] | null>(null);

  function handleQuery() {
    const trimmed = input.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('請輸入有效的 Email');
      return;
    }
    const all: Record<string, CertRecord[]> = JSON.parse(localStorage.getItem('sc_academy_certs') || '{}');
    setEmail(trimmed);
    setCerts(all[trimmed] || []);
    setError('');
  }

  const totalPoints = certs ? certs.length : 0;

  return (
    <div className="classroom-content">
      <div style={{ paddingTop: '1rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.82rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
          <h1 style={{ color: '#1e1b4b', fontSize: '1.5rem', fontWeight: 800, margin: '0.6rem 0 0.2rem' }}>
            🏅 我的榮譽證書
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
            輸入你的 Email 查詢已儲存的證書
          </p>
        </div>

        {/* 查詢框 */}
        <div className="slide-card" style={{ marginBottom: '1.2rem' }}>
          <p style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
            輸入 Email 查詢
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              value={input}
              onChange={e => { setInput(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleQuery()}
              placeholder="your@email.com"
              style={{
                flex: 1, padding: '10px 12px', fontSize: '0.9rem',
                border: error ? '1px solid #ef4444' : '1px solid #c7d2fe',
                borderRadius: '8px', outline: 'none', color: '#1e1b4b',
              }}
            />
            <button
              onClick={handleQuery}
              className="btn-next"
              style={{ flex: 'none', padding: '10px 20px' }}
            >
              查詢
            </button>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{error}</p>}
        </div>

        {/* 查詢結果 */}
        {certs !== null && (
          <>
            {/* 積分總覽 */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              borderRadius: '14px', padding: '1.2rem 1.4rem',
              marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{ fontSize: '2.2rem' }}>🏆</div>
              <div>
                <div style={{ color: '#e9d5ff', fontSize: '0.75rem', marginBottom: '2px' }}>
                  {email} 的帳號
                </div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem' }}>
                  {totalPoints} 張證書
                </div>
                <div style={{ color: '#c4b5fd', fontSize: '0.75rem' }}>
                  {totalPoints >= 30 ? '👑 驚喜學院認證學員' :
                   totalPoints >= 15 ? '📖 可兌換免費電子書一本' :
                   totalPoints >= 5  ? '🎁 可兌換 NT$30 折扣碼' :
                   `還差 ${5 - totalPoints} 張可兌換第一個獎勵`}
                </div>
              </div>
            </div>

            {/* 兌換說明 */}
            <div style={{
              background: '#faf5ff', border: '1px solid #ddd6fe',
              borderRadius: '10px', padding: '12px 14px', marginBottom: '1rem',
              fontSize: '0.78rem', color: '#4c1d95', lineHeight: 1.7,
            }}>
              <strong>🎁 積分兌換規則</strong><br />
              5 張 → NT$30 折扣碼　｜　15 張 → 免費電子書一本　｜　30 張 → 👑 認證學員稱號<br />
              <a
                href="https://line.me/R/ti/p/@983agawb"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#7c3aed', fontWeight: 600 }}
              >
                加 LINE 截圖此頁面兌換 →
              </a>
            </div>

            {/* 證書列表 */}
            {certs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '0.88rem' }}>
                此 Email 尚無儲存的證書<br />
                <Link href="/classroom/stock" style={{ color: '#7c3aed', fontSize: '0.82rem' }}>
                  前往股市學院開始上課 →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {certs.map((c, i) => (
                  <div key={i} style={{
                    background: '#fff', border: '1px solid #e8e4ff',
                    borderRadius: '10px', padding: '12px 14px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}>
                    <div style={{ fontSize: '1.4rem' }}>{LESSON_EMOJI[c.lessonId] || '🏅'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.88rem' }}>
                        {c.lessonTitle} — 第 {c.quizIndex + 1} 題
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '0.72rem' }}>
                        {formatDate(c.earnedAt)}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.1rem' }}>🏅</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
