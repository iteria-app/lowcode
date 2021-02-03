import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import sk_SK from "./sk_SK";
import { Message } from "./localizationInterfaces";



export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined) {
  let english: string[] = []
  let slovak: string[] = []
  let positionsTable: Message[] = []
  astLocale?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      positionsTable = [...positionsTable, { id: property.name.text, start: property.name.pos, end: property.name.end },
      { id: property.initializer.text, start: property.initializer.pos, end: property.initializer.end }]
      english = [...english, property.name.text]
      slovak = [...slovak, property.initializer.text]
    })
  })
  return {
    english,
    slovak,
    positionsTable,
  }
}


export function saveTableValuesAndParseBack(tableBody: HTMLTableElement, allPositions: Message[]) {
  let counter = 0
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
    for (var c = 0, m = tableBody.rows[r].cells.length; c < m; c++) {
      if (tableBody.rows[r].cells[c].childNodes[0].nodeType == Node.TEXT_NODE) {
        allPositions[counter].id = tableBody.rows[r].cells[c].innerHTML
        counter = counter + 1
      } else {
        allPositions[counter].id = tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value
        counter = counter + 1
      }
    }
  }
  console.log("New All Positions", allPositions)
  return allPositions

}

export const findWordFromLocale = (code: string, start: number, end: number) => {
  return code.substring(start, end)
}

export const changeLocaleFile = (localeFile: string, allPositions: Message[], originalWords: string[]) => {
  originalWords.forEach((word: string, index) => {
    localeFile = localeFile.replace(word, '"' + allPositions[index].id + '"')
  })
  return localeFile
}

export const getAllWordsFromLocale = (positions: Message[]) => {
  let words: string[] = []
  positions.forEach((position: any) => {
    const word = findWordFromLocale(JSON.stringify(sk_SK), position.start, position.end)
    words = [...words, word]
  })
  return words
}











