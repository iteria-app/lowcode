import ts from "typescript";
import { createImportDeclaration, uniqueImports } from "../ts/imports";
import { AppContext } from "./app-context";
import { InjectionContext } from "./injection-context";

export class PageContext{
    private _appContext: AppContext;
    private _imports: ts.ImportDeclaration[] = [];
    private _filePath : string;
 
    constructor(appContext: AppContext, filePath: string){
        this._appContext = appContext;
        this._filePath = filePath;
    }

    public get InjectionContext() : InjectionContext {
        return this._appContext.InjectionContext;
    }

    getImports(): ts.ImportDeclaration[]{
        return uniqueImports(this._imports)
    }

    useImport(identifier: string, pck: string){
        this._imports.push(createImportDeclaration(identifier, pck))
    }

    public get source() : string {
        return this.source;
    }
   
    getSourceCode(): string {
        let fileContent = ''
        this._appContext._io.readFile(this._filePath).then(content=> fileContent = content ?? '')

        return fileContent
    }    
}