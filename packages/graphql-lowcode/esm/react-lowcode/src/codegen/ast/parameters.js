import { factory } from "typescript";
export function bindingParameter(identifier) {
    return factory.createParameterDeclaration(undefined, undefined, undefined, factory.createObjectBindingPattern([factory.createBindingElement(undefined, undefined, identifier, undefined)]), undefined, undefined, undefined);
}
