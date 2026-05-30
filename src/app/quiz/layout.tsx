import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '心理測驗',
  description: '依附類型、防禦機制、創傷反應、自我懷疑……多種心理測驗免費測，了解真正的自己。',
  openGraph: {
    title: '心理測驗 | Surprise Corner',
    description: '你的依附類型是什麼？你在用哪種防禦機制保護自己？12題左右，測出你從沒注意過的自己。',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary',
    title: '心理測驗 | Surprise Corner',
    description: '多種心理測驗免費測，了解你的依附類型、防禦機制與內在模式。',
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
