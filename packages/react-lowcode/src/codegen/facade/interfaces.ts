import { Entity, Property } from "../generation/entity";

export interface FacadeInsertOptions{
    entity?: Entity,
    entityField: Property;
    index?: number;
}

export interface FacadeDeleteOptions {
    index: number
}

export interface RouteOptions {
    routeFilePath: string
    entityName: string,
    componentName: string,
    componentPath: string
}