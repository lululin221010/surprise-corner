// src: public/sw.js
// 自動更新：新版本安裝後立即接管，前端偵測到 controllerchange 後顯示「已更新」toast
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

