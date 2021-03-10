import { TableType } from '../../../definition/table-types';
import { TableComponent } from '../../react-components/react-component-helper'
import GenerationContext from '../../context'
import {BasicTableGenerator} from './basic-table-generator'
import MuiDataTableGenerator from './mui-dt-generator'
import GrommetDataTableGenerator from './grommet-dt-generator'

export interface TableGenerator{
    generateTableComponent(): TableComponent;
}

export class TableGeneratorFactory{
    private _context: GenerationContext;

    constructor(context: GenerationContext){
        this._context = context;
    }

    getTableGenerator(): TableGenerator{
        let generator: TableGenerator;

        switch(this._context.tableType){
            case TableType.MuiTable:
                generator = new BasicTableGenerator(this._context);
                break;
            case TableType.GrommetTable:
                generator = new BasicTableGenerator(this._context);
                break;
            case TableType.MuiDataTable:
                generator = new MuiDataTableGenerator(this._context);
                break;
            case TableType.GrommetDataTable:
                generator = new GrommetDataTableGenerator(this._context);
                break;
        }

        return generator;
    }
}