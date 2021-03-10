import { defineComponent } from '../../generation/react-components/react-component-helper'

const muiCore = '@material-ui/data-grid/'
export const MuiTableComponents = {
    table: defineComponent('Table', muiCore),
    row: defineComponent('TableRow', muiCore),
    cell: defineComponent('TableCell', muiCore),
    header: defineComponent('TableHeader', muiCore),
    body: defineComponent('TableBody', muiCore),
    footer: defineComponent('TableFooter', muiCore)
}

export const MuiDtTableComponents = {
    table: defineComponent('DataGrid', muiCore)
}
