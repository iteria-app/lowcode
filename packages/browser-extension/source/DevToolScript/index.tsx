import { browser } from "webextension-polyfill-ts";
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SourceFile, CompilerOptions, ScriptTarget, ScriptKind, CompilerHost } from "typescript";
import ts from "typescript";
//@ts-ignore
import {WCMonacoEditor} from './wcEditor'
import { createAst } from "../tsx/createSourceFile";
import skSK from "../localization/skSK";
import { createFileFromAST, createFinalFile, createTable, getValuesFromLocalizationAST, getValuesFromLocalizationASTJSON, saveTableToObjects, saveTableValuesAndParseBack, transformSourceFile } from "../util/localizations";
//@ts-ignore
//import skSK from '../localization/skSK'
//import { createAst } from "../tsx/createSourceFile";
//import { createFileFromAST, createObjectLiteralFromTable, createTable, getLocales, getValuesFromLocalizationAST, getValuesFromLocalizationASTJSON, saveTableToObjects, saveTableValuesAndParseBack} from "../util/localizations";

console.log("[lowcode] devtools.js A");

browser.devtools.panels
  .create("Lowcode", "/icon.png", "/devtools.html")
  .then((extensionPanel) => {
    console.log("devtools.js panel create then");

    var panelWindow: Window;

    var data: any[] = [];
    var port = browser.runtime.connect(/*'devtools'*/);

    function do_something(msg: any) {
      const rootElement = panelWindow.document.getElementById("devtools-root");
      const saveButton = panelWindow.document.getElementById('saveButton');
      const columnNumber = msg?.payload?.value?.source?.columnNumber
      const lineNumber = msg?.payload?.value?.source?.lineNumber
      console.log("Column Number", columnNumber, "Line Number", lineNumber)
      const editorElement:WCMonacoEditor = panelWindow.document.getElementById("editor");  
      const editor = editorElement.editor
      if (msg?.event == "inspectedElementSource") {
        
      }

      

      const pathFile = msg?.fileUrl
      const path = pathFile.substring(8)
      console.log("Path", path)
      
      if (editorElement) {
      //console.log("Editor", editor, "SKLOCALE", sk_SK)
       editorElement.src = msg?.body
       editorElement.value = msg?.body
       //editorElement.with(lineNumber, columnNumber)
       editorElement.focus()
       console.log("MODEL", msg, "Payload",JSON.stringify(msg?.payload))
       editor.focus();
       editor.revealLineInCenter(lineNumber + 4);
       editor.setPosition({
          lineNumber: 60,
          column: 40,
        });
        console.log("Position", editor.getPosition(), "Model", editor.getModel())

        if (saveButton) {
          saveButton.addEventListener('click', () => {
            fetch(`http://localhost:7500/files/${path}`, {method:'PUT', body:editorElement.value})
          })
        }
      }

      if (msg?.event === "inspectedElement") {
        console.log("Editor", editor)
      console.log("SK Locale")
        if (rootElement) {
          if (editorElement) {
             editor.focus();
             editorElement.src = msg?.body
             editorElement.value = msg?.body
             //editorElement.with(lineNumber, columnNumber)
             editorElement.focus();
             editor.revealLineInCenter(lineNumber + 4);
             editor.setPosition({
              lineNumber: 60,
              column: 40,
             });
            console.log("Position", editor.getPosition(), "Model", editor.getModel())
            if(saveButton){
              saveButton.addEventListener('click', () => {
                fetch(`http://localhost:7500/files/${path}`, {method:'PUT', body:editorElement.value})
             })
            }
          }
        }
      }
    }

    port.onMessage.addListener(function (msg) {
      console.log("devtools.js message", msg);
      
      // Write information to the panel, if exists.
      // If we don't have a panel reference (yet), queue the data.
      if (panelWindow) {
        do_something(msg);
      } else {
        data.push(msg);
      }
    });

    //https://stackoverflow.com/questions/11661613/chrome-devpanel-extension-communicating-with-background-page
    extensionPanel.onShown.addListener(function tmp(aPanelWindow) {
      console.log("devtools.js onShown", aPanelWindow);

      extensionPanel.onShown.removeListener(tmp); // Run once only
      panelWindow = aPanelWindow;

      const editorElement:WCMonacoEditor = panelWindow.document.getElementById("editor");  
      editorElement.editor.focus()
      editorElement.focus()

      
      // Release queued data
      let msg;
      while ((msg = data.shift())) {
        console.log("devtools.js queue", msg);
        do_something(msg);
      }
      // Just to show that it's easy to talk to pass a message back:
      //panelWindow.respond = function (msg) {
      //  port.postMessage(msg);
      //};
      
      const printer = ts.createPrinter()

      const tableBody = panelWindow.document.getElementById('locale-tableBody')
      const astLocale = createAst(JSON.stringify(skSK),ScriptTarget.ESNext,ScriptKind.JSON )
      console.log("AST",astLocale,"AST CHILDREN", astLocale?.getChildren(),"FOr each child", astLocale?.forEachChild((child:any)=>child),"Source File", astLocale?.getSourceFile)
      //const locales = getValuesFromLocalizationAST(astLocale)
      //const {english, slovak} = getLocales(locales)
       const {english, slovak, locales, positionsTable} = getValuesFromLocalizationASTJSON(astLocale)
       createTable(english, slovak, panelWindow)
      // console.log("Object created with factory", saveTableValuesAndParseBack(tableBody))
      //  const res = transformSourceFile(positionsTable)
      //  console.log("RES", res)

      const saveTableButton = panelWindow.document.getElementById('saveTable')
      saveTableButton?.addEventListener('click', ()=>{
       const {englishTable, slovakTable, positions} = saveTableValuesAndParseBack(tableBody, positionsTable)
       const result = saveTableToObjects(englishTable,slovakTable)
       console.log("result", result)
       const res = transformSourceFile(positions)
       console.log("RES", res, res.getFullText(), res.compilerNode,
        res.getFilePath())
        console.log("res", res)
       //const newFile = createFileFromAST(res)
       //@ts-ignore
       //console.log("New file", res.compilerNode.print())
       //@ts-ignore
       createFinalFile(printer, res.compilerNode)
       //console.log("Printer", printer.printFile(res))

       createFinalFile(printer,astLocale)

      //  const parsedAST = createObjectLiteralFromTable(result)
      //  console.log("Parsed AST",parsedAST)
      //  createFileFromAST(parsedAST)
       return {englishTable, slovakTable}
      })
  
      const monacoElement = panelWindow.document.getElementById("monaco-editor");
      if (monacoElement) {
        ReactDOM.render(<App />, monacoElement);
      }
    });

  });

