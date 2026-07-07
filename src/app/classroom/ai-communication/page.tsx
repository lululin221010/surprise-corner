// 📄 路徑：src/app/classroom/ai-communication/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: 'AI溝通學書院｜驚喜角落',
  description: '3冊32堂，從Prompt理解、Agent行動到AI記憶，搞懂怎麼跟AI「講話」跟「共事」。不需技術背景，每堂15-20分鐘。',
  openGraph: {
    title: '💬 AI溝通學書院',
    description: '3冊32堂，從Prompt理解、Agent行動到AI記憶，搞懂怎麼跟AI「講話」跟「共事」。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-communication',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiCommunicationPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
