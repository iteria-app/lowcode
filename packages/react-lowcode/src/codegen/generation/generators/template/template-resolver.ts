import ts, { factory } from "typescript";
import { transformer } from "../../../../ast";
import { printSourceCode } from "../../../ast/ast";
import { createImportDeclaration } from "../../../ast/imports";
import { isOpeningOrSelfClosingElementWithName, isImportDeclarationWithName } from "../../../ast/node";
import { createAst } from "../../code-generation/createSourceFile";
import { Entity } from "../../entity";
import { EntityHelper } from "../../entity/helper";

export default class TemplateResolver {
    private _entity?: Entity

    constructor(entity?: Entity) {
        this._entity = entity;
    }

    generateListPage(template: string): string | undefined {
        let result: string | undefined;

        if (this._entity) {
            let ast = createAst(template);

            if (ast) {
                const templateComponentName = 'ListPlaceholder';
                const tableComponentName = EntityHelper.getTableComponentName(this._entity);
                const inputParameterIdentifier = EntityHelper.getInputParameterIdentifier(this._entity);

                const transformImportDeclaration = (node: ts.Node, importName: string, tableComponentName: string) => {
                    if(isImportDeclarationWithName(node, importName)) {
                        return createImportDeclaration(tableComponentName, './' + tableComponentName);
                    }
                }

                const transformListElement = (node: ts.Node, elementName: string, tableComponentName: string, inputParameterIdentifier: ts.Identifier) => {
                    if(isOpeningOrSelfClosingElementWithName(node, elementName)) {
                        return this.createTableComponentElement(tableComponentName, inputParameterIdentifier);
                    }
                }

                const transformListPlaceholderByTableComponent = (node: ts.Node) => {
                    return transformImportDeclaration(node, templateComponentName, tableComponentName)
                        || transformListElement(node, templateComponentName, tableComponentName, inputParameterIdentifier);
                };

                const transformationResult = ts.transform(ast, [transformer(transformListPlaceholderByTableComponent)]);
                result = printSourceCode(transformationResult.transformed[0]);
            }
        }

        return result;
    }

    private createTableComponentElement = (tableComponentName: string, inputParameterIdentifier: ts.Identifier) => {
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
}