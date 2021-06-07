import { Entity, Property } from "../generation/entity";

export interface FacadeInsertOptions{
    entity?: Entity,
    entityField: Property;
    index?: number;
}

export interface FacadeDeleteOptions {
    index: number
}