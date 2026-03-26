// src: public/sw.js
// 不自動 skipWaiting，等 PwaUpdateBanner 發送 SKIP_WAITING 指令後才更新
self.addEventListener('install', () => { /* 保持 waiting，讓自訂橫幅控制時機 */ });
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

