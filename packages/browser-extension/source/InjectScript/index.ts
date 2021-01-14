import {
  JsxAttribute,
  JsxAttributedNode,
  JsxSelfClosingElement,
  Project,
} from "ts-morph"
import ts, { JsxAttributes, JsxAttributeLike } from "typescript"
import { DevTools } from "../devtools"
import { astFindSource } from "../tsx/ast"
import { addCodeSnippet, findElementInCode, tsClone } from "../tsx/clone"
import { createAst } from "../tsx/createSourceFile"

const project = new Project()

const createReactComponentTemplate = (name: string | null) => {
  if (!name) return null

  const reactComponent = project.createSourceFile(
    `${name}.tsx`,
    `import React from 'react'
  
      export default function Default() {
        return (
          <div>
            Hello world
          </div>
        )
      }`
  )
  const defaultFunction = reactComponent.getFunction("Default")
  defaultFunction?.rename(name)
  defaultFunction?.setBodyText(`return (<div>Hello ${name}</div>)`)

  return reactComponent
}

const cloneElement = async (
  code: string,
  fileName: string,
  columnNumber: number,
  lineNumber: number
) => {
  const clonedCode = await tsClone(
    code,
    { columnNumber, fileName, lineNumber },
    fileName
  )
  if (clonedCode) {
    console.log("tu som")
    const res = await fetch(`http://localhost:7500/files/${fileName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
      },
      body: clonedCode,
    })
    console.log(await res.json())
  }
}

const writeFile = async (fileName: string, code: string) => {
  const res = await fetch(`http://localhost:7500/files/${fileName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain",
    },
    body: code,
  })
  console.log(await res.text())
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
    const ownerList = devTools.getOwnersList(id)

    const res = await fetch(`http://localhost:7500/files/${fileName}`)
    const code = await res.text()

    if (ownerList && columnNumber && fileName && lineNumber && code) {
      console.log("Mam vsetky", {
        ownerList,
        columnNumber,
        fileName,
        lineNumber,
        code,
      })
      if (ownerList[ownerList.length - 1].displayName === "Route") {
        const routeCode = await findElementInCode(code, {
          fileName,
          columnNumber,
          lineNumber,
        })
        if (!routeCode) return console.error("Element was not found in code")

        const ast = createAst(code)

        // const syntaxToKind = (kind: ts.Node["kind"]) => {
        //   return ts.SyntaxKind[kind]
        // }
        // // visit each node in the root AST and log its kind
        // ts.forEachChild(ast!, node => {
        //   console.log(syntaxToKind(node.kind))
        // })

        //Tryout zone
        const node: any = await astFindSource(code, {
          fileName,
          columnNumber,
          lineNumber,
        })
        console.log("toto", node.attributes)
        const attributes: JsxAttributes = node.attributes
        attributes.forEachChild((node: any) => {
          if (node.name === "component") {
            console.log("rovnasa")
          }
        })

        // Prompt for new page name
        const newPageName = window.prompt("New page name")
        if (!newPageName) return

        const newPath = `path="/${newPageName}"`
        const newComponent = `component={${newPageName}}`
        // Replace path attribute
        let newRoute = routeCode.replace(
          /path(\s*)=(\s*)("|'|`)(.*)("|'|`)/g,
          newPath
        )
        // Replace component attribute
        newRoute = newRoute.replace(/(component(\s*)=(\s*)){.*}/g, newComponent)
        let newCode = await addCodeSnippet(
          code,
          { fileName, columnNumber, lineNumber },
          newRoute
        )

        // TS-MORPH
        if (newCode) {
          // Add import with Ts-Morph
          const alteredFile = project.createSourceFile("tryout.tsx", newCode)
          alteredFile.addImportDeclaration({
            defaultImport: newPageName,
            moduleSpecifier: `./${newPageName}`,
          })
          writeFile(fileName, alteredFile.print()).catch(err =>
            console.log(err)
          )
        }

        const newReactComponent = createReactComponentTemplate(newPageName)

        if (newReactComponent) {
          writeFile(
            `/Users/martinmecir/Desktop/Work/ionic-react-conference-app/src/${newPageName}.tsx`,
            newReactComponent.print()
          )
        }
      }
    }
  }
})
export {}
