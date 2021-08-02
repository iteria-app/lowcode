import { IntrospectionQuery, Field, Argument, Type } from './types';
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
 * @param field
 * @returns Deepest ofType object of field
 */
export declare function getNestedOfType(field: Field | Argument): Type;
