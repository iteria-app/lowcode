import ts, { factory } from "typescript";
import { createNamedImportDeclaration } from "../../ast/imports";
export function createFunctionalComponent(componentName = undefined, params, body) {
    return factory.createFunctionDeclaration(undefined, [
        factory.createModifier(ts.SyntaxKind.ExportKeyword),
        factory.createModifier(ts.SyntaxKind.DefaultKeyword)
    ], undefined, componentName, undefined, params, undefined, factory.createBlock(body, true));
}
export function createJsxElement(tagIdentifier, attributes, children) {
    const jsxOpeningElement = factory.createJsxOpeningElement(tagIdentifier, undefined, factory.createJsxAttributes(attributes !== null && attributes !== void 0 ? attributes : []));
    const jsxClosingElement = factory.createJsxClosingElement(tagIdentifier);
    return factory.createJsxElement(jsxOpeningElement, children !== null && children !== void 0 ? children : [], jsxClosingElement);
}
export function createJsxAttribute(attribute, attributeValue) {
    let valueIdentifier;
    if (typeof attributeValue === 'string') {
        valueIdentifier = factory.createIdentifier(attributeValue);
    }
    else {
        valueIdentifier = attributeValue;
    }
    return factory.createJsxAttribute(factory.createIdentifier(attribute), factory.createJsxExpression(undefined, valueIdentifier));
}
export function createJsxSelfClosingElement(tagIdentifier, attributes) {
    return factory.createJsxSelfClosingElement(tagIdentifier, undefined, factory.createJsxAttributes(attributes !== null && attributes !== void 0 ? attributes : []));
}
export function defineComponent(tagName, packageName) {
    const tagNameIdentifier = factory.createIdentifier(tagName);
    let importDeclaration = createNamedImportDeclaration(tagName, packageName);
    return {
        tagName: tagNameIdentifier,
        importDeclaration
    };
}
