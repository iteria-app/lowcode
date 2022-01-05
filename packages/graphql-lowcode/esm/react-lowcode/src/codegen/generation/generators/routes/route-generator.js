import ts, { factory } from "typescript";
import { addElementsToAST, createAst, findByCondition, replaceElementsToAST } from "../../../../ast";
import { printSourceCode } from "../../../ast/ast";
import { createImportDeclaration, existsImportWithNamespace } from "../../../ast/imports";
import { createJsxSelfclosingElement } from "../../../ast/jsxElements";
import path from 'path';
export function generateNewRoute(routeDefinitionSource, componentRouteUri, componentName, componentPath) {
    const ast = createAst(routeDefinitionSource);
    if (ast) {
        if (!existsRoute(ast, componentName)) {
            let alteredSource = addComponentRoute(ast, componentRouteUri, componentName, componentPath);
            return printSourceCode(alteredSource);
        }
    }
}
function addComponentRoute(ast, componentRouteUri, componentName, componentPath) {
    let importNamespace = componentPath;
    importNamespace = componentPath.replace(path.extname(importNamespace), '');
    let alteredSource = addImport(ast, componentName, importNamespace);
    const definition = findByCondition(ast, (node) => {
        return (ts.isPropertyAssignment(node) && node.name.getText() == 'children');
    });
    if (definition) {
        const propAssignment = definition;
        if (ts.isArrayLiteralExpression(propAssignment.initializer)) {
            const arrayLitExpression = propAssignment.initializer;
            let elementArray = [];
            arrayLitExpression.elements.forEach(element => {
                elementArray = [...elementArray, element];
            });
            const newRouteDefinitions = createNewRouteDefinitionsArray(elementArray, componentRouteUri, componentName);
            alteredSource = replaceElementsToAST(alteredSource, arrayLitExpression.pos, newRouteDefinitions);
        }
    }
    return alteredSource;
}
function createNewRouteDefinitionsArray(expressions, componentRouteUri, componentName) {
    const newExpressions = [...expressions, createRouteDefinition(componentRouteUri, componentName)];
    return factory.createArrayLiteralExpression(newExpressions);
}
function createRouteDefinition(componentRouteUri, componentName) {
    let properties = [];
    properties = [...properties, factory.createPropertyAssignment('path', factory.createStringLiteral(componentRouteUri))];
    properties = [...properties, factory.createPropertyAssignment('element', createJsxSelfclosingElement(componentName))];
    return factory.createObjectLiteralExpression(properties);
}
function addImport(ast, componentName, componentPath) {
    const newRouteImport = createImportDeclaration(componentName, componentPath);
    const position = findPositionOfFirstImport(ast);
    return addElementsToAST(ast, position, [newRouteImport]);
}
function findPositionOfFirstImport(ast) {
    const firstImport = findByCondition(ast, (node) => {
        return ts.isImportDeclaration(node) && node.pos > 0;
    });
    return firstImport !== undefined ? firstImport.pos : 0;
}
function existsRoute(ast, componentName) {
    const existingRoute = findByCondition(ast, (node) => {
        return existsImportWithNamespace(node, componentName);
    });
    return existingRoute !== undefined;
}
