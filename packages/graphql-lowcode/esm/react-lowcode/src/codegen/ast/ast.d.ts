import ts, { SourceFile } from "typescript";
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
    isTuple(): boolean;
    isUnion(): boolean;
    isIntersection(): boolean;
    isUnionOrIntersection(): boolean;
    isUnknown(): boolean;
    isNull(): boolean;
    isUndefined(): boolean;
}
export declare function findVariableDeclarations(parentNode: ts.Node, array: ts.VariableDeclaration[]): void;
export declare function findObjectLiteralExpression(parentNode: ts.Node, array: ts.ObjectLiteralExpression[]): void;
export declare function findPropertyAssignment(parentNode: ts.Node, array: ts.PropertyAssignment[]): void;
export declare function printSourceCode(sourceFile: SourceFile): string;
