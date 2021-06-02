import ts from "typescript"
import { astFindSource,SourceLineCol} from "../../ast"

export function findWidgetParentNode(sourceCode:string, position: SourceLineCol): ts.Node  | null | undefined{
    let astCode = astFindSource(sourceCode, position)

    if(astCode){
        let parent = astCode.parent

        while(parent){
            if(isWidgetDeclaration(parent)){
                return parent
            }

            parent = parent.parent
        }
    }else{
        console.log('cannot find widget element')
    }

    return undefined
}

export function isDataTableWidget(sourceCode:string, position: SourceLineCol): boolean{
    let isDataTableDeclaration = false
    let astCode = astFindSource(sourceCode, position)

    if(astCode){
        const identifier = findIdentifier(astCode)

        if(identifier){
            isDataTableDeclaration = identifier.getText() === 'DataGrid'
        }
    }

    return isDataTableDeclaration
}

function findIdentifier(root: ts.Node): ts.Identifier | undefined{
    let identifier = undefined
    root.getChildren().forEach(child => {
        if(ts.isIdentifier(child))
            identifier = child
            return
    });

    return identifier
}

function isWidgetDeclaration(node: ts.Node){
    return isTableDeclaration(node) || isDetailDeclaration(node)
}

function isTableDeclaration(node: ts.Node): boolean{
    ///TODO: check also for export key word
   return ts.isFunctionDeclaration(node)
}

function isDetailDeclaration(node: ts.Node): boolean{
    ///TODO: check also for export key word
    return ts.isVariableDeclaration(node)
}