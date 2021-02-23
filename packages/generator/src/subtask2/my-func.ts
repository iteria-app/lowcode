import ts,{ factory } from 'typescript';
import { TableColumn } from './column';
import { createJsxElement } from './component';

function createAst(
    code: string,
    scriptTarget = ts.ScriptTarget.ESNext,
    scriptKind = ts.ScriptKind.TSX,
    filePath = `/ts-ast-viewer.tsx`
  ) {
    return ts.createSourceFile(
      filePath,
      code,
      scriptTarget,
      true,
      scriptKind
    )
  }

const importCheck = (SourceFile:ts.SourceFile|ts.Node) => {
      return <boolean>ts.forEachChild(SourceFile, node => {
        if(ts.isImportDeclaration(node)){
          let temparr = node.importClause?.namedBindings?.getChildren()[1].getChildren().map((n) => n.getText()=='TableColumn'?true:false) 
          if (temparr && temparr.indexOf(true) > -1){
            return true
          }
        }
      })
}  

export function createNewColumn(file: string, newColumnName: string): ts.SourceFile {
    const sourceFile = createAst(file);
    let isImported:boolean = importCheck(sourceFile)
    const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
      return sourceFile => {
        const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
          if(!isImported){
            if(ts.isImportDeclaration(node)){
              isImported = true
              return [TableColumn.importDeclaration,node]
            }
          }
          if(ts.isJsxElement(node) && node.openingElement.tagName.getText() === 'TableRow'){
            return factory.updateJsxElement(node,node.openingElement,[createJsxElement(TableColumn,[],[factory.createJsxText(newColumnName)]),...node.children],node.closingElement)
          }
          return ts.visitEachChild(node,visitor,context)
        }
        return ts.visitNode(sourceFile,visitor)
      }
    }
    return ts.transform(sourceFile,[transformer]).transformed[0]
}