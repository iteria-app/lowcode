import ts from "typescript";

export const isReturnOfFunctionExpression = (node: ts.Node) =>
  ts.isBlock(node.parent) &&
  ts.isFunctionExpression(node.parent.parent) &&
  ts.isCallExpression(node.parent.parent.parent);

export const isReturnOfArrowFunction = (node: ts.Node) =>
  ts.isBlock(node.parent) &&
  ts.isArrowFunction(node.parent.parent) &&
  ts.isCallExpression(node.parent.parent.parent);

export const isReturnlessArrowFunction = (node: ts.Node) =>
  ts.isCallExpression(node.parent);
