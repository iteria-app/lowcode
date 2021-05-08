import { PageComponent } from '../react-components/react-component-helper'
import GenerationContext from '../context/context'
import { TableGenerator, TableGeneratorFactory } from './list/table-generator-factory'
import { DetailGenerator, DetailGeneratorFactory } from './detail/detail-generator-factory'
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
        let generator = this.getListGenerator();
        return this.getTable(generator);
    }

    private getTable(generator: TableGenerator): PageComponent {
        return generator.generateTableComponent();
    }

    private getListGenerator(): TableGenerator {
        let generatorFactory = new TableGeneratorFactory(this._context, this._entity);
        return generatorFactory.getTableGenerator();
    }

    generateDetailPage() {
        let generator = this.getDetailGenerator();
        return this.getDetail(generator);
    }

    private getDetail(generator: DetailGenerator): PageComponent {
        return generator.generateDetailComponent();
    }

    private getDetailGenerator(): DetailGenerator {
        let generatorFactory = new DetailGeneratorFactory(this._context, this._entity);
        return generatorFactory.getDetailGenerator();
    }
}