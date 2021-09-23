import ts, { factory } from "typescript";
import { getPropertyType, PropertyType } from '../../graphql/typeAlias';
import { createFunctionalComponent, createJsxSelfClosingElement, createJsxAttribute } from '../../react-components/react-component-helper';
import { getProperties } from '../../entity/index';
import { MuiDtTableComponents, muiDataGrid } from '../../../definition/material-ui/table';
import { Formatter } from "../../../definition/context-types";
import { createNameSpaceImport, uniqueImports } from "../../../ast/imports";
import { GeneratorHelper } from "../helper";
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter";
import { createAst, findByCondition, removeElementFromAst, replaceElementsToAST } from "../../../../ast";
import { findVariableDeclarations } from "../../../ast/ast";
import { findWidgetParentNode } from "../../../ast/widgetDeclaration";
import { getDetailModuleUri, getListComponentName } from "../../entity/helper";
import { defineHook } from "../../../ast/hooks";
import { createVariableStatement } from "../../../ast/variables";
export default class MuiDataTableGenerator {
    constructor(generationContext, entity, widgetContext) {
        this._imports = [];
        this._helper = new GeneratorHelper(generationContext, this._imports);
        this._context = generationContext;
        this._entity = entity;
        this._widgetContext = widgetContext;
        this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports);
    }
    async insertColumn(tablePosition, property, columnIndex) {
        let alteredSource = '';
        if (this._widgetContext) {
            const sourceCode = await this._widgetContext.getSourceCodeString(tablePosition);
            let ast = createAst(sourceCode);
            if (ast) {
                const columnDeclarationArray = this.getColumnsDeclaration(sourceCode, tablePosition);
                if (columnDeclarationArray) {
                    ast = this.addNewColumn(columnDeclarationArray, property, ast, columnIndex);
                }
                alteredSource = this.printSourceCode(ast);
            }
        }
        return alteredSource;
    }
    async deleteColumn(tablePosition, columnIndex) {
        let alteredSource = '';
        if (this._widgetContext) {
            const sourceCode = await this._widgetContext.getSourceCodeString(tablePosition);
            let ast = createAst(sourceCode);
            if (ast) {
                const columnDeclarationArray = this.getColumnsDeclaration(sourceCode, tablePosition);
                if (columnDeclarationArray === null || columnDeclarationArray === void 0 ? void 0 : columnDeclarationArray.elements[columnIndex]) {
                    ast = removeElementFromAst(ast, columnDeclarationArray.elements[columnIndex].pos);
                }
                alteredSource = this.printSourceCode(ast);
            }
        }
        return alteredSource;
    }
    async getColumnSourcePosition(tablePosition, columnIndex) {
        let result;
        if (this._widgetContext) {
            const sourceCode = await this._widgetContext.getSourceCodeString(tablePosition);
            let ast = createAst(sourceCode);
            if (ast) {
                const columnDeclarationArray = this.getColumnsDeclaration(sourceCode, tablePosition);
                if (columnDeclarationArray === null || columnDeclarationArray === void 0 ? void 0 : columnDeclarationArray.elements[columnIndex]) {
                    let renderHeaderPosition, valueFormatterPosition;
                    const columnPosition = ast.getLineAndCharacterOfPosition(columnDeclarationArray.elements[columnIndex].getStart());
                    const renderHeader = findByCondition(columnDeclarationArray.elements[columnIndex], (node) => {
                        if (ts.isPropertyAssignment(node)) {
                            if (ts.isIdentifier(node.name)) {
                                return node.name.escapedText === 'renderHeader';
                            }
                        }
                        return false;
                    });
                    const valueFormatter = findByCondition(columnDeclarationArray.elements[columnIndex], (node) => {
                        if (ts.isPropertyAssignment(node)) {
                            if (ts.isIdentifier(node.name)) {
                                return node.name.escapedText === 'valueFormatter';
                            }
                        }
                        return false;
                    });
                    if (renderHeader) {
                        renderHeaderPosition = ast.getLineAndCharacterOfPosition(renderHeader.getStart());
                    }
                    if (valueFormatter) {
                        valueFormatterPosition = ast.getLineAndCharacterOfPosition(valueFormatter.getStart());
                    }
                    result = {
                        columnPosition: {
                            fileName: tablePosition.fileName,
                            columnNumber: columnPosition.character + 1,
                            lineNumber: columnPosition.line + 1,
                            length: columnDeclarationArray.elements[columnIndex].getText().length
                        },
                        headerPosition: renderHeader && renderHeaderPosition ? {
                            fileName: tablePosition.fileName,
                            columnNumber: renderHeaderPosition.character + 1,
                            lineNumber: renderHeaderPosition.line + 1,
                            length: renderHeader.getText().length
                        } : undefined,
                        valuePosition: valueFormatter && valueFormatterPosition ? {
                            fileName: tablePosition.fileName,
                            columnNumber: valueFormatterPosition.character + 1,
                            lineNumber: valueFormatterPosition.line + 1,
                            length: valueFormatter.getText().length
                        } : undefined
                    };
                }
            }
        }
        return result;
    }
    getColumnsDeclaration(sourceCode, tablePosition) {
        let result;
        let widgetParentNode = findWidgetParentNode(sourceCode, tablePosition);
        if (widgetParentNode) {
            let columnsDeclarationNode = this.findColumnsDeclaration(widgetParentNode);
            if (columnsDeclarationNode) {
                result = columnsDeclarationNode.getChildAt(2);
            }
        }
        return result;
    }
    printSourceCode(sourceFile) {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        return printer.printFile(sourceFile);
    }
    addNewColumn(columnDeclarationParent, property, ast, columnIndex) {
        let newColumnsDefinition = this.getNewColumnsDeclaration(columnDeclarationParent, property, columnIndex);
        return replaceElementsToAST(ast, columnDeclarationParent.pos, factory.createArrayLiteralExpression(newColumnsDefinition));
    }
    getNewColumnsDeclaration(columnDeclarationParent, property, columnIndex) {
        let newElements = [];
        let oldElements = columnDeclarationParent.elements;
        let newColumnDefinition = this.createColumnDefinition(property, this.getUsedFormatter(columnDeclarationParent));
        if (columnIndex && columnIndex > 0 && columnIndex < oldElements.length + 1) {
            newElements = [...oldElements.slice(0, columnIndex - 1),
                newColumnDefinition,
                ...oldElements.slice(columnIndex - 1)];
        }
        else {
            newElements = [...oldElements, newColumnDefinition];
        }
        return newElements;
    }
    getUsedFormatter(columnsDefinition) {
        return columnsDefinition.elements.length === 0 ? Formatter.None
            : columnsDefinition.elements[0].properties.length > 3
                ? Formatter.ReactIntl
                : Formatter.None;
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
    generateComponent() {
        if (this._entity) {
            var statements = this.createStatements();
            var functionalComponent = createFunctionalComponent(getListComponentName(this._entity), [this._helper.createInputParameter(this._entity)], statements);
            this._imports = [...this._imports, ...this._intlFormatter.getImports()];
            var uniqueFileImports = uniqueImports(this._imports);
            uniqueFileImports.push(createNameSpaceImport('React', 'react'));
            return { functionDeclaration: functionalComponent, imports: uniqueFileImports };
        }
        else
            return undefined;
    }
    getTableDefinition() {
        return MuiDtTableComponents;
    }
    createStatements() {
        let statements = new Array();
        if (this._context.formatter === Formatter.ReactIntl) {
            statements.push(this._intlFormatter.getImperativeHook());
        }
        let columnsIdentifier = factory.createIdentifier("columns");
        let columnsDeclaration = this.createColumns(columnsIdentifier);
        let onclickAttribute = this.getOnClick(statements);
        var columnsAttribute = createJsxAttribute("columns", "columns");
        statements.push(factory.createVariableStatement(undefined, columnsDeclaration));
        var rowsAttribute = createJsxAttribute("rows", this._helper.getInputParameterIdentifier(this._entity));
        let returnStatement = this.createReturnStatement([onclickAttribute, columnsAttribute, rowsAttribute]);
        statements.push(returnStatement);
        return statements;
    }
    getOnClick(statements) {
        var hook = defineHook("navigate", "useNavigate", "react-router-dom");
        this._imports = [...this._imports, hook.importDeclaration];
        let callExpression = factory.createCallExpression(factory.createIdentifier(hook.hookName), undefined, []);
        statements.push(createVariableStatement(hook.defaultInstanceName, callExpression, ts.NodeFlags.Const));
        return factory.createJsxAttribute(factory.createIdentifier("onRowClick"), factory.createJsxExpression(undefined, factory.createArrowFunction(undefined, undefined, [], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createCallExpression(factory.createIdentifier("navigate"), undefined, [
            factory.createStringLiteral(`/app/${getDetailModuleUri(this._entity)}`),
            factory.createObjectLiteralExpression([factory.createPropertyAssignment(factory.createIdentifier("replace"), factory.createTrue())], false)
        ]))));
    }
    createReturnStatement(parameters) {
        var dataGridComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports);
        let wrappedTable = this.createTableWrapper(createJsxSelfClosingElement(dataGridComponent.tagName, parameters));
        return factory.createReturnStatement(factory.createParenthesizedExpression(wrappedTable));
    }
    createTableWrapper(datagrid) {
        var _a, _b, _c;
        return factory.createJsxElement(factory.createJsxOpeningElement(factory.createIdentifier("div"), undefined, factory.createJsxAttributes([factory.createJsxAttribute(factory.createIdentifier("style"), factory.createJsxExpression(undefined, factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(factory.createIdentifier("height"), factory.createStringLiteral((_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.index) === null || _b === void 0 ? void 0 : _b.height) !== null && _c !== void 0 ? _c : "400px")),
                factory.createPropertyAssignment(factory.createIdentifier("width"), factory.createStringLiteral("100%"))
            ], false)))])), [
            factory.createJsxText("\
            ", true),
            datagrid,
            factory.createJsxText("\
          ", true)
        ], factory.createJsxClosingElement(factory.createIdentifier("div")));
    }
    createColumns(columnsIdentifier) {
        let propertiesColumnDefinitions = Array();
        getProperties(this._entity).forEach(property => {
            var _a;
            propertiesColumnDefinitions.push(this.createColumnDefinition(property, (_a = this._context.formatter) !== null && _a !== void 0 ? _a : Formatter.None));
        });
        return factory.createVariableDeclarationList([factory.createVariableDeclaration(columnsIdentifier, undefined, undefined, factory.createArrayLiteralExpression(propertiesColumnDefinitions, true))], ts.NodeFlags.Const);
    }
    createColumnDefinition(property, formatter) {
        let propertyName = property.getName();
        let propType = getPropertyType(property);
        let muiColumnType = 'string';
        //TODO: datetime is not working for numbers, find out why
        switch (propType) {
            case PropertyType.currency:
            case PropertyType.numeric:
                muiColumnType = 'number';
                break;
            case PropertyType.date:
            case PropertyType.datetime:
                muiColumnType = 'date';
                break;
        }
        let properties = [
            factory.createPropertyAssignment(factory.createIdentifier("field"), factory.createStringLiteral(propertyName)),
            factory.createPropertyAssignment(factory.createIdentifier("flex"), factory.createNumericLiteral(1)),
            factory.createPropertyAssignment(factory.createIdentifier("type"), factory.createStringLiteral(muiColumnType))
        ];
        if (formatter === Formatter.ReactIntl) {
            properties.push(factory.createPropertyAssignment(factory.createIdentifier("valueFormatter"), this.getValueFormatter(property)));
            properties.push(factory.createPropertyAssignment(factory.createIdentifier("renderHeader"), this.getHeaderRender(property)));
        }
        else {
            properties.push(factory.createPropertyAssignment(factory.createIdentifier("headerName"), factory.createStringLiteral(property.getName())));
        }
        let expression = factory.createObjectLiteralExpression(properties, false);
        return expression;
    }
    getHeaderRender(property) {
        let declaration = this._helper.addImportDeclaration('GridColParams', muiDataGrid);
        this._imports.push(declaration);
        let localizedProperty = this._intlFormatter.localizePropertyNameUsingTag(property, this._entity);
        return factory.createArrowFunction(undefined, undefined, [factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier("params"), undefined, factory.createTypeReferenceNode(factory.createIdentifier("GridColParams"), undefined), undefined)], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createParenthesizedExpression(localizedProperty));
    }
    getValueFormatter(prop) {
        return factory.createArrowFunction(undefined, undefined, [factory.createParameterDeclaration(undefined, undefined, undefined, factory.createObjectBindingPattern([factory.createBindingElement(undefined, undefined, factory.createIdentifier("value"), undefined)]), undefined, undefined, undefined)], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), this._intlFormatter.formatPropertyUsingImperative(prop, factory.createIdentifier("value"), factory.createIdentifier("value")));
    }
}
