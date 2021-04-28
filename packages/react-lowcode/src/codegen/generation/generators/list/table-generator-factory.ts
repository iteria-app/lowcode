import { TableType, UiFramework } from '../../../definition/context-types';
import { PageComponent } from '../../react-components/react-component-helper'
import GenerationContext from '../../context/context'
import {BasicTableGenerator} from './basic-table-generator'
import MuiDataTableGenerator from './mui-datatable-generator'
import GrommetDataTableGenerator from './grommet-dt-generator'
import { Entity, Property } from '../../entity';
import { SourceLineCol } from '../../../../ast';

export interface TableGenerator{
    insertColumn(componentPosition: SourceLineCol, property: Property, columnIndex?: number): any
    generateTableComponent(): PageComponent
}

export class TableGeneratorFactory{
    private _context: GenerationContext;
    private _entity: Entity;


    constructor(context: GenerationContext, entity: Entity){
        this._context = context;
        this._entity = entity;
    }

    getTableGenerator(): TableGenerator{
        let generator: TableGenerator = new BasicTableGenerator(this._context, this._entity);

        if(this._context.index?.tableType === TableType.DataTable) {
            switch(this._context.uiFramework){
                case UiFramework.MaterialUI:
                    generator = new MuiDataTableGenerator(this._context, this._entity);
                    break;
                case UiFramework.Grommet:
                    generator = new GrommetDataTableGenerator(this._context, this._entity);
                    break;
            }
        }

        return generator;
    }
}