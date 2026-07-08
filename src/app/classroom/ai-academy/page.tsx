// 📄 路徑：src/app/classroom/ai-academy/page.tsx
import type { Metadata } from 'next';
import AiAcademyHub from './AiAcademyHub';

export const metadata: Metadata = {
  title: 'AI書院｜驚喜角落',
  description: '9大系列，從AI原理到實作，全面理解AI時代。系列1~7已上線。',
  openGraph: {
    title: '🤖 AI書院',
    description: '9大系列，從AI原理到實作，全面理解AI時代。系列1~7已上線。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-academy',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiAcademyPage() {
  return <AiAcademyHub />;
}
