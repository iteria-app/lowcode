import { Property } from "../../generation/entity";
import { insertColumn, insertFormWidget } from "../../insert-facade";
import { parseGraphqlTypes, sourceFileEntity } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";

  export function getTestProperty(name: string): Property[] {
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)
    
    let property = testEntity?.properties.filter(((prop)=> { 
      return prop.getName().toLowerCase() === name 
    }))

    return property ?? []
}

describe("insert column / widget for field - facade", () => {
 
    test(".add column to existing table", () => {
      insertColumn({lineNumber: 15,columnNumber: 73, fileName: 'D:\\Dev\\LowCode\\lowcode-fork\\lowcode\\packages\\react-lowcode\\src\\codegen\\tests\\list\\list-test-file.txt'}, {entityField: getTestProperty('name')[0], index:8})
    });

    test(".add widget to existing detail page", () => {
      insertFormWidget({lineNumber: 33,columnNumber: 19, fileName: 'C:\\Private\\mat-app\\lowcode\\packages\\react-lowcode\\src\\codegen\\tests\\detail\\detail-test-file.txt'}, {entityField: getTestProperty('name')[0]})
    });
})