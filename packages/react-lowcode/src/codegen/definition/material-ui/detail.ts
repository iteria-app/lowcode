import { defineComponent } from '../../generation/react-components/react-component-helper'

export const muiCore = '@material-ui/core'
export const formik = 'formik'

export const MuiInputComponents = {
    textInput: defineComponent('TextInput', muiCore),
    button: defineComponent('Button', muiCore),
}

export const MuiFormikDetailComponents = {
    formik: defineComponent('Formik', formik),
    form: defineComponent('Form', formik),
    field: defineComponent('Field', formik),
}