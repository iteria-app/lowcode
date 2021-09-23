import { buildFragmentsQuery } from './fragments/buildFragmentsQuery';
import { getRootNames, getRoots } from './roots/roots';
import { buildParametersAndVariablesString } from './parameters/buildParametersAndVariablesString';
/**
 *
 * @param introspection Introspection JSON `data.__schema`
 * @param name Used to replace variable names in query/mutations variables
 * @param target (optional) GraphQL server name for which queries are built for, e.g. `hasura`
 * @returns Generated GraphQL queries and mutations with fragments
 */
export function generateGraphqlQueries(introspection, name) {
    const types = introspection.types;
    const rootNames = getRootNames(introspection);
    const [queryRoot, mutationRoot, subscriptionRoot] = getRoots(types, rootNames);
    const entities = getEntities([queryRoot, mutationRoot], types, 'SCALAR');
    const fragmentsQuery = buildFragmentsQuery(entities, types);
    const selectQuery = queryRoot ? buildSelectQuery(queryRoot, name) : '';
    const mutationQuery = mutationRoot ? buildMutationQuery(mutationRoot, name) : '';
    const queries = [selectQuery, mutationQuery, fragmentsQuery];
    const finalQuery = buildGraphqlQuery(queries);
    return finalQuery;
}
/**
 *
 * @param roots Introspection root types (Query, Mutation, Subscription)
 * @param types Introspection JSON `data.types`
 * @param filterOnlyFields Fields to be filtered e.g. `SCALAR` returns only entities with fields of type SCALAR
 * @returns Array of `EntityQuery`
 */
export function getEntities(roots, types, filterOnlyFields) {
    const entities = roots.map(root => {
        var _a;
        let rootEntities = [];
        if (root === null || root === void 0 ? void 0 : root.name) {
            for (const field of root.fields) {
                const queryName = field.name;
                const entityName = (_a = getNestedOfType(field).name) !== null && _a !== void 0 ? _a : '';
                let entityFields = getEntityFields(entityName, types);
                //if parameter fitlerOnlyFields then skip every root that does not return filtered type fields
                if (filterOnlyFields && !entityFields.some(field => getNestedOfType(field).kind === filterOnlyFields)) {
                    //remove it from root
                    root.fields = root.fields.filter(fieldToBeDelete => fieldToBeDelete !== field);
                    continue;
                }
                rootEntities = [...rootEntities, { queryName, entityName, fields: entityFields }];
            }
        }
        return rootEntities;
    });
    //array of arrays to one array
    return Array.prototype.concat.apply([], entities);
}
/**
 *
 * @param entityName Name of searched entity
 * @param types Introspection JSON `data.__schema.types`
 * @returns Entity fields if entity is found
 */
function getEntityFields(entityName, types) {
    const entity = types.find(type => type.name === entityName);
    if (entity && entity.fields)
        return entity.fields;
    return [];
}
/**
 *
 * @param field
 * @returns Deepest ofType object of field
 */
export function getNestedOfType(field) {
    var _a;
    let actualType = (_a = field.type) !== null && _a !== void 0 ? _a : field.ofType;
    while (actualType.ofType)
        actualType = actualType.ofType;
    if (actualType.name)
        return actualType;
    return { name: '', kind: '' };
}
/**
 *
 * @param queryRoot Query root node from Introspection
 * @param name Name of entity that queries are built for
 * @returns Formatted string with all usable Query root queries
 */
function buildSelectQuery(queryRoot, name) {
    let selectQueries = [];
    queryRoot.fields.forEach(query => {
        const fragmentName = `${query.name}_${getNestedOfType(query).name}`;
        const { params, variables } = buildParametersAndVariablesString(query, name);
        const newSelectQuery = `query ${query.name}${variables} {\n  ${query.name}${params} {\n    ...${fragmentName}\n  }\n}`;
        selectQueries = [...selectQueries, newSelectQuery];
    });
    return selectQueries.join('\n\n');
}
/**
 *
 * @param mutationRoot Mutation root node from Introspection
 * @param name Name of entity that queries are built for
 * @returns Formatted string with all usable Query root queries
 */
function buildMutationQuery(mutationRoot, name) {
    let mutationQueries = [];
    mutationRoot.fields.forEach(field => {
        const fragmentName = `${field.name}_${getNestedOfType(field).name}`;
        mutationQueries = [...mutationQueries, buildMutationString(field, fragmentName, name)];
    });
    return mutationQueries.join('\n\n');
}
/**
 *
 * @param field Mutation root field
 * @param fragmentName Name of inserted fragment
 * @param name Name of entity that mutation is built for
 * @returns
 */
function buildMutationString(field, fragmentName, name) {
    const { params, variables } = buildParametersAndVariablesString(field, name);
    return `mutation ${field.name}${variables} {\n  ${field.name}${params} {\n    ...${fragmentName}\n  }\n}`;
}
function buildGraphqlQuery(queries) {
    queries = queries.filter(query => query != '');
    return `${queries.join('\n\n')}`;
}
