const CACHE = "plantiva-cache-v2";
const offlineFallbackPage = "offline.html";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// ✅ Precache static assets (with revisions to avoid Workbox warning)
workbox.precaching.precacheAndRoute([
  { url: "/", revision: "v1" },
  { url: "/offline.html", revision: "v1" },
  { url: "/favicon.ico", revision: "v1" },
  { url: "/favicon-16x16.png", revision: "v1" },
  { url: "/apple-touch-icon.png", revision: "v1" },
  { url: "/android-chrome-192x192.png", revision: "v1" },
  { url: "/android-chrome-512x512.png", revision: "v1" },
  { url: "/maskable-icon-192x192.png", revision: "v1" },
  { url: "/maskable-icon-512x512.png", revision: "v1" },
  { url: "/og.png", revision: "v1" },
  { url: "/upload.png", revision: "v1" },
  { url: "/results.png", revision: "v1" },
  { url: "/home.png", revision: "v1" },
  { url: "/site.webmanifest", revision: "v1" }
]);

// ✅ Listen for skipWaiting message (for immediate activation)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// ✅ Enable navigation preload (helps speed up page loading)
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// ✅ Runtime caching strategy for documents (HTML pages)
workbox.routing.registerRoute(
  ({ request }) => request.destination === "document",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);

// ✅ Navigation fallback with proper preloadResponse usage
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // ✅ Must call synchronously
    event.respondWith((async () => {
      try {
        // ✅ preloadResponse must be awaited inside respondWith callback
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
