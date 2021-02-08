import { defineComponent } from '../component'

const components = {
    table: defineComponent('Table', 'grommet'),
    row: defineComponent('TableRow', 'grommet'),
    cell: defineComponent('TableCell', 'grommet'),
    header: defineComponent('TableHeader', 'grommet'),
    body: defineComponent('TableBody', 'grommet'),
    footer: defineComponent('TableFooter', 'grommet')
}

export default components
