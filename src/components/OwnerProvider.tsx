'use client';
// 📄 路徑：src/components/OwnerProvider.tsx
// 全站老闆模式：從 ST /my 點過來帶 ?email=xxx → 驗證 → 寫 cookie 永久（9999-12-31）
// 任何 SS 頁面都能觸發，不限教室

import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const COOKIE_NAME = 'sc_owner_v1';
const ST_API = 'https://still-time-corner.vercel.app/api/subscription/activate';

const OwnerContext = createContext(false);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setOwnerCookie() {
  document.cookie = `${COOKIE_NAME}=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax`;
}

export function OwnerProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // 先查 cookie（清快取不影響）
    if (getCookie(COOKIE_NAME) === '1') {
      setIsOwner(true);
      return;
    }

    // ?email= 帶過來時，去 ST 驗證身份
    const email = searchParams.get('email');
    if (!email) return;

    fetch(ST_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.plan === 'owner') {
          setOwnerCookie();
          setIsOwner(true);
        }
      })
      .catch(() => {});
  }, [searchParams]);

  return <OwnerContext.Provider value={isOwner}>{children}</OwnerContext.Provider>;
}

export function useOwner() {
  return useContext(OwnerContext);
}
