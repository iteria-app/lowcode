import { getEntityProperty } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";
import path from 'path'
import fs from 'fs'
import { insertColumn, insertColumnGrommet, insertFormWidget } from "../../facade/facade-generator";
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

    test(".add column to existing table Grommet", () => {
      insertColumnGrommet({lineNumber: 13, columnNumber: 17, fileName: 'src\\codegen\\tests\\list\\list-grommet-test-file.txt'}, { entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 1 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });
})