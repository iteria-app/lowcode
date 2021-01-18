import ts from "typescript"
import { createAst } from "./createSourceFile"

export interface SourceLineCol {
  fileName: string
  lineNumber: number
  columnNumber: number
}

export interface Attribute {
  [name: string]: string
}

export function codeStart(code: string, source: SourceLineCol) {
  const sourceLines = code.split("\n")
  if (source.lineNumber > 0 && source.lineNumber < sourceLines.length) {
    const lineIndex = source.lineNumber - 1
    let start = 0
    for (let i = 0; i < lineIndex; ++i) {
      const line = sourceLines[i]
      start += line.length + 1
    }
    start += source.columnNumber - 1

    return start
  }

  return null
}

export async function astFindStart(code: string, start: number) {
  const callback = (node: ts.Node) => {
    const nodeStart = node.pos
    if (nodeStart <= start && start <= node.end) {
      if (nodeStart == start) {
        //node.kind == ts.SyntaxKind.JsxElement
        return node
      }
      return ts.forEachChild<ts.Node>(node, callback)
    }

    return null
  }
  const ast = createAst(code)
  if (ast) {
    const found = ts.forEachChild(ast, callback)
    return found
  }

  return null
}

export async function astFindSource(code: string, source: SourceLineCol) {
  const start = codeStart(code, source)
  if (start) {
    const found = await astFindStart(code, start)
    return found
    //sourceLines.splice(lineIndex, 0, sourceLine);
    //const newContent = sourceLines.join('\n');
    //return newContent;
  }

  return null
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
