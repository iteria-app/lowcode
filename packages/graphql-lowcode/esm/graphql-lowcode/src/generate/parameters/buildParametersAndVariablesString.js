import { changeInputFieldsNames } from '../hasura/hasuraUtils';
/**
 *
 * @param field Query/Mutation/Subscription root field
 * @param name Entity name that parameters are built for
 * @returns Formatted parameters and variables string
 */
export function buildParametersAndVariablesString(field, name) {
    let queryParams = [];
    let variables = [];
    field.args.forEach((arg) => {
        var _a;
        //if input fields are _set || object || objects user hasura specific logic to change names to entityName else jsut use arg.name
        const { newParameter, newVariable } = (_a = changeInputFieldsNames(arg, name)) !== null && _a !== void 0 ? _a : { newParameter: `${arg.name}: $${arg.name}`, newVariable: `$${arg.name}: ${buildVariableString(arg)}` };
        queryParams = [...queryParams, newParameter];
        variables = [...variables, newVariable];
    });
    return { params: queryParams.length ? `(${queryParams.join(', ')})` : '', variables: variables.length ? `(${variables.join(', ')})` : '' };
}
/**
 *
 * @param arg Query/Mutation/Subscription argument
 * @returns Formatted GraphQL variable name with special characters
 */
export function buildVariableString(arg) {
    const typeArray = getOfTypeArray(arg).reverse();
    let variableString = '';
    typeArray.forEach(type => {
        if (type.kind === 'NON_NULL')
            variableString = `${variableString}!`;
        if (type.kind === 'LIST')
            variableString = `[${variableString}]`;
        if (type.name)
            variableString = `${type.name}`;
    });
    return variableString;
}
function getOfTypeArray(arg) {
    let ofTypeArray = [];
    let actualType = arg.type;
    while (actualType) {
        ofTypeArray = [...ofTypeArray, actualType];
        actualType = actualType.ofType;
    }
    return ofTypeArray;
}
