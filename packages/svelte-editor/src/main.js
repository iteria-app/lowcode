import HMR from '@sveltech/routify/hmr'
import App from './App.svelte';
//import { elementBoundingBox } from '@iteria-ui/table-editor'
//import { newDevListener } from '@iteria-ui/table-editor/lib/svelte'

import { newDevListener } from './devlistener.js'

//console.log('kukik', elementBoundingBox(window.document.body))

window.__devListener = newDevListener()
window.__devListener.addEventListeners(window.document)

const app = HMR(App, { target: document.body }, 'routify-app')

export default app;


/** Service worker. Uncomment to use service worker */

// if ('serviceWorker' in navigator) {
//     import('workbox-window').then(async ({ Workbox }) => {
//         const wb = new Workbox('/sw.js')
//         const registration = await wb.register()
//         wb.addEventListener('installed', () => (console.log('installed service worker')))
//         wb.addEventListener('externalinstalled', () => (console.log('installed service worker')))  
//     })
// }