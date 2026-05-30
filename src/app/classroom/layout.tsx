import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '小教室（籌備中）',
  description: '每篇5分鐘，學一個真正用得上的知識。心理學、投資入門、AI工具、創作……不灌水、不廢話，說人話的小教室，即將開課！',
  openGraph: {
    title: '小教室 即將開課！| Surprise Corner 驚喜角落',
    description: '心理學、投資、AI工具、創作……每篇5分鐘學一個真正用得上的知識。加入 LINE 搶先知道開課消息！',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '小教室 即將開課！| Surprise Corner 驚喜角落',
    description: '心理學、投資、AI工具……每篇5分鐘，說人話的小教室，即將開課！',
  },
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
