const CACHE_VERSION = "book-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/menu.html",
  "/matematica.html",

  "/styles.css",
  "/login.js",

  "/matematica.css",
  "/matematica.js",

  "/manifest.webmanifest",

  "/img/bg.png",
  "/img/capa.png",
  "/img/icons/icon-192.png",
  "/img/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_VERSION) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) =>
            cache.put(event.request, clone)
          );
          return response;
        })
        .catch(async () => {
          return (
            (await caches.match(event.request)) ||
            caches.match("/menu.html") ||
            caches.match("/index.html")
          );
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) =>
          cache.put(event.request, clone)
        );
        return response;
      });
    })
  );
});