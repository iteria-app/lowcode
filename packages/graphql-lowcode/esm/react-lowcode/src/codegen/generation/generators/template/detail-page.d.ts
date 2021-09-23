import { IntrospectionQuery } from "@iteria-app/graphql-lowcode/esm/generate";
import { Entity } from "../../entity";
export default class DetailPageTemplateResolver {
    private _entity?;
    private _introspection?;
    constructor(entity: Entity, introspection: IntrospectionQuery);
    generateDetailPage(template: string): string;
}
