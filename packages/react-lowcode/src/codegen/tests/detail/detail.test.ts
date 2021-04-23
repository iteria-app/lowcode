// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import { Project, SourceFile } from "ts-morph"
import ts, { factory } from "typescript"
import { graphqlGenTs1 } from "../typeAlias.example"
import { UiFramework, TableType, Formatter } from '../../definition/context-types'
import { ModuleGenerator } from '../../generation/generators/module-generator'
import { createAst, parseGraphqlTypes, sourceFileEntity } from "../helper"

  test(".mui formik generation", () => {
      const sourceFile = createAst('')
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)

      let generationContext = {formatter: Formatter.Intl, uiFramework: UiFramework.MaterialUI, tableType: TableType.BasicTable, entity: testEntity!!};
      let generator = new ModuleGenerator(generationContext , testEntity!!);

      const page = generator.generateDetailPage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
  });

  test(".grommet formik generation", () => {
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let generationContext = {useFormatter:false, uiFramework: UiFramework.Grommet, tableType: TableType.BasicTable, entity: testEntity!!};
    let generator = new ModuleGenerator(generationContext , testEntity!!);

    const page = generator.generateDetailPage()
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile))
});
