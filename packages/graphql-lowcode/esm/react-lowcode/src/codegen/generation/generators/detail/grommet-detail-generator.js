import ts, { factory } from "typescript";
import { Formatter } from "../../../definition/context-types";
import { getProperties } from "../../entity";
import { createNamedImportDeclaration, createNameSpaceImport, uniqueImports } from "../../../ast/imports";
import { GeneratorHelper } from "../helper";
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter";
import { GrommetDetailComponents } from "../../../definition/grommet/detail";
import { getPropertyType, PropertyType } from "../../graphql/typeAlias";
import { getEntityName } from "../../entity/helper";
export default class GrommetDetailGenerator {
    constructor(generationContext, entity) {
        this._imports = [];
        this._helper = new GeneratorHelper(generationContext, this._imports);
        this._context = generationContext;
        this._entity = entity;
        this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports);
        this._dataPropertyName = getEntityName(this._entity);
    }
    getDetailDefinition() {
        return GrommetDetailComponents;
    }
    generateComponent() {
        var statements = this.createStatements();
        var functionalComponent = this.createConstFunction("GeneratedFormikComponent", statements);
        this._imports = [...this._imports, ...this._intlFormatter.getImports()];
        var uniqueFileImports = uniqueImports(this._imports);
        uniqueFileImports.push(createNameSpaceImport("React", "react"));
        uniqueFileImports.push(createNamedImportDeclaration("TextInput", "grommet"));
        uniqueFileImports.push(createNamedImportDeclaration("useFormik", "formik"));
        uniqueFileImports.push(createNamedImportDeclaration("useIntl", "react-intl"));
        uniqueFileImports.push(createNamedImportDeclaration(this._entity.getName(), "./" + this._entity.getName()));
        return { functionDeclaration: functionalComponent, imports: uniqueFileImports };
    }
    createStatements() {
        let statements = new Array();
        if (this._context.formatter === Formatter.ReactIntl) {
            statements.push(this._intlFormatter.getImperativeHook());
        }
        let fields = this.createInputsForEntity();
        var formElement = this.createFormElement(fields);
        let wrapper = this.createFormikWrapper(formElement);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(wrapper)));
        return statements;
    }
    createInputsForEntity() {
        let inputs = [];
        getProperties(this._entity).forEach((property) => {
            let propertyInput = this.tryCreateInputForProperty(property);
            if (propertyInput) {
                inputs.push(propertyInput);
            }
        });
        return inputs;
    }
    tryCreateInputForProperty(property) {
        let propType = getPropertyType(property);
        let propertyName = property.getName();
        let input;
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
    createTextFieldComponent(name, text) {
        return factory.createJsxSelfClosingElement(factory.createIdentifier("TextInput"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("id"), factory.createStringLiteral(this._dataPropertyName + "." + name)),
            factory.createJsxAttribute(factory.createIdentifier("type"), factory.createStringLiteral("input")),
            factory.createJsxAttribute(factory.createIdentifier("placeholder"), factory.createStringLiteral(text)),
            factory.createJsxAttribute(factory.createIdentifier("value"), factory.createJsxExpression(undefined, factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("intl"), factory.createIdentifier("formatMessage")), undefined, [factory.createObjectLiteralExpression([factory.createPropertyAssignment(factory.createIdentifier("'" + "id"), factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createIdentifier("formik"), factory.createIdentifier("values")), factory.createIdentifier(text + "'")))], false)]))),
            factory.createJsxAttribute(factory.createIdentifier("onChange"), factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(factory.createIdentifier("formik"), factory.createIdentifier("handleChange")))),
        ]));
    }
    createFormElement(fields) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("form"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("onSubmit"), factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(factory.createIdentifier("formik"), factory.createIdentifier("handleSubmit")))),
        ])), fields, factory.createJsxClosingElement(factory.createIdentifier("form")));
    }
    createDateComponent(name, label) {
        return factory.createJsxSelfClosingElement(factory.createIdentifier("TextInput"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("id"), factory.createStringLiteral(name)),
            factory.createJsxAttribute(factory.createIdentifier("type"), factory.createStringLiteral("date")),
            factory.createJsxAttribute(factory.createIdentifier("placeholder"), factory.createStringLiteral(label)),
            factory.createJsxAttribute(factory.createIdentifier("value"), factory.createJsxExpression(undefined, factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("intl"), factory.createIdentifier("formatDate")), undefined, [factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createIdentifier("formik"), factory.createIdentifier("values")), factory.createIdentifier(name))]))),
            factory.createJsxAttribute(factory.createIdentifier("onChange"), factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(factory.createIdentifier("formik"), factory.createIdentifier("handleChange")))),
        ]));
    }
    createFormikWrapper(formik) {
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("div"), undefined, factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier("style"), factory.createJsxExpression(undefined, factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(factory.createIdentifier("marginLeft"), factory.createNumericLiteral("25")),
                factory.createPropertyAssignment(factory.createIdentifier("marginRight"), factory.createNumericLiteral("25")),
            ], false))),
        ])), [
            factory.createJsxText("\
              ", true),
            formik,
            factory.createJsxText("\
            ", true),
        ], factory.createJsxClosingElement(factory.createIdentifier("div")));
    }
    creteInitialValuesForEntity() {
        let inputs = [];
        getProperties(this._entity).forEach((property) => {
            let propertyInput = this.tryCreateInitialValueForProperty(property);
            if (propertyInput) {
                inputs.push(propertyInput);
            }
        });
        return inputs;
    }
    tryCreateInitialValueForProperty(property) {
        let propType = getPropertyType(property);
        let propertyName = property.getName();
        let assignment;
        switch (propType) {
            case PropertyType.string:
                assignment = factory.createPropertyAssignment(factory.createIdentifier(propertyName), factory.createIdentifier(this._dataPropertyName + "." + propertyName));
                break;
            case PropertyType.datetime:
                assignment = factory.createPropertyAssignment(factory.createIdentifier(propertyName), factory.createIdentifier(this._dataPropertyName + "." + propertyName));
                break;
        }
        return assignment;
    }
    createConstFunction(componentName, body) {
        return factory.createVariableStatement([factory.createModifier(ts.SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([
            factory.createVariableDeclaration(factory.createIdentifier(componentName), undefined, factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier("React"), factory.createIdentifier("FC")), [
                factory.createTypeReferenceNode(factory.createIdentifier(this._entity.getName()), undefined),
            ]), factory.createArrowFunction(undefined, undefined, [
                factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier("(" + this._dataPropertyName + ")"), undefined, undefined, undefined),
            ], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock([
                factory.createVariableStatement(undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createIdentifier("intl"), undefined, undefined, factory.createCallExpression(factory.createIdentifier("useIntl"), undefined, []))], ts.NodeFlags.Const)),
                factory.createVariableStatement(undefined, factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(factory.createIdentifier("formik"), undefined, undefined, factory.createCallExpression(factory.createIdentifier("useFormik"), undefined, [
                        factory.createObjectLiteralExpression([
                            factory.createPropertyAssignment(factory.createIdentifier("initialValues"), factory.createObjectLiteralExpression(this.creteInitialValuesForEntity(), false)),
                            factory.createPropertyAssignment(factory.createIdentifier("onSubmit"), factory.createArrowFunction(undefined, undefined, [
                                factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier("values"), undefined, undefined, undefined),
                            ], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock([], false))),
                        ], true),
                    ])),
                ], ts.NodeFlags.Const)),
                factory.createBlock(body, true),
            ]))),
        ]));
    }
}
