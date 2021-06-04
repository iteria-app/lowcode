import ts, {factory} from "typescript"

export function createVariableStatement(variableName:string, expression:ts.Expression, flag: ts.NodeFlags): ts.VariableStatement {
  return factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(variableName),
        undefined,
        undefined,
        expression
      )],
      flag
    )
  )
}
