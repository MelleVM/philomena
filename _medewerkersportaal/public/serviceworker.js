const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css', 'https://cdn.jsdelivr.net/npm/remixicon@2.3.0/fonts/remixicon.css'];

const self = this;

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                
                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
// check for internetconnection
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cachename)
                }
            })
        ))
    )
});