import ts, { SyntaxKind } from "typescript";
import { astFindSource } from "../../ast";
import { WidgetPropertyValue } from "../interfaces";
export function findWidgetParentNode(sourceCode, position) {
    let astCode = astFindSource(sourceCode, position);
    if (astCode) {
        let parent = astCode.parent;
        while (parent) {
            if (isWidgetDeclaration(parent)) {
                return parent;
            }
            parent = parent.parent;
        }
    }
    else {
        console.log('cannot find widget element');
    }
    return undefined;
}
export function isDataTableWidget(sourceCode, position) {
    var _a, _b;
    let isDataTableDeclaration = false;
    let astCode = astFindSource(sourceCode, position);
    if (astCode) {
        let identifier = findIdentifier(astCode);
        if (identifier) {
            isDataTableDeclaration = identifier.getText() === 'DataGrid' || identifier.getText() === "DataTable";
        }
        else {
            let dataGridNode = astCode.getChildAt(1);
            const grommetChild = astCode.getChildAt(0);
            if (dataGridNode && (((_b = (_a = dataGridNode.getChildAt(0)) === null || _a === void 0 ? void 0 : _a.getChildAt(1)) === null || _b === void 0 ? void 0 : _b.getText()) === 'DataGrid' || grommetChild.tagName.getText())) //todo(mch): very very uglu, need to be refactored to be more generic
                isDataTableDeclaration = true;
        }
    }
    return isDataTableDeclaration;
}
export function isFormWidget(sourceCode, position) {
    let isFormWidget = false;
    let astCode = astFindSource(sourceCode, position);
    if (astCode) {
        const variableDeclaration = findParentVariableDeclaration(astCode);
        if (variableDeclaration) {
            const identifier = findIdentifier(variableDeclaration);
            if (identifier) { //TODO(mch): hardly need to refactor this bad solution
                isFormWidget = identifier.getText().startsWith('Generated') || identifier.getText().indexOf('Formik') > -1;
            }
        }
    }
    return isFormWidget;
}
export function getWidgetProperties(node) {
    let result = [];
    if (isElementWithAttributes(node)) {
        result = node.attributes.properties.map(prop => {
            var _a;
            if (ts.isJsxAttribute(prop)) {
                const value = getAttributeValue(prop);
                const type = (_a = getAttributeType(prop)) !== null && _a !== void 0 ? _a : WidgetPropertyValue.EXPRESSION;
                if (value) {
                    return {
                        name: prop.name.escapedText.toString(),
                        value,
                        type
                    };
                }
            }
            return undefined;
        }).filter((item) => {
            return item !== undefined;
        });
    }
    return result;
}
function findIdentifier(root) {
    let identifier = undefined;
    root.getChildren().forEach(child => {
        if (ts.isIdentifier(child))
            identifier = child;
        return;
    });
    return identifier;
}
function findParentVariableDeclaration(root) {
    let declaration = undefined;
    let parentNode = root.parent;
    while (parentNode) {
        if (ts.isVariableDeclaration(parentNode)) {
            declaration = parentNode;
            break;
        }
        parentNode = parentNode.parent;
    }
    return declaration;
}
function isWidgetDeclaration(node) {
    return isTableDeclaration(node) || isDetailDeclaration(node);
}
function isTableDeclaration(node) {
    ///TODO: check also for export key word
    return ts.isFunctionDeclaration(node);
}
function isDetailDeclaration(node) {
    ///TODO: check also for export key word
    return ts.isVariableDeclaration(node);
}
function isElementWithAttributes(node) {
    return (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.attributes.properties.length > 0;
}
function getAttributeValue(attribute) {
    if (attribute.initializer) {
        return getStringTypeAttributeValue(attribute.initializer)
            || getNumberTypeAttributeValue(attribute.initializer)
            || getBooleanTypeAttributeValue(attribute.initializer)
            || getExpressionTypeAttributeValue(attribute.initializer);
    }
    return 'true';
}
function getAttributeType(attribute) {
    if (attribute.initializer) {
        if (ts.isStringLiteral(attribute.initializer))
            return WidgetPropertyValue.STRING_LITERAL;
        else
            return WidgetPropertyValue.EXPRESSION;
    }
}
function getStringTypeAttributeValue(initializer) {
    return ts.isStringLiteral(initializer) ? initializer.text : undefined;
}
function getNumberTypeAttributeValue(initializer) {
    if (ts.isJsxExpression(initializer) && initializer.expression !== undefined && ts.isNumericLiteral(initializer.expression)) {
        return initializer.expression.getText();
    }
}
function getBooleanTypeAttributeValue(initializer) {
    if (ts.isJsxExpression(initializer) && initializer.expression
        && (initializer.expression.kind === SyntaxKind.TrueKeyword || initializer.expression.kind === SyntaxKind.FalseKeyword)) {
        return initializer.expression.getText();
    }
}
function getExpressionTypeAttributeValue(initializer) {
    if (ts.isJsxExpression(initializer) && initializer.expression) {
        return initializer.expression.getText();
    }
}
