import ts from "typescript";
import { findAllByCondition, findByCondition } from "../../../ast";
import { createAst } from "../helper";

export class TestFacadeHelper {
    static getFormikInitialValues = (sourceCode: string): Array<{ name: string, value: string }> | undefined => {
        const ast = createAst(sourceCode);

        const formikCallExpression = findByCondition<ts.Node>(ast, (node: ts.Node) => {
            if(ts.isVariableDeclaration(node)) {
                if(node.initializer && ts.isCallExpression(node.initializer)) {
                    if(ts.isIdentifier(node.initializer.expression)) {
                        return node.initializer.expression.escapedText === 'useFormik';
                    }
                }
            }
            return false;
        });

        if(formikCallExpression) {
            const initialValuesPropertyAssignment = findByCondition<ts.PropertyAssignment>(formikCallExpression, (node: ts.Node) => {
                if(ts.isPropertyAssignment(node)) {
                    if(ts.isIdentifier(node.name)) {
                        return node.name.escapedText === 'initialValues';
                    }
                }
                return false;
            });

            if(initialValuesPropertyAssignment) {
                const propertyAssignments: Array<ts.PropertyAssignment> = [];
                findAllByCondition(initialValuesPropertyAssignment.initializer, propertyAssignments, (node: ts.Node) => {
                    return ts.isPropertyAssignment(node);
                });

                return propertyAssignments.map(p => {
                    return {
                        name: ts.isIdentifier(p.name) ? p.name.escapedText.toString() : '',
                        value: p.initializer.getText()
                    };
                });
            }
        }
    };
}