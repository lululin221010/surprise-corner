'use client';
// src/components/PwaUpdateBanner.tsx
// 靜默自動更新：SW skipWaiting 後偵測 controllerchange，顯示 3 秒品牌 toast
import { useEffect, useState } from 'react';

export default function PwaUpdateBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // 註冊 SW
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('SW 註冊失敗:', err);
    });

    // 偵測 SW 取得控制權（skipWaiting 完成 = 新版本已生效）
    // 首次載入時 controller 是 null→有值，不算更新，只偵測「已有 controller 後的切換」
    let firstActivation = !navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (firstActivation) {
        firstActivation = false;
        return; // 首次安裝不提示
      }
      // 新版本已靜默生效，顯示 toast 3 秒後消失
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    });
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        color: 'white',
        padding: '0.65rem 1.5rem',
        borderRadius: '2rem',
        boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
        fontSize: '0.88rem',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        animation: 'pwa-slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
      }}
    >
      ✨ 已更新到最新版本
    </div>
  );
}
