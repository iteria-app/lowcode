import { UiFramework } from '../../../definition/context-types';
import GenerationContext from '../../context/context'
import GrommetDetailGenerator from './grommet-detail-generator'
import MuiDataDetailGenerator from './mui-detail-generator'
import { Entity } from '../../entity';
import { ComponentGenerator } from '../../interfaces/generation-interfaces';

export class DetailGeneratorFactory{
    private _context: GenerationContext;
    private _entity: Entity;

    constructor(context: GenerationContext, entity: Entity){
        this._context = context;
        this._entity = entity;
    }

    getDetailGenerator(): ComponentGenerator{
        let generator: ComponentGenerator = new MuiDataDetailGenerator(this._context, this._entity);

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