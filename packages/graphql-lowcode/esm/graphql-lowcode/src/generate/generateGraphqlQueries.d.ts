import { IntrospectionQuery, Field, TypesObject, EntityQuery, Argument, Root, Type } from './types';
/**
 *
 * @param introspection Introspection JSON `data.__schema`
 * @param name Used to replace variable names in query/mutations variables
 * @param target (optional) GraphQL server name for which queries are built for, e.g. `hasura`
 * @returns Generated GraphQL queries and mutations with fragments
 */
export declare function generateGraphqlQueries(introspection: IntrospectionQuery, name: string): string;
/**
 *
 * @param roots Introspection root types (Query, Mutation, Subscription)
 * @param types Introspection JSON `data.types`
 * @param filterOnlyFields Fields to be filtered e.g. `SCALAR` returns only entities with fields of type SCALAR
 * @returns Array of `EntityQuery`
 */
export declare function getEntities(roots: (Root | undefined)[], types: TypesObject[], filterOnlyFields?: string): EntityQuery[];
/**
 *
 * @param field
 * @returns Deepest ofType object of field
 */
export declare function getNestedOfType(field: Field | Argument): Type;
