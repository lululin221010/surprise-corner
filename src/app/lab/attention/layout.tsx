import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '你剛剛有看到嗎？',
  description: '一分鐘的專注力小遊戲：盯住畫面、數一個數字，看你有沒有漏掉什麼。免登入、免費玩。',
  // 覆蓋全站預設的心理測驗／命理關鍵字，讓這頁的搜尋描述跟內容對得上
  keywords: ['注意力測試', '選擇性注意力', '注意力實驗', '你剛剛有看到嗎', '注意力小遊戲', '視覺注意力', '免費小實驗'],
  openGraph: {
    title: '你剛剛有看到嗎？',
    description: '測測你的專注力，你數得出來嗎？免費、約 30 秒。',
    images: [{ url: '/lab/attention/og.png', width: 1200, height: 630, alt: '你剛剛有看到嗎？專注力小遊戲' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '你剛剛有看到嗎？',
    description: '測測你的專注力，你數得出來嗎？免費、約 30 秒。',
    images: ['/lab/attention/og.png'],
  },
};

export default function AttentionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
