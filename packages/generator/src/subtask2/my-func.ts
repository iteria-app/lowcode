import { exit } from 'process';
import { Project, SourceFile } from 'ts-morph';
import { ts } from 'ts-morph';
import { factory, forEachChild } from 'typescript';
import { TableColumn } from './column';
// import { column } from './../../../../../Learning/ReactJS/task1/src/subtask2/column';
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
export function createNewColumn(file: string, newColumnName: string): void {

    const sourceFile = createAst(file);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    
    let isImported:boolean = false 
    function importCheck(nodes:ts.Node[]|ts.Node) {
      ts.forEachChild(sourceFile, node => {
        if(ts.isImportDeclaration(node)){
          let temparr = node.importClause?.namedBindings?.getChildren()[1].getChildren().map((n) => n.getText()=='TableColumn'?true:false) 
          if (temparr && temparr.indexOf(true) > -1){
            isImported = true
          }
        }
      })
    }
    importCheck(sourceFile)
    
    const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
      return sourceFile => {
        const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
          
          if(!isImported){
            if(ts.isImportDeclaration(node)){
              isImported = true
              return [TableColumn.importDeclaration,node]
            }
           
          }

          if(ts.isJsxElement(node) && node.getChildAt(0).getText() === '<Table>'){
            return factory.updateJsxElement(node,node.openingElement,[createJsxElement(TableColumn,[],[factory.createJsxText(newColumnName)]),...node.children],node.closingElement)
          }

          return ts.visitEachChild(node,visitor,context)
        }

        return ts.visitNode(sourceFile,visitor)
      }
    }
    const myOutput = ts.transform(sourceFile,[transformer]).transformed[0]
    
    console.log(printer.printNode(ts.EmitHint.Unspecified, myOutput, myOutput))
}

    

  

  


























