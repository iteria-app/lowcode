import { TableGeneratorFactory } from './list/table-generator-factory';
import { DetailGeneratorFactory } from './detail/detail-generator-factory';
import InterfaceGenerator from './detail/interface-generator';
export class AppGenerator {
    constructor(context, entity) {
        this._context = context;
        this._entity = entity;
    }
    generateListComponent() {
        let generator = this.getIndexGenerator();
        return this.getTable(generator);
    }
    getTable(generator) {
        return generator.generateComponent();
    }
    getIndexGenerator() {
        let generatorFactory = new TableGeneratorFactory(this._context, this._entity);
        return generatorFactory.getTableGenerator();
    }
    generateDetailPage() {
        let generator = this.getDetailGenerator();
        return this.getDetail(generator);
    }
    getDetail(generator) {
        return generator.generateComponent();
    }
    getDetailGenerator() {
        let generatorFactory = new DetailGeneratorFactory(this._context, this._entity);
        return generatorFactory.getDetailGenerator();
    }
    generateInterface() {
        let generator = new InterfaceGenerator(this._entity);
        return generator.generateComponent();
    }
}
