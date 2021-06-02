import { SourceLineCol } from "../ast";
import {
  Formatter,
  TableType,
  UiFramework,
} from "./definition/context-types";
import { Property } from "./generation/entity";
import { parseGraphqlTypes, sourceFileEntity } from "./tests/helper";
import { graphqlGenTs1 } from "./tests/typeAlias.example";
import { AppContext } from "./generation/context/app-context";
import { PageContext } from "./generation/context/page-context";
import { WidgetContext } from "./generation/context/widget-context";
import MuiDataTableGenerator from "./generation/generators/list/mui-datatable-generator";
import MuiDetailGenerator from "./generation/generators/detail/mui-detail-generator";

export interface InsertOptions {
  entityField: Property;
  index?: number;
}

export function insertColumn(
  tablePosition: SourceLineCol,
  options: InsertOptions
): string {
  let generationContext = {
    uiFramework: UiFramework.MaterialUI,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext);
  let sourceFileContext = new PageContext(
    appContext,
    tablePosition.fileName
  );
  let widgetContext = new WidgetContext(sourceFileContext);

  //TODO: remove entity
  const myClassFile = parseGraphqlTypes(graphqlGenTs1);
  const testEntity = sourceFileEntity(myClassFile);

  let generator = new MuiDataTableGenerator(
    generationContext,
    testEntity!!,
    widgetContext
  );
  generator.insertColumn(tablePosition, options.entityField, options.index);

  return "";
}

export function insertFormWidget(
  componentPosition: SourceLineCol,
  options: InsertOptions
): string {
  let generationContext = {
    uiFramework: UiFramework.MaterialUI,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext);
  let sourceFileContext = new PageContext(
    appContext,
    componentPosition.fileName
  );
  let widgetContext = new WidgetContext(sourceFileContext);

  const myClassFile = parseGraphqlTypes(graphqlGenTs1);
  const testEntity = sourceFileEntity(myClassFile);

  let generator = new MuiDetailGenerator(
    generationContext,
    testEntity!!,
    widgetContext
  );
  generator.insertFormWidget(componentPosition, options.entityField);

  return "";
}
