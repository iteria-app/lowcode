import ts from "typescript";
import { findByCondition } from "../../../ast";
import MuiDetailGenerator from "../../generation/generators/detail/mui-detail-generator";
import { createAst, getEntityProperty } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";

describe(".create Input Element from template", () => {
    test("Input.Text", () => {
        // const generator = new MuiDetailGenerator({});
        // const property = getEntityProperty(graphqlGenTs1, 'test2')[0];

        // const result = generator.createInputElementFromTemplate(property);

        // if (result) {
        //     const inputElementAst = createAst(result);

        //     if (inputElementAst) {
        //         const inputElement = findByCondition<ts.JsxChild>(inputElementAst, (node: ts.Node) => {
        //             return ts.isJsxText(node) || ts.isJsxExpression(node) || ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
        //         });
        //     }
        // }

        // console.log(result);
    });
});