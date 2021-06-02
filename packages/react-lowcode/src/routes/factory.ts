import ts, { factory } from "typescript"

export const createSelfClosingJsxRouteElement = (newPageName: string) =>
  factory.createJsxSelfClosingElement(
    factory.createIdentifier("Route"),
    undefined,
    factory.createJsxAttributes([
      factory.createJsxAttribute(
        factory.createIdentifier("path"),
        factory.createStringLiteral(`/${newPageName}`)
      ),
      factory.createJsxAttribute(
        factory.createIdentifier("component"),
        factory.createJsxExpression(
          undefined,
          factory.createIdentifier(newPageName)
        )
      ),
    ])
  )

export const createOpeningAndClosingJsxRouteElement = (newPageName: string) => {
  const newOpeningNode = factory.createJsxOpeningElement(
    factory.createIdentifier("Route"),
    undefined,
    factory.createJsxAttributes([
      factory.createJsxAttribute(
        factory.createIdentifier("path"),
        factory.createStringLiteral(`/${newPageName}`)
      ),
      factory.createJsxAttribute(
        factory.createIdentifier("component"),
        factory.createJsxExpression(
          undefined,
          factory.createIdentifier(newPageName)
        )
      ),
    ])
  )

  const newClosingNode = factory.createJsxClosingElement(
    factory.createIdentifier("Route")
  )

  return [newOpeningNode, newClosingNode]
}

export const wrapNodesWithFragment = <T extends ts.Node | ts.JsxChild>(
  node: ts.Node,
  newNodes: Array<T>
) =>
  factory.createJsxFragment(
    factory.createJsxOpeningFragment(),
    [node as ts.JsxChild, ...(newNodes as Array<ts.JsxChild>)],
    factory.createJsxJsxClosingFragment()
  )

export const createEmptySpanElement = () =>
  factory.createJsxElement(
    factory.createJsxOpeningElement(
      factory.createIdentifier("span"),
      undefined,
      factory.createJsxAttributes([])
    ),
    [],
    factory.createJsxClosingElement(factory.createIdentifier("span"))
  )
