import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import sk_SK from "./sk_SK";
import { Message } from "./localizationInterfaces";
import { createAst } from "../tsx/createSourceFile";


export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined, languageLocale = "sk_SK") {
  let localeMessages: Message[] = []
  astLocale?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      let locale = {
        id: property.name.text,
        value: property.initializer?.text,
        locale: languageLocale,
        position: { pos: property.initializer.pos, end: property.initializer.end }
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

export const changeLocaleFile = (localeFile: string, changedMessages: Message[], originalMessages: Message[]) => {
  let messages = JSON.parse(JSON.stringify(originalMessages));
  changedMessages.forEach((message: Message, index) => {
    if (message.value == originalMessages[index].value) {
      console.log("Equal")
    } else {
      const before = localeFile.substring(0, messages[index].position.pos + 1)
      const after = localeFile.substring(messages[index].position.end - 1)
      localeFile = before + changedMessages[index].value + after
      //@ts-ignore
      let newAST = createAst(localeFile, ScriptTarget.ESNext, ScriptKind.JSON)
      messages = getValuesFromLocalizationASTJSON(newAST)
    }
  })
  return localeFile
}















