export function expressionToMessageId(expression: string) : string | undefined {
    if (expression && expression.startsWith("intl.formatMessage(")) {
        const start = expression.indexOf(":")
        const end = expression.indexOf("}")
        let messageId = undefined
        if (start !== -1 && end !== -1) {
            messageId = expression.substring(
                start + 1,
                end
            )
        } else {
            messageId = expression.substring(
                expression.indexOf("(") + 1,
                expression.indexOf(")")
            )
        }
        return messageId
    }
    return undefined
}

export function messageIdToExpression(messageId: string) : string {
    return `intl.formatMessage({ id:${messageId} })`
}