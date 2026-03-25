'use client';

// WallPostForm.tsx — 精簡留言表單，發布到互動牆 /wall
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  label: string;          // 'lulu-life' → '魯魯讀者'，其他 → '連載讀者'
  defaultTo?: string;     // 預填「寫給」，如 '魯魯'
}

const LOCKED_TO: Record<string, string> = {
  '魯魯讀者': '魯魯一家',
  '連載讀者': '兔崽子',
  'Podcast':  '小舖',
};

export default function WallPostForm({ label, defaultTo = '' }: Props) {
  const lockedTo = LOCKED_TO[label] ?? null;
  const [to, setTo]         = useState(lockedTo || defaultTo);
  const [from, setFrom]     = useState('');
  const [text, setText]     = useState('');
  const [petName, setPetName] = useState('');
  const [isStory, setIsStory] = useState(false);
  const [isBookWish, setIsBookWish] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!to.trim())   { setError('請填寫寫給誰'); return; }
    if (!text.trim() || text.trim().length < 5) { setError('內容至少 5 個字'); return; }

    setSubmitting(true);
    try {
      let creatorId = typeof window !== 'undefined' ? localStorage.getItem('creatorId') : null;
      if (!creatorId) {
        creatorId = 'cr_' + Math.random().toString(36).substring(2, 10);
        if (typeof window !== 'undefined') localStorage.setItem('creatorId', creatorId);
      }
      const res = await fetch('/api/wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), to: to.trim(), from: from.trim(), petName: petName.trim() || undefined, isStory: isStory || undefined, isBookWish: isBookWish || undefined, label, creatorId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || '送出失敗，請稍後再試');
        return;
      }
      setDone(true);
    } catch {
      setError('網路錯誤，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={{
        marginTop: '3rem', padding: '1.5rem',
        border: '1px solid rgba(180,144,80,0.25)',
        borderRadius: '8px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>🐾</div>
        <p style={{ color: '#e8c880', fontWeight: 600, margin: '0 0 0.5rem', fontSize: '0.95rem' }}>
          已發布到互動牆！
        </p>
        <Link
          href="/wall"
          style={{
            display: 'inline-block', marginTop: '0.5rem',
            color: '#b49050', fontSize: '0.85rem', textDecoration: 'underline',
            letterSpacing: '0.05em',
          }}
        >
          前往互動牆查看 →
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      marginTop: '3rem',
      paddingTop: '2rem',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <h3 style={{
        color: '#e8c880', fontSize: '1rem',
        fontWeight: 400, letterSpacing: '0.12em',
        marginBottom: '1.2rem',
      }}>
        🐾 留下你的話，發布到互動牆
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>

        {/* 寫給 + 你是誰 */}
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          {!lockedTo && (
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#7a6a58', fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>
                寫給誰 <span style={{ color: '#e87070' }}>*</span>
              </label>
              <input
                type="text" value={to} onChange={e => setTo(e.target.value)}
                placeholder="魯魯、未來的自己…" maxLength={20}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(180,144,80,0.2)',
                  borderRadius: 6, color: '#d8ccb8', fontSize: '0.9rem', outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          )}
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ color: '#7a6a58', fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>
              你是誰 <span style={{ color: '#555', fontWeight: 400 }}>（選填）</span>
            </label>
            <input
              type="text" value={from} onChange={e => setFrom(e.target.value)}
              placeholder="留空則匿名" maxLength={20}
              style={{
                width: '100%', padding: '0.5rem 0.75rem', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(180,144,80,0.2)',
                borderRadius: 6, color: '#d8ccb8', fontSize: '0.9rem', outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* 魯魯讀者：毛孩名字 */}
        {label === '魯魯讀者' && (
          <input
            type="text" value={petName} onChange={e => setPetName(e.target.value)}
            placeholder="🐾 你家毛孩叫什麼名字？（選填）" maxLength={20}
            style={{
              width: '100%', padding: '0.5rem 0.75rem', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(180,144,80,0.2)',
              borderRadius: 6, color: '#d8ccb8', fontSize: '0.9rem', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        )}

        {/* 連載讀者：故事分享 + 書型許願（互斥） */}
        {label === '連載讀者' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox" checked={isStory} onChange={e => { setIsStory(e.target.checked); if (e.target.checked) setIsBookWish(false); }}
                style={{ width: 15, height: 15, accentColor: '#b49050', cursor: 'pointer' }}
              />
              <span style={{ color: '#a09070', fontSize: '0.83rem' }}>📖 我有個小故事想分享給 Surprise Corner 的朋友</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox" checked={isBookWish} onChange={e => { setIsBookWish(e.target.checked); if (e.target.checked) setIsStory(false); }}
                style={{ width: 15, height: 15, accentColor: '#b49050', cursor: 'pointer' }}
              />
              <span style={{ color: '#a09070', fontSize: '0.83rem' }}>📚 許願下一本想看的書型（心理／愛情／懸疑...）</span>
            </label>
          </div>
        )}

        {/* 內容 */}
        <div>
          <label style={{ color: '#7a6a58', fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>
            想說的話 <span style={{ color: '#e87070' }}>*</span>
          </label>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder={isStory ? '例：最後的信號第三章讓我睡不著，那個結尾到底是什麼意思？！等不及下集了' : isBookWish ? '例：希望下一本是懸疑驚悚！或是溫暖的家庭故事也好～' : '分享你的感受、今天的心情，或是對故事的想法…'} maxLength={300} rows={3}
            style={{
              width: '100%', padding: '0.6rem 0.75rem', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(180,144,80,0.2)',
              borderRadius: 6, color: '#d8ccb8', fontSize: '0.9rem', outline: 'none',
              resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit',
            }}
          />
          <div style={{ textAlign: 'right', color: '#4a3a2a', fontSize: '0.73rem', marginTop: 2 }}>
            {text.length} / 300
          </div>
        </div>

        {error && (
          <p style={{ color: '#e87070', fontSize: '0.82rem', margin: 0 }}>⚠️ {error}</p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="submit" disabled={submitting}
            style={{
              padding: '0.5rem 1.4rem',
              background: submitting ? '#333' : 'linear-gradient(135deg, rgba(180,144,80,0.4), rgba(180,100,80,0.3))',
              border: '1px solid rgba(180,144,80,0.4)',
              color: '#e8c880', borderRadius: 6, fontSize: '0.88rem',
              fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', letterSpacing: '0.05em',
              transition: 'all 0.2s',
            }}
          >
            {submitting ? '送出中…' : '🚀 發布到互動牆'}
          </button>
          <Link
            href="/wall"
            style={{ color: '#4a3a2a', fontSize: '0.78rem', textDecoration: 'none', letterSpacing: '0.05em' }}
          >
            查看互動牆 →
          </Link>
        </div>

      </form>
    </div>
  );
}
