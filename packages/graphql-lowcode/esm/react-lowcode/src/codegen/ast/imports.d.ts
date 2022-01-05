import ts from "typescript";
export declare function createNamedImportDeclaration(importSpecifier: string, module: string): ts.ImportDeclaration;
export declare function createImportDeclaration(importSpecifier: string, module: string): ts.ImportDeclaration;
export declare function createNameSpaceImport(namespace: string, module: string): ts.ImportDeclaration;
export declare function existsImportWithNamespace(node: ts.Node, namespace: string): boolean;
export declare function uniqueImports(imports: ts.ImportDeclaration[]): ts.ImportDeclaration[];
