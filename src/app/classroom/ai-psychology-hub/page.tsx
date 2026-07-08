// 📄 路徑：src/app/classroom/ai-psychology-hub/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: 'AI心理學書院｜驚喜角落',
  description: '3冊32堂，從AI有沒有自我意識、AI怎麼看人類、到AI的偏見從哪來。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🪞 AI心理學書院',
    description: '3冊32堂，自我意識、幻覺、偏見的心理拆解。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-psychology-hub',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiPsychologyHubPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
