import {createAst} from '../../ast'

export function expressionToMessageId(expression: string, attrName: string) : string | undefined {
    const acceptedElements = ["label", "placeholder", "helperText"]
    if (acceptedElements.indexOf(attrName) !== -1) {
        const tree = createAst(expression)
        const statement = tree?.statements[0] as any
        if (statement && statement.expression && statement.expression.expression && statement.expression.arguments) {
            const argument = statement.expression.arguments[0]
            const prop = argument.properties[0]
            const messageId = prop.initializer.getText() as string
            const ret = messageId.replaceAll("/.*($)({)(}).*/g", "").replaceAll("'","")
            return ret
        }

        return "undefined"
    }
    return undefined
}

export function messageIdToExpression(messageId: string) : string {
    return `intl.formatMessage({ id: '${messageId}' })`
}