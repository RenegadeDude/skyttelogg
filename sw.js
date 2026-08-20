/* Skyttelogg service worker — gör appen körbar helt offline. */
const CACHE = "skyttelogg-v2";
const ASSETS = [
  "./", "./index.html", "./manifest.json",
  "./icon-192.png", "./icon-512.png", "./icon-maskable.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(new Request(a, {cache: "reload"})))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache-first: appen ska starta även utan täckning.
   Nätverket används bara för att uppdatera cachen i bakgrunden. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, {ignoreSearch: true}).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => hit || caches.match("./index.html"));
      return hit || net;
    })
  );
});
