import ts, { factory } from "typescript";
import {
  createFunctionalComponent,
  createJsxElement,
  PageComponent,
  createJsxSelfClosingElement,
  createJsxAttribute,
} from "../../react-components/react-component-helper";
import { DetailGenerator } from "./detail-generator-factory";
import { DetailComponentDefinitionBase } from "../../../definition/detail-definition-core";
import GenerationContext from "../../context";
import DetailGeneratorBase from "./detail-generator-base";
import TypescriptHelper from "../../code-generation/ts-helper";
import { Formatter } from "../../../definition/context-types"
import { MuiDetailComponents } from "../../../definition/material-ui/detail";
import { Entity } from "../../entity";

export default class MuiTextInputGenerator
  extends DetailGeneratorBase
  implements DetailGenerator {
    constructor(generationContext: GenerationContext, entity: Entity) {
      super(generationContext, entity);
  }

  getDetailDefinition(): DetailComponentDefinitionBase {
    return MuiDetailComponents;
  }

  generateDetailComponent(): PageComponent {
    var statements = this.createStatements();
    var functionalComponent = createFunctionalComponent(
      "TextInputComponent",
      [],
      statements
    );

    this._imports = [...this._imports, ...this.intlFormatter.getImports()];

    var uniqueImports = this.uniqueImports();
    uniqueImports.push(
      TypescriptHelper.createNameSpaceImport("React", "react")
    );

    return { functionDeclaration: functionalComponent, imports: uniqueImports };
  }

  private createStatements(): ts.Statement[] {
    let statements = new Array<ts.Statement>();

    if(this.context.formatter === Formatter.Intl){
      statements.push(this.intlFormatter.getImperativeHook())
    }

    var inputBox = this.createInputBox();
    statements.push(
        factory.createReturnStatement(
          factory.createParenthesizedExpression(inputBox)
        )
      );

    return statements;
  }

  private createInputBox(): ts.JsxSelfClosingElement {
    return factory.createJsxSelfClosingElement(
        factory.createIdentifier("TextField"),
        undefined,
        factory.createJsxAttributes([
          factory.createJsxAttribute(
            factory.createIdentifier("id"),
            factory.createStringLiteral("standard-basic")
          ),
          factory.createJsxAttribute(
            factory.createIdentifier("label"),
            factory.createJsxExpression(
              undefined,
              factory.createIdentifier("text")
            )
          )
        ])
      );
  }
}
