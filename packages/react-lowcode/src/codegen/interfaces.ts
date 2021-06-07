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