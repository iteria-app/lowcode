import ts from "typescript";
export declare const addJsxElementsToAST: <T extends ts.Node>(ast: ts.SourceFile, start: number, newNodes: T[]) => ts.SourceFile;
export declare const addElementsToAST: <T extends ts.Node>(ast: ts.SourceFile, start: number, newNodes: T[]) => ts.SourceFile;
export declare const removeElementFromAst: (ast: ts.SourceFile, start: number) => ts.SourceFile;
export declare const replaceElementsToAST: <T extends ts.Node>(ast: ts.SourceFile, start: number, newNode: T) => ts.SourceFile;
export declare const transformer: <T extends ts.Node>(transform: (node: ts.Node) => ts.Node | undefined) => ts.TransformerFactory<T>;
