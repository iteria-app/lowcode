import ts, { factory } from "typescript";
import { transformer } from "../../../../ast";
import { printSourceCode } from "../../../ast/ast";
import { createUseQueryExpression } from "../../../ast/hooks";
import { createImportDeclaration, createNamedImportDeclaration } from "../../../ast/imports";
import { isOpeningOrSelfClosingElementWithName, isImportDeclarationWithName, isFunctionDeclarationWithName } from "../../../ast/node";
import { isUseQueryHook } from '../../../ast/hooks';
import { createAst } from "../../code-generation/createSourceFile";
import { getQueryNames, queryHookName } from '@iteria-app/graphql-lowcode/esm/generate';
import { getInputParameterIdentifier, getListComponentName, getListPageComponentName } from "../../entity/helper";
export default class TemplateResolver {
    constructor(entity, introspection) {
        this.createListComponentElement = (tableComponentName, inputParameterIdentifier) => {
            return factory.createJsxSelfClosingElement(factory.createIdentifier(tableComponentName), undefined, factory.createJsxAttributes([factory.createJsxAttribute(inputParameterIdentifier, factory.createJsxExpression(undefined, factory.createPropertyAccessChain(factory.createIdentifier("data"), //TODO:PC try read identifier from template
                factory.createToken(ts.SyntaxKind.QuestionDotToken), inputParameterIdentifier)))]));
        };
        this.createPageComponentElement = (node, listPageComponentName) => {
            const oldDeclaration = node;
            let newDeclaration;
            if (oldDeclaration) {
                newDeclaration = factory.createFunctionDeclaration(undefined, [], undefined, listPageComponentName, undefined, [], undefined, oldDeclaration.body);
            }
            else {
                newDeclaration = oldDeclaration;
            }
            return newDeclaration;
        };
        this._entity = entity;
        this._introspection = introspection;
    }
    generateListPage(template, generatedFolderPath) {
        let result;
        if (this._entity) {
            let ast = createAst(template);
            if (ast) {
                const templateComponentName = 'ListPlaceholder';
                const templatePageComponentName = 'App';
                const listComponentName = getListComponentName(this._entity);
                const listPageComponentName = getListPageComponentName(this._entity);
                const inputParameterIdentifier = getInputParameterIdentifier(this._entity);
                //find 'useGeneratedQuery' import and replace it with use'queryName's
                const { listQueryName } = this._introspection ? getQueryNames(this._introspection, this._entity.getName()) : { listQueryName: undefined };
                const hookName = queryHookName(listQueryName !== null && listQueryName !== void 0 ? listQueryName : '');
                const transformUseQueryImport = (node, importName, queryName) => {
                    if (isImportDeclarationWithName(node, importName)) {
                        return createNamedImportDeclaration(queryName, `${generatedFolderPath}/graphql`);
                    }
                };
                const transformImportGeneratedQuery = (node) => {
                    return transformUseQueryImport(node, 'useGeneratedQuery', hookName);
                };
                //find 'useGeneratedQuery' hook and replace it with use'queryName's
                const transformUseQueryHook = (node) => {
                    if (isUseQueryHook(node, 'useGeneratedQuery')) {
                        return createUseQueryExpression(hookName);
                    }
                };
                const transformImportDeclaration = (node, importName, tableComponentName) => {
                    if (isImportDeclarationWithName(node, importName)) {
                        return createImportDeclaration(tableComponentName, './' + tableComponentName);
                    }
                };
                const transformListElement = (node, elementName, tableComponentName, inputParameterIdentifier) => {
                    if (isOpeningOrSelfClosingElementWithName(node, elementName)) {
                        return this.createListComponentElement(tableComponentName, inputParameterIdentifier);
                    }
                };
                const transformPageElement = (node, elementName) => {
                    if (isFunctionDeclarationWithName(node, elementName)) {
                        return this.createPageComponentElement(node, listPageComponentName);
                    }
                };
                const transformListPlaceholderByListComponent = (node) => {
                    return transformImportDeclaration(node, templateComponentName, listComponentName)
                        || transformListElement(node, templateComponentName, listComponentName, inputParameterIdentifier);
                };
                const transformPageComponent = (node) => {
                    return transformPageElement(node, templatePageComponentName);
                };
                const transformExportElement = (node) => {
                    if (ts.isExportAssignment(node) && node.expression.getText() === templatePageComponentName) {
                        return this.createExportAssignment(listPageComponentName);
                    }
                };
                const transformationResult = ts.transform(ast, [transformer(transformListPlaceholderByListComponent),
                    transformer(transformPageComponent),
                    transformer(transformExportElement),
                    transformer(transformImportGeneratedQuery),
                    transformer(transformUseQueryHook)]);
                result = printSourceCode(transformationResult.transformed[0]);
            }
        }
        return result;
    }
    createExportAssignment(listPageComponentName) {
        return factory.createExportAssignment(undefined, undefined, undefined, factory.createIdentifier(listPageComponentName));
    }
}
