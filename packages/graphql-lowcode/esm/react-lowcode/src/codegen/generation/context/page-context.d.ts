import ts from "typescript";
import { AppContext } from "./app-context";
import { InjectionContext } from "./injection-context";
export declare class PageContext {
    private _appContext;
    private _imports;
    private _filePath;
    constructor(appContext: AppContext, filePath: string);
    get InjectionContext(): InjectionContext;
    getImports(): ts.ImportDeclaration[];
    get filePath(): string;
    getSourceCode(): Promise<string>;
    addImportIfNotUsed(imp: ts.ImportDeclaration): void;
}
