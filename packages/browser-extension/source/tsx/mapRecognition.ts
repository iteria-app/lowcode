import ts from "typescript"

export const isReturnOfFunctionExpression = (node: ts.Node) =>
  ts.isBlock(node.parent) &&
  ts.isFunctionExpression(node.parent.parent) &&
  ts.isCallExpression(node.parent.parent.parent)

export const isReturnOfArrowFunction = (node: ts.Node) =>
  ts.isBlock(node.parent) &&
  ts.isArrowFunction(node.parent.parent) &&
  ts.isCallExpression(node.parent.parent.parent)

export const isReturnlessArrowFunction = (node: ts.Node) =>
  ts.isCallExpression(node.parent)

export const isMapFunctionPatternInJsx = (node: ts.Node) =>
  ((isReturnOfFunctionExpression(node) || isReturnOfArrowFunction(node)) &&
    ts.isJsxExpression(node.parent.parent.parent.parent)) ||
  (isReturnlessArrowFunction(node) && ts.isJsxExpression(node.parent.parent))

export const isMapFunctionPatternInAnotherFunction = (node: ts.Node) =>
  ((isReturnOfFunctionExpression(node) || isReturnOfArrowFunction(node)) &&
    (ts.isArrowFunction(node.parent.parent.parent.parent) ||
      ts.isReturnStatement(node.parent.parent.parent.parent))) ||
  (isReturnlessArrowFunction(node) &&
    (ts.isArrowFunction(node.parent.parent) ||
      ts.isReturnStatement(node.parent.parent)))

export const isInsideMapPatternFunction = (node: ts.Node) => {
  let pointer = node
  while (pointer) {
    if (ts.isReturnStatement(pointer)) {
      if (
        isMapFunctionPatternInJsx(pointer) ||
        isMapFunctionPatternInAnotherFunction(pointer)
      )
        return true
    }
    if (ts.isArrowFunction(pointer)) {
      if (
        isMapFunctionPatternInJsx(pointer) ||
        isMapFunctionPatternInAnotherFunction(pointer)
      )
        return true
    }

    pointer = pointer.parent
  }
  return false
}
