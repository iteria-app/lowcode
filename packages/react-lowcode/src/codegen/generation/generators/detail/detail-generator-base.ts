import { Property } from '../../entity/index'
import GenerationContext from '../../context'
import ts, { factory } from "typescript"
import { FormikComponentDefinitionBase } from '../../../definition/detail-definition-core'
import { Component } from '../../react-components/react-component-helper'
import { camalizeString } from '../../../../strings/camel'
import Pluralize from "typescript-pluralize"
import TypescriptHelper from "../../code-generation/ts-helper"
import ReactIntlFormatter from  '../../react-components/react-intl/intl-formatter'

export default abstract class DetailGeneratorBase{
    protected readonly context:GenerationContext;
    _imports: ts.ImportDeclaration[] = [];
    protected readonly intlFormatter: ReactIntlFormatter;
    
    constructor(generationContext: GenerationContext){
        this.context = generationContext;
        this.intlFormatter = new ReactIntlFormatter(this.context, this._imports);
    }

    getProperties(): Property[]{
        return this.context.entity.properties.filter(this.filterProp)
    }

    protected abstract getDetailDefinition(): FormikComponentDefinitionBase

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

    protected getEntityName(){
        return camalizeString(this.context.entity.getName())
    }

    protected getRowsIdentifier() : ts.Identifier {
        return factory.createIdentifier(Pluralize.plural(this.getEntityName()))
    }

    protected getRowIdentifier() : ts.Identifier {
        return factory.createIdentifier(this.getEntityName())
    }

    protected localizePropertyNameWithTag(property: Property): ts.JsxSelfClosingElement {
        return this.intlFormatter.localizePropertyNameUsingTag(property, this.context.entity)
    }

    protected getHeaderTitle(property: Property): ts.Expression{
        let localizedName: ts.Expression;
  
        if(this.context.useFormatter){
          localizedName = this.intlFormatter.localizePropertyNameUsingTag(property, this.context.entity);
        }else{
          localizedName = 
            factory.createStringLiteral(property.getName())
        }
  
        return localizedName;
      }
}