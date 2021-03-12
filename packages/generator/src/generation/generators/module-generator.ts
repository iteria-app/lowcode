import { PageComponent } from '../react-components/react-component-helper'
import GenerationContext from '../context'
import { TableGenerator, TableGeneratorFactory } from './table/table-generator-factory'

export class ModuleGenerator {
    _context: GenerationContext;
  
    constructor (context: GenerationContext) {
        this._context = context;
    }

    generateTablePage() {
        let generator = this.getTableGenerator();
        return this.getTable(generator);
    }

    private getTable(generator: TableGenerator): PageComponent {
        return generator.generateTableComponent();
    }

    private getTableGenerator(): TableGenerator {
        let generatorFactory = new TableGeneratorFactory(this._context);
        return generatorFactory.getTableGenerator();
    }
}