import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '你剛剛有看到嗎？',
  description: '一個一分鐘的小實驗：盯住任務的時候，畫面裡還發生了另一件事。免登入、免費玩。',
  openGraph: {
    title: '你剛剛有看到嗎？',
    description: '我明明一直盯著螢幕，結果……算了，你自己試。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '你剛剛有看到嗎？',
    description: '我明明一直盯著螢幕，結果……算了，你自己試。',
  },
};

export default function AttentionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
