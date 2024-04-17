let cacheData = 'appCache';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/signin?redirect=/',
                '/favicon.ico',
                '/static/js/main.chunk.js',
                '/static/js/vendors~main.chunk.js',
                '/static/js/bundle.js',
                '/'
            ])
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then((resp) => {
            console.log(resp);
            if(resp)
                return resp
        })
    )
})

self.addEventListener('registration', e => {
    console.log('Service worker registered');
});

self.addEventListener('push', e => {
    console.log('push received');
    const options = {
        body: 'Umfrage ist bereit zum ausfüllen.',
        icon: 'images/surveyIcon-180x180.png',
        badge: 'images/surveyIcon-180x180.png'
    }
    e.waitUntil(self.registration.showNotification('title', options));
});