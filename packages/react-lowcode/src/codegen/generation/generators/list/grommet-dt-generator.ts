import ts, { factory, SourceFile } from "typescript"
import { createFunctionalComponent, createJsxElement, PageComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper'
import { Entity, getProperties, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core'
import GenerationContext from "../../context/context"
import { GrommetDtTableComponents } from '../../../definition/grommet/table'
import { Formatter } from "../../../definition/context-types"
import { GeneratorHelper } from "../helper"
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter"
import { uniqueImports } from "../../../ast/imports"
import { createAst, replaceElementsToAST, SourceLineCol } from "../../../../ast"
import { findVariableDeclarations } from "../../../ast/ast"
import { WidgetContext } from "../../context/widget-context"
import { findWidgetParentNode } from "../../../ast/widgetDeclaration"

export default class GrommetDataTableGenerator implements TableGenerator 
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

    async insertColumn(position: SourceLineCol, property: Property, columnIndex?: number) {
        let alteredSource = ''
        if(this._widgetContext){
          let sourceCode = await this._widgetContext.getSourceCodeString(position)
          let ast = createAst(sourceCode)
  
          if(ast){
            let widgetParentNode = findWidgetParentNode(sourceCode, position)
  
            if(widgetParentNode)
            {
              let columnsDeclarationNode = this.findColumnsDeclaration(widgetParentNode)
  
              if(columnsDeclarationNode){
                let columnDeclarationArray = columnsDeclarationNode.getChildAt(2) as ts.ArrayLiteralExpression
  
                if(columnDeclarationArray){
                  ast = this.addNewColumn(columnDeclarationArray, 
                                          property, 
                                          ast, 
                                          columnIndex)
                }
              }
            }
  
            alteredSource = this.printSourceCode(ast)
            console.log(alteredSource)
          }
        }
  
        return alteredSource
    }

    private printSourceCode(sourceFile: SourceFile): string{
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
        return printer.printFile(sourceFile)
    }
  
    private addNewColumn(columnDeclarationParent: ts.ArrayLiteralExpression, 
                            property: Property, 
                            ast:SourceFile,
                            columnIndex?: number): ts.SourceFile{
        
          let newColumnsDefinition = this.newColumnsDeclaration(columnDeclarationParent, 
                                                                   property, 
                                                                   columnIndex)
         
          return replaceElementsToAST(ast, 
                                      columnDeclarationParent.pos, 
                                      factory.createArrayLiteralExpression(newColumnsDefinition))
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

    private newColumnsDeclaration(columnDeclarationParent: ts.ArrayLiteralExpression, 
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

    getTableDefinition() : TableComponentDefinitionBase {
        return GrommetDtTableComponents;
    }
    
    generateTableComponent(): PageComponent | undefined {
      if(this._entity){
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent(this._helper.getComponentName(this._entity!), [this._helper.createInputParameter(this._entity)], statements);

        this._imports = [...this._imports, ...this._intlFormatter.getImports()]
        
        return {functionDeclaration: functionalComponent, imports: uniqueImports(this._imports)};
      }

      return undefined
    }

    generateTablePage(template: string): PageComponent | undefined {
      throw new Error("Not implemented");
    }

    private createStatements(): ts.Statement[] {
        let statements = new Array<ts.Statement>();
  
        let columnsIdentifier = factory.createIdentifier("columns");  
        let columnsDeclaration = this.createColumns(columnsIdentifier);
        var columnAttribute = createJsxAttribute("columns", "columns")
        statements.push(factory.createVariableStatement(undefined, columnsDeclaration))
        var dataAttribute = createJsxAttribute("data", this._helper.getInputParameterIdentifier(this._entity!))

        var dataGridComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(createJsxSelfClosingElement(dataGridComponent.tagName, [columnAttribute, dataAttribute]))));
  
        return statements;
    }
  
    private createColumns(columnsIdentifier: ts.Identifier):ts.VariableDeclarationList {
        let propertiesColumnDefinitions = Array<ts.ObjectLiteralExpression>();

        getProperties(this._entity!).forEach(property => {
            propertiesColumnDefinitions.push(this.createColumnDefinition(property, this._context.formatter));
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

    private createColumnDefinition(property: Property, formatter: Formatter | undefined): ts.ObjectLiteralExpression {
        let properties : ts.ObjectLiteralElementLike[] =  [
            factory.createPropertyAssignment(
              factory.createIdentifier("property"),
              factory.createStringLiteral(property.getName())
            ),
            factory.createPropertyAssignment(
              factory.createIdentifier("header"),
              this._helper.getHeaderTitle(this._entity!, property)
            )
        ];

        if(formatter){
            if(formatter === Formatter.ReactIntl){
              properties.push(factory.createPropertyAssignment(
                  factory.createIdentifier("render"),
                  this.getRender(property)
              ))
            } 
        }
  
        return factory.createObjectLiteralExpression(properties,false)
    }

    private getUsedFormatter(columnsDefinition:  ts.ArrayLiteralExpression): Formatter {
        return columnsDefinition.elements.length === 0 ? Formatter.None 
                                                       : (columnsDefinition.elements[0] as ts.ObjectLiteralExpression).properties.length > 2 
                                                          ? Formatter.ReactIntl 
                                                          : Formatter.None
    }

    private getRender(property: Property):ts.ArrowFunction {
        let fallbackExpression = factory.createIdentifier("val")
        let propertyAccessExpression = factory.createPropertyAccessExpression(
            fallbackExpression, 
            factory.createIdentifier(property.getName()))
        
        let expression = factory.createJsxExpression(undefined, 
                            propertyAccessExpression)

        let formattedChild: ts.Expression

        let formattedTag = this._intlFormatter.tryFormatPropertyUsingTag(property, expression)

        if(formattedTag) {
            formattedChild = formattedTag
        } else {
            formattedChild = propertyAccessExpression
        }

        return factory.createArrowFunction(
            undefined,
            undefined,
            [factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("val"),
              undefined,
              undefined,
              undefined
            )],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createParenthesizedExpression(formattedChild)
          )
    }
}