import ts, { factory } from "typescript"

import grommetTable from './grommet/table'
import { formattedDate, formattedTime, formattedNumber, formattedDateTimeRange, formattedRelativeTime, formattedPlural, formattedMessage } from './react-intl/formatted-tag'
import { tagFormattedMessage, tagFormattedProperty } from './typeAlias'
import { functionalComponent, createJsxElement } from './component'
import { Entity, Property } from '../entity'

function propertyHead(prop: Property, entity: Entity) {
    return createJsxElement(grommetTable.cell, [],
        tagFormattedMessage(prop, entity)
    )
}

function propertyCell(prop: Property, entity: Entity, row = factory.createIdentifier("row")) {
    return createJsxElement(grommetTable.cell, [], [
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

export function entityTable(entity: Entity, rows: ts.Expression = factory.createIdentifier("rows"), row = factory.createIdentifier("row")) {
    return createJsxElement(grommetTable.table, [],
        [
            createJsxElement(grommetTable.row, [],
                entity.properties
                    .filter(filterProp)
                    .map((prop) => propertyHead(prop, entity))
            ),
            mapArrayToTableRows(
                createJsxElement(grommetTable.row, [],
                    entity.properties
                        .filter(filterProp)
                        ?.map(prop => propertyCell(prop, entity, row))
                ),
                rows, row
            )
        ]
    )
}

export function entityTablePage(entity: Entity) {
    const imports = [
        grommetTable.table.importDeclaration,
        grommetTable.row.importDeclaration,
        grommetTable.cell.importDeclaration,
        formattedDate.importDeclaration, formattedTime.importDeclaration, formattedNumber.importDeclaration, 
        formattedDateTimeRange.importDeclaration, formattedRelativeTime.importDeclaration, 
        formattedPlural.importDeclaration, formattedMessage.importDeclaration
    ]

    const entityVarName = entity.getName().toLowerCase() // TODO lower camel case
    const rows = factory.createIdentifier(entityVarName + 's') // TODO plural
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

    return [
        ...imports,
        functionalComponent('', params, entityTable(entity, rows, row))
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
