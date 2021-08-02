import ts, { factory } from "typescript";
import { transformer } from "../../../../ast";
import { printSourceCode } from "../../../ast/ast";
import { createUseQueryExpression } from "../../../ast/hooks";
import { createImportDeclaration, createNamedImportDeclaration } from "../../../ast/imports";
import { isOpeningOrSelfClosingElementWithName, isImportDeclarationWithName, isFunctionDeclarationWithName } from "../../../ast/node";
import { isUseQueryHook } from '../../../ast/hooks';
import { createAst } from "../../code-generation/createSourceFile";
import { Entity } from "../../entity";
import { IntrospectionQuery, getQueryNames, queryHookName } from '@iteria-app/graphql-lowcode/esm/generate'
import { getInputParameterIdentifier, getListComponentName, getListPageComponentName } from "../../entity/helper";

export default class TemplateResolver {
    private _entity?: Entity
    private _introspection?: IntrospectionQuery

    constructor(entity?: Entity, introspection?: IntrospectionQuery) {
        this._entity = entity;
        this._introspection = introspection;
    }

    generateListPage(template: string): string | undefined {
        let result: string | undefined;

        if (this._entity) {
            let ast = createAst(template);

            if (ast) {
                const templateComponentName = 'ListPlaceholder';
                const templatePageComponentName = 'App'
                const listComponentName = getListComponentName(this._entity);
                const listPageComponentName = getListPageComponentName(this._entity);
                const inputParameterIdentifier = getInputParameterIdentifier(this._entity);

                //find 'useGeneratedQuery' import and replace it with use'queryName's
                const { listQueryName } = this._introspection ? getQueryNames(this._introspection, this._entity.getName()) : { listQueryName : undefined }
                const hookName = queryHookName(listQueryName ?? '')

                const transformUseQueryImport = (node: ts.Node, importName: string, queryName: string) => {
                  if(isImportDeclarationWithName(node, importName)) {
                    return createImportDeclaration(queryName, './generated/graphql');
                  }
                }

                const transformImportGeneratedQuery = (node: ts.Node) => {
                  return transformUseQueryImport(node, 'useGeneratedQuery', hookName);
                }

                //find 'useGeneratedQuery' hook and replace it with use'queryName's
                const transformUseQueryHook = (node: ts.Node) => {
                  if(isUseQueryHook(node, 'useGeneratedQuery')) {
                    return createUseQueryExpression(hookName)
                  }
                }

                const transformImportDeclaration = (node: ts.Node, importName: string, tableComponentName: string) => {
                    if(isImportDeclarationWithName(node, importName)) {
                        return createNamedImportDeclaration(tableComponentName, './' + tableComponentName);
                    }
                }

                const transformListElement = (node: ts.Node, elementName: string, tableComponentName: string, inputParameterIdentifier: ts.Identifier) => {
                    if(isOpeningOrSelfClosingElementWithName(node, elementName)) {
                        return this.createListComponentElement(tableComponentName, inputParameterIdentifier);
                    }
                }

                const transformPageElement = (node: ts.Node, elementName: string) => {
                    if(isFunctionDeclarationWithName(node, elementName)) {
                        return this.createPageComponentElement(node, listPageComponentName);
                    }
                }

                const transformListPlaceholderByListComponent = (node: ts.Node) => {
                    return transformImportDeclaration(node, templateComponentName, listComponentName)
                        || transformListElement(node, templateComponentName, listComponentName, inputParameterIdentifier)
                };

                const transformPageComponent = (node:ts.Node) => {
                    return transformPageElement(node, templatePageComponentName)
                }

                const transformExportElement = (node: ts.Node) => {
                    if(ts.isExportAssignment(node) && node.expression.getText() === templatePageComponentName){
                        return this.createExportAssignment(listPageComponentName)
                    }
                }

                const transformationResult = ts.transform(ast, 
                  [transformer(transformListPlaceholderByListComponent), 
                   transformer(transformPageComponent),
                   transformer(transformExportElement),
                   transformer(transformImportGeneratedQuery),
                   transformer(transformUseQueryHook)]);

                result = printSourceCode(transformationResult.transformed[0]);
            }
        }

        return result;
    }

    private createExportAssignment(listPageComponentName: string){
        return factory.createExportAssignment(undefined, 
                                              undefined, 
                                              undefined, 
                                              factory.createIdentifier(listPageComponentName))
    }

    private createListComponentElement = (tableComponentName: string, inputParameterIdentifier: ts.Identifier) => {
        return factory.createJsxSelfClosingElement(
            factory.createIdentifier(tableComponentName),
            undefined,
            factory.createJsxAttributes([factory.createJsxAttribute(
                inputParameterIdentifier,
                factory.createJsxExpression(
                    undefined,
                    factory.createPropertyAccessChain(
                        factory.createIdentifier("data"), //TODO:PC try read identifier from template
                        factory.createToken(ts.SyntaxKind.QuestionDotToken),
                        inputParameterIdentifier
                    )
                )
            )])
        );
    }

    private createPageComponentElement = (node:ts.Node, listPageComponentName: string) => {
        const oldDeclaration: ts.FunctionDeclaration = node as ts.FunctionDeclaration

        let newDeclaration: ts.FunctionDeclaration

        if(oldDeclaration){
            newDeclaration = factory.createFunctionDeclaration(
                undefined,
                [],
                undefined,
                listPageComponentName,
                undefined,
                [],
                undefined,
                oldDeclaration.body
              )
        } else{
            newDeclaration = oldDeclaration
        }

        return newDeclaration
    }
}