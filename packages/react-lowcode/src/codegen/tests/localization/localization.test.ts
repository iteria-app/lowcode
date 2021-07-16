import { expressionToMessageId, messageIdToExpression } from "../../../localization"

test(".parse messageId", async () => {
    const input = "intl.formatMessage('messageId')"
    const expected = "messageId"

    const result = expressionToMessageId(input)
    expect(result).toEqual(expected)
})


test(".create expression", async () => {
    const input = "messageId"
    const expected = "intl.formatMessage({ id:messageId })"

    const result = messageIdToExpression(input)
    expect(result).toEqual(expected)
})