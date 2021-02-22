import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import sk_SK from "./sk_SK";
import { Message, MultiMessage } from "./localizationInterfaces";
import { createAst } from "../tsx/createSourceFile";
import { readDir, readFile } from "../util/fetch"
import * as path from 'path'
import { CodeRW } from "../io/rw";



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

export const loadFileFromReactProject = async (pathToFile: string) => {
  try {
    const file = await readFile(pathToFile).catch((err) => console.log("Error", err))
    return file
  } catch (error) {
    console.log("Error", error)
  }
}

export const loadDirectoryFromProject = async (pathToDir: string) => {
  try {
    const dir = await readDir(pathToDir).catch((err) => console.log("Error", err))
    return dir
  } catch (error) {
    console.log("Error", error)
  }
}

export const getFilesFromDirectory = async (pathToDirectory: string) => {
  try {
    const directory = await readDir(pathToDirectory).catch((err) => console.log("Error", err))
    const files = directory.map(async (file: string) => {
      const loadedFile = await loadFileFromReactProject(`${pathToDirectory}${file}`);
      return loadedFile
    });
    return files
  } catch (error) {
    console.log("err", error)
  }
}

export const getLocaleFilesNames = (directory: string[]) => {
  return directory.map((file: string) => {
    //delete .json
    return file.substring(0, file.length - 5)
  })
}

export const getFile = async (file: any) => {
  return await file
}

export const createTemporaryLocales = async (fileNames: string[], files: any[]) => {
  const allFiles = await Promise.all(files.map((file: any) => getFile(file)))
  const filesObjects = fileNames.map((file: string, index: number) => {
    return { locale: file, source: allFiles[index] }
  })
  return filesObjects
}

export const oneWithAllLocales = (allLocaleMessaages = []) => {
  if (allLocaleMessaages.length == 0) return
  //@ts-ignore
  const firstLocale = allLocaleMessaages[0].messages.map((message: Message) => {
    //@ts-ignore
    const locale = allLocaleMessaages[0].locale
    return {
      id: message.id,
      [locale]: {
        value: message.value,
        position: message.position
      }
    }
  })
  return firstLocale
}

export const createDynamicLocales = (localeFileObjects = []) => {
  const asts = localeFileObjects.map((fileObject: any) => {
    const ast = createAst(fileObject.source, ScriptTarget.ESNext, ScriptKind.JSON)
    return { ...fileObject, source: ast }
  })
  const messages = asts.map((ast: any) => {
    const localeMessages = getValuesFromLocalizationASTJSON(ast.source, ast.locale)
    return { locale: ast.locale, messages: localeMessages }
  })
  //@ts-ignore
  const firstLocaleMessages = oneWithAllLocales(messages)
  const final = firstLocaleMessages.map((firstMessage: any) => {
    const all = messages.map((message: any) => {
      return message.messages.find((one: any) => one.id == firstMessage.id)
    })
    return {
      id: firstMessage.id,
      messages: all.map((oneMessage: any) => {
        return {
          locale: oneMessage.locale,
          value: oneMessage.value,
          position: oneMessage.position
        }
      })
    }
  })
  return final
}

export function saveAllLocalesFromTable(tableBody: HTMLTableElement, allMessages = []) {
  console.log(allMessages, tableBody)
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
    for (var c = 0, m = tableBody.rows[r].cells.length - 1; c < m; c++) {
      console.log("R", r, "c", c)
      //@ts-ignore
      allMessages[r].messages[c].value = tableBody.rows[r].cells[c + 1]?.getElementsByTagName('input')[0]?.value
    }
  }
  return allMessages
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

export const createAsts = (sourceCodes: any[]) => {
  return sourceCodes.map((code: any) => createAst(JSON.stringify(code), ScriptTarget.ESNext, ScriptKind.JSON))
}

// export const getLocalesNames = (sourceCodes:[]) => {
//   return  
// }

export const combineLocales = (sourceCodes: any[]) => {
  const asts = createAsts(sourceCodes)
  console.log("ASTS", asts)
  //const pahtName = path.parse(sourceCodes[0]).base
  const messages = asts.map((ast: any) => { return getValuesFromLocalizationASTJSON(ast) })
  console.log("En Messages", messages)
  console.log("path name")
  //@ts-ignore
  // const finalMessages = skMessages.map((skMessage: Message) => {
  //   return {
  //     id: skMessage?.id,
  //     skSK: {
  //       value: skMessage.value,
  //       position: skMessage.position
  //     },
  //     enEN: {
  //       value: enMessages.find((message: Message) => message.id == skMessage.id)?.value,
  //       position: enMessages.find((message: Message) => message.id == skMessage.id)?.position
  //     }
  //   }
  // })
  // console.log("result", finalMessages)
  // return finalMessages
}

export const updateFiles = async (sourceCodes = [], changedMessages = [], originalMessages = []) => {
  const allFiles = await Promise.all(sourceCodes.map((file: any) => getFile(file)))
  for (let i = changedMessages.length - 1; i >= 0; i--) {
    console.log("I", i, originalMessages, allFiles)
    //@ts-ignore
    changedMessages[i].messages.forEach((message: any, index) => {
      //@ts-ignore
      console.log("Message", message, message.value, originalMessages[i].messages[index].value)
      //@ts-ignore
      if (message.value == originalMessages[i].messages[index].value) {
        console.log("")
      } else {
        //@ts-ignore
        const before = allFiles[index].substring(0, message.position.pos + 1)
        //@ts-ignore
        const after = allFiles[index].substring(message.position.end - 1)
        console.log("Before", before, "After", after)
        //@ts-ignore
        allFiles[index] = before + message.value + after
      }
    })
  }
  return allFiles
}

export const sendUpdatedFiles = (updatedFiles = [], fileNames = [], io: CodeRW) => {
  const finalUpdatedObjects = updatedFiles.map((file: any, index) => {
    return { file: fileNames[index], source: file }
  })
  console.log("Updated Objects", finalUpdatedObjects)
  finalUpdatedObjects.forEach((file: any) => {
    io.writeFile(`src/localizations/${file.file}.json`, file.source)
  })
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

  return {
    skSourceCode,
    enSourceCode
  }

}

















