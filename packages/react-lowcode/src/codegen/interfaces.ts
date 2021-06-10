import { SourceLineCol } from "../ast";
import { UiFramework } from "./definition/context-types";

export interface CodegenOptions {
    // whitelisted entity names
    readonly names: string[]
    // default is MaterialUI
    uiFramework?: UiFramework
}

export interface InsertOptions {
    property: string
    index?: number
}

export interface DeleteOptions {
    index: number
}

export interface ColumnSourcePositionOptions{
    index: number
}

export interface ColumnSourcePositionResult {
    columnPosition: SourceLineCol,
    valuePosition?: SourceLineCol,
    headerPosition?: SourceLineCol
}

export interface WidgetProperty {
    name: string,
    value: string
}

export interface WidgetProperties {
    properties: WidgetProperty[]
}