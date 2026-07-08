// 📄 路徑：src/app/classroom/ai-robot/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: '機器人書院｜驚喜角落',
  description: '3冊31堂，從機器人是怎麼動的、怎麼思考、到會取代誰。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🤖 機器人書院',
    description: '3冊31堂，機器人怎麼動、怎麼想、會取代誰。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-robot',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiRobotPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
