'use client';
// 📄 src/app/chat/lulu/page.tsx

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_USER_MSGS = 20;

export default function LuluChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好。我在這裡。\n\n有什麼想說的嗎？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dailyBlocked, setDailyBlocked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const userMsgCount = messages.filter(m => m.role === 'user').length;
  const isLimitReached = userMsgCount >= MAX_USER_MSGS;
  const isNearLimit = userMsgCount >= 15 && !isLimitReached;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading || isLimitReached || dailyBlocked) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, character: 'lulu' }),
      });
      if (res.status === 429) {
        setDailyBlocked(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '……好像出了一點問題。你等我一下。' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0c1a', display: 'flex', flexDirection: 'column' }}>

      {/* 背景 */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(15,12,26,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(139,92,246,0.2)',
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', boxShadow: '0 0 20px rgba(124,58,237,0.5)',
        }}>🐱</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>默默</div>
          <div style={{ color: '#a78bfa', fontSize: '0.75rem' }}>一隻記住你每句話的 AI</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <a href="/novels/lulu-diary" style={{
            background: 'rgba(124,58,237,0.25)',
            border: '1px solid rgba(167,139,250,0.35)',
            color: '#e9d5ff', padding: '0.4rem 1rem', borderRadius: '20px',
            fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600,
          }}>📖 看小說</a>
        </div>
      </div>

      {/* 對話區 */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '1.5rem 1rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        maxWidth: '680px', width: '100%', margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', marginRight: '0.6rem', alignSelf: 'flex-end',
              }}>🐱</div>
            )}
            <div style={{
              maxWidth: '75%',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg,#7c3aed,#6d28d9)'
                : 'rgba(255,255,255,0.07)',
              border: msg.role === 'user'
                ? 'none'
                : '1px solid rgba(167,139,250,0.2)',
              color: '#f3f4f6',
              padding: '0.75rem 1rem',
              borderRadius: msg.role === 'user'
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              fontSize: '0.9rem', lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              boxShadow: msg.role === 'user' ? '0 4px 16px rgba(124,58,237,0.3)' : 'none',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
            }}>🐱</div>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(167,139,250,0.2)',
              padding: '0.75rem 1rem', borderRadius: '18px 18px 18px 4px',
              display: 'flex', gap: '4px', alignItems: 'center',
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#a78bfa',
                  animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 引流卡片 */}
      <div style={{
        maxWidth: '680px', width: '100%', margin: '0 auto',
        padding: '0 1rem', position: 'relative', zIndex: 1,
      }}>
        <a href="https://still-time-corner.vercel.app" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(168,85,247,0.1))',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '12px', padding: '0.8rem 1.2rem',
            textDecoration: 'none', marginBottom: '0.8rem',
          }}>
          <span style={{ color: '#e9d5ff', fontSize: '0.82rem' }}>
            📖 想知道默默的完整故事？
          </span>
          <span style={{ color: '#a78bfa', fontSize: '0.82rem', fontWeight: 700 }}>
            前往小舖 →
          </span>
        </a>
      </div>

      {/* 輸入區 */}
      <div style={{
        position: 'sticky', bottom: 0, zIndex: 10,
        background: 'rgba(15,12,26,0.9)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(139,92,246,0.2)',
        padding: '1rem',
      }}>
        {dailyBlocked ? (
          <div style={{
            maxWidth: '680px', margin: '0 auto',
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: '12px', padding: '0.9rem 1.2rem',
            textAlign: 'center',
          }}>
            <p style={{ color: '#a78bfa', fontSize: '0.88rem', margin: '0 0 0.4rem' }}>
              ……今天我們說了太多了。明天再繼續吧。
            </p>
            <p style={{ color: '#4b5563', fontSize: '0.75rem', margin: 0 }}>
              每日上限為 3 次對話，明天台灣時間 00:00 重置
            </p>
          </div>
        ) : isLimitReached ? (
          <div style={{
            maxWidth: '680px', margin: '0 auto',
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: '12px', padding: '0.9rem 1.2rem',
            textAlign: 'center',
          }}>
            <p style={{ color: '#a78bfa', fontSize: '0.88rem', margin: '0 0 0.4rem' }}>
              ……我需要安靜一下了。我們今天說了很多。
            </p>
            <p style={{ color: '#4b5563', fontSize: '0.75rem', margin: 0 }}>
              重新整理頁面可開始新的對話
            </p>
          </div>
        ) : (
          <>
          {isNearLimit && (
            <p style={{
              maxWidth: '680px', margin: '0 auto 0.5rem',
              color: '#a78bfa', fontSize: '0.75rem', textAlign: 'center', opacity: 0.7,
            }}>
              🐾 還剩 {MAX_USER_MSGS - userMsgCount} 則
            </p>
          )}
          <div style={{
            maxWidth: '680px', margin: '0 auto',
            display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
              placeholder="跟默默說說話…"
              rows={1}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: '14px', padding: '0.75rem 1rem',
                color: '#f3f4f6', fontSize: '0.9rem', resize: 'none',
                outline: 'none', lineHeight: 1.5,
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                background: loading || !input.trim()
                  ? 'rgba(124,58,237,0.3)'
                  : 'linear-gradient(135deg,#7c3aed,#a855f7)',
                color: '#fff', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(124,58,237,0.4)',
                flexShrink: 0,
              }}
            >↑</button>
          </div>
          </>
        )}
        <p style={{ color: '#4b5563', fontSize: '0.72rem', textAlign: 'center', margin: '0.5rem 0 0' }}>
          默默是虛構角色，來自小說《默默的日記》
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}