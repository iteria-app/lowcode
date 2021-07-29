import ts, { factory, JsxChild } from "typescript";

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

export const isFunctionDeclarationWithName = (node: ts.Node, name: string): boolean | undefined => {
  if (ts.isFunctionDeclaration(node)) {
      if (node.name?.escapedText === name) {
          return true;
      }
  }
}

export const isJsxAttributeWithName = (node: ts.Node, name: string): boolean | undefined => {
  if(ts.isJsxAttribute(node)) {
      return node.name.escapedText === name;
  }
}

export const isJsxChild = (node: ts.Node): boolean => {
  return ts.isJsxText(node) || ts.isJsxExpression(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
}

export const createStringJsxAttribute = (name: string, value: string) => {
  return factory.createJsxAttribute(
      factory.createIdentifier(name),
      factory.createStringLiteral(value)
    );
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
export const clearNodePosition = (node: ts.Node): void => {
    ts.setTextRange(node, { pos: -1, end: -1 });

    node.forEachChild((child: ts.Node) => {
        clearNodePosition(child);
    });
}