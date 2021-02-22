import { Project } from "ts-morph"
import ts from "typescript"
import {
  SourceLineCol,
  astFindSource,
  jsxElementGetAttributes,
  startOfJsxNode,
} from "./tsx/ast"
import { cloneElementInAst } from "./tsx/clone"
import { createAst } from "./tsx/createSourceFile"
import { writeFile, readFile } from "./util/fetch"
import {
  renameFunctionWithMorph,
} from "./util/morphFunctions"
import {
  isValidJsxElement,
  castRouteNodeToProperType,
  findAttributeByName,
  cloneRouteElements,
} from "./util/routeHandlers"
import { CodeRW } from "./io/rw"

export const cloneRoute = async (routesCode: string, routesSource: SourceLineCol, io: CodeRW) => {
  // Prompt for new page name
  const newPageName = window.prompt(
    "Insert new page path!\nURL will be formatted as: base_url/YOUR_INPUT"
  )
  if (!newPageName) return


  const uncastedNode = astFindSource(routesCode, routesSource)
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
  const originalPageName = findAttributeByName(attributes, "component") 
  if (!originalPageName)
    throw new Error(
      "Failed to extract component name/render function from JSX tag"
    )
  const srcPath = stripFileName(routesSource.fileName)
  const originalPagePath = `${srcPath}/pages/${originalPageName}.tsx` // TODO check the relative import of the page
  const newPagePath = `${srcPath}/pages/${newPageName}.tsx`
  const newPageRelativeImport = `./pages/${newPageName}`

  const startOfNode = startOfJsxNode(routesCode, routesSource)
  const ast = createAst(routesCode)
  if (!startOfNode || !ast) throw new Error("Something went wrong - not found in AST")

  // Update AST
  const updatedAst = cloneRouteElements(node, ast, startOfNode, newPageName)
  const printer = ts.createPrinter()
  const newRoutesCode = printer.printFile(updatedAst)

  const project = new Project()
  const newRoutesFile = project.createSourceFile(`App.tsx`, newRoutesCode)
  newRoutesFile.addImportDeclaration({
    defaultImport: newPageName,
    moduleSpecifier: newPageRelativeImport,
  })

  const cloneCode = await io.readFile(originalPagePath)
  if (cloneCode) {
    const newReactPage = renameFunctionWithMorph(
      project,
      cloneCode,
      originalPageName,
      newPageName
    )
    io.writeFile(
      newPagePath,
      newReactPage.print()
    )
  }

  // write only if previous steps were successful
  writeFile(routesSource.fileName, newRoutesFile.print())
}

export const cloneElement = (code: string, source: SourceLineCol, io: CodeRW) => {
  const confirmed = window.confirm("Component will be cloned on this page")
  if (!confirmed) return

  const alteredAst = cloneElementInAst(code, source)
  if (!alteredAst) throw new Error("Error while cloning element")

  const printer = ts.createPrinter()
  const newCode = printer.printFile(alteredAst)

  io.writeFile(source.fileName, newCode)
}

function stripFileName(filePath: string) {
  const backslash = filePath.lastIndexOf('\\')
  if (backslash > 0) {
    return filePath.substring(0, backslash)
  }
  const slash = filePath.lastIndexOf('/')
  if (slash > 0) {
    return filePath.substring(0, slash)
  }

  return filePath
}
