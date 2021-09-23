import { PageComponent } from "../../react-components/react-component-helper";
import { DetailComponentDefinitionBase } from "../../../definition/detail-definition-core";
import { Entity } from "../../entity";
import GenerationContext from "../../context/context";
import { ComponentGenerator } from "../../interfaces/generation-interfaces";
export default class GrommetDetailGenerator implements ComponentGenerator {
    private readonly _helper;
    private _imports;
    private _context;
    private _entity;
    private _intlFormatter;
    private _dataPropertyName;
    constructor(generationContext: GenerationContext, entity: Entity);
    getDetailDefinition(): DetailComponentDefinitionBase;
    generateComponent(): PageComponent;
    private createStatements;
    private createInputsForEntity;
    private tryCreateInputForProperty;
    private createTextFieldComponent;
    private createFormElement;
    private createDateComponent;
    private createFormikWrapper;
    private creteInitialValuesForEntity;
    private tryCreateInitialValueForProperty;
    private createConstFunction;
}
