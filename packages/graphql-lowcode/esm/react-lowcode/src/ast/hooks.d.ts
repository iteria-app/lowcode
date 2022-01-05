import ts from 'typescript';
export interface HookImport {
    hookName: string;
    importDeclaration: ts.ImportDeclaration;
}
export interface Hook extends HookImport {
    defaultInstanceName: string;
}
export declare function hookJsx(hook: Hook, params?: string): ts.VariableStatement;
