import { AppGenerator } from './generation/generators/app-generator'
import { UiFramework, TableType, Formatter } from './definition/context-types'
import { CodeDir, CodeRW } from '../io'
import ts, { factory } from "typescript"
import { Entity, createEntityFromIntrospection } from './generation/entity/index'
import { CodegenOptions } from './interfaces'
import TemplateResolver from './generation/generators/template/template-resolver'
import { IntrospectionQuery, generateGraphqlFile } from '@iteria-app/graphql-lowcode/esm/generate'
import { getListComponentName, getListPageComponentName, getPluralizedEntityName } from './generation/entity/helper'
import { generateMenuItem, generateRoute } from './facade/facadeApi'

// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export function generatePages(introspection: IntrospectionQuery, 
                              io: CodeRW & CodeDir, 
                              options?: CodegenOptions) {

    options?.names.map((typeName) => {
        const entity: Entity | undefined = createEntityFromIntrospection(introspection, typeName)

        if (entity) {
            const componentStorageRoot = options?.componentStoragePath ?? 'src/components'
            const routeDefinitionFilePath = options?.routeDefinitionFilePath ?? 'src/routes.tsx'
            const menuDefinitionFilePath = options?.menuDefinitionFilePath ?? 'src/layouts/DashboardLayout/NavBar/index.tsx'
            const entityListComponentPageName = getListPageComponentName(entity)
            const listComponentName = getListComponentName(entity)
            const listComponentFilePath = `${componentStorageRoot}/${listComponentName}.tsx`
            const listPageComponentFilePath = `${componentStorageRoot}/${entityListComponentPageName}.tsx`
            const moduleName = getPluralizedEntityName(entity.getName())
            const moduleRouteUri = `codegen-${moduleName}`

            //generate graphql queries
            const graphqlQueries = generateGraphqlFile(introspection, typeName)

            if (graphqlQueries != '') 
                io.writeFile(`${componentStorageRoot}/${typeName}.graphql`, graphqlQueries)

            //generate component for list
            generateListComponent(io, 
                                  listComponentFilePath,
                                  entity, 
                                  options)

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
                           '/app/' + moduleRouteUri)
        }
    })
}

function generateListComponent(io: CodeRW, 
                               filePath: string,
                               entity: Entity, 
                               options?:CodegenOptions) {
    let context = {
        uiFramework: options?.uiFramework ?? UiFramework.MaterialUI, 
        formatter: Formatter.None, 
        index: {
            tableType: options?.tableType ?? TableType.BasicTable, 
            height: "400px"
        }
    }

    console.log(`GENERATOR: selected table type: ${context.index.tableType}`)
        
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