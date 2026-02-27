// 📄 路徑：src/app/layout.tsx
// 功能：全域佈局 + SEO 設定 + Footer

import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  title: {
    default: 'Surprise Corner - 每天不一樣的小驚喜',
    template: '%s | Surprise Corner',
  },
  description: '每天都有新的驚喜等你發現！獲取靈感、學習新知、療癒心情。每日更新，天天不重複。',
  keywords: ['每日驚喜', '靈感', '創意', '生活提案', '心靈療癒', '每日一句', '正能量', '每日更新'],
  authors: [{ name: 'Surprise Corner' }],
  creator: 'Surprise Corner',
  publisher: 'Surprise Corner',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // ✅ 新增 favicon 設定
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website', locale: 'zh_TW', url: '/', siteName: 'Surprise Corner',
    title: 'Surprise Corner - 每天不一樣的小驚喜',
    description: '每天都有新的驚喜等你發現！',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Surprise Corner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surprise Corner - 每天不一樣的小驚喜',
    description: '每天都有新的驚喜等你發現！',
    images: ['/og-image.png'],
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <Navbar />
        {children}

        {/* ✅ 全站 Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '1.5rem 1rem 2rem',
          borderTop: '1px solid rgba(167,139,250,0.1)',
          background: 'rgba(0,0,0,0.2)',
        }}>
          {/* ✅ Ko-fi 打賞按鈕 */}
          <div style={{ marginBottom: '1rem' }}>
            <a
              href="https://ko-fi.com/surprisecorner"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #FF5E5B, #ff8c42)',
                color: '#fff', textDecoration: 'none',
                padding: '0.6rem 1.6rem', borderRadius: '30px',
                fontSize: '0.9rem', fontWeight: 700,
                boxShadow: '0 4px 15px rgba(255,94,91,0.35)',
              }}
            >
              ☕ 請我喝杯咖啡
            </a>
          </div>

          {/* 連結列 */}
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
            <a href="/privacy" style={{ color: '#6b7280', fontSize: '0.75rem', textDecoration: 'none' }}>隱私權政策</a>
            <a href="https://line.me/R/ti/p/@983agawb" target="_blank" rel="noopener noreferrer"
              style={{ color: '#6b7280', fontSize: '0.75rem', textDecoration: 'none' }}>
              聯絡我們 LINE @983agawb
            </a>
            <a href="https://still-time-corner.vercel.app/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#6b7280', fontSize: '0.75rem', textDecoration: 'none' }}>
              有的沒的小舖 ✨
            </a>
          </div>

          <p style={{ color: '#374151', fontSize: '0.75rem', margin: '0 0 0.2rem' }}>
            © 2026 Surprise Corner・All Rights Reserved
          </p>
          <p style={{ color: '#374151', fontSize: '0.72rem', margin: 0 }}>
            本網站使用 AI 輔助開發與內容生成
          </p>
        </footer>
      </body>
    </html>
  );
}