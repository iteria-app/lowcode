import GenerationContext from '../../context/context';
import { Entity, Property } from '../../entity';
import { SourceLineCol } from '../../../../ast';
import { ComponentGenerator } from '../../interfaces/generation-interfaces';
export interface TableGenerator extends ComponentGenerator {
    insertColumn(componentPosition: SourceLineCol, property: Property, columnIndex?: number): any;
}
export declare class TableGeneratorFactory {
    private _context;
    private _entity;
    constructor(context: GenerationContext, entity: Entity);
    getTableGenerator(): TableGenerator;
}
