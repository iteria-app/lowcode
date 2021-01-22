import ts from "typescript"
import { Attribute } from "../tsx/ast"
import { addElementsToAST } from "../tsx/transformer"
import {
  createSelfClosingJsxRouteElement,
  createOpeningAndClosingJsxRouteElement,
} from "./nodeCreators"

export const isValidJsxElement = (node: ts.Node) =>
  ts.isJsxOpeningLikeElement(node) || ts.isJsxElement(node)

export const findAttributeByName = (
  attributes: Array<Attribute>,
  attributeName: string
) => {
  const attribute = attributes.find(a => a[attributeName])
  return attribute ? attribute[attributeName] : null
}
export const castRouteNodeToProperType = (node: ts.Node) => {
  const castedNode = node as ts.JsxOpeningLikeElement | ts.JsxElement
  if (ts.isJsxOpeningLikeElement(castedNode)) {
    return node as ts.JsxOpeningLikeElement
  } else {
    return castedNode.openingElement as ts.JsxOpeningElement
  }
}

export const cloneRouteElements = (
  node: ts.JsxOpeningLikeElement,
  ast: ts.SourceFile,
  start: number,
  newPageName: string
) => {
  if (ts.isJsxSelfClosingElement(node)) {
    const newSelfClosingNode = createSelfClosingJsxRouteElement(newPageName)
    return addElementsToAST(ast, start, [newSelfClosingNode])
  } else {
    const newOpeningAndClosingElements = createOpeningAndClosingJsxRouteElement(
      newPageName
    )
    return addElementsToAST(ast, start, [...newOpeningAndClosingElements])
  }
}
