import { Hook } from "../../ast/hooks"
import { createImportDeclaration } from "./imports"


export function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook {
    let importDeclaration = createImportDeclaration(hookName, packageName)

    return {
        hookName: hookName,
        defaultInstanceName,
        importDeclaration
    }
}
