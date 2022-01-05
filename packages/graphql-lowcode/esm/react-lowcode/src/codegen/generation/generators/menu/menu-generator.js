import { createAst, findByCondition, replaceElementsToAST } from "../../../../ast";
import ts, { factory } from "typescript";
import { printSourceCode } from "../../../ast/ast";
export function addMenuItem(menuDefinitionSource, title, url, icon) {
    const ast = createAst(menuDefinitionSource);
    if (ast) {
        const declaration = findByCondition(ast, (node) => {
            return (ts.isVariableDeclaration(node) && node.name.getText() == 'NavBar');
        });
        if (declaration) {
            const menuItemsDeclaration = findByCondition(declaration, (node) => {
                return (ts.isVariableDeclaration(node) && node.name.getText() == 'items');
            });
            if (menuItemsDeclaration) {
                const alteredSource = createMenuItem(ast, menuItemsDeclaration, title, url, icon);
                if (alteredSource) {
                    return printSourceCode(alteredSource);
                }
            }
        }
    }
}
function createMenuItem(ast, definition, title, url, icon) {
    const menuItemsDeclaration = definition;
    if (menuItemsDeclaration && menuItemsDeclaration.initializer) {
        if (ts.isArrayLiteralExpression(menuItemsDeclaration.initializer)) {
            const arrayLitExpression = menuItemsDeclaration.initializer;
            let elementArray = [];
            arrayLitExpression.elements.forEach(element => {
                elementArray = [...elementArray, element];
            });
            const newMenuDefinition = createNewMenuDefinitionsArray(elementArray, title, url, icon);
            ast = replaceElementsToAST(ast, arrayLitExpression.pos, newMenuDefinition);
            return ast;
        }
    }
}
function createNewMenuDefinitionsArray(expressions, title, url, icon) {
    const newExpressions = [...expressions, createMenuItemDefinition(title, url, icon)];
    return factory.createArrayLiteralExpression(newExpressions);
}
function createMenuItemDefinition(title, url, icon) {
    let properties = [];
    properties = [...properties, factory.createPropertyAssignment('href', factory.createStringLiteral(url))];
    properties = [...properties, factory.createPropertyAssignment('title', factory.createStringLiteral(title))];
    if (icon) {
        properties = [...properties, factory.createPropertyAssignment('icon', factory.createIdentifier(icon))];
    }
    return factory.createObjectLiteralExpression(properties);
}
