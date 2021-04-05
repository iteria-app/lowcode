import { Entity, Property } from '../../entity/index'
import GenerationContext from '../../context'
import ts, { createJsxText, factory } from "typescript"
import { TableComponentDefinitionBase } from '../../../definition/table-definition-core'
import { Component } from '../../react-components/react-component-helper'
import { camalizeString } from '../../../../strings/camel'
import TypescriptHelper from "../../code-generation/ts-helper"
import ReactIntlFormatter from  '../../react-components/react-intl/intl-formatter'
import Pluralize from "typescript-pluralize"
import { Formatter } from '../../../definition/context-types'

export default abstract class TableGeneratorBase{
    protected readonly context:GenerationContext;
    protected readonly _entity: Entity;
    _imports: ts.ImportDeclaration[] = [];
    protected readonly intlFormatter: ReactIntlFormatter;
    
    constructor(generationContext: GenerationContext, entity: Entity){
        this.context = generationContext;
        this.intlFormatter = new ReactIntlFormatter(this.context, this._imports);
        this._entity = entity;
    }

    protected getComponentName() {
        return `${this._entity.getName()}Index`
    }

    protected getProperties(): Property[]{
        return this._entity.properties.filter(this.filterProp)
    }

    protected abstract getTableDefinition(): TableComponentDefinitionBase

    protected uniqueImports(){
        return TypescriptHelper.uniqueImports(this._imports);
    }

    private filterProp(prop: Property) {
        const propName = prop.getName().toLowerCase()
        return propName !== '__typename' && propName.indexOf('children') < 0
    }

    protected prepareComponent(component: Component): Component {
        this._imports = [...this._imports, component.importDeclaration]
        return component;
    }

    protected addImportDeclaration(specifier: string, module: string, isNameSpaceImport: boolean = false){
      let importDeclaration = TypescriptHelper.createImportDeclaration(specifier, module)

      if(isNameSpaceImport){
        importDeclaration = TypescriptHelper.createNameSpaceImport(specifier, module)
      }else{
        importDeclaration = TypescriptHelper.createImportDeclaration(specifier, module)
      }

      this._imports = [...this._imports, importDeclaration]
    }

    protected getEntityName(){
        return camalizeString(this._entity.getName())
    }

    protected getInputParameterIdentifier() : ts.Identifier {
        return factory.createIdentifier(Pluralize.plural(this.getEntityName()))
    }

    protected localizePropertyNameWithTag(property: Property): ts.JsxSelfClosingElement {
        return this.intlFormatter.localizePropertyNameUsingTag(property, this._entity)
    }

    protected getHeaderTitle(property: Property): ts.StringLiteral | ts.JsxSelfClosingElement{
        let localizedName;

        if(this.context.formatter === Formatter.Intl){
          localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, this._entity);
        }else{
          localizedName = factory.createStringLiteral(property.getName())
        }
  
        return localizedName;
    }

    protected getHeaderTitleJsxText(property: Property): ts.JsxText | ts.JsxSelfClosingElement{
        let localizedName;
  
        if(this.context.formatter === Formatter.Intl){
          localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, this._entity);
        }else{
          localizedName = factory.createJsxText(property.getName())
        }
  
        return localizedName;
    }

    protected createInputParameter(): ts.ParameterDeclaration {
        return factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createObjectBindingPattern([factory.createBindingElement(
            undefined,
            undefined,
            this.getInputParameterIdentifier(),
            undefined
          )]),
          undefined,
          undefined,
          undefined
        )
    }
}