import { factory } from "typescript";
export function createVariableStatement(variableName, expression, flag) {
    return factory.createVariableStatement(undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createIdentifier(variableName), undefined, undefined, expression)], flag));
}
