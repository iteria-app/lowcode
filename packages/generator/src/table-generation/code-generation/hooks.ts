import ts, { factory } from "typescript"

export interface Hook {
    hookName: ts.Identifier
    defaultInstanceName: string
    importDeclaration: ts.ImportDeclaration
}

export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
    const hookNameIdentifier = factory.createIdentifier(hookName)
    return {
        hookName: factory.createIdentifier(hookName),
        defaultInstanceName,
        importDeclaration: factory.createImportDeclaration(
            undefined,
            undefined,
            factory.createImportClause(
                false,
                undefined,
                factory.createNamedImports([
                    factory.createImportSpecifier(
                        undefined,
                        hookNameIdentifier
                    ),
                ])
            ),
            factory.createStringLiteral(packageName)
        ),
    }
}
