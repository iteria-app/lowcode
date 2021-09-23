import { createNamedImportDeclaration } from "./imports";
import ts, { factory } from "typescript";
export function defineHook(defaultInstanceName, hookName, packageName) {
    let importDeclaration = createNamedImportDeclaration(hookName, packageName);
    return {
        hookName: hookName,
        defaultInstanceName,
        importDeclaration
    };
}
export function createUseQueryExpression(hookName, variables) {
    return factory.createCallExpression(factory.createIdentifier(hookName), undefined, [factory.createObjectLiteralExpression([factory.createPropertyAssignment(factory.createIdentifier('variables'), factory.createObjectLiteralExpression([], //TODO variables
            false))], true)]);
}
export const isUseQueryHook = (node, name) => {
    if (ts.isCallExpression(node)) {
        if (node.expression.getFullText().indexOf(name) > 0) {
            return true;
        }
    }
};
