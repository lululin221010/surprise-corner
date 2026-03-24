'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  _id: string;
  text: string;
  to: string;
  from: string;
  label: string;
  reply?: string;
  creatorId: string | null;
}

const TABS = [
  { key: 'all',     label: '✨ 全部' },
  { key: '魯魯讀者', label: '📖 魯魯讀者' },
  { key: '連載讀者', label: '📚 連載讀者' },
  { key: 'Podcast', label: '🎵 Podcast 聽眾' },
  { key: '許願牆',  label: '🛠️ 工具許願' },
];

function WallContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const initTab = searchParams.get('tab') || 'all';
  const [activeTab, setActiveTab] = useState(initTab);
  const initLabel = searchParams.get('tab') && searchParams.get('tab') !== 'all' ? searchParams.get('tab')! : '魯魯讀者';
  const initTo = searchParams.get('tab') === '許願牆' ? '工具精靈 🧰' : '';
  const [text, setText] = useState('');
  const [to, setTo] = useState(initTo);
  const [from, setFrom] = useState('');
  const [label, setLabel] = useState(initLabel);
  const [submitting, setSubmitting] = useState(false);

  const LABEL_HINTS: Record<string, { to: string; content: string }> = {
    '魯魯讀者':  { to: '魯魯、未來的自己…', content: '例：魯魯你好可愛！那集「帶魯魯回家」讓我笑了好久，謝謝你出現在我們家 🐱' },
    '連載讀者':  { to: '林必哀、作者…',     content: '例：最後的信號第三章讓我睡不著，那個結尾到底是什麼意思？！等不及下集了' },
    'Podcast':   { to: '主持人、自己…',      content: '例：EP02 副業那集讓我鼓起勇氣開始接案，謝謝你說了那句「不完美也可以開始」' },
    '許願牆':    { to: '工具精靈 🧰',        content: '例：希望下次能加入語音轉文字工具！或是推薦一個可以免費做簡報的 AI？' },
  };
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function loadPosts(tab: string) {
    setLoading(true);
    try {
      const url = tab === 'all' ? '/api/wall' : `/api/wall?label=${encodeURIComponent(tab)}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.map((p: any) => ({
        _id: typeof p._id === 'object' ? p._id.toString() : p._id,
        text: p.text,
        to: p.to || '',
        from: p.from || '',
        label: p.label || '',
        reply: p.reply || '',
        creatorId: p.creatorId,
      })));
    } catch {
      console.error('載入失敗');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPosts(activeTab); }, [activeTab]);

  async function handleSubmit() {
    if (!text.trim() || text.trim().length < 5) {
      setMessage({ type: 'err', text: '內容至少需要 5 個字！' });
      return;
    }
    if (!to.trim()) {
      setMessage({ type: 'err', text: '請填寫寫給誰！' });
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      let creatorId = localStorage.getItem('creatorId');
      if (!creatorId) {
        creatorId = 'cr_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('creatorId', creatorId);
      }
      const res = await fetch('/api/wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), to: to.trim(), from: from.trim(), label, creatorId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: 'err', text: err.error || '送出失敗，請稍後再試' });
        return;
      }
      setMessage({ type: 'ok', text: '✅ 已成功發布到互動牆！' });
      setText('');
      setTo('');
      setFrom('');
      await loadPosts(activeTab);
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
        <h1 style={{
          textAlign: 'center', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #fff, #c4b5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          🔥 今日大家的驚喜
        </h1>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2rem' }}>
          共 {posts.length} 則留言
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: '0.45rem 1.1rem', borderRadius: '30px', fontSize: '0.85rem',
              fontWeight: activeTab === tab.key ? 700 : 400, cursor: 'pointer',
              border: activeTab === tab.key ? '1px solid rgba(167,139,250,0.8)' : '1px solid rgba(167,139,250,0.25)',
              background: activeTab === tab.key ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.key ? '#e9d5ff' : '#9ca3af', transition: 'all 0.2s',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{
          background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(167,139,250,0.3)',
          borderRadius: '18px', padding: '1.5rem', marginBottom: '2rem', backdropFilter: 'blur(10px)',
        }}>
          <h2 style={{ color: '#e9d5ff', fontSize: '1rem', fontWeight: 800, margin: '0 0 1rem' }}>
            ✍️ 留下你的心情或故事
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
            {TABS.filter(t => t.key !== 'all').map(tab => (
              <button key={tab.key} onClick={() => setLabel(tab.key)} style={{
                padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.78rem', cursor: 'pointer',
                border: label === tab.key ? '1px solid rgba(167,139,250,0.8)' : '1px solid rgba(167,139,250,0.25)',
                background: label === tab.key ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.05)',
                color: label === tab.key ? '#e9d5ff' : '#9ca3af', transition: 'all 0.2s',
              }}>
                {tab.label}
              </button>
            ))}
          </div>
          <input value={to} onChange={e => setTo(e.target.value)}
            placeholder={`寫給誰？（必填，例：${LABEL_HINTS[label]?.to || '魯魯、未來的自己…'}）`} maxLength={20}
            style={{
              width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px', padding: '0.7rem 1rem',
              color: '#f3f4f6', fontSize: '0.9rem', outline: 'none', marginBottom: '0.6rem', fontFamily: 'inherit',
            }}
          />
          <input value={from} onChange={e => setFrom(e.target.value)}
            placeholder="你是誰？（選填，空白則匿名）" maxLength={20}
            style={{
              width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px', padding: '0.7rem 1rem',
              color: '#f3f4f6', fontSize: '0.9rem', outline: 'none', marginBottom: '0.6rem', fontFamily: 'inherit',
            }}
          />
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder={LABEL_HINTS[label]?.content || '輸入你想說的話、一段故事、或今天的心情...'} maxLength={300} rows={3}
            style={{
              width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(167,139,250,0.3)', borderRadius: '12px', padding: '0.9rem 1rem',
              color: '#f3f4f6', fontSize: '0.95rem', lineHeight: 1.6, resize: 'none', outline: 'none', fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
            <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>{text.length} / 300 字</span>
            <button onClick={handleSubmit} disabled={submitting} style={{
              background: submitting ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #ec4899)',
              color: '#fff', border: 'none', borderRadius: '30px', padding: '0.6rem 1.8rem',
              fontSize: '0.9rem', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            }}>
              {submitting ? '發布中...' : '🚀 發布'}
            </button>
          </div>
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

        {loading ? (
          <div style={{ textAlign: 'center', color: '#a78bfa', padding: '2rem' }}>載入中...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>這個分類還沒有留言，來第一個吧！</div>
        ) : (
          posts.map(p => (
            <div key={p._id} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(196,181,253,0.2)',
              borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem', backdropFilter: 'blur(10px)',
            }}>
              {p.label && (
                <span style={{
                  fontSize: '0.72rem', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)',
                  borderRadius: '20px', padding: '2px 10px', marginBottom: '0.6rem', display: 'inline-block',
                }}>
                  {TABS.find(t => t.key === p.label)?.label || p.label}
                </span>
              )}
              {p.to && (
                <p style={{ margin: '0.4rem 0 0.2rem', fontSize: '0.82rem', color: '#c4b5fd' }}>
                  寫給：{p.to}{p.from ? `　from：${p.from}` : '　（匿名）'}
                </p>
              )}
              <p style={{ margin: '0.4rem 0 0.8rem', lineHeight: 1.8, fontSize: '1rem' }}>{p.text}</p>
              {p.reply && (
                <div style={{
                  background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.25)',
                  borderRadius: '10px', padding: '0.6rem 0.9rem',
                  borderLeft: '3px solid rgba(167,139,250,0.6)',
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 600 }}>✍️ 站長回覆：</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#d8ccb8', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{p.reply}</p>
                </div>
              )}
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

export default function WallPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', background:'#0f0c29' }} />}>
      <WallContent />
    </Suspense>
  );
}




