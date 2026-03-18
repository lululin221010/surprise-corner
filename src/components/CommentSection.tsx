'use client';

// CommentSection.tsx — 讀者留言區（無需登入，只需暱稱）
import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  nickname: string;
  petName?: string;
  content: string;
  createdAt: string;
}

interface Props {
  chapterId: string;
  novelId: string;
}

export default function CommentSection({ chapterId, novelId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [nickname, setNickname] = useState('');
  const [petName, setPetName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/comments?chapterId=${encodeURIComponent(chapterId)}`)
      .then((r) => r.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [chapterId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!nickname.trim()) { setError('請填寫暱稱'); return; }
    if (!content.trim()) { setError('請填寫留言內容'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, novelId, nickname, petName, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || '送出失敗，請稍後再試');
      } else {
        setSubmitted(true);
        setNickname('');
        setPetName('');
        setContent('');
      }
    } catch {
      setError('網路錯誤，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }

  return (
    <div style={{
      marginTop: '3rem',
      paddingTop: '2rem',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      fontFamily: 'inherit',
    }}>
      <h3 style={{ color: '#e8c880', fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
        🐾 讀者留言
      </h3>

      {/* 已有留言 */}
      {loading ? (
        <p style={{ color: '#888', fontSize: '0.9rem' }}>載入留言中…</p>
      ) : comments.length === 0 ? (
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          還沒有留言，來第一個分享你的感受吧 🐱
        </p>
      ) : (
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.map((c) => (
            <div key={c._id} style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
              padding: '0.9rem 1.1rem',
              borderLeft: '3px solid rgba(232,200,128,0.4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#e8c880', fontWeight: 600, fontSize: '0.9rem' }}>
                  {c.nickname}
                </span>
                {c.petName && (
                  <span style={{ color: '#b49050', fontSize: '0.78rem' }}>
                    🐾 毛孩：{c.petName}
                  </span>
                )}
                <span style={{ color: '#555', fontSize: '0.75rem', marginLeft: 'auto' }}>
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 留言表單 */}
      {submitted ? (
        <div style={{
          background: 'rgba(232,200,128,0.1)',
          borderRadius: 10,
          padding: '1rem 1.2rem',
          border: '1px solid rgba(232,200,128,0.3)',
          color: '#e8c880',
          fontSize: '0.9rem',
        }}>
          ✅ 留言已送出，待審核後公開顯示！感謝你的分享 🐱
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
                暱稱 <span style={{ color: '#e87070' }}>*</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="你的暱稱"
                maxLength={20}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
                毛孩名字 <span style={{ color: '#888', fontWeight: 400 }}>（選填）</span>
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="你家毛孩的名字"
                maxLength={20}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>
              留言 <span style={{ color: '#e87070' }}>*</span>
              <span style={{ color: '#666', marginLeft: 8 }}>（最多 500 字）</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的感受，或介紹你家毛孩的故事 🐾"
              maxLength={500}
              rows={4}
              style={{
                width: '100%', padding: '0.6rem 0.75rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8, color: '#eee', fontSize: '0.9rem', outline: 'none',
                resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ textAlign: 'right', color: '#555', fontSize: '0.75rem', marginTop: 2 }}>
              {content.length} / 500
            </div>
          </div>

          {error && (
            <p style={{ color: '#e87070', fontSize: '0.85rem', margin: 0 }}>⚠️ {error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              alignSelf: 'flex-start',
              padding: '0.55rem 1.4rem',
              background: submitting ? '#555' : 'linear-gradient(135deg, #b49050, #e8c880)',
              color: '#1a1208',
              border: 'none',
              borderRadius: 8,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            {submitting ? '送出中…' : '🐱 送出留言'}
          </button>

          <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>
            留言將於審核後公開顯示，不需帳號登入。
          </p>
        </form>
      )}
    </div>
  );
}
