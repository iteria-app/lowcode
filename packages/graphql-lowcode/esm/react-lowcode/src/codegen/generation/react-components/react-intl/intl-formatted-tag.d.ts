import ts from "typescript";
export declare enum IntlFormatingTags {
    FormattedDate = "FormattedDate",
    FormattedTime = "FormattedTime",
    FormattedNumber = "FormattedNumber",
    FormattedDateTimeRange = "FormattedDateTimeRange",
    FormattedRelativeTime = "FormattedRelativeTime",
    FormattedPlural = "FormattedPlural",
    FormattedMessage = "FormattedMessage"
}
export default class ReactIntlTag {
    _imports: ts.ImportDeclaration[];
    constructor(imports: ts.ImportDeclaration[]);
    getImports(): ts.ImportDeclaration[];
    formatDate(value: ts.JsxExpression): ts.JsxSelfClosingElement;
    formatTime(value: ts.JsxExpression): ts.JsxSelfClosingElement;
    formatDateTime(value: ts.JsxExpression): ts.JsxSelfClosingElement;
    formatNumber(value: ts.JsxExpression): ts.JsxSelfClosingElement;
    formatPlural(value: ts.JsxExpression): ts.JsxSelfClosingElement;
    formatDuration(value: ts.JsxExpression, unit: ts.Expression): ts.JsxSelfClosingElement;
    formatTimeRange(from: ts.JsxExpression, to: ts.JsxExpression): ts.JsxSelfClosingElement;
    formatMessage(message: ts.StringLiteral | ts.JsxExpression, defaultMessage: ts.StringLiteral | ts.JsxExpression | undefined, values: ts.Expression | undefined): ts.JsxSelfClosingElement;
    private formattedValue;
    private prepareImport;
}
