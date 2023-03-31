const CACHE_NAME = 'mdl-portfolio-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/material.min.css',
  '/scripts/main.js',
  '/scripts/material.min.js',
  '/images/header-bg.jpg',
  '/images/portfolio-image-01.jpg',
  '/images/portfolio-image-02.jpg',
  '/images/portfolio-image-03.jpg',
  '/images/portfolio-image-04.jpg',
  '/images/portfolio-image-05.jpg',
  '/images/portfolio-image-06.jpg',
  '/images/portfolio-image-07.jpg',
  '/images/portfolio-image-08.jpg',
  '/images/portfolio-image-09.jpg',
  '/images/portfolio-image-10.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {return response;
            }
      
            const responseToCache = response.clone();
      
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
      
            return response;
            })
            .catch(error => {
              console.log('Error fetching data from network', error);
            });
        })
      );
      });