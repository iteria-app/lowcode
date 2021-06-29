import ts from "typescript";
import Pluralize from "typescript-pluralize";
import { Entity } from ".";
import { camalizeString } from "../../../strings/camel";
import { identifier } from "../../ast/identifier";

export class EntityHelper {
    static getEntityName(entity: Entity): string{
        return camalizeString(entity.getName())
    }

    static getListComponentName(entity: Entity) {
        return `${entity.getName()}List`
    }

    static getListPageComponentName(entity: Entity) {
        return `${this.getListComponentName(entity)}Page`
    }

    static getInputParameterIdentifier(entity: Entity) : ts.Identifier {
        return identifier(Pluralize.plural(this.getEntityName(entity)))
    }
}