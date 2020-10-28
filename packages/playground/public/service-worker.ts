var CACHE = 'previewA';

// On install, cache some resource.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  // Open a cache and use `addAll()` with an array of assets to add all of them
  // to the cache. Ask the service worker to keep installing until the
  // returning promise resolves.
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll([
      //'./index.js',
      //'./index.jsx',
      //'./index.tsx',
      //'./index.svelte',
    ]);
  }));
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  console.log('sw fetch', evt.request, evt);
  const url = new URL(evt.request.url)
  if (url.pathname.startsWith('/controlled/')) {
    console.log('sw fetch - startsWith controlled')

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

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    //return cache.match(request);
    return new Response("<h1>Hello!</h1>", {
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

/*
body: (...)
bodyUsed: false
headers: Headers {}
ok: false
redirected: false
status: 404
statusText: "Not Found"
type: "basic"
url: "http://localhost:8080/controlled/controlled.html"


body: ReadableStream
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: "OK"
type: "basic"
url: "http://localhost:8080/controlled/controlled.html"
*/

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
