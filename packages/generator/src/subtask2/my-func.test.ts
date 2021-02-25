import {createNewColumn} from './my-func';
import ts from 'typescript';
test('my own test', () => {
    const newFile = createNewColumn(` 
    import{ TableRow, TableCell } from 'table-components';
    import{ ts } from 'type-script';
    
    <Table property="">
        <TableRow>
            <TableCell>A cell</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
                My data
            </TableCell>
        </TableRow>
    </Table>`,'New Column');
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    console.log(printer.printNode(ts.EmitHint.Unspecified,newFile,newFile))
})