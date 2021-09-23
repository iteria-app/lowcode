import ts from "typescript";
import { isReturnOfFunctionExpression, isReturnOfArrowFunction, isReturnlessArrowFunction } from './returns';
export const isMapFunctionPatternInJsx = (node) => ((isReturnOfFunctionExpression(node) || isReturnOfArrowFunction(node)) &&
    ts.isJsxExpression(node.parent.parent.parent.parent)) ||
    (isReturnlessArrowFunction(node) && ts.isJsxExpression(node.parent.parent));
export const isMapFunctionPatternInAnotherFunction = (node) => ((isReturnOfFunctionExpression(node) || isReturnOfArrowFunction(node)) &&
    (ts.isArrowFunction(node.parent.parent.parent.parent) ||
        ts.isReturnStatement(node.parent.parent.parent.parent))) ||
    (isReturnlessArrowFunction(node) &&
        (ts.isArrowFunction(node.parent.parent) ||
            ts.isReturnStatement(node.parent.parent)));
export const isInsideMapPatternFunction = (node) => {
    let pointer = node;
    while (pointer) {
        if (ts.isReturnStatement(pointer)) {
            if (isMapFunctionPatternInJsx(pointer) ||
                isMapFunctionPatternInAnotherFunction(pointer))
                return true;
        }
        if (ts.isArrowFunction(pointer)) {
            if (isMapFunctionPatternInJsx(pointer) ||
                isMapFunctionPatternInAnotherFunction(pointer))
                return true;
        }
        pointer = pointer.parent;
    }
    return false;
};
