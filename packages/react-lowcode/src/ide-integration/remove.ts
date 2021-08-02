import { SourceLineCol } from "../ast"
import { removeElementInAst } from "../remove"
import { encodeEmptyLines, printFormattedSourceFile } from "./format"

export const removeElement = (code: string, source: SourceLineCol) => {
  const encoded = encodeEmptyLines(code)
  const alteredAst = removeElementInAst(encoded, source)
  if (!alteredAst) return console.error("Unable to remove Element from AST")
  const newCode = printFormattedSourceFile(alteredAst)
  return newCode
}
