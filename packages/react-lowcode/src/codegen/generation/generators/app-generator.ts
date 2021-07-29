import { PageComponent } from '../react-components/react-component-helper'
import GenerationContext from '../context/context'
import { TableGenerator, TableGeneratorFactory } from './list/table-generator-factory'
import { DetailGenerator, DetailGeneratorFactory } from './detail/detail-generator-factory'
import { Entity } from '../entity';
import InterfaceGenerator from './detail/interface-generator';

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

    generateListComponent(): PageComponent | undefined {
        let generator = this.getIndexGenerator();
        return this.getTable(generator);
    }

    private getTable(generator: TableGenerator): PageComponent | undefined {
        return generator.generateTableComponent();
    }

    private getIndexGenerator(): TableGenerator {
        let generatorFactory = new TableGeneratorFactory(this._context, this._entity);
        return generatorFactory.getTableGenerator();
    }

    generateDetailPage() {
        let generator = this.getDetailGenerator();
        return this.getDetail(generator);
    }

    private getDetail(generator: DetailGenerator): PageComponent | undefined {
        return generator.generateDetailComponent();
    }

    private getDetailGenerator(): DetailGenerator {
        let generatorFactory = new DetailGeneratorFactory(this._context, this._entity);
        return generatorFactory.getDetailGenerator();
    }

     generateInterface() {
        let generator = new InterfaceGenerator(this._entity);
        return generator.generateDetailComponent();
    }
}