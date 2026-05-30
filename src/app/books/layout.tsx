import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '書評角落',
  description: '心理學、靈異、成長——精選電子書試閱與書評。看完喜歡可以到小舖購買完整版。',
  openGraph: {
    title: '書評角落 | Surprise Corner',
    description: '暗黑心理學、認知科學、那個感覺靈異系列……精選好書試閱，免費讀第一章！',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary',
    title: '書評角落 | Surprise Corner',
    description: '精選電子書試閱，心理學＋靈異＋成長，免費閱讀第一章。',
  },
};

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
