const CACHE_NAME = 'mdl-portfolio-cache-v1';

const urlsToCache = [
  "./",
    "./index.html",
    "./blog.html",
    "./about.html",
    "./contact.html",
    "./portfolio-example01.html",
    "./styles.css",
    "./app.js",
    "./images/about-header.jpg",
    "./images/contact-image.jpg",
    "./images/example-blog01.jpg",
    "./images/example-blog02.jpg",
    "./images/example-blog03.jpg",
    "./images/example-blog04.jpg",
    "./images/example-blog05.jpg",
    "./images/example-blog06.jpg",
    "./images/example-blog07.jpg",
    "./images/example-work01.jpg",
    "./images/example-work02.jpg",
    "./images/example-work03.jpg",
    "./images/example-work04.jpg",
    "./images/example-work05.jpg",
    "./images/example-work06.jpg",
    "./images/example-work07.jpg",
    "./images/example-work08.jpg",
    "./images/example-work09.jpg",
    "./images/footer-background.png",
    "./images/header-bg.jpg",
    "./images/logo.png",
    "./images/photo-wide.jpg",
    "./images/photo.jpg",
    "./images/portfolio-example-01.jpg",
    "./images/portfolio-example-02.jpg",
    "./images/portfolio-example-03.jpg",
    "./images/portfolio-example-04.jpg",
    "./images/portfolio-example-05.jpg",
    "./images/portfolio-example-06.jpg"
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
