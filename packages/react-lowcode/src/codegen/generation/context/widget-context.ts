import ts, { factory } from "typescript";
import { astFindSource, SourceLineCol } from "../../../ast";
import { Hook } from "../../../ast/hooks";
import { PageContext } from "./page-context";

export class WidgetContext{
    _pageContext: PageContext
    _hooks: Hook[] = []
    
    constructor(sourceFileContext: PageContext){
        this._pageContext = sourceFileContext;
    }

    async getSourceCodeString(position: SourceLineCol): Promise<string>{
        return await this._pageContext.getSourceCode();
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
}
