import ts from "typescript"
import { Attribute } from "../ast/find"

export const findAttributeByName = (
  attributes: Array<Attribute>,
  attributeName: string
) => {
  const attribute = attributes.find(a => a[attributeName])
  return attribute ? attribute[attributeName] : null
}

export const jsxElementGetAttributes = (node: ts.JsxOpeningLikeElement) => {
    const attributes: Array<Attribute> = []
  
    node.attributes.forEachChild((a: unknown) => {
      const attribute = a as ts.JsxAttribute
      const { initializer } = attribute
  
      if (!initializer) return
  
      if (initializer && ts.isStringLiteral(initializer)) {
        attributes.push({
          [attribute.name.text]: initializer.text,
        })
      } else if (initializer && ts.isJsxExpression(initializer)) {
        attributes.push({
          [attribute.name.text]:
            //@ts-ignore
            initializer.expression?.escapedText,
        })
      }
    })
    return attributes
  }