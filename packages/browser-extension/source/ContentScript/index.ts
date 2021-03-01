import { browser } from "webextension-polyfill-ts"

function injectScript(file_path: string, tag: string) {
  var node = document.getElementsByTagName(tag)[0]
  var script = document.createElement("script")
  script.setAttribute("type", "text/javascript")
  script.setAttribute("src", file_path)
  node.appendChild(script)
}

injectScript(browser.extension.getURL("js/injectScript.bundle.js"), "body")

//TODO if (event?.data?.payload?.event == "inspectedElement"
window.addEventListener("message", event => {
  const source = event?.data?.payload?.payload?.value?.source
  if (
    source
    //event?.data?.payload?.event == "inspectedElement"
  ) {
    console.log('ContentScript inspectedElement', event, 'ownersList', event?.data?.payload?.payload?.value?.owners)
    try {
      browser.runtime.sendMessage(event?.data?.payload)
    } catch (err) {
      //do nothing
    }
  }
})

window.addEventListener("load", () => {
  window.location.protocol
  window.location.hostname
  window.location.port

  fetch('/static/js/bundle.js.map').then(ret => ret.json()).then(it => {
    console.log('fetched /static/js/bundle.js.map sources', it?.sources)
    if (it?.sources?.length > 0) {
      const source0 = it.sources[0]
      const suffix = '/webpack/bootstrap'
      if (source0.endsWith(suffix)) {
        const srcPath = source0.substring(0, source0.length - suffix.length) + '/src'
        browser.runtime.sendMessage({ type: 'lowcodeSources', path: srcPath })
      }
    }
  })
})

browser.runtime.onConnect.addListener(port => {
  console.log("content.js onConnect port", port)
})
