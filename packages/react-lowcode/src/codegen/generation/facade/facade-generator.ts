import { SourceLineCol } from "../../../ast";
import {
  Formatter,
  TableType,
  UiFramework,
} from "../../definition/context-types";
import { Property } from "../entity";
import { parseGraphqlTypes, sourceFileEntity } from "../../tests/helper";
import { graphqlGenTs1 } from "../../tests/typeAlias.example";
import { AppContext } from "../context/app-context";
import { SourceFileContext } from "../context/page-context";
import { WidgetContext } from "../context/widget-context";
import MuiDataTableGenerator from "../generators/list/mui-datatable-generator";
import MuiDetailGenerator from "../generators/detail/mui-detail-generator";

export interface FacadeOptions {
  entityField: Property;
  index?: number;
}

export function insertColumn(
  tablePosition: SourceLineCol,
  options: FacadeOptions
): string {
  let generationContext = {
    uiFramework: UiFramework.MaterialUI,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext);
  let sourceFileContext = new SourceFileContext(
    appContext,
    tablePosition.fileName
  );
  let widgetContext = new WidgetContext(sourceFileContext);

  let generator = new MuiDataTableGenerator(
    generationContext,
    undefined,
    widgetContext
  );
  
  return generator.insertColumn(tablePosition, options.entityField, options.index);
}

export function insertFormWidget(
  componentPosition: SourceLineCol,
  options: FacadeOptions
): string {
  let generationContext = {
    uiFramework: UiFramework.MaterialUI,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext);
  let sourceFileContext = new SourceFileContext(
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

  return generator.insertFormWidget(componentPosition, options.entityField);
}
