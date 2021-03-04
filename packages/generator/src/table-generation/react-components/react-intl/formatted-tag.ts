import ts, { factory } from "typescript"
import { defineComponent, createJsxSelfClosingElement, Component } from '../react-component-helper'

export const formattedDate = defineComponent('FormattedDate', 'react-intl')
export const formattedTime = defineComponent('FormattedTime', 'react-intl')
export const formattedNumber = defineComponent('FormattedNumber', 'react-intl')
export const formattedDateTimeRange = defineComponent('FormattedDateTimeRange', 'react-intl')
export const formattedRelativeTime = defineComponent('FormattedRelativeTime', 'react-intl')
export const formattedPlural = defineComponent('FormattedPlural', 'react-intl')
export const formattedMessage = defineComponent('FormattedMessage', 'react-intl')

function formattedValue(component: Component, expression: ts.Expression) {
    return createJsxSelfClosingElement(component.tagName,
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
    date(value: ts.Expression): ts.JsxChild[] {
        return [formattedValue(formattedDate, value)]
    }
    time(value: ts.Expression): ts.JsxChild[] {
        return [formattedValue(formattedTime, value)]
    }
    dateTime(value: ts.Expression): ts.JsxChild[] {
        return [
            formattedValue(formattedDate, value),
            factory.createJsxText(
                " ",
                false
            ),
            formattedValue(formattedTime, value)
        ]
    }
    number(value: ts.Expression): ts.JsxChild[] {
        return [formattedValue(formattedNumber, value)]
    }
    plural(value: ts.Expression): ts.JsxChild[] {
        return [formattedValue(formattedPlural, value)]
    }
    duration(value: ts.Expression, unit: ts.Expression): ts.JsxChild[] {
        return [formattedValue(formattedRelativeTime, value
            // TODO unit: Unit, format: string, updateIntervalInSeconds: number,
        )]
    }
    timeRange(from: ts.Expression, to: ts.Expression): ts.JsxChild[] {
        return [
            createJsxSelfClosingElement(formattedDateTimeRange.tagName,
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
    message(message: ts.StringLiteral | ts.JsxExpression, values: ts.Expression | undefined = undefined): ts.JsxChild[] {
        return [createJsxSelfClosingElement(formattedMessage.tagName,
            [
                factory.createJsxAttribute(
                    factory.createIdentifier("id"),
                    message
                ),
                ...(values ? [factory.createJsxAttribute(
                    factory.createIdentifier("values"),
                    factory.createJsxExpression(
                        undefined,
                        values
                    )
                )]: [])
            ]
        )]
    }
}

const singleton = new TagFormatter()

export default singleton
