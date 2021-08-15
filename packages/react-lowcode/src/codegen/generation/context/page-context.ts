import ts from "typescript";
import { createNamedImportDeclaration, uniqueImports } from "../../ast/imports";
import { AppContext } from "./app-context";
import { InjectionContext } from "./injection-context";

export class PageContext{
    private _appContext: AppContext
    private _imports: ts.ImportDeclaration[] = []
    private _filePath : string
 
    constructor(appContext: AppContext, filePath: string){
        this._appContext = appContext
        this._filePath = filePath
    }

    public get InjectionContext() : InjectionContext {
        return this._appContext.injectionContext
    }

    getImports(): ts.ImportDeclaration[]{
        return uniqueImports(this._imports)
    }

    public get filePath() : string {
        return this._filePath
    }
   
    async getSourceCode(): Promise<string> {
        let fileContent = ''
        await this._appContext._io.readFile(this._filePath).then(data=> {if(data)fileContent = data})

        return fileContent
    }    

    addImportIfNotUsed(imp: ts.ImportDeclaration){
        this._imports = [...this._imports, imp]
    }
}