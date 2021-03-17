import { ModuleGenerator } from './src/generation/generators/module-generator'
import { UiFramework, TableType } from './src/definition/context-types'
import { createAst, sourceFileEntity, parseGraphqlTypes } from './src/tests/index/index.test'
import { graphqlGenTs1 } from "./typeAlias.example"
import ts, { factory } from "typescript"

class codegen {

    generate(): string {
        const sourceFile = createAst('')
        const myClassFile = parseGraphqlTypes(graphqlGenTs1)
        const testEntity = sourceFileEntity(myClassFile)

        let generationContext = {useFormatter:false, uiFramework: UiFramework.Mui, tableType: TableType.BasicTable,  entity: testEntity!!};
        let generator = new ModuleGenerator(generationContext);

        const page = generator.generateTablePage()
    
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

        return printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile)
    }
}

export default new codegen()
