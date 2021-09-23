import { defineComponent } from '../../generation/react-components/react-component-helper';
export const muiCore = '@material-ui/core';
export const muiDataGrid = '@material-ui/data-grid';
export const MuiTableComponents = {
    table: defineComponent('Table', muiCore),
    row: defineComponent('TableRow', muiCore),
    cell: defineComponent('TableCell', muiCore),
    header: defineComponent('TableHead', muiCore),
    body: defineComponent('TableBody', muiCore),
    footer: defineComponent('TableFooter', muiCore)
};
export const MuiDtTableComponents = {
    table: defineComponent('DataGrid', muiDataGrid),
    gridColParams: defineComponent('GridColParams', muiDataGrid)
};
