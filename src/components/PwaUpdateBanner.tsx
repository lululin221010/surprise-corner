'use client';
// src/components/PwaUpdateBanner.tsx
// 偵測 Service Worker 更新，取代瀏覽器預設的「應用程式有可用更新」提示
import { useEffect, useState } from 'react';

export default function PwaUpdateBanner() {
  const [show, setShow] = useState(false);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // 情況一：頁面開啟時就已有 waiting SW（上次更新沒點）
      if (registration.waiting) {
        setWaiting(registration.waiting);
        setShow(true);
      }

      // 情況二：本次造訪期間偵測到新版本安裝
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaiting(newWorker);
            setShow(true);
          }
        });
      });
    }).catch((err) => {
      console.warn('SW 註冊失敗:', err);
    });

    // SW 取得控制權後（skipWaiting 完成），自動重新整理頁面
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  const handleClick = () => {
    if (waiting) {
      waiting.postMessage('SKIP_WAITING');
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        color: 'white',
        padding: '0.75rem 1.75rem',
        borderRadius: '2rem',
        boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
        fontSize: '0.9rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        animation: 'pwa-slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
      }}
      title="點擊以套用最新版本"
    >
      ✨ 有新內容囉！點此重新整理
    </div>
  );
}
