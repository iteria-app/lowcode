import { Hook } from "../../ast/hooks";
import ts from "typescript";
export declare function defineHook(defaultInstanceName: string, hookName: string, packageName: string): Hook;
export declare function createUseQueryExpression(hookName: string, variables?: string[]): ts.CallExpression;
export declare const isUseQueryHook: (node: ts.Node, name: string) => boolean | undefined;
