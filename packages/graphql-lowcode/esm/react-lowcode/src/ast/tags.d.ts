import typescript from 'typescript';
export interface TagImport {
    tagName: string;
    importDeclaration: typescript.ImportDeclaration;
}
export interface TagJsx extends TagImport {
    atributes: {
        [name: string]: {
            type: typescript.Identifier;
        };
    };
}
export declare function tagJsx(tag: TagJsx, children: typescript.JsxChild[]): typescript.JsxSelfClosingElement | typescript.JsxElement;
