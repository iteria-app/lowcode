import { ts, Type, TypeAliasDeclaration } from "ts-morph"

export interface Entity {
    getName(): string
    getType(): TypeAliasDeclaration
    readonly properties: Property[]
}

export interface Property {
    getName(): string
    getType(): Type<ts.Type>
}
