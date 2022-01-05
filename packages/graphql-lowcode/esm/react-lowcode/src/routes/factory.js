import { factory } from "typescript";
export const createSelfClosingJsxRouteElement = (newPageName) => factory.createJsxSelfClosingElement(factory.createIdentifier("Route"), undefined, factory.createJsxAttributes([
    factory.createJsxAttribute(factory.createIdentifier("path"), factory.createStringLiteral(`/${newPageName}`)),
    factory.createJsxAttribute(factory.createIdentifier("component"), factory.createJsxExpression(undefined, factory.createIdentifier(newPageName))),
]));
export const createOpeningAndClosingJsxRouteElement = (newPageName) => {
    const newOpeningNode = factory.createJsxOpeningElement(factory.createIdentifier("Route"), undefined, factory.createJsxAttributes([
        factory.createJsxAttribute(factory.createIdentifier("path"), factory.createStringLiteral(`/${newPageName}`)),
        factory.createJsxAttribute(factory.createIdentifier("component"), factory.createJsxExpression(undefined, factory.createIdentifier(newPageName))),
    ]));
    const newClosingNode = factory.createJsxClosingElement(factory.createIdentifier("Route"));
    return [newOpeningNode, newClosingNode];
};
export const wrapNodesWithFragment = (node, newNodes) => factory.createJsxFragment(factory.createJsxOpeningFragment(), [node, ...newNodes], factory.createJsxJsxClosingFragment());
export const createEmptySpanElement = () => factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("span"), undefined, factory.createJsxAttributes([])), [], factory.createJsxClosingElement(factory.createIdentifier("span")));
