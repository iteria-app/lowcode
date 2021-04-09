import { Project, SourceFile } from "ts-morph"
import ts, { factory } from "typescript"
import { graphqlGenTs1 } from "../typeAlias.example"
import { Formatter, TableType, UiFramework } from '../../definition/context-types'
import { ModuleGenerator } from '../../generation/generators/module-generator'

import {generatePages} from '../../index'
import { CodeDir, CodeRW } from "../../../io"

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

class testDemoWriter implements CodeRW, CodeDir {
  private _sourceCodeString: string = ''

  readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): Promise<string[] | undefined> {
    throw new Error("Method not implemented.")
  }

  async readFile(path: string, encoding?: string) {
    return ''
  }

  async writeFile(path: string, data: string) {
    this._sourceCodeString = data
  }

  getSourceString(): string {
    return this._sourceCodeString
  }
}

describe("table generation", () => {
  
  test (".test table generation from index", ()=>{
    var options = {names:['Customer']}

    var testWriter = new testDemoWriter()

    generatePages(graphqlGenTs1, testWriter, options)

    console.log('generated:' + testWriter.getSourceString())

  });

  test(".mui table generation without formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: {tableType: TableType.BasicTable, height: "400px"}};
      let generator = new ModuleGenerator(generationContext, testEntity!!);

      const page = generator.generateIndexPage()
      
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

  test(".mui table generation with formatting", () => {
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.Intl, index: {tableType: TableType.BasicTable, height: "400px"}};
    let generator = new ModuleGenerator(generationContext, testEntity!!);

    const page = generator.generateIndexPage()
    
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

test(".grommet table generation without formatting", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const testEntity = sourceFileEntity(myClassFile)

  let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.None, index: {tableType: TableType.BasicTable, height: "400px"}};
  let generator = new ModuleGenerator(generationContext, testEntity!!);

  const page = generator.generateIndexPage()
  
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

  test(".grommet table generation with formatting", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const testEntity = sourceFileEntity(myClassFile)

  let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.Intl, index: {tableType: TableType.BasicTable, height: "400px"}};
  let generator = new ModuleGenerator(generationContext, testEntity!!);

  const page = generator.generateIndexPage()

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

  test(".mui data table generation without formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new ModuleGenerator(generationContext, testEntity!!);

      const page = generator.generateIndexPage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".mui data table generation with formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.Intl, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new ModuleGenerator(generationContext, testEntity!!);

      const page = generator.generateIndexPage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation without formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.None, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new ModuleGenerator(generationContext, testEntity!!);

      const page = generator.generateIndexPage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation with formatting", () => {
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.Intl, index: {tableType: TableType.DataTable, height: "400px"}};
    let generator = new ModuleGenerator(generationContext, testEntity!!);

    const page = generator.generateIndexPage()
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
});
})

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