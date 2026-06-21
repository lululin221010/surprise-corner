import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PreviewProvider } from './PreviewContext';

export const metadata: Metadata = {
  title: { template: '%s | Surprise Corner', default: '驚喜學院 | Surprise Corner' },
  description: '走進小門，發現大世界。股市、心理學、AI工具、創作……每篇5分鐘學一個真正用得上的知識，說人話的驚喜學院各書院，即將全面開課！',
  openGraph: {
    title: '驚喜學院 | Surprise Corner 驚喜角落',
    description: '走進小門，發現大世界。股市書院已開放，更多書院陸續上線！加入 LINE 搶先知道開課消息。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '小教室 即將開課！| Surprise Corner 驚喜角落',
    description: '心理學、投資、AI工具……每篇5分鐘，說人話的小教室，即將開課！',
  },
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', color: '#1e1b4b' }}>
      <Suspense>
        <PreviewProvider>{children}</PreviewProvider>
      </Suspense>
    </div>
  );
}
