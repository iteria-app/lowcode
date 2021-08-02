import { generateGraphqlFile, getEntity, getNestedOfType, IntrospectionQuery } from "@iteria-app/graphql-lowcode/esm/generate"

export interface Entity {
    getName(): string
    readonly properties: Property[]
}

export interface Property {
    getName(): string
    getType(): string
}

export function getProperties(entity: Entity): Property[] {
    return entity.properties
}

export function createEntityFromIntrospection(introspection: IntrospectionQuery, entityName: string): Entity | undefined {
    const entityType = getEntity(introspection.types, entityName)

    let props: Property[] = []
    let entity: Entity | undefined
        
    if (entityType && entityType.fields) {
        entityType.fields.forEach((field: { name: any }) => {
            const propName = field.name
            const propType = getNestedOfType(field).name ?? ''

            props = [...props, { getName: () => propName, getType: () => propType }]
        })

        entity = {
            getName: () => entityName,
            properties: props
        }
    }

    return entity
}
