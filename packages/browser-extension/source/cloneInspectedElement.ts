import { cloneRoute, cloneElement } from "./cloneElements"
import { InspectedElementPayload } from "./devtools"
import { readFile } from "./util/fetch"

import { CodeRW } from "./io/rw"

export async function cloneInspectedElement(inspectedElement: InspectedElementPayload, io: CodeRW) {  
  console.log('cloneInspectedElement A', inspectedElement)
  if (inspectedElement.value?.source) {
    const {
      columnNumber,
      fileName,
      lineNumber,
    } = inspectedElement.value?.source
    const ownerList = inspectedElement.value.owners
    console.log('cloneInspectedElement B', ownerList, columnNumber, fileName, lineNumber, event)
    
    if (ownerList && columnNumber && fileName && lineNumber) {
      const code = await readFile(fileName).catch(err => {
        throw new Error(err)
      })
      
      if (ownerList[ownerList.length - 1].displayName === "Route") {
        cloneRoute(code, { columnNumber, lineNumber, fileName }, io)
      } else if (
        ownerList[ownerList.length - 1].displayName === "IonTabButton"// TODO this is very specific and does nothing (this is just work in progress)
      ) {
        // TODO Somehow obtain source from Route at which IonTabButton points, then clone
        const href = inspectedElement.value?.props?.data?.href
        console.log(href)
        window.location.pathname = href
        const something = inspectedElement.value?.id
        console.log(something)
      } else {
        cloneElement(code, { columnNumber, lineNumber, fileName }, io)
      }
    }
  }
}
