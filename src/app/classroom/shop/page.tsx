'use client';
// 📄 路徑：src/app/classroom/shop/page.tsx
// 驚喜學院商店 — 金幣兌換虛擬道具

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../classroom.css';
import {
  getCurrentEmail, setCurrentEmail,
  getAccount, spendCoins, addInventory,
  generateDiscountCode, unlockCard, addTitle,
  SHOP_ITEMS, AVAILABLE_TITLES,
  type UserAccount,
} from '../coins';

export default function ShopPage() {
  const [email, setEmailState] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [msg, setMsg] = useState<{ id: string; text: string; ok: boolean } | null>(null);
  const [chosenTitle, setChosenTitle] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    const saved = getCurrentEmail();
    if (saved) {
      setEmailState(saved);
      setAccount(getAccount(saved));
    }
  }, []);

  function handleLogin() {
    const trimmed = inputEmail.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      setMsg({ id: '__login', text: '請輸入有效的 Email', ok: false });
      return;
    }
    setCurrentEmail(trimmed);
    setEmailState(trimmed);
    const acc = getAccount(trimmed);
    setAccount(acc);
    setMsg(null);
    setInputEmail('');
  }

  function refresh() {
    if (email) setAccount(getAccount(email));
  }

  function showMsg(id: string, text: string, ok: boolean) {
    setMsg({ id, text, ok });
    setTimeout(() => setMsg(null), 3500);
  }

  function handleBuy(itemId: string) {
    if (!email) return;
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    // 稱號需先選
    if (itemId === 'title' && !chosenTitle) {
      showMsg(itemId, '請先選擇一個稱號', false);
      return;
    }

    const ok = spendCoins(email, item.price);
    if (!ok) {
      showMsg(itemId, `金幣不足，需要 ${item.price} 🪙`, false);
      return;
    }

    // 各商品效果
    if (itemId === 'energyDrink') {
      addInventory(email, 'energyDrink');
      showMsg(itemId, '☕ 已加入庫存！答錯時可使用', true);
    } else if (itemId === 'bookmark') {
      addInventory(email, 'bookmark');
      showMsg(itemId, '📌 書籤已加入！課程中可使用', true);
    } else if (itemId === 'discountCode') {
      const code = generateDiscountCode(email);
      setGeneratedCode(code);
      showMsg(itemId, `🎁 折扣碼已生成：${code}`, true);
    } else if (itemId === 'card') {
      unlockCard(email);
      showMsg(itemId, '🎨 學院名片已解鎖！前往「我的證書」查看', true);
    } else if (itemId === 'title') {
      addTitle(email, chosenTitle);
      showMsg(itemId, `🏷️ 稱號「${chosenTitle}」已解鎖！`, true);
    }

    refresh();
  }

  const coins = account?.coins ?? 0;
  const inv = account?.inventory ?? { energyDrink: 0, bookmark: 0 };

  return (
    <div className="classroom-content">
      <div style={{ paddingTop: '1rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.82rem', textDecoration: 'none' }}>
            ← 回驚喜學院
          </Link>
          <h1 style={{ color: '#1e1b4b', fontSize: '1.5rem', fontWeight: 800, margin: '0.6rem 0 0.2rem' }}>
            🛒 學院商店
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
            用答題賺來的金幣兌換學習道具
          </p>
        </div>

        {/* 金幣說明 */}
        <div style={{
          background: '#fef9c3', border: '1px solid #fde68a',
          borderRadius: '10px', padding: '10px 14px', marginBottom: '1.2rem',
          fontSize: '0.78rem', color: '#92400e', lineHeight: 1.7,
        }}>
          🪙 <strong>如何賺金幣？</strong><br />
          答對測驗題 +1🪙　｜　完成整堂課 +3🪙 bonus
        </div>

        {/* 登入 / 帳號狀態 */}
        {!email ? (
          <div className="slide-card" style={{ marginBottom: '1.2rem' }}>
            <p style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
              請輸入 Email 查看帳號
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: '10px 12px', fontSize: '0.9rem',
                  border: '1px solid #c7d2fe', borderRadius: '8px',
                  outline: 'none', color: '#1e1b4b',
                }}
              />
              <button onClick={handleLogin} className="btn-next" style={{ flex: 'none', padding: '10px 20px' }}>
                進入
              </button>
            </div>
            {msg?.id === '__login' && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{msg.text}</p>
            )}
          </div>
        ) : (
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            borderRadius: '14px', padding: '1rem 1.4rem',
            marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <div style={{ fontSize: '2rem' }}>🪙</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#e9d5ff', fontSize: '0.72rem', marginBottom: '2px' }}>{email}</div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem' }}>{coins} 金幣</div>
              <div style={{ color: '#c4b5fd', fontSize: '0.72rem' }}>
                庫存：☕×{inv.energyDrink}　📌×{inv.bookmark}
              </div>
            </div>
            <button
              onClick={() => { setEmailState(''); setAccount(null); }}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                color: '#e9d5ff', fontSize: '0.72rem', borderRadius: '6px',
                padding: '4px 10px', cursor: 'pointer',
              }}
            >
              切換
            </button>
          </div>
        )}

        {/* 商品列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {SHOP_ITEMS.map(item => (
            <div key={item.id} className="slide-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '2px' }}>
                    {item.name}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.8rem' }}>
                  <div style={{ color: '#7c3aed', fontWeight: 800, fontSize: '1rem' }}>
                    {item.price} 🪙
                  </div>
                </div>
              </div>

              {/* 稱號選擇器 */}
              {item.id === 'title' && email && (
                <select
                  value={chosenTitle}
                  onChange={e => setChosenTitle(e.target.value)}
                  style={{
                    padding: '7px 10px', fontSize: '0.82rem',
                    border: '1px solid #c7d2fe', borderRadius: '8px',
                    color: '#1e1b4b', background: '#faf5ff',
                  }}
                >
                  <option value="">── 選擇稱號 ──</option>
                  {AVAILABLE_TITLES.map(t => (
                    <option key={t} value={t}
                      disabled={account?.earnedTitles?.includes(t)}
                    >
                      {t}{account?.earnedTitles?.includes(t) ? ' ✅ 已擁有' : ''}
                    </option>
                  ))}
                </select>
              )}

              {/* 已生成折扣碼顯示 */}
              {item.id === 'discountCode' && generatedCode && (
                <div style={{
                  background: '#f0fdf4', border: '1px dashed #86efac',
                  borderRadius: '8px', padding: '8px 12px',
                  fontSize: '0.82rem', color: '#15803d',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{generatedCode}</span>
                  <span style={{ color: '#6b7280', fontSize: '0.72rem' }}>— 加 LINE 出示截圖兌換</span>
                </div>
              )}

              {/* 購買按鈕 + 訊息 */}
              {email && (
                <div>
                  {msg?.id === item.id && (
                    <div style={{
                      fontSize: '0.78rem', marginBottom: '6px', padding: '6px 10px',
                      borderRadius: '6px',
                      background: msg.ok ? '#f0fdf4' : '#fef2f2',
                      color: msg.ok ? '#15803d' : '#dc2626',
                    }}>
                      {msg.text}
                    </div>
                  )}
                  <button
                    onClick={() => handleBuy(item.id)}
                    style={{
                      width: '100%',
                      padding: '9px',
                      background: coins >= item.price ? '#7c3aed' : '#e5e7eb',
                      color: coins >= item.price ? '#fff' : '#9ca3af',
                      border: 'none', borderRadius: '9px',
                      fontSize: '0.85rem', fontWeight: 600, cursor: coins >= item.price ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {coins >= item.price ? `購買 ${item.price} 🪙` : `金幣不足（需 ${item.price}）`}
                  </button>
                </div>
              )}

              {!email && (
                <div style={{ color: '#a78bfa', fontSize: '0.78rem' }}>↑ 請先輸入 Email 登入</div>
              )}
            </div>
          ))}
        </div>

        {/* 前往賺金幣 */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Link href="/classroom/stock" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#faf5ff', border: '1px solid #c4b5fd',
            borderRadius: '20px', padding: '8px 18px',
            color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600,
          }}>
            📈 去股市學院賺金幣
          </Link>
        </div>

        {/* 返回 */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
            ← 回驚喜學院
          </Link>
        </div>

      </div>
    </div>
  );
}
