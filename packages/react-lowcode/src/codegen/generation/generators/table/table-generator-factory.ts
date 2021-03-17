import { TableType, UiFramework } from '../../../definition/context-types';
import { PageComponent } from '../../react-components/react-component-helper'
import GenerationContext from '../../context'
import {BasicTableGenerator} from './basic-table-generator'
import MuiDataTableGenerator from './mui-dt-generator'
import GrommetDataTableGenerator from './grommet-dt-generator'

export interface TableGenerator{
    generateTableComponent(): PageComponent;
}

export class TableGeneratorFactory{
    private _context: GenerationContext;

    constructor(context: GenerationContext){
        this._context = context;
    }

    getTableGenerator(): TableGenerator{
        let generator: TableGenerator = new BasicTableGenerator(this._context);

        if(this._context.tableType === TableType.DataTable) {
            switch(this._context.uiFramework){
                case UiFramework.MaterialUI:
                    generator = new MuiDataTableGenerator(this._context);
                    break;
                case UiFramework.Grommet:
                    generator = new GrommetDataTableGenerator(this._context);
                    break;
            }
        }

        return generator;
    }
}