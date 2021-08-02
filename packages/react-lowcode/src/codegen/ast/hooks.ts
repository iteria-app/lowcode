import { Hook } from "../../ast/hooks"
import { createNamedImportDeclaration } from "./imports"
import ts, { factory } from "typescript"

export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
    let importDeclaration = createNamedImportDeclaration(hookName, packageName)
    return {
      hookName: hookName,
      defaultInstanceName,
      importDeclaration
    }
}

export function createUseQueryExpression(hookName: string, variables?: string[]): ts.CallExpression {
  return factory.createCallExpression(
    factory.createIdentifier(hookName),
    undefined,
    [factory.createObjectLiteralExpression(
      [factory.createPropertyAssignment(
        factory.createIdentifier('variables'),
        factory.createObjectLiteralExpression(
          [], //TODO variables
          false
        )
      )],
      true
    )]
  )
}

export const isUseQueryHook = (node: ts.Node, name: string): boolean | undefined => {
  if(ts.isCallExpression(node)) {
    if(node.expression.getFullText().indexOf(name) > 0) {
      return true
    }
  }
}
