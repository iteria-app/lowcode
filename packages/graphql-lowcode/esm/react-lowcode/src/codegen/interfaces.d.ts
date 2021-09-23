import ts from "typescript";
import { SourceLineCol } from "../ast";
import { HookImport } from "../ast/hooks";
import { TagImport } from "../ast/tags";
import { TableType, UiFramework } from "./definition/context-types";
export interface CodegenOptions {
    readonly names: string[];
    pageListTemplate: string;
    uiFramework?: UiFramework;
    tableType?: TableType;
    componentStoragePath?: string;
    generatedFolderPath?: string;
    routeDefinitionFilePath?: string;
    menuDefinitionFilePath?: string;
    detailPageTemplate: string;
}
export interface InsertOptions {
    entityName: string;
    property: string;
    index?: number;
}
export interface DeleteOptions {
    index: number;
}
export interface ColumnSourcePositionOptions {
    index: number;
}
export interface SourceLineColLen extends SourceLineCol {
    length: number;
}
export interface ColumnSourcePositionResult {
    columnPosition: SourceLineColLen;
    valuePosition?: SourceLineColLen;
    headerPosition?: SourceLineColLen;
}
export interface WidgetProperty {
    name: string;
    value: string;
    type: WidgetPropertyValue;
}
export interface WidgetProperties {
    properties: WidgetProperty[];
}
export declare enum WidgetPropertyValue {
    "EXPRESSION" = "EXPRESSION",
    "STRING_LITERAL" = "STRING_LITERAL"
}
interface ThemeCodegen {
    providerTag(...children: ts.JsxChild[]): any;
}
interface IntlCodegen {
    providerTag(...children: ts.JsxChild[]): any;
}
export interface AppGenerators {
    newSourceFileContext(path: string): JsxFileContext;
    theme: ThemeCodegen;
    intl: IntlCodegen;
}
export declare class JsxFileContext {
    uniqueImports(): any[];
    useHook(hook: HookImport, ...params: []): any;
    tag(tag: TagImport, ...children: ts.JsxChild[]): any;
    returnFragment(...children: ts.JsxChild[]): ts.Statement | null;
}
export {};
