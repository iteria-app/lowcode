import { Project } from "ts-morph"
import ts from "typescript"
import { DevTools } from "../devtools"
import { astFindSource, codeStart, jsxElementGetAttributes } from "../tsx/ast"
import { createAst } from "../tsx/createSourceFile"
import { readFile, writeFile } from "../util/helperFunctions"
import {
  addRelativeImportWithMorph,
  renameFunctionWithMorph,
} from "../util/morphFunctions"
import {
  isValidJsxElement,
  castRouteNodeToProperType,
  findComponentNameInAttributes,
  cloneRouteElements,
} from "../util/routeHandlers"

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

    const code = await readFile(fileName).catch(err => {
      throw new Error(err)
    })
    console.log(code, fileName, columnNumber, lineNumber)

    if (ownerList && columnNumber && fileName && lineNumber && code) {
      if (ownerList[ownerList.length - 1].displayName === "Route") {
        const uncastedNode = await astFindSource(code, {
          fileName,
          columnNumber,
          lineNumber,
        })
        if (!uncastedNode) {
          throw new Error("Element was not found in code")
        }

        // Check if element returned from AST is valid Route element
        if (!isValidJsxElement(uncastedNode)) {
          throw new Error(
            "Element found in AST is not valid Opening/SelfClosing JSX Element"
          )
        }

        const node = castRouteNodeToProperType(uncastedNode)
        const attributes = jsxElementGetAttributes(node)

        const componentName = findComponentNameInAttributes(attributes)

        if (!componentName)
          throw new Error("Failed to extract component name from JSX tag")

        // Prompt for new page name
        const newPageName = window.prompt("New page name")
        if (!newPageName) return

        const startOfNode = codeStart(code, {
          fileName,
          columnNumber,
          lineNumber,
        })
        const ast = createAst(code)
        if (!startOfNode || !ast) throw new Error("Something went wrong")

        // Update AST
        const updatedAst = cloneRouteElements(
          node,
          ast,
          startOfNode,
          newPageName
        )
        const printer = ts.createPrinter()
        const newCode = printer.printFile(updatedAst)

        const project = new Project()
        // Add import with Ts-Morph
        const finalCode = addRelativeImportWithMorph(
          project,
          newCode,
          newPageName
        )

        writeFile(fileName, finalCode.print())

        const cloneCode = await readFile(
          `/Users/martinmecir/Desktop/Work/ionic-react-conference-app/src/pages/${componentName}.tsx`
        )

        const newReactPage = renameFunctionWithMorph(
          project,
          cloneCode,
          componentName,
          newPageName
        )

        writeFile(
          `/Users/martinmecir/Desktop/Work/ionic-react-conference-app/src/pages/${newPageName}.tsx`,
          newReactPage.print()
        )
      }
    }
  }
})
export {}
