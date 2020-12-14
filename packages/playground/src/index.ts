import { addBorderFrame } from './border-frame/borderFrame';
import { CONTENT_TYPE_CSS, CONTENT_TYPE_JS, CONTROLLED } from './constants';
import { gitlabFetchFile, gitlabFetchFiles } from './gitlab';
import { transpileEsbuild, transpileSvelte } from './transpile';
import { cdnImports, dependency } from './cdn';
import {
  fetchDependenciesFromGitHub,
  fetchProjectFromGitHub,
} from './util/githubFetcher';
import { newCustomResponse } from './util/cacheHandlers';

import examplePackage from './util/examplePackage';

const refreshButton = document.getElementById(
  'refreshButton',
) as HTMLButtonElement;
const bundleDepsButton = document.getElementById(
  'bundleDepsButton',
) as HTMLButtonElement;
const compileButton = document.getElementById(
  'compileButton',
) as HTMLButtonElement;
const previewIframe = document.getElementById(
  'previewIframe',
) as HTMLIFrameElement;
console.log('initializing', previewIframe);
const githubProjectButton = document.getElementById('githubProjectButton');
const githubDependenciesButton = document.getElementById(
  'githubDependenciesButton',
);

if (githubProjectButton) {
  githubProjectButton.onclick = async () => await fetchProjectFromGitHub();
}

if (githubDependenciesButton) {
  githubDependenciesButton.onclick = async () =>
    await fetchDependenciesFromGitHub();
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
          if (bundleDepsButton) {
            bundleDepsButton.innerText = 'BUNDLE DEPS';
            bundleDepsButton.disabled = false;
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
      const privateToken = window.prompt('personal token');
      if (!privateToken) {
        return;
      }

      let promises: Array<Promise<void>> = [];
      const files = await gitlabFetchFiles(privateToken);
      for (const file of files) {
        if (file.name.endsWith('.js') || file.name.endsWith('.ts')) {
          const jsPath = prefix(
            CONTROLLED,
            prefix(
              '/',
              file.path.substring(0, file.path.length - '.js'.length),
            ),
          );
          if (jsPath.indexOf('fullcalendar') >= 0) {
            const promise = cache.put(
              jsPath,
              newCustomResponse('', CONTENT_TYPE_JS),
            );
            promises = [...promises, promise];
          }
        }
      }
      Promise.all(promises);

      let cssImports: Array<String> = [];

      for (const file of files) {
        if (file.name.endsWith('.js')) {
          const promise = gitlabFetchFile(file.path, privateToken).then(
            async (source) => {
              if (file.path.endsWith('src/graphql.ts')) {
                console.log('sk locale', file);
              }
              if (typeof source == 'string') {
                const jsPath = file.path.substring(
                  0,
                  file.path.length - '.js'.length,
                );

                const sourceCdn = await cdnImports(source, file.path);
                cssImports = [...cssImports, ...sourceCdn.imports];
                const copyCache = await caches.open('copy_cache');
                copyCache.put(
                  jsPath,
                  newCustomResponse(source, CONTENT_TYPE_JS),
                );
                cache.put(
                  jsPath,
                  newCustomResponse(sourceCdn.source, CONTENT_TYPE_JS),
                );
              }
            },
          );
          promises = [...promises, promise];
        } else if (file.name.endsWith('.svelte')) {
          const promise = gitlabFetchFile(file.path, privateToken).then(
            async (source) => {
              if (typeof source == 'string') {
                try {
                  console.log('toto je file.path', file.path);
                  const transpiled = await transpileSvelte(source, file.path);
                  console.log('svelte file', file);
                  const sourceCdn = await cdnImports(
                    transpiled.code,
                    file.path,
                  );
                  const copyCache = await caches.open('copy_cache');
                  copyCache.put(
                    prefix(CONTROLLED, prefix('/', transpiled.path)),
                    newCustomResponse(source, CONTENT_TYPE_JS),
                  );
                  cache.put(
                    prefix(CONTROLLED, prefix('/', transpiled.path)),
                    newCustomResponse(sourceCdn.source, CONTENT_TYPE_JS),
                  );
                  if (transpiled.css.code) {
                    cssImports.push(
                      `@import "${prefix(
                        CONTROLLED,
                        prefix('/', `${transpiled.path}.css`),
                      )}";`,
                    );
                    cache.put(
                      prefix(CONTROLLED, prefix('/', `${transpiled.path}.css`)),
                      newCustomResponse(transpiled.css.code, CONTENT_TYPE_CSS),
                    );
                  }
                  cssImports = [...sourceCdn.imports, ...cssImports];
                } catch (err) {
                  console.error('error transpiling svelte', file, err);
                }
              }
            },
          );
          promises = [...promises, promise];
        } else if (
          file.name.endsWith('.ts') ||
          file.name.endsWith('.jsx') ||
          file.name.endsWith('.tsx')
        ) {
          const promise = gitlabFetchFile(file.path, privateToken).then(
            async (tsSource) => {
              if (
                file.path.endsWith('src/graphql.ts') ||
                file.path.indexOf('OperationsCopy') >= 0
              ) {
                console.log('fetched', file, tsSource);
              }

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
                  const sourceCdn = await cdnImports(
                    transpiled.code,
                    file.path,
                  );
                  cssImports = [...cssImports, ...sourceCdn.imports];

                  cache.put(
                    prefix(CONTROLLED, prefix('/', transpiled.path)),
                    newCustomResponse(sourceCdn.source, CONTENT_TYPE_JS),
                  );
                }
              }
            },
          );
          promises = [...promises, promise];
        } else if (file.name.endsWith('.css')) {
          const source = await gitlabFetchFile(file.path, privateToken);
          if (typeof source == 'string') {
            // const matches = source.match(/@import[\s]*url\([^\)]*\);/gm);
            // if (matches?.length) {
            //   cssImports = [...matches, ...cssImports];
            // }
            cssImports.push(
              `@import "${prefix(CONTROLLED, prefix('/', file.path))}";`,
            );
            console.log(
              'Toto je css import',
              `@import "${prefix(
                CONTROLLED,
                prefix('/', `${file.path}.css`),
              )}";`,
            );
            cache.put(
              prefix(CONTROLLED, prefix('/', file.path)),
              newCustomResponse(source, CONTENT_TYPE_CSS),
            );
          }
        }
      }
      await Promise.all(promises);

      const headers = new Headers();
      headers.append('Content-Type', 'text/css');
      const init = { status: 200, statusText: 'OK', headers };
      console.log('toto su css imports', cssImports);

      cache.put('/dist/imports.css', new Response(cssImports.join('\n'), init));
    });
  };
}

if (bundleDepsButton) {
  bundleDepsButton.onclick = async (event) => {
    console.log('bundling dependencies', event);

    Object.entries(examplePackage.dependencies).forEach(async ([pkg, ver]) => {
      const dep = await dependency(pkg); // + '@' + ver
      console.log('dep', pkg, ver, dep);
      caches.open('playground').then(async (cache) => {
        const depCode = await dep.code;
        cache.put(
          '/unpkg.com/' + pkg,
          newCustomResponse(depCode.code, CONTENT_TYPE_JS),
        );
      });
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
      previewIframe.src = CONTROLLED + 'svelte.html';
      //previewIframe.src = CONTROLLED + 'tryout.html';
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

// export function newCustomResponse(content: string): Response {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/javascript; charset=utf-8');
//   const init = { status: 200, statusText: 'OK', headers };
//   return new Response(content, init);
// }
// function newHtmlResponse(content: string): Response {
//   const headers = new Headers();
//   headers.append('Content-Type', 'text/html');
//   const init = { status: 200, statusText: 'OK', headers };
//   return new Response(content, init);
// }
