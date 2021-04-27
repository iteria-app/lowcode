import ts from "typescript"
import Pluralize from "typescript-pluralize"
import { camalizeString } from "../../../strings/camel"
import { Formatter } from "../../definition/context-types"
import GenerationContext from "../context/context"
import { Entity, Property } from "../entity"
import { Component } from "../react-components/react-component-helper"
import ReactIntlFormatter from "../react-components/react-intl/intl-formatter"
import { identifier } from "../ts/identifier"
import { createImportDeclaration, createNameSpaceImport } from "../ts/imports"
import { bindingParameter } from "../ts/parameters"
import { jsxText, stringLiteral } from "../ts/text"

export class GeneratorHelper{
    readonly _context:GenerationContext;
    readonly _entity: Entity;
    readonly intlFormatter: ReactIntlFormatter;

    constructor(generationContext: GenerationContext, entity: Entity){
        this._context = generationContext;

        this.intlFormatter = new ReactIntlFormatter(this._context, []);
        this._entity = entity;
    }
    
    getEntityName(){
        return camalizeString(this._entity.getName())
    }

    addImportDeclaration(specifier: string, module: string, isNameSpaceImport: boolean = false): ts.ImportDeclaration{
        let importDeclaration = createImportDeclaration(specifier, module)
    
        if(isNameSpaceImport){
          importDeclaration = createNameSpaceImport(specifier, module)
        }else{
          importDeclaration = createImportDeclaration(specifier, module)
        }
    
        return importDeclaration
    }

    getComponentName() {
        return `${this._entity.getName()}Index`
    }

    prepareComponent(component: Component, imports: ts.ImportDeclaration[]): Component {
        imports.push(component.importDeclaration)
        return component;
    }

    getHeaderTitle(property: Property): ts.StringLiteral | ts.JsxSelfClosingElement{
        let localizedName;

        if(this._context.formatter === Formatter.Intl){
          localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, this._entity);
        }else{
          localizedName = stringLiteral(property.getName())
        }
  
        return localizedName;
    }

    getHeaderTitleJsxText(property: Property): ts.JsxText | ts.JsxSelfClosingElement{
        let localizedName;
  
        if(this._context.formatter === Formatter.Intl){
          localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, this._entity);
        }else{
          localizedName = jsxText(property.getName())
        }
  
        return localizedName;
    }

    getInputParameterIdentifier() : ts.Identifier {
        return identifier(Pluralize.plural(this.getEntityName()))
    }

    localizePropertyNameWithTag(property: Property): ts.JsxSelfClosingElement {
        return this.intlFormatter.localizePropertyNameUsingTag(property, this._entity)
    }

    createInputParameter(): ts.ParameterDeclaration {
        return bindingParameter(this.getInputParameterIdentifier())
    }
}
