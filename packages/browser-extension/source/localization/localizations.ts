import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import sk_SK from "./sk_SK";
import { Message } from "./localizationInterfaces";



export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined) {
  let localeMessages: Message[] = []
  astLocale?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      let locale = {
        id: property.name.text,
        value: property.initializer.text,
        locale: "sk_SK",
        position: { start: property.initializer.pos, end: property.initializer.end }
      }
      localeMessages = [...localeMessages, locale]
    })
  })
  return localeMessages
}


export function saveTableValuesAndParseBack(tableBody: HTMLTableElement, messages: Message[]) {
  let localeCounter = 0
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
    for (var c = 0, m = tableBody.rows[r].cells.length; c < m; c++) {
      if (tableBody.rows[r].cells[c].childNodes[0].nodeType == Node.TEXT_NODE) {
        console.log("")
      } else {
        messages[localeCounter].value = tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value
        localeCounter = localeCounter + 1
      }
    }
  }
  return messages

}

export const findWordFromLocale = (code: string, start: number, end: number) => {
  return code.substring(start + 1, end - 1)
}

export const changeLocaleFile = (localeFile: string, messages: Message[], originalWords: string[]) => {
  originalWords.forEach((word: string, index) => {
    localeFile = localeFile.replace(word, messages[index].value)
  })
  return localeFile
}

export const getAllWordsFromLocale = (messages: Message[]) => {
  let words: string[] = []
  messages.forEach((message: any) => {
    const word = findWordFromLocale(JSON.stringify(sk_SK), message.position.start, message.position.end)
    words = [...words, word]
  })
  return words
}

export const getWordsFromLocale = (code: string, messages: Message[]) => {
  let words: string[] = []
  messages.forEach((message: Message) => {
    // without " " only the value
    const word = code.substring(message.position.start + 1, message.position.end - 1)
    words = [...words, word]
  })
  return words
}











