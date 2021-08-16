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
exports.buildVariableString = exports.buildParametersAndVariablesString = void 0;
var hasuraUtils_1 = require("../hasura/hasuraUtils");
/**
 *
 * @param field Query/Mutation/Subscription root field
 * @param name Entity name that parameters are built for
 * @returns Formatted parameters and variables string
 */
function buildParametersAndVariablesString(field, name) {
    var queryParams = [];
    var variables = [];
    field.args.forEach(function (arg) {
        var _a;
        //if input fields are _set || object || objects user hasura specific logic to change names to entityName else jsut use arg.name
        var _b = (_a = hasuraUtils_1.changeInputFieldsNames(arg, name)) !== null && _a !== void 0 ? _a : { newParameter: arg.name + ": $" + arg.name, newVariable: "$" + arg.name + ": " + buildVariableString(arg) }, newParameter = _b.newParameter, newVariable = _b.newVariable;
        queryParams = __spreadArray(__spreadArray([], __read(queryParams)), [newParameter]);
        variables = __spreadArray(__spreadArray([], __read(variables)), [newVariable]);
    });
    return { params: queryParams.length ? "(" + queryParams.join(', ') + ")" : '', variables: variables.length ? "(" + variables.join(', ') + ")" : '' };
}
exports.buildParametersAndVariablesString = buildParametersAndVariablesString;
/**
 *
 * @param arg Query/Mutation/Subscription argument
 * @returns Formatted GraphQL variable name with special characters
 */
function buildVariableString(arg) {
    var typeArray = getOfTypeArray(arg).reverse();
    var variableString = '';
    typeArray.forEach(function (type) {
        if (type.kind === 'NON_NULL')
            variableString = variableString + "!";
        if (type.kind === 'LIST')
            variableString = "[" + variableString + "]";
        if (type.name)
            variableString = "" + type.name;
    });
    return variableString;
}
exports.buildVariableString = buildVariableString;
function getOfTypeArray(arg) {
    var ofTypeArray = [];
    var actualType = arg.type;
    while (actualType) {
        ofTypeArray = __spreadArray(__spreadArray([], __read(ofTypeArray)), [actualType]);
        actualType = actualType.ofType;
    }
    return ofTypeArray;
}
