import { Property } from "../../generation/entity";
import { sourceFileEntity, parseGraphqlTypes } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";

  function getTestEntity(name: string): Property[] {
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)
    
    let property = testEntity?.properties.filter(((prop)=> { prop.getName().toLowerCase() === name }))

    return property ?? []
}

describe("table generation", () => {
 
    test(".test adding column to existing table with no column index", () => {


    });
  
    test(".test adding column to existing table with no column index = 1", () => {
      
  
    });

  
})