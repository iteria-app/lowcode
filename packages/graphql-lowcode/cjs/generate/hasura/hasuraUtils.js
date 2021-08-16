"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeInputFieldsNames = exports.getReturningType = exports.buildReturningString = exports.getHasuraInputFields = void 0;
var generateGraphqlQueries_1 = require("../generateGraphqlQueries");
var buildParametersAndVariablesString_1 = require("../parameters/buildParametersAndVariablesString");
function getHasuraInputFields(args) {
    var containsWhere = args.some(function (argument) { return argument.name === 'where'; });
    var containsId = args.some(function (argument) { return argument.name === 'id'; });
    var containsObject = args.some(function (argument) { return argument.name === 'object'; });
    var containsObjects = args.some(function (argument) { return argument.name === 'objects'; });
    var containsSet = args.some(function (argument) { return argument.name === '_set'; });
    var containsPKColumns = args.some(function (argument) { return argument.name === 'pk_columns'; });
    if (containsObjects)
        return ['objects']; //insert many
    if (containsObject)
        return ['object']; //insert one
    if (containsSet && containsWhere)
        return ['where', '_set']; //update many
    if (containsSet && containsPKColumns)
        return ['_set', 'pk_columns']; //update one
    if (containsWhere)
        return ['where']; //delete many
    return ['id']; //delete one
}
exports.getHasuraInputFields = getHasuraInputFields;
function buildReturningString(types, returningType) {
    var _a;
    var type = types.find(function (type) { return type.name === returningType; });
    var scalarFields = (_a = type === null || type === void 0 ? void 0 : type.fields) === null || _a === void 0 ? void 0 : _a.filter(function (field) { return generateGraphqlQueries_1.getNestedOfType(field).kind === 'SCALAR'; });
    var returningFields = scalarFields === null || scalarFields === void 0 ? void 0 : scalarFields.map(function (field) { return field.name; });
    if (returningFields)
        return "returning {\n    " + returningFields.join('\n    ') + "\n  }";
    return '';
}
exports.buildReturningString = buildReturningString;
/**
 *
 * @param returningField Entity field
 * @returns Deepest ofType object from entity field
 */
function getReturningType(field) {
    var _a;
    var actualType = field.type;
    while (actualType.ofType) {
        actualType = actualType.ofType;
    }
    return (_a = actualType.name) !== null && _a !== void 0 ? _a : '';
}
exports.getReturningType = getReturningType;
function changeInputFieldsNames(arg, entityName) {
    var variableTypeString = buildParametersAndVariablesString_1.buildVariableString(arg);
    if (arg.name === '_set')
        return { newParameter: arg.name + ": $" + (entityName != '' ? entityName : '_set'), newVariable: "$" + (entityName != '' ? entityName : '_set') + ": " + variableTypeString };
    else if (arg.name === 'object')
        return { newParameter: arg.name + ": $" + (entityName != '' ? entityName : 'object'), newVariable: "$" + (entityName != '' ? entityName : 'object') + ": " + variableTypeString };
    else if (arg.name === 'objects')
        return { newParameter: arg.name + ": $" + (entityName != '' ? entityName : 'objects'), newVariable: "$" + (entityName != '' ? entityName : 'objects') + ": " + variableTypeString };
}
exports.changeInputFieldsNames = changeInputFieldsNames;
