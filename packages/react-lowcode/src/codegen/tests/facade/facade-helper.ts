
import ts from "typescript";
import { findAllByCondition, findByCondition } from "../../../ast";
import { createAst } from "../helper";

export class TestFacadeHelper {
    static getFormikInitialValues = (sourceCode: string): {[key: string]: string} | undefined => {
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
            const initialValuesPropertyAssignment = findByCondition<ts.Node>(formikCallExpression, (node: ts.Node) => {
                if(ts.isPropertyAssignment(node)) {
                    if(ts.isIdentifier(node.name)) {
                        return node.name.escapedText === 'initialValues';
                    }
                }
                return false;
            });

            if(initialValuesPropertyAssignment) {

                // findAllByCondition<
            }
        }

        return {

        };
    };
}