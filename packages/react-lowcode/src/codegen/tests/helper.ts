
import { IntrospectionQuery } from "@iteria-app/graphql-lowcode/esm/generate"
import { Project, SourceFile } from "ts-morph"
import ts from "typescript"
import { createEntityFromIntrospection, Entity, Property } from "../generation/entity"

export function createAst(
    code:string,
    scriptTarget = ts.ScriptTarget.ESNext,
    scriptKind = ts.ScriptKind.TSX,
    filePath = `/ts-ast-viewer.tsx`
  ) {
    return ts.createSourceFile(
      filePath,
      code,
      scriptTarget,
      true,
      scriptKind
    )
  }
  
  export function sourceFileEntity(myClassFile: any/*SourceFile*/, typeName = "Customer") {
    const typeAlias = myClassFile.getTypeAlias(typeName)
    if (typeAlias) {
      const props = typeAlias?.getType()?.getProperties() ?? []
      return {
        getName: () => typeName,
        getType: () => typeAlias,
        properties: props.map((prop: { getName: () => any; getTypeAtLocation: (arg0: any) => any; getDeclarations: () => { getText: () => any }[] }) => ({
          getName: () => prop.getName(),
          getType: () => prop.getTypeAtLocation(myClassFile),
          getTypeText: () => prop.getDeclarations()[0].getText()
        }))
      }
    }
  }

  export function getEntityProperty(typesSourceCode: string,  name: string, typeName = "Customer"): Property[] {
    const myClassFile = parseGraphqlTypes(typesSourceCode)
    const testEntity = sourceFileEntity(myClassFile, typeName)
    
    let property = testEntity?.properties.filter(((prop: { getName: () => string })=> { 
      return prop.getName().toLowerCase() === name 
    }))

    return property ?? []
}

export function getEntityPropertyIntrospection(introspection: IntrospectionQuery,  propertyName: string, typeName = "Customer"): Property | undefined {
  const entity: Entity | undefined = createEntityFromIntrospection(introspection, typeName)

  let property: Property | undefined = undefined

  if(entity){
    let propertiesWithName = entity.properties.filter(((prop: { getName: () => string })=> { 
      return prop.getName().toLowerCase() === propertyName 
    }))

    if(propertiesWithName){
      property = propertiesWithName[0]
    }
  }

  return property
}

  export function parseGraphqlTypes(sourceCode: string) {
    // initialize
    const project = new Project({
      // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
      // If you initialize with a tsconfig.json, then it will automatically populate the project
      // with the associated source files.
      // Read more: https://ts-morph.com/setup/
    })
  
    // add source files
    //project.addSourceFilesAtPaths("src/**/*.ts");
    const myClassFile = project.createSourceFile("src/types.ts", sourceCode)
    return myClassFile
  }