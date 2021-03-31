import { DevTools, DevToolsHook, InspectedElementValue, OwnerListItem, triggerInspectElement } from "../react-lowcode/devtools"
import { LocaleMessageEditor, guessLocaleSourceUrl } from "@iteria-app/react-lowcode/esm/localization"
import { guessSourceDir } from "./source_dir"

console.log("helloworld from content script, som v contentscripte")

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: DevToolsHook | null | undefined
  }
}


let prevMouseOverTarget = null
addEventListener('mouseover', event => {
  const target = event.target as HTMLElement
  if (target && prevMouseOverTarget != event.target) {
    prevMouseOverTarget = event.target
    const devTools = new DevTools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
    triggerInspectElement(devTools, target)
  }
})

const localeMessageEditor = new LocaleMessageEditor()

addEventListener('click', event => {
  const target = event.target as HTMLElement
  console.log('click A', event.target)

  const devTools = new DevTools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
  const inspectedElementId = devTools.getIDForNode(target)
  if (inspectedElementId) {
    const inspectedElement = inspectedElements.get(inspectedElementId)
    if (inspectedElement) {
      localeMessageEditor.instrumentMessageHTML(target, inspectedElement, (event) => {
        const languageLocale = 'en' // FIXME hardocde - use IntlProvider context/property value
        const localeSourceUrl = guessLocaleSourceUrl(sourceDir, languageLocale)
        console.log('click success', event, sourceDir, localeSourceUrl)
        // if (localeSourceUrl) {
        //   this.io.readFile(localeSourceUrl).then((originalLocaleStringJSON) => {
        //     patchLocaleMessageSourceCode(messageId, newMessageValue, originalLocaleStringJSON)
        //   })
        // }
      })
    }
  }
})

const inspectedElements = new Map<number, InspectedElementValue>()
let sourceDir: string | undefined = undefined

window.addEventListener("message", async event => {
  if (
    event?.data?.payload?.event == "inspectedElement" &&
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  ) {
    const id = event?.data?.payload?.payload?.id
    const inspectedElement = event?.data?.payload?.payload?.value as InspectedElementValue
    if (inspectedElement?.id) {
      inspectedElements.set(inspectedElement?.id, inspectedElement)
    }

    if (event?.data?.payload?.payload?.value?.source?.lineNumber) {
      const {
        columnNumber,
        fileName,
        lineNumber,
      } = inspectedElement?.source
      const devTools = new DevTools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
      const ownerList = devTools.getOwnersList(id) // demonstration that we can call dev tools API here


      const srcDir = guessSourceDir(inspectedElement, ownerList)
      if (srcDir) {
        sourceDir = srcDir
      }
  
      console.log("InjectScript inspectedElement id=", id, ownerList, { fileName, srcDir }, { lineNumber, columnNumber }, event)
  

      window.postMessage({ ... event?.data?.payload, event: "inspectedElementSource" }, "*")
    }
  }
})
