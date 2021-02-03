import ts, { ScriptKind, ScriptTarget } from "typescript"
import { createAst } from "../tsx/createSourceFile"
import { changeLocaleFile, getAllWordsFromLocale, getValuesFromLocalizationASTJSON } from "./localizations"
import sk_SK from "./sk_SK"

const expectedAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
const { positionsTable } = getValuesFromLocalizationASTJSON(expectedAST)
const originalWords = getAllWordsFromLocale(positionsTable)
const positionsConst = positionsTable
const positionLength = positionsTable.length
//change this array for making changes of final result json
// i.e. change text property
const positionsChanged = [{ "id": "year", "start": 1, "end": 7 }, { "id": "xxxx", "start": 8, "end": 13 }, { "id": "month", "start": 14, "end": 21 }, { "id": "mesiac", "start": 22, "end": 30 }, { "id": "day", "start": 31, "end": 36 }, { "id": "den", "start": 37, "end": 42 }, { "id": "minute", "start": 43, "end": 51 }, { "id": "xxx", "start": 52, "end": 60 }, { "id": "second", "start": 61, "end": 69 }, { "id": "sekunda", "start": 70, "end": 79 }, { "id": "new", "start": 80, "end": 85 }, { "id": "novy", "start": 86, "end": 92 }, { "id": "old", "start": 93, "end": 98 }, { "id": "starky", "start": 99, "end": 107 }, { "id": "super", "start": 108, "end": 115 }, { "id": "super", "start": 116, "end": 123 }]
const row = '"year":"xxxx"'

it('compare positions should not be the same after change', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { positionsTable } = getValuesFromLocalizationASTJSON(astLocale)
    const originalWords = getAllWordsFromLocale(positionsTable)
    expect(positionsTable).not.toBe(positionsChanged)
})

it('compare positions table to be equal after function', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { positionsTable } = getValuesFromLocalizationASTJSON(astLocale)
    expect(positionsTable).toEqual(positionsConst)
})

it('compare if changed locale contains changed text', () => {
    const resultOfChanging = changeLocaleFile(JSON.stringify(sk_SK), positionsChanged, originalWords)
    expect(resultOfChanging).toContain('xxx')
})


it('compare if the row has changed row', () => {
    const resultOfChanging = changeLocaleFile(JSON.stringify(sk_SK), positionsChanged, originalWords)
    const firstRow = resultOfChanging.substring(1, 14)
    expect(firstRow).toEqual(row)
})

