import ts, { factory, SyntaxKind } from "typescript";
import { Formatter } from "../../../definition/context-types";
import { MuiDetailComponents } from "../../../definition/material-ui/detail";
import { getProperties } from "../../entity";
import { getPropertyType } from "../../graphql/typeAlias";
import { createNamedImportDeclaration, createNameSpaceImport, uniqueImports, } from "../../../ast/imports";
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter";
import { createAst, findByCondition, replaceElementsToAST, transformer, } from "../../../../ast";
import { findVariableDeclarations, findObjectLiteralExpression, findPropertyAssignment, printSourceCode, } from "../../../ast/ast";
import { findWidgetParentNode, getWidgetProperties } from "../../../ast/widgetDeclaration";
import { extractInputStatementsFromTemplate } from "../../../ast/node";
import { getDetailComponentName, getEntityInterfaceName, getEntityName } from "../../entity/helper";
import { pascalCase } from "pascal-case";
import { inputsMetadata } from "../../../definition/material-ui/inputsMetadata";
import { createFormikHook, tryCreateInitialValueForProperty } from "../../react-components/formik";
export default class MuiDetailGenerator {
    constructor(generationContext, entity, widgetContext //todo: remove nullable from widgetContext
    ) {
        this._imports = [];
        this.getInputStatementsForProperty = (propType, entityName, propertyName) => {
            const template = this.transformTemplateExpressions(inputsMetadata, {
                'entityName': entityName,
                'propertyName': propertyName
            });
            if (template) {
                const inputTemplateName = propertyName.toLocaleLowerCase().includes("avatar") ? 'AvatarInputTemplate' : inputsMetadata.templatePropertyType[propType];
                return extractInputStatementsFromTemplate(template, inputTemplateName);
            }
        };
        this.transformTemplateExpressions = (metadata, templateExpressionPlaceholders) => {
            const ast = createAst(metadata.template.text);
            if (ast) {
                const transform = (node) => {
                    if (node.parent && ts.isTemplateSpan(node.parent) && ts.isIdentifier(node)) {
                        const key = node.escapedText.toString();
                        if (templateExpressionPlaceholders[key]) {
                            return factory.createIdentifier(templateExpressionPlaceholders[key]);
                        }
                    }
                    if (ts.isTemplateMiddle(node)) {
                        return factory.createIdentifier(node.text);
                    }
                    if (ts.isTemplateHead(node) || ts.isTemplateTail(node)) {
                        return factory.createIdentifier("'");
                    }
                };
                const transformationResult = ts.transform(ast, [transformer(transform)]);
                return printSourceCode(transformationResult.transformed[0]);
            }
        };
        this._context = generationContext;
        this._entity = entity;
        this._widgetContext = widgetContext;
        this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports);
        this._dataPropertyName = this._entity !== undefined ? getEntityName(this._entity) : "";
    }
    async getFormWidgetProperties(position) {
        let result = {
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
    getFormWidgetPropertiesFromAst(ast, position) {
        const result = {
            properties: []
        };
        const pos = ast.getPositionOfLineAndCharacter(position.lineNumber - 1, position.columnNumber - 1);
        const element = findByCondition(ast, (node) => {
            return node.pos === pos;
        });
        if (element) {
            result.properties = getWidgetProperties(element);
        }
        return result;
    }
    async setFormWidgetProperties(position, widgetProperties) {
        let result;
        if (this._widgetContext) {
            const sourceCode = await this._widgetContext.getSourceCodeString(position);
            let ast = createAst(sourceCode);
            if (ast) {
                const pos = ast.getPositionOfLineAndCharacter(position.lineNumber - 1, position.columnNumber - 1);
                const element = findByCondition(ast, (node) => {
                    return node.pos === pos;
                });
                if (element) {
                    if (ts.isJsxOpeningElement(element) || ts.isJsxSelfClosingElement(element)) {
                        let astChanged = false;
                        const newProps = element.attributes.properties.map(prop => {
                            let newProp = prop;
                            if (ts.isJsxAttribute(prop)) {
                                const propName = prop.name.escapedText.toString();
                                const inputProp = widgetProperties.properties.find(l => l.name === propName);
                                if (inputProp) {
                                    if (prop.initializer) {
                                        const initializer = prop.initializer;
                                        // STRING_LITERALS
                                        if (inputProp.type === "STRING_LITERAL") {
                                            const stringLiteral = this.createAttributeForStringLiterals(initializer, inputProp);
                                            if (stringLiteral) {
                                                newProp = factory.updateJsxAttribute(prop, prop.name, stringLiteral);
                                                astChanged = true;
                                            }
                                        }
                                        // EXPRESSIONS 
                                        else if (inputProp.type === "EXPRESSION") {
                                            const expression = this.createAttributeForExpressions(initializer, inputProp);
                                            if (expression) {
                                                newProp = factory.updateJsxAttribute(prop, prop.name, expression);
                                                astChanged = true;
                                            }
                                        }
                                    }
                                    else {
                                        if (inputProp.value.toLowerCase() == 'false') {
                                            newProp = factory.updateJsxAttribute(prop, prop.name, factory.createJsxExpression(undefined, factory.createFalse()));
                                            astChanged = true;
                                        }
                                    }
                                }
                            }
                            return newProp;
                        });
                        if (astChanged) {
                            ast = replaceElementsToAST(ast, element.attributes.pos, factory.createJsxAttributes(newProps.filter(l => l !== undefined)));
                            result = this.printSourceCode(ast);
                        }
                    }
                }
            }
        }
        return result;
    }
    createObjectLiteral(property) {
        return factory.createObjectLiteralExpression([factory.createPropertyAssignment(factory.createIdentifier(property.name.escapedText), property.initializer.text === undefined ? factory.createIdentifier(property.initializer.getText()) : factory.createStringLiteral(property.initializer.text, true))], false);
    }
    createAttributeForStringLiterals(initializer, inputProp) {
        const text = ts.isStringLiteral(initializer) ? initializer.text : initializer.getText();
        if (inputProp.value !== text) {
            return factory.createStringLiteral(inputProp.value);
        }
    }
    createAttributeForExpressions(initializer, inputProp) {
        var _a;
        const text = ts.isJsxExpression(initializer) ? (_a = initializer.expression) === null || _a === void 0 ? void 0 : _a.getText() : initializer.text;
        if (inputProp.value !== text || !ts.isJsxExpression(initializer)) {
            const newAst = createAst(inputProp.value);
            const statement = newAst === null || newAst === void 0 ? void 0 : newAst.statements[0];
            if (statement) {
                const expression = statement === null || statement === void 0 ? void 0 : statement.expression;
                const value = this.createAttributeForNumbers(expression, inputProp) ||
                    this.createAttributeForBooleans(expression, inputProp) ||
                    this.createAttributeForOtherExpression(expression);
                return value;
            }
        }
    }
    createAttributeForNumbers(expression, inputProp) {
        if ((expression === null || expression === void 0 ? void 0 : expression.kind) === SyntaxKind.NumericLiteral) {
            const value = factory.createJsxExpression(undefined, factory.createNumericLiteral(inputProp.value));
            return value;
        }
    }
    createAttributeForBooleans(expression, inputProp) {
        if ((expression === null || expression === void 0 ? void 0 : expression.kind) === SyntaxKind.TrueKeyword || (expression === null || expression === void 0 ? void 0 : expression.kind) === SyntaxKind.FalseKeyword) {
            const value = factory.createJsxExpression(undefined, inputProp.value.toLowerCase() === "true" ? factory.createTrue() : factory.createFalse());
            return value;
        }
    }
    createAttributeForOtherExpression(expression) {
        if ((expression === null || expression === void 0 ? void 0 : expression.kind) === SyntaxKind.CallExpression || (expression === null || expression === void 0 ? void 0 : expression.kind) === SyntaxKind.PropertyAccessExpression) {
            if (expression.arguments && expression.arguments[0].properties) {
                expression.arguments[0] = this.createObjectLiteral(expression.arguments[0].properties[0]);
            }
            const value = factory.createJsxExpression(undefined, expression);
            return value;
        }
    }
    async insertFormWidget(position, property, index) {
        let alteredSource = "";
        if (this._widgetContext) {
            let sourceCode = await this._widgetContext.getSourceCodeString(position);
            let ast = createAst(sourceCode);
            let widgetParentNode = findWidgetParentNode(sourceCode, position);
            if (ast && widgetParentNode) {
                let formikDeclarationNode = this.findGridDeclaration(widgetParentNode);
                if (formikDeclarationNode) {
                    let propertyAssigmentArray = [];
                    findPropertyAssignment(formikDeclarationNode.getChildAt(1), propertyAssigmentArray);
                    if (propertyAssigmentArray) {
                        ast = this.addNewField(formikDeclarationNode, propertyAssigmentArray, property, ast);
                    }
                }
                //find grid container
                let gridContainers = [];
                this.findGridContainer(widgetParentNode, gridContainers);
                if (gridContainers.length > 0) {
                    //find grid items
                    let gridElements = [];
                    this.findGridElement(widgetParentNode, gridElements);
                    if (gridElements) {
                        ast = this.addNewGridElement(gridElements, gridContainers[0], property, ast, index);
                        alteredSource = this.printSourceCode(ast);
                    }
                }
            }
        }
        return alteredSource;
    }
    findGridElement(parentNode, foundedElements) {
        if (parentNode != undefined) {
            if (parentNode.getChildCount() > 0) {
                var children = parentNode.getChildren();
                children.forEach((child) => {
                    if (ts.isJsxElement(child)) {
                        if (child.getFullText().startsWith("Grid item", 1)) {
                            foundedElements.push(child);
                        }
                        else {
                            this.findGridElement(child, foundedElements);
                        }
                    }
                    else {
                        this.findGridElement(child, foundedElements);
                    }
                });
            }
        }
    }
    findGridContainer(parentNode, foundedElements) {
        if (parentNode != undefined) {
            if (parentNode.getChildCount() > 0) {
                var children = parentNode.getChildren();
                children.forEach((child) => {
                    if (ts.isJsxElement(child)) {
                        if (child.getFullText().startsWith("Grid container", 1)) {
                            foundedElements.push(child);
                        }
                        else {
                            this.findGridContainer(child, foundedElements);
                        }
                    }
                    else {
                        this.findGridContainer(child, foundedElements);
                    }
                });
            }
        }
    }
    addNewGridElement(gridElements, gridContainer, property, ast, index) {
        var _a, _b;
        const inputStatements = this.getInputStatementsForProperty(getPropertyType(property), this._entity.getName(), property.getName());
        if (inputStatements) {
            (_a = this._widgetContext) === null || _a === void 0 ? void 0 : _a.addImportArray(inputStatements.importDeclarations);
            (_b = this._widgetContext) === null || _b === void 0 ? void 0 : _b.addStatementIfNotExistArray(inputStatements.variableStatements);
            const gridItemElement = this.createGridItemElement([inputStatements.inputElement]);
            let newElements;
            if (index && index < gridElements.length + 1) {
                newElements = [...gridElements.slice(0, index - 1), gridItemElement, ...gridElements.slice(index - 1)];
            }
            else {
                newElements = [...gridElements, gridItemElement];
            }
            return replaceElementsToAST(ast, gridContainer.pos, this.createGridContainer(newElements));
        }
        return ast;
    }
    addNewField(ole, propertyAssignmentArray, property, ast) {
        let newField = tryCreateInitialValueForProperty(property, this._dataPropertyName);
        let newElements = [
            ...propertyAssignmentArray,
            newField,
        ];
        return replaceElementsToAST(ast, ole.pos, factory.createObjectLiteralExpression(newElements, false));
    }
    printSourceCode(sourceFile) {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        return printer.printFile(sourceFile);
    }
    findGridDeclaration(widgetParent) {
        let array = [];
        findVariableDeclarations(widgetParent, array);
        if (array.length > 0) {
            let formikDeclaration = array.filter((def) => {
                return def.getChildAt(0).getFullText().trim() === "formik";
            });
            let arrayOle = [];
            findObjectLiteralExpression(formikDeclaration[0], arrayOle);
            if (arrayOle) {
                return arrayOle[1];
            }
        }
        return undefined;
    }
    getDetailDefinition() {
        return MuiDetailComponents;
    }
    generateComponent() {
        if (this._entity) {
            var statements = this.createStatements();
            var functionalComponent = this.createConstFunction(getDetailComponentName(this._entity), statements);
            this._imports = [...this._imports, ...this._intlFormatter.getImports()];
            var uniqueFileImports = uniqueImports(this._imports);
            uniqueFileImports.push(createNameSpaceImport("React", "react"));
            uniqueFileImports.push(createNamedImportDeclaration("TextField, Avatar, Card, CardHeader, CardContent, Grid", "@material-ui/core"));
            uniqueFileImports.push(createNamedImportDeclaration("useFormik", "formik"));
            const interfaceName = getEntityInterfaceName(this._entity);
            uniqueFileImports.push(createNamedImportDeclaration(interfaceName, "./" + interfaceName));
            return {
                functionDeclaration: functionalComponent,
                imports: uniqueFileImports,
            };
        }
        else
            return undefined;
    }
    createStatements() {
        let statements = new Array();
        if (this._context.formatter === Formatter.ReactIntl) {
            statements.push(this._intlFormatter.getImperativeHook());
        }
        let fields = this.createInputsForEntity();
        let card = this.createCardElement(fields);
        var formElement = this.createFormElement(card);
        let wrapper = this.createFormikWrapper(formElement);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(wrapper)));
        return statements;
    }
    createInputsForEntity() {
        let inputs = [];
        getProperties(this._entity).forEach((property) => {
            const inputStatements = this.getInputStatementsForProperty(getPropertyType(property), this._entity.getName(), property.getName());
            if (inputStatements) {
                inputs.push(this.createGridItemElement([inputStatements.inputElement]));
            }
        });
        return inputs;
    }
    createFormElement(card) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("form"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("onSubmit"), factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(factory.createIdentifier("formik"), factory.createIdentifier("handleSubmit")))),
        ])), [card], factory.createJsxClosingElement(factory.createIdentifier("form")));
    }
    createCardElement(elements) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("Card"), undefined, factory.createJsxAttributes([])), [
            factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("CardContent"), undefined, factory.createJsxAttributes([])), [this.createGridContainer(elements)], factory.createJsxClosingElement(factory.createIdentifier("CardContent"))),
        ], factory.createJsxClosingElement(factory.createIdentifier("Card")));
    }
    createGridContainer(elements) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("Grid"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("container"), undefined),
            factory.createJsxAttribute(factory.createIdentifier("spacing"), factory.createJsxExpression(undefined, factory.createNumericLiteral("3"))),
        ])), elements, factory.createJsxClosingElement(factory.createIdentifier("Grid")));
    }
    createFormikWrapper(formik) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("div"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("style"), factory.createJsxExpression(undefined, factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(factory.createIdentifier("marginLeft"), factory.createNumericLiteral("25")),
                factory.createPropertyAssignment(factory.createIdentifier("marginRight"), factory.createNumericLiteral("25")),
            ], false))),
        ])), [formik], factory.createJsxClosingElement(factory.createIdentifier("div")));
    }
    createConstFunction(componentName, body) {
        return factory.createVariableStatement([factory.createModifier(ts.SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([
            factory.createVariableDeclaration(factory.createIdentifier(componentName), undefined, factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier("React"), factory.createIdentifier("FC")), [
                factory.createTypeReferenceNode(factory.createIdentifier(pascalCase(this._entity.getName())), undefined),
            ]), factory.createArrowFunction(undefined, undefined, [
                factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier("(" + this._dataPropertyName + ")"), undefined, undefined, undefined),
            ], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock([
                createFormikHook(this._entity, this._dataPropertyName),
                factory.createBlock(body, true),
            ]))),
        ]));
    }
    createGridItemElement(children) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("Grid"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("item"), undefined),
            factory.createJsxAttribute(factory.createIdentifier("md"), factory.createJsxExpression(undefined, factory.createNumericLiteral("6"))),
            factory.createJsxAttribute(factory.createIdentifier("xs"), factory.createJsxExpression(undefined, factory.createNumericLiteral("12"))),
        ])), children, factory.createJsxClosingElement(factory.createIdentifier("Grid")));
    }
}
