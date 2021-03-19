import { ScriptKind, ScriptTarget } from "@ts-morph/common"
import { changeLocaleFile, getValuesFromLocalizationASTJSON } from "../localization/localizations"
import { createAst } from "../react-lowcode/ast/factory"
import { DevTools, DevToolsHook, InspectedElementValue, OwnerListItem, triggerInspectElement } from "../react-lowcode/devtools"
import { fetchLocalCode } from "../react-lowcode/devtools/fetchLocalCode"

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


let prevContenEditableId = null
addEventListener('click', event => {
  const target = event.target as HTMLElement
  console.log('click A', event.target)
  if (typeof target?.contentEditable != 'undefined' && target.contentEditable !== 'true' && target.children.length == 0) {
    const devTools = new DevTools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
    //triggerInspectElement(devTools, target)
    const id = devTools.getIDForNode(target)
    if (id == prevContenEditableId) {
      return
    }
    prevContenEditableId = id

    const ownerList = devTools.getOwnersList(id)
    console.log('click B editable', id, ownerList, cacheComponentIds.get(id - 1), cacheComponentIds.get(id), cacheComponentIds.get(id + 1), cacheComponentIds)

    const inspectedElement = cacheComponentIds.get(id)
    if (inspectedElement.displayName == "FormattedMessage") {
      const messageId = inspectedElement.props.data?.id
      console.log('click C FormattedMessage', messageId, inspectedElement, sourceDir)
      if (messageId) {
        const languageLocale = 'en' // FIXME hardocde - use IntlProvider context/property value
        const localeSourceUrl = guessLocaleSourceUrl(sourceDir, languageLocale)
        if (localeSourceUrl) {
          edittedMessage(messageId, target, localeSourceUrl, languageLocale)
        }
      }
    }
  }
})

function guessSourceDir(inspectedElement: InspectedElementValue, ownerList?: OwnerListItem[] | null) {
  const inspectedUrl = guessSourceDirFromFileName(inspectedElement?.source?.fileName)
  console.log('click guess source dir', inspectedElement?.source?.fileName, inspectedUrl, inspectedElement, ownerList)
  if (inspectedUrl) {
    return inspectedUrl
  }

  for (let owner of ownerList ?? []) {
    const fileName = cacheComponentIds.get(owner.id)?.source?.fileName
    if (fileName) {
      const url = guessSourceDirFromFileName(fileName)
      if (url) {
        return url
      }
    }
  }
}

function guessSourceDirFromFileName(inspectedFileName?: string) {
  if (!inspectedFileName?.length) {
    return undefined
  }
  const src = '/src/'
  const srcChar = inspectedFileName?.indexOf(src)
  if (srcChar > 0) {
    return inspectedFileName.substring(0, srcChar + src.length)
  }

  const srcWindows = '\\src\\'
  const srcCharWindows = inspectedFileName?.indexOf(srcWindows)
  if (srcCharWindows > 0) {
    return inspectedFileName.substring(0, srcCharWindows + srcWindows.length)
  }
}

function guessLocaleSourceUrl(sourceDir: string, languageLocale = 'en') {
  if (!sourceDir) {
    return undefined
  }
  return `${sourceDir}/compiled-lang/${languageLocale ?? 'en'}.json` // FIXME hardcoded file path
}

function edittedMessage(messgeId: string, target: HTMLElement, localeSourceUrl: string, languageLocale = 'en') {
  target.contentEditable = 'true' 
  target.focus()
  function blurHandler(event: FocusEvent) {
    target.contentEditable = 'false'
    target.removeEventListener('blur', blurHandler)
    
    const newMessageValue = event.target['innerHTML']
    
    console.log('click edittedMessage', messgeId, { localeSourceUrl }, event.target['innerText'], event.target['innerHTML'], cacheComponentIds)
    updateLocaleMessageFile(messgeId, newMessageValue, localeSourceUrl, languageLocale)

    prevContenEditableId = null
  }
  target.addEventListener('blur', blurHandler)
  // TODO ESC key target.addEventListener('input', inputHandler)
}

async function updateLocaleMessageFile(messageId: string, newMessageValue: string, localeSourceUrl: string, languageLocale = 'en') {
  const localeResponse = await fetchLocalCode(localeSourceUrl)
  if (localeResponse.body) {
    const newFileContent = updateLocaleMessageSourceCode(messageId, newMessageValue, localeResponse.body, languageLocale)
    console.log('click D', messageId, newMessageValue, { newFileContent, originalFileContent: localeResponse.body})
  }
}
function updateLocaleMessageSourceCode(messageId: string, newValue: string, localeSourceCode: string, languageLocale = 'en') {
  const localeAst = createAst(localeSourceCode, ScriptTarget.ESNext, ScriptKind.JSON)
  const originalMessages = getValuesFromLocalizationASTJSON(localeAst, languageLocale)
  const found = originalMessages.find((message) => message.id == messageId)
  if (found) {
    const changedMessage = {
      ...found,
      value: newValue
    }
    return changeLocaleFile('en', originalMessages, [changedMessage])
  }
}

let sourceDir: string | undefined
const cacheComponentIds = new Map<number, InspectedElementValue>()
let prevId = -1
window.addEventListener("message", async event => {
  if (
    event?.data?.payload?.event == "inspectedElement" &&
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__
  ) {
    const id = event.data.payload.payload.id
    const inspectedElement = event?.data?.payload?.payload?.value as InspectedElementValue
    cacheComponentIds.set(id, inspectedElement)

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
  
      console.log("InjectScript inspectedElement id=", id, ownerList, { fileName, sourceDir }, { lineNumber, columnNumber }, event)
  

      window.postMessage({ ... event?.data?.payload, event: "inspectedElementSource" }, "*")
    }
  }
})
