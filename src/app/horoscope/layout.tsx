import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '每日星座運勢',
  description: '12星座今日運勢，愛情、事業、財運、健康一次看。每天0點更新，每天都不一樣。',
  openGraph: {
    title: '每日星座運勢 | Surprise Corner',
    description: '牡羊到雙魚，12星座今日運勢一次看。愛情、事業、財運、健康全包！',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary',
    title: '每日星座運勢 | Surprise Corner',
    description: '12星座今日運勢一次看，每天0點更新。',
  },
};

export default function HoroscopeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
