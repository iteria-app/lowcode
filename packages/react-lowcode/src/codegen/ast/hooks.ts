import { Hook } from "../../ast/hooks"
import { createImportDeclaration } from "./imports"
import ts, { factory } from "typescript"

export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
  let importDeclaration = createImportDeclaration(hookName, packageName)

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
