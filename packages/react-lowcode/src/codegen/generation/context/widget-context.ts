import ts, { factory } from "typescript";
import { astFindSource, SourceLineCol } from "../../../ast";
import { Hook } from "../../../ast/hooks";
import { SourceFileContext } from "./page-context";

export class WidgetContext{
    _sourceFileContext: SourceFileContext
    _hooks: Hook[] = []
    
    constructor(sourceFileContext: SourceFileContext){
        this._sourceFileContext = sourceFileContext;
    }

    getSourceCode(position: SourceLineCol): ts.Node  | null | undefined{
        let sourceCode = this._sourceFileContext.getSourceCode();

        if(sourceCode != undefined && sourceCode.length > 0){
            let widgetDeclarationNode = this.findWidgetDeclaration(sourceCode, position)

            return widgetDeclarationNode
        }
    }

    findWidgetDeclaration(sourceCode:string, position: SourceLineCol): ts.Node  | null | undefined{
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

        return null
    }

    isWidgetDeclaration(node: ts.Node){
        return this.isTableDeclaration(node) || this.isDetailDeclaration(node)
    }

    isTableDeclaration(node: ts.Node): boolean{
       return ts.isFunctionDeclaration(node)
    }

    isDetailDeclaration(node: ts.Node): boolean{
        return ts.isVariableDeclaration(node)
    }
}