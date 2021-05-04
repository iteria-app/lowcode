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

    getSourceCodeString(position: SourceLineCol): string{
        return this._sourceFileContext.getSourceCode();
    }

    findWidgetParentNode(sourceCode:string, position: SourceLineCol): ts.Node  | null | undefined{
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
        ///TODO: check also for export key word
       return ts.isFunctionDeclaration(node)
    }

    isDetailDeclaration(node: ts.Node): boolean{
        ///TODO: check also for export key word
        return ts.isVariableDeclaration(node)
    }
}