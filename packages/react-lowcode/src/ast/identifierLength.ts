import { SourceLineCol, startOfJsxIdentifier, astFindStart } from "../ast/find"

export const getJsxIdentifierLength = (code: string, source: SourceLineCol) => {
  const pos = startOfJsxIdentifier(code, source)
  const node = astFindStart(code, pos!)
  if (!node) throw new Error("Unable to find node in AST")
  return node.end - node.pos
}
