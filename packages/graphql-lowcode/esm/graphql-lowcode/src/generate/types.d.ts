export interface Type {
    name: null | string;
    kind?: string;
    [key: string]: any;
}
export interface Field {
    name: string;
    type: Type;
    kind?: string;
    args: Argument[];
    [key: string]: any;
}
export interface TypesObject {
    name: string;
    fields: Field[] | null;
    [key: string]: any;
}
export interface IntrospectionQuery {
    queryType?: {
        name: string;
    } | null;
    mutationType?: {
        name: string;
    } | null;
    subscriptionType?: {
        name: string;
    } | null;
    types: TypesObject[];
    [key: string]: any;
}
export interface Root {
    fields: Field[];
    kind: string;
    name?: string;
    [key: string]: any;
}
export interface EntityQuery {
    queryName: string;
    entityName: string;
    fields: Field[];
}
export interface Argument {
    name: string;
    [key: string]: any;
}
export interface Mutation {
    operation: string;
    type: string;
}
