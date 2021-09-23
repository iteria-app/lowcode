import ts, { factory, } from "typescript";
import { getProperties } from "../../entity";
import { getEntityInterfaceName } from "../../entity/helper";
export default class InterfaceGenerator {
    constructor(entity) {
        this._imports = [];
        this._entity = entity;
    }
    generateComponent() {
        var functionalComponent = this.generateInterface();
        return {
            functionDeclaration: functionalComponent,
            imports: this._imports,
        };
    }
    generateInterface() {
        return factory.createInterfaceDeclaration(undefined, [factory.createModifier(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier(getEntityInterfaceName(this._entity)), undefined, undefined, this.getInterfaceFields());
    }
    getInterfaceFields() {
        const inputs = getProperties(this._entity).map(property => {
            return this.getPropertySignature(property);
        });
        return inputs;
    }
    getPropertySignature(property) {
        return factory.createPropertySignature(undefined, factory.createIdentifier(property.getName()), undefined, factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword));
    }
}
