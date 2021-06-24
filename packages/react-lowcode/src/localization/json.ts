import { createAst } from "../ast";
import { SourceFile, ScriptTarget, ScriptKind } from "typescript"
import { Message } from ".";
import { 
  createFirstMessage,
  editExistingMessage,
  insertNewMessage
} from "./messageFunctions";


export function parseLocaleJSON(localeSourceCode: string, languageLocale = "en") {
    const localeAst = createAst(localeSourceCode, ScriptTarget.ESNext, ScriptKind.JSON)
    if (localeAst) {
      return parseLocaleAST(localeAst, languageLocale)
    }
}

export function parseLocaleAST(ast: SourceFile, languageLocale = "en") {
  let localeMessages: Message[] = []
  ast?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      let locale = {
        id: property.name.text,
        value: property.initializer?.text,
        locale: languageLocale,
        position: { pos: property.initializer?.pos, end: property.initializer?.end }
      }
      localeMessages = [...localeMessages, locale]
    })
  })
  return localeMessages
}

// it preserves original JSON formatting
export function patchLocaleJSON( 
  originalMessages: Message[],
  messageId: string,
  newValue: string,
  originalLocaleStringJSON: string | undefined
  ){
    const found = originalMessages.find(
      (message) => message.id == messageId
    )

    if(originalMessages.length == 0){
      return createFirstMessage(messageId,newValue)
    }
    else if (found === undefined) {
      return insertNewMessage({
        originalMessages,
        messageId,
        newValue,
        originalLocaleStringJSON,
      })
    }
  else if (originalMessages && found) {
    return  editExistingMessage({
      originalMessages,
      messageId,
      newValue,
      originalLocaleStringJSON,
    })
  }
}
