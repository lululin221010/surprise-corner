import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '理財書院 | Surprise Corner 驚喜角落',
  description: '台股系列：5分鐘看懂K線、法人籌碼、均線；理財調查局系列：一本一案拆解ETF、外匯等理財工具真相。說人話、不廢話。',
  openGraph: {
    title: '理財書院 | Surprise Corner 驚喜角落',
    description: '台股系列＋理財調查局系列，說人話、不廢話的理財小教室。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
};

export default function StockClassroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
