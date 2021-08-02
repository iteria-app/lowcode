// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import ts, { factory } from "typescript"
import { graphqlGenTs1 } from "../typeAlias.example"
import { UiFramework, TableType, Formatter } from '../../definition/context-types'
import { AppGenerator } from '../../generation/generators/app-generator'
import { sourceFileEntity, createAst, parseGraphqlTypes } from "../helper"

  test(".mui formik generation", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {formatter: Formatter.ReactIntl, uiFramework: UiFramework.MaterialUI, tableType: TableType.BasicTable, entity: testEntity!!};
      let generator = new AppGenerator(generationContext , testEntity!!);

      const page = generator.generateDetailPage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet formik generation", () => {
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {useFormatter:false, uiFramework: UiFramework.Grommet, tableType: TableType.BasicTable, entity: testEntity!!};
    let generator = new AppGenerator(generationContext , testEntity!!);

    const page = generator.generateDetailPage()
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
});

test("interface generation", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {useFormatter:false, uiFramework: UiFramework.MaterialUI, tableType: TableType.BasicTable, entity: testEntity!!};
    let generator = new AppGenerator(generationContext , testEntity!!);

    const page = generator.generateInterface();
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
})