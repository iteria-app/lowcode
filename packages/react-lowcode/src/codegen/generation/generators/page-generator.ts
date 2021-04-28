import ts from "typescript";
import { factory } from "typescript";
import { createAst } from "../code-generation/createSourceFile";
import { SourceFileContext } from "../context/page-context";
import { WidgetContext } from "../context/widget-context";

export class PageGenerator{
    private _context: SourceFileContext
    private _widgets:WidgetContext[] = []
    
    constructor(context: SourceFileContext){
        this._context = context;
    }

    useImport(identifier: string, pck: string){
        this._context.useImport(identifier, pck)
    }

    newWidget(){

    }

    print(){
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
        const sourceFile = createAst('')
        return printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...this._context.getImports(), page.functionDeclaration]), sourceFile)
    }

    private getComposedCode(){
        
    }
}