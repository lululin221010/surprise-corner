// 📄 路徑：src/app/classroom/ai-diy/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: 'DIY AI實作書院｜驚喜角落',
  description: '3冊30堂，從免費工具動手做AI應用、自架本地AI、到親手訓練一個迷你模型。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🛠️ DIY AI實作書院',
    description: '3冊30堂，從免費工具到自架本地AI，動手做出屬於自己的AI。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-diy',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiDiyPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
