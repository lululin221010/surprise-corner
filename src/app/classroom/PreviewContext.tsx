'use client';
// 📄 路徑：src/app/classroom/PreviewContext.tsx
// 教室老闆模式：委派給全站 OwnerProvider（src/components/OwnerProvider.tsx）
// ?owner=19730113 舊參數保留相容（直接進教室也能用）

import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOwner } from '@/components/OwnerProvider';

const OWNER_KEY = 'sc_owner';
const OWNER_SECRET = '19730113';

const PreviewContext = createContext(false);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const globalOwner = useOwner();
  const [localOwner, setLocalOwner] = useState(false);

  useEffect(() => {
    // 舊版 ?owner=19730113 相容
    if (searchParams.get('owner') === OWNER_SECRET) {
      localStorage.setItem(OWNER_KEY, '1');
    }
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
