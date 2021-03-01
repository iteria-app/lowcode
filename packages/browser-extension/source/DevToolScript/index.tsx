import { browser } from "webextension-polyfill-ts";
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { findLocaliozationFiles } from "../localization/localizations";
import { initLocalization } from "../localization/init";

//@ts-ignore
import {WCMonacoEditor} from './wcEditor'

import { InspectedElementPayload } from '../devtools'
import { cloneInspectedElement } from '../cloneInspectedElement'

console.log("[lowcode] devtools.js A");

import { io, ioRefreshEditor } from '../util/global'

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
      console.log("Column Number", columnNumber, "Line Number", lineNumber, msg)
      const editorElement:WCMonacoEditor = panelWindow.document.getElementById("editor");  
      const editor = editorElement.editor

      const pathFile = msg?.fileUrl
      const path = pathFile?.substring(8)
      console.log("Path", path)

      
      if (msg?.type == 'lowcodeSources' && panelWindow) {
        findLocaliozationFiles(msg?.path).then((foundFiles) => {
          console.log('FOUND C', msg?.path, foundFiles)
          const msgFiles = foundFiles.filter((file: string) => !file?.endsWith('/package.json') && !file?.endsWith('\\package.json'))
          initLocalization(msgFiles, panelWindow.document, io)
        })
      }
      
      if (msg?.event == "inspectedElement") {
        try {
          const inspectedElementPayload = msg.payload as InspectedElementPayload
          console.log('inspectedElementPayload', inspectedElementPayload)
          if (inspectedElementPayload) {
            cloneInspectedElement(inspectedElementPayload, ioRefreshEditor)
          }
        } catch(err) {
          console.error('error cloneInspectedElement', msg) 
        }
      }

      if (msg?.event == "inspectedElementSource" && editorElement) {
        editorElement.src = msg?.body
        editorElement.value = msg?.body
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
            io.writeFile(path, editorElement.value)
            //fetch(`http://localhost:7500/files/${path}`, {method:'PUT', body:editorElement.value})
          })
        }
      }

      if (msg?.event === "inspectedElement" && editor && rootElement && editorElement) {
        console.log("Editor", editor)
        editor.focus();
        editorElement.src = msg?.body
        editorElement.value = msg?.body
        editorElement.focus();
        editor.revealLineInCenter(lineNumber + 4);
        editor.setPosition({
          lineNumber: 60, // TODO this should not be hardcoded
          column: 40,
        });
        console.log("Position", editor.getPosition(), "Model", editor.getModel())
        if(saveButton) {
          saveButton.addEventListener('click', () => {
            io.writeFile(path, editorElement.value)
          })
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
    extensionPanel.onShown.addListener(async function tmp(aPanelWindow) {
      console.log("devtools.js onShown", aPanelWindow);

      extensionPanel.onShown.removeListener(tmp); // Run once only
      panelWindow = aPanelWindow;

      const editorElement:WCMonacoEditor = panelWindow.document.getElementById("editor");  
      const editorInstance = editorElement.editor
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
  
      const monacoElement = panelWindow.document.getElementById("monaco-editor");
      if (monacoElement) {
        ReactDOM.render(<App />, monacoElement);
      }
    });

  });
