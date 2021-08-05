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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFragmentsQuery = void 0;
var hasuraUtils_1 = require("../hasura/hasuraUtils");
var generateGraphqlQueries_1 = require("../generateGraphqlQueries");
/**
 *
 * @param entities Entities for which are fragments build
 * @param types Introspection JSON `data.__schema.types`
 * @param target (optional) GraphQL server name for which fragments are built for, e.g. `hasura`
 * @returns Formatted string of fragments with entity fields
 */
function buildFragmentsQuery(entities, types) {
    var fragmentsStrings = [];
    entities.forEach(function (entity) {
        var fragmentFields = [];
        entity.fields.forEach(function (field) {
            //HASURA specific logic: if mutation root has returning type, build returning object with fields to be inserted into fragment fields
            if (field.name === 'returning') {
                var returningType = hasuraUtils_1.getReturningType(field);
                var returningString = hasuraUtils_1.buildReturningString(types, returningType);
                fragmentFields = __spreadArray(__spreadArray([], __read(fragmentFields)), [returningString]);
            }
            if (generateGraphqlQueries_1.getNestedOfType(field).kind === 'SCALAR')
                fragmentFields = __spreadArray(__spreadArray([], __read(fragmentFields)), [field.name]);
        });
        var newFragmentString = "fragment " + entity.queryName + "_" + entity.entityName + " on " + entity.entityName + " {\n  " + fragmentFields.join('\n  ') + "\n}";
        if (fragmentFields.length)
            fragmentsStrings = __spreadArray(__spreadArray([], __read(fragmentsStrings)), [newFragmentString]);
    });
    return fragmentsStrings.join('\n\n');
}
exports.buildFragmentsQuery = buildFragmentsQuery;
