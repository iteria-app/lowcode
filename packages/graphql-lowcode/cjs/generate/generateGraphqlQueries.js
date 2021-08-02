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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNestedOfType = exports.generateGraphqlQueries = void 0;
var buildFragmentsQuery_1 = require("./fragments/buildFragmentsQuery");
var roots_1 = require("./roots/roots");
var buildParametersAndVariablesString_1 = require("./parameters/buildParametersAndVariablesString");
/**
 *
 * @param introspection Introspection JSON `data.__schema`
 * @param name Used to replace variable names in query/mutations variables
 * @param target (optional) GraphQL server name for which queries are built for, e.g. `hasura`
 * @returns Generated GraphQL queries and mutations with fragments
 */
function generateGraphqlQueries(introspection, name) {
    var types = introspection.types;
    var rootNames = roots_1.getRootNames(introspection);
    var _a = __read(roots_1.getRoots(types, rootNames), 3), queryRoot = _a[0], mutationRoot = _a[1], subscriptionRoot = _a[2];
    var entities = getEntities([queryRoot, mutationRoot], types, 'SCALAR');
    var fragmentsQuery = buildFragmentsQuery_1.buildFragmentsQuery(entities, types);
    var selectQuery = queryRoot ? buildSelectQuery(queryRoot, name) : '';
    var mutationQuery = mutationRoot ? buildMutationQuery(mutationRoot, name) : '';
    var queries = [selectQuery, mutationQuery, fragmentsQuery];
    var finalQuery = buildGraphqlQuery(queries);
    return finalQuery;
}
exports.generateGraphqlQueries = generateGraphqlQueries;
/**
 *
 * @param roots Introspection root types (Query, Mutation, Subscription)
 * @param types Introspection JSON `data.types`
 * @param filterOnlyFields Fields to be filtered e.g. `SCALAR` returns only entities with fields of type SCALAR
 * @returns Array of `EntityQuery`
 */
function getEntities(roots, types, filterOnlyFields) {
    var entities = roots.map(function (root) {
        var e_1, _a;
        var _b;
        var rootEntities = [];
        if (root === null || root === void 0 ? void 0 : root.name) {
            var _loop_1 = function (field) {
                var queryName = field.name;
                var entityName = (_b = getNestedOfType(field).name) !== null && _b !== void 0 ? _b : '';
                var entityFields = getEntityFields(entityName, types);
                //if parameter fitlerOnlyFields then skip every root that does not return filtered type fields
                if (filterOnlyFields && !entityFields.some(function (field) { return getNestedOfType(field).kind === filterOnlyFields; })) {
                    //remove it from root
                    root.fields = root.fields.filter(function (fieldToBeDelete) { return fieldToBeDelete !== field; });
                    return "continue";
                }
                rootEntities = __spreadArray(__spreadArray([], __read(rootEntities)), [{ queryName: queryName, entityName: entityName, fields: entityFields }]);
            };
            try {
                for (var _c = __values(root.fields), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var field = _d.value;
                    _loop_1(field);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
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
    var entity = types.find(function (type) { return type.name === entityName; });
    if (entity && entity.fields)
        return entity.fields;
    return [];
}
/**
 *
 * @param field
 * @returns Deepest ofType object of field
 */
function getNestedOfType(field) {
    var actualType = field.type;
    while (actualType.ofType)
        actualType = actualType.ofType;
    if (actualType.name)
        return actualType;
    return { name: '', kind: '' };
}
exports.getNestedOfType = getNestedOfType;
/**
 *
 * @param queryRoot Query root node from Introspection
 * @param name Name of entity that queries are built for
 * @returns Formatted string with all usable Query root queries
 */
function buildSelectQuery(queryRoot, name) {
    var selectQueries = [];
    queryRoot.fields.forEach(function (query) {
        var fragmentName = query.name + "_" + getNestedOfType(query).name;
        var _a = buildParametersAndVariablesString_1.buildParametersAndVariablesString(query, name), params = _a.params, variables = _a.variables;
        var newSelectQuery = "query " + query.name + variables + " {\n  " + query.name + params + " {\n    ..." + fragmentName + "\n  }\n}";
        selectQueries = __spreadArray(__spreadArray([], __read(selectQueries)), [newSelectQuery]);
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
    var mutationQueries = [];
    mutationRoot.fields.forEach(function (field) {
        var fragmentName = field.name + "_" + getNestedOfType(field).name;
        mutationQueries = __spreadArray(__spreadArray([], __read(mutationQueries)), [buildMutationString(field, fragmentName, name)]);
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
    var _a = buildParametersAndVariablesString_1.buildParametersAndVariablesString(field, name), params = _a.params, variables = _a.variables;
    return "mutation " + field.name + variables + " {\n  " + field.name + params + " {\n    ..." + fragmentName + "\n  }\n}";
}
function buildGraphqlQuery(queries) {
    queries = queries.filter(function (query) { return query != ''; });
    return "" + queries.join('\n\n');
}
