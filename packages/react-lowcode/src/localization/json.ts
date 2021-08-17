import { createAst } from "../ast"
import { SourceFile, ScriptTarget, ScriptKind } from "typescript"
import { Message } from ".";
import { CodeDir, CodeRW } from "../io"
import { stripExtension } from "../workspace"
import {
  createFirstMessage,
  editExistingMessage,
  insertNewMessage,
} from './messageFunctions'

export function parseLocaleJSON(
  localeSourceCode: string,
  languageLocale = "en"
) {
  const localeAst = createAst(
    localeSourceCode,
    ScriptTarget.ESNext,
    ScriptKind.JSON
  )
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
        position: {
          pos: property.initializer?.pos,
          end: property.initializer?.end,
        },
      }
      localeMessages = [...localeMessages, locale]
    })
  })
  return localeMessages
}

// it preserves original JSON formatting
export function patchLocaleJSON(
  localeFile: string,
  changedMessages: Message[],
  originalMessages: Message[]
) {
  for (let i = changedMessages.length; i >= 0; i--) {
    if (changedMessages[i]?.value == originalMessages[i]?.value) {
      console.log("Equal")
    } else {
      const before = localeFile.substring(
        0,
        originalMessages[i].position.pos + 1
      )
      const after = localeFile.substring(originalMessages[i].position.end - 1)
      localeFile = before + changedMessages[i].value + after
    }
  }

  return localeFile
}


export async function getAllTranslations(path: string, io: CodeDir & CodeRW) : Promise<Object> {
  if (path) {
    const allTranslations : any = {} 
    const directory = await io.readDirectory(path)
    if (directory){
      const langs = Object.values(directory)
      for (let index in langs) {
        const item = langs[index] as any
        const fileName = item[0]
        const lang = stripExtension(fileName)
        const translation = await io.readFile(path + "/" + fileName)
        if (translation) {
          allTranslations[lang] = JSON.parse(translation)
        }
      }
      return allTranslations
    }
  } 
  return {}
}
 
export function createLocalJson(
  originalLocaleStringJSON: string | undefined,
  messageId: string,
  newValue: string
) {
  const originalMessages =
    parseLocaleJSON(originalLocaleStringJSON as string) || []
  const localFile = putLocaleMessage(
    messageId,
    newValue,
    originalLocaleStringJSON,
    originalMessages
  )
  const changedMessages = parseLocaleJSON(localFile as string) || []
  const patchJson = patchLocaleJSON(
    originalLocaleStringJSON || "",
    changedMessages,
    originalMessages
  )
  return patchJson
}

export function putLocaleMessage(
  messageId: string,
  newValue: string,
  originalLocaleStringJSON: string | undefined,
  originalMessages: Message[]
) {
  const found = originalMessages?.find((message) => message.id == messageId)

  if (originalMessages?.length == 0) {
    return createFirstMessage(messageId, newValue)
  } else if (found === undefined) {
    return insertNewMessage({
      originalMessages,
      messageId,
      newValue,
      originalLocaleStringJSON,
    })
  } else if (originalMessages && found) {
    return editExistingMessage({
      originalMessages,
      messageId,
      newValue,
      originalLocaleStringJSON,
    })
  }
}
