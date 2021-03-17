import ts from "typescript"
import TypescriptHelper from "../code-generation/ts-helper"

export interface Hook {
    hookName: string
    defaultInstanceName: string
    importDeclaration: ts.ImportDeclaration
}

export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
    let importDeclaration = TypescriptHelper.createImportDeclaration(hookName, packageName)

    return {
        hookName: hookName,
        defaultInstanceName,
        importDeclaration
    }
}
