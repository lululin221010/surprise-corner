import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '魯魯偵探社：誰偷吃了餅乾？',
  description: '魯魯說「不是我」。你信他嗎？三個線索、一次指控，三分鐘破案。免登入、免費玩。',
  keywords: ['魯魯偵探社', '推理小遊戲', '貓咪推理', '免費小遊戲'],
  openGraph: {
    title: '魯魯偵探社：誰偷吃了餅乾？',
    description: '魯魯說「不是我」。你信他嗎？三分鐘破案。',
    images: [{ url: '/lab/detective/og.jpg', width: 1200, height: 630, alt: '魯魯偵探社：誰偷吃了餅乾？' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '魯魯偵探社：誰偷吃了餅乾？',
    description: '魯魯說「不是我」。你信他嗎？三分鐘破案。',
    images: ['/lab/detective/og.jpg'],
  },
};

export default function DetectiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
