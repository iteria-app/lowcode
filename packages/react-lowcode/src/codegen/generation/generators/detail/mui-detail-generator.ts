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
import { Formatter } from "../../../definition/context-types";
import { MuiDetailComponents } from "../../../definition/material-ui/detail";
import { Entity, Property } from "../../entity";
import { getPropertyType, PropertyType } from "../../typeAlias";
import { createImportDeclaration, createNameSpaceImport } from "../../ts/imports";

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

    var functionalComponent = this.createConstFunction(
      "FormikComponent",
      statements
    );

    this._imports = [...this._imports, ...this.intlFormatter.getImports()];

    var uniqueImports = this.uniqueImports();
    uniqueImports.push(
      createNameSpaceImport("React", "react")
    );
    uniqueImports.push(
      createImportDeclaration(
        "TextField, Button, Checkbox",
        "@material-ui/core"
      )
    );
    uniqueImports.push(
      createImportDeclaration("useFormik", "formik")
    );

    uniqueImports.push(
      createImportDeclaration("Customer", "./Customer")
    );

    return { functionDeclaration: functionalComponent, imports: uniqueImports };
  }

  private createStatements(): ts.Statement[] {
    let statements = new Array<ts.Statement>();
    if (this.context.formatter === Formatter.Intl) {
      statements.push(this.intlFormatter.getImperativeHook());
    }

    let fields = this.createInputsForEntity();

    var formElement = this.createFormElement(fields);

    let wrapper = this.createFormikWrapper(formElement);
    statements.push(
      factory.createReturnStatement(
        factory.createParenthesizedExpression(wrapper)
      )
    );

    return statements;
  }

  private createInputsForEntity(): ts.JsxChild[] {
    let inputs: ts.JsxChild[] = [];

    this.getProperties().forEach((property) => {
      let propertyInput = this.tryCreateInputForProperty(property);

      if (propertyInput) {
        inputs.push(propertyInput);
      }
    });

    return inputs;
  }

  private tryCreateInputForProperty(
    property: Property
  ): ts.JsxChild | undefined {
    let propType: PropertyType = getPropertyType(property);
    let propertyName = property.getName();

    let input: ts.JsxChild | undefined;

    switch (propType) {
      case PropertyType.string:
        input = this.createTextFieldComponent(propertyName, propertyName);
        break;
      case PropertyType.datetime:
        input = this.createDateComponent(propertyName, propertyName);
        break;
    }

    return input;
  }

  private createTextFieldComponent(
    name: string,
    text: string
  ): ts.JsxSelfClosingElement {
    return factory.createJsxSelfClosingElement(
      factory.createIdentifier("TextField"),
      undefined,
      factory.createJsxAttributes([
        factory.createJsxAttribute(
          factory.createIdentifier("fullWidth"),
          undefined
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("id"),
          factory.createStringLiteral(name)
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("type"),
          factory.createStringLiteral("input")
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("label"),
          factory.createStringLiteral(text)
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("value"),
          factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("formik"),
                factory.createIdentifier("values")
              ),
              factory.createIdentifier(name)
            )
          )
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("onChange"),
          factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
              factory.createIdentifier("formik"),
              factory.createIdentifier("handleChange")
            )
          )
        ),
      ])
    );
  }

  private createCheckboxComponent(name: string): ts.JsxSelfClosingElement {
    return factory.createJsxSelfClosingElement(
      factory.createIdentifier("Checkbox"),
      undefined,
      factory.createJsxAttributes([
        factory.createJsxAttribute(
          factory.createIdentifier("id"),
          factory.createStringLiteral("isActive")
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("value"),
          factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("formik"),
                factory.createIdentifier("values")
              ),
              factory.createIdentifier(name)
            )
          )
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("onChange"),
          factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
              factory.createIdentifier("formik"),
              factory.createIdentifier("handleChange")
            )
          )
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

  private createFormElement(fields: ts.JsxChild[]): ts.JsxElement {
    return factory.createJsxElement(
      factory.createJsxOpeningElement(
        factory.createIdentifier("form"),
        undefined,
        factory.createJsxAttributes([
          factory.createJsxAttribute(
            factory.createIdentifier("onSubmit"),
            factory.createJsxExpression(
              undefined,
              factory.createPropertyAccessExpression(
                factory.createIdentifier("formik"),
                factory.createIdentifier("handleSubmit")
              )
            )
          ),
        ])
      ),
      fields,
      factory.createJsxClosingElement(factory.createIdentifier("form"))
    );
  }
  private createDateComponent(
    name: string,
    label: string
  ): ts.JsxSelfClosingElement {
    return factory.createJsxSelfClosingElement(
      factory.createIdentifier("TextField"),
      undefined,
      factory.createJsxAttributes([
        factory.createJsxAttribute(
          factory.createIdentifier("fullWidth"),
          undefined
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("id"),
          factory.createStringLiteral(name)
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("type"),
          factory.createStringLiteral("date")
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("label"),
          factory.createStringLiteral(label)
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("InputLabelProps"),
          factory.createJsxExpression(
            undefined,
            factory.createObjectLiteralExpression(
              [
                factory.createPropertyAssignment(
                  factory.createIdentifier("shrink"),
                  factory.createTrue()
                ),
              ],
              false
            )
          )
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("value"),
          factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("formik"),
                factory.createIdentifier("values")
              ),
              factory.createIdentifier(name)
            )
          )
        ),
        factory.createJsxAttribute(
          factory.createIdentifier("onChange"),
          factory.createJsxExpression(
            undefined,
            factory.createPropertyAccessExpression(
              factory.createIdentifier("formik"),
              factory.createIdentifier("handleChange")
            )
          )
        ),
      ])
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
                    factory.createIdentifier("marginLeft"),
                    factory.createNumericLiteral("25")
                  ),
                  factory.createPropertyAssignment(
                    factory.createIdentifier("marginRight"),
                    factory.createNumericLiteral("25")
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

  private creteInitialValuesForEntity() {
    let inputs: ts.PropertyAssignment[] = [];

    this.getProperties().forEach((property) => {
      let propertyInput = this.tryCreateInitialValueForProperty(property);

      if (propertyInput) {
        inputs.push(propertyInput);
      }
    });

    return inputs;
  }

  private tryCreateInitialValueForProperty(
    property: Property
  ): ts.PropertyAssignment | undefined {
    let propType: PropertyType = getPropertyType(property);
    let propertyName = property.getName();

    let assignment: ts.PropertyAssignment | undefined;

    switch (propType) {
      case PropertyType.string:
        assignment = factory.createPropertyAssignment(
          factory.createIdentifier(propertyName),
          factory.createIdentifier("customer." + propertyName)
        );
        break;
      case PropertyType.datetime:
        assignment = factory.createPropertyAssignment(
          factory.createIdentifier(propertyName),
          factory.createIdentifier("customer." + propertyName)
        );
        break;
    }

    return assignment;
  }

  private createConstFunction(
    componentName: string,
    body: ts.Statement[]
  ): ts.VariableStatement {
    return factory.createVariableStatement(
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList([
        factory.createVariableDeclaration(
          factory.createIdentifier(componentName),
          undefined,
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("React"),
              factory.createIdentifier("FC")
            ),
            [
              factory.createTypeReferenceNode(
                factory.createIdentifier("Customer"),
                undefined
              ),
            ]
          ),
          factory.createArrowFunction(
            undefined,
            undefined,
            [
              factory.createParameterDeclaration(
                undefined,
                undefined,
                undefined,
                factory.createIdentifier("(customer)"),
                undefined,
                undefined,
                undefined
              ),
            ],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createBlock([
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [
                    factory.createVariableDeclaration(
                      factory.createIdentifier("formik"),
                      undefined,
                      undefined,
                      factory.createCallExpression(
                        factory.createIdentifier("useFormik"),
                        undefined,
                        [
                          factory.createObjectLiteralExpression(
                            [
                              factory.createPropertyAssignment(
                                factory.createIdentifier("initialValues"),
                                factory.createObjectLiteralExpression(
                                  this.creteInitialValuesForEntity(),
                                  false
                                )
                              ),
                              factory.createPropertyAssignment(
                                factory.createIdentifier("onSubmit"),
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
                                  factory.createToken(
                                    ts.SyntaxKind.EqualsGreaterThanToken
                                  ),
                                  factory.createBlock([], false)
                                )
                              ),
                            ],
                            true
                          ),
                        ]
                      )
                    ),
                  ],
                  ts.NodeFlags.Const
                )
              ),
              factory.createBlock(body, true),
            ])
          )
        ),
      ])
    );
  }
}
