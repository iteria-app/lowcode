import { Component } from '../table-generation/react-components/react-component-helper'

export interface TableComponentDefinitionBase {
    readonly table: Component
}

export interface TableComponentDefinition extends TableComponentDefinitionBase{
    readonly row: Component,
    readonly cell: Component,
    readonly header: Component,
    readonly body: Component,
    readonly footer: Component
}