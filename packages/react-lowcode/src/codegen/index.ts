import { AppGenerator } from './generation/generators/app-generator'
import { UiFramework, TableType, Formatter } from './definition/context-types'
import { CodeDir, CodeRW } from '../io'

import ts, { factory } from "typescript"
import { Project } from "ts-morph"
import { HookImport } from '../ast/hooks'
import { TagImport } from '../ast/tags'
import { insertColumn, insertFormWidget, deleteColumn as removeColumn } from './facade/facadeApi'
import { SourceLineCol } from '../ast'
import { Property } from './generation/entity'
import { getEntityProperty } from './tests/helper'
import { isDataTableWidget } from './ast/widgetDeclaration'
import { CodegenOptions, ColumnSourcePositionOptions, ColumnSourcePositionResult, DeleteOptions, InsertOptions } from './interfaces'


// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export function generatePages(inputSourceCode: string, io: CodeRW & CodeDir, options?: CodegenOptions) {
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
            const page = generator.generateListComponent(/* TODO entity / type name should be input - not in context */)
            
            const filePath = `src/components/${typeName}.tsx`
            const sourceFile = ts.createSourceFile(
                filePath,
                '',
                ts.ScriptTarget.ESNext,
                true,
                ts.ScriptKind.TSX
            )
            const pageSouceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)
            io.writeFile(filePath, pageSouceCode)

            //generate list wrapper
            const indexWrapperTemplatePath = 'path-to-template'//TODO: put here real template path when template will be done
            let template = ''
            io.readFile(indexWrapperTemplatePath).then((source => {if(source) template = source;}))

            const listWrapper = generator.generateListPage(template)
            const listWrapperFilePath = `src/components/${typeName}Wrapper.tsx`//TODO: dont like the word wrapper, rename later to something else
            const sourceFileWrapperSourceFile = ts.createSourceFile(
                listWrapperFilePath,
                '',
                ts.ScriptTarget.ESNext,
                true,
                ts.ScriptKind.TSX
            )

            const wrapperPageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...listWrapper!.imports, listWrapper!.functionDeclaration]), sourceFileWrapperSourceFile)
            io.writeFile(listWrapperFilePath, wrapperPageSourceCode)
        }
    })
}

export function isSelectedDataTable(sourceCode:string, position: SourceLineCol){
    return isDataTableWidget(sourceCode, position)
}

export async function addColumn(typesSourceCode: string, 
                                io: CodeRW, 
                                sourceCode:SourceLineCol, 
                                options: InsertOptions): Promise<string | undefined>{
                                    
    const property: Property = getEntityProperty(typesSourceCode, options.property)[0]
    let generatedSource = undefined

    if(property){
        generatedSource = await insertColumn(sourceCode, 
            {entityField: property, index: options.index}, 
            io)
    }

    return generatedSource
}

export async function deleteColumn(io: CodeRW, 
                                   sourceCode:SourceLineCol, 
                                   options: DeleteOptions): Promise<string | undefined> {

    let generatedSource = await removeColumn(sourceCode, options, io);

    return generatedSource
}

export async function addFormInput(typesSourceCode: string, 
                                   io: CodeRW, 
                                   sourceLine:SourceLineCol, 
                                   options: InsertOptions): Promise<string | undefined>{

    const property: Property = getEntityProperty(typesSourceCode, options.property)[0]
    let generatedSource = undefined

    if(property){

        generatedSource = await insertFormWidget(sourceLine, 
            {entityField: property, index: options.index}, 
            io)
    }

    return generatedSource
}

export async function getColumnSourcePosition(io: CodeRW, 
                                              sourceCode:SourceLineCol,
                                              options: ColumnSourcePositionOptions): Promise<ColumnSourcePositionResult | undefined>{

    return 
}

interface ThemeCodegen {
    providerTag(...children: ts.JsxChild[]): any
}

 interface IntlCodegen {
    providerTag(...children: ts.JsxChild[]): any
 }

export interface AppGenerators {
    newSourceFileContext(path: string): JsxFileContext
    theme: ThemeCodegen,
    intl: IntlCodegen,
    //authorization: AuthorizationCodegen
}

export class JsxFileContext {

    uniqueImports() {
        return []
    }
  
    useHook(hook: HookImport, ...params: []) {
        // TODO unique import
        return null
    }
  
    tag(tag: TagImport, ...children: ts.JsxChild[]) {
        // TODO unique import
        return null
    }
  
    returnFragment(...children: ts.JsxChild[]): ts.Statement | null {
  
        if (children?.length == 1) {
            // TODO handle one child
        }
    
        factory.createReturnStatement(factory.createJsxFragment(
            factory.createJsxOpeningFragment(),
            children,
            factory.createJsxJsxClosingFragment()
          ))
    
        return null
    }
}  
