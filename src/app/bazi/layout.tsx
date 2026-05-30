import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '八字命盤',
  description: '輸入生日算出四柱天干地支，解析你的五行命格、日主個性與天賦特質。完全免費，結果即時顯示。',
  openGraph: {
    title: '八字命盤 | Surprise Corner',
    description: '輸入生日，算出你的四柱八字與五行分佈，了解自己的命格與個性特質！',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary',
    title: '八字命盤 | Surprise Corner',
    description: '輸入生日算出四柱八字，解析五行命格。免費，即時。',
  },
};

export default function BaziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
