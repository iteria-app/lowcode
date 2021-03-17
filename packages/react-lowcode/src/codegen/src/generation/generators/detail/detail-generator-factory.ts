import { UiFramework } from '../../../definition/context-types';
import { PageComponent } from '../../react-components/react-component-helper'
import GenerationContext from '../../context'
//import {BasicDetailGenerator} from './basic-detail-generator'
//import MuiDataDetailGenerator from './mui-dt-generator'
import GrommetDataDetailGenerator from './grommet-detail-generator'

export interface DetailGenerator{
    generateDetailComponent(): PageComponent;
}

export class DetailGeneratorFactory{
    private _context: GenerationContext;

    constructor(context: GenerationContext){
        this._context = context;
    }

    getDetailGenerator(): DetailGenerator{
        let generator: DetailGenerator = new GrommetDataDetailGenerator(this._context);;

        switch(this._context.uiFramework){
            /*case DetailType.MuiDetail:
                generator = new BasicDetailGenerator(this._context);
                break;
            case TableType.GrommetTable:
                generator = new BasicDetailGenerator(this._context);
                break;
             case DetailType.MuiDataDetail:
                generator = new MuiDataDetailGenerator(this._context);
                break;*/
            case UiFramework.Grommet:
                generator = new GrommetDataDetailGenerator(this._context);
                break;
        }

        return generator;
    }
}