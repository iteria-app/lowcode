import ts, { factory, SourceFile } from "typescript";
import { createImportDeclaration } from "../../../ast/imports";
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
                const tableComponentName = EntityHelper.getTableComponentName(this._entity);
                const inputParameterIdentifier = EntityHelper.getInputParameterIdentifier(this._entity);

                const tableComponentElement = factory.createJsxSelfClosingElement(
                    factory.createIdentifier(tableComponentName),
                    undefined,
                    factory.createJsxAttributes([factory.createJsxAttribute(
                        inputParameterIdentifier,
                        factory.createJsxExpression(
                            undefined,
                            factory.createPropertyAccessChain(
                                factory.createIdentifier("data"),
                                factory.createToken(ts.SyntaxKind.QuestionDotToken),
                                inputParameterIdentifier
                            )
                        )
                    )])
                );

                const transformer = <T extends ts.Node>(): ts.TransformerFactory<T> => {
                    return context => {
                        const visit: ts.Visitor = node => {
                            if (ts.isImportDeclaration(node)) {
                                if (node.importClause) {
                                    // TODO:PC: Check namedBindings???
                                    if (node.importClause.name) {
                                        if (node.importClause.name.escapedText === 'ListPlaceholder') {
                                            return createImportDeclaration(tableComponentName, './' + tableComponentName);
                                        }
                                    }
                                }
                            } else {
                                if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
                                    if (ts.isIdentifier(node.tagName)) {
                                        if (node.tagName.escapedText === 'ListPlaceholder') {
                                            return tableComponentElement;
                                        }
                                    }
                                }
                            }

                            return ts.visitEachChild(node, child => visit(child), context)
                        }

                        return node => ts.visitNode(node, visit)
                    }
                }

                const transformResult = ts.transform(ast, [transformer()]);
                result = this.printSourceCode(transformResult.transformed[0]);
            }
        }

        return result;
    }

    private printSourceCode(sourceFile: SourceFile): string {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
        return printer.printFile(sourceFile)
    }
}