import ts from "typescript"

const addTransformer = <T extends ts.Node, U extends ts.Node>(
  start: number,
  newNodes: Array<U>
): ts.TransformerFactory<T> => {
  return context => {
    const visit: ts.Visitor = node => {
      const nodeStart = node.pos
      if (nodeStart === start) {
        return [node, ...newNodes]
      }
      return ts.visitEachChild(node, child => visit(child), context)
    }

    return node => ts.visitNode(node, visit)
  }
}

export const addElementsToAST = <T extends ts.Node>(
  ast: ts.SourceFile,
  start: number,
  newNodes: Array<T>
) => {
  const result = ts.transform(ast, [addTransformer(start, newNodes)])
  return result.transformed[0]
}
