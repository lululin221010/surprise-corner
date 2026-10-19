'use client';
// 📄 路徑：src/app/classroom/PreviewContext.tsx
// 教室老闆模式：委派給全站 OwnerProvider（src/components/OwnerProvider.tsx）
// ?owner= 一律由 OwnerProvider 送 ST 伺服器驗證，這裡不再自己比對

import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOwner } from '@/components/OwnerProvider';

const OWNER_KEY = 'sc_owner';

const PreviewContext = createContext(false);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const globalOwner = useOwner();
  const [localOwner, setLocalOwner] = useState(false);

  useEffect(() => {
    setLocalOwner(localStorage.getItem(OWNER_KEY) === '1');
  }, [searchParams]);

  return (
    <PreviewContext.Provider value={globalOwner || localOwner}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  return useContext(PreviewContext);
}
