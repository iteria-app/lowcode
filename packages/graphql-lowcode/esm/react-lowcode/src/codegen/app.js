import { AppGenerator } from './generation/generators/app-generator';
import { UiFramework, TableType, Formatter } from './definition/context-types';
import ts, { factory } from "typescript";
import { createEntityFromIntrospection } from './generation/entity/index';
import TemplateResolver from './generation/generators/template/template-resolver';
import { generateGraphqlFile } from '@iteria-app/graphql-lowcode/esm/generate';
import { getBaseModuleUri, getDetailComponentName, getDetailModuleUri, getDetailPageComponentName, getEntityInterfaceName, getListComponentName, getListPageComponentName } from './generation/entity/helper';
import { generateMenuItem, generateRoute } from './facade/facadeApi';
import DetailPageTemplateResolver from './generation/generators/template/detail-page';
// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export async function generatePages(introspection, io, options) {
    var _a, _b, _c, _d;
    const entities = options.names.map(name => createEntityFromIntrospection(introspection, name));
    const componentStorageRoot = (_a = options === null || options === void 0 ? void 0 : options.componentStoragePath) !== null && _a !== void 0 ? _a : 'src/components';
    const generatedFolderPath = (_b = options === null || options === void 0 ? void 0 : options.generatedFolderPath) !== null && _b !== void 0 ? _b : 'src/generated';
    const routeDefinitionFilePath = (_c = options === null || options === void 0 ? void 0 : options.routeDefinitionFilePath) !== null && _c !== void 0 ? _c : 'src/routes.tsx';
    const menuDefinitionFilePath = (_d = options === null || options === void 0 ? void 0 : options.menuDefinitionFilePath) !== null && _d !== void 0 ? _d : 'src/layouts/DashboardLayout/NavBar/index.tsx';
    //generate graphql queries
    const graphqlQueries = generateGraphqlFile(introspection, options.names);
    //writes each query into graphql file
    await Promise.all(graphqlQueries.map(async (entity) => {
        if (entity.queries != '')
            await io.writeFile(`${componentStorageRoot}/${entity.entityName}.graphql`, entity.queries);
    }));
    await Promise.all(entities.map(async (entity) => {
        var _a, _b;
        if (entity) {
            let context = {
                uiFramework: (_a = options === null || options === void 0 ? void 0 : options.uiFramework) !== null && _a !== void 0 ? _a : UiFramework.MaterialUI,
                formatter: Formatter.None,
                index: {
                    tableType: (_b = options === null || options === void 0 ? void 0 : options.tableType) !== null && _b !== void 0 ? _b : TableType.BasicTable,
                    height: "400px"
                }
            };
            const entityListComponentPageName = getListPageComponentName(entity);
            const listComponentName = getListComponentName(entity);
            const detailComponentName = getDetailComponentName(entity);
            const detailPageComponentName = getDetailPageComponentName(entity);
            const listComponentFilePath = `${componentStorageRoot}/${listComponentName}.tsx`;
            const detailComponentFilePath = `${componentStorageRoot}/${detailComponentName}.tsx`;
            const listPageComponentFilePath = `${componentStorageRoot}/${entityListComponentPageName}.tsx`;
            const detailPageComponentFilePath = `${componentStorageRoot}/${detailPageComponentName}.tsx`;
            const entityInterfaceFilePath = `${componentStorageRoot}/${getEntityInterfaceName(entity)}.ts`;
            const moduleName = getEntityInterfaceName(entity);
            const listRouteUri = getBaseModuleUri(entity);
            const detailRouteUri = getDetailModuleUri(entity);
            //generate component for list
            await generateListComponent(io, listComponentFilePath, entity, context);
            //generate page for list component
            await generateListPage(io, entity, options.pageListTemplate, listPageComponentFilePath, introspection, generatedFolderPath);
            //generate entity interface
            await generateEntityInterface(io, entityInterfaceFilePath, entity, context);
            //generate detail component
            await generateDetailComponent(io, detailComponentFilePath, entity, context);
            //generate detail page
            await generateDetailPage(io, detailPageComponentFilePath, options.detailPageTemplate, entity, introspection);
            //generate route for generated list page
            await addRoute(io, routeDefinitionFilePath, listRouteUri, entityListComponentPageName, listPageComponentFilePath);
            //generate route for generated detail page
            await addRoute(io, routeDefinitionFilePath, detailRouteUri, detailPageComponentName, detailPageComponentFilePath);
            //generate new menu item for generated list page
            await addNewMenuItem(io, menuDefinitionFilePath, moduleName, '/app/' + listRouteUri);
        }
    }));
}
async function generateDetailPage(io, filePath, pageDetailTemplateSource, entity, introspection) {
    const templateResolver = new DetailPageTemplateResolver(entity, introspection);
    const detailPage = templateResolver.generateDetailPage(pageDetailTemplateSource);
    if (detailPage) {
        const listPageSourceFile = ts.createSourceFile(filePath, detailPage, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        const generatedSourceCode = printer.printFile(listPageSourceFile);
        await io.writeFile(filePath, generatedSourceCode);
    }
}
async function generateListComponent(io, filePath, entity, context) {
    const generator = new AppGenerator(context, entity);
    const page = generator.generateListComponent( /* TODO entity / type name should be input - not in context */);
    const sourceFile = ts.createSourceFile(filePath, '', ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile);
    await io.writeFile(filePath, pageSourceCode);
}
async function generateEntityInterface(io, filePath, entity, context) {
    const generator = new AppGenerator(context, entity);
    const page = generator.generateInterface( /* TODO entity / type name should be input - not in context */);
    const sourceFile = ts.createSourceFile(filePath, '', ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile);
    await io.writeFile(filePath, pageSourceCode);
}
async function generateDetailComponent(io, filePath, entity, context) {
    const generator = new AppGenerator(context, entity);
    const page = generator.generateDetailPage( /* TODO entity / type name should be input - not in context */);
    const sourceFile = ts.createSourceFile(filePath, '', ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile);
    await io.writeFile(filePath, pageSourceCode);
}
async function generateListPage(io, entity, pageListTemplateSource, listPageFilePath, introspection, generatedFolderPath) {
    const templateResolver = new TemplateResolver(entity, introspection);
    const listPage = templateResolver.generateListPage(pageListTemplateSource, generatedFolderPath);
    if (listPage) {
        const listPageSourceFile = ts.createSourceFile(listPageFilePath, listPage, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        const generatedSourceCode = printer.printFile(listPageSourceFile);
        console.log(generatedSourceCode);
        await io.writeFile(listPageFilePath, generatedSourceCode);
    }
}
async function addRoute(io, routeDefinitionFilePath, moduleRouteUri, componentName, componentFilePath) {
    const generatedSource = await generateRoute({
        routeFilePath: routeDefinitionFilePath,
        componentName: componentName,
        componentFilePath: componentFilePath,
        componentRouteUri: moduleRouteUri
    }, io);
    if (generatedSource) {
        await io.writeFile(routeDefinitionFilePath, generatedSource);
    }
}
async function addNewMenuItem(io, menuDefinitionFilePath, itemTitle, itemUri, icon) {
    const generatedSource = await generateMenuItem({
        menuDefinitionFilePath: menuDefinitionFilePath,
        itemTitle: itemTitle,
        itemUri: itemUri,
        itemIcon: icon
    }, io);
    if (generatedSource) {
        await io.writeFile(menuDefinitionFilePath, generatedSource);
    }
}
