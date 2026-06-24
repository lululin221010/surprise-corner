import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI書院 | Surprise Corner 驚喜角落',
  description: '9大系列・26冊，從AI原理到實作全面理解AI時代。每堂5分鐘，不需技術背景，一次弄懂一個AI概念。',
  openGraph: {
    title: 'AI書院 | Surprise Corner 驚喜角落',
    description: '9大系列・26冊，從AI原理到實作全面理解AI時代。每堂5分鐘，不需技術背景。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
};

export default function AiClassroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
