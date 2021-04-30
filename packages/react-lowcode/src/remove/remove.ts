import ts from "typescript"
import {
  getAstAndNodeFromSource,
  removeElementFromAst,
  SourceLineCol,
} from "../ast"
import { isInsideMapPatternFunction } from "../functions"

export const removeElementInAst = (code: string, source: SourceLineCol) => {
  const { node, ast } = getAstAndNodeFromSource(code, source)
  if (!node || !ast) return null
  // TODO this should return only when the component is root component of map function(it has a key)
  if (isInsideMapPatternFunction(node))
    return alert(
      "You are trying to remove element which is inside map function, this could remove multiple elements on this page"
    )
  const alteredAst = removeElementFromAst(ast, node.pos)
  return alteredAst
}

export const isTopMostElementInReturnedLayout = (node: ts.Node) =>
  (ts.isParenthesizedExpression(node.parent) &&
    ts.isReturnStatement(node.parent.parent)) ||
  (ts.isParenthesizedExpression(node.parent) &&
    ts.isArrowFunction(node.parent.parent))
