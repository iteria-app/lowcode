import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import sk_SK from "./sk_SK";
import { Message, MultiMessage } from "./localizationInterfaces";
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
  for (let i = changedMessages.length; i >= 0; i--) {
    if (changedMessages[i]?.value == originalMessages[i]?.value) {
      console.log("Equal")
    } else {
      const before = localeFile.substring(0, originalMessages[i].position.pos + 1)
      const after = localeFile.substring(originalMessages[i].position.end - 1)
      localeFile = before + changedMessages[i].value + after
    }
  }
  return localeFile

}


export const addNewLocale = (skSourceCode: string, enSourceCode: string) => {
  const skLocale = createAst(skSourceCode, ScriptTarget.ESNext, ScriptKind.JSON)
  const skMessages = getValuesFromLocalizationASTJSON(skLocale)
  const enLocale = createAst(enSourceCode, ScriptTarget.ESNext, ScriptKind.JSON)
  const enMessages = getValuesFromLocalizationASTJSON(enLocale, "en_EN")
  console.log("En Messages", enMessages)
  //@ts-ignore
  const finalMessages = skMessages.map((skMessage: Message) => {
    return {
      id: skMessage?.id,
      skSK: {
        value: skMessage.value,
        position: skMessage.position
      },
      enEN: {
        value: enMessages.find((message: Message) => message.id == skMessage.id)?.value,
        position: enMessages.find((message: Message) => message.id == skMessage.id)?.position
      }
    }
  })
  console.log("result", finalMessages)
  return finalMessages
}

export function saveAllValuesAndParseBack(tableBody: HTMLTableElement, allMessages: MultiMessage[]) {
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
    allMessages[r].skSK.value = tableBody.rows[r].cells[1].getElementsByTagName('input')[0]?.value
    allMessages[r].enEN.value = tableBody.rows[r].cells[2].getElementsByTagName('input')[0]?.value
  }
  return allMessages
}


export const changeAllFiles = (skSourceCode: string, enSourceCode: string, changedMessages: MultiMessage[], originalMessages: MultiMessage[]) => {
  for (let i = changedMessages.length; i >= 0; i--) {
    if (changedMessages[i]?.skSK.value == originalMessages[i]?.skSK.value) {
      console.log("")
    } else {
      const before = skSourceCode.substring(0, originalMessages[i].skSK.position.pos + 1)
      const after = skSourceCode.substring(originalMessages[i].skSK.position.end - 1)
      skSourceCode = before + changedMessages[i].skSK.value + after
    }
  }
  for (let i = changedMessages.length; i >= 0; i--) {
    if (changedMessages[i]?.enEN.value == originalMessages[i]?.enEN.value) {
      console.log("")
    } else {
      const before = enSourceCode.substring(0, originalMessages[i].enEN.position.pos + 1)
      const after = enSourceCode.substring(originalMessages[i].enEN.position.end - 1)
      enSourceCode = before + changedMessages[i].enEN.value + after
    }
  }
  return { skSourceCode, enSourceCode }
}

















