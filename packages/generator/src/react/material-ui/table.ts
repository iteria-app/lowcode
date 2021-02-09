import { defineComponent } from '../component'


const muiCore = '@material-ui/core/'
const components = {
    table: defineComponent('Table', muiCore),
    row: defineComponent('TableRow', muiCore),
    cell: defineComponent('TableCell', muiCore),
    header: defineComponent('TableHeader', muiCore),
    body: defineComponent('TableBody', muiCore),
    footer: defineComponent('TableFooter', muiCore)
}

export default components
