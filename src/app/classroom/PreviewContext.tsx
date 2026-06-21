'use client';
// 📄 路徑：src/app/classroom/PreviewContext.tsx
// ?preview=1 全局管理員預覽模式，在 classroom layout 統一讀取，
// 子書院用 usePreview() 取值，新書院不需要再改任何東西。

import { createContext, useContext } from 'react';
import { useSearchParams } from 'next/navigation';

const PreviewContext = createContext(false);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === '1';
  return <PreviewContext.Provider value={isPreview}>{children}</PreviewContext.Provider>;
}

export function usePreview() {
  return useContext(PreviewContext);
}
