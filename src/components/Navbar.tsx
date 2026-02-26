'use client';
// 📁 路徑：src/components/Navbar.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: '🏠 首頁' },
  { href: '/novels', label: '📖 連載小說' },
  { href: '/ai-news', label: '🤖 AI快訊' },
  { href: '/tools', label: '🛠 工具箱' },
  { href: '/admin', label: '⚙️ 管理' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 999,
      background: 'rgba(15,12,41,0.9)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(167,139,250,0.2)',
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.8rem 1.5rem', flexWrap: 'wrap',
    }}>
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

      {/* ✅ 隱私權政策（靠右，小字） */}
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
    </nav>
  );
}