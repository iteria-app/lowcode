import HMR from '@sveltech/routify/hmr'
import App from './App.svelte';
import {handleMessage} from './store';
import './client';
import './svelte-listener/svelte';
import {addNodeListener} from './svelte-listener/listener';
//import {Block} from 'svelte/compiler/render_dom/Block'

let currentBlock = null

addNodeListener({
  add(node, anchor) {
    handleMessage({
      target: node.parent ? node.parent.id : null,
      anchor: anchor ? anchor.id : null,
      type: 'addNode',
      node//: serializeNode(node)
    })
  },

  remove(node) {
    handleMessage({
      type: 'removeNode',
      node//: serializeNode(node)
    })
  },

  update(node) {
    handleMessage({
      type: 'updateNode',
      node//: serializeNode(node)
    })
  },

  profile(frame) {
    handleMessage({
      type: 'updateProfile',
      frame
    })
  }
})

function logEvent(e) {
  console.log(e.type, currentBlock, e?.detail)
  if (e.type == 'SvelteRegisterBlock') {
    currentBlock = e.detail
    //devEvents.setCurrentBlock(currentBlock.detail.block)
  } else if (e.type == 'SvelteDOMInsert') {
    //devEvents.domInserted(currentBlock.detail.node)
  }
  //console.log('devEvents', devEvents)
}

function getOffset(element) {
    const styles = getComputedStyle(element)
    const margin = {
      top: Math.max(parseInt(styles.marginTop), 0),
      right: Math.max(parseInt(styles.marginRight), 0),
      bottom: Math.max(parseInt(styles.marginBottom), 0),
      left: Math.max(parseInt(styles.marginLeft), 0)
    }
  
    const rect = {
      width: element.offsetWidth + margin.right + margin.left,
      height: element.offsetHeight + margin.top + margin.bottom,
      top: element.offsetTop - margin.top,
      left: element.offsetLeft - margin.left
    }
  
    let parent = element
    while (
      (parent =
        parent.offsetParent || parent.ownerDocument.defaultView.frameElement)
    ) {
      rect.top += parent.offsetTop
      rect.left += parent.offsetLeft
    }
  
    parent = element
    while (
      (parent =
        parent.parentElement || parent.ownerDocument.defaultView.frameElement)
    ) {
      rect.top -= parent.scrollTop
      rect.left -= parent.scrollLeft
    }
  
    rect.right = rect.left + rect.width
    rect.bottom = rect.top + rect.height
  
    return rect
  }

function handleMousemove(e) {
  const target = e.target
  const offset = getOffset(target)
  console.log('mouse', offset, target)
}

function setupEventLog(root) {
  root.addEventListener('SvelteRegisterBlock', logEvent)
  root.addEventListener('SvelteDOMInsert', logEvent)
  root.addEventListener('SvelteDOMRemove', logEvent)
  root.addEventListener('SvelteRegisterComponent', logEvent)

  //root.addEventListener('mousemove', handleMousemove, true)
}
//setupEventLog(window.document)

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