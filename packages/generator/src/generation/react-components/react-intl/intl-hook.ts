import ts, { factory } from "typescript"
import { defineHook, Hook } from '../../code-generation/hooks'
import TypescriptHelper from '../../code-generation/ts-helper'

export enum IntlFormatingHookMethods {
    formatDate = "formatDate",
    formatTime = "formatTime",
    formatNumber = "formatNumber",
    formatPlural = "formatPlural",
    formatRelativeTime = "formatRelativeTime",
    formatDateTimeRange = "formatDateTimeRange",
    formatMessage = "formatMessage"
}

export default class ReactIntlHook {
    _imports: ts.ImportDeclaration[]
    _defaultIntlInstance: ts.Identifier;
    _intlHook: Hook;

    constructor(imports: ts.ImportDeclaration[]){
        this._imports = imports;
        this._defaultIntlInstance = factory.createIdentifier("intl")
        this._intlHook = defineHook('intl', 'useIntl', 'react-intl')
        imports.push(this._intlHook.importDeclaration);
    }

    formatDate(value: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatDate)
        return this.formatValue([value], IntlFormatingHookMethods.formatDate, intl)
    }

    formatTime(value: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatTime)
        return this.formatValue([value], IntlFormatingHookMethods.formatTime, intl)
    }
    
    formatNumber(value: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatNumber)
        return this.formatValue([value], IntlFormatingHookMethods.formatNumber, intl)
    }

    formatPlural(value: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatPlural)
        return this.formatValue([value], IntlFormatingHookMethods.formatPlural, intl)
    }

    formatDuration(value: ts.Expression, unit: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatRelativeTime)
        return this.formatValue([value, unit], IntlFormatingHookMethods.formatRelativeTime, intl)
    }

    formatTimeRange(from: ts.Expression, to: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatDateTimeRange)
        return this.formatValue([from, to], IntlFormatingHookMethods.formatDateTimeRange, intl)
    }

    formatMessage(message: ts.StringLiteral | ts.JsxExpression, values: ts.Expression, intl: ts.Expression = this._defaultIntlInstance): ts.CallExpression {
        this.prepareImport(IntlFormatingHookMethods.formatMessage)
        return this.formatValue([message, values], IntlFormatingHookMethods.formatMessage, intl)
    }

    private formatValue(params: ts.Expression[], methodName: IntlFormatingHookMethods, intl: ts.Expression) {
        return factory.createCallExpression(
            factory.createPropertyAccessExpression(
                intl,
                factory.createIdentifier(methodName.toString())
            ),
            undefined,
            params
        )
    }

    private prepareImport(methodName: IntlFormatingHookMethods) {
        let declaration = TypescriptHelper.createImportDeclaration(methodName.toString(), 'react-intl')
        this._imports.push(declaration)
    }
}
