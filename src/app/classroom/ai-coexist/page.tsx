// 📄 路徑：src/app/classroom/ai-coexist/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: '互動共存書院｜驚喜角落',
  description: '3冊32堂，從AI怎麼改變工作、信任邊界怎麼畫、到AI時代怎麼當一個人。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🤝 互動共存書院',
    description: '3冊32堂，工作、信任、教育——AI時代怎麼當一個人。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-coexist',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiCoexistPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
