/**
 * @param introspection Introspection JSON `data`
 * @returns Query, mutation and subscription root names or undefined if no root is defined.
 */
export function getRootNames(introspection) {
    var _a, _b, _c;
    const queryTypeName = (_a = introspection.queryType) === null || _a === void 0 ? void 0 : _a.name;
    const mutationTypeName = (_b = introspection.mutationType) === null || _b === void 0 ? void 0 : _b.name;
    const subscriptionTypeName = (_c = introspection.subscriptionType) === null || _c === void 0 ? void 0 : _c.name;
    return [
        { type: 'query', name: queryTypeName },
        { type: 'mutation', name: mutationTypeName },
        { type: 'subscription', name: subscriptionTypeName }
    ];
}
/**
 *
 * @param types Introspection JSON `data.types`
 * @returns Array of root type objects `[query, mutation, subscription]`
 */
export function getRoots(types, rootNames) {
    const [query, mutation, subscription] = rootNames;
    const roots = types.filter(type => type.fields && rootNames.some(root => type.name === root.name)).map(filteredType => {
        var _a;
        return { fields: (_a = filteredType.fields) !== null && _a !== void 0 ? _a : [], kind: filteredType.kind, name: filteredType.name };
    });
    const queryRoot = roots.find(root => root.name === query.name);
    const mutationRoot = roots.find(root => root.name === mutation.name);
    const subscriptionRoot = roots.find(root => root.name === subscription.name);
    return [queryRoot, mutationRoot, subscriptionRoot];
}
export function getQueryNames(introspection, entityName) {
    var _a;
    const rootNames = getRootNames(introspection);
    const [queryRoot, mutationRoot, subscriptionRoot] = getRoots(introspection.types, rootNames);
    //looks for list type query that includes entityName else picks first listTypeQuery
    const listTypeQuery = (_a = queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields.filter(field => isListType(field)).find(field => field.name.toLowerCase().indexOf(entityName) >= 0)) !== null && _a !== void 0 ? _a : queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields[0];
    const detailTypeQuery = queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields.find(field => { var _a; return (_a = isObjectType(field, entityName)) !== null && _a !== void 0 ? _a : queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields[0]; });
    //TODO update, insert etc...
    return {
        listQueryName: listTypeQuery === null || listTypeQuery === void 0 ? void 0 : listTypeQuery.name,
        detailQueryName: detailTypeQuery === null || detailTypeQuery === void 0 ? void 0 : detailTypeQuery.name
    };
}
function isListType(typeField) {
    for (typeField = typeField.type; typeField.ofType; typeField = typeField.ofType) {
        if (typeField.kind === 'LIST')
            return true;
    }
    return false;
}
function isObjectType(typeField, entityName) {
    for (typeField = typeField.type; typeField.ofType; typeField = typeField.ofType) {
        if (typeField.kind === 'OBJECT' && typeField.name === entityName)
            return true;
        if (typeField.kind !== 'NON_NULL')
            return false;
    }
    return false;
}
