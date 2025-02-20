const CACHE_NAME = 'omsosmed-cache-v1';
const urlsToCache = [
    '/',
    'https://socialbuilder.github.io/order.omsosmed.com/css/styles.css',
    'https://socialbuilder.github.io/order.omsosmed.com/js/script.js',
    'https://socialbuilder.github.io/order.omsosmed.com/image/logo-om-sosmed.png',
    'https://socialbuilder.github.io/order.omsosmed.com/image/Om-Sosmed-Platform-Illustration.webp',
    'image/Om-Sosmed-Platform-Illustration-small.webp',
    'https://socialbuilder.github.io/order.omsosmed.com/image/Layanan-Pelanggan-Om-Sosmed.webp',
    '/image/Layanan-Pelanggan-Om-Sosmed-small.webp',
    'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
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
                return fetch(event.request).then(
                    function(response) {
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 
