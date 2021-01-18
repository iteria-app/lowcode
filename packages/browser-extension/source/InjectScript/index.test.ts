import ts, { factory } from "typescript"
import { appCode, loginCode } from "../util/code"
import { astFindSource, jsxElementGetAttributes } from "../tsx/ast"
import {
  findComponentNameInAttributes,
  isValidJsxElement,
} from "../util/routeHandlers"

const getJsxNode = async () =>
  await astFindSource(appCode, {
    fileName: "This makes no difference",
    columnNumber: 13,
    lineNumber: 67,
  })

const getAttributes = async () => {
  const node = await getJsxNode()
  return jsxElementGetAttributes(node! as ts.JsxOpeningLikeElement)
}

test("check if element is valid Jsx element", async () => {
  const node = await getJsxNode()
  expect(isValidJsxElement(node!)).toBeTruthy()
})

test("check if string literal is jsx element", () => {
  const node = factory.createStringLiteral("lol")
  expect(isValidJsxElement(node)).toBeFalsy()
})

test("should return jsx attributes of element in certain shape", async () => {
  const data = await getAttributes()
  expect(data).toEqual([{ path: "/login" }, { component: "Login" }])
})
test("should return component name from attributes", async () => {
  const attributes = await getAttributes()
  const componentName = findComponentNameInAttributes(attributes)
  expect(componentName).toBe("Login")
})
