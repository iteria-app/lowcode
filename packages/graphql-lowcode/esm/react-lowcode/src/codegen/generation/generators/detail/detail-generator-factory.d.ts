import GenerationContext from '../../context/context';
import { Entity } from '../../entity';
import { ComponentGenerator } from '../../interfaces/generation-interfaces';
export declare class DetailGeneratorFactory {
    private _context;
    private _entity;
    constructor(context: GenerationContext, entity: Entity);
    getDetailGenerator(): ComponentGenerator;
}
