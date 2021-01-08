import ts from "typescript";
import { createAst } from './createSourceFile'

export interface SourceLineCol {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

export function codeStart(code: string, source: SourceLineCol) {
  const sourceLines = code.split('\n')
  if (source.lineNumber > 0 && source.lineNumber < sourceLines.length) {
    const lineIndex = source.lineNumber - 1;
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
    const nodeStart = node.pos;
    if (nodeStart <= start && start <= node.end) {
      if (nodeStart == start) { //node.kind == ts.SyntaxKind.JsxElement
        return node;
      }
      return ts.forEachChild<ts.Node>(node, callback);
    }

    return null
  };
  const ast = await createAst(code);
  if (ast) {
    const found = ts.forEachChild(ast, callback);
    return found
  }

  return null
}

export async function astFindSource(code: string, source: SourceLineCol) {
  const start = codeStart(code, source)
  if (start) {
    const found = await astFindStart(code, start);
    return found
    //sourceLines.splice(lineIndex, 0, sourceLine);
    //const newContent = sourceLines.join('\n');
    //return newContent;
  }

  return null
}
