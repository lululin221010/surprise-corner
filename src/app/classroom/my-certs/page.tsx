'use client';
// 📄 路徑：src/app/classroom/my-certs/page.tsx
// 三階認證進度 + 金幣查詢

import { useState } from 'react';
import Link from 'next/link';
import '../classroom.css';
import { getAccount, CERT_TIERS } from '../coins';

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

// 舊版 sc_academy_certs 格式（相容讀取）
interface OldCert {
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

export default function MyCertsPage() {
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleQuery() {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      setError('請輸入有效的 Email');
      return;
    }
    setEmail(trimmed);
    setError('');
  }

  const acc = email ? getAccount(email) : null;
  const completedCount = acc?.completedLessons?.length ?? 0;

  // 舊版 certs（相容顯示）
  const oldCerts: OldCert[] = email
    ? (JSON.parse(localStorage?.getItem?.('sc_academy_certs') || '{}')[email] || [])
    : [];

  // 找出最高已達到的 tier
  const earnedTiers = CERT_TIERS.filter(t => completedCount >= t.required);
  const highestTier = earnedTiers[earnedTiers.length - 1] ?? null;
  const nextTier = CERT_TIERS.find(t => completedCount < t.required) ?? null;

  return (
    <div className="classroom-content">
      <div style={{ paddingTop: '1rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.82rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
          <h1 style={{ color: '#1e1b4b', fontSize: '1.5rem', fontWeight: 800, margin: '0.6rem 0 0.2rem' }}>
            🏅 學習認證
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
            每完成一堂課累積進度，解鎖初 / 中 / 高階認證
          </p>
        </div>

        {/* 金幣賺取說明 */}
        <div style={{
          background: '#fef9c3', border: '1px solid #fde68a',
          borderRadius: '10px', padding: '10px 14px', marginBottom: '1.2rem',
          fontSize: '0.78rem', color: '#92400e', lineHeight: 1.8,
        }}>
          🪙 <strong>每堂課最多賺 5 金幣</strong>（不重複計算）<br />
          答對測驗 +1🪙（每題僅首次）｜完課 bonus +2🪙（每堂僅一次）
        </div>

        {/* 查詢框 */}
        <div className="slide-card" style={{ marginBottom: '1.2rem' }}>
          <p style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
            輸入 Email 查詢進度
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
            <button onClick={handleQuery} className="btn-next" style={{ flex: 'none', padding: '10px 20px' }}>
              查詢
            </button>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{error}</p>}
        </div>

        {/* 查詢結果 */}
        {acc && (
          <>
            {/* 金幣 + 最高認證 */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              borderRadius: '14px', padding: '1.2rem 1.4rem',
              marginBottom: '1.2rem',
            }}>
              <div style={{ color: '#e9d5ff', fontSize: '0.72rem', marginBottom: '6px' }}>{email}</div>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem' }}>
                    {acc.coins} 🪙
                  </div>
                  <div style={{ color: '#c4b5fd', fontSize: '0.72rem' }}>累積金幣</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', alignSelf: 'stretch' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>
                    {completedCount} 堂課
                  </div>
                  <div style={{ color: '#c4b5fd', fontSize: '0.72rem' }}>已完成</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', alignSelf: 'stretch' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
                    {highestTier ? `${highestTier.emoji} ${highestTier.label}` : '尚未取得'}
                  </div>
                  <div style={{ color: '#c4b5fd', fontSize: '0.72rem' }}>最高認證</div>
                </div>
              </div>
            </div>

            {/* 三階進度條 */}
            <div style={{ marginBottom: '1.2rem' }}>
              {CERT_TIERS.map((tier, idx) => {
                const earned = completedCount >= tier.required;
                const prev = idx === 0 ? 0 : CERT_TIERS[idx - 1].required;
                const range = tier.required - prev;
                const current = Math.min(Math.max(completedCount - prev, 0), range);
                const pct = Math.round((current / range) * 100);

                return (
                  <div key={tier.key} style={{
                    background: earned ? '#faf5ff' : '#f9fafb',
                    border: `1px solid ${earned ? '#c4b5fd' : '#e5e7eb'}`,
                    borderRadius: '12px', padding: '1rem 1.2rem',
                    marginBottom: '0.6rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '1.2rem' }}>{tier.emoji}</span>
                        <span style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.9rem' }}>{tier.label}</span>
                        {earned && (
                          <span style={{
                            background: '#7c3aed', color: '#fff',
                            fontSize: '0.65rem', padding: '1px 7px',
                            borderRadius: '10px', fontWeight: 700,
                          }}>已取得</span>
                        )}
                      </div>
                      <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        {Math.min(current, range)} / {range} 堂
                      </span>
                    </div>

                    {/* 進度條 */}
                    <div style={{ height: '6px', background: '#e8e4ff', borderRadius: '3px', marginBottom: '0.4rem' }}>
                      <div style={{
                        height: '6px', borderRadius: '3px',
                        background: earned ? '#7c3aed' : '#a78bfa',
                        width: `${pct}%`,
                        transition: 'width 0.4s',
                      }} />
                    </div>

                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{tier.description}</div>

                    {/* 當前目標提示 */}
                    {!earned && tier === nextTier && (
                      <div style={{
                        marginTop: '0.5rem',
                        background: '#f0f9ff', border: '1px solid #bae6fd',
                        borderRadius: '6px', padding: '5px 10px',
                        fontSize: '0.72rem', color: '#0369a1',
                      }}>
                        ← 目前目標：還差 {tier.required - completedCount} 堂課解鎖
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 完成的課程列表 */}
            {acc.completedLessons.length > 0 && (
              <>
                <p style={{ color: '#a78bfa', fontSize: '0.72rem', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.6rem' }}>
                  已完成課程
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  {acc.completedLessons.map((lessonId) => (
                    <div key={lessonId} style={{
                      background: '#fff', border: '1px solid #e8e4ff',
                      borderRadius: '10px', padding: '10px 14px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                      <span style={{ fontSize: '1.3rem' }}>{LESSON_EMOJI[lessonId] || '📚'}</span>
                      <span style={{ color: '#1e1b4b', fontSize: '0.88rem', fontWeight: 600 }}>
                        {lessonId === 'kline' ? 'K線解密' : lessonId === 'volume' ? '成交量的秘密' : lessonId === 'ma' ? '均線與趨勢' : lessonId}
                      </span>
                      <span style={{ marginLeft: 'auto', color: '#7c3aed', fontSize: '0.75rem' }}>✅ 完成</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 稱號 */}
            {acc.earnedTitles.length > 0 && (
              <div style={{
                background: '#fef9c3', border: '1px solid #fde68a',
                borderRadius: '10px', padding: '10px 14px', marginBottom: '1.2rem',
                fontSize: '0.82rem', color: '#92400e',
              }}>
                🏷️ 已解鎖稱號：{acc.earnedTitles.join('、')}
                {acc.equippedTitle && ` ｜ 使用中：${acc.equippedTitle}`}
              </div>
            )}

            {/* 高階認證 LINE 兌換 */}
            {highestTier && (
              <div style={{
                background: '#faf5ff', border: '1px solid #c4b5fd',
                borderRadius: '10px', padding: '12px 14px', marginBottom: '1.5rem',
                fontSize: '0.78rem', color: '#4c1d95', lineHeight: 1.7,
              }}>
                <strong>🎁 實體兌換</strong><br />
                取得中階以上認證，可加 LINE 截圖兌換小舖專屬福利<br />
                <a
                  href="https://line.me/R/ti/p/@983agawb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#7c3aed', fontWeight: 600 }}
                >
                  加 LINE 截圖此頁面兌換 →
                </a>
              </div>
            )}

            {/* 空狀態 */}
            {completedCount === 0 && (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: '#9ca3af', fontSize: '0.88rem' }}>
                尚未完成任何課程<br />
                <Link href="/classroom/stock" style={{ color: '#7c3aed', fontSize: '0.82rem' }}>
                  前往理財書院 › 台股系列開始上課 →
                </Link>
              </div>
            )}
          </>
        )}

        {/* 前往商店 */}
        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
          <Link href="/classroom/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#fef9c3', border: '1px solid #fde68a',
            borderRadius: '20px', padding: '8px 18px',
            color: '#92400e', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600,
          }}>
            🛒 用金幣兌換道具
          </Link>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
            ← 回驚喜學院
          </Link>
        </div>

      </div>
    </div>
  );
}
