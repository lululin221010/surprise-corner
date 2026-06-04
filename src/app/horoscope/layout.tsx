import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '%s | Surprise Corner', default: '每日星座運勢 | Surprise Corner' },
  description: '12星座今日運勢，愛情、事業、財運、健康一次看。每天0點更新，每天都不一樣。',
  openGraph: {
    title: '每日星座運勢 | Surprise Corner',
    description: '牡羊到雙魚，12星座今日運勢一次看。愛情、事業、財運、健康全包！',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '每日星座運勢 | Surprise Corner',
    description: '12星座今日運勢一次看，每天0點更新。',
  },
};

export default function HoroscopeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
