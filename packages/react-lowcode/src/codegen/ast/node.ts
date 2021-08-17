import ts, { factory, JsxChild } from "typescript";
import { createProgram } from "../../ast/factory";
import { findByCondition } from "../../ast/find";

export const isImportDeclarationWithName = (node: ts.Node, name: string): boolean | undefined => {
  if (ts.isImportDeclaration(node)) {
      //handles "import File from './File'" import types
    if (node.importClause?.name?.escapedText === name) return true;
      //handles "import { File } from './File'" import types
    if(ts.isImportDeclaration(node) && node.pos >= 0) {
      return node.getChildren().some(declarationChild =>
        ts.isImportClause(declarationChild) && declarationChild.getChildren().some(clauseChild => 
          ts.isNamedImports(clauseChild) && clauseChild.elements.some(element =>
            element.name.escapedText === name 
          )
        )
      )
    }
  }
}

export const isFunctionDeclarationWithName = (node: ts.Node, name: string): boolean | undefined => {
  if (ts.isFunctionDeclaration(node)) {
      if (node.name?.escapedText === name) {
          return true;
      }
  }
}

export const isJsxAttributeWithName = (node: ts.Node, name: string): boolean | undefined => {
  if(ts.isJsxAttribute(node)) {
      return node.name.escapedText === name;
  }
}

export const isJsxChild = (node: ts.Node): boolean => {
  return ts.isJsxText(node) || ts.isJsxExpression(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
}

export const createStringJsxAttribute = (name: string, value: string) => {
  return factory.createJsxAttribute(
      factory.createIdentifier(name),
      factory.createStringLiteral(value)
    );
}

export const isOpeningOrSelfClosingElementWithName = (node: ts.Node, name: string): boolean | undefined => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        if (ts.isIdentifier(node.tagName)) {
            if (node.tagName.escapedText === name) {
                return true;
            }
        }
    }
}

export const clearNodePosition = (node: ts.Node): void => {
    ts.setTextRange(node, { pos: -1, end: -1 });

    node.forEachChild((child: ts.Node) => {
        clearNodePosition(child);
    });
}

export const extractInputStatementsFromTemplate = (sourceCode: string, inputTemplateName: string): { importDeclarations: ts.ImportDeclaration[], variableStatements: ts.VariableStatement[], inputElement: ts.JsxChild } | undefined => {
  const program = createProgram(sourceCode);
  const typeChecker = program.getTypeChecker();
  const ast = program.getSourceFiles()[0];

  if (ast) {
    const component = findByCondition<ts.Node>(ast, (node: ts.Node) => {
      if (ts.isVariableDeclaration(node)) {
        if (node.name) {
          if (ts.isIdentifier(node.name)) {
            return node.name.escapedText === inputTemplateName;
          }
        }
      }
    });

    if (component) {
      let importDeclarations: ts.ImportDeclaration[] = []
      let variableStatements: ts.VariableStatement[] = [];
      let inputElement: ts.JsxChild | undefined;

      const readInputNodes = (node: ts.Node) => {
        if (ts.isVariableDeclaration(node.parent)) {
          if (ts.isIdentifier(node.parent.name) && node.parent.name.escapedText === inputTemplateName) {
            if (ts.isArrowFunction(node) && ts.isBlock(node.body)) {
              node.body.statements.forEach(statement => {
                if (ts.isVariableStatement(statement)) {
                  variableStatements = [...variableStatements, statement];
                }

                if (ts.isReturnStatement(statement)) {
                  inputElement = findByCondition<ts.JsxChild>(statement, (node: ts.Node) => {
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
}

export const getUsedImportsInNode = (node: ts.Node, typeChecker: ts.TypeChecker): ts.ImportDeclaration[] => {
  let result: ts.ImportDeclaration[] = [];

  const getImportDeclaration = (node: ts.Node): ts.ImportDeclaration | undefined => {
    if(ts.isImportDeclaration(node)) {
      return node;
    }

    if(node.parent) {
      return getImportDeclaration(node.parent);
    }
  }

  const findUsedImportDeclarations = (node: ts.Node) => {
    if(ts.isIdentifier(node)) {
      const symbol = typeChecker.getSymbolAtLocation(node);

      if(symbol) {
        symbol.declarations.forEach(declaration => {
          const importDeclaration = getImportDeclaration(declaration);
          if(importDeclaration) {
            result = [...result, importDeclaration];
          }
        });
      }
    }

    ts.forEachChild(node, findUsedImportDeclarations);
  } 

  findUsedImportDeclarations(node);
  return result;
}