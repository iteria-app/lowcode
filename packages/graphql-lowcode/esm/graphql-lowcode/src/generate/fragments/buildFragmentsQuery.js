import { getReturningType, buildReturningString } from '../hasura/hasuraUtils';
import { getNestedOfType } from '../generateGraphqlQueries';
/**
 *
 * @param entities Entities for which are fragments build
 * @param types Introspection JSON `data.__schema.types`
 * @param target (optional) GraphQL server name for which fragments are built for, e.g. `hasura`
 * @returns Formatted string of fragments with entity fields
 */
export function buildFragmentsQuery(entities, types) {
    let fragmentsStrings = [];
    entities.forEach(entity => {
        let fragmentFields = [];
        entity.fields.forEach(field => {
            //HASURA specific logic: if mutation root has returning type, build returning object with fields to be inserted into fragment fields
            if (field.name === 'returning') {
                const returningType = getReturningType(field);
                const returningString = buildReturningString(types, returningType);
                fragmentFields = [...fragmentFields, returningString];
            }
            if (getNestedOfType(field).kind === 'SCALAR')
                fragmentFields = [...fragmentFields, field.name];
        });
        const newFragmentString = `fragment ${entity.queryName}_${entity.entityName} on ${entity.entityName} {\n  ${fragmentFields.join('\n  ')}\n}`;
        if (fragmentFields.length)
            fragmentsStrings = [...fragmentsStrings, newFragmentString];
    });
    return fragmentsStrings.join('\n\n');
}
