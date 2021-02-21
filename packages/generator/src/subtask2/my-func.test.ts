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



// function makeFactorialFunction() {
//     const functionName = ts.factory.createIdentifier("factorial");
//     const paramName = ts.factory.createIdentifier("n");
//     const parameter = ts.factory.createParameterDeclaration(
//       /*decorators*/ undefined,
//       /*modifiers*/ undefined,
//       /*dotDotDotToken*/ undefined,
//       paramName
//     );
  
//     const condition = ts.factory.createBinaryExpression(paramName, ts.SyntaxKind.LessThanEqualsToken, ts.factory.createNumericLiteral(1));
//     const ifBody = ts.factory.createBlock([ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))], /*multiline*/ true);
  
//     const decrementedArg = ts.factory.createBinaryExpression(paramName, ts.SyntaxKind.MinusToken, ts.factory.createNumericLiteral(1));
//     const recurse = ts.factory.createBinaryExpression(paramName, ts.SyntaxKind.AsteriskToken, ts.factory.createCallExpression(functionName, /*typeArgs*/ undefined, [decrementedArg]));
//     const statements = [ts.factory.createIfStatement(condition, ifBody), ts.factory.createReturnStatement(recurse)];
  
//     return ts.factory.createFunctionDeclaration(
//       /*decorators*/ undefined,
//       /*modifiers*/ [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
//       /*asteriskToken*/ undefined,
//       functionName,
//       /*typeParameters*/ undefined,
//       [parameter],
//       /*returnType*/ ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
//       ts.factory.createBlock(statements, /*multiline*/ true)
//     );
//   }
  
//   test('test', () => {
//     const resultFile = ts.createSourceFile("someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
//     const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    
//     const result = printer.printNode(ts.EmitHint.Unspecified, makeFactorialFunction(), resultFile);
//     console.log(result);
//   })