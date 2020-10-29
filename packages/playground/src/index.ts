import { CONTROLLED } from './controlled'

const previewIframe = document.getElementById('previewIframe') as HTMLIFrameElement
console.log('initializing', previewIframe)



if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js', {
        scope: CONTROLLED
    });
    
    navigator.serviceWorker.ready.then(() => {
        console.log('serviceWorker ready')
    }).catch(e => {
        console.error('service worker error', e)
    });
    
    if (navigator.serviceWorker.controller) {
        console.log('sending ...')
        navigator.serviceWorker.controller.postMessage({'hello': 'world'})
    }
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
            previewIframe.src = CONTROLLED + 'index.html'
        }
    }
}