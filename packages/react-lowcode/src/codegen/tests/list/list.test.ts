import ts, { factory } from "typescript"
import { Formatter, TableType, UiFramework } from '../../definition/context-types'
import { AppGenerator } from '../../generation/generators/app-generator'
import { createAst } from "../helper"
import { createEntityFromIntrospection, Entity } from "../../generation/entity"
import { is2 } from "../introspection-example"

describe("table generation", () => {
  
  test(".mui table generation without formatting", () => {
      const sourceFile = createAst('')
      const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

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
    const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

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
  const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

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
  const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

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
      const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".mui data table generation with formatting", () => {
      const sourceFile = createAst('')
      const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

      let generationContext = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.ReactIntl, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation without formatting", () => {
      const sourceFile = createAst('')
      const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

      let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.None, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet data table generation with formatting", () => {
      const sourceFile = createAst('')
      const testEntity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, 'customer');

      let generationContext = {uiFramework: UiFramework.Grommet, formatter: Formatter.ReactIntl, index: {tableType: TableType.DataTable, height: "400px"}};
      let generator = new AppGenerator(generationContext, testEntity!!);

      const page = generator.generateListComponent()
    
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
      let generatedCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)
    
      console.log('generated:', generatedCode)
  });
})


