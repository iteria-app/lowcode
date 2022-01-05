import ts from "typescript";
import { createAst } from "./factory";
export const startOfJsxNode = (code, source) => startOfJsxIdentifier(code, source) - 1;
export function startOfJsxIdentifier(code, source) {
    const sourceLines = code.split("\n");
    if (source.lineNumber > 0 && source.lineNumber < sourceLines.length) {
        const lineIndex = source.lineNumber - 1;
        let start = 0;
        for (let i = 0; i < lineIndex; ++i) {
            const line = sourceLines[i];
            start += line.length + 1;
        }
        start += source.columnNumber - 1;
        // Here i intentionaly add 1 to the start variable to move from start of JSXElement
        // to start of StringLiteral, because of discovered bug in typescript AST
        start += 1;
        return start;
    }
    return null;
}
export function astFindStart(code, start) {
    const ast = createAst(code);
    const callback = (node) => {
        const nodeStart = node.pos;
        if (nodeStart <= start && start <= node.end) {
            if (nodeStart === start) {
                // node.kind == ts.SyntaxKind.JsxElement
                return node;
            }
            return ts.forEachChild(node, callback);
        }
        return null;
    };
    if (ast) {
        const found = ts.forEachChild(ast, callback);
        return found;
    }
    return null;
}
export const codeStart = (code, source) => {
    const identifierStart = startOfJsxIdentifier(code, source);
    if (!identifierStart)
        return null;
    const identifierNode = astFindStart(code, identifierStart);
    if (!identifierNode)
        return null;
    // return pos of parent if element is self closing element, otherwise return position of grandparent
    if (ts.isJsxSelfClosingElement(identifierNode.parent))
        return identifierNode.parent.pos;
    if (ts.isJsxOpeningElement(identifierNode.parent))
        return identifierNode.parent.parent.pos;
};
export function astFindSource(code, source) {
    const start = codeStart(code, source);
    if (start) {
        const found = astFindStart(code, start);
        return found;
        //sourceLines.splice(lineIndex, 0, sourceLine);
        //const newContent = sourceLines.join('\n');
        //return newContent;
    }
    return null;
}
export const findElementInCode = (code, source) => {
    const found = astFindSource(code, source);
    if (found) {
        const before = code.substring(0, found.end);
        const startEndOfLine = before.lastIndexOf("\n");
        const lineStarts = startEndOfLine >= 0 ? startEndOfLine : 0;
        return code.substring(lineStarts, found.end);
    }
    return null;
};
export const getAstAndNodeFromSource = (code, source) => {
    const node = astFindSource(code, source);
    const ast = createAst(code);
    return { node, ast };
};
export const findByCondition = (node, condition) => {
    if (condition(node)) {
        return node;
    }
    ;
    return node.forEachChild((child) => {
        return findByCondition(child, condition);
    });
};
export const findAllByCondition = (node, output, condition) => {
    if (condition(node)) {
        output.push(node);
    }
    ;
    return node.forEachChild((child) => {
        return findAllByCondition(child, output, condition);
    });
};
