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

async function fixJsResponse(response) {
  if (!response) {
    return;
  }
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

function newJavaScriptResponse(content) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
}

self.addEventListener('fetch', async function (event) {
  const requestURL = new URL(event.request.url);
  console.log('sw fetch A', requestURL.pathname, event.request);

  if (requestURL.pathname.startsWith(CONTROLLED + 'tryout.html')) {
    event.respondWith(fetch('/tryout.html'));
  } else if (requestURL.pathname.startsWith(CONTROLLED + 'svelte.html')) {
    event.respondWith(fetch('/svelte.html'));
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
          if (
            requestURL.pathname.endsWith('.css') ||
            requestURL.pathname.endsWith('.scss')
          ) {
            console.log('Now this is css', requestURL.pathname);
            return newJavaScriptResponse('');
          }
          console.log('Tu matchujem', requestURL.pathname);

          const res = await cache.match(requestURL.pathname);
          if (res) {
            console.log('Som v IF', requestURL.pathname);
            return cache.match(requestURL.pathname);
          } else {
            console.log('som v else', requestURL.pathname);
            if (requestURL.pathname === '/src/layouts/DashboardLayout/NavBar') {
              return cache.match(requestURL.pathname + '/index');
            }
            if (
              requestURL.pathname === '/src/layouts/DashboardLayout/NavItem'
            ) {
              return cache.match('/src/layouts/DashboardLayout/NavBar/NavItem');
            }

            return newJavaScriptResponse(`/*404*/export default {}`);
          }
        }
      }),
    );
  } else {
    if (requestURL.pathname.startsWith('/web_modules/')) {
      console.log('web_modules', requestURL.pathname);
    }
    if (requestURL.pathname.startsWith('/web_modules/')) {
      const pathName = requestURL.pathname.endsWith('.js')
        ? stripExtension(requestURL.pathname)
        : requestURL.pathname;

      console.log(pathName, 'fetchujem z cache');

      return event.respondWith(
        caches
          .open('web_modules')
          .then((cache) => cache.match(pathName))
          .then(fixJsResponse)
          .catch((err) => {
            console.error(err);
            throw new Error(err);
          }),
      );
    } else {
      event.respondWith(
        fetch(event.request, { redirect: 'follow' }),
        /*.then(fixJsResponse)
          .catch(() => {
            const newUrl2 = 'https://cdn.jsdelivr.net/' + requestURL.pathname;
            return fetch(newUrl2, { redirect: 'follow' })
              .then(fixJsResponse)
              .catch((err2) => {
                console.error('err fetch jsdelivr', err2);
                console.log('som v catch');
              });
          }),*/
      );
    }
  }
});
