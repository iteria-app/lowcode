import ts, { factory } from "typescript"
import { createFunctionalComponent, createJsxElement, TableComponent, createJsxSelfClosingElement, createJsxAttribute } from '../react-components/react-component-helper'
import { Entity, Property } from '../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinitionBase } from '../../table-definition/table-definition-core'
import GenerationContext from "../context"
import TableGeneratorBase from './table-generator-base'
import { GrommetDtTableComponents } from '../../table-definition/grommet/table'

export default class GrommetDataTableGenerator extends TableGeneratorBase implements TableGenerator 
{
    constructor(generationContext: GenerationContext) {
        super(generationContext);
    }

    getTableDefinition() : TableComponentDefinitionBase {
        return GrommetDtTableComponents;
    }
    
    generateTableComponent(): TableComponent {
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent("DataTableComponent", [], statements);
        
        return {functionDeclaration: functionalComponent, imports: this.uniqueImports()};
    }

    private createStatements(): ts.Statement[] {
        let statements = new Array<ts.Statement>();
  
        let columnsIdentifier = factory.createIdentifier("columns");  
        let columnsDeclaration = this.createColumns(columnsIdentifier);
        var columnAttribute = createJsxAttribute("columns", "columns")
        statements.push(factory.createVariableStatement(undefined, columnsDeclaration))
  
        var dataGridComponent = this.prepareComponent(this.getTableDefinition().table);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(createJsxSelfClosingElement(dataGridComponent.tagName, [columnAttribute]))));
  
        return statements;
      }
  
    private createColumns(columnsIdentifier: ts.Identifier):ts.VariableDeclarationList {
        let propertiesColumnDefinitions = Array<ts.ObjectLiteralExpression>();

        this.getProperties().forEach(property => {
            propertiesColumnDefinitions.push(this.createColumnDefinition(property.getName(), property.getName()));
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

    private createColumnDefinition(header: string, property: string): ts.ObjectLiteralExpression {
        return factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier("property"),
                factory.createStringLiteral(property)
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier("header"),
                factory.createStringLiteral(header)
              )
            ],
            false
          )
    }
}