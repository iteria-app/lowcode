import ts from "typescript";
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
            let ts = this.parseCode(sourceCode, position)

            return ts
        }
    }

    parseCode(sourceCode:string, position: SourceLineCol): ts.Node  | null | undefined{
        let astCode = astFindSource(sourceCode, position)

        return astCode
    }
}