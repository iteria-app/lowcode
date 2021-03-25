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

export default class MuiDetailGenerator
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
      "FormikComponent",
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

    var formikComponentDefinition = this.prepareComponent(
      this.getDetailDefinition().formik
    );

    var fnameFieldComponent = this.createFormikTextFieldElement(
      "firstName",
      "First Name"
    );
    var lnameFieldComponent = this.createFormikTextFieldElement(
      "lastName",
      "Last name"
    );
    var emailFieldComponent = this.createFormikTextFieldElement(
      "email",
      "Email"
    );
    var activeFieldComponent = this.createFormikCheckBoxElement("isActive");

    var fields = [
      fnameFieldComponent,
      lnameFieldComponent,
      emailFieldComponent,
      activeFieldComponent,
    ];
    var formControlComponent = createJsxElement(
      factory.createIdentifier("FormControl"),
      undefined,
      fields
    );

    var submitButton = this.createSubmitButton();
    var formComponent = createJsxElement(
      factory.createIdentifier("Form"),
      undefined,
      [formControlComponent, submitButton]
    );

    var formikInitialValueAttribute = this.createFormikInitialValueAttribute();
    var formikOnSubmitAttribute = this.createFormikOnSubmitAttribute();

    var formikComponent = createJsxElement(
      formikComponentDefinition.tagName,
      [formikInitialValueAttribute, formikOnSubmitAttribute],
      [formComponent]
    );

    let wrapper = this.createFormikWrapper(formikComponent);
    statements.push(
      factory.createReturnStatement(
        factory.createParenthesizedExpression(wrapper)
      )
    );

    return statements;
  }

  private createFormikInitialValueAttribute(): ts.JsxAttributeLike {
    return factory.createJsxAttribute(
      factory.createIdentifier("initialValues"),
      factory.createJsxExpression(
        undefined,
        factory.createObjectLiteralExpression(
          [
            factory.createPropertyAssignment(
              factory.createIdentifier("firstName"),
              factory.createStringLiteral("")
            ),
            factory.createPropertyAssignment(
              factory.createIdentifier("lastName"),
              factory.createStringLiteral("")
            ),
            factory.createPropertyAssignment(
              factory.createIdentifier("email"),
              factory.createStringLiteral("")
            ),
            factory.createPropertyAssignment(
              factory.createIdentifier("isActive"),
              factory.createFalse()
            ),
          ],
          false
        )
      )
    );
  }
  private createFormikOnSubmitAttribute(): ts.JsxAttributeLike {
    return factory.createJsxAttribute(
      factory.createIdentifier("onSubmit"),
      factory.createJsxExpression(
        undefined,
        factory.createArrowFunction(
          undefined,
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("values"),
              undefined,
              undefined,
              undefined
            ),
          ],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [
              factory.createExpressionStatement(
                factory.createCallExpression(
                  factory.createIdentifier("onSubmit"),
                  undefined,
                  [factory.createIdentifier("values")]
                )
              ),
            ],
            true
          )
        )
      )
    );
  }

  private createFormikCheckBoxElement(name: string): ts.JsxSelfClosingElement {
    return factory.createJsxSelfClosingElement(
      factory.createIdentifier("Field"),
      undefined,
      factory.createJsxAttributes([
        factory.createJsxAttribute(
          factory.createIdentifier("name"),
          factory.createStringLiteral(name)
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("type"),
          factory.createStringLiteral("checkbox")
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("as"),
          factory.createJsxExpression(
            undefined,
            factory.createIdentifier("CheckBox")
          )
        ),
      ])
    );
  }

  private createFormikTextFieldElement(
    name: string,
    text: string
  ): ts.JsxSelfClosingElement {
    return factory.createJsxSelfClosingElement(
      factory.createIdentifier("Field"),
      undefined,
      factory.createJsxAttributes([
        factory.createJsxAttribute(
          factory.createIdentifier("name"),
          factory.createStringLiteral(name)
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("type"),
          factory.createStringLiteral("input")
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("as"),
          factory.createJsxExpression(
            undefined,
            factory.createIdentifier("TextField")
          )
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("label"),
          factory.createStringLiteral(text)
        ),
      ])
    );
  }

  private createSubmitButton(): ts.JsxElement {
    return factory.createJsxElement(
      factory.createJsxOpeningElement(
        factory.createIdentifier("div"),
        undefined,
        factory.createJsxAttributes([])
      ),
      [
        factory.createJsxText("\
            ", true),
        factory.createJsxElement(
          factory.createJsxOpeningElement(
            factory.createIdentifier("Button"),
            undefined,
            factory.createJsxAttributes([
              factory.createJsxAttribute(
                factory.createIdentifier("type"),
                factory.createStringLiteral("submit")
              ),
            ])
          ),
          [factory.createJsxText("Submit", false)],
          factory.createJsxClosingElement(factory.createIdentifier("Button"))
        ),
        factory.createJsxText("\
        ", true),
      ],
      factory.createJsxClosingElement(factory.createIdentifier("div"))
    );
  }
  private createFormikWrapper(formik: ts.JsxElement) {
    return factory.createJsxElement(
      factory.createJsxOpeningElement(
        factory.createIdentifier("div"),
        undefined,
        factory.createJsxAttributes([
          factory.createJsxAttribute(
            factory.createIdentifier("style"),
            factory.createJsxExpression(
              undefined,
              factory.createObjectLiteralExpression(
                [
                  factory.createPropertyAssignment(
                    factory.createIdentifier("height"),
                    factory.createNumericLiteral("400")
                  ),
                  factory.createPropertyAssignment(
                    factory.createIdentifier("width"),
                    factory.createStringLiteral("100%")
                  ),
                ],
                false
              )
            )
          ),
        ])
      ),
      [
        factory.createJsxText("\
              ", true),
        formik,
        factory.createJsxText("\
            ", true),
      ],
      factory.createJsxClosingElement(factory.createIdentifier("div"))
    );
  }
}
