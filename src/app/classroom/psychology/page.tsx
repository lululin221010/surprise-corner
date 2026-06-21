// 📄 路徑：src/app/classroom/psychology/page.tsx
import { Suspense } from 'react';
import PsychAcademy from './PsychAcademy';

export const metadata = {
  title: '心理學書院 | Surprise Corner',
  description: '讀懂人，讀懂自己。暗黑心理學、認知心理學、成長心理學等6大學系。',
};

export default function PsychologyPage() {
  return (
    <Suspense>
      <PsychAcademy />
    </Suspense>
  );
}
