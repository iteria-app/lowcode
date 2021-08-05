import * as ts from "typescript"
//@ts-ignore
import prettier from "https://unpkg.com/prettier@2.3.2/standalone.js"
//@ts-ignore
import typescriptParser from "https://unpkg.com/prettier@2.3.2/parser-typescript.js"

export const encodeEmptyLines = (code: string) =>
  code.replace(/\n\n/g, "\n/** THIS_IS_A_NEWLINE **/\n")

export const decodeEmptyLines = (code: string) =>
  code.replace(/\/\*\* THIS_IS_A_NEWLINE \*\*\//g, "")

export const printFormattedSourceFile = (sourceFile: ts.SourceFile) => {
  const printer = ts.createPrinter()
  const code = printer.printFile(sourceFile)
  const decoded = decodeEmptyLines(code)
  const formattedCode = formatCode(decoded)
  return formattedCode
}

export const formatCode = (code: string) => {
  const formattedCode = prettier.format(code, {
    parser: "typescript",
    plugins: [typescriptParser],
  })

  return formattedCode
}
