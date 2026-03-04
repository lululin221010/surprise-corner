// src: public/sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

