var CACHE_NAME = 'mdl-portfolio-cache-v1';
var startUrl = '/';
var urlsToCache = [
  startUrl,
  '/styles/main.css',
  '/scripts/main.js',
  '/images/about-header.jpg',
  '/images/contact-image.jpg',
  '/images/example-blog01.jpg',
  '/images/example-blog02.jpg',
  '/images/example-blog03.jpg',
  '/images/example-blog04.jpg',
  '/images/example-blog05.jpg',
  '/images/example-blog06.jpg',
  '/images/example-blog07.jpg',
  '/images/example-work01.jpg',
  '/images/example-work02.jpg',
  '/images/example-work03.jpg',
  '/images/example-work04.jpg',
  '/images/example-work05.jpg',
  '/images/example-work06.jpg',
  '/images/example-work07.jpg',
  '/images/example-work08.jpg',
  '/images/example-work09.jpg',
  '/images/footer-background.png',
  '/images/header-bg.jpg',
  '/images/logo.png',
  '/images/photo-wide.jpg',
  '/images/photo.jpg',
  '/images/portfolio-example-01.jpg',
  '/images/portfolio-example-02.jpg',
  '/images/portfolio-example-03.jpg',
  '/images/portfolio-example-04.jpg',
  '/images/portfolio-example-05.jpg',
  '/images/portfolio-example-06.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        var requestUrl = new URL(event.request.url);
        if (requestUrl.origin === location.origin && requestUrl.pathname === startUrl) {
          return caches.match(startUrl);
        }
        return fetch(event.request);
      })
  );
});
