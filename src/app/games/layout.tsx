import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '%s | Surprise Corner', default: '遊戲 & 工具 | Surprise Corner' },
  description: '小遊戲、占卜、命理、AI工具一次集合。魯魯跑酷、數獨、塔羅牌、星座運勢、八字命盤、心理測驗……放空一下，玩幾分鐘再走。',
  openGraph: {
    title: '遊戲 & 工具 | Surprise Corner',
    description: '小遊戲、占卜、命理、AI工具一次集合，隨時玩、完全免費！',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '遊戲 & 工具 | Surprise Corner',
    description: '小遊戲、占卜、命理、AI工具一次集合，隨時玩、完全免費！',
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
