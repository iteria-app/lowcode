import sourceFileEntity, { getEntityProperty, parseGraphqlTypes } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";
import { insertColumn, insertColumnToBasicTableGrommet, insertColumnToBasicTableMui, insertColumnToDataTableGrommet, insertFormWidget } from "../../facade/facade-generator";
import { CodegenRw } from "../../io/codegenRw";

describe("codegen facade", () => {

    test(".add column to existing table", () => {
      insertColumn({lineNumber: 15,columnNumber: 73, fileName: 'src\\codegen\\tests\\list\\list-test-file.txt'}, {entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index:8}, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add widget to existing detail page", () => {
      insertFormWidget({lineNumber: 33,columnNumber: 19, fileName: 'src\\codegen\\tests\\detail\\detail-test-file.txt'}, {entityField: getEntityProperty(graphqlGenTs1,'test')[0]}, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add column to existing data table (Grommet)", () => {
      // This test without formating not works!!!
      insertColumnToDataTableGrommet({lineNumber: 13, columnNumber: 17, fileName: 'src\\codegen\\tests\\list\\files\\data-table-grommet-test-file.txt'}, { entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add column to existing data table with formatter (Grommet)", () => {
      insertColumnToDataTableGrommet({lineNumber: 13, columnNumber: 17, fileName: 'src\\codegen\\tests\\list\\files\\data-table-grommet-with-formatter-test-file.txt'}, { entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add column to existing basic table (MUI)", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableMui({lineNumber: 14, columnNumber: 11, fileName: 'src\\codegen\\tests\\list\\files\\basic-table-mui-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });   

    test(".add column to existing basic table with formatter (MUI)", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableMui({lineNumber: 14, columnNumber: 11, fileName: 'src\\codegen\\tests\\list\\files\\basic-table-mui-with-formatter-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });   

    test(".add column to existing basic table (Grommet)", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableGrommet({lineNumber: 18, columnNumber: 11, fileName: 'src\\codegen\\tests\\list\\files\\basic-table-grommet-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });  

    test(".add column to existing basic table with formatter (Grommet)", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableGrommet({lineNumber: 14, columnNumber: 11, fileName: 'src\\codegen\\tests\\list\\files\\basic-table-grommet-with-formatter-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });  
})