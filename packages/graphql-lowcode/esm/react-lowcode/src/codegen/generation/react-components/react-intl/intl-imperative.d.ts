import ts from "typescript";
export declare enum IntlFormatingImperativeMethods {
    formatDate = "formatDate",
    formatTime = "formatTime",
    formatNumber = "formatNumber",
    formatPlural = "formatPlural",
    formatRelativeTime = "formatRelativeTime",
    formatDateTimeRange = "formatDateTimeRange",
    formatMessage = "formatMessage"
}
export default class ReactIntlImperative {
    _imports: ts.ImportDeclaration[];
    _initialized: boolean;
    constructor(imports: ts.ImportDeclaration[]);
    getImports(): ts.ImportDeclaration[];
    getImperativeHook(): ts.VariableStatement;
    formatDate(value: ts.Expression): ts.CallExpression;
    formatTime(value: ts.Expression): ts.CallExpression;
    formatNumber(value: ts.Expression): ts.CallExpression;
    formatPlural(value: ts.Expression): ts.CallExpression;
    formatDuration(value: ts.Expression, unit: ts.Expression): ts.CallExpression;
    formatTimeRange(from: ts.Expression, to: ts.Expression): ts.CallExpression;
    formatMessage(message: ts.StringLiteral | ts.JsxExpression, values: ts.Expression): ts.CallExpression;
    private formatValue;
    private prepareImport;
}
