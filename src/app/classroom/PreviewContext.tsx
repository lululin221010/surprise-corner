'use client';
// 📄 路徑：src/app/classroom/PreviewContext.tsx
// 老闆預覽模式：?owner=19730113 啟動，localStorage 記住後永久生效
// 子書院用 usePreview()，新書院不需要再改任何東西。

import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const OWNER_KEY = 'sc_owner';
const OWNER_SECRET = '19730113';

const PreviewContext = createContext(false);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // ?owner=19730113 → 寫入 localStorage
    if (searchParams.get('owner') === OWNER_SECRET) {
      localStorage.setItem(OWNER_KEY, '1');
    }
    setIsPreview(localStorage.getItem(OWNER_KEY) === '1');
  }, [searchParams]);

  return <PreviewContext.Provider value={isPreview}>{children}</PreviewContext.Provider>;
}

export function usePreview() {
  return useContext(PreviewContext);
}
