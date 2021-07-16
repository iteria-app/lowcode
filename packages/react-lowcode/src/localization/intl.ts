export function parseMessageId(value: string) : string | undefined {
    if (value && value.startsWith("intl")) {
        const start = value.indexOf(":")
        const end = value.indexOf("}")
        let messageId = undefined
        if (start !== -1 && end !== -1) {
            messageId = value.substring(
                start + 1,
                end
            )
        } else {
            messageId = value.substring(
                value.indexOf("(") + 1,
                value.indexOf(")")
            )
        }
        return messageId
      }
    return undefined
}

export function convertMessageIdToValue(messageId: string) : string {
    return  `intl.formatMessage({ id:${messageId}})`
}