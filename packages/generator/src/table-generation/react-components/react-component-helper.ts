import ts, { factory } from "typescript"

export function createFunctionalComponent(componentName: string | ts.Identifier | undefined = undefined, params: ts.ParameterDeclaration[], body: ts.Statement[]): ts.FunctionDeclaration {
  return factory.createFunctionDeclaration(
    undefined,
    [
      factory.createModifier(ts.SyntaxKind.ExportKeyword),
      factory.createModifier(ts.SyntaxKind.DefaultKeyword)
    ],
    undefined,
    componentName,
    undefined,
    params,
    undefined,
    factory.createBlock(
      body,
      true
    )
  )
}

export function createJsxElement(tagIdentifier: ts.Identifier, attributes: readonly ts.JsxAttributeLike[] | undefined, children: readonly ts.JsxChild[] | undefined): ts.JsxElement {
  const jsxOpeningElement = factory.createJsxOpeningElement(tagIdentifier, undefined,
    factory.createJsxAttributes(attributes ?? []))
  const jsxClosingElement = factory.createJsxClosingElement(tagIdentifier)

  return factory.createJsxElement(jsxOpeningElement, children ?? [], jsxClosingElement)
}

export function createJsxAttribute(attribute:string, attributeValue:string) {
  return factory.createJsxAttribute(
    factory.createIdentifier(attribute),
    factory.createJsxExpression(
      undefined,
      factory.createIdentifier(attributeValue)
    ))
}

export function createJsxSelfClosingElement(tagIdentifier: ts.Identifier, attributes: readonly ts.JsxAttributeLike[] | undefined) {
  return factory.createJsxSelfClosingElement(tagIdentifier, undefined,
    factory.createJsxAttributes(attributes ?? []))
}

export interface Component {
  tagName: ts.Identifier
  importDeclaration: ts.ImportDeclaration
}

export interface TableComponent {
  functionDeclaration: ts.FunctionDeclaration
  imports: ts.ImportDeclaration[]
}

export function defineComponent(tagName: string, packageName: string): Component {
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
      factory.createStringLiteral(packageName)
    ),
  }
}
