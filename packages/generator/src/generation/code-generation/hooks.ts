import ts, { factory } from "typescript"
import TypescriptHelper from "../code-generation/ts-helper"

export interface Hook {
    hookName: ts.Identifier
    defaultInstanceName: string
    importDeclaration: ts.ImportDeclaration
}

export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
    let importDeclaration = TypescriptHelper.createImportDeclaration(hookName, packageName)

    return {
        hookName: factory.createIdentifier(hookName),
        defaultInstanceName,
        importDeclaration
    }
}
