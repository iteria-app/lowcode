import ts from "typescript"
import {
  astFindSource,
  startOfJsxIdentifier,
  startOfJsxNode,
} from "../react-lowcode/ast/find"
import {
  jsxElementGetAttributes,
} from "../react-lowcode/attributes"
import { isValidJsxElement } from "../react-lowcode/routes/routeHandlers"
import { findAttributeByName } from "../react-lowcode/attributes"

import { APP_TXS_SAMPLE_CODE }  from './index.testdata'

const getRouteNode = () => {
  const code = APP_TXS_SAMPLE_CODE
  return astFindSource(code, {
    fileName: "/src/components/App.tsx",
    columnNumber: 13,
    lineNumber: 79,
  })
}

it("is valid jsxElement", () => {
  const node = getRouteNode()
  expect(isValidJsxElement(node!)).toBeTruthy()
})

it("returns valid jsxElementAttributes", () => {
  const node = getRouteNode()
  const attributes = jsxElementGetAttributes(node as ts.JsxOpeningLikeElement)
  expect(attributes).toStrictEqual([{ path: "/login" }, { component: "Login" }])
})

it("returns component name from attributes", async () => {
  const node = getRouteNode()
  const attributes = jsxElementGetAttributes(node as ts.JsxOpeningLikeElement)

  const componentName = findAttributeByName(attributes, "component")
  expect(componentName).toBe("Login")
})

it("returns start of identifier on route element", () => {
  const code = APP_TXS_SAMPLE_CODE
  const nodeStart = startOfJsxIdentifier(code, {
    fileName: "src/components/App.tsx",
    columnNumber: 13,
    lineNumber: 66,
  })
  expect(nodeStart).toEqual(2624)
})

test("returns start of route jsx element", () => {
  const code = APP_TXS_SAMPLE_CODE
  const nodeStart = startOfJsxNode(code, {
    fileName: "/src/components/App.tsx",
    columnNumber: 13,
    lineNumber: 66,
  })
  expect(nodeStart).toEqual(2623)
})

// test("react arrow function component", () => {
//   const project = new Project()
//   const sourceFile = project.createSourceFile("tryout.tsx", appCode)
//   const jsxElement = sourceFile
//     .getVariableDeclarationOrThrow("IonicApp")
//     .getFirstChildByKindOrThrow(SyntaxKind.ArrowFunction)
//     .getStatementByKindOrThrow(SyntaxKind.ReturnStatement)
//     .getFirstChildByKindOrThrow(SyntaxKind.ParenthesizedExpression)
//     .getFirstChildByKindOrThrow(SyntaxKind.JsxElement)

//   const something = jsxElement.replaceWithText(`
//     <>
//       <div
//           style={{
//             position: "absolute",
//             left: "50%",
//             zIndex: 2,
//             width: 400,
//             height: 200,
//             opacity: "95%",
//             marginTop: 20,
//           }}
//         >
//           <button
//             style={{
//               minWidth: 50,
//               minHeight: 20,
//               padding: "10 20",
//               borderRadius: "10%",
//             }}
//             //@ts-ignore
//             onClick={() => (window.location.pathname = "/Martin")}
//           >
//             /Martin
//           </button>
//       </div>
//     ${jsxElement.getText()}
//     </>
//   `)
//   console.log(something?.getText())
// })

// test("react functional component", () => {
//   const project = new Project()
//   const sourceFile = project.createSourceFile(
//     "tryout.tsx",
//     reactFunctionalComponent
//   )
//   const jsxElement = sourceFile
//     .getFunctionOrThrow("App")
//     .getBodyOrThrow()
//     .getFirstChildByKindOrThrow(SyntaxKind.SyntaxList)
//     .getFirstChildByKindOrThrow(SyntaxKind.ReturnStatement)
//     .getFirstChildByKindOrThrow(SyntaxKind.ParenthesizedExpression)
//     .getFirstChildByKindOrThrow(SyntaxKind.JsxElement)

//   const something = jsxElement.replaceWithText(`
//     <>
//     <h1>What's upp</h1>
//     ${jsxElement.getText()}
//     </>
//   `)
//   console.log(something?.getText())
// })
