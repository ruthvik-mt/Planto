const CACHE = "plantiva-cache-v2";
const offlineFallbackPage = "offline.html";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Manual precache with revision info to avoid Workbox warning
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

// Skip waiting (optional but useful for rapid updates)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Enable navigation preload for faster loads
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Runtime caching: cache-first or stale-while-revalidate for all routes
workbox.routing.registerRoute(
  ({ request }) => request.destination === "document",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);

// Fallback to offline page for navigation failures
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Immediately tell the browser to wait for our async handler
    event.respondWith(handleRequest(event));
  }
});

async function handleRequest(event) {
  try {
    const preloadResp = await event.preloadResponse;
    if (preloadResp) return preloadResp;

    const networkResp = await fetch(event.request);
    return networkResp;
  } catch (error) {
    const cache = await caches.open(CACHE);
    return await cache.match(offlineFallbackPage);
  }
};
