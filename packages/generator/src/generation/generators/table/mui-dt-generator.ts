import ts, { factory } from "typescript"
import { getPropertyType, PropertyType } from '../../typeAlias'
import { createFunctionalComponent, PageComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper'
import { Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import TableGeneratorBase from './table-generator-base'
import GenerationContext from "../../context"
import { MuiDtTableComponents } from '../../../definition/material-ui/table'
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core'

export default class MuiDataTableGenerator extends TableGeneratorBase implements TableGenerator 
{
    constructor(generationContext: GenerationContext) {
        super(generationContext);
    }
    
    generateTableComponent(): PageComponent {
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent("DataTableComponent", [this.createInputParameter()], statements);

        this._imports = [...this._imports, ...this.intlFormatter.getImports()]
        
        return {functionDeclaration: functionalComponent, imports: this.uniqueImports()};
    }

    getTableDefinition() : TableComponentDefinitionBase {
        return MuiDtTableComponents;
    }

    private createStatements(): ts.Statement[] {
      let statements = new Array<ts.Statement>()

      if(this.context.useFormatter){
        statements.push(this.intlFormatter.getImperativeHook())
      }

      let columnsIdentifier = factory.createIdentifier("columns")
      let columnsDeclaration = this.createColumns(columnsIdentifier)

      var columnAttribute = createJsxAttribute("columns", "columns")
      statements.push(factory.createVariableStatement(undefined, columnsDeclaration))

      var dataGridComponent = this.prepareComponent(this.getTableDefinition().table);

      var rowsAttribute = createJsxAttribute("rows", this.getInputParameterIdentifier())

      statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(createJsxSelfClosingElement(dataGridComponent.tagName, [columnAttribute, rowsAttribute]))))

      return statements;
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

      switch(propType) {
        case PropertyType.currency:
        case PropertyType.numeric:
          muiColumnType = 'number'
          break
        case PropertyType.date:
          muiColumnType = 'date'
          break
        case PropertyType.datetime:
          muiColumnType = 'datetime'
          break 
      }

      let properties : ts.ObjectLiteralElementLike[] = 
      [ 
        factory.createPropertyAssignment(
        factory.createIdentifier("field"),
        factory.createStringLiteral(propertyName)
        ),
        factory.createPropertyAssignment(
          factory.createIdentifier("headerName"),
          this.getHeaderTitle(property)
        ),
        factory.createPropertyAssignment(
          factory.createIdentifier("type"),
          factory.createStringLiteral(muiColumnType)
        )
      ];

      if(this.context.useFormatter){
        properties.push(factory.createPropertyAssignment(
          factory.createIdentifier("valueFormatter"),
          this.getValueFormatter(property)
        ))
      }

      let expression =  factory.createObjectLiteralExpression(
        properties,
        false
      )

      return expression;
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