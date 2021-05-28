import { insertColumn, insertFormWidget } from "../../facade/facade-generator";
import { getTestProperty } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";
import path from 'path'
import fs from 'fs'



describe("codegen facade", () => {
    test(".add column to existing table", () => {
      const filePath = 'src\\codegen\\tests\\list\\list-test-file.txt'
      const source = fs.readFileSync(path.resolve(filePath), 'utf-8')
      insertColumn(source, {lineNumber: 15,columnNumber: 73, fileName: 'list-test-file.txt'}, {entityField: getTestProperty(graphqlGenTs1, 'name')[0], index:8})
    });

    test(".add widget to existing detail page", () => {
      const filePath = 'src\\codegen\\tests\\detail\\detail-test-file.txt'
      const source = fs.readFileSync(path.resolve(filePath), 'utf-8')
      insertFormWidget(source, {lineNumber: 33,columnNumber: 19, fileName: 'detail-test-file.txt'}, {entityField: getTestProperty(graphqlGenTs1,'test')[0]})
    });
})