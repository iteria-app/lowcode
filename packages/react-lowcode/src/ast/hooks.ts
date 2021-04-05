import ts from 'typescript'
import { tsAst } from '../codegen/ts-tag'

export interface HookImport {
    hookName: string
    importDeclaration: ts.ImportDeclaration
}

export interface Hook extends HookImport {
    defaultInstanceName: string
}

export function hookJsx(hook: Hook, params = ''): ts.VariableStatement {
    return tsAst`const ${hook.defaultInstanceName} = ${hook.hookName}(${params})`
}
