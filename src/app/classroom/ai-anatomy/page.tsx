// 📄 路徑：src/app/classroom/ai-anatomy/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: 'AI解剖書院｜驚喜角落',
  description: '3冊33堂，從神經網路構造、訓練產生到推論操作，把AI從裡到外拆給你看。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🔬 AI解剖書院',
    description: '3冊33堂，從神經網路構造、訓練產生到推論操作，把AI從裡到外拆給你看。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-anatomy',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiAnatomyPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
