import { TableType, UiFramework } from '../../../definition/context-types';
import { BasicTableGenerator } from './basic-table-generator';
import MuiDataTableGenerator from './mui-datatable-generator';
import GrommetDataTableGenerator from './grommet-dt-generator';
export class TableGeneratorFactory {
    constructor(context, entity) {
        this._context = context;
        this._entity = entity;
    }
    getTableGenerator() {
        var _a;
        let generator = new BasicTableGenerator(this._context, this._entity);
        if (((_a = this._context.index) === null || _a === void 0 ? void 0 : _a.tableType) === TableType.DataTable) {
            switch (this._context.uiFramework) {
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
