import ts from 'typescript';
import {factory} from 'typescript';



export interface Component {
    tagName: ts.Identifier
    importDeclaration: ts.ImportDeclaration
  }

export function createComponent(tagName: string, fileName: string):Component{
    const tagNameIdentifier = factory.createIdentifier(tagName)
  return {
    tagName: tagNameIdentifier,
    importDeclaration: factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(
            undefined,
            tagNameIdentifier
          ),
        ])
      ),
      factory.createStringLiteral(fileName)
    ),
  }
}

export function createJsxElement(component: Component, attributes: readonly ts.JsxAttributeLike[] | undefined, children: readonly ts.JsxChild[] | undefined):ts.JsxElement {
    
  const jsxOpeningElement = factory.createJsxOpeningElement(component.tagName, undefined,
      factory.createJsxAttributes(attributes ?? []))
    const jsxClosingElement = factory.createJsxClosingElement(component.tagName)
  
    return factory.createJsxElement(jsxOpeningElement, children ?? [], jsxClosingElement)
}

