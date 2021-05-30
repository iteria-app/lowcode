
import { Project, SourceFile } from "ts-morph"
import ts from "typescript"
import { Property } from "../generation/entity"

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
  
  export function sourceFileEntity(myClassFile: SourceFile) {
    const typeName = "Customer"
    const typeAlias = myClassFile.getTypeAlias(typeName)
    const props = typeAlias?.getType()?.getProperties() ?? []
    if (typeAlias) {
      return {
        getName: () => typeName,
        getType: () => typeAlias,
        properties: props.map((prop) => ({
          getName: () => prop.getName(),
          getType: () => prop.getTypeAtLocation(myClassFile),
          getTypeText: () => prop.getDeclarations()[0].getText()
        }))
      }
    }
  }

  export function getEntityProperty(typesSourceCode: string,  name: string): Property[] {
    const myClassFile = parseGraphqlTypes(typesSourceCode)
    const testEntity = sourceFileEntity(myClassFile)
    
    let property = testEntity?.properties.filter(((prop)=> { 
      return prop.getName().toLowerCase() === name 
    }))

    return property ?? []
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