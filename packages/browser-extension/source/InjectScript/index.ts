import { DevTools, DevToolsHook } from "../react-lowcode/devtools"

console.log("helloworld from content script, som v contentscripte")

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: DevToolsHook | null | undefined
  }
}

window.addEventListener("message", async event => {
  if (
    event?.data?.payload?.event == "inspectedElement" &&
    event?.data?.payload?.payload?.value?.source &&
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  ) {
    const id = event.data.payload.payload.id
    const {
      columnNumber,
      fileName,
      lineNumber,
    } = event?.data?.payload?.payload?.value?.source
    const devTools = new DevTools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
    const ownerList = devTools.getOwnersList(id) // demonstration that we can call dev tools API here

    console.log("InjectScript inspectedElement", ownerList, columnNumber, fileName, lineNumber, event)
  
    window.postMessage({ ... event?.data?.payload, event: "inspectedElementSource" }, "*")
  }
})
