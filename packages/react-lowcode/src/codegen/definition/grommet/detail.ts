import { defineComponent } from '../../generation/react-components/react-component-helper'

export const Grommet = 'grommet'
export const formik = 'formik'

export const GrommetInputComponents = {
    textInput: defineComponent('TextInput', Grommet),
    checkBox: defineComponent('CheckBox', Grommet),
    button: defineComponent('Button', Grommet),
}

export const GrommetFormikDetailComponents = {
    formik: defineComponent('Formik', formik),
    form: defineComponent('Form', formik),
    field: defineComponent('Field', formik),
}