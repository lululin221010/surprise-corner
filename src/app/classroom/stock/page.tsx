// 📄 路徑：src/app/classroom/stock/page.tsx
import { Suspense } from 'react';
import Academy from './Academy';

export default function StockPage() {
  return (
    <Suspense>
      <Academy />
    </Suspense>
  );
}
