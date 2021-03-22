import ts, { factory } from "typescript"
import { createJsxElement, PageComponent, createFunctionalComponent } from '../../react-components/react-component-helper'
import { Entity, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinition } from '../../../definition/table-definition-core'
import { MuiTableComponents } from '../../../definition/material-ui/table'
import { GrommetTableComponents } from '../../../definition/grommet/table'
import TableGeneratorBase from './table-generator-base'
import GenerationContext from "../../context"
import { UiFramework } from "../../../definition/context-types"

export class BasicTableGenerator extends TableGeneratorBase  implements TableGenerator
{
    constructor(generationContext: GenerationContext) {
        super(generationContext);
    }

    generateTableComponent(): PageComponent {
        var statements = this. createStatements()
        var functionalComponent = createFunctionalComponent("TableComponent", [this.createInputParameter()], statements)

        this._imports = [...this._imports, ...this.intlFormatter.getImports()]

        return {imports: this.uniqueImports(), functionDeclaration: functionalComponent}
    }

    private createStatements(): ts.Statement[] {
      let statements = new Array<ts.Statement>()

      const tableComponent = this.prepareComponent(this.getTableDefinition().table)
        
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
      const headerComponent = this.prepareComponent(this.getTableDefinition().header);
      const rowComponent = this.prepareComponent(this.getTableDefinition().row)

      let headerRow = createJsxElement(rowComponent.tagName, [], this.getProperties()
                      .map((prop) => this.propertyHead(prop, this.context.entity)))

      let tableHeader = createJsxElement(headerComponent.tagName, [], [headerRow])

      return tableHeader
    }

    private createBodyRow(): ts.JsxElement {
      const rowComponent = this.prepareComponent(this.getTableDefinition().row)

      let bodyRow = createJsxElement(rowComponent.tagName, [],this.getProperties()
                       ?.map(prop => this.propertyCell(prop, this.context.entity)))

      return bodyRow
    }

    getTableDefinition() : TableComponentDefinition {
        if(this.context.uiFramework === UiFramework.Grommet){
            return GrommetTableComponents
        } else if(this.context.uiFramework === UiFramework.MaterialUI){
            return MuiTableComponents
        } else{
            console.log('Unsupported ui framework for generation basic table')
            throw new Error('Unsupported ui framework for generation basic table')
        }
    }

    private propertyHead(prop: Property, entity: Entity) {
        let child = this.getHeaderTitleJsxText(prop);

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

    private formatCellWithTag(prop: Property): ts.JsxChild {
       const propertyAccess = factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(
          this.getRowIdentifier(),
          factory.createIdentifier(prop.getName())
       ))

       var formattedChild = this.intlFormatter.tryFormatPropertyUsingTag(prop, propertyAccess)

       let child: ts.JsxChild

       if(formattedChild){
        child = propertyAccess
       } else{
           child = propertyAccess
       }

      return child
    }

    private mapArrayToTableRows(body: ts.ConciseBody) {
        const bodyComponent = this.prepareComponent(this.getTableDefinition().body);

        return createJsxElement(bodyComponent.tagName, [], 
        [factory.createJsxExpression(undefined,
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
        )])
    }

    protected getRowIdentifier() : ts.Identifier {
        return factory.createIdentifier(this.getEntityName())
    }
}



