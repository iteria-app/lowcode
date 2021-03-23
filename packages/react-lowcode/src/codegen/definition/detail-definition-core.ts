import { Component } from '../generation/react-components/react-component-helper'

export interface InputComponentDefinitionBase {
    readonly textInput: Component
    readonly button: Component
}

export interface FormikComponentDefinitionBase {
    readonly formik: Component
    readonly form: Component
    readonly field: Component
}