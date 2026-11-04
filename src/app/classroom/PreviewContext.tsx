'use client';
// 📄 路徑：src/app/classroom/PreviewContext.tsx
// 教室老闆模式：完全委派給全站 OwnerProvider（以後台信箱連結登入的簽章 cookie 為準）。
// 🔒 2026-11-04：移除舊的 ?owner= 網址參數與 localStorage 老闆標記（寫死在前端、任何人都能自己設）。

import { createContext, useContext } from 'react';
import { useOwner } from '@/components/OwnerProvider';

const PreviewContext = createContext(false);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const globalOwner = useOwner();
  return (
    <PreviewContext.Provider value={globalOwner}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  return useContext(PreviewContext);
}
