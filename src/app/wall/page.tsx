'use client';
// 📁 路徑：src/app/wall/page.tsx
// 修復：加入新增留言表單 + 即時更新（不需重新整理）

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  text: string;
  creatorId: string | null;
}

export default function WallPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // 取得所有作品
  async function loadPosts() {
    try {
      const res = await fetch('/api/wall');
      const data = await res.json();
      setPosts(data.map((p: { _id: { toString(): string } | string; text: string; creatorId: string | null }) => ({
        _id: typeof p._id === 'object' ? p._id.toString() : p._id,
        text: p.text,
        creatorId: p.creatorId,
      })));
    } catch {
      console.error('載入失敗');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPosts(); }, []);

  // 送出新留言
  async function handleSubmit() {
    if (!text.trim() || text.trim().length < 5) {
      setMessage({ type: 'err', text: '內容至少需要 5 個字！' });
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      // 取得或建立 creatorId
      let creatorId = localStorage.getItem('creatorId');
      if (!creatorId) {
        creatorId = 'cr_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('creatorId', creatorId);
      }
      const res = await fetch('/api/wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), creatorId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: 'err', text: err.error || '送出失敗，請稍後再試' });
        return;
      }
      setMessage({ type: 'ok', text: '✅ 已成功發布到作品牆！' });
      setText('');
      await loadPosts(); // 即時更新列表
    } catch {
      setMessage({ type: 'err', text: '網路錯誤，請稍後再試' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1040 100%)',
      color: '#fff', padding: '3rem 1rem',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* 標題 */}
        <h1 style={{
          textAlign: 'center', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #fff, #c4b5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          🔥 今日大家的驚喜
        </h1>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2rem' }}>
          共 {posts.length} 件作品
        </p>

        {/* ✅ 新增留言區塊 */}
        <div style={{
          background: 'rgba(124,58,237,0.12)',
          border: '1px solid rgba(167,139,250,0.3)',
          borderRadius: '18px', padding: '1.5rem', marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
        }}>
          <h2 style={{ color: '#e9d5ff', fontSize: '1rem', fontWeight: 800, margin: '0 0 1rem' }}>
            ✍️ 留下你的心情或故事
          </h2>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="輸入你想說的話、一段故事、或今天的心情..."
            maxLength={300}
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: '12px', padding: '0.9rem 1rem',
              color: '#f3f4f6', fontSize: '0.95rem', lineHeight: 1.6,
              resize: 'none', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
            <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>
              {text.length} / 300 字
            </span>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                background: submitting ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #ec4899)',
                color: '#fff', border: 'none', borderRadius: '30px',
                padding: '0.6rem 1.8rem', fontSize: '0.9rem', fontWeight: 700,
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {submitting ? '發布中...' : '🚀 發布'}
            </button>
          </div>

          {/* 回應訊息 */}
          {message && (
            <div style={{
              marginTop: '0.8rem', padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.88rem',
              background: message.type === 'ok' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${message.type === 'ok' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
              color: message.type === 'ok' ? '#6ee7b7' : '#fca5a5',
            }}>
              {message.text}
            </div>
          )}
        </div>

        {/* 作品列表 */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '2rem' }}>載入中...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>還沒有作品，來第一個留言吧！</div>
        ) : (
          posts.map(p => (
            <div key={p._id} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(196,181,253,0.2)',
              borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem',
              backdropFilter: 'blur(10px)',
            }}>
              <p style={{ margin: '0 0 1rem', lineHeight: 1.8, fontSize: '1rem' }}>{p.text}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href={`/wall/${p._id}`} style={{ color: '#a78bfa', fontSize: '0.85rem' }}>查看作品 →</Link>
                {p.creatorId && (
                  <Link href={`/creator/${p.creatorId}`} style={{ color: '#f472b6', fontSize: '0.85rem' }}>作者頁 →</Link>
                )}
              </div>
            </div>
          ))
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/random" style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff',
            padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 700,
          }}>
            🎲 看下一個驚喜
          </Link>
        </div>

      </div>
    </main>
  );
}