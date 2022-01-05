import ts, { JsxChild } from "typescript";
export declare const isImportDeclarationWithName: (node: ts.Node, name: string) => boolean | undefined;
export declare const isFunctionDeclarationWithName: (node: ts.Node, name: string) => boolean | undefined;
export declare const isJsxAttributeWithName: (node: ts.Node, name: string) => boolean | undefined;
export declare const isJsxChild: (node: ts.Node) => boolean;
export declare const createStringJsxAttribute: (name: string, value: string) => ts.JsxAttribute;
export declare const isOpeningOrSelfClosingElementWithName: (node: ts.Node, name: string) => boolean | undefined;
export declare const clearNodePosition: (node: ts.Node) => void;
export declare const extractInputStatementsFromTemplate: (sourceCode: string, inputTemplateName: string) => {
    importDeclarations: ts.ImportDeclaration[];
    variableStatements: ts.VariableStatement[];
    inputElement: ts.JsxChild;
} | undefined;
export declare const getUsedImportsInNode: (node: ts.Node, typeChecker: ts.TypeChecker) => ts.ImportDeclaration[];
