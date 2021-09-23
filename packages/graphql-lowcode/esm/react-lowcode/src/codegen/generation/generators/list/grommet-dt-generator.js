import ts, { factory } from "typescript";
import { createFunctionalComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper';
import { getProperties } from '../../entity/index';
import { GrommetDtTableComponents } from '../../../definition/grommet/table';
import { Formatter } from "../../../definition/context-types";
import { GeneratorHelper } from "../helper";
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter";
import { uniqueImports } from "../../../ast/imports";
import { createAst, replaceElementsToAST } from "../../../../ast";
import { findVariableDeclarations } from "../../../ast/ast";
import { findWidgetParentNode } from "../../../ast/widgetDeclaration";
export default class GrommetDataTableGenerator {
    constructor(generationContext, entity, widgetContext) {
        this._imports = [];
        this._helper = new GeneratorHelper(generationContext, this._imports);
        this._context = generationContext;
        this._entity = entity;
        this._widgetContext = widgetContext;
        this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports);
    }
    async insertColumn(position, property, columnIndex) {
        let alteredSource = '';
        if (this._widgetContext) {
            let sourceCode = await this._widgetContext.getSourceCodeString(position);
            let ast = createAst(sourceCode);
            if (ast) {
                let widgetParentNode = findWidgetParentNode(sourceCode, position);
                if (widgetParentNode) {
                    let columnsDeclarationNode = this.findColumnsDeclaration(widgetParentNode);
                    if (columnsDeclarationNode) {
                        let columnDeclarationArray = columnsDeclarationNode.getChildAt(2);
                        if (columnDeclarationArray) {
                            ast = this.addNewColumn(columnDeclarationArray, property, ast, columnIndex);
                        }
                    }
                }
                alteredSource = this.printSourceCode(ast);
            }
        }
        return alteredSource;
    }
    printSourceCode(sourceFile) {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        return printer.printFile(sourceFile);
    }
    addNewColumn(columnDeclarationParent, property, ast, columnIndex) {
        let newColumnsDefinition = this.newColumnsDeclaration(columnDeclarationParent, property, columnIndex);
        return replaceElementsToAST(ast, columnDeclarationParent.pos, factory.createArrayLiteralExpression(newColumnsDefinition));
    }
    findColumnsDeclaration(widgetParent) {
        let array = [];
        findVariableDeclarations(widgetParent, array);
        if (array.length > 0) {
            let columnDeclaration = array.filter((def) => {
                return def.getChildAt(0).getFullText().trim() === 'columns';
            });
            if (columnDeclaration && columnDeclaration.length > 0) {
                return columnDeclaration[0];
            }
        }
        return undefined;
    }
    newColumnsDeclaration(columnDeclarationParent, property, columnIndex) {
        let newElements = [];
        let oldElements = columnDeclarationParent.elements;
        let newColumnDefinition = this.createColumnDefinition(property, this.getUsedFormatter(columnDeclarationParent));
        if (columnIndex && columnIndex > 0 && columnIndex < oldElements.length + 1) {
            newElements = [...oldElements.slice(0, columnIndex - 1),
                newColumnDefinition,
                ...oldElements.slice(columnIndex - 1)];
        }
        else if (columnIndex === 0) {
            newElements = [newColumnDefinition, ...oldElements];
        }
        else {
            newElements = [...oldElements, newColumnDefinition];
        }
        return newElements;
    }
    getTableDefinition() {
        return GrommetDtTableComponents;
    }
    generateComponent() {
        if (this._entity) {
            var statements = this.createStatements();
            var functionalComponent = createFunctionalComponent(this._helper.getComponentName(this._entity), [this._helper.createInputParameter(this._entity)], statements);
            this._imports = [...this._imports, ...this._intlFormatter.getImports()];
            return { functionDeclaration: functionalComponent, imports: uniqueImports(this._imports) };
        }
        return undefined;
    }
    createStatements() {
        let statements = new Array();
        let columnsIdentifier = factory.createIdentifier("columns");
        let columnsDeclaration = this.createColumns(columnsIdentifier);
        var columnAttribute = createJsxAttribute("columns", "columns");
        statements.push(factory.createVariableStatement(undefined, columnsDeclaration));
        var dataAttribute = createJsxAttribute("data", this._helper.getInputParameterIdentifier(this._entity));
        var dataGridComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports);
        statements.push(factory.createReturnStatement(factory.createParenthesizedExpression(createJsxSelfClosingElement(dataGridComponent.tagName, [columnAttribute, dataAttribute]))));
        return statements;
    }
    createColumns(columnsIdentifier) {
        let propertiesColumnDefinitions = Array();
        getProperties(this._entity).forEach(property => {
            propertiesColumnDefinitions.push(this.createColumnDefinition(property, this._context.formatter));
        });
        return factory.createVariableDeclarationList([factory.createVariableDeclaration(columnsIdentifier, undefined, undefined, factory.createArrayLiteralExpression(propertiesColumnDefinitions, true))], ts.NodeFlags.Const);
    }
    createColumnDefinition(property, formatter) {
        let properties = [
            factory.createPropertyAssignment(factory.createIdentifier("property"), factory.createStringLiteral(property.getName())),
            factory.createPropertyAssignment(factory.createIdentifier("header"), this._helper.getHeaderTitle(this._entity, property))
        ];
        if (formatter) {
            if (formatter === Formatter.ReactIntl) {
                properties.push(factory.createPropertyAssignment(factory.createIdentifier("render"), this.getRender(property)));
            }
        }
        return factory.createObjectLiteralExpression(properties, false);
    }
    getUsedFormatter(columnsDefinition) {
        return columnsDefinition.elements.length === 0 ? Formatter.None
            : columnsDefinition.elements[0].properties.length > 2
                ? Formatter.ReactIntl
                : Formatter.None;
    }
    getRender(property) {
        let fallbackExpression = factory.createIdentifier("val");
        let propertyAccessExpression = factory.createPropertyAccessExpression(fallbackExpression, factory.createIdentifier(property.getName()));
        let expression = factory.createJsxExpression(undefined, propertyAccessExpression);
        let formattedChild;
        let formattedTag = this._intlFormatter.tryFormatPropertyUsingTag(property, expression);
        if (formattedTag) {
            formattedChild = formattedTag;
        }
        else {
            formattedChild = propertyAccessExpression;
        }
        return factory.createArrowFunction(undefined, undefined, [factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier("val"), undefined, undefined, undefined)], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createParenthesizedExpression(formattedChild));
    }
}
