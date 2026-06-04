import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '%s | Surprise Corner', default: '三才五格姓名學 | Surprise Corner' },
  description: '輸入姓名筆劃，算出五格吉凶、三才五行、命格總評。傳統姓名學完整分析，免費使用。',
  openGraph: {
    title: '三才五格姓名學 | Surprise Corner',
    description: '輸入你的姓名筆劃，算出天格、人格、地格、外格、總格五格吉凶！',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '三才五格姓名學 | Surprise Corner',
    description: '傳統三才五格筆劃姓名學，免費即時分析。',
  },
};

export default function NameNumerologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
