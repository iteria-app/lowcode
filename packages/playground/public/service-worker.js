//const CACHE = 'previewB'
//const CONTROLLED = '/controlled/'
const appSvelte = `<script>
import Nested from './Nested.svelte';
</script>

<style>
p {
color: purple;
font-family: 'Comic Sans MS', cursive;
font-size: 2em;
}
</style>

<p>These styles...</p>
<Nested/>`
const nestedSvelte = `<p>...don't affect this element
<i>ii</i><b id="ferino">bbb</b></p>`


self.window = self; // egregious hack to get magic-string to work in a worker (window.btoa)

console.log('sw run service-worker.js', typeof window)

self.addEventListener('install', function(e) {
  console.log('sw installing', self.registration)
  self.skipWaiting();
});

importScripts('https://unpkg.com/svelte@3.29.4/compiler.js')

/*self.addEventListener('activate', function(e) {
  console.log('sw activating', self.registration)

  self.registration.unregister()
    .then(function() {
      return self.clients.matchAll();
    })
    .then(function(clients) {
      console.log('sw unregistering', clients)

      clients.forEach(client => {
        console.log('sw unregister => navigate', client.url)
        client.navigate(client.url)
      });
    });
});*/

function content(request) {
  if (request.url.indexOf('App') >= 0) {
    return {source: appSvelte, filename: 'App.svelte'}
  }
  if (request.url.indexOf('Nested') >= 0) {
    return {source: nestedSvelte, filename: 'Nested.svelte'}
  }
  return null
}

function respondWith(event, response) {
  event.respondWith(new Promise((resolve, reject) => { 
    resolve(response); 
    reject()  
  } ))
}

function sv({source, filename}) {
  const options = {
    dev: true,
    css: false,
    filename,//DOM element.__svelte_meta: {loc: char: 45, column: 13, file: "Nested.svelte", line: 1}
    sveltePath: 'https://unpkg.com/svelte@3.29.4'//parse package json version...
  }
  //const parsed = svelte.parse(source, options);
  const compiled = svelte.compile(source, options)
  console.log('svelte compiled', compiled.js.code)

  return compiled.js.code.replaceAll('https://unpkg.com/svelte@3.29.4/internal', 'https://unpkg.com/svelte@3.29.4/internal/index.mjs')
}

const svelteExt = '.svelte'
function svelteExtenstion(filename) {
  if (filename.endsWith(svelteExt)) {
    return filename
  }
  return filename + svelteExt
}

function svelteExtenstionToJs(filename) {
  if (filename.endsWith(svelteExt)) {
    return filename.substring(0, filename.length - svelteExt.length) + '.js'
  }
  return filename + '.js'
}

function newJavaScriptResponse(content) {
  const headers = new Headers()
  headers.append("Content-Type", "application/javascript")
  const init = { "status" : 200 , "statusText": "OK", headers };
  return new Response(content, init)
}

self.addEventListener('fetch', function(event) {
  const requestURL = new URL(event.request.url)
  console.log('sw fetch requestURL', requestURL.pathname)
  const c = content(event.request)
  if (c) {
    event.respondWith(caches.open('playground').then(async cache => {
      let jsMatch = await cache.match(svelteExtenstionToJs(requestURL.pathname))
      if (jsMatch) {
        return jsMatch
      }
      let svelteMatch = await cache.match(svelteExtenstion(requestURL.pathname))
      if (!svelteMatch) {
        cache.put(svelteExtenstion(requestURL.pathname), svelteMatch = newJavaScriptResponse(c.source))
      }
      console.log('sw match', svelteMatch)
      //TODO const text = await svelteMatch.text()//TODO filename => sv({source: text, filename})
      const svContent = sv(c)
      cache.put(svelteExtenstionToJs(requestURL.pathname), jsMatch = newJavaScriptResponse(svContent))
      return jsMatch
    }))
  } else if (event.request.mode === 'navigate') {
    console.log('sw navigate ', event)
    //const txt = event.request.url.substr(event.request.url.lastIndexOf('/'))
    const value = 'aaa'//routes.some(r => r == txt) 
    //? txt == '/' ? 'home' : txt.substr(1)
    //: '404'

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width,initial-scale=1'>
    
      <title>Sevas</title>
    
      <link rel='icon' type='image/png' href='/favicon.png'>
      <!--
      <link rel='stylesheet' href='/global.css'>
      <link rel='stylesheet' href='/components/header.css'>
      <link rel='stylesheet' href='/components/${value}.css'>
      <script defer src='/components/header.js'></script>
      <script defer src='/components/${value}.js'></script>
      https://unpkg.com/svelte@3.29.4/internal/index.mjs
      -->
      </head>
      <body>
      <script type="module">
      import App from './App'
      new App({target: document.body})
      </script>
    </body>
    </html>
    `
    const headers = new Headers()
    headers.append("Content-Type", "text/html")
    const init = { "status" : 200 , "statusText": "OK", headers };
    respondWith(event, new Response(html, init))
  //} else if (assets.some(str => str == getValue(event.request.url))) {
    //event.respondWith(caches.match(getValue(event.request.url)))
  } else {
    console.log('sw fetch ', event.request)
    event.respondWith(fetch(event.request).then(response => {
      console.log('sw fetch response', response)
      return response//TODO cache response
    }))
  }
});
