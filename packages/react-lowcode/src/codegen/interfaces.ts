import { SourceLineCol } from "../ast";
import { UiFramework } from "./definition/context-types";

export interface CodegenOptions {
    // whitelisted entity names
    readonly names: string[]
    // default is MaterialUI
    uiFramework?: UiFramework
}

export interface InsertOptions {
    entity: string
    property: string
    index?: number
}

export interface DeleteOptions {
    index: number
}

export interface ColumnSourcePositionOptions{
    index: number
}

export interface SourceLineColLen extends SourceLineCol {
    length: number;
}

export interface ColumnSourcePositionResult {
    columnPosition: SourceLineColLen,
    valuePosition?: SourceLineColLen,
    headerPosition?: SourceLineColLen
}

export interface WidgetProperty {
    name: string,
    value: string
}

export interface WidgetProperties {
    properties: WidgetProperty[]
}