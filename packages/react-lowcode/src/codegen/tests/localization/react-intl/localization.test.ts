import { expressionToMessageId, messageIdToExpression } from "../../../../localization"

test(".parse messageId", async () => {
    const input = "intl.formatMessage({ id: 'messageId'})"
    const expected = "messageId"

    const result = expressionToMessageId(input, "label")
    expect(result).toEqual(expected)
})


test(".create expression", async () => {
    const input = "messageId"
    const expected = "intl.formatMessage({ id: 'messageId' })"

    const result = messageIdToExpression(input)
    expect(result).toEqual(expected)
})