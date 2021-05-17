import { astFindSource, SourceLineCol } from "../../../ast";
import ts, { factory } from "typescript";

export interface Node {
  getText(includeJsDocComments?: boolean): string;
}

export interface Symbol {
  isAnonymous(): boolean;
  isAny(): boolean;
  isArray(): boolean;
  isBoolean(): boolean;
  isString(): boolean;
  isNumber(): boolean;
  isBooleanLiteral(): boolean;
  isEnumLiteral(): boolean;
  isNumberLiteral(): boolean;
  isStringLiteral(): boolean;
  isClass(): boolean;
  isClassOrInterface(): boolean;
  isEnum(): boolean;
  isInterface(): boolean;
  isObject(): boolean;
  //isTypeParameter(): this is TypeParameter;
  isTuple(): boolean;
  isUnion(): boolean;
  isIntersection(): boolean;
  isUnionOrIntersection(): boolean;
  isUnknown(): boolean;
  isNull(): boolean;
  isUndefined(): boolean;
}

export function findVariableDeclarations(
  parentNode: ts.Node,
  array: ts.VariableDeclaration[]
) {
  if (parentNode != undefined) {
    if (ts.isVariableDeclaration(parentNode)) {
      array.push(parentNode);
    }

    if (parentNode.getChildCount() > 0) {
      var children = parentNode.getChildren();
      children.forEach((child) => {
        findVariableDeclarations(child, array);
      });
    }
  }
}

export function findObjectLiteralExpression(
  parentNode: ts.Node,
  array: ts.ObjectLiteralExpression[]
) {
  if (parentNode != undefined) {
    if (ts.isObjectLiteralExpression(parentNode)) {
      array.push(parentNode);
    }

    if (parentNode.getChildCount() > 0) {
      var children = parentNode.getChildren();
      children.forEach((child) => {
        findObjectLiteralExpression(child, array);
      });
    }
  }
}

export function findPropertyAssignment(
  parentNode: ts.Node,
  array: ts.PropertyAssignment[]
) {
  if (parentNode != undefined) {
    if (parentNode.getChildCount() > 0) {
      var children = parentNode.getChildren();
      children.forEach((child) => {
        if (ts.isPropertyAssignment(child)) {
          array.push(child);
        }
      });
    }
  }
}
