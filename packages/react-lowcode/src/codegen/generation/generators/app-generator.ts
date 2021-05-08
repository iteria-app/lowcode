import GenerationContext from '../context/context'
import { TableGeneratorFactory } from './list/table-generator-factory'
import { DetailGeneratorFactory } from './detail/detail-generator-factory'
import { Entity } from '../entity';

export class AppGenerator {
    _context: GenerationContext;
    _entity: Entity;
  
    constructor (context: GenerationContext, entity: Entity) {
        this._context = context;
        this._entity = entity;
    }

    getDefaultOptions(): GenerationContext {
        return {

        };
    }

    generateListPage() {
        const generatorFactory = new TableGeneratorFactory(this._context, this._entity);
        const generator = generatorFactory.getTableGenerator();
        return generator.generateTableComponent();
    }

    generateDetailPage() {
        const generatorFactory = new DetailGeneratorFactory(this._context, this._entity);
        const generator = generatorFactory.getDetailGenerator();
        return generator.generateDetailComponent();
    }
}
