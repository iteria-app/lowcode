import { CONTROLLED } from './controlled'
import { loadHDTS } from './utils/loadGitlab'

const previewIframe = document.getElementById('previewIframe') as HTMLIFrameElement
console.log('initializing', previewIframe)



if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        console.log('sw prev registrations', registrations)
        const promises = registrations.map(registration => {
            return registration.unregister()
        })
        return Promise.all(promises)
    }, err => {
        console.log('sw registration error ', err)
    }).finally(() => {
        navigator.serviceWorker.addEventListener('message', function (event) {
            console.log('on sw listener message A', event)
        });


        function newResponse(content: string, contentType: string): Response {
            const headers = new Headers()
            headers.append("Content-Type", contentType)
            const init = { "status": 200, "statusText": "OK", headers };
            return new Response(content, init)
        }

        navigator.serviceWorker.register('./svelte-service-worker.js', {
            scope: 'svelte/'
        }).then(() => {
            return navigator.serviceWorker.ready;
        }).then(() => {
            console.log('serviceWorker ready 1')
        })

        navigator.serviceWorker.register('./service-worker.js', {
            scope: CONTROLLED
        }).then(() => {
            return navigator.serviceWorker.ready;
        }).then(() => {
            console.log('serviceWorker ready 1')
        })

        navigator.serviceWorker.ready.then(() => {
            console.log('serviceWorker ready 2')
        }).catch(e => {
            console.error('service worker error', e)
        });
        if (navigator.serviceWorker.controller) {
            console.log('sending ...')
            navigator.serviceWorker.controller.postMessage({ 'hello': 'world' })
        }
        console.log('sw AHOJ ', navigator.serviceWorker)
    })
} else {
    alert('NULL navigator.serviceWorker or navigator.serviceWorker.controller')
}

const refreshButton = document.getElementById('refreshButton')
if (refreshButton) {
    refreshButton.onclick = (event) => {
        navigator.serviceWorker.getRegistrations().then(v => {
            console.log('sw registrations ', v)
        }, err => {
            console.log('sw registration error ', err)
        })


        if (previewIframe) {
            previewIframe.contentWindow?.navigator?.serviceWorker?.addEventListener('message', function (event) {
                console.log('on sw listener message B', event)
            });
            previewIframe.src = CONTROLLED + 'index.html'

            console.log('XXXXXXXXXXXXXXXXXX', previewIframe.contentWindow?.navigator?.serviceWorker)
        }
        const code = loadHDTS()
        console.log("CODE", code)

    }
}