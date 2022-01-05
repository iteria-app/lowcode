import { getNestedOfType } from '../generateGraphqlQueries';
import { buildVariableString } from '../parameters/buildParametersAndVariablesString';
export function getHasuraInputFields(args) {
    const containsWhere = args.some(argument => argument.name === 'where');
    const containsId = args.some(argument => argument.name === 'id');
    const containsObject = args.some(argument => argument.name === 'object');
    const containsObjects = args.some(argument => argument.name === 'objects');
    const containsSet = args.some(argument => argument.name === '_set');
    const containsPKColumns = args.some(argument => argument.name === 'pk_columns');
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
export function buildReturningString(types, returningType) {
    var _a;
    const type = types.find(type => type.name === returningType);
    const scalarFields = (_a = type === null || type === void 0 ? void 0 : type.fields) === null || _a === void 0 ? void 0 : _a.filter(field => getNestedOfType(field).kind === 'SCALAR');
    const returningFields = scalarFields === null || scalarFields === void 0 ? void 0 : scalarFields.map(field => field.name);
    if (returningFields)
        return `returning {\n    ${returningFields.join('\n    ')}\n  }`;
    return '';
}
/**
 *
 * @param returningField Entity field
 * @returns Deepest ofType object from entity field
 */
export function getReturningType(field) {
    var _a;
    let actualType = field.type;
    while (actualType.ofType) {
        actualType = actualType.ofType;
    }
    return (_a = actualType.name) !== null && _a !== void 0 ? _a : '';
}
export function changeInputFieldsNames(arg, entityName) {
    const variableTypeString = buildVariableString(arg);
    if (arg.name === '_set')
        return { newParameter: `${arg.name}: $${entityName != '' ? entityName : '_set'}`, newVariable: `$${entityName != '' ? entityName : '_set'}: ${variableTypeString}` };
    else if (arg.name === 'object')
        return { newParameter: `${arg.name}: $${entityName != '' ? entityName : 'object'}`, newVariable: `$${entityName != '' ? entityName : 'object'}: ${variableTypeString}` };
    else if (arg.name === 'objects')
        return { newParameter: `${arg.name}: $${entityName != '' ? entityName : 'objects'}`, newVariable: `$${entityName != '' ? entityName : 'objects'}: ${variableTypeString}` };
}
