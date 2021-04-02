import { defineComponent } from '../../generation/react-components/react-component-helper'

export const muiCore = '@material-ui/core'
export const formik = 'formik'

export const MuiDetailComponents = {
    textInput: defineComponent('TextInput', muiCore),
    checkBox: defineComponent('CheckBox', muiCore),
    button: defineComponent('Button', muiCore),

    formik: defineComponent('Formik', formik),
    form: defineComponent('Form', formik),
    field: defineComponent('Field', formik),
}