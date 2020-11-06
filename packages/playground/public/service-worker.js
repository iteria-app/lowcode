//const CACHE = 'previewB'
const CONTROLLED = '/controlled/'
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
<Nested/>`;
const nestedSvelte = `<p>...don't affect this element
<i>ii</i><b id="ferino">bbb</b></p>`;

self.window = self; // egregious hack to get magic-string to work in a worker (window.btoa)

console.log('sw run service-worker.js', typeof window);

self.addEventListener('install', function (e) {
  console.log('sw installing', self.registration);
  self.skipWaiting();
});

self.addEventListener('message', function (e) {
  console.log('sw message', e);
});

importScripts('https://unpkg.com/svelte@3.29.4/compiler.js', 
  //'https://unpkg.com/esbuild-wasm@0.8.3/lib/browser.js'
  )

//const esbuildPromise = esbuild.startService({
//  wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.3/esbuild.wasm',
//  worker: false
//})

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
    return { source: appSvelte, filename: 'App.svelte' };
  }
  if (request.url.indexOf('Nested') >= 0) {
    return { source: nestedSvelte, filename: 'Nested.svelte' };
  }
  return null;
}

function respondWith(event, response) {
  event.respondWith(
    new Promise((resolve, reject) => {
      resolve(response);
      reject();
    }),
  );
}

function sv({ source, filename }) {
  const options = {
    dev: true,
    css: false,
    filename, //DOM element.__svelte_meta: {loc: char: 45, column: 13, file: "Nested.svelte", line: 1}
    sveltePath: 'https://unpkg.com/svelte@3.29.4', //parse package json version...
  };
  //const parsed = svelte.parse(source, options);
  const compiled = svelte.compile(source, options);
  //console.log('svelte compiled', compiled.js.code);

  return compiled.js.code.replaceAll(
    'https://unpkg.com/svelte@3.29.4/internal',
    'https://unpkg.com/svelte@3.29.4/internal/index.mjs',
  );
}

const svelteExt = '.svelte';
function svelteExtenstion(filename) {
  if (filename.endsWith(svelteExt)) {
    return filename;
  }
  return filename + svelteExt;
}

function svelteExtenstionToJs(filename) {
  if (filename.endsWith(svelteExt)) {
    return filename.substring(0, filename.length - svelteExt.length) + '.js';
  }
  return filename + '.js';
}

function newJavaScriptResponse(content) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
}

self.addEventListener('fetch', function (event) {
  const requestURL = new URL(event.request.url);
  console.log('sw fetch requestURL', requestURL.pathname, typeof esbuild);
  const c = content(event.request);
  if (c) {
    event.respondWith(
      caches.open('playground').then(async (cache) => {
        let source = null
        /*let jsMatch = await cache.match(
          svelteExtenstionToJs(requestURL.pathname),
        )
        if (jsMatch) {
          return jsMatch;
        }*/

        let svelteMatch = await cache.match(
          svelteExtenstion(requestURL.pathname),
        )
        if (!svelteMatch) {
          cache.put(
            svelteExtenstion(requestURL.pathname),
            newJavaScriptResponse(c.source),
          );
          svelteMatch = newJavaScriptResponse(c.source)
        }
        source = await svelteMatch.text()
        
        if (source) {
          const filename = requestURL.pathname.substring(CONTROLLED)
          const svContent =  sv({source, filename})
          //const svContent = sv(source);
          cache.put(
            svelteExtenstionToJs(requestURL.pathname),
            (/*jsMatch = */newJavaScriptResponse(svContent)),
          );
          return newJavaScriptResponse(svContent);
        }
      }),
    );
  } else if (event.request.mode === 'navigate') {
    console.log('sw navigate ', event);

    //const txt = event.request.url.substr(event.request.url.lastIndexOf('/'))
    const value = 'aaa'; //routes.some(r => r == txt)
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
    `;
    const headers = new Headers();
    headers.append('Content-Type', 'text/html');
    const init = { status: 200, statusText: 'OK', headers };
    respondWith(event, new Response(html, init));
    //} else if (assets.some(str => str == getValue(event.request.url))) {
    //event.respondWith(caches.match(getValue(event.request.url)))
  } else {
    console.log('sw fetch A', requestURL.pathname, event.request)
    
    /**/if (requestURL.pathname.startsWith(CONTROLLED)) {
      const stripControlled =  requestURL.pathname.substring(CONTROLLED.length)
      const filename =  svelteExtenstion(stripControlled)//'App.svelte'
      const filenameUrlEnc = encodeURI(filename).replaceAll('/', '%2F')
      const branch = 'gitlabAPI-lowcode'
      const gitlabUrl = `https://gitlab.com/api/v4/projects/18967974/repository/files/src%2F${filenameUrlEnc}?ref=${branch}`
  
      console.log('sw fetch B', gitlabUrl, event.request)
  
      const response = fetchFile(gitlabUrl, '<use your token>').then(svelteSource => {
        //TODO if *.ts esbuildPromise.then(transpiler.transform('enum Foo { A, B }', { loader: 'ts' })

        const aliases = {
          '@urql/svelte': 'https://unpkg.com/@urql/svelte@1.1.2/dist/urql-svelte.js',
          '@material/mwc-': 'https://unpkg.com/@material/mwc-',
          'svelte-i18n': 'https://unpkg.com/browse/svelte-i18n@3.1.0/dist/runtime.esm.js',
          'graphql-request': 'https://unpkg.com/graphql-request@3.3.0/dist/index.js',
        }
        for (const pkg in aliases) {
          svelteSource = svelteSource.replaceAll(pkg, aliases[pkg])
        }

        //svelteSource = svelteSource.replaceAll('import "@', 'import "https://unpkg.com/@')
        //svelteSource = svelteSource.replaceAll("import '@", "import 'https://unpkg.com/@")
        //svelteSource = svelteSource.replaceAll("from '@", "from 'https://unpkg.com/@")
        const jsSource = sv({source: svelteSource, filename})
        return newJavaScriptResponse(jsSource)
      })
      
      event.respondWith(response)
    } else/**/ {
      const response = fetch(event.request).then(response => {
       //console.log('sw fetch response', response)
       return response//TODO cache response
      })
      event.respondWith(response)
    }
  }
});

async function fetchFile(url, privateToken) {
  let gitlabFile = '';
  return await fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          cache: 'no-store',
          'PRIVATE-TOKEN': privateToken
      }
  })
      .then(res => {
          console.log("res", res)
          const result = res.json().then(data => {
              if (data.content) {
                let resData = window.atob(data.content); console.log(resData);
                return resData
              }
              return `/* 404 ${url} */`
          })

          console.log("RESPONSE", gitlabFile)
          return result
      })
}