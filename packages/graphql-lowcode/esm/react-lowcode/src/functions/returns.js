import ts from "typescript";
export const isReturnOfFunctionExpression = (node) => ts.isBlock(node.parent) &&
    ts.isFunctionExpression(node.parent.parent) &&
    ts.isCallExpression(node.parent.parent.parent);
export const isReturnOfArrowFunction = (node) => ts.isBlock(node.parent) &&
    ts.isArrowFunction(node.parent.parent) &&
    ts.isCallExpression(node.parent.parent.parent);
export const isReturnlessArrowFunction = (node) => ts.isCallExpression(node.parent);
