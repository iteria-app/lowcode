import { factory } from "typescript";
export function jsxText(text) {
    return factory.createJsxText(text);
}
export function stringLiteral(text) {
    return factory.createStringLiteral(text);
}
