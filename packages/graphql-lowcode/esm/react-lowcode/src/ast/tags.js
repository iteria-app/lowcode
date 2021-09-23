import { factory } from 'typescript';
export function tagJsx(tag, children) {
    if (!(children === null || children === void 0 ? void 0 : children.length)) {
        return factory.createJsxSelfClosingElement(factory.createIdentifier(tag.tagName), undefined, factory.createJsxAttributes([]));
    }
    return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier(tag.tagName), undefined, factory.createJsxAttributes([])), children, factory.createJsxClosingElement(factory.createIdentifier("Aaa")));
}
