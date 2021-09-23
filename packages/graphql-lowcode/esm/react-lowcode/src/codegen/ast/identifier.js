import { factory } from "typescript";
export function identifier(text) {
    return factory.createIdentifier(text);
}
