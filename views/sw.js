const cacheName = "static";
const staticAssets = [
  "./",
  "./manifest.json",
  "./index.html",
  "./policy.html",
  "./css/style.css",
  "./css/media.css",
  "./css/modal.css",
  "./js/utils.js",
  "./js/main.js",
  "./assets/icons/edit.png",
  "./assets/icons/plug-512.png",
  "./assets/icons/plug-192.png",
  "./assets/icons/plug-144.png",
  "./assets/icons/plug-128.png",
  "./assets/icons/plug.png",
  "./assets/icons/send.png",
];

self.addEventListener("install", async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (error) {
    const cached = await cache.match(req);
    return cached;
  }
}
