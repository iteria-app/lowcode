import { browser } from "webextension-polyfill-ts"

function injectScript(file_path: string, tag: string) {
  var node = document.getElementsByTagName(tag)[0]
  var script = document.createElement("script")
  script.setAttribute("type", "text/javascript")
  script.setAttribute("src", file_path)
  node.appendChild(script)
}

injectScript(browser.extension.getURL("js/injectScript.bundle.js"), "body")

window.addEventListener("message", event => {
  //TODO if (event?.data?.payload?.event == "inspectedElement"
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

browser.runtime.onConnect.addListener(port => {
  console.log("content.js onConnect port", port)
})
