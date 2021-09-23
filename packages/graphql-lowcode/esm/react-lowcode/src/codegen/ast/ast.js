import ts from "typescript";
export function findVariableDeclarations(parentNode, array) {
    if (parentNode != undefined) {
        if (ts.isVariableDeclaration(parentNode)) {
            array.push(parentNode);
        }
        if (parentNode.getChildCount() > 0) {
            var children = parentNode.getChildren();
            children.forEach((child) => {
                findVariableDeclarations(child, array);
            });
        }
    }
}
export function findObjectLiteralExpression(parentNode, array) {
    if (parentNode != undefined) {
        if (ts.isObjectLiteralExpression(parentNode)) {
            array.push(parentNode);
        }
        if (parentNode.getChildCount() > 0) {
            var children = parentNode.getChildren();
            children.forEach((child) => {
                findObjectLiteralExpression(child, array);
            });
        }
    }
}
export function findPropertyAssignment(parentNode, array) {
    if (parentNode != undefined) {
        if (parentNode.getChildCount() > 0) {
            var children = parentNode.getChildren();
            children.forEach((child) => {
                if (ts.isPropertyAssignment(child)) {
                    array.push(child);
                }
            });
        }
    }
}
export function printSourceCode(sourceFile) {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printFile(sourceFile);
}
