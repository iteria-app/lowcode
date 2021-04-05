import { Component } from '../generation/react-components/react-component-helper'


export interface DetailComponentDefinitionBase {
    readonly textInput: Component
    readonly button: Component

    readonly formik: Component
    readonly form: Component
    readonly field: Component
}

