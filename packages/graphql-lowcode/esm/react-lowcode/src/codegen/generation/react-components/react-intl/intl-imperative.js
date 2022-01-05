import ts, { factory } from "typescript";
import { defineHook } from '../../../ast/hooks';
import { createNamedImportDeclaration } from "../../../ast/imports";
import { createVariableStatement } from "../../../ast/variables";
export var IntlFormatingImperativeMethods;
(function (IntlFormatingImperativeMethods) {
    IntlFormatingImperativeMethods["formatDate"] = "formatDate";
    IntlFormatingImperativeMethods["formatTime"] = "formatTime";
    IntlFormatingImperativeMethods["formatNumber"] = "formatNumber";
    IntlFormatingImperativeMethods["formatPlural"] = "formatPlural";
    IntlFormatingImperativeMethods["formatRelativeTime"] = "formatRelativeTime";
    IntlFormatingImperativeMethods["formatDateTimeRange"] = "formatDateTimeRange";
    IntlFormatingImperativeMethods["formatMessage"] = "formatMessage";
})(IntlFormatingImperativeMethods || (IntlFormatingImperativeMethods = {}));
//TODO: add hook support
export default class ReactIntlImperative {
    constructor(imports) {
        this._imports = imports;
        this._initialized = false;
    }
    getImports() {
        return this._imports;
    }
    getImperativeHook() {
        var hook = defineHook("intl", "useIntl", "react-intl");
        this._imports.push(hook.importDeclaration);
        let callExpression = factory.createCallExpression(factory.createIdentifier(hook.hookName), undefined, []);
        return createVariableStatement(hook.defaultInstanceName, callExpression, ts.NodeFlags.Const);
    }
    formatDate(value) {
        return this.formatValue([value], IntlFormatingImperativeMethods.formatDate);
    }
    formatTime(value) {
        return this.formatValue([value], IntlFormatingImperativeMethods.formatTime);
    }
    formatNumber(value) {
        return this.formatValue([value], IntlFormatingImperativeMethods.formatNumber);
    }
    formatPlural(value) {
        return this.formatValue([value], IntlFormatingImperativeMethods.formatPlural);
    }
    formatDuration(value, unit) {
        return this.formatValue([value, unit], IntlFormatingImperativeMethods.formatRelativeTime);
    }
    formatTimeRange(from, to) {
        return this.formatValue([from, to], IntlFormatingImperativeMethods.formatDateTimeRange);
    }
    formatMessage(message, values) {
        return this.formatValue([message, values], IntlFormatingImperativeMethods.formatMessage);
    }
    formatValue(params, methodName) {
        return factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("intl"), factory.createIdentifier(methodName.toString())), undefined, params);
    }
    prepareImport(methodName) {
        let declaration = createNamedImportDeclaration(methodName.toString(), 'react-intl');
        this._imports.push(declaration);
    }
}
