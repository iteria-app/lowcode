import { Property } from "../../generation/entity";
import { GeneratorFacade } from "../../generation/facade/facade-generator";
import { parseGraphqlTypes, sourceFileEntity } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";

  export function getTestProperty(name: string): Property[] {
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)
    
    let property = testEntity?.properties.filter(((prop)=> { prop.getName().toLowerCase() === name }))

    return property ?? []
}

describe("codegen facade", () => {
 
    test(".add column to existing table", () => {
      let facade = new GeneratorFacade();
      facade.insertColumn({lineNumber: 4,columnNumber: 25, fileName: 'D:\\Dev\\LowCode\\lowcode-fork\\lowcode\\packages\\react-lowcode\\src\\codegen\\tests\\list\\facate-test-file.ts'}, {entityField: getTestProperty('name')[0]})

    });

    test(".add widget to existing detail page", () => {
      let facade = new GeneratorFacade();
      facade.insertFormWidget({lineNumber: 37,columnNumber: 0, fileName: 'C:\\Private\\mat-app\\lowcode\\packages\\react-lowcode\\src\\codegen\\tests\\list\\datail-test-file.ts'}, {entityField: getTestProperty('name')[0]})

    });
})