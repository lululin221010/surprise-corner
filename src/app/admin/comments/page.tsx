'use client';

// 後台留言管理頁 /admin/comments
import { useEffect, useState } from 'react';

interface Comment {
  _id: string;
  chapterId: string;
  novelId: string;
  nickname: string;
  petName?: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

type FilterType = 'false' | 'true' | 'all';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('false');
  const [actionMsg, setActionMsg] = useState('');

  async function fetchComments(f: FilterType) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments?approved=${f}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchComments(filter); }, [filter]);

  async function approve(id: string) {
    await fetch('/api/admin/comments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved: true }),
    });
    setActionMsg('✅ 已核准');
    setTimeout(() => setActionMsg(''), 2000);
    fetchComments(filter);
  }

  async function reject(id: string) {
    await fetch('/api/admin/comments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved: false }),
    });
    setActionMsg('⬇️ 已取消核准');
    setTimeout(() => setActionMsg(''), 2000);
    fetchComments(filter);
  }

  async function remove(id: string) {
    if (!confirm('確定刪除這則留言？')) return;
    await fetch('/api/admin/comments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setActionMsg('🗑 已刪除');
    setTimeout(() => setActionMsg(''), 2000);
    fetchComments(filter);
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  }

  const btnStyle = (active: boolean) => ({
    padding: '6px 16px',
    borderRadius: 6,
    border: '1px solid',
    cursor: 'pointer',
    fontSize: '0.82rem',
    background: active ? '#4a3a2a' : 'transparent',
    borderColor: active ? '#b49050' : '#444',
    color: active ? '#e8c880' : '#888',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0c0b08', color: '#d8ccb8', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h1 style={{ color: '#e8c880', fontSize: '1.3rem', marginBottom: '0.5rem' }}>🐾 留言管理</h1>
        <p style={{ color: '#666', fontSize: '0.82rem', marginBottom: '1.5rem' }}>審核讀者留言，通過後才會公開顯示</p>

        {/* 篩選按鈕 */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['false', 'true', 'all'] as FilterType[]).map((f) => (
            <button key={f} style={btnStyle(filter === f)} onClick={() => setFilter(f)}>
              {f === 'false' ? '⏳ 待審核' : f === 'true' ? '✅ 已核准' : '📋 全部'}
            </button>
          ))}
        </div>

        {actionMsg && (
          <div style={{ background: 'rgba(232,200,128,0.1)', border: '1px solid rgba(232,200,128,0.3)', borderRadius: 8, padding: '0.5rem 1rem', marginBottom: '1rem', color: '#e8c880', fontSize: '0.85rem' }}>
            {actionMsg}
          </div>
        )}

        {loading ? (
          <p style={{ color: '#666' }}>載入中…</p>
        ) : comments.length === 0 ? (
          <p style={{ color: '#666' }}>
            {filter === 'false' ? '目前沒有待審核的留言 🎉' : '沒有留言'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map((c) => (
              <div key={c._id} style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 10,
                padding: '1rem 1.2rem',
                borderLeft: `3px solid ${c.approved ? 'rgba(80,200,120,0.5)' : 'rgba(232,200,128,0.4)'}`,
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#e8c880', fontWeight: 600 }}>{c.nickname}</span>
                  {c.petName && <span style={{ color: '#b49050', fontSize: '0.8rem' }}>🐾 {c.petName}</span>}
                  <span style={{ color: '#555', fontSize: '0.75rem' }}>{formatDate(c.createdAt)}</span>
                  <span style={{ color: '#666', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>
                    {c.chapterId}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: c.approved ? '#50c878' : '#e8a050' }}>
                    {c.approved ? '✅ 已核准' : '⏳ 待審核'}
                  </span>
                </div>

                <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 0.75rem', whiteSpace: 'pre-wrap' }}>
                  {c.content}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {!c.approved && (
                    <button
                      onClick={() => approve(c._id)}
                      style={{ padding: '4px 14px', background: 'rgba(80,200,120,0.15)', border: '1px solid rgba(80,200,120,0.4)', borderRadius: 6, color: '#50c878', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      ✅ 核准
                    </button>
                  )}
                  {c.approved && (
                    <button
                      onClick={() => reject(c._id)}
                      style={{ padding: '4px 14px', background: 'rgba(232,160,80,0.1)', border: '1px solid rgba(232,160,80,0.35)', borderRadius: 6, color: '#e8a050', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      ↩️ 取消核准
                    </button>
                  )}
                  <button
                    onClick={() => remove(c._id)}
                    style={{ padding: '4px 14px', background: 'rgba(200,80,80,0.1)', border: '1px solid rgba(200,80,80,0.3)', borderRadius: 6, color: '#c85050', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    🗑 刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
