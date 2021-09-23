import Pluralize from "typescript-pluralize";
import { camalizeString } from "../../../strings/camel";
import { identifier } from "../../ast/identifier";
import { pascalCase } from "pascal-case";
export function getEntityName(entity) {
    return camalizeString(entity.getName());
}
export function getListComponentName(entity) {
    return pascalCase(`${entity.getName()}List`);
}
export function getDetailComponentName(entity) {
    return pascalCase(`${entity.getName()}Detail`);
}
export function getDetailPageComponentName(entity) {
    return pascalCase(`${getDetailComponentName(entity)}Page`);
}
export function getListPageComponentName(entity) {
    return pascalCase(`${getListComponentName(entity)}Page`);
}
export function getInputParameterIdentifier(entity) {
    return identifier(getPluralizedEntityName(entity));
}
export function getPluralizedEntityName(entity) {
    return Pluralize.plural(camalizeString(entity.getName()));
}
export function getEntityInterfaceName(entity) {
    return `${pascalCase(entity.getName())}`;
}
export function getBaseModuleUri(entity) {
    return `codegen-${getPluralizedEntityName(entity)}`;
}
export function getDetailModuleUri(entity) {
    return `${getBaseModuleUri(entity)}-detail`;
}
