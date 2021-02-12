import ts, { factory } from "typescript"

import { tagFormattedMessage, tagFormattedProperty } from './typeAlias'
import { functionalComponent, createJsxElement } from './component'
import { Entity, Property } from '../entity'
import { GenContext } from './context'


function propertyHead(prop: Property, entity: Entity, context = new GenContext()) {
    return createJsxElement(context.imports.importCell(), [],
        tagFormattedMessage(prop, entity)
    )
}

function propertyCell(prop: Property, entity: Entity, row = factory.createIdentifier("row"), context = new GenContext()) {
    return createJsxElement(context.imports.importCell(), [], [
        factory.createJsxText(
            prop.getName(),
            false
        ),
        ...tagFormattedProperty(prop, row)
    ])
}

function filterProp(prop: Property) {
    const propName = prop.getName().toLowerCase()
    return propName !== '__typename' && propName.indexOf('children') < 0
}

export function entityTable(entity: Entity, rows: ts.Expression = factory.createIdentifier("rows"), row = factory.createIdentifier("row"), context = new GenContext()) {
    const tableComponent = context.imports.importTable()
    const rowComponent = context.imports.importRow()
    return createJsxElement(tableComponent, [],
        [
            createJsxElement(rowComponent, [],
                entity.properties
                    .filter(filterProp)
                    .map((prop) => propertyHead(prop, entity, context))
            ),
            mapArrayToTableRows(
                createJsxElement(rowComponent, [],
                    entity.properties
                        .filter(filterProp)
                        ?.map(prop => propertyCell(prop, entity, row, context))
                ),
                rows, row
            )
        ]
    )
}

export function entityTablePage(entity: Entity, context = new GenContext()) {
    const entityVarName = entity.getName().toLowerCase() // TODO lower camel case
    const rows = factory.createIdentifier(entityVarName + 's') // TODO plural (irregular)
    const row = factory.createIdentifier(entityVarName)

    const params = [factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createObjectBindingPattern([factory.createBindingElement(
          undefined,
          undefined,
          rows,
          undefined
        )]),
        undefined,
        undefined,
        undefined
      )]

    const table = entityTable(entity, rows, row, context)
    return [
        ...context.imports.unique(),
        functionalComponent('', params, table)
    ]
}

function mapArrayToTableRows(body: ts.ConciseBody, rows: ts.Expression = factory.createIdentifier("rows"), row: ts.Identifier = factory.createIdentifier("row")) {
    return factory.createJsxExpression(undefined,
        factory.createCallExpression(
            factory.createPropertyAccessExpression(
                rows,
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
                    row,
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
