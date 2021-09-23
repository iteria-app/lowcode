import Pluralize from "typescript-pluralize";
import { camalizeString } from "../../../strings/camel";
import { Formatter } from "../../definition/context-types";
import ReactIntlFormatter from "../react-components/react-intl/intl-formatter";
import { identifier } from "../../ast/identifier";
import { createNamedImportDeclaration, createNameSpaceImport } from "../../ast/imports";
import { bindingParameter } from "../../ast/parameters";
import { stringLiteral } from "../../ast/text";
export class GeneratorHelper {
    constructor(generationContext, imports) {
        this._context = generationContext;
        this._imports = imports;
        this.intlFormatter = new ReactIntlFormatter(this._context, this._imports);
    }
    getEntityName(entity) {
        return camalizeString(entity.getName());
    }
    addImportDeclaration(specifier, module, isNameSpaceImport = false) {
        let importDeclaration = createNamedImportDeclaration(specifier, module);
        if (isNameSpaceImport) {
            importDeclaration = createNameSpaceImport(specifier, module);
        }
        else {
            importDeclaration = createNamedImportDeclaration(specifier, module);
        }
        return importDeclaration;
    }
    getComponentName(entity) {
        return `${entity.getName()}Table`;
    }
    prepareComponent(component, imports) {
        imports.push(component.importDeclaration);
        return component;
    }
    getHeaderTitle(entity, property) {
        let localizedName;
        if (this._context.formatter === Formatter.ReactIntl) {
            localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, entity);
        }
        else {
            localizedName = stringLiteral(property.getName());
        }
        return localizedName;
    }
    getHeaderTitleJsxText(entity, property) {
        let localizedName;
        if (this._context.formatter === Formatter.ReactIntl) {
            localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, entity);
        }
        else {
            localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, entity); //jsxText(property.getName())
        }
        return localizedName;
    }
    getInputParameterIdentifier(entity) {
        return identifier(Pluralize.plural(this.getEntityName(entity)));
    }
    localizePropertyNameWithTag(entity, property) {
        return this.intlFormatter.localizePropertyNameUsingTag(property, entity);
    }
    createInputParameter(entity) {
        return bindingParameter(this.getInputParameterIdentifier(entity));
    }
}
