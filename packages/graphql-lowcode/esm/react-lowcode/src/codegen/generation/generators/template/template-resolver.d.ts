import { Entity } from "../../entity";
import { IntrospectionQuery } from '@iteria-app/graphql-lowcode/esm/generate';
export default class TemplateResolver {
    private _entity?;
    private _introspection?;
    constructor(entity: Entity, introspection: IntrospectionQuery);
    generateListPage(template: string, generatedFolderPath: string): string | undefined;
    private createExportAssignment;
    private createListComponentElement;
    private createPageComponentElement;
}
