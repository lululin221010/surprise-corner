'use client';
// 📄 檔案路徑：src/components/ShopRedirectCard.tsx
// 使用方式：在揭曉驚喜後顯示這個組件

import { useState, useEffect } from 'react';

export default function ShopRedirectCard() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 3 秒後出現
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show || dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000,
      animation: 'slideUp 0.4s ease-out',
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
        border: '1px solid rgba(167,139,250,0.4)',
        borderRadius: '16px',
        padding: '1.2rem 1.5rem',
        maxWidth: '280px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      }}>
        <button
          onClick={() => setDismissed(true)}
          style={{
            position: 'absolute', top: '8px', right: '12px',
            background: 'none', border: 'none', color: '#9ca3af',
            cursor: 'pointer', fontSize: '1rem',
          }}
        >✕</button>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎁</div>
        <p style={{ color: '#e9d5ff', fontWeight: 700, margin: '0 0 0.4rem 0', fontSize: '0.95rem' }}>
          今天的驚喜揭曉了！
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.82rem', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
          還意猶未盡？去 Still Time Corner 找更多每日驚喜 ✨
        </p>
        <a
          href="https://stilltimecorner.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block', textAlign: 'center',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: '#fff', padding: '0.5rem 1rem',
            borderRadius: '30px', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.85rem',
          }}
        >
          前往小舖 →
        </a>
      </div>
    </div>
  );
}