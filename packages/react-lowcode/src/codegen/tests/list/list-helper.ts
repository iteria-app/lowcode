import ts from "typescript";
import { findByCondition, SourceLineCol } from "../../../ast";
import { Formatter, TableType, UiFramework } from "../../definition/context-types";
import { MuiTableComponents } from "../../definition/material-ui/table";
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
            if (ts.isJsxSelfClosingElement(node)) {
                if (ts.isIdentifier(node.tagName)) {
                    return node.tagName.escapedText === 'DataGrid';
                }
            }
            return false;
        });

        if (dataGridElement) {
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

    static getMuiBasicTableHeaderColumnValues = (sourceCode: string): string[] => {
        const result: string[] = [];

        const tableDefinition = MuiTableComponents;
        const ast = createAst(sourceCode);
        const table = TestListHelper.findJsxElementByName(ast, tableDefinition.table.tagName.text);

        if (table) {
            const tableHead = TestListHelper.findJsxElementByName(table, tableDefinition.header.tagName.text);

            if(tableHead) {
                const tableHeadRow = TestListHelper.findJsxElementByName(tableHead, tableDefinition.row.tagName.text);

                if(tableHeadRow) {
                    const headColumns: ts.JsxElement[] = [];
                    TestListHelper.findJsxElementsByName(tableHeadRow, tableDefinition.cell.tagName.text, headColumns);
                    
                    headColumns.forEach(item => {
                        if(ts.isJsxOpeningElement(item.openingElement) && ts.isJsxClosingElement(item.closingElement)) {
                            const formattedMessageElement = TestListHelper.findJsxElementByName(item, 'FormattedMessage');
                            if(formattedMessageElement) {
                                const idAttribute = TestListHelper.findJsxAttributeByName(formattedMessageElement, 'id');
                                if(idAttribute) {
                                    const value = TestListHelper.getJsxAttributeStringValue(idAttribute);
                                    if(value) {
                                        const valueSplit = value.split('.');
                                        if(valueSplit.length === 2) {
                                            result.push(valueSplit[1]);
                                        }
                                    }
                                }
                            } else {
                                if(item.children.length === 1) {
                                    if(ts.isJsxText(item.children[0])) {
                                        result.push(item.children[0].text);
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }

        return result;
    }

    static getMuiBasicTableBodyColumnValues = (sourceCode: string): string[] => {
        const result: string[] = [];

        const tableDefinition = MuiTableComponents;
        const ast = createAst(sourceCode);
        const table = TestListHelper.findJsxElementByName(ast, tableDefinition.table.tagName.text);

        if (table) {
            const tableBody = TestListHelper.findJsxElementByName(table, tableDefinition.body.tagName.text);

            if(tableBody) {
                const tableBodyRow = TestListHelper.findJsxElementByName(tableBody, tableDefinition.row.tagName.text);

                if(tableBodyRow) {
                    const headColumns: ts.JsxElement[] = [];
                    TestListHelper.findJsxElementsByName(tableBodyRow, tableDefinition.cell.tagName.text, headColumns);
                    
                    headColumns.forEach(item => {
                        if(ts.isJsxOpeningElement(item.openingElement) && ts.isJsxClosingElement(item.closingElement)) {
                            if(item.children.length === 1) {
                                if(ts.isJsxExpression(item.children[0]) && item.children[0].expression) {
                                    if(ts.isPropertyAccessExpression(item.children[0].expression)) {
                                        result.push(item.children[0].expression.getText());
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }

        return result;
    }

    private static findJsxElementByName(node: ts.Node, name: string): ts.Node | undefined {
        if (ts.isJsxElement(node)) {
            if (ts.isIdentifier(node.openingElement.tagName)) {
                if (node.openingElement.tagName.escapedText === name) {
                    return node;
                }
            }
        } else if (ts.isJsxSelfClosingElement(node)) {
            if (ts.isIdentifier(node.tagName)) {
                if (node.tagName.escapedText === name) {
                    return node;
                }
            }
        }

        return node.forEachChild((child) => {
            return this.findJsxElementByName(child, name);
        });
    }

    private static findJsxElementsByName(node: ts.Node, name: string, output: ts.JsxElement[]): void {
        if (ts.isJsxElement(node)) {
            if (ts.isIdentifier(node.openingElement.tagName)) {
                if (node.openingElement.tagName.escapedText === name) {
                    output.push(node);
                }
            }
        }

        node.forEachChild((child) => {
            this.findJsxElementsByName(child, name, output);
        });
    }

    private static findJsxAttributeByName(node: ts.Node, name: string): ts.JsxAttribute | undefined {
        if (ts.isJsxAttribute(node)) {
            if(node.name.escapedText.toString() === name) {
                return node;
            }
        }

        return node.forEachChild((child) => {
            return this.findJsxAttributeByName(child, name);
        });
    }

    private static getJsxAttributeStringValue(attribute: ts.JsxAttribute): string | undefined {
        if (attribute.initializer) {
            if (ts.isStringLiteral(attribute.initializer)) {
                return attribute.initializer.text;
            } 
        }
    }
}
