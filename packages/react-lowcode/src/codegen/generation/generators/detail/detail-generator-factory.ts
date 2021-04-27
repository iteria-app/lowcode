import { UiFramework } from '../../../definition/context-types';
import { PageComponent } from '../../react-components/react-component-helper'
import GenerationContext from '../../context/context'
import GrommetDetailGenerator from './grommet-detail-generator'
import MuiDataDetailGenerator from './mui-detail-generator'
import { Entity } from '../../entity';

export interface DetailGenerator{
    generateDetailComponent(): PageComponent;
}

export class DetailGeneratorFactory{
    private _context: GenerationContext;
    private _entity: Entity;

    constructor(context: GenerationContext, entity: Entity){
        this._context = context;
        this._entity = entity;
    }

    getDetailGenerator(): DetailGenerator{
        let generator: DetailGenerator = new MuiDataDetailGenerator(this._context, this._entity);

        switch(this._context.uiFramework){
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