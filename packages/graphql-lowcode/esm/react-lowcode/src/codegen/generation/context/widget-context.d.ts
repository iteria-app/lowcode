import ts from "typescript";
import { SourceLineCol } from "../../../ast";
import { PageContext } from "./page-context";
export declare class WidgetContext {
    _pageContext: PageContext;
    _statements: ts.Statement[];
    constructor(sourceFileContext: PageContext);
    getSourceCodeString(position: SourceLineCol): Promise<string>;
    getStatements(): ts.Statement[];
    getPageImports(): ts.ImportDeclaration[];
    findWidgetParentNode(sourceCode: string, position: SourceLineCol): ts.Node | undefined;
    isWidgetDeclaration(node: ts.Node): boolean;
    isTableDeclaration(node: ts.Node): boolean;
    isDetailDeclaration(node: ts.Node): boolean;
    addStatementIfNotExist(statement: ts.Statement): void;
    addStatementIfNotExistArray(statements: ts.Statement[]): void;
    addImport(imp: ts.ImportDeclaration): void;
    addImportArray(imp: ts.ImportDeclaration[]): void;
}
