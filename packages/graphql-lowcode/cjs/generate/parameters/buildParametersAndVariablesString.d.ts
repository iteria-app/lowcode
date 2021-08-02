import { Field, Argument } from '../types';
/**
 *
 * @param field Query/Mutation/Subscription root field
 * @param name Entity name that parameters are built for
 * @returns Formatted parameters and variables string
 */
export declare function buildParametersAndVariablesString(field: Field, name: string): {
    params: string;
    variables: string;
};
/**
 *
 * @param arg Query/Mutation/Subscription argument
 * @returns Formatted GraphQL variable name with special characters
 */
export declare function buildVariableString(arg: Argument): string;
