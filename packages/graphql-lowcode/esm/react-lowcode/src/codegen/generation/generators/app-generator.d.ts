import { PageComponent } from '../react-components/react-component-helper';
import GenerationContext from '../context/context';
import { Entity } from '../entity';
export declare class AppGenerator {
    _context: GenerationContext;
    _entity: Entity;
    constructor(context: GenerationContext, entity: Entity);
    generateListComponent(): PageComponent | undefined;
    private getTable;
    private getIndexGenerator;
    generateDetailPage(): PageComponent | undefined;
    private getDetail;
    private getDetailGenerator;
    generateInterface(): PageComponent | undefined;
}
