import ts from "typescript";

export const isImportDeclarationWithName = (node: ts.Node, name: string): boolean | undefined => {
  if (ts.isImportDeclaration(node)) {
      //handles "import File from './File'" import types
    if (node.importClause?.name?.escapedText === name) return true;
      //handles "import { File } from './File'" import types
    if(ts.isImportDeclaration(node) && node.pos >= 0) {
      return node.getChildren().some(declarationChild =>
        ts.isImportClause(declarationChild) && declarationChild.getChildren().some(clauseChild => 
          ts.isNamedImports(clauseChild) && clauseChild.elements.some(element =>
            element.name.escapedText === name 
          )
        )
      )
    }
  }
}

export const isOpeningOrSelfClosingElementWithName = (node: ts.Node, name: string): boolean | undefined => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        if (ts.isIdentifier(node.tagName)) {
            if (node.tagName.escapedText === name) {
                return true;
            }
        }
    }
}