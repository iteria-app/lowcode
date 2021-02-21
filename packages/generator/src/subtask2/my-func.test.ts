import {createNewColumn} from './my-func';
import ts from 'typescript';
test('my own test', () => {
    createNewColumn(` 

    import{ aaa, asd,TableColumn} from 'dsada';
    import{ ss} from 'dsada';
    
    

    <Table>
    <TableRow>
    <TableCell>
    <FormattedMessage id="Parent.created_at"/>
    </TableCell><TableCell>
    <FormattedMessage id="Parent.date1"/>
    </TableCell><TableCell>
    <FormattedMessage id="Parent.double1"/></TableCell><TableCell><FormattedMessage id="Parent.flag1"/>
    </TableCell><TableCell>
    <FormattedMessage id="Parent.id"/></TableCell><TableCell><FormattedMessage id="Parent.money1"/>
    </TableCell><TableCell><FormattedMessage id="Parent.numeric1"/></TableCell><TableCell>
    <FormattedMessage id="Parent.seq"/></TableCell><TableCell><FormattedMessage id="Parent.time1"/>
    </TableCell><TableCell><FormattedMessage id="Parent.title"/>
    </TableCell><TableCell><FormattedMessage id="Parent.uuid1"/></TableCell>
    </TableRow>{parents.map(parent => <TableRow><TableCell>created_at{parent.created_at}</TableCell>
        <TableCell>date1{parent.date1}</TableCell><TableCell>double1<FormattedNumber value={parent.double1}/>
        </TableCell><TableCell>flag1{parent.flag1}</TableCell><TableCell>id{parent.id}</TableCell>
        <TableCell>money1{parent.money1}</TableCell><TableCell>numeric1<FormattedNumber value={parent.numeric1}/>
        </TableCell><TableCell>seq{parent.seq}</TableCell><TableCell>time1{parent.time1}</TableCell>
        <TableCell>title{parent.title}</TableCell>
        <TableCell>uuid1{parent.uuid1}</TableCell></TableRow>)}
    </Table>`,'New Column');
})
