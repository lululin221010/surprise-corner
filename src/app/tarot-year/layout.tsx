import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '流年塔羅',
  description: '輸入生日算出生命靈數，對應大阿爾克那流年牌，看見今年的主題與關鍵字。',
  openGraph: {
    title: '流年塔羅 | Surprise Corner',
    description: '你今年的主題牌是哪一張？輸入生日，算出流年靈數對應的大阿爾克那！',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '流年塔羅 | Surprise Corner',
    description: '算出你今年的主題塔羅牌，看見這一年的方向。',
  },
};

export default function TarotYearLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
