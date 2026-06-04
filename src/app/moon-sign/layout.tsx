import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '%s | Surprise Corner', default: '月亮星座 & 上升星座 | Surprise Corner' },
  description: '輸入生日算出太陽座、月亮座、上升座，解析你的內外在宇宙。三星座組合完整版，免費使用。',
  openGraph: {
    title: '月亮星座 & 上升星座 | Surprise Corner',
    description: '輸入生日，一次算出太陽座＋月亮座＋上升座，解析你的三面向宇宙！',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '月亮星座 & 上升星座 | Surprise Corner',
    description: '一次算出三個星座，了解你真正的內外在。',
  },
};

export default function MoonSignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
