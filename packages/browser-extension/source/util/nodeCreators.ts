import { factory } from "typescript"

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
