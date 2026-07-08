// 📄 路徑：src/app/classroom/ai-safety/page.tsx
import type { Metadata } from 'next';
import { PreviewProvider } from '../PreviewContext';
import Academy from './Academy';

export const metadata: Metadata = {
  title: 'AI世界局勢書院｜驚喜角落',
  description: '2冊18堂，從AI安全與失控邊界到AI世界大戰的地緣政治競爭全貌。不需技術背景，每堂15-25分鐘。',
  openGraph: {
    title: '🛡️ AI世界局勢書院',
    description: '2冊18堂，安全、失控邊界、國家競爭。',
    url: 'https://surprise-corner.vercel.app/classroom/ai-safety',
    siteName: '驚喜角落',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function AiSafetyPage() {
  return (
    <PreviewProvider>
      <Academy />
    </PreviewProvider>
  );
}
