import ts, { ScriptKind, ScriptTarget } from "typescript"
import { createAst } from "../react-lowcode/ast/factory"
import { changeLocaleFile, getValuesFromLocalizationASTJSON } from "./localizations"
import sk_SK from "./sk_SK"

const expectedAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
const initialMessages = getValuesFromLocalizationASTJSON(expectedAST)
const row = `"year":"rok1"`
const changedMessage = { "id": "year", "value": "rok1", "locale": "sk_SK", "position": { "pos": 8, "end": 14 } }
const originalMessage = { "id": "year", "value": "rok", "locale": "sk_SK", "position": { "pos": 8, "end": 13 } }
const messagesForTest = [{ "id": "year", "value": "rok1", "locale": "sk_SK", "position": { "pos": 8, "end": 13 } }, { "id": "month", "value": "mesiac", "locale": "sk_SK", "position": { "pos": 22, "end": 30 } }, { "id": "day", "value": "den", "locale": "sk_SK", "position": { "pos": 37, "end": 42 } }, { "id": "minute", "value": "minuta", "locale": "sk_SK", "position": { "pos": 52, "end": 60 } }, { "id": "second", "value": "sekunda", "locale": "sk_SK", "position": { "pos": 70, "end": 79 } }, { "id": "new", "value": "novy", "locale": "sk_SK", "position": { "pos": 86, "end": 92 } }, { "id": "old", "value": "starky", "locale": "sk_SK", "position": { "pos": 99, "end": 107 } }, { "id": "super", "value": "super", "locale": "sk_SK", "position": { "pos": 116, "end": 123 } }]
it('compare positions should not be the same after change', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const localeMessages = getValuesFromLocalizationASTJSON(astLocale)
    expect(localeMessages).toEqual(initialMessages)
})

it('To have same length', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const localeMessages = getValuesFromLocalizationASTJSON(astLocale)
    expect(localeMessages).toHaveLength(8)
})

it('compare if locale contains changed text', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const localeMessages = getValuesFromLocalizationASTJSON(astLocale)
    expect(localeMessages[0]).not.toEqual(changedMessage)
})

it('compare if locale equals with', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const localeMessages = getValuesFromLocalizationASTJSON(astLocale)
    console.log("Message", localeMessages[0])
    expect(localeMessages[0]).toEqual(originalMessage)
})

it('compare if locale equals with', () => {
    const resultOfChanging = changeLocaleFile(JSON.stringify(sk_SK), messagesForTest, initialMessages)
    const firstRow = resultOfChanging.substring(1, 14)
    expect(firstRow).toEqual(row)
})


