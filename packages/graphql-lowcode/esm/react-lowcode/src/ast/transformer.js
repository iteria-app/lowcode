import ts from "typescript";
import { isTopMostElementInReturnedLayout } from "../remove";
import { createEmptySpanElement, wrapNodesWithFragment, } from "../routes/factory";
const addJsxTransformer = (start, newNodes) => {
    return context => {
        const visit = node => {
            const nodeStart = node.pos;
            if (nodeStart === start) {
                if ((node.parent) && !ts.isJsxElement(node.parent)) {
                    return wrapNodesWithFragment(node, newNodes);
                }
                else
                    return [node, ...newNodes];
            }
            return ts.visitEachChild(node, child => visit(child), context);
        };
        return node => ts.visitNode(node, visit);
    };
};
const addTransformer = (start, newNodes) => {
    return context => {
        const visit = node => {
            const nodeStart = node.pos;
            if (nodeStart === start) {
                return [node, ...newNodes];
            }
            return ts.visitEachChild(node, child => visit(child), context);
        };
        return node => ts.visitNode(node, visit);
    };
};
const replaceTransformer = (start, newNode) => {
    return context => {
        const visit = node => {
            const nodeStart = node.pos;
            if (nodeStart === start) {
                return newNode;
            }
            return ts.visitEachChild(node, child => visit(child), context);
        };
        return node => ts.visitNode(node, visit);
    };
};
const removeTransformer = (start) => {
    return context => {
        const visit = node => {
            const nodeStart = node.pos;
            if (nodeStart === start) {
                if (isTopMostElementInReturnedLayout(node)) {
                    return createEmptySpanElement();
                }
                else
                    return;
            }
            return ts.visitEachChild(node, child => visit(child), context);
        };
        return node => ts.visitNode(node, visit);
    };
};
export const addJsxElementsToAST = (ast, start, newNodes) => {
    const result = ts.transform(ast, [addJsxTransformer(start, newNodes)]);
    return result.transformed[0];
};
export const addElementsToAST = (ast, start, newNodes) => {
    const result = ts.transform(ast, [addTransformer(start, newNodes)]);
    return result.transformed[0];
};
export const removeElementFromAst = (ast, start) => {
    const result = ts.transform(ast, [removeTransformer(start)]);
    return result.transformed[0];
};
export const replaceElementsToAST = (ast, start, newNode) => {
    const result = ts.transform(ast, [replaceTransformer(start, newNode)]);
    return result.transformed[0];
};
export const transformer = (transform) => {
    return context => {
        const visit = node => {
            return transform(node) || ts.visitEachChild(node, child => visit(child), context);
        };
        return node => ts.visitNode(node, visit);
    };
};
