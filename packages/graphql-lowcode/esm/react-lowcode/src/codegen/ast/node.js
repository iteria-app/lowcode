import ts, { factory } from "typescript";
import { createProgram } from "../../ast/factory";
import { findByCondition } from "../../ast/find";
export const isImportDeclarationWithName = (node, name) => {
    var _a, _b;
    if (ts.isImportDeclaration(node)) {
        //handles "import File from './File'" import types
        if (((_b = (_a = node.importClause) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.escapedText) === name)
            return true;
        //handles "import { File } from './File'" import types
        if (ts.isImportDeclaration(node) && node.pos >= 0) {
            return node.getChildren().some(declarationChild => ts.isImportClause(declarationChild) && declarationChild.getChildren().some(clauseChild => ts.isNamedImports(clauseChild) && clauseChild.elements.some(element => element.name.escapedText === name)));
        }
    }
};
export const isFunctionDeclarationWithName = (node, name) => {
    var _a;
    if (ts.isFunctionDeclaration(node)) {
        if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.escapedText) === name) {
            return true;
        }
    }
};
export const isJsxAttributeWithName = (node, name) => {
    if (ts.isJsxAttribute(node)) {
        return node.name.escapedText === name;
    }
};
export const isJsxChild = (node) => {
    return ts.isJsxText(node) || ts.isJsxExpression(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
};
export const createStringJsxAttribute = (name, value) => {
    return factory.createJsxAttribute(factory.createIdentifier(name), factory.createStringLiteral(value));
};
export const isOpeningOrSelfClosingElementWithName = (node, name) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        if (ts.isIdentifier(node.tagName)) {
            if (node.tagName.escapedText === name) {
                return true;
            }
        }
    }
};
export const clearNodePosition = (node) => {
    ts.setTextRange(node, { pos: -1, end: -1 });
    node.forEachChild((child) => {
        clearNodePosition(child);
    });
};
export const extractInputStatementsFromTemplate = (sourceCode, inputTemplateName) => {
    const program = createProgram(sourceCode);
    const typeChecker = program.getTypeChecker();
    const ast = program.getSourceFiles()[0];
    if (ast) {
        const component = findByCondition(ast, (node) => {
            if (ts.isVariableDeclaration(node)) {
                if (node.name) {
                    if (ts.isIdentifier(node.name)) {
                        return node.name.escapedText === inputTemplateName;
                    }
                }
            }
        });
        if (component) {
            let importDeclarations = [];
            let variableStatements = [];
            let inputElement;
            const readInputNodes = (node) => {
                if (ts.isVariableDeclaration(node.parent)) {
                    if (ts.isIdentifier(node.parent.name) && node.parent.name.escapedText === inputTemplateName) {
                        if (ts.isArrowFunction(node) && ts.isBlock(node.body)) {
                            node.body.statements.forEach(statement => {
                                if (ts.isVariableStatement(statement)) {
                                    variableStatements = [...variableStatements, statement];
                                }
                                if (ts.isReturnStatement(statement)) {
                                    inputElement = findByCondition(statement, (node) => {
                                        return ts.isJsxText(node) || ts.isJsxExpression(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
                                    });
                                }
                            });
                            return;
                        }
                    }
                }
                ts.forEachChild(node, readInputNodes);
            };
            ts.forEachChild(component, readInputNodes);
            if (inputElement) {
                [...variableStatements, inputElement].forEach(node => {
                    importDeclarations = [...importDeclarations, ...getUsedImportsInNode(node, typeChecker)];
                });
                [...importDeclarations, ...variableStatements, inputElement].forEach(node => {
                    clearNodePosition(node);
                });
                return {
                    importDeclarations,
                    variableStatements,
                    inputElement
                };
            }
        }
    }
};
export const getUsedImportsInNode = (node, typeChecker) => {
    let result = [];
    const getImportDeclaration = (node) => {
        if (ts.isImportDeclaration(node)) {
            return node;
        }
        if (node.parent) {
            return getImportDeclaration(node.parent);
        }
    };
    const findUsedImportDeclarations = (node) => {
        if (ts.isIdentifier(node)) {
            const symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                symbol.declarations.forEach(declaration => {
                    const importDeclaration = getImportDeclaration(declaration);
                    if (importDeclaration) {
                        result = [...result, importDeclaration];
                    }
                });
            }
        }
        ts.forEachChild(node, findUsedImportDeclarations);
    };
    findUsedImportDeclarations(node);
    return result;
};
