import ts from "typescript";
import { SourceLineCol } from "../ast";
export declare const removeElementInAst: (code: string, source: SourceLineCol) => void | ts.SourceFile;
export declare const isTopMostElementInReturnedLayout: (node: ts.Node) => boolean;
