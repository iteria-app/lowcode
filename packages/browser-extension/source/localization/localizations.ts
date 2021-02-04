import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import sk_SK from "./sk_SK";
import { LocaleMessage, Message } from "./localizationInterfaces";



export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined) {
  let positionsTable: Message[] = []
  let localeMessages: LocaleMessage[] = []
  astLocale?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      let locale = {
        id: property.name.text,
        value: property.initializer.text,
        locale: "sk_SK",
        position: { start: property.initializer.pos, end: property.initializer.end }
      }
      positionsTable = [...positionsTable, { id: property.name.text, start: property.name.pos, end: property.name.end },
      { id: property.initializer.text, start: property.initializer.pos, end: property.initializer.end }]
      localeMessages = [...localeMessages, locale]
    })
  })
  return {
    positionsTable,
    localeMessages
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
  return code.substring(start + 1, end - 1)
}

export const changeLocaleFile = (localeFile: string, allPositions: Message[], originalWords: string[]) => {
  originalWords.forEach((word: string, index) => {
    localeFile = localeFile.replace(word, allPositions[index].id)
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

export const getWordsFromLocale = (code: string, messages: LocaleMessage[]) => {
  let words: string[] = []
  messages.forEach((message: LocaleMessage) => {
    // without " " only the value
    const word = code.substring(message.position.start + 1, message.position.end - 1)
    words = [...words, word]
  })
  return words
}











