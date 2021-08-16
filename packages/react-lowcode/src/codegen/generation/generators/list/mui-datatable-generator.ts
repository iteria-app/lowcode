import ts, { factory, SourceFile, PropertyAssignment, Node, ImportDeclaration, Identifier, NodeArray, Statement } from "typescript"
import { getPropertyType, PropertyType } from '../../graphql/typeAlias'
import { createFunctionalComponent, PageComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper'
import { Entity, getProperties, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import GenerationContext from "../../context/context"
import { MuiDtTableComponents, muiDataGrid } from '../../../definition/material-ui/table'
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
import { getListComponentName } from "../../entity/helper"

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
      
        let newColumnsDefinition = this.getNewColumnsDeclaration(columnDeclarationParent, 
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
        
        let newColumnDefinition = this.createColumnDefinition(property, this.getUsedFormatter(columnDeclarationParent))
        
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
        var functionalComponent = createFunctionalComponent(getListComponentName(this._entity), 
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

      var columnsAttribute = createJsxAttribute("columns", "columns")
      statements.push(factory.createVariableStatement(undefined, columnsDeclaration))

      var rowsAttribute = createJsxAttribute("rows", this._helper.getInputParameterIdentifier(this._entity!))

      let returnStatement = this.createReturnStatement([columnsAttribute, rowsAttribute])

      statements.push(returnStatement)

      return statements;
    }

    private createReturnStatement(parameters: ts.JsxAttributeLike[]):ts.ReturnStatement {
      var dataGridComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports);

      let wrappedTable = this.createTableWrapper(createJsxSelfClosingElement(dataGridComponent.tagName, parameters))

      return factory.createReturnStatement(factory.createParenthesizedExpression(wrappedTable))
    }

    private createTableWrapper(datagrid:ts.JsxSelfClosingElement) {
      return factory.createJsxElement(
        factory.createJsxOpeningElement(
          factory.createIdentifier("div"),
          undefined,
          factory.createJsxAttributes([factory.createJsxAttribute(
            factory.createIdentifier("style"),
            factory.createJsxExpression(
              undefined,
              factory.createObjectLiteralExpression(
                [
                  factory.createPropertyAssignment(
                    factory.createIdentifier("height"),
                    factory.createStringLiteral(this._context?.index?.height ?? "400px")
                  ),
                  factory.createPropertyAssignment(
                    factory.createIdentifier("width"),
                    factory.createStringLiteral("100%")
                  )
                ],
                false
              )
            )
          )])
        ),
        [
          factory.createJsxText(
            "\
            ",
            true
          ),
          datagrid,
          factory.createJsxText(
            "\
          ",
            true
          )
        ],
        factory.createJsxClosingElement(factory.createIdentifier("div"))
      )
    }

    private createColumns(columnsIdentifier: ts.Identifier):ts.VariableDeclarationList {
      let propertiesColumnDefinitions = Array<ts.ObjectLiteralExpression>()

      getProperties(this._entity!).forEach(property => {
        propertiesColumnDefinitions.push(this.createColumnDefinition(property, this._context.formatter??Formatter.None))
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

    private createColumnDefinition(property: Property, formatter: Formatter): ts.ObjectLiteralExpression {
      let propertyName = property.getName()
      let propType: PropertyType = getPropertyType(property)
      let muiColumnType = 'string'

      //TODO: datetime is not working for numbers, find out why
      switch(propType) {
        case PropertyType.currency:
        case PropertyType.numeric:
          muiColumnType = 'number'
          break
        case PropertyType.date:
        case PropertyType.datetime:
          muiColumnType = 'date'
          break
      }

      let properties : ts.ObjectLiteralElementLike[] = 
      [ 
        factory.createPropertyAssignment(
        factory.createIdentifier("field"),
        factory.createStringLiteral(propertyName)
        ),
        factory.createPropertyAssignment(
          factory.createIdentifier("flex"),
          factory.createNumericLiteral(1)
          ),
        factory.createPropertyAssignment(
          factory.createIdentifier("type"),
          factory.createStringLiteral(muiColumnType)
        )
      ];

      if(formatter === Formatter.ReactIntl){
        properties.push(factory.createPropertyAssignment(
          factory.createIdentifier("valueFormatter"),
          this.getValueFormatter(property)
        ))

        properties.push(factory.createPropertyAssignment(
          factory.createIdentifier("renderHeader"),
          this.getHeaderRender(property)
        ))
      }else{
        properties.push(factory.createPropertyAssignment(
          factory.createIdentifier("headerName"),
          factory.createStringLiteral(property.getName())
        ))
      }

      let expression =  factory.createObjectLiteralExpression(
        properties,
        false
      )

      return expression;
    }

    private getHeaderRender(property: Property): ts.ArrowFunction {
      let declaration = this._helper.addImportDeclaration('GridColParams', muiDataGrid)

      this._imports.push(declaration)

      let localizedProperty = this._intlFormatter.localizePropertyNameUsingTag(property, this._entity)
      
      return factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("params"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier("GridColParams"),
            undefined
          ),
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createParenthesizedExpression(localizedProperty)
      )
    }

    private getValueFormatter(prop: Property): ts.ArrowFunction {
      return factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createObjectBindingPattern([factory.createBindingElement(
            undefined,
            undefined,
            factory.createIdentifier("value"),
            undefined
          )]),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        this._intlFormatter.formatPropertyUsingImperative(prop, factory.createIdentifier("value"), factory.createIdentifier("value"))
      )
    }
}