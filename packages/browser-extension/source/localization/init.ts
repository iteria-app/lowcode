import { createAst } from "../react-lowcode/ast/factory";
import sk_SK from "../localization/sk_SK";
import { addNewLocale, changeAllFiles, changeLocaleFile, combineLocales, createDynamicLocales, createTemporaryLocales, getLocaleFilesNames, getValuesFromLocalizationASTJSON, findLocaliozationFiles, saveAllLocalesFromTable, saveAllValuesAndParseBack, saveTableValuesAndParseBack, sendUpdatedFiles, updateFiles } from "../localization/localizations";
import { createDynamicTable, createMultiTableWithMessages, createTableWithMessages } from "../localization/localeTables";
import en_EN from "../localization/en_EN";
import { ScriptTarget, ScriptKind } from "typescript";
import { CodeRW } from '../react-lowcode/io/rw'

export async function initLocalization(directory: string[], document: HTMLDocument, io: CodeRW) {
    console.log('initLocalization', directory, document, io)
    
    const loadedFile = await io.readFile(directory.find((file) => file.indexOf('en') >= 0) || '')//TODO remove this
    console.log("Directory", directory)
    //@ts-ignore
    const fileNames = getLocaleFilesNames(directory)
    console.log("FileNames", fileNames)
    const temporary = await createTemporaryLocales(fileNames, io)
    console.log("Temporary", temporary)
    //@ts-ignore
    const dynamicLocales = createDynamicLocales(temporary)
    const originalDynamic = JSON.parse(JSON.stringify(dynamicLocales));
    //@ts-ignore
    const loadedLocale = createAst(loadedFile,ScriptTarget.ESNext,ScriptKind.JSON )
    const sourceCodes = [sk_SK, en_EN]
    console.log("SOurce codes", sourceCodes)
    const all = combineLocales(sourceCodes)
    //@ts-ignore
    const dynamicTableBody:HTMLTableElement= document.getElementById('dynamic-tableBody')
    //@ts-ignore
    const tableBody:HTMLTableElement= document.getElementById('locale-tableBody')
    //@ts-ignore
    const allMessagesBody:HTMLTableElement= document.getElementById('multi-tableBody')
    const astLocale = createAst(JSON.stringify(sk_SK),ScriptTarget.ESNext,ScriptKind.JSON )
    
    const localeMessages = getValuesFromLocalizationASTJSON(loadedLocale)
    const original = JSON.parse(JSON.stringify(localeMessages));
    const multiMessages = addNewLocale(JSON.stringify(sk_SK), JSON.stringify(en_EN) )
    const originalMulti = JSON.parse(JSON.stringify(multiMessages));
    createTableWithMessages(localeMessages, document)
    //@ts-ignore
    createMultiTableWithMessages(multiMessages, document)
    createDynamicTable(dynamicLocales, document)
    const saveDynamic = document.getElementById('saveDynamic')
    saveDynamic?.addEventListener('click', async () => {
    //@ts-ignore
    const savedDynamicLocales = saveAllLocalesFromTable(dynamicTableBody, dynamicLocales)
    console.log("ALl messages", savedDynamicLocales, "Original", dynamicLocales)
    if(savedDynamicLocales){
        const changedFiles = await updateFiles(temporary, savedDynamicLocales, originalDynamic)
        console.log("CHANGED FILES", changedFiles)
        //@ts-ignore
        sendUpdatedFiles(changedFiles, fileNames, io)
    }
    })

    const saveTableButton = document.getElementById('saveTable')
    saveTableButton?.addEventListener('click', () =>{
    const messages = saveTableValuesAndParseBack(tableBody, localeMessages)
    if(messages){
        //@ts-ignore
        const resultOfChanging = changeLocaleFile(loadedFile,messages, original)
        console.log("RESULT OF CHANGING", resultOfChanging, )
        io.writeFile('src/localization/en_EN.ts', resultOfChanging)
    }
    })

    const saveAllButton = document.getElementById('saveAll')
    saveAllButton?.addEventListener('click', () => {
    //@ts-ignore
    const allMessages = saveAllValuesAndParseBack(allMessagesBody, multiMessages)
    console.log("ALl messages", allMessages, "Original", originalMulti)
    if(allMessages){
        const {skSourceCode, enSourceCode} = changeAllFiles(JSON.stringify(sk_SK),JSON.stringify(en_EN),allMessages, originalMulti)
        console.log("RESULT OF CHANGING", enSourceCode, skSourceCode, )

        io.writeFile('src/localization/sk_SK.ts', "export default " + skSourceCode)
        io.writeFile('src/localization/en_EN.ts', "export default " + enSourceCode)
    }
    })
}