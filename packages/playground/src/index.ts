import { addBorderFrame } from './border-frame/borderFrame';
import { CONTROLLED } from './controlled';
import { files, gitlabFetchFile } from './gitlab';
import { transpileEsbuild, transpileSvelte } from './transpile';

import { cdnImports } from './cdn';
import githubFetcher from './util/githubFetcher';

const refreshButton = document.getElementById(
  'refreshButton',
) as HTMLButtonElement;
const compileButton = document.getElementById(
  'compileButton',
) as HTMLButtonElement;
const previewIframe = document.getElementById(
  'previewIframe',
) as HTMLIFrameElement;
console.log('initializing', previewIframe);
const githubButton = document.getElementById('githubButton');

if (githubButton) {
  githubButton.onclick = async () => await githubFetcher();
}

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .getRegistrations()
    .then(
      (registrations) => {
        const promises = registrations.map((registration) => {
          console.log(
            'sw prev registration',
            registration.active,
            registration,
          );
          return registration.unregister();
        });
        return Promise.all(promises);
      },
      (err) => {
        console.log('sw registration error ', err);
      },
    )
    .finally(() => {
      navigator.serviceWorker.addEventListener('message', function (event) {
        console.log('on sw listener message aaa', event);
      });

      navigator.serviceWorker
        .register('./service-worker-fetch-cache.js', {
          scope: CONTROLLED,
        })
        .then((registration) => {
          console.log('serviceWorker then', registration.active, registration);
          if (refreshButton) {
            refreshButton.innerText = 'REFRESH';
            refreshButton.disabled = false;
          }
          if (compileButton) {
            compileButton.innerText = 'COMPILE';
            compileButton.disabled = false;
          }
        });
    });
} else {
  alert('NULL navigator.serviceWorker or navigator.serviceWorker.controller');
}

export function prefix(prefix: string, str: string) {
  console.log('prefix', prefix, str);
  if (!str.startsWith(prefix)) {
    return prefix + str;
  }
  return str;
}

const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width,initial-scale=1'>
    
      <title>Sevas</title>
    
      <link rel='icon' type='image/png' href='/favicon.png'>
      </head>
      <body>
      <p>KUKik4 App.js</p>
      <script type="module">
      //import App from '/src/App.js'
      import App from '/src/ActivityTypes.js'
      console.log('sevas App', App)
      try {
        new App({target: document.body})
      } catch(err) {
        console.log('App loading error', err)
      }
      </script>
    </body>
    </html>
    `;

if (compileButton) {
  compileButton.onclick = async (event) => {
    caches.open('playground').then(async (cache) => {
      //cache.put(CONTROLLED + 'index.html', newHtmlResponse(html))

      /**const dependencies = {
        "@fullcalendar/core": "^4.4.2",
        //     "@material/mwc-textfield": "^0.15.0",
        "svelte/store": "^3.29.4"
      }
      Object.entries(dependencies).forEach(async ([pkg, ver]) => {
        const dep = await dependency(pkg)// + '@' + ver
        console.log('dep', pkg, ver, dep)
        cache.put('/src/' + pkg, newJavaScriptResponse(dep.code))
      })/**/

      /**/ for (const file of files) {
        if (file.name.endsWith('.js')) {
          gitlabFetchFile(file.path).then(async (source) => {
            if (typeof source == 'string') {
              const jsPath = prefix(
                CONTROLLED,
                prefix(
                  '/',
                  file.path.substring(0, file.path.length - '.js'.length),
                ),
              );
              const sourceCdn = await cdnImports(source);
              cache.put(jsPath, newJavaScriptResponse(sourceCdn));
            }
          });
        } else if (file.name.endsWith('.svelte')) {
          gitlabFetchFile(file.path).then(async (source) => {
            if (typeof source == 'string') {
              try {
                const transpiled = await transpileSvelte(source, file.path);
                const sourceCdn = await cdnImports(transpiled.code);
                cache.put(
                  prefix(CONTROLLED, prefix('/', transpiled.path)),
                  newJavaScriptResponse(sourceCdn),
                );
              } catch (err) {
                console.error('error transpiling svelte', file, err);
              }
            }
          });
        } else if (
          file.name.endsWith('.ts') ||
          file.name.endsWith('.jsx') ||
          file.name.endsWith('.tsx')
        ) {
          gitlabFetchFile(file.path).then(async (tsSource) => {
            if (typeof tsSource == 'string') {
              const transpiled = await transpileEsbuild(tsSource, file.path); //TODO source map in response
              if (transpiled?.warnings?.length > 0) {
                console.warn('transpilation', transpiled.warnings);
              }
              if (file.name.indexOf('graphql') >= 0) {
                console.log('gitlab graphql', file.name);
              }
              console.log('transpiled', transpiled);
              if (transpiled?.code?.length > 0) {
                const sourceCdn = await cdnImports(transpiled.code);
                cache.put(
                  prefix(CONTROLLED, prefix('/', transpiled.path)),
                  newJavaScriptResponse(sourceCdn),
                );
              }
            }
          });
        }
      } /**/
    });
  };
}

if (refreshButton) {
  refreshButton.onclick = async (event) => {
    console.log('onclick', event);

    //const resultReact = await resolver.getUrlForBareModule('htm', '3.0.4', '/react');
    //console.log('getUrlForBareModule react', resultReact)
    //const resultX = await resolver.getUrlForBareModule('intl-messageformat', '7.2.4', '/');
    //console.log('getUrlForBareModule intl-messageformat', resultX)
    //resolver.readFileContent //resolve(new Uri('intl-messageformat'))

    if (previewIframe) {
      /**/ previewIframe.contentWindow?.navigator?.serviceWorker?.addEventListener(
        'message',
        function (event) {
          console.log('on sw listener message B', event);
        },
      );
      //previewIframe.src = CONTROLLED + 'index.html';
      //previewIframe.src = 'svelte.html';
      previewIframe.src = CONTROLLED + 'tryout.html';
      console.log('Som v previewIframe', previewIframe.src);
      // const previewDoc = previewIframe.contentDocument;
      // previewDoc?.open();
      // previewDoc?.write(html);
      // previewDoc?.close();

      previewIframe.onload = () => {
        console.log(
          'previewIframe onload',
          previewIframe.src,
          event,
          previewIframe,
        );

        const innerDoc =
          previewIframe!.contentDocument ||
          previewIframe!.contentWindow!.document;
        addBorderFrame(innerDoc);

        const previewDoc = previewIframe.contentDocument;
        // previewDoc?.open();
        // previewDoc?.write(html);
        // console.log('tu som');
        // previewDoc?.close();
      };

      console.log(
        'XXXXXXXXXXXXXXXXXX',
        previewIframe,
        previewIframe.contentWindow?.navigator?.serviceWorker,
      );
      previewIframe.contentWindow?.navigator?.serviceWorker
        .getRegistrations()
        .then((regs) =>
          regs.forEach((reg) => {
            console.log('XXXXX reg.active', reg.active);
            reg.active?.postMessage('abcd');
          }),
        ); /**/
    }
  };
}

export function newJavaScriptResponse(content: string): Response {
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
}
function newHtmlResponse(content: string): Response {
  const headers = new Headers();
  headers.append('Content-Type', 'text/html');
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
}
