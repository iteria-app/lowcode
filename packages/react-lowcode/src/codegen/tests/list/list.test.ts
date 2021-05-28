import ts, { factory } from "typescript"
import { graphqlGenTs1 } from "../typeAlias.example"
import { Formatter, TableType, UiFramework } from '../../definition/context-types'
import { AppGenerator } from '../../generation/generators/app-generator'
import {generatePages} from '../../index'
import { CodeDir, CodeRW } from "../../../io"
import { createAst, parseGraphqlTypes, sourceFileEntity } from "../helper"
import path from 'path'
import fs from "fs"

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

    let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.Intl, index: {tableType: TableType.BasicTable, height: "400px"}};
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

  let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.Intl, index: {tableType: TableType.BasicTable, height: "400px"}};
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

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.Intl, index: {tableType: TableType.DataTable, height: "400px"}};
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

      let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.Intl, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
    
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
      let generatedCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)
    
      console.log('generated:', generatedCode)
  });

  test(".list wrapper page generating", () => {
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.Intl, index: {tableType: TableType.DataTable, height: "400px"}};
    let generator = new AppGenerator(generationContext, testEntity!!);

    const templatePath = 'template-path'//TODO: put here real template path when template will be done
    const template = fs.readFileSync(path.resolve(templatePath), 'utf-8')
    const page = generator.generateListComponentPage('test')
  
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    let prindedSource = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)

    expect(prindedSource).toContain('<CustomerTable customers={data?.customers} />')
});
})


