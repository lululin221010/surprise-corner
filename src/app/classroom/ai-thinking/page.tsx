// 📄 路徑：src/app/classroom/ai-thinking/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: 'AI思考力書院｜驚喜角落',
  description: '3冊32堂，從AI怎麼「想」、AI能做到什麼、到人類才能做什麼，搞懂AI跟人類思考的根本差異。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🤔 AI思考力書院',
    description: '3冊32堂，從AI怎麼「想」到人類不可取代的能力，搞懂AI跟人類思考的根本差異。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-thinking',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiThinkingPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
