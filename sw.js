self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/script.js",
        "/assets/project.json",
        ...[
          "png", "svg", "mp3", "wav"
        ].flatMap(ext => [
          `/assets/*.${ext}`  // Wildcards don’t work in `cache.addAll`, so we'll handle it differently
        ])
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
