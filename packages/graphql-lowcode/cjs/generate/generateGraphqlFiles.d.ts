import { IntrospectionQuery, TypesObject } from './types';
/**
 *
 * @param introspection Introspection JSON `data.__schema`
 * @param name Entity name
 * @param target GraphQL server name that queries are built for
 * @returns
 */
export declare function generateGraphqlFile(introspection: IntrospectionQuery, name: string): string;
export declare function getEntity(types: TypesObject[], entityName: string): TypesObject | undefined;
