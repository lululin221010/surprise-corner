import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '今天該餵多少？貓咪一天熱量與份量估算',
  description: '輸入體重、是否結紮與活動量，估算貓咪一天大約需要多少熱量與乾糧克數。免登入、免費、資料只存在你的手機。',
  keywords: ['貓咪每天吃多少', '貓咪熱量計算', '貓飼料份量', '貓咪餵食量', '貓咪每日熱量', '結紮貓餵食量'],
  openGraph: {
    title: '今天該餵多少？',
    description: '5 kg 的貓一天大約要吃多少？輸入體重，30 秒估出範圍。免費、免登入。',
  },
  twitter: {
    card: 'summary',
    title: '今天該餵多少？',
    description: '5 kg 的貓一天大約要吃多少？輸入體重，30 秒估出範圍。免費、免登入。',
  },
};

export default function FeedingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
