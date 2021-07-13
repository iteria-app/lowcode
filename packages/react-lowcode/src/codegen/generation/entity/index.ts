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
