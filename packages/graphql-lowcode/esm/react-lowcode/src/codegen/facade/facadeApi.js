import { Formatter, TableType, UiFramework, } from "../definition/context-types";
import { AppContext } from "../generation/context/app-context";
import { PageContext } from "../generation/context/page-context";
import { WidgetContext } from "../generation/context/widget-context";
import MuiDataTableGenerator from "../generation/generators/list/mui-datatable-generator";
import MuiDetailGenerator from "../generation/generators/detail/mui-detail-generator";
import GrommetDataTableGenerator from "../generation/generators/list/grommet-dt-generator";
import { BasicTableGenerator } from "../generation/generators/list/basic-table-generator";
import { generateNewRoute } from "../generation/generators/routes/route-generator";
import { addMenuItem } from "../generation/generators/menu/menu-generator";
export async function insertColumn(tablePosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, tablePosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new MuiDataTableGenerator(generationContext, undefined, widgetContext);
    return await generator.insertColumn(tablePosition, options.entityField, options.index);
}
export async function deleteColumn(tablePosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, tablePosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new MuiDataTableGenerator(generationContext, undefined, widgetContext);
    return await generator.deleteColumn(tablePosition, options.index);
}
export async function insertColumnToDataTableGrommet(tablePosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.Grommet,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, tablePosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new GrommetDataTableGenerator(generationContext, options.entity, widgetContext);
    return await generator.insertColumn(tablePosition, options.entityField, options.index);
}
export async function insertColumnToBasicTableMui(tablePosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.BasicTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, tablePosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new BasicTableGenerator(generationContext, options.entity, widgetContext);
    return await generator.insertColumn(tablePosition, options.entityField, options.index);
}
export async function insertColumnToBasicTableGrommet(tablePosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.Grommet,
        formatter: Formatter.None,
        index: { tableType: TableType.BasicTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, tablePosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new BasicTableGenerator(generationContext, options.entity, widgetContext);
    return await generator.insertColumn(tablePosition, options.entityField, options.index);
}
export async function insertFormWidget(formPosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, formPosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new MuiDetailGenerator(generationContext, options.entity, widgetContext);
    return await generator.insertFormWidget(formPosition, options.entityField, options.index);
}
export async function getColumnSourcePosition(tablePosition, options, io) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, tablePosition.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new MuiDataTableGenerator(generationContext, undefined, widgetContext);
    return await generator.getColumnSourcePosition(tablePosition, options.index);
}
export async function getFormWidgetProperties(position, io) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, position.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new MuiDetailGenerator(generationContext, undefined, widgetContext);
    return await generator.getFormWidgetProperties(position);
}
export async function setFormWidgetProperties(position, io, properties) {
    let generationContext = {
        uiFramework: UiFramework.MaterialUI,
        formatter: Formatter.None,
        index: { tableType: TableType.DataTable, height: "400px" },
    };
    let appContext = new AppContext(generationContext, io);
    let sourceFileContext = new PageContext(appContext, position.fileName);
    let widgetContext = new WidgetContext(sourceFileContext);
    let generator = new MuiDetailGenerator(generationContext, undefined, widgetContext);
    return await generator.setFormWidgetProperties(position, properties);
}
export async function generateRoute(options, io) {
    const routesDefinitionSource = await io.readFile(options.routeFilePath);
    if (routesDefinitionSource) {
        return generateNewRoute(routesDefinitionSource, options.componentRouteUri, options.componentName, options.componentFilePath);
    }
}
export async function generateMenuItem(options, io) {
    const menuDefinitionSource = await io.readFile(options.menuDefinitionFilePath);
    if (menuDefinitionSource) {
        return addMenuItem(menuDefinitionSource, options.itemTitle, options.itemUri, options.itemIcon);
    }
}
