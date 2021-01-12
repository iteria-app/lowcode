import { SourceLineCol, astFindSource } from "./ast"

export const findElementInCode = async (
  code: string,
  source: SourceLineCol
) => {
  const found = await astFindSource(code, source)
  if (found) {
    const before = code.substring(0, found.end)

    const startEndOfLine = before.lastIndexOf("\n")
    const lineStarts = startEndOfLine >= 0 ? startEndOfLine : 0
    return code.substring(lineStarts, found.end)
  }
  return null
}

export const addCodeSnippet = async (
  code: string,
  source: SourceLineCol,
  codeSnippet: string
) => {
  const found = await astFindSource(code, source)
  if (found) {
    const before = code.substring(0, found.end)
    const after = code.substring(found.end)

    return before + codeSnippet + after
  }

  return null
}

export async function tsClone(
  code: string,
  source: SourceLineCol,
  filePath: string
) {
  const found = await astFindSource(code, source)
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
