import ts from "typescript";
export declare function createFunctionalComponent(componentName: string | ts.Identifier | undefined, params: ts.ParameterDeclaration[], body: ts.Statement[]): ts.FunctionDeclaration;
export declare function createJsxElement(tagIdentifier: ts.Identifier, attributes: readonly ts.JsxAttributeLike[] | undefined, children: readonly ts.JsxChild[] | undefined): ts.JsxElement;
export declare function createJsxAttribute(attribute: string, attributeValue: ts.Identifier | string): ts.JsxAttribute;
export declare function createJsxSelfClosingElement(tagIdentifier: ts.Identifier, attributes: readonly ts.JsxAttributeLike[] | undefined): ts.JsxSelfClosingElement;
export interface Component {
    tagName: ts.Identifier;
    importDeclaration: ts.ImportDeclaration;
}
export interface PageComponent {
    functionDeclaration: ts.FunctionDeclaration | ts.VariableStatement | ts.InterfaceDeclaration;
    imports: ts.ImportDeclaration[];
}
export declare function defineComponent(tagName: string, packageName: string): Component;
