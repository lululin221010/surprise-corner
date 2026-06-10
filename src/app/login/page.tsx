'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginContent() {
  const searchParams = useSearchParams();
  const errorParam   = searchParams.get('error');

  const [email,    setEmail]    = useState('');
  const [nickname, setNickname] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [error,    setError]    = useState(
    errorParam === 'expired' ? '登入連結已過期，請重新申請' :
    errorParam === 'invalid' ? '無效的登入連結' :
    errorParam === 'server'  ? '系統錯誤，請稍後再試' : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/auth/magic-link', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, nickname }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.error || '發生錯誤，請稍後再試');
      }
    } catch {
      setError('網路錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎓</div>
          <h1 className="text-3xl font-black text-purple-300">驚喜學院</h1>
          <p className="text-purple-500 text-sm mt-2">用 email 登入，不需要密碼</p>
        </div>

        {sent ? (
          /* 寄出成功畫面 */
          <div className="bg-[#1a1a2e] rounded-2xl border border-purple-900/40 p-8 text-center space-y-4">
            <div className="text-5xl">📬</div>
            <h2 className="text-white font-bold text-lg">登入信已寄出！</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              請查看 <strong className="text-purple-300">{email}</strong> 的信箱，<br/>
              點信中的「進入學院」按鈕即可登入。<br/>
              <span className="text-slate-500 text-xs">連結 15 分鐘內有效。</span>
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); setNickname(''); }}
              className="text-purple-400 underline text-sm"
            >
              重新寄送
            </button>
          </div>
        ) : (
          /* 登入表單 */
          <form onSubmit={handleSubmit}
                className="bg-[#1a1a2e] rounded-2xl border border-purple-900/40 p-6 space-y-4">

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-[#111827] border border-slate-700 rounded-xl
                           text-white placeholder-slate-500 text-sm
                           focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">
                暱稱 <span className="text-slate-500 font-normal">（新學員填，舊學員可略）</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="例：小明、Jane"
                className="w-full px-4 py-3 bg-[#111827] border border-slate-700 rounded-xl
                           text-white placeholder-slate-500 text-sm
                           focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1.5">第一次登入自動建立學員帳號</p>
            </div>

            {/* 新學員說明 */}
            <div className="bg-indigo-950/50 border border-indigo-800/40 rounded-xl p-3">
              <p className="text-xs text-indigo-300 leading-relaxed">
                🎁 <strong>驚喜學院 × 有的沒的小舖</strong><br/>
                註冊學院帳號，同時自動開通小舖書架——<br/>
                同一個 email，兩邊都能用，不需要分開註冊。
              </p>
            </div>

            {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600
                         hover:from-violet-500 hover:to-indigo-500
                         text-white font-bold rounded-xl transition-all
                         disabled:opacity-50 text-sm"
            >
              {loading ? '寄出中...' : '寄出一鍵登入連結 →'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link href="/classroom/stock" className="text-purple-500 underline text-xs">
            ← 回到股市書院
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <p className="text-purple-400 text-sm">載入中...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
