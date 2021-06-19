import ts from "typescript";
import { findByCondition, SourceLineCol } from "../../../ast";
import { Formatter, TableType, UiFramework } from "../../definition/context-types";
import { AppContext } from "../../generation/context/app-context";
import { PageContext } from "../../generation/context/page-context";
import { WidgetContext } from "../../generation/context/widget-context";
import { BasicTableGenerator } from "../../generation/generators/list/basic-table-generator";
import GrommetDataTableGenerator from "../../generation/generators/list/grommet-dt-generator";
import MuiDataTableGenerator from "../../generation/generators/list/mui-datatable-generator";
import { TableGenerator } from "../../generation/generators/list/table-generator-factory";
import { CodegenRw } from "../../io/codegenRw";
import { createAst } from "../helper";

export class TestListHelper {
    private getTestTableGenerator = (tablePosition: SourceLineCol, uiFramework: UiFramework, formatter: Formatter, tableType: TableType): TableGenerator => {
        let generationContext = {
            uiFramework: uiFramework,
            formatter: formatter,
            index: { tableType: tableType, height: "400px" },
        };
        let appContext = new AppContext(generationContext, new CodegenRw());
        let sourceFileContext = new PageContext(
            appContext,
            tablePosition.fileName
        );
        let widgetContext = new WidgetContext(sourceFileContext);

        let generator: TableGenerator = new BasicTableGenerator(
            generationContext,
            undefined,
            widgetContext
        );

        if (tableType === TableType.DataTable) {
            switch (uiFramework) {
                case UiFramework.MaterialUI:
                    generator = new MuiDataTableGenerator(generationContext, undefined, widgetContext);
                    break;
                case UiFramework.Grommet:
                    generator = new GrommetDataTableGenerator(generationContext, undefined, widgetContext);
                    break;
            }
        }

        return generator;
    };

    static getMuiDataTablePosition = (sourceCode: string): SourceLineCol => {
        let result: SourceLineCol = {
            lineNumber: 0, 
            columnNumber: 0,
            fileName: ''
        };
        
        const ast = createAst(sourceCode);
        const dataGridElement = findByCondition<ts.JsxSelfClosingElement>(ast, (node) => {
            if(ts.isJsxSelfClosingElement(node)) {
                if(ts.isIdentifier(node.tagName)) {
                    return node.tagName.escapedText === 'DataGrid';
                }
            }
            return false;
        });

        if(dataGridElement) {
            const position = ast.getLineAndCharacterOfPosition(dataGridElement.getStart());

            result = {
                lineNumber: position.line + 1, 
                columnNumber: position.character + 1,
                fileName: ''
            };
        }

        return result;
    }

    static getMuiDataTableColumnNames = (sourceCode: string, tablePosition: SourceLineCol): string[] => {
        const result: string[] = [];

        let generationContext = {
            uiFramework: UiFramework.MaterialUI,
            formatter: Formatter.None,
            index: { tableType: TableType.DataTable, height: "400px" },
        };

        const generator = new MuiDataTableGenerator(generationContext);
        const columnArrayLiteralExpression = generator.getColumnsDeclaration(sourceCode, tablePosition);

        if (columnArrayLiteralExpression) {
            columnArrayLiteralExpression.elements.forEach(element => {
                if (ts.isObjectLiteralExpression(element)) {
                    element.properties.forEach(prop => {
                        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && ts.isStringLiteral(prop.initializer)) {
                            if (prop.name.escapedText === 'field') {
                                result.push(prop.initializer.text);
                            }
                        }
                    });
                }
            });
        }

        return result;
    }
}
