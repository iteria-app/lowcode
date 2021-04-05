// Typescript tag template literal allows to translate strings to AST:
// <code>
// ts`<tag label="${dynamickaHodnota}"></tag>`
// </code>
//
// Benefits:
// - human readable code template
// - flexibility of AST at codegen runtime
export function ts(literals: string | readonly string[], ...args: any[]) {
    // TODO implement tag template literal simmilart to https://github.com/apollographql/graphql-tag/blob/main/src/index.ts#L113
    // parse string into typescript AST (like https://ts-ast-viewer.com/#)
    return {}
}
// TODO check vscode marketplace for tagged template literals
// https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor
// https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo
