import { CodeRW } from "../io"
import { parseLocaleJSON, patchLocaleJSON } from "./json"

export async function updateLocaleMessageFile(messageId: string, newMessageValue: string, localeSourceUrl: string, io: CodeRW) {
  const originalFileContent = await io.readFile(localeSourceUrl)
  if (originalFileContent) {
    const newFileContent = patchLocaleMessageSourceCode(messageId, newMessageValue, originalFileContent)
    console.log('click D', messageId, newMessageValue, { newFileContent, originalFileContent})
  }
}
  
export function patchLocaleMessageSourceCode(messageId: string, newValue: string, originalLocaleJSON: string) {
  const originalMessages = parseLocaleJSON(originalLocaleJSON)
  const found = originalMessages?.find((message) => message.id == messageId)
  if (originalMessages && found) {
    const changedMessage = {
      ...found,
      value: newValue
    }
    return patchLocaleJSON(originalLocaleJSON, originalMessages, [changedMessage])
  }
}
  
export function guessLocaleSourceUrl(sourceDir: string, languageLocale = 'en') {
  if (!sourceDir) {
    return undefined
  }
  return `${sourceDir}/compiled-lang/${languageLocale ?? 'en'}.json` // FIXME hardcoded file path
}
  