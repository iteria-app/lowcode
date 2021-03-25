import { UiFramework } from '../../../definition/context-types';
import { PageComponent } from '../../react-components/react-component-helper'
import GenerationContext from '../../context'
import GrommetDetailGenerator from './grommet-detail-generator'
import MuiDataDetailGenerator from './mui-detail-generator'

export interface DetailGenerator{
    generateDetailComponent(): PageComponent;
}

export class DetailGeneratorFactory{
    private _context: GenerationContext;

    constructor(context: GenerationContext){
        this._context = context;
    }

    getDetailGenerator(): DetailGenerator{
        let generator: DetailGenerator = new MuiDataDetailGenerator(this._context);;

        switch(this._context.uiFramework){
             case UiFramework.Grommet:
                generator = new GrommetDetailGenerator(this._context);
                break;
            case UiFramework.MaterialUI:
                generator = new MuiDataDetailGenerator(this._context);
                break;
        }

        return generator;
    }
}