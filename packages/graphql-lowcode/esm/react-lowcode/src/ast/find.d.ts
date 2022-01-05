import ts, { Node, SourceFile } from "typescript";
export interface SourceLineCol {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
}
export interface Attribute {
    [name: string]: string;
}
export declare const startOfJsxNode: (code: string, source: SourceLineCol) => number;
export declare function startOfJsxIdentifier(code: string, source: SourceLineCol): number;
export declare function astFindStart(code: string, start: number): ts.Node;
export declare const codeStart: (code: string, source: SourceLineCol) => number;
export declare function astFindSource(code: string, source: SourceLineCol): ts.Node;
export declare const findElementInCode: (code: string, source: SourceLineCol) => string;
export declare const getAstAndNodeFromSource: (code: string, source: SourceLineCol) => {
    node: ts.Node;
    ast: ts.SourceFile;
};
export declare const findByCondition: <T>(node: Node | SourceFile, condition: (node: Node) => boolean | undefined) => T;
export declare const findAllByCondition: <T>(node: Node | SourceFile, output: T[], condition: (node: Node) => boolean | undefined) => void;
