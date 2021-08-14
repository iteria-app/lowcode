import ts, { factory, JsxAttributeLike, Node, ObjectLiteralExpression, SourceFile, SyntaxKind } from "typescript";
import { PageComponent } from "../../react-components/react-component-helper";
import { DetailComponentDefinitionBase } from "../../../definition/detail-definition-core";
import GenerationContext from "../../context/context";
import { Formatter } from "../../../definition/context-types";
import { MuiDetailComponents } from "../../../definition/material-ui/detail";
import { Entity, getProperties, Property } from "../../entity";
import { getPropertyType, PropertyType } from "../../graphql/typeAlias";
import {
  createNamedImportDeclaration,
  createNameSpaceImport,
  uniqueImports,
} from "../../../ast/imports";
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter";
import { WidgetContext } from "../../context/widget-context";
import {
  createAst,
  findByCondition,
  replaceElementsToAST,
  SourceLineCol,
  transformer,
} from "../../../../ast";
import {
  findVariableDeclarations,
  findObjectLiteralExpression,
  findPropertyAssignment,
  printSourceCode,
} from "../../../ast/ast";
import { findWidgetParentNode, getWidgetProperties } from "../../../ast/widgetDeclaration";
import { WidgetProperties } from "../../../interfaces";
import { extractInputStatementsFromTemplate } from "../../../ast/node";
import { getDetailComponentName, getEntityInterfaceName, getEntityName } from "../../entity/helper";
import { ComponentGenerator } from "../../interfaces/generation-interfaces";
import { pascalCase } from "pascal-case";
import { InputsMetadata, inputsMetadata } from "../../../definition/material-ui/inputsMetadata";

export default class MuiDetailGenerator implements ComponentGenerator {


  private _imports: ts.ImportDeclaration[] = [];
  private _context: GenerationContext;
  private _entity: Entity;
  private _widgetContext: WidgetContext | undefined;
  private _intlFormatter: ReactIntlFormatter;
  private _dataPropertyName: string;

  constructor(
    generationContext: GenerationContext,
    entity: Entity,
    widgetContext?: WidgetContext
  ) {
    this._context = generationContext;
    this._entity = entity;
    this._widgetContext = widgetContext;
    this._intlFormatter = new ReactIntlFormatter(
      generationContext,
      this._imports
    );
    this._dataPropertyName = getEntityName(this._entity)
  }

  async getFormWidgetProperties(position: SourceLineCol): Promise<WidgetProperties> {
    let result: WidgetProperties = {
      properties: []
    };

    if (this._widgetContext) {
      const sourceCode = await this._widgetContext.getSourceCodeString(position);
      const ast = createAst(sourceCode);

      if (ast) {
        result = this.getFormWidgetPropertiesFromAst(ast, position);
      }
    }

    return result;
  }

  getFormWidgetPropertiesFromAst(ast: ts.SourceFile, position: SourceLineCol): WidgetProperties {
    const result: WidgetProperties = {
      properties: []
    };

    const pos = ast.getPositionOfLineAndCharacter(position.lineNumber - 1, position.columnNumber - 1);
    const element = findByCondition<Node>(ast, (node: Node) => {
      return node.pos === pos;
    });

    if (element) {
      result.properties = getWidgetProperties(element);
    }

    return result;
  }

  async setFormWidgetProperties(position: SourceLineCol, widgetProperties: WidgetProperties): Promise<string | undefined> {
    let result: string | undefined;

    if (this._widgetContext) {
      const sourceCode = await this._widgetContext.getSourceCodeString(position);
      let ast = createAst(sourceCode);

      if (ast) {
        const pos = ast.getPositionOfLineAndCharacter(position.lineNumber - 1, position.columnNumber - 1);
        const element = findByCondition<Node>(ast, (node: Node) => {
          return node.pos === pos;
        });

        if (element) {
          if (ts.isJsxOpeningElement(element) || ts.isJsxSelfClosingElement(element)) {
            let astChanged = false;

            const newProps = element.attributes.properties.map(prop => {
              let newProp: JsxAttributeLike | undefined = prop;

              if (ts.isJsxAttribute(prop)) {
                const propName = prop.name.escapedText.toString();
                const inputProp = widgetProperties.properties.find(l => l.name === propName);

                if (inputProp) {
                  if (prop.initializer) {
                    if (ts.isStringLiteral(prop.initializer)) {
                      if(inputProp.value !== prop.initializer.text) {
                        newProp = factory.updateJsxAttribute(prop, prop.name, factory.createStringLiteral(inputProp.value));
                        astChanged = true;
                      }
                    } else if (ts.isJsxExpression(prop.initializer)) {
                      if (prop.initializer.expression) {
                        if (prop.initializer.expression.kind === SyntaxKind.TrueKeyword || prop.initializer.expression.kind === SyntaxKind.FalseKeyword) {
                          if(inputProp.value !== prop.initializer.expression.getText()) {
                            const booleanValue = factory.createJsxExpression(
                              undefined,
                              inputProp.value.toLowerCase() === 'true' ? factory.createTrue() : factory.createFalse()
                            )
  
                            newProp = factory.updateJsxAttribute(prop, prop.name, booleanValue);
                            astChanged = true;
                          }
                        }

                        if (ts.isNumericLiteral(prop.initializer.expression)) {
                          if (inputProp.value !== prop.initializer.expression.getText()) {
                            const numericValue = factory.createJsxExpression(
                              undefined,
                              factory.createNumericLiteral(inputProp.value)
                            );

                            newProp = factory.updateJsxAttribute(prop, prop.name, numericValue);
                            astChanged = true;
                          }
                        }
                      }
                    }
                  } else {
                    if(inputProp.value.toLowerCase() == 'false') {
                      newProp = undefined;
                      astChanged = true;
                    }
                  }
                }
              }

              return newProp;
            });

            if(astChanged) {
              ast = replaceElementsToAST(ast, element.attributes.pos, factory.createJsxAttributes(newProps.filter(l => l !== undefined) as ts.JsxAttributeLike[]));
              result = this.printSourceCode(ast);
            }
          }
        }
      }
    }

    return result;
  }

  async insertFormWidget(position: SourceLineCol, property: Property, index?:number): Promise<string> {
    let alteredSource = "";
    if (this._widgetContext) {
      let sourceCode = await this._widgetContext.getSourceCodeString(position);
      let ast = createAst(sourceCode);
      let widgetParentNode = findWidgetParentNode(
        sourceCode,
        position
      );

      if (ast && widgetParentNode) {
        let formikDeclarationNode = this.findGridDeclaration(widgetParentNode);

        if (formikDeclarationNode) {
          let propertyAssigmentArray: ts.PropertyAssignment[] = [];
          findPropertyAssignment(
            formikDeclarationNode.getChildAt(1),
            propertyAssigmentArray
          );

          if (propertyAssigmentArray) {
            ast = this.addNewField(
              formikDeclarationNode,
              propertyAssigmentArray,
              property,
              ast
            );
          }
        }

        //find grid container
        let gridContainers: ts.JsxElement[] = [];
        this.findGridContainer(widgetParentNode, gridContainers);

        if(gridContainers.length > 0){
          //find grid items
          let gridElements: ts.JsxElement[] = [];
          this.findGridElement(widgetParentNode, gridElements);

          if (gridElements) {
              ast = this.addNewGridElement(
                gridElements,
                gridContainers[0],
                property,
                ast,
                index
              );

              alteredSource = this.printSourceCode(ast);
          }
        }
      }
    }

    return alteredSource
  }

  findGridElement(parentNode: ts.Node, foundedElements: ts.JsxElement[]) {
    if (parentNode != undefined) {
      if (parentNode.getChildCount() > 0) {
        var children = parentNode.getChildren();
        children.forEach((child) => {
          if (ts.isJsxElement(child)) {
            if (child.getFullText().startsWith("Grid item", 1)) {
              foundedElements.push(child);
            } else {
              this.findGridElement(child, foundedElements);
            }
          } else {
            this.findGridElement(child, foundedElements);
          }
        });
      }
    }
  }
  
  findGridContainer(parentNode: ts.Node, foundedElements: ts.JsxElement[]) {
    if (parentNode != undefined) {
      if (parentNode.getChildCount() > 0) {
        var children = parentNode.getChildren();
        children.forEach((child) => {
          if (ts.isJsxElement(child)) {
            if (child.getFullText().startsWith("Grid container", 1)) {
              foundedElements.push(child);
            } else {
              this.findGridContainer(child, foundedElements);
            }
          } else {
            this.findGridContainer(child, foundedElements);
          }
        });
      }
    }
  }

  addNewGridElement(
    gridElements: ts.JsxElement[],
    gridContainer: ts.JsxElement,
    property: Property,
    ast: ts.SourceFile,
    index?: number
  ): ts.SourceFile {

    const inputStatements = this.getInputStatementsForProperty(getPropertyType(property), this._entity.getName(), property.getName());

    if(inputStatements) {        
      const gridItemElement = this.createGridItemElement([inputStatements.inputElement]);

      let newElements: ts.JsxElement[];
      if(index && index < gridElements.length + 1){
        newElements = [...gridElements.slice(0, index - 1), gridItemElement, ...gridElements.slice(index - 1)]
      }else{
        newElements = [...gridElements, gridItemElement]
      }
  
      return replaceElementsToAST(
        ast,
        gridContainer.pos,
        this.createGridContainer(newElements)
      );
    }

    return ast;
  }

  private getInputStatementsForProperty = (propType: PropertyType, entityName: string, propertyName: string): { importDeclarations: ts.ImportDeclaration[], variableStatements: ts.VariableStatement[], inputElement: ts.JsxChild } | undefined => {
    const template = this.transformTemplateExpressions(inputsMetadata, {
      'entityName': entityName,
      'propertyName': propertyName
    });

    if(template) {
      const inputTemplateName = propertyName.toLocaleLowerCase().includes("avatar") ? 'AvatarInputTemplate' : inputsMetadata.templatePropertyType[propType];
      return extractInputStatementsFromTemplate(template, inputTemplateName);
    }
  };

  transformTemplateExpressions = (metadata: InputsMetadata, templateExpressionPlaceholders: { [key: string]: string; }): string | undefined => {
    const ast = createAst(metadata.template.text);

    if (ast) {
      const transform = (node: ts.Node) => {
        if(node.parent && ts.isTemplateSpan(node.parent) && ts.isIdentifier(node)) {
          const key = node.escapedText.toString();

          if(templateExpressionPlaceholders[key]) {
            return factory.createIdentifier(templateExpressionPlaceholders[key]);
          }
        }

        if(ts.isTemplateMiddle(node)) {
          return factory.createIdentifier(node.text);
        }

        if(ts.isTemplateHead(node) || ts.isTemplateTail(node)) {
          return factory.createIdentifier("'");
        }
      };

      const transformationResult = ts.transform(ast, [transformer(transform)]);
      return printSourceCode(transformationResult.transformed[0]);
    }
  };

  private addNewField(
    ole: ObjectLiteralExpression,
    propertyAssignmentArray: ts.PropertyAssignment[],
    property: Property,
    ast: SourceFile
  ): ts.SourceFile {
    let newField = this.tryCreateInitialValueForProperty(property);
    let newElements: ts.PropertyAssignment[] = [
      ...propertyAssignmentArray,
      newField,
    ] as ts.PropertyAssignment[];
    return replaceElementsToAST(
      ast,
      ole.pos,
      factory.createObjectLiteralExpression(newElements, false)
    );
  }

  private printSourceCode(sourceFile: SourceFile): string {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printFile(sourceFile);
  }

  private findGridDeclaration(
    widgetParent: ts.Node
  ): ts.ObjectLiteralExpression | undefined {
    let array: ts.VariableDeclaration[] = [];
    findVariableDeclarations(widgetParent, array);

    if (array.length > 0) {
      let formikDeclaration = array.filter((def: ts.VariableDeclaration) => {
        return def.getChildAt(0).getFullText().trim() === "formik";
      });

      let arrayOle: ts.ObjectLiteralExpression[] = [];
      findObjectLiteralExpression(formikDeclaration[0], arrayOle);

      if (arrayOle) {
        return arrayOle[1];
      }
    }

    return undefined;
  }

  getDetailDefinition(): DetailComponentDefinitionBase {
    return MuiDetailComponents;
  }

  generateComponent(): PageComponent | undefined {
    if(this._entity)
    {
      var statements = this.createStatements();

      var functionalComponent = this.createConstFunction(
        getDetailComponentName(this._entity),
        statements
      );

      this._imports = [...this._imports, ...this._intlFormatter.getImports()];

      var uniqueFileImports = uniqueImports(this._imports);
      uniqueFileImports.push(createNameSpaceImport("React", "react"));
      uniqueFileImports.push(
        createNamedImportDeclaration(
          "TextField, Avatar, Card, CardHeader, CardContent, Grid",
          "@material-ui/core"
        )
      );
      uniqueFileImports.push(createNamedImportDeclaration("useFormik", "formik"));

      const interfaceName = getEntityInterfaceName(this._entity)
      uniqueFileImports.push(createNamedImportDeclaration(interfaceName, "./" + interfaceName));

      return {
        functionDeclaration: functionalComponent,
        imports: uniqueFileImports,
      };
    } else return undefined
  }

  private createStatements(): ts.Statement[] {
    let statements = new Array<ts.Statement>();
    if (this._context.formatter === Formatter.ReactIntl) {
      statements.push(this._intlFormatter.getImperativeHook());
    }

    let fields = this.createInputsForEntity();
    let card = this.createCardElement(fields);
    var formElement = this.createFormElement(card);

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

    getProperties(this._entity).forEach((property) => {
      const inputStatements = this.getInputStatementsForProperty(getPropertyType(property), this._entity.getName(), property.getName());
      if(inputStatements) {
        inputs.push(this.createGridItemElement([inputStatements.inputElement]));
      }
    });

    return inputs;
  }

  private createFormElement(card: ts.JsxElement): ts.JsxElement {
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
      [card],
      factory.createJsxClosingElement(factory.createIdentifier("form"))
    );
  }

  private createCardElement(elements: ts.JsxChild[]): ts.JsxElement {
    return factory.createJsxElement(
      factory.createJsxOpeningElement(
        factory.createIdentifier("Card"),
        undefined,
        factory.createJsxAttributes([])
      ),
      [
        factory.createJsxElement(
          factory.createJsxOpeningElement(
            factory.createIdentifier("CardContent"),
            undefined,
            factory.createJsxAttributes([])
          ),
          [this.createGridContainer(elements)],
          factory.createJsxClosingElement(
            factory.createIdentifier("CardContent")
          )
        ),
      ],
      factory.createJsxClosingElement(factory.createIdentifier("Card"))
    );
  }

  private createGridContainer(elements: ts.JsxChild[]): ts.JsxElement {
    return factory.createJsxElement(
      factory.createJsxOpeningElement(
        factory.createIdentifier("Grid"),
        undefined,
        factory.createJsxAttributes([
          factory.createJsxAttribute(
            factory.createIdentifier("container"),
            undefined
          ),
          factory.createJsxAttribute(
            factory.createIdentifier("spacing"),
            factory.createJsxExpression(
              undefined,
              factory.createNumericLiteral("3")
            )
          ),
        ])
      ),
      elements,
      factory.createJsxClosingElement(factory.createIdentifier("Grid"))
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
      [formik],
      factory.createJsxClosingElement(factory.createIdentifier("div"))
    );
  }
  private creteInitialValuesForEntity() {
    let inputs: ts.PropertyAssignment[] = [];

    getProperties(this._entity).forEach((property) => {
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
          factory.createIdentifier(this._dataPropertyName + "." + propertyName)
        );
        break;
      case PropertyType.datetime:
        assignment = factory.createPropertyAssignment(
          factory.createIdentifier(propertyName),
          factory.createIdentifier(this._dataPropertyName + "." + propertyName)
        );
        break;
    }

    return assignment;
  }
  private getIntlVariable(): ts.VariableStatement | ts.EmptyStatement {
    if (this._context.formatter === Formatter.ReactIntl) {
      return this.createUseIntlVariable();
    } else {
      return factory.createEmptyStatement();
    }
  }
  private createUseIntlVariable(): ts.VariableStatement {
    return factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier("intl"),
            undefined,
            undefined,
            factory.createCallExpression(
              factory.createIdentifier("useIntl"),
              undefined,
              []
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    );
  }
  private createFormikVariale(): ts.VariableStatement {
    return factory.createVariableStatement(
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
    );
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
                factory.createIdentifier(pascalCase(this._entity.getName())),
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
                factory.createIdentifier("(" + this._dataPropertyName + ")"),
                undefined,
                undefined,
                undefined
              ),
            ],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createBlock([
              this.getIntlVariable(),
              this.createFormikVariale(),
              factory.createBlock(body, true),
            ])
          )
        ),
      ])
    );
  }

  private createGridItemElement(children: readonly ts.JsxChild[]): ts.JsxElement {
    return factory.createJsxElement(
      factory.createJsxOpeningElement(
        factory.createIdentifier("Grid"),
        undefined,
        factory.createJsxAttributes([
          factory.createJsxAttribute(
            factory.createIdentifier("item"),
            undefined
          ),
          factory.createJsxAttribute(
            factory.createIdentifier("md"),
            factory.createJsxExpression(
              undefined,
              factory.createNumericLiteral("6")
            )
          ),
          factory.createJsxAttribute(
            factory.createIdentifier("xs"),
            factory.createJsxExpression(
              undefined,
              factory.createNumericLiteral("12")
            )
          ),
        ])
      ),
      children,
      factory.createJsxClosingElement(factory.createIdentifier("Grid"))
    );
  }
}