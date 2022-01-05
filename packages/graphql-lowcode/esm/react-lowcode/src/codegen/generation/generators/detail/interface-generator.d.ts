import { Entity } from "../../entity";
import { PageComponent } from "../../react-components/react-component-helper";
import { ComponentGenerator } from "../../interfaces/generation-interfaces";
export default class InterfaceGenerator implements ComponentGenerator {
    private _imports;
    private _entity;
    constructor(entity: Entity);
    generateComponent(): PageComponent | undefined;
    private generateInterface;
    private getInterfaceFields;
    private getPropertySignature;
}
