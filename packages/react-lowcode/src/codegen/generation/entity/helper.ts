import ts from "typescript";
import Pluralize from "typescript-pluralize";
import { Entity } from ".";
import { camalizeString } from "../../../strings/camel";
import { identifier } from "../../ast/identifier";

export class EntityHelper {
    static getEntityName(entity: Entity): string{
        return camalizeString(entity.getName())
    }

    static getTableComponentName(entity: Entity) {
        return `${entity.getName()}Table`
    }

    static getInputParameterIdentifier(entity: Entity) : ts.Identifier {
        return identifier(Pluralize.plural(this.getEntityName(entity)))
    }
}