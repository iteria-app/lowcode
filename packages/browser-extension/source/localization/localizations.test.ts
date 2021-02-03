import ts, { ScriptKind, ScriptTarget } from "typescript"
import { createAst } from "../tsx/createSourceFile"
import { createTable } from "./localeTables"
import { changeLocaleFile, extractAllStrings, getValuesFromLocalizationASTJSON } from "./localizations"
import sk_SK from "./sk_SK"

const expectedAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
const { english, slovak, locales, positionsTable } = getValuesFromLocalizationASTJSON(expectedAST)
const originalWords = extractAllStrings(positionsTable)
const positionsConst = positionsTable
const positionLength = positionsTable.length
//change this array for making changes of final result json
// i.e. change text property
const positionsChanged = [{ "text": "year", "start": 1, "end": 7 }, { "text": "xxxx", "start": 8, "end": 13 }, { "text": "month", "start": 14, "end": 21 }, { "text": "mesiac", "start": 22, "end": 30 }, { "text": "day", "start": 31, "end": 36 }, { "text": "den", "start": 37, "end": 42 }, { "text": "minute", "start": 43, "end": 51 }, { "text": "xxx", "start": 52, "end": 60 }, { "text": "second", "start": 61, "end": 69 }, { "text": "sekunda", "start": 70, "end": 79 }, { "text": "new", "start": 80, "end": 85 }, { "text": "novy", "start": 86, "end": 92 }, { "text": "old", "start": 93, "end": 98 }, { "text": "starky", "start": 99, "end": 107 }, { "text": "super", "start": 108, "end": 115 }, { "text": "super", "start": 116, "end": 123 }]
const row = '"year":"xxxx"'

it('compare positions should not be the same after change', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable, englishPositionsTable } = getValuesFromLocalizationASTJSON(astLocale)
    const originalWords = extractAllStrings(positionsTable)
    expect(positionsTable).not.toBe(positionsChanged)
})

it('compare positions table to be equal after function', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable, englishPositionsTable } = getValuesFromLocalizationASTJSON(astLocale)
    expect(positionsTable).toEqual(positionsConst)
})

it('compare if changed locale contains changed text', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable, englishPositionsTable } = getValuesFromLocalizationASTJSON(astLocale)
    const resultOfChanging = changeLocaleFile(JSON.stringify(sk_SK), positionsChanged, originalWords)
    expect(resultOfChanging).toContain('xxx')
})


it('compare if the row has changed row', () => {
    const astLocale = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable, englishPositionsTable } = getValuesFromLocalizationASTJSON(astLocale)
    const resultOfChanging = changeLocaleFile(JSON.stringify(sk_SK), positionsChanged, originalWords)
    const firstRow = resultOfChanging.substring(1, 14)
    expect(firstRow).toEqual(row)
})

