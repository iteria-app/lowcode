import { IntrospectionQuery } from "@iteria-app/graphql-lowcode/esm/generate";
export interface Entity {
    getName(): string;
    readonly properties: Property[];
}
export interface Property {
    getName(): string;
    getType(): string;
}
export declare function getProperties(entity: Entity): Property[];
export declare function createEntityFromIntrospection(introspection: IntrospectionQuery, entityName: string): Entity | undefined;
