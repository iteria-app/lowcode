"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryNames = exports.getRoots = exports.getRootNames = void 0;
/**
 * @param introspection Introspection JSON `data`
 * @returns Query, mutation and subscription root names or undefined if no root is defined.
 */
function getRootNames(introspection) {
    var _a, _b, _c;
    var queryTypeName = (_a = introspection.queryType) === null || _a === void 0 ? void 0 : _a.name;
    var mutationTypeName = (_b = introspection.mutationType) === null || _b === void 0 ? void 0 : _b.name;
    var subscriptionTypeName = (_c = introspection.subscriptionType) === null || _c === void 0 ? void 0 : _c.name;
    return [
        { type: 'query', name: queryTypeName },
        { type: 'mutation', name: mutationTypeName },
        { type: 'subscription', name: subscriptionTypeName }
    ];
}
exports.getRootNames = getRootNames;
/**
 *
 * @param types Introspection JSON `data.types`
 * @returns Array of root type objects `[query, mutation, subscription]`
 */
function getRoots(types, rootNames) {
    var _a = __read(rootNames, 3), query = _a[0], mutation = _a[1], subscription = _a[2];
    var roots = types.filter(function (type) { return type.fields && rootNames.some(function (root) { return type.name === root.name; }); }).map(function (filteredType) {
        var _a;
        return { fields: (_a = filteredType.fields) !== null && _a !== void 0 ? _a : [], kind: filteredType.kind, name: filteredType.name };
    });
    var queryRoot = roots.find(function (root) { return root.name === query.name; });
    var mutationRoot = roots.find(function (root) { return root.name === mutation.name; });
    var subscriptionRoot = roots.find(function (root) { return root.name === subscription.name; });
    return [queryRoot, mutationRoot, subscriptionRoot];
}
exports.getRoots = getRoots;
function getQueryNames(introspection, entityName) {
    var _a;
    var rootNames = getRootNames(introspection);
    var _b = __read(getRoots(introspection.types, rootNames), 3), queryRoot = _b[0], mutationRoot = _b[1], subscriptionRoot = _b[2];
    var listTypeQuery = (_a = queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields.find(function (field) { return isListType(field); })) !== null && _a !== void 0 ? _a : queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields[0]; //TODO zmenit
    var detailTypeQuery = queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields.find(function (field) { var _a; return (_a = isObjectType(field, entityName)) !== null && _a !== void 0 ? _a : queryRoot === null || queryRoot === void 0 ? void 0 : queryRoot.fields[0]; });
    //TODO update, insert etc...
    return {
        listQueryName: listTypeQuery === null || listTypeQuery === void 0 ? void 0 : listTypeQuery.name,
        detailQueryName: detailTypeQuery === null || detailTypeQuery === void 0 ? void 0 : detailTypeQuery.name
    };
}
exports.getQueryNames = getQueryNames;
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
