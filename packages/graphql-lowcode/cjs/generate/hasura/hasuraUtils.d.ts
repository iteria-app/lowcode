import { Argument, TypesObject, Field } from '../types';
export declare function getHasuraInputFields(args: Argument[]): String[];
export declare function buildReturningString(types: TypesObject[], returningType: string): string;
/**
 *
 * @param returningField Entity field
 * @returns Deepest ofType object from entity field
 */
export declare function getReturningType(field: Field): string;
export declare function changeInputFieldsNames(arg: {
    name: string;
}, entityName: string): {
    newParameter: string;
    newVariable: string;
} | undefined;
