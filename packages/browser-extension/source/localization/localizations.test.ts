import ts, { ScriptKind, ScriptTarget } from "typescript"
import { createAst } from "../tsx/createSourceFile"
import { createTable } from "./localeTables"
import { createFinalFile, getValuesFromLocalizationASTJSON, replaceCommaLine, saveTableValuesAndParseBack, transformSourceFile } from "./localizations"
import sk_SK from "./sk_SK"

const expectedAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
const { english, slovak, locales, positionsTable } = getValuesFromLocalizationASTJSON(expectedAST)
const positionLength = positionsTable.length
const original: string = `export default {
    "year": "rok",
    "month": "mesiac",
    "day": "den",
    "minute": "minuta",
    "second": "sekunda",
    "new": "novy",
    "old": "starky",
    "super": "super" }`

const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
})

it("positions should be array", () => {
    const createdAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable } = getValuesFromLocalizationASTJSON(createdAST)
    expect(positionsTable).toHaveLength(positionLength)
})

it("Test if objects are equal", () => {
    const createdAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable } = getValuesFromLocalizationASTJSON(createdAST)
    const transformedAST = transformSourceFile(positionsTable)
    const updatedFile = createFinalFile(printer, transformedAST.compilerNode)
    if (updatedFile) {
        let replaced = replaceCommaLine(updatedFile)
        replaced = 'export default ' + replaced;
        console.log("replaced", replaced, typeof (replaced))
        expect(replaced.replace(/\s/g, '')).toEqual(original.replace(/\s/g, ''));
    }
})

it("If final string cointains", () => {
    const createdAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable } = getValuesFromLocalizationASTJSON(createdAST)
    const transformedAST = transformSourceFile(positionsTable)
    const updatedFile = createFinalFile(printer, transformedAST.compilerNode)
    if (updatedFile) {
        let replaced = replaceCommaLine(updatedFile)
        replaced = 'export default ' + replaced;
        expect(replaced).toContain('mesiac');
    }
})

const changedPositions = [{ "text": "rok", "position": 8 }, { "text": "mesic", "position": 22 }, { "text": "den", "position": 37 }, { "text": "minuta", "position": 52 }, { "text": "sekunda", "position": 70 }, { "text": "novy", "position": 86 }, { "text": "starky", "position": 99 }, { "text": "super", "position": 116 }]

it("Test changed slovak translation", () => {
    const createdAST = createAst(JSON.stringify(sk_SK), ScriptTarget.ESNext, ScriptKind.JSON)
    const { english, slovak, locales, positionsTable } = getValuesFromLocalizationASTJSON(createdAST)
    const transformedAST = transformSourceFile(changedPositions)
    const updatedFile = createFinalFile(printer, transformedAST.compilerNode)
    if (updatedFile) {
        let replaced = replaceCommaLine(updatedFile)
        replaced = 'export default ' + replaced;
        expect(replaced).toContain('mesic');
    }
})


