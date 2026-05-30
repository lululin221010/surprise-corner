import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '塔羅占卜',
  description: '單張、三張、五張牌陣隨你選。每日最多5次免費抽牌，讓塔羅牌為你指引方向。',
  openGraph: {
    title: '塔羅占卜 | Surprise Corner',
    description: '單張、三張、五張牌陣，讓牌陣說出你現在最需要聽的話。免費，每天可抽5次。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '塔羅占卜 | Surprise Corner',
    description: '每天免費抽5次，三種牌陣讓你隨心選。',
  },
};

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
