import { SourceLineCol } from "../ast"
import { cloneElementInAst } from "../clone"
import { encodeEmptyLines, printFormattedSourceFile } from "./format"

export const cloneElement = (code: string, source: SourceLineCol) => {
  // Encode empty lines as comment so ts-compiler won't remove them
  const encoded = encodeEmptyLines(code)
  const alteredAst = cloneElementInAst(encoded, source)
  if (!alteredAst) return console.error("Unable to clone Element in AST")

  const newCode = printFormattedSourceFile(alteredAst)
  return newCode
}
