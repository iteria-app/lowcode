import ts, { factory } from "typescript"

export function functionalComponent(componentName: string | ts.Identifier | undefined = undefined, params: ts.ParameterDeclaration[], body: ts.Expression | undefined = undefined) {
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
      [factory.createReturnStatement(body)],
      true
    )
  )
}


/*

  factory.createParenthesizedExpression(factory.createJsxElement(
    factory.createJsxOpeningElement(
      factory.createIdentifier("b"),
      undefined,
      factory.createJsxAttributes([])
    ),
    [factory.createJsxText(
      "bold",
      false
    )],
    factory.createJsxClosingElement(factory.createIdentifier("b"))
  ))

*/


export function createJsxElement(component: Component, attributes: readonly ts.JsxAttributeLike[] | undefined, children: readonly ts.JsxChild[] | undefined) {
  const jsxOpeningElement = factory.createJsxOpeningElement(component.tagName, undefined,
    factory.createJsxAttributes(attributes ?? []))
  const jsxClosingElement = factory.createJsxClosingElement(component.tagName)

  return factory.createJsxElement(jsxOpeningElement, children ?? [], jsxClosingElement)
}

export function createJsxSelfClosingElement(component: Component, attributes: readonly ts.JsxAttributeLike[] | undefined) {
  return factory.createJsxSelfClosingElement(component.tagName, undefined,
    factory.createJsxAttributes(attributes ?? []))
}

export interface Component {
  tagName: ts.Identifier
  importDeclaration: ts.ImportDeclaration
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
