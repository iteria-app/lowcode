import { addBorderFrame } from './border-frame/borderFrame';
import { CONTROLLED } from './controlled';
import { files, gitlabFetchFile } from './gitlab'
import { transpile } from './transpile'

const refreshButton = document.getElementById('refreshButton') as HTMLButtonElement;
const previewIframe = document.getElementById(
  'previewIframe',
) as HTMLIFrameElement;
console.log('initializing', previewIframe);

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .getRegistrations()
    .then(
      (registrations) => {
        console.log('sw prev registrations', registrations);
        const promises = registrations.map((registration) => {
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
        console.log('on sw listener message A', event);
      });

      navigator.serviceWorker
        .register('./service-worker.js', {
          scope: CONTROLLED,
        })
        .then(() => {
          console.log('serviceWorker then')
          refreshButton.disabled = false
          return navigator.serviceWorker.ready;
        })
        .then(() => {
          console.log('serviceWorker ready 1');
        });

      navigator.serviceWorker.ready
        .then(() => {
          console.log('serviceWorker ready 2');
        })
        .catch((e) => {
          console.error('service worker error', e);
        });
    });
} else {
  alert('NULL navigator.serviceWorker or navigator.serviceWorker.controller');
}

if (refreshButton) {
  refreshButton.onclick = (event) => {
    console.log('onclick', event)

    caches.open('playground').then((cache) => {
      for (const file of files) {
        if (file.name.endsWith('.ts')) {
          gitlabFetchFile(file.path).then(async (tsSource) => {
            if (typeof(tsSource) == 'string') {
              const transpiled = await transpile(tsSource)//TODO source map in response
              if (transpiled?.warnings?.length > 0) {
                console.warn('transpilation', transpiled.warnings)
              }
              console.log('transpiled', transpiled)
              if (transpiled?.code?.length > 0) {
                const jsPath = CONTROLLED + file.path.substring(0, file.path.length - '.ts'.length)+ '.js'
                cache.put(jsPath, newJavaScriptResponse(transpiled.code));
              }
            }
          })
        }
      }   
    });

    navigator.serviceWorker.getRegistrations().then(
      (v) => {
        console.log('sw registrations ', v);
      },
      (err) => {
        console.log('sw registration error ', err);
      },
    );

    if (previewIframe) {
      previewIframe.contentWindow?.navigator?.serviceWorker?.addEventListener(
        'message',
        function (event) {
          console.log('on sw listener message B', event);
        },
      );
      previewIframe.src = CONTROLLED + 'index.html';

      previewIframe.onload = () => {
        console.log('previewIframe onload', event, previewIframe)
        const innerDoc =
          previewIframe!.contentDocument ||
          previewIframe!.contentWindow!.document;
        addBorderFrame(innerDoc);
      };

      console.log(
        'XXXXXXXXXXXXXXXXXX',
        previewIframe,
        previewIframe.contentWindow?.navigator?.serviceWorker,
      );
    }
  };
}

function newJavaScriptResponse(content: string) : Response {
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
}
