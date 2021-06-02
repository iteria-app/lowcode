import { SourceLineCol } from "../../ast";
import {
  Formatter,
  TableType,
  UiFramework,
} from "../definition/context-types";
import { Property } from "../generation/entity";
import sourceFileEntity, { parseGraphqlTypes } from "../tests/helper";
import { graphqlGenTs1 } from "../tests/typeAlias.example";
import { AppContext } from "../generation/context/app-context";
import { PageContext } from "../generation/context/page-context";
import { WidgetContext } from "../generation/context/widget-context";
import MuiDataTableGenerator from "../generation/generators/list/mui-datatable-generator";
import MuiDetailGenerator from "../generation/generators/detail/mui-detail-generator";
import GrommetDataTableGenerator from "../generation/generators/list/grommet-dt-generator";
import { CodeRW } from "../../io";
import { CodegenRw } from "../io/codegenRw";

export interface FacadeOptions {
  entityField: Property;
  index?: number;
}

export async function insertColumn(
  tablePosition: SourceLineCol,
  options: FacadeOptions,
  io: CodeRW
): Promise<string> {
  let generationContext = {
    uiFramework: UiFramework.MaterialUI,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext, io);
  let sourceFileContext = new PageContext(
    appContext,
    tablePosition.fileName
  );
  let widgetContext = new WidgetContext(sourceFileContext);

  let generator = new MuiDataTableGenerator(
    generationContext,
    undefined,
    widgetContext
  );
  
  return await generator.insertColumn(tablePosition, options.entityField, options.index);
}

export async function insertColumnGrommet(
  tablePosition: SourceLineCol,
  options: FacadeOptions,
  io: CodeRW
): Promise<string> {
  let generationContext = {
    uiFramework: UiFramework.Grommet,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext, io);
  let sourceFileContext = new PageContext(
    appContext,
    tablePosition.fileName
  );
  let widgetContext = new WidgetContext(sourceFileContext);

  let generator = new GrommetDataTableGenerator(
    generationContext,
    undefined,
    widgetContext
  );
  
  return await generator.insertColumn(tablePosition, options.entityField, options.index);
}

export async function insertFormWidget(
  componentPosition: SourceLineCol,
  options: FacadeOptions,
  io: CodegenRw
): Promise<string> {
  let generationContext = {
    uiFramework: UiFramework.MaterialUI,
    formatter: Formatter.None,
    index: { tableType: TableType.DataTable, height: "400px" },
  };
  let appContext = new AppContext(generationContext, io);
  let sourceFileContext = new PageContext(
    appContext,
    componentPosition.fileName
  );
  let widgetContext = new WidgetContext(sourceFileContext);

  const myClassFile = parseGraphqlTypes(graphqlGenTs1);
  const testEntity = sourceFileEntity(myClassFile);

  let generator = new MuiDetailGenerator(
    generationContext,
    testEntity!,
    widgetContext
  );

  return await generator.insertFormWidget(componentPosition, options.entityField);
}
