import { Entity, Property } from '../entity/index'
import GenerationContext from '../context'
import ts, { factory } from "typescript"
import { TableComponentDefinitionBase } from '../../table-definition/table-definition-core'
import { Component } from '../react-components/react-component-helper'
import { camalizeString, uniqueImports } from '../../utils/utils'
import Pluralize from "typescript-pluralize"

export default abstract class TableGeneratorBase{
    protected readonly _context:GenerationContext;
    _imports: ts.ImportDeclaration[] = [];
    
    constructor(generationContext: GenerationContext){
        this._context = generationContext;
    }

    getProperties(): Property[]{
        return this._context.entity.properties.filter(this.filterProp)
    }

    protected abstract getTableDefinition(): TableComponentDefinitionBase

    protected uniqueImports(){
        return uniqueImports(this._imports);
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
        return camalizeString(this._context.entity.getName())
    }

    protected getRowsIdentifier() : ts.Identifier {
        return factory.createIdentifier(Pluralize.plural(this.getEntityName()))
    }

    protected getRowIdentifier() : ts.Identifier {
        return factory.createIdentifier(this.getEntityName())
    }
}