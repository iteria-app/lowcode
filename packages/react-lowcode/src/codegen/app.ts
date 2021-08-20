import { AppGenerator } from './generation/generators/app-generator'
import { UiFramework, TableType, Formatter } from './definition/context-types'
import { CodeDir, CodeRW } from '../io'
import ts, { factory } from "typescript"
import { Entity, createEntityFromIntrospection } from './generation/entity/index'
import { CodegenOptions } from './interfaces'
import TemplateResolver from './generation/generators/template/template-resolver'
import { IntrospectionQuery, generateGraphqlFile } from '@iteria-app/graphql-lowcode/esm/generate'
import { getBaseModuleUri, getDetailComponentName, getDetailModuleUri, getDetailPageComponentName, getEntityInterfaceName, getListComponentName, getListPageComponentName, getPluralizedEntityName } from './generation/entity/helper'
import { generateMenuItem, generateRoute } from './facade/facadeApi'
import GenerationContext from './generation/context/context'
import DetailPageTemplateResolver from './generation/generators/template/detail-page'

// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export async function generatePages(introspection: IntrospectionQuery, 
                                    io: CodeRW & CodeDir, 
                                    options: CodegenOptions) {

        await Promise.all(options.names.map(async (typeName) => {
            const entity: Entity | undefined = createEntityFromIntrospection(introspection, typeName)

            if (entity) {
                let context = {
                    uiFramework: options?.uiFramework ?? UiFramework.MaterialUI, 
                    formatter: Formatter.None, 
                    index: {
                        tableType: options?.tableType ?? TableType.BasicTable, 
                        height: "400px"
                    }
                }

                const componentStorageRoot = options?.componentStoragePath ?? 'src/components'
                const generatedFolderPath = options?.generatedFolderPath ?? 'src/generated'
                const routeDefinitionFilePath = options?.routeDefinitionFilePath ?? 'src/routes.tsx'
                const menuDefinitionFilePath = options?.menuDefinitionFilePath ?? 'src/layouts/DashboardLayout/NavBar/index.tsx'

                const entityListComponentPageName = getListPageComponentName(entity)
                const listComponentName = getListComponentName(entity)
                const detailComponentName = getDetailComponentName(entity)
                const detailPageComponentName = getDetailPageComponentName(entity)
                
                const listComponentFilePath = `${componentStorageRoot}/${listComponentName}.tsx`
                const detailComponentFilePath = `${componentStorageRoot}/${detailComponentName}.tsx`
                const listPageComponentFilePath = `${componentStorageRoot}/${entityListComponentPageName}.tsx`
                const detailPageComponentFilePath = `${componentStorageRoot}/${detailPageComponentName}.tsx`
                const entityInterfaceFilePath = `${componentStorageRoot}/${getEntityInterfaceName(entity)}.ts`

                const moduleName = getEntityInterfaceName(entity)
                const listRouteUri = getBaseModuleUri(entity)
                const detailRouteUri = getDetailModuleUri(entity)
                
                //generate graphql queries
                const graphqlQueries = generateGraphqlFile(introspection, typeName)

                if (graphqlQueries != '') 
                    await io.writeFile(`${componentStorageRoot}/${typeName}.graphql`, graphqlQueries)

                //generate component for list
                await generateListComponent(io, 
                                            listComponentFilePath,
                                            entity, 
                                            context)

                //generate page for list component
                await generateListPage(io, 
                                       entity, 
                                       options.pageListTemplate, 
                                       listPageComponentFilePath,
                                       introspection,
                                       generatedFolderPath);

                //generate entity interface
                await generateEntityInterface(io, 
                                              entityInterfaceFilePath, 
                                              entity, 
                                              context)

                //generate detail component
                await generateDetailComponent(io, 
                                              detailComponentFilePath, 
                                              entity, 
                                              context)

                //generate detail page
                await generateDetailPage(io, 
                                         detailPageComponentFilePath, 
                                         options.detailPageTemplate, 
                                         entity, 
                                         introspection)

                //generate route for generated list page
                await addRoute(io,
                               routeDefinitionFilePath, 
                               listRouteUri, 
                               entityListComponentPageName, 
                               listPageComponentFilePath)

                //generate route for generated detail page
                await addRoute(io, 
                               routeDefinitionFilePath, 
                               detailRouteUri, 
                               detailPageComponentName, 
                               detailPageComponentFilePath)

                //generate new menu item for generated list page
                await addNewMenuItem(io,
                                     menuDefinitionFilePath, 
                                     moduleName, 
                                     '/app/' + listRouteUri)
            }
    }))
}

async function generateDetailPage(io: CodeRW,
                                      filePath: string,
                                      pageDetailTemplateSource: string,
                                      entity: Entity,
                                      introspection: IntrospectionQuery) {

    const templateResolver = new DetailPageTemplateResolver(entity, introspection);
    const detailPage = templateResolver.generateDetailPage(pageDetailTemplateSource);

    if(detailPage) {
        const listPageSourceFile = ts.createSourceFile(
            filePath,
            detailPage,
            ts.ScriptTarget.ESNext,
            true,
            ts.ScriptKind.TSX
        )
    
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

        const generatedSourceCode = printer.printFile(listPageSourceFile);

        await io.writeFile(filePath, generatedSourceCode)
    }
}


async function generateListComponent(io: CodeRW, 
                                     filePath: string,
                                     entity: Entity, 
                                     context: GenerationContext) {

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
    
    await io.writeFile(filePath, pageSourceCode)
}

async function generateEntityInterface(io: CodeRW, 
                                       filePath: string,
                                       entity: Entity, 
                                       context: GenerationContext) {

    const generator = new AppGenerator(context, entity)
    const page = generator.generateInterface(/* TODO entity / type name should be input - not in context */)

    const sourceFile = ts.createSourceFile(
        filePath,
        '',
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
    )

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)

    await io.writeFile(filePath, pageSourceCode)
}

async function generateDetailComponent(io: CodeRW, 
                                       filePath: string,
                                       entity: Entity, 
                                       context: GenerationContext) {

    const generator = new AppGenerator(context, entity)
    const page = generator.generateDetailPage(/* TODO entity / type name should be input - not in context */)

    const sourceFile = ts.createSourceFile(
        filePath,
        '',
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
    )

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

    const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)

    await io.writeFile(filePath, pageSourceCode)
}

async function generateListPage(io: CodeRW, 
                                entity: Entity, 
                                pageListTemplateSource: string,
                                listPageFilePath: string,
                                introspection: IntrospectionQuery,
                                generatedFolderPath: string) {
    const templateResolver = new TemplateResolver(entity, introspection);
    const listPage = templateResolver.generateListPage(pageListTemplateSource, generatedFolderPath);

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

        await io.writeFile(listPageFilePath, generatedSourceCode)
    }
}

async function addRoute(io:CodeRW,
                            routeDefinitionFilePath: string,
                            moduleRouteUri: string, 
                            componentName: string,
                            componentFilePath: string){

    const generatedSource  = await generateRoute(
        { 
            routeFilePath: routeDefinitionFilePath, 
            componentName: componentName, 
            componentFilePath: componentFilePath, 
            componentRouteUri: moduleRouteUri
        }, 
        io
    )
    
    if(generatedSource){
        await io.writeFile(routeDefinitionFilePath, generatedSource)
    }
}

async function addNewMenuItem(io:CodeRW, 
                        menuDefinitionFilePath: string,
                        itemTitle: string, 
                        itemUri: string, 
                        icon?: string)
{
    const generatedSource  = await generateMenuItem(
    {
        menuDefinitionFilePath: menuDefinitionFilePath,
        itemTitle: itemTitle,
        itemUri: itemUri,
        itemIcon: icon
    }, 
    io)
    
    if(generatedSource){
        await io.writeFile(menuDefinitionFilePath, generatedSource)
    }
}