import ts, { factory } from "typescript"
import { createJsxElement, TableComponent, createFunctionalComponent } from '../../react-components/react-component-helper'
import { Entity, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinition } from '../../../definition/table-definition-core'
import { MuiTableComponents } from '../../../definition/material-ui/table'
import TableGeneratorBase from './table-generator-base'
import GenerationContext from "../../context"

export class BasicTableGenerator extends TableGeneratorBase  implements TableGenerator
{
    constructor(generationContext: GenerationContext) {
        super(generationContext);
    }

    generateTableComponent(): TableComponent {
        var statements = this.createStatements()
        var functionalComponent = createFunctionalComponent("TableComponent", [this.createInputParameter()], statements)

        return {imports: this.uniqueImports(), functionDeclaration: functionalComponent}
    }

    private createStatements(): ts.Statement[] {
      let statements = new Array<ts.Statement>()

      const tableComponent = this.prepareComponent(this.getTableDefinition().table)
        
      let table = createJsxElement(tableComponent.tagName, [],
          [
              this.createHeader(),
              this.mapArrayToTableRows(
                  this.createBody()
              )
          ]
      )

      var returnStatement = factory.createReturnStatement(table);
      statements.push(returnStatement)

      return statements;
    }

    private createHeader(): ts.JsxChild {
      const headerComponent = this.prepareComponent(this.getTableDefinition().header);
      const rowComponent = this.prepareComponent(this.getTableDefinition().row)

      let headerRow = createJsxElement(rowComponent.tagName, [], this.getProperties()
                      .map((prop) => this.propertyHead(prop, this.context.entity)))

      let tableHeader = createJsxElement(headerComponent.tagName, [], [headerRow])

      return tableHeader
    }

    private createBody(): ts.JsxElement {
      const bodyComponent = this.prepareComponent(this.getTableDefinition().body);
      const rowComponent = this.prepareComponent(this.getTableDefinition().row)

      let bodyRow = createJsxElement(rowComponent.tagName, [],this.getProperties()
                       ?.map(prop => this.propertyCell(prop, this.context.entity)))

      let tableBody = createJsxElement(bodyComponent.tagName, [], [bodyRow])

      return tableBody
    }

    getTableDefinition() : TableComponentDefinition {
        return MuiTableComponents;
    }

    private propertyHead(prop: Property, entity: Entity) {
        let child: ts.JsxChild;

        if(this.context.useFormatter) {
            child = this.formatCellWithTag(prop)
        }else{
            child = factory.createJsxText(prop.getName(),false)
        }

        return createJsxElement(this.prepareComponent(this.getTableDefinition().cell).tagName, 
                                                      [],
                                                      [child]
        )
    }
    
    private propertyCell(prop: Property, entity: Entity) {
        let child: ts.JsxChild;

        if(this.context.useFormatter) {
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

        return createJsxElement(this.prepareComponent(this.getTableDefinition().cell).tagName, 
                                                      [],            
                                                      [child])
    }

    private formatCellWithTag(prop: Property): ts.JsxSelfClosingElement {
       const propertyAccess = factory.createPropertyAccessExpression(
          this.getRowIdentifier(),
          factory.createIdentifier(prop.getName())
       )

      return this.intlFormatter.formatPropertyUsingTag(prop, propertyAccess)
    }

    private mapArrayToTableRows(body: ts.ConciseBody) {
        return factory.createJsxExpression(undefined,
            factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    this.getInputParameterIdentifier(),
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
        )
    }

    protected getRowIdentifier() : ts.Identifier {
        return factory.createIdentifier(this.getEntityName())
    }
}



