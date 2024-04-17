let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                '/bootstrap.min.css',
                '/index.html',
                '/',
                "/users"
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 

self.addEventListener('registration', e => {
    console.log('Service worker registered');
});

self.addEventListener('push', e => {
    console.log('push received');
    const options = {
        body: 'Eine Umfrage ist fällig zum ausfüllen.',
        icon: 'images/surveyIcon-180x180.png',
        badge: 'images/surveyIcon-180x180.png',
        vibrate: [200, 100, 200]
    }
    e.waitUntil(self.registration.showNotification('Neue Umfrage!', options));
});