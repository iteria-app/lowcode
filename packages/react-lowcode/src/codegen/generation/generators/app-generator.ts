import { PageComponent } from '../react-components/react-component-helper'
import GenerationContext from '../context/context'
import { TableGenerator, TableGeneratorFactory } from './list/table-generator-factory'
import { DetailGeneratorFactory } from './detail/detail-generator-factory'
import { Entity } from '../entity';
import InterfaceGenerator from './detail/interface-generator';
import { ComponentGenerator } from '../interfaces/generation-interfaces';

export class AppGenerator {
    _context: GenerationContext;
    _entity: Entity;
  
    constructor (context: GenerationContext, entity: Entity) {
        this._context = context;
        this._entity = entity;
    }

    generateListComponent(): PageComponent | undefined {
        let generator = this.getIndexGenerator();
        return this.getTable(generator);
    }

    private getTable(generator: TableGenerator): PageComponent | undefined {
        return generator.generateComponent();
    }

    private getIndexGenerator(): TableGenerator {
        let generatorFactory = new TableGeneratorFactory(this._context, this._entity);
        return generatorFactory.getTableGenerator();
    }

    generateDetailPage(): PageComponent | undefined  {
        let generator = this.getDetailGenerator();
        return this.getDetail(generator);
    }

    private getDetail(generator: ComponentGenerator): PageComponent | undefined {
        return generator.generateComponent();
    }

    private getDetailGenerator(): ComponentGenerator {
        let generatorFactory = new DetailGeneratorFactory(this._context, this._entity);
        return generatorFactory.getDetailGenerator();
    }

     generateInterface(): PageComponent | undefined  {
        let generator = new InterfaceGenerator(this._entity);
        return generator.generateComponent();
    }
}