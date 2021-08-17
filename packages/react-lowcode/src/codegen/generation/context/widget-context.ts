import ts, { factory } from "typescript";
import { astFindSource, SourceLineCol } from "../../../ast";
import { PageContext } from "./page-context";

export class WidgetContext{
    _pageContext: PageContext
    _statements: ts.Statement[] = []
    
    constructor(sourceFileContext: PageContext){
        this._pageContext = sourceFileContext;
    }

    async getSourceCodeString(position: SourceLineCol): Promise<string>{
        return await this._pageContext.getSourceCode();
    }

    getStatements(): ts.Statement[] {
        return this._statements;
    }

    getPageImports(): ts.ImportDeclaration[] {
        return this._pageContext.getImports()
    }

    findWidgetParentNode(sourceCode:string, position: SourceLineCol): ts.Node | undefined {
        let astCode = astFindSource(sourceCode, position)

        if(astCode){
            let parent = astCode.parent

            while(parent){
                if(this.isWidgetDeclaration(parent)){
                    return parent
                }

                parent = parent.parent
            }
        }else{
            console.log('cannot find widget element')
        }
    }

    isWidgetDeclaration(node: ts.Node){
        return this.isTableDeclaration(node) || this.isDetailDeclaration(node)
    }

    isTableDeclaration(node: ts.Node): boolean{
        ///TODO: check also for export key word
       return ts.isFunctionDeclaration(node)
    }

    isDetailDeclaration(node: ts.Node): boolean{
        ///TODO: check also for export key word
        return ts.isVariableDeclaration(node)
    }

    addStatementIfNotExist(statement: ts.Statement){
        this._statements = [...this._statements, statement]//todo:add only if statement not exists
    }

    addStatementIfNotExistArray(statements: ts.Statement[]){
        this._statements = [...this._statements, ...statements]//todo:add only if statement not exists
    }

    addImport(imp: ts.ImportDeclaration){
        this._pageContext.addImportIfNotUsed(imp)//todo:add only if import not exists
    }

    addImportArray(imp: ts.ImportDeclaration[]){
        imp.forEach(impor=>{
            this._pageContext.addImportIfNotUsed(impor)//todo:add only if import not exists
        })
    }
}
