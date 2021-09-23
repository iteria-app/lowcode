import { tsAst } from '../codegen/ts-tag';
export function hookJsx(hook, params = '') {
    return tsAst `const ${hook.defaultInstanceName} = ${hook.hookName}(${params})`;
}
