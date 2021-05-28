import { Property } from "../../generation/entity";
import { insertColumn, insertColumnGrommet, insertFormWidget } from "../../generation/facade/facade-generator";
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

describe("codegen facade", () => {
    test(".add column to existing table", () => {
      insertColumn({lineNumber: 15,columnNumber: 73, fileName: 'src\\codegen\\tests\\list\\list-test-file.txt'}, {entityField: getTestProperty('name')[0], index:8})
    });

    test(".add widget to existing detail page", () => {
      insertFormWidget({lineNumber: 33,columnNumber: 19, fileName: 'src\\codegen\\tests\\detail\\detail-test-file.txt'}, {entityField: getTestProperty('test')[0]})
    });

    test(".add column to existing table Grommet", () => {
      insertColumnGrommet({lineNumber: 13, columnNumber: 17, fileName: 'src\\codegen\\tests\\list\\list-grommet-test-file.txt'}, { entityField: getTestProperty('testdate')[0], index: 1 })
    });
})