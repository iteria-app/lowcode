"use strict";
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
exports.getEntity = exports.generateGraphqlFile = void 0;
var generateGraphqlQueries_1 = require("./generateGraphqlQueries");
var roots_1 = require("./roots/roots");
/**
 *
 * @param introspection Introspection JSON `data.__schema`
 * @param name Entity name
 * @param target GraphQL server name that queries are built for
 * @returns
 */
function generateGraphqlFile(introspection, name) {
    var rootNames = roots_1.getRootNames(introspection);
    var roots = roots_1.getRoots(introspection.types, rootNames);
    var modifiedRoots = filterRootQueries(roots, introspection.types, name);
    var modifiedIntrospection = replaceRootFields(modifiedRoots, introspection);
    var generatedQueries = generateGraphqlQueries_1.generateGraphqlQueries(modifiedIntrospection, name);
    return generatedQueries;
}
exports.generateGraphqlFile = generateGraphqlFile;
function replaceRootFields(roots, introspection) {
    var e_1, _a, e_2, _b;
    try {
        for (var roots_2 = __values(roots), roots_2_1 = roots_2.next(); !roots_2_1.done; roots_2_1 = roots_2.next()) {
            var root = roots_2_1.value;
            if (root) {
                try {
                    for (var _c = (e_2 = void 0, __values(introspection.types)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var type = _d.value;
                        if (type.name === root.name)
                            type.fields = root.fields;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (roots_2_1 && !roots_2_1.done && (_a = roots_2.return)) _a.call(roots_2);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return introspection;
}
/**
 *
 * @param roots Query, Mutation, Subscription root nodes
 * @param types Introspection JSON `data.__schema.types`
 * @param entityName Name of filtered entity
 * @returns Filtered roots
 */
function filterRootQueries(roots, types, entityName) {
    var e_3, _a;
    var modifiedRoots = [];
    try {
        for (var roots_3 = __values(roots), roots_3_1 = roots_3.next(); !roots_3_1.done; roots_3_1 = roots_3.next()) {
            var root = roots_3_1.value;
            if (root) {
                root.fields = root.fields.filter(function (field) { return isReturningEntity(field, types, entityName); });
            }
            modifiedRoots = __spreadArray(__spreadArray([], __read(modifiedRoots)), [root]);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (roots_3_1 && !roots_3_1.done && (_a = roots_3.return)) _a.call(roots_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return modifiedRoots;
}
/**
 * Recursively goes through every query/mutation root fields and finds if they are returning given entity
 * @param field Root field
 * @param allTypes Types object from Introspection
 * @param entityName Name of entity
 * @returns True/false whether field is returning given entity
 */
function isReturningEntity(field, allTypes, entityName) {
    var _a;
    var ofType = isOfType(field, entityName);
    if (ofType === true)
        return true;
    if (ofType === 'leaf')
        return false;
    var nestedOfTypeName = generateGraphqlQueries_1.getNestedOfType(field).name;
    allTypes = allTypes.filter(function (type) { return type.name === nestedOfTypeName; });
    var nestedType = allTypes.find(function (type) { return type.name === nestedOfTypeName; });
    return ((_a = nestedType === null || nestedType === void 0 ? void 0 : nestedType.fields) === null || _a === void 0 ? void 0 : _a.some(function (nestedField) { return isReturningEntity(nestedField, allTypes, entityName); })) ? true : false;
}
/**
 * Checks whether the field is of type given in parameter entity name
 * @returns True/false whether field is of given type
 */
function isOfType(field, entityName) {
    var actualType = field.type;
    while (actualType.ofType)
        actualType = actualType.ofType;
    if (actualType.name && actualType.name.toLowerCase() === entityName.toLowerCase())
        return true;
    if (actualType.kind === 'SCALAR')
        return 'leaf';
    return false;
}
function getEntity(types, entityName) {
    return types.find(function (type) { return type.name === entityName; });
}
exports.getEntity = getEntity;
