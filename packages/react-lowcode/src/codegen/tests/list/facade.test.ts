import { Formatter, TableType, UiFramework } from "../../definition/context-types";
import { Property } from "../../generation/entity";
import { GeneratorFacade } from "../../generation/facade/facade-generator";
import MuiDetailGenerator from "../../generation/generators/detail/mui-detail-generator";
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
      let facade = new GeneratorFacade();
      facade.insertColumn({lineNumber: 15,columnNumber: 73, fileName: 'D:\\Dev\\LowCode\\lowcode-fork\\lowcode\\packages\\react-lowcode\\src\\codegen\\tests\\list\\list-test-file.txt'}, {entityField: getTestProperty('name')[0]})

    });

    test(".add widget to existing detail page", () => {
      let facade = new GeneratorFacade();
      facade.insertFormWidget({lineNumber: 38,columnNumber: 19, fileName: 'C:\\Private\\mat-app\\lowcode\\packages\\react-lowcode\\src\\codegen\\tests\\list\\detail-test-file.txt'}, {entityField: getTestProperty('name')[0]})

    });
})