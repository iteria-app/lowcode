import ts, { factory } from "typescript"
import { createJsxElement, PageComponent, createFunctionalComponent } from '../../react-components/react-component-helper'
import { Entity, getProperties, Property } from '../../entity/index'
import { TableGenerator } from './table-generator-factory'
import { TableComponentDefinition } from '../../../definition/table-definition-core'
import { MuiTableComponents } from '../../../definition/material-ui/table'
import { GrommetTableComponents } from '../../../definition/grommet/table'
import GenerationContext from "../../context/context"
import { Formatter, UiFramework } from "../../../definition/context-types"
import { uniqueImports } from "../../ts/imports"
import { GeneratorHelper } from "../helper"
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter"
import { SourceLineCol } from "../../../../ast"

export class BasicTableGenerator implements TableGenerator
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
    insertColumn(componentPosition: SourceLineCol, property: Property, columnIndex?: number) {
        throw new Error("Method not implemented.")
    }

    generateTableComponent(): PageComponent {
        var statements = this. createStatements()
        var functionalComponent = createFunctionalComponent(this._helper.getComponentName(), [this._helper.createInputParameter()], statements)

        this._imports = [...this._imports, ...this._intlFormatter.getImports()]

        return {imports: uniqueImports(this._imports), functionDeclaration: functionalComponent}
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

      let headerRow = createJsxElement(rowComponent.tagName, [], getProperties(this._entity)
                      .map((prop) => this.propertyHead(prop, this._entity)))

      let tableHeader = createJsxElement(headerComponent.tagName, [], [headerRow])

      return tableHeader
    }

    private createBodyRow(): ts.JsxElement {
      const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports)

      let bodyRow = createJsxElement(rowComponent.tagName, [],getProperties(this._entity)
                       ?.map(prop => this.propertyCell(prop, this._entity)))

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
        let child = this._helper.getHeaderTitleJsxText(prop);

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
        child = propertyAccess
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
                    this._helper.getInputParameterIdentifier(),
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
        return factory.createIdentifier(this._helper.getEntityName())
    }
}



