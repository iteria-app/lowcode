//import { IntlProvider, FormattedMessage } from "react-intl";

import ts, { factory } from "typescript"
import { defineComponent, createJsxSelfClosingElement, Component } from '../../ts/components'

const formattedDate = defineComponent('FormattedDate', 'react-intl')
const formattedTime = defineComponent('FormattedTime', 'react-intl')
const formattedNumber = defineComponent('FormattedNumber', 'react-intl')
const formattedDateTimeRange = defineComponent('FormattedDateTimeRange', 'react-intl')
const formattedRelativeTime = defineComponent('FormattedRelativeTime', 'react-intl')
const formattedPlural = defineComponent('FormattedPlural', 'react-intl')
const formattedMessage = defineComponent('FormattedMessage', 'react-intl')

function formattedValue(component: Component, expression: ts.Expression) {
    return createJsxSelfClosingElement(component,
        [
            factory.createJsxAttribute(
                factory.createIdentifier("value"),
                factory.createJsxExpression(
                    undefined,
                    expression
                )
            )]
    )
}

export class TagFormatter {
    // <FormattedDate value={date} />
    date(value: ts.Expression) {
        return [formattedValue(formattedDate, value)]
    }
    time(value: ts.Expression) {
        return [formattedValue(formattedTime, value)]
    }
    dateTime(value: ts.Expression) {
        return [
            formattedValue(formattedDate, value),
            factory.createBlock(
                [factory.createExpressionStatement(factory.createStringLiteral(" "))],
                false
            ),
            formattedValue(formattedTime, value)
        ]
    }
    number(value: ts.Expression) {
        return [formattedValue(formattedNumber, value)]
    }
    plural(value: ts.Expression) {
        return [formattedValue(formattedPlural, value)]
    }
    duration(value: ts.Expression, unit: ts.Expression) {
        return [formattedValue(formattedRelativeTime, value
            // TODO unit: Unit, format: string, updateIntervalInSeconds: number,
        )]
    }
    timeRange(from: ts.Expression, to: ts.Expression) {
        return [
            createJsxSelfClosingElement(formattedDateTimeRange,
                [
                    factory.createJsxAttribute(
                        factory.createIdentifier("from"),
                        factory.createJsxExpression(
                            undefined,
                            from
                        )
                    ),
                    factory.createJsxAttribute(
                        factory.createIdentifier("to"),
                        factory.createJsxExpression(
                            undefined,
                            to
                        )
                    )
                ]
            )
        ]
    }
    message(message: ts.StringLiteral | ts.JsxExpression, values: ts.Expression) {
        return [createJsxSelfClosingElement(formattedMessage,
            [
                factory.createJsxAttribute(
                    factory.createIdentifier("id"),
                    message
                ),
                factory.createJsxAttribute(
                    factory.createIdentifier("values"),
                    factory.createJsxExpression(
                        undefined,
                        values
                    )
                )]
        )]
    }
}

const singleton = new TagFormatter()

export default singleton
