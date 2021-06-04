import fs from 'fs'
import path from 'path'
import { addColumn } from '../..';
import { SourceLineCol } from '../../../ast';
import { isDataTableWidget } from '../../ast/widgetDeclaration';
import { CodegenRw } from '../../io/codegenRw';
import { graphqlGenTs1 } from '../typeAlias.example';

describe("api tests", () => {
    test(".is data table widget", () => {
        const file = fs.readFileSync(path.resolve('src\\codegen\\tests\\list\\files\\is-datatable-test-file.txt'),'utf-8') 
  
        const source : SourceLineCol = {columnNumber:65, lineNumber: 13, fileName:'test'}
        console.log(file)
        isDataTableWidget(file, source)
      }); 

    test(".add column", () => {
        const filePath = 'src\\codegen\\tests\\list\\files\\is-datatable-test-file.txt'
        const source : SourceLineCol = {columnNumber:17, lineNumber: 13, fileName:filePath}

        addColumn(graphqlGenTs1, new CodegenRw(), source, {property: 'testdate'})
    });
});