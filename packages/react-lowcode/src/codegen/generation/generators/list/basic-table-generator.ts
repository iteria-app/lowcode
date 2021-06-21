import ts, { factory, ImportDeclaration, ImportSpecifier, SourceFile } from "typescript"
import { createJsxElement, PageComponent, createFunctionalComponent } from '../../react-components/react-component-helper'
import { Entity, getProperties, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinition } from '../../../definition/table-definition-core'
import { MuiTableComponents } from '../../../definition/material-ui/table'
import { GrommetTableComponents } from '../../../definition/grommet/table'
import GenerationContext from "../../context/context"
import { Formatter, UiFramework } from "../../../definition/context-types"
import { uniqueImports } from "../../../ast/imports"
import { GeneratorHelper } from "../helper"
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter"
import { createAst, replaceElementsToAST, SourceLineCol } from "../../../../ast"
import { WidgetContext } from "../../context/widget-context"
import { findWidgetParentNode } from "../../../ast/widgetDeclaration"

export class BasicTableGenerator implements TableGenerator
{
    private readonly _helper: GeneratorHelper
    private _imports: ts.ImportDeclaration[] = []
    private _context: GenerationContext
    private _entity?: Entity
    private _intlFormatter: ReactIntlFormatter
    private _widgetContext: WidgetContext | undefined

    constructor(generationContext: GenerationContext, entity?: Entity, widgetContext?: WidgetContext) {
       this._helper = new GeneratorHelper(generationContext, this._imports)
       this._context = generationContext
       this._entity = entity
       this._widgetContext = widgetContext
       this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports)
    }

    async insertColumn(position: SourceLineCol,
        property: Property,
        columnIndex?: number): Promise<string> {

        let alteredSource = ''
        if (this._widgetContext) {
            let sourceCode = await this._widgetContext.getSourceCodeString(position);
            let ast = createAst(sourceCode);

            if (ast) {
                let widgetParentNode = findWidgetParentNode(sourceCode, position);

                if (widgetParentNode) {
                    const tableDefinition = this.getTableDefinition();

                    const table = this.findElementByName(widgetParentNode, tableDefinition.table.tagName.text);
                    if (table) {
                        const tableHead = this.findElementByName(table, tableDefinition.header.tagName.text);
                        const tableBody = this.findElementByName(table, tableDefinition.body.tagName.text);

                        if (tableHead && tableBody) {
                            const tableHeadRow = this.findElementByName(tableHead, tableDefinition.row.tagName.text);
                            const tableBodyRow = this.findElementByName(tableBody, tableDefinition.row.tagName.text);

                            if (tableHeadRow && tableBodyRow) {
                                this._context.formatter = this.findUsedFormatter(ast);

                                let headColumns: ts.JsxElement[] = [];
                                let bodyColumns: ts.JsxElement[] = [];

                                this.findElementsByName(tableHeadRow, tableDefinition.cell.tagName.text, headColumns);
                                this.findElementsByName(tableBodyRow, tableDefinition.cell.tagName.text, bodyColumns);

                                if (!this.tableBodyColumnExists(bodyColumns, property)) {
                                    const addHeaderColumn = this.propertyHead(property, this._entity!);
                                    const addBodyColumn = this.propertyCell(property, this._entity!);

                                    if (columnIndex && columnIndex > 0 && columnIndex < headColumns.length + 1) {
                                        headColumns = [...headColumns.slice(0, columnIndex - 1), ...[addHeaderColumn], ...headColumns.slice(columnIndex - 1)];
                                        bodyColumns = [...bodyColumns.slice(0, columnIndex - 1), ...[addBodyColumn], ...bodyColumns.slice(columnIndex - 1)];
                                    } else {
                                        headColumns.push(addHeaderColumn);
                                        bodyColumns.push(addBodyColumn);
                                    }

                                    const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports);
                                    const headerRow = createJsxElement(rowComponent.tagName, [], headColumns);
                                    const bodyRow = createJsxElement(rowComponent.tagName, [], bodyColumns);

                                    ast = replaceElementsToAST(ast, tableHeadRow.pos, headerRow);
                                    ast = replaceElementsToAST(ast, tableBodyRow.pos, bodyRow);

                                    alteredSource = this.printSourceCode(ast);
                                    return alteredSource;
                                }
                            }
                        }
                    }
                }
            }
        }

        return alteredSource;
    }

    generateTableComponent(): PageComponent | undefined {
      if(this._entity){
        var statements = this. createStatements()
        var functionalComponent = createFunctionalComponent(this._helper.getComponentName(this._entity!), [this._helper.createInputParameter(this._entity!)], statements)

        this._imports = [...this._imports, ...this._intlFormatter.getImports()]

        return {imports: uniqueImports(this._imports), functionDeclaration: functionalComponent}
      }
        
      return undefined
    }

    private createStatements(): ts.Statement[] {
      let statements = new Array<ts.Statement>()

      const tableComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports)
        
      let table = createJsxElement(tableComponent.tagName, [],
          [
              this.createHeader(),
              this.mapArrayToTableRows(
                  this.createBodyRow()
              )
          ]
      )

      var returnStatement = factory.createReturnStatement(table);
      statements.push(returnStatement)

      return statements;
    }

    private createHeader(): ts.JsxChild {
      const headerComponent = this._helper.prepareComponent(this.getTableDefinition().header, this._imports);
      const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports)

      let headerRow = createJsxElement(rowComponent.tagName, [], getProperties(this._entity!)
                      .map((prop) => this.propertyHead(prop, this._entity!)))

      let tableHeader = createJsxElement(headerComponent.tagName, [], [headerRow])

      return tableHeader
    }

    private createBodyRow(): ts.JsxElement {
      const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports)

      let bodyRow = createJsxElement(rowComponent.tagName, [],getProperties(this._entity!)
                       ?.map(prop => this.propertyCell(prop, this._entity!)))

      return bodyRow
    }

    getTableDefinition() : TableComponentDefinition {
        if(this._context.uiFramework === UiFramework.Grommet){
            return GrommetTableComponents
        } else if(this._context.uiFramework === UiFramework.MaterialUI){
            return MuiTableComponents
        } else{
            console.log('Unsupported ui framework for generation basic table')
            throw new Error('Unsupported ui framework for generation basic table')
        }
    }

    private propertyHead(prop: Property, entity: Entity) {
        let child = this._helper.getHeaderTitleJsxText(this._entity!, prop);

        return createJsxElement(this._helper.prepareComponent(this.getTableDefinition().cell, this._imports).tagName, 
                                                      [],
                                                      [child]
        )
    }
    
    private propertyCell(prop: Property, entity: Entity) {
        let child: ts.JsxChild;

        if(this._context.formatter === Formatter.ReactIntl) {
            child = this.formatCellWithTag(prop)
        }else{
            child = factory.createJsxExpression(
                undefined,
                factory.createPropertyAccessExpression(
                  this.getRowIdentifier(),
                  factory.createIdentifier(prop.getName())
                )
              )
        }

        return createJsxElement(this._helper.prepareComponent(this.getTableDefinition().cell, this._imports).tagName, 
                                                      [],            
                                                      [child])
    }

    private formatCellWithTag(prop: Property): ts.JsxChild {
       const propertyAccess = factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(
          this.getRowIdentifier(),
          factory.createIdentifier(prop.getName())
       ))

       var formattedChild = this._intlFormatter.tryFormatPropertyUsingTag(prop, propertyAccess)

       let child: ts.JsxChild

       if(formattedChild){
        child = formattedChild
       } else{
           child = propertyAccess
       }

      return child
    }

    private mapArrayToTableRows(body: ts.ConciseBody) {
        const bodyComponent = this._helper.prepareComponent(this.getTableDefinition().body, this._imports);

        return createJsxElement(bodyComponent.tagName, [], 
        [factory.createJsxExpression(undefined,
            factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    this._helper.getInputParameterIdentifier(this._entity!),
                    factory.createIdentifier("map")
                ),
                undefined,
                [factory.createArrowFunction(
                    undefined,
                    undefined,
                    [factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        undefined,
                        this.getRowIdentifier(),
                        undefined,
                        undefined,
                        undefined
                    )],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    body
                )]
            )
        )])
    }

    protected getRowIdentifier() : ts.Identifier {
        return factory.createIdentifier(this._helper.getEntityName(this._entity!))
    }

    private printSourceCode(sourceFile: SourceFile): string {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
        return printer.printFile(sourceFile)
    }

    private findElementByName(node: ts.Node, name: string): ts.Node | undefined {
        if (node.kind === ts.SyntaxKind.JsxElement) {
            if (ts.isJsxElement(node)) {
                if (ts.isIdentifier(node.openingElement.tagName)) {
                    if (node.openingElement.tagName.escapedText === name) {
                        return node;
                    }
                }
            }
        }

        return node.forEachChild((child) => {
            return this.findElementByName(child, name);
        });
    }

    private findElementsByName(node: ts.Node, name: string, output: ts.JsxElement[]): void {
        if (node.kind === ts.SyntaxKind.JsxElement) {
            if (ts.isJsxElement(node)) {
                if (ts.isIdentifier(node.openingElement.tagName)) {
                    if (node.openingElement.tagName.escapedText === name) {
                        output.push(node);
                    }
                }
            }
        }

        node.forEachChild((child) => {
            this.findElementsByName(child, name, output);
        });
    }

    private findUsedFormatter(node: ts.Node): Formatter {
        var result = Formatter.None;

        var reactIntlImport = this.find<ImportDeclaration>(node.getSourceFile(), (node) => {
            if (ts.isImportDeclaration(node)) {
                if (ts.isStringLiteral(node.moduleSpecifier)) {
                    if (node.moduleSpecifier.text === 'react-intl') {
                        return true;
                    }
                }
            }
            return false;
        });

        if(reactIntlImport) {
            var importSpecifier = this.find<ImportSpecifier>(reactIntlImport, (node) => {
                if(ts.isImportSpecifier(node)) {
                    if(node.name.escapedText === 'FormattedMessage') {
                        return true;
                    }
                }
                return false;
            });

            if(importSpecifier) {
                var formattedMessageElementName = importSpecifier.propertyName?.escapedText || importSpecifier.name.escapedText;

                var formattedMessageElement = this.find(node, (node) => {
                    if (ts.isJsxSelfClosingElement(node)) {
                        if (ts.isIdentifier(node.tagName)) {
                            if (node.tagName.escapedText === formattedMessageElementName) {
                                return true;
                            }
                        }
                    } else if(ts.isJsxElement(node)) {
                        if (ts.isIdentifier(node.openingElement.tagName)) {
                            if (node.openingElement.tagName.escapedText === formattedMessageElementName) {
                                return true;
                            }
                        }
                     
                    }
                    return false;
                });

                if(formattedMessageElement) {
                    result = Formatter.ReactIntl;
                }
            }
        }

        return result;
    }

    private find<T>(node: ts.Node, check: (node: ts.Node) => boolean): T | undefined {
        if(check(node)) {
            return node as unknown as T;
        };

        return node.forEachChild((child) => {
            return this.find<T>(child, check);
        });
    }

    private findTableBodyColumnIds(nodes: ts.Node[] | ts.JsxElement[], output: string[]): void {
        nodes.forEach(node => {
            if (ts.isJsxExpression(node)) {
                if(node.expression) {
                    if(ts.isPropertyAccessExpression(node.expression)) {
                        if(ts.isIdentifier(node.expression.name)) {
                            output.push(node.expression.name.escapedText.toString());
                        } 
                    }
                }
            }

            node.forEachChild((child) => {
                this.findTableBodyColumnIds([child], output);
            });
        });
    }

    private tableBodyColumnExists(tableBodyColumns: ts.JsxElement[], property: Property) {
        const existsColumnIds: string[] = [];
        this.findTableBodyColumnIds(tableBodyColumns, existsColumnIds);
        return existsColumnIds.indexOf(property.getName()) > -1;
    }
}



