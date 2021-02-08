import ts, { factory } from "typescript"

import grommetTable from './grommet/table'
import { tagFormattedMessage, tagFormattedProperty } from './typeAlias'
import { functionalComponent, createJsxElement } from './component'
import { Entity, Property } from '../entity'

function propertyHead(prop: Property, entity: Entity) {
    return createJsxElement(grommetTable.cell, [],
        tagFormattedMessage(prop, entity)
    )
}

function propertyCell(prop: Property, entity: Entity) {
    return createJsxElement(grommetTable.cell, [], [
        factory.createJsxText(
            prop.getName(),
            false
        ),
        ...tagFormattedProperty(prop)
    ])
}

function filterProp(prop: Property) {
    const propName = prop.getName().toLowerCase()
    return propName !== '__typename' && propName.indexOf('children') < 0
}

export function entityTable(entity: Entity) {
    return createJsxElement(grommetTable.table, [],
        [
            createJsxElement(grommetTable.row, [],
                entity.properties
                    .filter(filterProp)
                    .map((prop) => propertyHead(prop, entity))
            ),
            createJsxElement(grommetTable.row, [],
                entity.properties
                    .filter(filterProp)
                    ?.map(prop => propertyCell(prop, entity))
            )
        ]
    )
}

export function entityTablePage(entity: Entity) {
    const imports = [
        grommetTable.table.importDeclaration,
        grommetTable.row.importDeclaration,
        grommetTable.cell.importDeclaration,
    ]
    return [
        ...imports,
        functionalComponent('Component1',
            entityTable(entity)
        )
    ]
}
