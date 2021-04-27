import ts, { factory } from "typescript"
import { createFunctionalComponent, createJsxElement, PageComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper'
import { Entity, getProperties, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core'
import GenerationContext from "../../context/context"
import { GrommetDtTableComponents } from '../../../definition/grommet/table'
import { Formatter } from "../../../definition/context-types"
import { GeneratorHelper } from "../helper"
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter"
import { uniqueImports } from "../../ts/imports"

export default class GrommetDataTableGenerator implements TableGenerator 
{
    private readonly _helper: GeneratorHelper
    private _imports: ts.ImportDeclaration[] = []
    private _context: GenerationContext
    private _entity: Entity
    private _intlFormatter: ReactIntlFormatter

    constructor(generationContext: GenerationContext, entity: Entity) {
      this._helper = new GeneratorHelper(generationContext, entity)
       this._context = generationContext
       this._entity = entity
       this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports)
    }

    getTableDefinition() : TableComponentDefinitionBase {
        return GrommetDtTableComponents;
    }
    
    generateTableComponent(): PageComponent {
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent(this._helper.getComponentName(), [this._helper.createInputParameter()], statements);

        this._imports = [...this._imports, ...this._intlFormatter.getImports()]
        
        return {functionDeclaration: functionalComponent, imports: uniqueImports(this._imports)};
    }

    private createStatements(): ts.Statement[] {
        let statements = new Array<ts.Statement>();
  
        let columnsIdentifier = factory.createIdentifier("columns");  
        let columnsDeclaration = this.createColumns(columnsIdentifier);
        var columnAttribute = createJsxAttribute("columns", "columns")
        statements.push(factory.createVariableStatement(undefined, columnsDeclaration))
        var dataAttribute = createJsxAttribute("data", this._helper.getInputParameterIdentifier())

        var dataGridComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(createJsxSelfClosingElement(dataGridComponent.tagName, [columnAttribute, dataAttribute]))));
  
        return statements;
      }
  
    private createColumns(columnsIdentifier: ts.Identifier):ts.VariableDeclarationList {
        let propertiesColumnDefinitions = Array<ts.ObjectLiteralExpression>();

        getProperties(this._entity).forEach(property => {
            propertiesColumnDefinitions.push(this.createColumnDefinition(property));
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
        let properties : ts.ObjectLiteralElementLike[] =  [
            factory.createPropertyAssignment(
              factory.createIdentifier("property"),
              factory.createStringLiteral(property.getName())
            ),
            factory.createPropertyAssignment(
              factory.createIdentifier("header"),
              this._helper.getHeaderTitle(property)
            )
        ];

        if(this._context.formatter === Formatter.Intl){
            properties.push(factory.createPropertyAssignment(
                factory.createIdentifier("render"),
                this.getRender(property)
              ))
        }

        return factory.createObjectLiteralExpression(properties,false)
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