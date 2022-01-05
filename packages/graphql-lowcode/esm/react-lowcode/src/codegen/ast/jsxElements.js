import { factory } from "typescript";
export function createJsxSelfclosingElement(tagName) {
    return factory.createJsxSelfClosingElement(factory.createIdentifier(tagName), undefined, factory.createJsxAttributes([]));
}
