import { EntityQuery, TypesObject } from '../types';
/**
 *
 * @param entities Entities for which are fragments build
 * @param types Introspection JSON `data.__schema.types`
 * @param target (optional) GraphQL server name for which fragments are built for, e.g. `hasura`
 * @returns Formatted string of fragments with entity fields
 */
export declare function buildFragmentsQuery(entities: EntityQuery[], types: TypesObject[]): string;
