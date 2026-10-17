// LA NEVERITA V&A · permite instalar la app en el celular.
// Los datos siempre vienen de Supabase en vivo; solo se guarda la página para abrir rápido.
// Ojo: solo borra cachés "neverita-" para no dañar otras apps del mismo GitHub.
const CACHE = 'neverita-v2';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'index.html', 'manifest.json', 'icon-192.png']).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('neverita-') && x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin || !new URL(r.url).pathname.startsWith('/laneverita/')) return;
  e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
});
