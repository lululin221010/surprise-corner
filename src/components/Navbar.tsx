'use client';
// 📁 路徑：src/components/Navbar.tsx

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  // ✅ 移除「首頁」，Logo 本身即為首頁入口
  { href: '/novels',  label: '📖 連載小說' },
  { href: '/ai-news', label: '🤖 AI快訊' },
  { href: '/podcast', label: '🎙️ Podcast' },
  { href: '/tools',   label: '🛠 工具箱' },
  // ✅ 管理頁面已從導覽列移除（直接輸入 /admin 仍可進入）
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [clickCount, setClickCount] = useState(0);
  const [actionMsg, setActionMsg] = useState('');
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetch('/api/admin/comments?approved=false')
      .then(r => r.json())
      .then(data => setPendingCount((data.comments || []).length))
      .catch(() => {});
  }, [pathname]);

  function handleLogoClick() {
    setClickCount(n => {
      const next = n + 1;
      if (next >= 5) {
        window.location.href = '/admin/comments';
        return 0;
      }
      return next;
    });
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 999,
      background: 'rgba(15,12,41,0.9)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(167,139,250,0.2)',
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.4rem 1.5rem', flexWrap: 'wrap',
    }}>

      {/* ✅ Logo — 加大尺寸 + 首頁時加紫色光暈框 */}
      <Link
        href="/"
        title="🏠 回首頁"
        className="site-logo"
        onClick={handleLogoClick}
        style={{
          textDecoration: 'none',
          marginRight: '1rem',
          flexShrink: 0,
          display: 'block',
          borderRadius: '10px',
          padding: '3px 6px',
          border: isHome
            ? '1.5px solid rgba(167,139,250,0.7)'
            : '1.5px solid transparent',
          boxShadow: isHome
            ? '0 0 10px rgba(167,139,250,0.4)'
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Image
          src="/logo.png"
          alt="Surprise Corner"
          width={240}
          height={58}
          style={{ objectFit: 'contain', display: 'block' }}
          priority
        />
      </Link>

      {/* 主要導覽連結 */}
      {links.map(link => (
        <Link key={link.href} href={link.href} style={{
          color: pathname === link.href ? '#c4b5fd' : '#9ca3af',
          textDecoration: 'none', padding: '0.4rem 1rem',
          borderRadius: '20px', fontSize: '0.9rem',
          fontWeight: pathname === link.href ? 700 : 400,
          background: pathname === link.href ? 'rgba(124,58,237,0.2)' : 'transparent',
        }}>
          {link.label}
        </Link>
      ))}

      {/* ✅ 隱私權政策（靠右，小字）*/}
      <Link
        href="/privacy"
        style={{
          marginLeft: 'auto',
          color: pathname === '/privacy' ? '#c4b5fd' : '#4b5563',
          textDecoration: 'none',
          fontSize: '0.75rem',
          padding: '0.3rem 0.8rem',
          borderRadius: '20px',
          background: pathname === '/privacy' ? 'rgba(124,58,237,0.2)' : 'transparent',
          whiteSpace: 'nowrap',
        }}
      >
        🔐 隱私權
      </Link>
      {pendingCount > 0 && (
        <div
          onClick={() => setActionMsg('此路不通 🚫')}
          style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', cursor: 'pointer', flexShrink: 0, boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}
          title=""
        />
      )}
      {actionMsg && (
        <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(30,20,10,0.95)', border: '1px solid rgba(232,200,128,0.3)', borderRadius: 10, padding: '0.5rem 1.2rem', color: '#e8c880', fontSize: '0.85rem', zIndex: 9999 }}
          onClick={() => setActionMsg('')}>
          {actionMsg}
        </div>
      )}
    </nav>
  );
}