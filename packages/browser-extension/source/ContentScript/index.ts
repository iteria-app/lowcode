import { browser } from "webextension-polyfill-ts"
import { DevToolsHook } from "../devtools"

console.log("helloworld from content script, som v contentscripte")

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: DevToolsHook | null | undefined
  }
}

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
  if (
    event?.data?.payload?.event == "inspectedElement" &&
    event?.data?.payload?.payload?.value
  ) {
    // const devTools = new DevTools(reactHook)
    //event?.data?.payload?.payload?.value?.id
    //event?.data?.payload?.payload?.value?.source
    //event?.data?.payload?.payload?.value?.props
    //event?.data?.payload?.payload?.value?.owners
    const source = event?.data?.payload?.payload?.value?.source
    //console.log("content.js source", source, event);
    if (source) {
      try {
        browser.runtime.sendMessage(event?.data?.payload)
      } catch (err) {
        //do nothing
      }
      //document.getElementById('sourcePath').innerHTML = source
      //document.getElementById('sourceLine').innerHTML = source.lineNumber
      //document.getElementById('sourcePath').innerHTML = source
    }
  }
})

browser.runtime.onConnect.addListener(port => {
  console.log("content.js onConnect port", port)
})
