import { PageComponent } from '../../react-components/react-component-helper';
import { Entity, Property } from '../../entity/index';
import { TableGenerator } from './table-generator-factory';
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core';
import GenerationContext from "../../context/context";
import { SourceLineCol } from "../../../../ast";
import { WidgetContext } from "../../context/widget-context";
export default class GrommetDataTableGenerator implements TableGenerator {
    private readonly _helper;
    private _imports;
    private _context;
    private _entity?;
    private _intlFormatter;
    private _widgetContext;
    constructor(generationContext: GenerationContext, entity?: Entity, widgetContext?: WidgetContext);
    insertColumn(position: SourceLineCol, property: Property, columnIndex?: number): Promise<string>;
    private printSourceCode;
    private addNewColumn;
    private findColumnsDeclaration;
    private newColumnsDeclaration;
    getTableDefinition(): TableComponentDefinitionBase;
    generateComponent(): PageComponent | undefined;
    private createStatements;
    private createColumns;
    private createColumnDefinition;
    private getUsedFormatter;
    private getRender;
}
