import { DevTools } from "../devtools"

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
    const ownerList = devTools.getOwnersList(id)
    if (ownerList && columnNumber && fileName && lineNumber) {
      console.log("Mam vsetky", ownerList, columnNumber, fileName, lineNumber)
    }
  }
})
export {}
