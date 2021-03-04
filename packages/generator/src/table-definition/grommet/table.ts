import { defineComponent } from '../../table-generation/react-components/react-component-helper'

export const GrommetTableComponents = {
    table: defineComponent('Table', 'grommet'),
    row: defineComponent('TableRow', 'grommet'),
    cell: defineComponent('TableCell', 'grommet'),
    header: defineComponent('TableHeader', 'grommet'),
    body: defineComponent('TableBody', 'grommet'),
    footer: defineComponent('TableFooter', 'grommet')
}

export const GrommetDtTableComponents = {
    table: defineComponent('DataTable', 'grommet')
}
