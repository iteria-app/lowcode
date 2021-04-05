import ts, { factory } from "typescript"
import { getPropertyType, PropertyType } from '../../typeAlias'
import { createFunctionalComponent, PageComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper'
import { Entity, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import TableGeneratorBase from './table-generator-base'
import GenerationContext from "../../context"
import { MuiDtTableComponents, muiDataGrid } from '../../../definition/material-ui/table'
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core'
import TypescriptHelper from "../../code-generation/ts-helper"
import { Formatter } from "../../../definition/context-types"

export default class MuiDataTableGenerator extends TableGeneratorBase implements TableGenerator 
{
    constructor(generationContext: GenerationContext, entity: Entity) {
        super(generationContext, entity);
    }
    
    generateTableComponent(): PageComponent {
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent(this.getComponentName(), [this.createInputParameter()], statements);

        this._imports = [...this._imports, ...this.intlFormatter.getImports()]

        var uniqueImports = this.uniqueImports();
        uniqueImports.push(TypescriptHelper.createNameSpaceImport('React', 'react'))
        
        return {functionDeclaration: functionalComponent, imports: uniqueImports};
    }

    getTableDefinition() : TableComponentDefinitionBase {
        return MuiDtTableComponents;
    }

    private createStatements(): ts.Statement[] {
      let statements = new Array<ts.Statement>()

      if(this.context.formatter === Formatter.Intl){
        statements.push(this.intlFormatter.getImperativeHook())
      }

      let columnsIdentifier = factory.createIdentifier("columns")
      let columnsDeclaration = this.createColumns(columnsIdentifier)

      var columnsAttribute = createJsxAttribute("columns", "columns")
      statements.push(factory.createVariableStatement(undefined, columnsDeclaration))

      var rowsAttribute = createJsxAttribute("rows", this.getInputParameterIdentifier())

      let returnStatement = this.createReturnStatement([columnsAttribute, rowsAttribute])

      statements.push(returnStatement)

      return statements;
    }

    private createReturnStatement(parameters: ts.JsxAttributeLike[]):ts.ReturnStatement {
      var dataGridComponent = this.prepareComponent(this.getTableDefinition().table);

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
                    factory.createStringLiteral(this.context?.index?.height ?? "400px")
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

      this.getProperties().forEach(property => {
        propertiesColumnDefinitions.push(this.createColumnDefinition(property))
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

    private createColumnDefinition(property: Property): ts.ObjectLiteralExpression {
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

      if(this.context.formatter === Formatter.Intl){
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
      this.addImportDeclaration('GridColParams', muiDataGrid)

      let localizedProperty = this.intlFormatter.localizePropertyNameUsingTag(property, this._entity)
      
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
        this.intlFormatter.formatPropertyUsingImperative(prop, factory.createIdentifier("value"), factory.createIdentifier("value"))
      )
    }
}