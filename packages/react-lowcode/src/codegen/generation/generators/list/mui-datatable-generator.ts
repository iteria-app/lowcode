import ts, { factory, SourceFile, PropertyAssignment, Node, ImportDeclaration, Identifier, NodeArray, Statement } from "typescript"
import { createFunctionalComponent, PageComponent } from '../../react-components/react-component-helper'
import { Entity, getProperties, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import GenerationContext from "../../context/context"
import { MuiDtTableComponents, muiDataGrid, intl } from '../../../definition/material-ui/table'
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core'
import { Formatter } from "../../../definition/context-types"
import { createNameSpaceImport, uniqueImports } from "../../../ast/imports"
import { GeneratorHelper } from "../helper"
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter"
import { WidgetContext } from "../../context/widget-context"
import { createAst, findByCondition, removeElementFromAst, replaceElementsToAST, SourceLineCol } from "../../../../ast"
import { findVariableDeclarations } from "../../../ast/ast"
import { findWidgetParentNode } from "../../../ast/widgetDeclaration"
import { ColumnSourcePositionResult } from "../../../interfaces"

export default class MuiDataTableGenerator implements TableGenerator 
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
  
    async insertColumn(tablePosition: SourceLineCol,
      property: Property,
      columnIndex?: number): Promise<string> {
      let alteredSource = '';

      if (this._widgetContext) {
        const sourceCode = await this._widgetContext.getSourceCodeString(tablePosition);

        let ast = createAst(sourceCode);
        if (ast) {
          const columnDeclarationArray = this.getColumnsDeclaration(sourceCode, tablePosition);

          if (columnDeclarationArray) {
            ast = this.addNewColumn(columnDeclarationArray,
              property,
              ast,
              columnIndex)
          }

          alteredSource = this.printSourceCode(ast);
        }
      }

      return alteredSource;
    }

    async deleteColumn(tablePosition: SourceLineCol, columnIndex: number): Promise<string> {
      let alteredSource = '';

      if (this._widgetContext) {
        const sourceCode = await this._widgetContext.getSourceCodeString(tablePosition);

        let ast = createAst(sourceCode);
        if (ast) {
          const columnDeclarationArray = this.getColumnsDeclaration(sourceCode, tablePosition);

          if (columnDeclarationArray?.elements[columnIndex]) {
            ast = removeElementFromAst(ast, columnDeclarationArray.elements[columnIndex].pos);
          }

          alteredSource = this.printSourceCode(ast);
        }
      }

      return alteredSource;
    }

    async getColumnSourcePosition(tablePosition: SourceLineCol, columnIndex: number): Promise<ColumnSourcePositionResult | undefined> {
      let result: ColumnSourcePositionResult | undefined;

      if (this._widgetContext) {
        const sourceCode = await this._widgetContext.getSourceCodeString(tablePosition);

        let ast = createAst(sourceCode);
        if (ast) {
          const columnDeclarationArray = this.getColumnsDeclaration(sourceCode, tablePosition);

          if (columnDeclarationArray?.elements[columnIndex]) {
            let renderHeaderPosition, valueFormatterPosition;
            const columnPosition = ast.getLineAndCharacterOfPosition(columnDeclarationArray.elements[columnIndex].getStart());

            const renderHeader = findByCondition<PropertyAssignment>(columnDeclarationArray.elements[columnIndex], (node: Node) => {
              if (ts.isPropertyAssignment(node)) {
                if (ts.isIdentifier(node.name)) {
                  return node.name.escapedText === 'renderHeader';
                }
              }
              return false;
            });

            const valueFormatter = findByCondition<PropertyAssignment>(columnDeclarationArray.elements[columnIndex], (node: Node) => {
              if (ts.isPropertyAssignment(node)) {
                if (ts.isIdentifier(node.name)) {
                  return node.name.escapedText === 'valueFormatter';
                }
              }
              return false;
            });

            if (renderHeader) {
              renderHeaderPosition = ast.getLineAndCharacterOfPosition(renderHeader.getStart());
            }

            if (valueFormatter) {
              valueFormatterPosition = ast.getLineAndCharacterOfPosition(valueFormatter.getStart());
            }

            result = {
              columnPosition: {
                fileName: tablePosition.fileName,
                columnNumber: columnPosition.character + 1,
                lineNumber: columnPosition.line + 1,
                length: columnDeclarationArray.elements[columnIndex].getText().length
              },
              headerPosition: renderHeader && renderHeaderPosition ? {
                fileName: tablePosition.fileName,
                columnNumber: renderHeaderPosition.character + 1,
                lineNumber: renderHeaderPosition.line + 1,
                length: renderHeader.getText().length
              } : undefined,
              valuePosition: valueFormatter && valueFormatterPosition ? {
                fileName: tablePosition.fileName,
                columnNumber: valueFormatterPosition.character + 1,
                lineNumber: valueFormatterPosition.line + 1,
                length: valueFormatter.getText().length
              } : undefined
            };
          }
        }
      }

      return result;
    }

    getColumnsDeclaration(sourceCode: string, tablePosition: SourceLineCol): ts.ArrayLiteralExpression | undefined {
      let result: ts.ArrayLiteralExpression | undefined;

      let widgetParentNode = findWidgetParentNode(sourceCode, tablePosition)

      if (widgetParentNode) {
        let columnsDeclarationNode = this.findColumnsDeclaration(widgetParentNode)

        if (columnsDeclarationNode) {
          result = columnsDeclarationNode.getChildAt(2) as ts.ArrayLiteralExpression;
        }
      }

      return result;
    }

    private printSourceCode(sourceFile: SourceFile): string{
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
      return printer.printFile(sourceFile)
    }

    private addNewColumn(columnDeclarationParent: ts.ArrayLiteralExpression, 
                          property: Property, 
                          ast:SourceFile,
                          columnIndex?: number): ts.SourceFile{

      const newColumnsDefinition = this.getNewColumnsDeclaration(columnDeclarationParent, 
                                                                property, 
                                                                columnIndex)

      return replaceElementsToAST(ast, 
        columnDeclarationParent.pos, 
        factory.createArrayLiteralExpression(newColumnsDefinition))
    }

    private getNewColumnsDeclaration(columnDeclarationParent: ts.ArrayLiteralExpression, 
      property: Property,
      columnIndex?: number): ts.Expression[]{
        let newElements: ts.Expression[] = []
        let oldElements = columnDeclarationParent.elements
        
        let newColumnDefinition = this.createNewDataGridColumn(property) as ts.ObjectLiteralExpression // this.createColumnDefinition(property, this.getUsedFormatter(columnDeclarationParent))

        if(columnIndex && columnIndex > 0 && columnIndex < oldElements.length + 1){
          newElements = [...oldElements.slice(0, columnIndex-1), 
                         newColumnDefinition, 
                         ...oldElements.slice(columnIndex-1)]
        }else{
          newElements = [...oldElements, newColumnDefinition]
        }

        return newElements
    }

    private getUsedFormatter(columnsDefinition:  ts.ArrayLiteralExpression): Formatter {
        return columnsDefinition.elements.length === 0 ? Formatter.None 
                                                       : (columnsDefinition.elements[0] as ts.ObjectLiteralExpression).properties.length > 3 
                                                          ? Formatter.ReactIntl 
                                                          : Formatter.None
    }

    private findColumnsDeclaration(widgetParent: ts.Node): ts.VariableDeclaration | undefined{
      let array: ts.VariableDeclaration[] = []
      findVariableDeclarations(widgetParent, array)

       if(array.length > 0){
         let columnDeclaration = array.filter((def: ts.VariableDeclaration) => {
           return def.getChildAt(0).getFullText().trim() === 'columns'
         });
        
         if(columnDeclaration && columnDeclaration.length > 0){
           return columnDeclaration[0] as ts.VariableDeclaration
         }
       }

       return undefined
    }
    
    generateTableComponent(): PageComponent | undefined {
      if(this._entity){
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent(this._helper.getComponentName(this._entity), 
                                                            [this._helper.createInputParameter(this._entity)], 
                                                            statements);

        this._imports = [...this._imports, ...this._intlFormatter.getImports()]

        var uniqueFileImports = uniqueImports(this._imports)
        uniqueFileImports.push(createNameSpaceImport('React', 'react'))
        
        return {functionDeclaration: functionalComponent, imports: uniqueFileImports};
      }else return undefined
    }

    getTableDefinition() : TableComponentDefinitionBase {
        return MuiDtTableComponents;
    }

    private createStatements(): ts.Statement[] {
      let statements = new Array<ts.Statement>()

      if(this._context.formatter === Formatter.ReactIntl){
        statements.push(this._intlFormatter.getImperativeHook())
      }

      let columnsIdentifier = factory.createIdentifier("columns")
      let columnsDeclaration = this.createColumns(columnsIdentifier)

      statements.push(factory.createVariableStatement(undefined, columnsDeclaration))

      const value = this._helper.getInputParameterIdentifier(this._entity!)

      let returnStatement = this.createReturnStatement((columnsDeclaration.declarations[0].name as any).escapedText, value.escapedText)

      statements.push(returnStatement)

      return statements;
    }

    private createReturnStatement(columns: string, rows: any):ts.ReturnStatement {
      const table = this.createTemplateForDataGrid(columns, rows)      
      
      const test = factory.createJsxElement(
        this.createTable(table) as any,
        [],
        undefined as any
      )

      return factory.createReturnStatement(factory.createParenthesizedExpression(test))
    }

    private createColumns(columnsIdentifier: ts.Identifier):ts.VariableDeclarationList {
      let propertiesColumnDefinitions = Array<ts.ObjectLiteralExpression>()

      getProperties(this._entity!).forEach(property => {
        const column = this.createNewDataGridColumn(property)
        if (column)
          propertiesColumnDefinitions.push(column) // this.createColumnDefinition(property, this._context.formatter??Formatter.None)
      });
      
      return factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          columnsIdentifier,
          undefined,
          undefined,
          factory.createArrayLiteralExpression(
            propertiesColumnDefinitions,
            true
          )
        )],
        ts.NodeFlags.Const
      )
    }

    private createNewDataGridColumn(
      property: Property
    ): ts.ObjectLiteralExpression | undefined {

      const template = this.createTemplateForColumn(property)
      if (template) {
        const tree = createAst(template)
        if (tree) {
          const columnElement = findByCondition<ts.JsxChild>(tree, (node: ts.Node) => {
            return  ts.isJsxText(node) || ts.isJsxExpression(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node) || ts.isBlock(node);
          })
          if (columnElement) {
            this.clearNodePosition(columnElement)
            return this.createLiteralGridColumn(columnElement)
          }
        }
      }
      return undefined
    }


    private createTemplateForColumn(property: Property) {
      const name = property.getName()
      const type = property.getType() as any

      let template = ``
      switch(type.getText()) {
        case("string"):
        case("number"):
        case("boolean"):
          template = `{ field: "${name}" flex: ${1} type: "${type.getText()}" valueFormatter: ({ value }) => value renderHeader: ${this.renderHeaderTemplate(property)}}`
          break
        case("date"):
        case("any"):
          template = `{ field: "${name}" flex: ${1} type: "${type.getText()}" valueFormatter: ({ value }) => intl.formatDate(value) renderHeader: ${this.renderHeaderTemplate(property)}}`
          break
        case("dateTime"):
          template = `{ field: "${name}" flex: ${1} type: "${type.getText()}" valueFormatter: ({ value }) => intl.formatDate(value) + ", " + intl.formatTime(value) renderHeader: ${this.renderHeaderTemplate(property)}}`
          break
        default:
          template = ''
      }
      
      return template
    }

    private clearNodePosition = (node: ts.Node): void => {
      ts.setTextRange(node, { pos: -1, end: -1 });
  
      node.forEachChild((child: ts.Node) => {
          this.clearNodePosition(child);
      });
    }


    private createLiteralGridColumn(element: any) {
      let el : any = []
      for (let i in element.statements) {
        if (element.statements[i].kind !== undefined) {
          el.push(
            factory.createPropertyAssignment(
              element.statements[i].label.escapedText,
              element.statements[i].statement.expression
            )
          )
        }
      }

      return factory.createObjectLiteralExpression(
        el,
        false
      )
    }

    private renderHeaderTemplate(property: Property) {
      let declaration = this._helper.addImportDeclaration('GridColParams', muiDataGrid)
      this._imports.push(declaration)
      declaration = this._helper.addImportDeclaration('FormattedMessage', intl)
      this._imports.push(declaration)
      return `(params : GridColsParams) => (<FormattedMessage id="${this._entity?.getName()}" defaultMessage="${property.getName()}"/>)`
    }

    public createTemplateForDataGrid(columns: string, rows: string) {
      let declaration = this._helper.addImportDeclaration('DataGrid', muiDataGrid)
      this._imports.push(declaration)

      let template = `<DataGrid columns={${columns}} rows={${rows}}/>`
      return template
    }

    public createTable(dataGrid: string) {
      return this.createTemplateForWrapper(dataGrid)
    }

    private createTemplateForWrapper(dataGrid: string) {
      return factory.createIdentifier(`<div style={{ height: "400px", width: "100%" }}>${dataGrid}</div>`)
    }
}