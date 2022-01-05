import { UiFramework } from '../../../definition/context-types';
import GrommetDetailGenerator from './grommet-detail-generator';
import MuiDataDetailGenerator from './mui-detail-generator';
export class DetailGeneratorFactory {
    constructor(context, entity) {
        this._context = context;
        this._entity = entity;
    }
    getDetailGenerator() {
        let generator = new MuiDataDetailGenerator(this._context, this._entity);
        switch (this._context.uiFramework) {
            case UiFramework.Grommet:
                generator = new GrommetDetailGenerator(this._context, this._entity);
                break;
            case UiFramework.MaterialUI:
                generator = new MuiDataDetailGenerator(this._context, this._entity);
                break;
        }
        return generator;
    }
}
