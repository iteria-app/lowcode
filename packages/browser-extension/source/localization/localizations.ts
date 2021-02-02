import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import { TransformTraversalControl, ts } from "ts-morph";
import { Project } from "ts-morph"
import sk_SK from "./sk_SK";
import { LocaleWithPosition, Position } from "./localizationInterfaces";
import { findElementInCode } from "../tsx/clone";
import { astFindSource, SourceLineCol } from "../tsx/ast";



export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined) {
  let english: string[] = []
  let slovak: string[] = []
  let locales: string[] = []
  let positionsTable: Position[] = []
  let englishPositionsTable: LocaleWithPosition[] = []
  astLocale?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      console.log("Property", property)
      locales = [...locales, property.name.text]
      locales = [...locales, property.initializer.text]
      positionsTable = [...positionsTable, { text: property.name.text, start: property.name.pos, end: property.name.end },
      { text: property.initializer.text, start: property.initializer.pos, end: property.initializer.end }]
      englishPositionsTable = [...englishPositionsTable, { text: property.name.text, position: property.name.pos }]
      english = [...english, property.name.text]
      slovak = [...slovak, property.initializer.text]
    })
  })
  console.log("POsitions", positionsTable, "English positions", englishPositionsTable)
  return {
    english,
    slovak,
    locales,
    positionsTable,
    englishPositionsTable
  }
}


export function saveTableValuesAndParseBack(tableBody: any, positions: LocaleWithPosition[], allPositions: Position[]) {
  let englishTable: string[] = []
  let slovakTable: string[] = []
  let counter = 0
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
    for (var c = 0, m = tableBody.rows[r].cells.length; c < m; c++) {

      console.log("ALL positions", allPositions, "With index", allPositions[counter], "counter", counter)
      if (tableBody.rows[r].cells[c].childNodes[0].nodeType == Node.TEXT_NODE) {
        englishTable = [...englishTable, tableBody.rows[r].cells[c].innerHTML]
        allPositions[counter].text = tableBody.rows[r].cells[c].innerHTML
        counter = counter + 1
      } else {
        slovakTable = [...slovakTable, tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value]
        positions[r].text = tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value
        allPositions[counter].text = tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value
        counter = counter + 1
      }
    }
  }
  console.log('New Positions', positions, "New All Positions", allPositions)
  return { englishTable, slovakTable, positions, allPositions }

}

export const extractWord = (code: string, start: number, end: number) => {
  return code.substring(start, end)
}

export const changeLocaleFile = (localeFile: string, allPositions: Position[], originalWords: string[]) => {
  originalWords.forEach((word: string, index) => {
    localeFile = localeFile.replace(word, '"' + allPositions[index].text + '"')
  })
  console.log("WORDS", originalWords, "Locale file After", localeFile, "All positions", allPositions, "After replace", localeFile)
  return localeFile
}

export const extractAllStrings = (positions: Position[]) => {
  let words: string[] = []
  positions.forEach((position: any) => {
    const word = extractWord(JSON.stringify(sk_SK), position.start, position.end)
    words = [...words, word]
    console.log("EACH WORD", word)
  })
  return words
}











