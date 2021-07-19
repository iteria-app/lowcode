import ts, { factory } from "typescript"
import { graphqlGenTs1 } from "../typeAlias.example"
import { Formatter, TableType, UiFramework } from '../../definition/context-types'
import { AppGenerator } from '../../generation/generators/app-generator'
import { CodeDir, CodeRW } from "../../../io"
import { sourceFileEntity, createAst, parseGraphqlTypes } from "../helper"
import { generatePages } from "../../app"
import { CodegenRw } from "../../io/codegenRw"
import path from 'path'
import fs from 'fs'

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

    var testWriter = new testDemoWriter()

    const io = new CodegenRw()
    const template = fs.readFileSync(path.resolve('src/codegen/tests/list/files/page-list-template.txt'), 'utf-8')
    
    var options = {names:['Customer'], pageListTemplate: template}

    // generatePages(graphqlGenTs1, testWriter, options)

    console.log('generated:' + testWriter.getSourceString())
  });

  test(".mui table generation without formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: {tableType: TableType.BasicTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!);

      const page = generator.generateListComponent()
      
      /*ts.transform(sourceFile, [
          (context) => (node) => {
            return ts.visitNode(node, n => {
              return node
            })
          }
        ])*/
      // TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".mui table generation with formatting", () => {
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.ReactIntl, index: {tableType: TableType.BasicTable, height: "400px"}};
    let generator = new AppGenerator(generationContext, testEntity!!);

    const page = generator.generateListComponent()

    /*ts.transform(sourceFile, [
        (context) => (node) => {
          return ts.visitNode(node, n => {
            return node
          })
        }
      ])*/
    // TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
});

test(".grommet table generation without formatting", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const testEntity = sourceFileEntity(myClassFile)

  let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.None, index: {tableType: TableType.BasicTable, height: "400px"}};
  let generator = new AppGenerator(generationContext, testEntity!!);

  const page = generator.generateListComponent()
  
  /*ts.transform(sourceFile, [
      (context) => (node) => {
        return ts.visitNode(node, n => {
          return node
        })
      }
    ])*/
  // TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet table generation with formatting", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const testEntity = sourceFileEntity(myClassFile)

  let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.ReactIntl, index: {tableType: TableType.BasicTable, height: "400px"}};
  let generator = new AppGenerator(generationContext, testEntity!!);

  const page = generator.generateListComponent()

  /*ts.transform(sourceFile, [
      (context) => (node) => {
        return ts.visitNode(node, n => {
          return node
        })
      }
    ])*/
  // TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".mui data table generation without formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".mui data table generation with formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.ReactIntl, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation without formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.None, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation with formatting", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.ReactIntl, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
    
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
      let generatedCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)
    
      console.log('generated:', generatedCode)
  });
})


