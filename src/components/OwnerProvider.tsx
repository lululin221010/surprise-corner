'use client';
// 📄 路徑：src/components/OwnerProvider.tsx
// 全站老闆模式：以「驚喜角落後台用信箱連結登入後」的簽章 cookie 為準，由伺服器確認。
//
// 🔒 2026-11-04 改版：原本有三條旁門——
//   1) 網址 ?owner=（寫死在前端程式，瀏覽器就看得到）
//   2) 瀏覽器自己寫的 sc_owner_v1 cookie（任何人都能手動寫）
//   3) 網址 ?email= 去 ST 比對信箱字（信箱不是秘密）
// 全部移除。現在只認 /api/admin/check-session 回報「已登入後台」（需點信箱連結取得簽章 cookie）。

import { createContext, useContext, useEffect, useState } from 'react';

const LEGACY_COOKIE = 'sc_owner_v1';
const OwnerContext = createContext(false);

export function OwnerProvider({ children }: { children: React.ReactNode }) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // 清掉舊版留在瀏覽器的老闆標記（不再被認）
    try {
      document.cookie = `${LEGACY_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      localStorage.removeItem('sc_owner');
    } catch { /* 沒有儲存空間也能用 */ }

    let alive = true;
    fetch('/api/admin/check-session', { cache: 'no-store', credentials: 'same-origin' })
      .then(r => r.json())
      .then(d => { if (alive) setIsOwner(!!d?.authed); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return <OwnerContext.Provider value={isOwner}>{children}</OwnerContext.Provider>;
}

export function useOwner() {
  return useContext(OwnerContext);
}
