import ts from "typescript";
import { Entity, Property } from "../entity";
export declare function createFormikHook(entity: Entity, dataPropertyName: string): ts.VariableStatement;
export declare function tryCreateInitialValueForProperty(property: Property, dataPropertyName: string): ts.PropertyAssignment | undefined;
