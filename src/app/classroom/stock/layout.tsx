import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '理財書院 > 台股系列 | Surprise Corner 驚喜角落',
  description: '5分鐘看懂一個股市概念：K線、法人籌碼、均線、技術分析……說人話、不廢話的股市小教室，從零開始都能懂。',
  openGraph: {
    title: '理財書院 > 台股系列 | Surprise Corner 驚喜角落',
    description: '5分鐘看懂一個股市概念，說人話、不廢話的股市小教室。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
};

export default function StockClassroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
