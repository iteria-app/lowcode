//import { IntlProvider, FormatMessage } from "react-intl";
import ts, { factory } from "typescript"
import { defineComponent, createJsxSelfClosingElement } from '../../ts/components'
import { defineHook, Hook } from '../../ts/hooks'

export interface ObjectCall {
    methodName: string
}

function defineObjectCall(methodName: string, hook: Hook): ObjectCall {
    return {
        methodName
        // TODO hook import and instance
    }
}

const intlHook = defineHook('intl', 'useIntl', 'react-intl')

const formatDate = defineObjectCall('formatDate', intlHook)
const formatNumber = defineObjectCall('formatDate', intlHook)
const formatTime = defineObjectCall('formatTime', intlHook)
const formatDateTimeRange = defineObjectCall('formatDateTimeRange', intlHook)
const formatRelativeTime = defineObjectCall('formatRelativeTime', intlHook)
const formatPlural = defineObjectCall('formatPlural', intlHook)
const formatMessage = defineObjectCall('formatMessage', intlHook)


//formatNumber

//https://formatjs.io/docs/react-intl/api/
/*
    <span title={intl.formatDate(date)}>
      <FormatDate value={date} />
    </span>
*/

function formatValue(params: ts.Expression[], component: ObjectCall, intl: ts.Expression) {
    return factory.createCallExpression(
        factory.createPropertyAccessExpression(
            intl,
            factory.createIdentifier(component.methodName)
        ),
        undefined,
        params
    )
}

export const defaultIntlInstance = factory.createIdentifier("intl")

export class HookFormatter {
    // intl.formatDate(Date.now()
    date(value: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        return formatValue([value], formatDate, intl)
    }
    time(value: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        return formatValue([value], formatTime, intl)
    }
    number(value: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        return formatValue([value], formatNumber, intl)
    }
    plural(value: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        return formatValue([value], formatPlural, intl)
    }
    duration(value: ts.Expression, unit: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        return formatValue([value, unit], formatRelativeTime, intl)
    }
    timeRange(from: ts.Expression, to: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        //formatDateTimeRange
        return formatValue([from, to], formatPlural, intl)
    }
    message(message: ts.StringLiteral | ts.JsxExpression, values: ts.Expression, intl: ts.Expression = defaultIntlInstance) {
        return formatValue([message, values], formatPlural, intl)
    }
}

const singleton = new HookFormatter()

export default singleton