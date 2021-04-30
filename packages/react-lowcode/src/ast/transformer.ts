import ts from "typescript"
import { isTopMostElementInReturnedLayout } from "../remove"
import {
  createEmptySpanElement,
  wrapNodesWithFragment,
} from "../routes/factory"

const addTransformer = <T extends ts.Node, U extends ts.Node | ts.JsxChild>(
  start: number,
  newNodes: Array<U>
): ts.TransformerFactory<T> => {
  return context => {
    const visit: ts.Visitor = node => {
      const nodeStart = node.pos
      if (nodeStart === start) {
        if (!ts.isJsxElement(node.parent)) {
          return wrapNodesWithFragment(node, newNodes)
        } else return [node, ...newNodes]
      }
      return ts.visitEachChild(node, child => visit(child), context)
    }

    return node => ts.visitNode(node, visit)
  }
}

const removeTransformer = <T extends ts.Node>(
  start: number
): ts.TransformerFactory<T> => {
  return context => {
    const visit: ts.Visitor = node => {
      const nodeStart = node.pos
      if (nodeStart === start) {
        if (isTopMostElementInReturnedLayout(node)) {
          return createEmptySpanElement()
        } else return
      }

      return ts.visitEachChild(node, child => visit(child), context)
    }

    return node => ts.visitNode(node, visit)
  }
}

export const addElementsToAST = <T extends ts.Node>(
  ast: ts.SourceFile,
  start: number,
  newNodes: Array<T>
) => {
  const result = ts.transform(ast, [addTransformer(start, newNodes)])
  return result.transformed[0]
}

export const removeElementFromAst = (ast: ts.SourceFile, start: number) => {
  const result = ts.transform(ast, [removeTransformer(start)])
  return result.transformed[0]
}
