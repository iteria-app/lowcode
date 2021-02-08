// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import { Project, SourceFile } from "ts-morph"
import ts from "typescript"
import { entityTable, entityTablePage } from '../react/entity-table'
import { graphqlGenTs1 } from "./typeAlias.example"

export function createAst(
  code: string,
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
function sourceFileEntity(myClassFile: SourceFile) {
  const typeName = "Parent"
  const typeAlias = myClassFile.getTypeAlias(typeName)
  const props = typeAlias?.getType()?.getProperties() ?? []
  if (typeAlias) {
    return {
      getName: () => typeName,
      getType: () => typeAlias,
      properties: props.map((prop) => ({
        getName: () => prop.getName(),
        getType: () => prop.getTypeAtLocation(myClassFile)
      }))
    }
  }
}
test("typeAlias test 1", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const entity = sourceFileEntity(myClassFile)
  const table = entityTable(entity!!)
  //const page = entityTablePage(table)
  
  /*ts.transform(sourceFile, [
      (context) => (node) => {
        return ts.visitNode(node, n => {
          return node
        })
      }
    ])*/
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  console.log(
    'sevas',
    //transformed.transformed[0]
    //.printFile(transformed.transformed[0])
    console.log(printer.printNode(ts.EmitHint.Unspecified, table, sourceFile))
  )
})

function parseGraphqlTypes(sourceCode: string) {
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
