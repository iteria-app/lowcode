import ts, { factory } from "typescript"
import { createFunctionalComponent, createJsxElement, PageComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper'
import { Entity, Property } from '../../entity/index'
import { DetailGenerator } from './detail-generator-factory'
import { DetailComponentDefinitionBase } from '../../../definition/detail-definition-core'
import GenerationContext from "../../context"
import DetailGeneratorBase from './detail-generator-base'
import { GrommetDetailComponents } from '../../../definition/grommet/detail'

export default class GrommetDetailGenerator extends DetailGeneratorBase implements DetailGenerator 
{
    constructor(generationContext: GenerationContext) {
        super(generationContext);
    }

    getDetailDefinition() : DetailComponentDefinitionBase {
        return GrommetDetailComponents;
    }
    
    generateDetailComponent(): PageComponent {
        var statements = this.createStatements();
        var functionalComponent = createFunctionalComponent("PageComponent", [], statements);
        
        return {functionDeclaration: functionalComponent, imports: this.uniqueImports()};
    }

    private createStatements(): ts.Statement[] {
        let statements = new Array<ts.Statement>();
  
        var detailComponent = this.prepareComponent(this.getDetailDefinition().textInput);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(createJsxSelfClosingElement(detailComponent.tagName, []))));
        return statements;
      }
}