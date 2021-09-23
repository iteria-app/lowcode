import ts, { factory } from "typescript";
import { createJsxElement, createFunctionalComponent } from '../../react-components/react-component-helper';
import { getProperties } from '../../entity/index';
import { MuiTableComponents } from '../../../definition/material-ui/table';
import { GrommetTableComponents } from '../../../definition/grommet/table';
import { Formatter, UiFramework } from "../../../definition/context-types";
import { uniqueImports } from "../../../ast/imports";
import { GeneratorHelper } from "../helper";
import ReactIntlFormatter from "../../react-components/react-intl/intl-formatter";
import { createAst, replaceElementsToAST } from "../../../../ast";
import { findWidgetParentNode } from "../../../ast/widgetDeclaration";
export class BasicTableGenerator {
    constructor(generationContext, entity, widgetContext) {
        this._imports = [];
        this._helper = new GeneratorHelper(generationContext, this._imports);
        this._context = generationContext;
        this._entity = entity;
        this._widgetContext = widgetContext;
        this._intlFormatter = new ReactIntlFormatter(generationContext, this._imports);
    }
    async insertColumn(position, property, columnIndex) {
        var _a, _b;
        let alteredSource = '';
        if (this._widgetContext) {
            let sourceCode = await this._widgetContext.getSourceCodeString(position);
            let ast = createAst(sourceCode);
            if (ast) {
                let widgetParentNode = findWidgetParentNode(sourceCode, position);
                if (widgetParentNode) {
                    const tableDefinition = this.getTableDefinition();
                    const table = this.findElementByName(widgetParentNode, tableDefinition.table.tagName.text);
                    if (table) {
                        const tableHead = this.findElementByName(table, tableDefinition.header.tagName.text);
                        const tableBody = this.findElementByName(table, tableDefinition.body.tagName.text);
                        if (tableHead && tableBody) {
                            const tableHeadRow = this.findElementByName(tableHead, tableDefinition.row.tagName.text);
                            const tableBodyRow = this.findElementByName(tableBody, tableDefinition.row.tagName.text);
                            // to be able insert into iteration with right iterator
                            const prefixIterator = (_b = (_a = tableBodyRow === null || tableBodyRow === void 0 ? void 0 : tableBodyRow.parent) === null || _a === void 0 ? void 0 : _a.parameters[0]) === null || _b === void 0 ? void 0 : _b.getText();
                            if (tableHeadRow && tableBodyRow) {
                                this._context.formatter = this.findUsedFormatter(ast);
                                let headColumns = [];
                                let bodyColumns = [];
                                this.findElementsByName(tableHeadRow, tableDefinition.cell.tagName.text, headColumns);
                                this.findElementsByName(tableBodyRow, tableDefinition.cell.tagName.text, bodyColumns);
                                if (!this.tableBodyColumnExists(bodyColumns, property)) {
                                    const addHeaderColumn = this.propertyHead(property, this._entity);
                                    const addBodyColumn = this.propertyCell(property, this._entity, prefixIterator);
                                    if (columnIndex && columnIndex > 0 && columnIndex < headColumns.length + 1) {
                                        headColumns = [...headColumns.slice(0, columnIndex - 1), ...[addHeaderColumn], ...headColumns.slice(columnIndex - 1)];
                                        bodyColumns = [...bodyColumns.slice(0, columnIndex - 1), ...[addBodyColumn], ...bodyColumns.slice(columnIndex - 1)];
                                    }
                                    else if (columnIndex !== undefined && columnIndex == 0) {
                                        headColumns = [...[addHeaderColumn], ...headColumns];
                                        bodyColumns = [...[addBodyColumn], ...bodyColumns];
                                    }
                                    else {
                                        headColumns.push(addHeaderColumn);
                                        bodyColumns.push(addBodyColumn);
                                    }
                                    const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports);
                                    const headerRow = createJsxElement(rowComponent.tagName, [], headColumns);
                                    const bodyRow = createJsxElement(rowComponent.tagName, [], bodyColumns);
                                    ast = replaceElementsToAST(ast, tableHeadRow.pos, headerRow);
                                    ast = replaceElementsToAST(ast, tableBodyRow.pos, bodyRow);
                                    alteredSource = this.printSourceCode(ast);
                                    return alteredSource;
                                }
                            }
                        }
                    }
                }
            }
        }
        return alteredSource;
    }
    generateComponent() {
        if (this._entity) {
            var statements = this.createStatements();
            var functionalComponent = createFunctionalComponent(this._helper.getComponentName(this._entity), [this._helper.createInputParameter(this._entity)], statements);
            this._imports = [...this._imports, ...this._intlFormatter.getImports()];
            return { imports: uniqueImports(this._imports), functionDeclaration: functionalComponent };
        }
        return undefined;
    }
    createStatements() {
        let statements = new Array();
        const tableComponent = this._helper.prepareComponent(this.getTableDefinition().table, this._imports);
        let table = createJsxElement(tableComponent.tagName, [], [
            this.createHeader(),
            this.mapArrayToTableRows(this.createBodyRow())
        ]);
        var returnStatement = factory.createReturnStatement(table);
        statements.push(returnStatement);
        return statements;
    }
    createHeader() {
        const headerComponent = this._helper.prepareComponent(this.getTableDefinition().header, this._imports);
        const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports);
        let headerRow = createJsxElement(rowComponent.tagName, [], getProperties(this._entity)
            .map((prop) => this.propertyHead(prop, this._entity)));
        let tableHeader = createJsxElement(headerComponent.tagName, [], [headerRow]);
        return tableHeader;
    }
    createBodyRow() {
        var _a;
        const rowComponent = this._helper.prepareComponent(this.getTableDefinition().row, this._imports);
        let bodyRow = createJsxElement(rowComponent.tagName, [], (_a = getProperties(this._entity)) === null || _a === void 0 ? void 0 : _a.map(prop => this.propertyCell(prop, this._entity)));
        return bodyRow;
    }
    getTableDefinition() {
        if (this._context.uiFramework === UiFramework.Grommet) {
            return GrommetTableComponents;
        }
        else if (this._context.uiFramework === UiFramework.MaterialUI) {
            return MuiTableComponents;
        }
        else {
            console.log('Unsupported ui framework for generation basic table');
            throw new Error('Unsupported ui framework for generation basic table');
        }
    }
    propertyHead(prop, entity) {
        let child = this._helper.getHeaderTitleJsxText(this._entity, prop);
        return createJsxElement(this._helper.prepareComponent(this.getTableDefinition().cell, this._imports).tagName, [], [child]);
    }
    propertyCell(prop, entity, prefixIterator) {
        let child;
        if (this._context.formatter === Formatter.ReactIntl) {
            child = this.formatCellWithTag(prop);
        }
        else {
            child = factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(prefixIterator !== undefined ? factory.createIdentifier(prefixIterator !== null && prefixIterator !== void 0 ? prefixIterator : entity.getName().toLowerCase()) : this.getRowIdentifier(), factory.createIdentifier(prop.getName())));
        }
        return createJsxElement(this._helper.prepareComponent(this.getTableDefinition().cell, this._imports).tagName, [], [child]);
    }
    formatCellWithTag(prop) {
        const propertyAccess = factory.createJsxExpression(undefined, factory.createPropertyAccessExpression(this.getRowIdentifier(), factory.createIdentifier(prop.getName())));
        var formattedChild = this._intlFormatter.tryFormatPropertyUsingTag(prop, propertyAccess);
        let child;
        if (formattedChild) {
            child = formattedChild;
        }
        else {
            child = propertyAccess;
        }
        return child;
    }
    mapArrayToTableRows(body) {
        const bodyComponent = this._helper.prepareComponent(this.getTableDefinition().body, this._imports);
        return createJsxElement(bodyComponent.tagName, [], [factory.createJsxExpression(undefined, factory.createCallExpression(factory.createPropertyAccessExpression(this._helper.getInputParameterIdentifier(this._entity), factory.createIdentifier("map")), undefined, [factory.createArrowFunction(undefined, undefined, [factory.createParameterDeclaration(undefined, undefined, undefined, this.getRowIdentifier(), undefined, undefined, undefined)], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), body)]))]);
    }
    getRowIdentifier() {
        return factory.createIdentifier(this._helper.getEntityName(this._entity));
    }
    printSourceCode(sourceFile) {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        return printer.printFile(sourceFile);
    }
    findElementByName(node, name) {
        if (node.kind === ts.SyntaxKind.JsxElement) {
            if (ts.isJsxElement(node)) {
                if (ts.isIdentifier(node.openingElement.tagName)) {
                    if (node.openingElement.tagName.escapedText === name) {
                        return node;
                    }
                }
            }
        }
        return node.forEachChild((child) => {
            return this.findElementByName(child, name);
        });
    }
    findElementsByName(node, name, output) {
        if (node.kind === ts.SyntaxKind.JsxElement) {
            if (ts.isJsxElement(node)) {
                if (ts.isIdentifier(node.openingElement.tagName)) {
                    if (node.openingElement.tagName.escapedText === name) {
                        output.push(node);
                    }
                }
            }
        }
        node.forEachChild((child) => {
            this.findElementsByName(child, name, output);
        });
    }
    findUsedFormatter(node) {
        var _a;
        var result = Formatter.None;
        var reactIntlImport = this.find(node.getSourceFile(), (node) => {
            if (ts.isImportDeclaration(node)) {
                if (ts.isStringLiteral(node.moduleSpecifier)) {
                    if (node.moduleSpecifier.text === 'react-intl') {
                        return true;
                    }
                }
            }
            return false;
        });
        if (reactIntlImport) {
            var importSpecifier = this.find(reactIntlImport, (node) => {
                if (ts.isImportSpecifier(node)) {
                    if (node.name.escapedText === 'FormattedMessage') {
                        return true;
                    }
                }
                return false;
            });
            if (importSpecifier) {
                var formattedMessageElementName = ((_a = importSpecifier.propertyName) === null || _a === void 0 ? void 0 : _a.escapedText) || importSpecifier.name.escapedText;
                var formattedMessageElement = this.find(node, (node) => {
                    if (ts.isJsxSelfClosingElement(node)) {
                        if (ts.isIdentifier(node.tagName)) {
                            if (node.tagName.escapedText === formattedMessageElementName) {
                                return true;
                            }
                        }
                    }
                    else if (ts.isJsxElement(node)) {
                        if (ts.isIdentifier(node.openingElement.tagName)) {
                            if (node.openingElement.tagName.escapedText === formattedMessageElementName) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                if (formattedMessageElement) {
                    result = Formatter.ReactIntl;
                }
            }
        }
        return result;
    }
    find(node, check) {
        if (check(node)) {
            return node;
        }
        ;
        return node.forEachChild((child) => {
            return this.find(child, check);
        });
    }
    findTableBodyColumnIds(nodes, output) {
        nodes.forEach(node => {
            if (ts.isJsxExpression(node)) {
                if (node.expression) {
                    if (ts.isPropertyAccessExpression(node.expression)) {
                        if (ts.isIdentifier(node.expression.name)) {
                            output.push(node.expression.name.escapedText.toString());
                        }
                    }
                }
            }
            node.forEachChild((child) => {
                this.findTableBodyColumnIds([child], output);
            });
        });
    }
    tableBodyColumnExists(tableBodyColumns, property) {
        const existsColumnIds = [];
        this.findTableBodyColumnIds(tableBodyColumns, existsColumnIds);
        return existsColumnIds.indexOf(property.getName()) > -1;
    }
}
