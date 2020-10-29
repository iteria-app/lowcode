const CACHE = 'previewB'
const CONTROLLED = '/controlled/'

console.log('service wokeeeer')

self.addEventListener('install', function(event) {
  console.log('The service worker is being installed...', event);
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
  // Open a cache and use `addAll()` with an array of assets to add all of them
  // to the cache. Ask the service worker to keep installing until the
  // returning promise resolves.
  //event.waitUntil(caches.open(CACHE).then(function (cache) {
  //  cache.addAll([
      //'./index.tsx',
      //'./index.svelte',
  //  ]);
  //}));
});


self.addEventListener('activate', function(event) {
  console.log('The service worker is being activated...', event);
  event.waitUntil(self.clients.claim()); // Become available to all pages
})

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  const url = new URL(evt.request.url)
  console.log('sw fetch', url.pathname, evt);
  if (url.pathname.startsWith(CONTROLLED)) {
    console.log('sw fetch - startsWith ', CONTROLLED)

    // You can use `respondWith()` to answer ASAP...
    const ch = fromCache(evt.request)
    console.log('sw ch', ch)
    evt.respondWith(ch);
    // ...and `waitUntil()` to prevent the worker to be killed until
    // the cache is updated.
    evt.waitUntil(
      update(evt.request)
      // Finally, send a message to the client to inform it about the
      // resource is up to date.
      .then(refresh)
    );
  }
});

self.addEventListener('message', function (evt) {
  console.log('postMessage received', evt.data);
})

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    //return cache.match(request);
    return new Response("<h1>Cauky!</h1>", {
      headers: {'Content-Type': 'text/html'}
    })
  })
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      console.log('sw net response', response)
      return cache.put(request, response.clone()).then(function () {
        return response;
      });
    });
  });
}

// Sends a message to the clients.
function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      // Encode which resource has been updated. By including the
      // [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
      // check if the content has changed.
      var message = {
        type: 'refresh',
        url: response.url,
        // Notice not all servers return the ETag header. If this is not
        // provided you should use other cache headers or rely on your own
        // means to check if the content has changed.
        eTag: response.headers.get('ETag')
      };
      // Tell the client about the update.
      client.postMessage(JSON.stringify(message));
    });
  });
}