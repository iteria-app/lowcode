import ts from "typescript";
import fs from "fs"
import { createImportDeclaration, uniqueImports } from "../ts/imports";
import { AppContext } from "./app-context";
import { InjectionContext } from "./injection-context";
import path from 'path'

export class SourceFileContext{
    private _appContext: AppContext;
    private _imports: ts.ImportDeclaration[] = [];
    private _path : string;
 
    constructor(appContext: AppContext, path: string){
        this._appContext = appContext;
        this._path = path;
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

    public get path() : string {
        return this._path;
    }
   
    getSourceCode(): string {
        return fs.readFileSync(path.resolve(this.path), 'utf-8')
    }    
}