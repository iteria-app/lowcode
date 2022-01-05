import ts from "typescript";
export declare const isReturnOfFunctionExpression: (node: ts.Node) => boolean;
export declare const isReturnOfArrowFunction: (node: ts.Node) => boolean;
export declare const isReturnlessArrowFunction: (node: ts.Node) => boolean;
