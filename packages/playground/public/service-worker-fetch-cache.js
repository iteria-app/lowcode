//const CACHE = 'previewB'
const CONTROLLED = '/src/';

self.window = self; // egregious hack to get magic-string to work in a worker (window.btoa)

console.log('sw run service-worker.js', typeof window);

self.addEventListener('install', function (e) {
  console.log('sw installing', self.registration);
  self.skipWaiting();
});

self.addEventListener('message', function (event) {
  console.log('sw message', event);
  //https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/message_event
  event.source.postMessage('answer');
});

importScripts('https://unpkg.com/svelte@3.29.4/compiler.js');

function respondWith(event, response) {
  event.respondWith(
    Promise((resolve, reject) => {
      resolve(response);
      reject();
    }),
  );
}

function stripExtension(filename) {
  const dot = filename.lastIndexOf('.');
  const hasExtension = dot > 0 && dot < filename.length;
  if (hasExtension) {
    return filename.substring(0, dot);
  }

  return filename;
}

function newJavaScriptResponse(content) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
}

self.addEventListener('fetch', function (event) {
  const requestURL = new URL(event.request.url);
  console.log('sw fetch A', requestURL.pathname, event.request);

  if (requestURL.pathname.startsWith(CONTROLLED + 'tryout.html')) {
    event.respondWith(fetch('/tryout.html'));
  } else if (requestURL.pathname.startsWith(CONTROLLED)) {
    event.respondWith(
      caches.open('playground').then(async (cache) => {
        if (
          requestURL.pathname.endsWith('.svelte') ||
          requestURL.pathname.endsWith('.js') ||
          requestURL.pathname.endsWith('.ts') ||
          requestURL.pathname.endsWith('.jsx') ||
          requestURL.pathname.endsWith('.tsx')
        ) {
          const newPath = stripExtension(requestURL.pathname);
          console.log('sw fetch B', newPath, event.request);

          const response = await cache.match(newPath);
          if (!response || response.type.indexOf('html') >= 0) {
            return newJavaScriptResponse(`/*404*/export default {}`);
          }

          if (requestURL.pathname.indexOf('App.js') >= 0) {
            console.log('App.js', response);
          }

          const text = await response.text();
          if (!text || !text.trim().length) {
            return newJavaScriptResponse(`/*404*/export default {}`);
          }

          return newJavaScriptResponse(text);
        } else {
          if (requestURL.pathname.endsWith('.css')) {
            console.log('Now this is css', requestURL.pathname);
            return newJavaScriptResponse('');
          }
          console.log('TU MATCHUJEM TOTO:', requestURL.pathname);
          return cache.match(requestURL.pathname);
        }
      }),
    );
  } else {
    async function fixJsResponse(response) {
      const text = await response.text();
      return newJavaScriptResponse(
        text
          .replace('process.env.NODE_ENV', "'development'")
          .replace(
            'https://unpkg.com/intl-messageformat@^9.3.15?module',
            'https://unpkg.com/intl-messageformat@9.3.15/lib/index.js?module',
          )
          .replace(
            'https://unpkg.com/intl-messageformat-parser@6.0.13?module',
            'https://unpkg.com/intl-messageformat-parser@6.0.13/lib/index.js?module',
          ),
      );
    }
    event.respondWith(
      fetch(event.request.url, { redirect: 'follow' })
        .then(fixJsResponse)
        .catch((err) => {
          //fallback
          const newUrl2 = 'https://cdn.skypack.dev' + requestURL.pathname;
          return fetch(newUrl2, { redirect: 'follow' })
            .then(fixJsResponse)
            .catch((err2) => {
              console.error('err fetch unpkg', err2);
            });
        }),
    );
  }
});
