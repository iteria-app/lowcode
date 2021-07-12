import { AppGenerator } from './generation/generators/app-generator'
import { UiFramework, TableType, Formatter } from './definition/context-types'
import { CodeDir, CodeRW } from '../io'
import ts, { factory } from "typescript"
import { Project } from "ts-morph"
import { CodegenOptions } from './interfaces'
import TemplateResolver from './generation/generators/template/template-resolver'

// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export function generatePages(inputSourceCode: string, io: CodeRW & CodeDir, options?: CodegenOptions) {
    const project = new Project({})
    const myClassFile = project.createSourceFile("src/types.ts", inputSourceCode)
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    alert('generatePages')
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
            const page = generator.generateListComponent(/* TODO entity / type name should be input - not in context */)
            
            const filePath = `src/components/${typeName}.tsx`
            const sourceFile = ts.createSourceFile(
                filePath,
                '',
                ts.ScriptTarget.ESNext,
                true,
                ts.ScriptKind.TSX
            )

            const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)
            
            console.log(`table for ${typeName} was generated: ${pageSourceCode}`)
            io.writeFile(filePath, pageSourceCode)

            //generate list wrapper
            const templateResolver = new TemplateResolver(entity);
            const listWrapper = templateResolver.generateListPage(options.pageListTemplate);

            if(listWrapper) {
                const listWrapperFilePath = `src/components/${typeName}Page.tsx`
                const sourceFileWrapperSourceFile = ts.createSourceFile(
                    listWrapperFilePath,
                    listWrapper,
                    ts.ScriptTarget.ESNext,
                    true,
                    ts.ScriptKind.TSX
                )
    
                // TODO:PC: Need print here? or only: io.writeFile(listWrapperFilePath, listWrapper)
                const wrapperPageSourceCode = printer.printFile(sourceFileWrapperSourceFile);

                console.log(`page for ${typeName} table was generated: ${wrapperPageSourceCode}`)

                io.writeFile(listWrapperFilePath, wrapperPageSourceCode)
            }
        }
    })
}