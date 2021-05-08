import { UiFramework, TableType, Formatter } from './definition/context-types'
import { AppGenerator } from './generation/generators/app-generator'
import { CodeDir, CodeRW } from '../io'

import { Project } from "ts-morph"
import ts, { factory } from "typescript"

export interface GenPagesOptions {
    // whitelisted entity names
    readonly names: string[]
    // default is MaterialUI
    uiFramework?: UiFramework
}

// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export function generatePages(inputSourceCode: string, io: CodeRW & CodeDir, options?: GenPagesOptions) {
    const project = new Project({})
    const myClassFile = project.createSourceFile("src/types.ts", inputSourceCode)
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    options?.names.map((typeName) => {
        const typeAlias = myClassFile.getTypeAlias(typeName)
        const props = typeAlias?.getType()?.getProperties() ?? []
        if (typeAlias) {
            const entity = {
                getName: () => typeName,
                getType: () => typeAlias,
                properties: props.map((prop) => ({
                    getName: () => prop.getName(),
                    getType: () => prop.getTypeAtLocation(myClassFile),
                    getTypeText: () => prop.getDeclarations()[0].getText()
                }))
            }

            let context = {uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: {tableType: TableType.BasicTable, height: "400px"}};
            
            const generator = new AppGenerator(context, entity)
            const page = generator.generateListPage(/* TODO entity / type name should be input - not in context */)
            
            const filePath = `src/components/${typeName}.tsx`
            const sourceFile = ts.createSourceFile(
                filePath,
                '',
                ts.ScriptTarget.ESNext,
                true,
                ts.ScriptKind.TSX
            )
            const pageSouceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile)
            io.writeFile(filePath, pageSouceCode)
        }
    })
}
