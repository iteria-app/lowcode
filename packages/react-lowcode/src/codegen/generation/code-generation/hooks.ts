import { Hook } from "../../../ast/hooks"
import TypescriptHelper from "../code-generation/ts-helper"


export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
    let importDeclaration = TypescriptHelper.createImportDeclaration(hookName, packageName)

    return {
        hookName: hookName,
        defaultInstanceName,
        importDeclaration
    }
}
