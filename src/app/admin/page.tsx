'use client';
// 📄 檔案路徑：src/app/admin/page.tsx
// 功能：管理後台（Email一次性連結登入 or 帳號密碼登入，伺服器端admin_token cookie驗證）

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CSSProperties } from 'react';

const TYPES = ['每日名言', '有趣冷知識', '今日小挑戰', '療癒小故事', 'AI科技趣聞', '生活小技巧'];

function AdminContent() {
  const searchParams = useSearchParams();
  const [checkingSession, setCheckingSession] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerSent, setOwnerSent] = useState(false);
  const [ownerError, setOwnerError] = useState('');
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '每日名言',
    message: '',
    toolUrl: '',
  });
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch('/api/admin/check-session')
      .then(res => res.json())
      .then(data => setAuthed(!!data.authed))
      .catch(() => setAuthed(false))
      .finally(() => setCheckingSession(false));
  }, []);

  useEffect(() => {
    if (searchParams.get('ownerError') === '1') {
      setOwnerError('驗證連結無效或已過期，請重新申請。');
    }
  }, [searchParams]);

  const handleLogin = async () => {
    setPwLoading(true);
    setPwError(false);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwInput }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthed(true);
      } else {
        setPwError(true);
        setPwInput('');
      }
    } catch {
      setPwError(true);
    } finally {
      setPwLoading(false);
    }
  };

  const handleOwnerLogin = async () => {
    setOwnerError('');
    setOwnerLoading(true);
    try {
      const res = await fetch('/api/admin/owner-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ownerEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setOwnerSent(true);
      } else {
        setOwnerError(data.error || 'Email 不符合，無法登入');
      }
    } catch {
      setOwnerError('登入時發生錯誤');
    } finally {
      setOwnerLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthed(false);
  };

  const handleSubmit = async () => {
    if (!form.message.trim()) {
      setStatus('error');
      setResult('請填寫驚喜內容！');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/surprise/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: form.date, type: form.type, message: form.message, toolUrl: form.toolUrl || null }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setResult(`✅ ${form.date} 的「${form.type}」${data.message}！`);
        setForm(f => ({ ...f, message: '', toolUrl: '' }));
      } else {
        setStatus('error');
        setResult(`❌ 失敗：${data.error}`);
      }
    } catch {
      setStatus('error');
      setResult('❌ 網路錯誤');
    }
  };

  const inputStyle: CSSProperties = {
    width: '100%', background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px',
    color: '#fff', padding: '0.7rem 1rem', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
  };

  if (checkingSession) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>載入中…</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '380px', border: '1px solid rgba(167,139,250,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem' }}>管理後台</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1.5rem' }}>用 Email 收登入連結，或用密碼進入</p>

          {ownerSent ? (
            <div style={{ marginBottom: '1.5rem', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7', padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
              📬 驗證信已寄出，請至信箱點擊連結完成登入（10分鐘內有效）
            </div>
          ) : (
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <input type="email" value={ownerEmail}
                onChange={e => setOwnerEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleOwnerLogin()}
                placeholder="輸入你的 Email"
                disabled={ownerLoading}
                style={{ ...inputStyle, marginBottom: '0.6rem' }} />
              <button onClick={handleOwnerLogin} disabled={ownerLoading || !ownerEmail}
                style={{ width: '100%', padding: '0.7rem', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: ownerLoading ? 'not-allowed' : 'pointer', opacity: ownerLoading ? 0.6 : 1 }}>
                {ownerLoading ? '寄送中...' : '📧 寄送登入連結'}
              </button>
              {ownerError && <p style={{ color: '#fca5a5', fontSize: '0.8rem', margin: '0.6rem 0 0' }}>{ownerError}</p>}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.2rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>或用密碼</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
          </div>

          <input type="password" value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="輸入密碼..."
            disabled={pwLoading}
            style={{ ...inputStyle, marginBottom: '0.8rem', textAlign: 'center', letterSpacing: '0.2em' }} />
          {pwError && <p style={{ color: '#fca5a5', fontSize: '0.85rem', margin: '0 0 0.8rem' }}>❌ 密碼錯誤，請再試一次</p>}
          <button onClick={handleLogin} disabled={pwLoading} style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, cursor: pwLoading ? 'not-allowed' : 'pointer' }}>
            {pwLoading ? '登入中...' : '進入後台'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>🛠 驚喜管理後台</h1>
          <button onClick={handleLogout} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem' }}>登出</button>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '18px', padding: '2rem', border: '1px solid rgba(167,139,250,0.2)' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>📅 日期</label>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>🏷 類型</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={inputStyle}>
              {TYPES.map(t => <option key={t} value={t} style={{ background: '#1e1b4b' }}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>✍️ 驚喜內容</label>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="輸入今日驚喜內容..." rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
            <div style={{ color: '#6b7280', fontSize: '0.75rem', textAlign: 'right', marginTop: '0.3rem' }}>{form.message.length} 字</div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>🔗 相關連結 <span style={{ color: '#6b7280' }}>(選填)</span></label>
            <input type="url" value={form.toolUrl} onChange={e => setForm(f => ({ ...f, toolUrl: e.target.value }))} placeholder="https://..." style={inputStyle} />
          </div>
          <button onClick={handleSubmit} disabled={status === 'loading'} style={{ width: '100%', padding: '0.9rem', background: status === 'loading' ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
            {status === 'loading' ? '儲存中...' : '💾 儲存驚喜'}
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', borderRadius: '10px', background: status === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${status === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, color: status === 'success' ? '#6ee7b7' : '#fca5a5', fontSize: '0.9rem' }}>
              {result}
            </div>
          )}
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', fontSize: '0.9rem', textDecoration: 'none' }}>👀 預覽首頁效果 →</a>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>載入中…</div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}