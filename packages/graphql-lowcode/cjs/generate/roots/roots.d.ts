import { IntrospectionQuery, TypesObject, Root } from '../types';
/**
 * @param introspection Introspection JSON `data`
 * @returns Query, mutation and subscription root names or undefined if no root is defined.
 */
export declare function getRootNames(introspection: IntrospectionQuery): {
    type: string;
    name?: string;
}[];
/**
 *
 * @param types Introspection JSON `data.types`
 * @returns Array of root type objects `[query, mutation, subscription]`
 */
export declare function getRoots(types: TypesObject[], rootNames: {
    type: string;
    name?: string;
}[]): (Root | undefined)[];
export declare function getQueryNames(introspection: IntrospectionQuery, entityName: string): {
    listQueryName: string | undefined;
    detailQueryName: string | undefined;
};
