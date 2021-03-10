// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import { Project, SourceFile } from "ts-morph"
import ts, { factory } from "typescript"
import { graphqlGenTs1 } from "./typeAlias.example"
import { TableType } from '../definition/table-types'
import { ModuleGenerator } from '../generation/generators/module-generator'

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
        getType: () => prop.getTypeAtLocation(myClassFile),
        getTypeText: () => prop.getDeclarations()[0].getText()
      }))
    }
  }
}

describe("table generation", () => {
  test(".mui table generation", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {useFormatter:false, tableType: TableType.MuiTable, entity: testEntity!!};
      let generator = new ModuleGenerator(generationContext);

      const page = generator.generateTablePage()
      
      /*ts.transform(sourceFile, [
          (context) => (node) => {
            return ts.visitNode(node, n => {
              return node
            })
          }
        ])*/
      // TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".mui data table generation", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {useFormatter:false, tableType: TableType.MuiDataTable, entity: testEntity!!};
      let generator = new ModuleGenerator(generationContext);

      const page = generator.generateTablePage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".mui data table generation with formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {useFormatter:true, tableType: TableType.MuiDataTable, entity: testEntity!!};
      let generator = new ModuleGenerator(generationContext);

      const page = generator.generateTablePage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {useFormatter:false, tableType: TableType.GrommetDataTable, entity: testEntity!!};
      let generator = new ModuleGenerator(generationContext);

      const page = generator.generateTablePage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });
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
