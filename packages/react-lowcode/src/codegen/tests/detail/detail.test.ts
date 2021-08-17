// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import ts, { factory } from "typescript"
import { UiFramework, TableType, Formatter } from '../../definition/context-types'
import { AppGenerator } from '../../generation/generators/app-generator'
import { createAst } from "../helper"
import { createEntityFromIntrospection, Entity } from "../../generation/entity"
import { is2 } from "../introspection-example"

  test(".mui formik generation", () => {
      const sourceFile = createAst('');
      const entityName = 'customer';      
      const entity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, entityName);

      let generationContext = {formatter: Formatter.ReactIntl, uiFramework: UiFramework.MaterialUI, tableType: TableType.BasicTable, entity: entity!!};
      let generator = new AppGenerator(generationContext, entity!!);

      const page = generator.generateDetailPage()
      
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
  });

  test(".grommet formik generation", () => {
    const sourceFile = createAst('')
    const entityName = 'customer';      
    const entity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, entityName);

    let generationContext = {useFormatter:false, uiFramework: UiFramework.Grommet, tableType: TableType.BasicTable, entity: entity!!};
    let generator = new AppGenerator(generationContext , entity!!);

    const page = generator.generateDetailPage()
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
});

test("interface generation", () => {
  const sourceFile = createAst('')
  const entityName = 'customer';      
  const entity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, entityName);

    let generationContext = {useFormatter:false, uiFramework: UiFramework.MaterialUI, tableType: TableType.BasicTable, entity: entity!!};
    let generator = new AppGenerator(generationContext , entity!!);

    const page = generator.generateInterface();
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  console.log('generated:', printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile))
})