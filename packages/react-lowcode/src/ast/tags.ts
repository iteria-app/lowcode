import typescript, { factory } from 'typescript'

export interface TagImport {
    tagName: string
    importDeclaration: typescript.ImportDeclaration
}

export interface TagJsx extends TagImport {
    atributes: { [name: string]: { type: typescript.Identifier } }
}

export function tagJsx(tag: TagJsx, children: typescript.JsxChild[]) {
    if (!children?.length) {
        return factory.createJsxSelfClosingElement(
            factory.createIdentifier(tag.tagName),
            undefined,
            factory.createJsxAttributes([])
          )
    }

    return factory.createJsxElement(
          factory.createJsxOpeningElement(
            factory.createIdentifier(tag.tagName),
            undefined,
            factory.createJsxAttributes([])
          ),
          children,
          factory.createJsxClosingElement(factory.createIdentifier("Aaa"))
        )
}
