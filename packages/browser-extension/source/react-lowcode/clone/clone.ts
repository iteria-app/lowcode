import ts from "typescript"
import { SourceLineCol, astFindSource } from "../ast/find"
import { createAst } from "../ast/factory"
import { isInsideMapPatternFunction } from "../functions/maps"
import { addElementsToAST } from "../ast/transformer"

export const addCodeSnippet = (
  code: string,
  source: SourceLineCol,
  codeSnippet: string
) => {
  const found = astFindSource(code, source)
  if (found) {
    const before = code.substring(0, found.end)
    const after = code.substring(found.end)

    return before + codeSnippet + after
  }

  return null
}

export function tsClone(code: string, source: SourceLineCol, filePath: string) {
  const found = astFindSource(code, source)
  if (found) {
    if (found) {
      console.log(
        "source found",
        found,
        code.substring(found.pos, found.end),
        filePath
      )
    }

    const before = code.substring(0, found.end)

    const startEndOfLine = before.lastIndexOf("\n")
    const lineStarts = startEndOfLine >= 0 ? startEndOfLine : 0
    const toBeCloned = code.substring(lineStarts, found.end)
    console.log(toBeCloned)

    const after = code.substring(found.end)

    return before + toBeCloned + after
  }

  return null
}

export const cloneElementInAst = (code: string, source: SourceLineCol) => {
  const node = astFindSource(code, source)
  const ast = createAst(code)
  if (!node || !ast) return null
  // TODO this should return only when the component is root component of map function(it has a key)
  if (isInsideMapPatternFunction(node))
    return alert(
      "You are trying to clone element which is inside map function, this could clone multiple elements on this page"
    )
  // If node is parenthesized expression, strip parentheses so cloned node won't be wrapped in them
  const finalNode = ts.isParenthesizedExpression(node) ? node.expression : node

  const alteredAst = addElementsToAST(ast, finalNode.pos, [finalNode])
  return alteredAst
}
