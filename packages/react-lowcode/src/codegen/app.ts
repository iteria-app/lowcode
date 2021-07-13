import { AppGenerator } from './generation/generators/app-generator'
import { UiFramework, TableType, Formatter } from './definition/context-types'
import { CodeDir, CodeRW } from '../io'
import ts, { factory } from "typescript"
import { Project } from "ts-morph"
import { CodegenOptions } from './interfaces'
import TemplateResolver from './generation/generators/template/template-resolver'
import { generateMenuItem, generateRoute } from './facade/facadeApi'
import { Entity } from './generation/entity'
import { getListPageComponentName, getPluralizedEntityName } from './generation/entity/helper'

// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export function generatePages(inputSourceCode: string, 
                              io: CodeRW & CodeDir, 
                              options?: CodegenOptions) {
    const project = new Project({})
    const myClassFile = project.createSourceFile("src/types.ts", inputSourceCode)
    const componentStorageRoot = options?.componentStoragePath ?? 'src/components'
    const routeDefinitionFilePath = options?.routeDefinitionFilePath ?? 'src/routes.tsx'
    const menuDefinitionFilePath = options?.menuDefinitionFilePath ?? 'src/layouts/DashboardLayout/NavBar/index.tsx'


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

            const entityListComponentPageName = getListPageComponentName(entity)
            const listComponentFilePath = `${componentStorageRoot}/${typeName}.tsx`
            const listPageComponentFilePath = `${componentStorageRoot}/${entityListComponentPageName}.tsx`
            const moduleName = getPluralizedEntityName(entity.getName())
            const moduleRouteUri = `app/${moduleName}`

            //generate component for list
            generateListComponent(io, 
                                  listComponentFilePath,
                                  entity, 
                                  typeName)

            //generate page for list component
            generateListPage(io, 
                             entity, 
                             typeName, 
                             options.pageListTemplate, 
                             listPageComponentFilePath);

            //generate route for generated list page
            addNewListRoute(io, 
                            routeDefinitionFilePath, 
                            moduleRouteUri, 
                            entityListComponentPageName, 
                            listPageComponentFilePath)

            //generate new menu item for generated list page
            addNewMenuItem(io,
                           menuDefinitionFilePath, 
                           moduleName, 
                           moduleRouteUri)
        }
    })
}

function generateListComponent(io: CodeRW, 
                               filePath: string,
                               entity: Entity, 
                               typeName:string, 
                               options?:CodegenOptions) {
    let context = {
        uiFramework: options?.uiFramework ?? UiFramework.MaterialUI, 
        formatter: Formatter.None, 
        index: {
            tableType: options?.tableType ?? TableType.BasicTable, 
            height: "400px"
        }
    }
        
    const generator = new AppGenerator(context, entity)
    const page = generator.generateListComponent(/* TODO entity / type name should be input - not in context */)
    
    const sourceFile = ts.createSourceFile(
        filePath,
        '',
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
    )

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)
    
    io.writeFile(filePath, pageSourceCode)
}

function generateListPage(io: CodeRW, 
                          entity: Entity, 
                          typeName:string,
                          pageListTemplateSource: string,
                          listPageFilePath: string) {
    const templateResolver = new TemplateResolver(entity);
    const listPage = templateResolver.generateListPage(pageListTemplateSource);

    if(listPage) {
        const listPageSourceFile = ts.createSourceFile(
            listPageFilePath,
            listPage,
            ts.ScriptTarget.ESNext,
            true,
            ts.ScriptKind.TSX
        )
    
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

        const generatedSourceCode = printer.printFile(listPageSourceFile);

        io.writeFile(listPageFilePath, generatedSourceCode)
    }
}

function addNewListRoute(io:CodeRW,
                         routeDefinitionFilePath: string,
                         moduleRouteUri: string, 
                         componentName: string,
                         componentFilePath: string){
        generateRoute(
            { 
                routeFilePath: routeDefinitionFilePath, 
                componentName: componentName, 
                componentFilePath: componentFilePath, 
                componentRouteUri: moduleRouteUri
            }, 
            io).then(generatedSource => {
                if(generatedSource){
                    io.writeFile(routeDefinitionFilePath, generatedSource)
                }
            }
        )
}

function addNewMenuItem(io:CodeRW, 
                        menuDefinitionFilePath: string,
                        itemTitle: string, 
                        itemUri: string, 
                        icon?: string)
{
    generateMenuItem(
        {
            menuDefinitionFilePath: menuDefinitionFilePath,
            itemTitle: itemTitle,
            itemUri: itemUri,
            itemIcon: icon
        }, 
        io)
    .then(generatedSource => {
        if(generatedSource){
            io.writeFile(menuDefinitionFilePath, generatedSource)
        }
    })
}