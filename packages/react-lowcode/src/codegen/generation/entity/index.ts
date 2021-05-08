import { ts, Type, TypeAliasDeclaration } from "ts-morph"

export interface Entity {
    getName(): string
    getType(): TypeAliasDeclaration
    readonly properties: Property[]
}

export interface Property {
    getName(): string
    getType(): Type<ts.Type>
    getTypeText(): string
}

export function getProperties(entity: Entity): Property[]{
    return entity.properties.filter(filterProp)
}

function filterProp(prop: Property) {
    const propName = prop.getName().toLowerCase()
    return propName !== '__typename' && propName.indexOf('children') < 0
}
