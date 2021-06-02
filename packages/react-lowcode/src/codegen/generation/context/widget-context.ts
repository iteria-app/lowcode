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

   

   
}