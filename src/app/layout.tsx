// 📄 路徑：src/app/layout.tsx
// 功能：全域佈局 + SEO 設定 + Footer

import Navbar from '@/components/Navbar';
import PwaUpdateBanner from '@/components/PwaUpdateBanner';
import DonateButton from '@/components/DonateButton';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  title: {
    default: 'Surprise Corner 驚喜角落 - 心理測驗・塔羅占卜・星座運勢・八字命盤・姓名學，全免費！',
    template: '%s | Surprise Corner 驚喜角落',
  },
  description: '驚喜角落是完全免費的心理測驗與命理工具網站，提供塔羅占卜、每日星座運勢、八字命盤、月亮星座、姓名學、流年塔羅等工具，還有心理學書評、連載小說與 AI 生活工具。完全不用登入，想玩就玩，想測就測，每天都有新驚喜等你來發現！',
  keywords: ['心理測驗', '塔羅占卜', '星座運勢', '八字命盤', '月亮星座', '姓名學', '流年塔羅', '免費占卜', '命理工具', '心理學'],
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
    type: 'website', locale: 'zh_TW', url: 'https://surprise-corner.vercel.app', siteName: 'Surprise Corner',
    title: 'Surprise Corner 驚喜角落 - 心理測驗・塔羅占卜・星座運勢・八字命盤・姓名學，全免費！',
    description: '驚喜角落是完全免費的心理測驗與命理工具網站，提供塔羅占卜、每日星座運勢、八字命盤、月亮星座、姓名學、流年塔羅等工具，還有心理學書評、連載小說與 AI 生活工具。完全不用登入，想玩就玩，想測就測，每天都有新驚喜等你來發現！',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Surprise Corner 驚喜角落' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surprise Corner 驚喜角落 - 心理測驗・塔羅占卜・星座運勢・八字命盤・姓名學，全免費！',
    description: '驚喜角落是完全免費的心理測驗與命理工具網站，提供塔羅占卜、每日星座運勢、八字命盤、月亮星座、姓名學、流年塔羅等工具，還有心理學書評、連載小說與 AI 生活工具。完全不用登入，想玩就玩，想測就測！',
    images: ['/og-default.png'],
  },
  alternates: { canonical: 'https://surprise-corner.vercel.app' },
  manifest: '/manifest.json',
  themeColor: '#7c3aed',
  verification: {
    google: 'Umi39AtQ8M5fxUEzoE6vhMTtWtNIAvePvtrYFFxeFsg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        {/* ✅ 明確指定 favicon，確保瀏覽器抓到正確圖示 */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* ✅ PWA 支援 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="驚喜角落" />
        {/* ✅ Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SKM2EF5QTC"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SKM2EF5QTC');
        `}} />
      </head>
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
          {/* ✅ 請魯魯吃罐罐 — 兩段式，直接顯示帳號不需私訊 */}
          <div style={{ marginBottom: '1rem' }}>
            <DonateButton />
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
         <PwaUpdateBanner />
      </body>
    </html>
  );
}