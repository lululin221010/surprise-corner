// 📄 檔案路徑：src/app/layout.tsx
// 功能：全域佈局 + SEO 設定

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
  keywords: [
    '每日驚喜',
    '靈感',
    '創意',
    '生活提案',
    '心靈療癒',
    '每日一句',
    '正能量',
    '每日更新',
  ],
  authors: [{ name: 'Surprise Corner' }],
  creator: 'Surprise Corner',
  publisher: 'Surprise Corner',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: '/',
    siteName: 'Surprise Corner',
    title: 'Surprise Corner - 每天不一樣的小驚喜',
    description: '每天都有新的驚喜等你發現！',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Surprise Corner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surprise Corner - 每天不一樣的小驚喜',
    description: '每天都有新的驚喜等你發現！',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  );
}