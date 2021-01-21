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
import { writeFile, readFile } from "./util/helperFunctions"
import {
  addRelativeImportWithMorph,
  renameFunctionWithMorph,
} from "./util/morphFunctions"
import {
  isValidJsxElement,
  castRouteNodeToProperType,
  findAttributeByName,
  cloneRouteElements,
} from "./util/routeHandlers"

export const cloneRoute = async (code: string, source: SourceLineCol) => {
  const uncastedNode = astFindSource(code, source)
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
  const componentAttribute = findAttributeByName(attributes, "component")

  if (!componentAttribute)
    throw new Error(
      "Failed to extract component name/render function from JSX tag"
    )

  // Prompt for new page name
  const newPageName = window.prompt(
    "Insert new page path!\nURL will be formatted as: base_url/YOUR_INPUT"
  )
  if (!newPageName) return

  const startOfNode = startOfJsxNode(code, source)
  const ast = createAst(code)
  if (!startOfNode || !ast) throw new Error("Something went wrong")

  // Update AST
  const updatedAst = cloneRouteElements(node, ast, startOfNode, newPageName)
  const printer = ts.createPrinter()
  const newCode = printer.printFile(updatedAst)

  const project = new Project()
  const file = project.createSourceFile(`App.tsx`, newCode)
  // Add import with Ts-Morph
  addRelativeImportWithMorph(file, newPageName)

  writeFile(source.fileName, file.print())

  const cloneCode = await readFile(
    `/Users/martinmecir/Desktop/Work/ionic-react-conference-app/src/pages/${componentAttribute}.tsx`
  )

  const newReactPage = renameFunctionWithMorph(
    project,
    cloneCode,
    componentAttribute,
    newPageName
  )

  writeFile(
    `/Users/martinmecir/Desktop/Work/ionic-react-conference-app/src/pages/${newPageName}.tsx`,
    newReactPage.print()
  )
}

export const cloneElement = (code: string, source: SourceLineCol) => {
  const confirmed = window.confirm("Component will be cloned on this page")
  if (!confirmed) return

  const alteredAst = cloneElementInAst(code, source)
  if (!alteredAst) throw new Error("Error while cloning element")

  const printer = ts.createPrinter()
  const newCode = printer.printFile(alteredAst)

  writeFile(source.fileName, newCode)
}
