import ts from "typescript";
import Pluralize from "typescript-pluralize";
import { Entity } from ".";
import { camalizeString } from "../../../strings/camel";
import { identifier } from "../../ast/identifier";
import { pascalCase } from "pascal-case";

export function getEntityName(entity: Entity): string{
    return camalizeString(entity.getName())
}

export function getListComponentName(entity: Entity) {
    return pascalCase(`${entity.getName()}List`)
}

export function getDetailComponentName(entity: Entity) {
    return pascalCase(`${entity.getName()}Detail`)
}

export function getDetailPageComponentName(entity: Entity) {
    return pascalCase(`${getDetailComponentName(entity)}Page`)
}

export function getListPageComponentName(entity: Entity) {
    return pascalCase(`${getListComponentName(entity)}Page`)
}

export function getInputParameterIdentifier(entity: Entity) : ts.Identifier {
    return identifier(getPluralizedEntityName(entity))
}

export function getPluralizedEntityName(entity: Entity) : string {
    return Pluralize.plural(camalizeString(entity.getName()))
}

export function getEntityInterfaceName(entity: Entity): string {
    return `${pascalCase(entity.getName())}`
}

export function getBaseModuleUri(entity: Entity): string {
    return `codegen-${getPluralizedEntityName(entity)}`
}

export function getDetailModuleUri(entity: Entity): string {
    return `${getBaseModuleUri(entity)}-detail`
}

