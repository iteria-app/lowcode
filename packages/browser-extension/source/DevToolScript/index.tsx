import { browser } from "webextension-polyfill-ts";
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//@ts-ignore
import {WCMonacoEditor} from './wcEditor'
//import { editor } from "monaco-editor";



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
      console.log("Path", path, "type", typeof(path))
      
      if(editorElement){
      console.log("Editor", editor)
       editorElement.src = msg?.body
       editorElement.value = msg?.body
       console.log("MODEL", msg, "Payload",JSON.stringify(msg?.payload))
       editor.focus();
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

      if (msg?.event === "inspectedElement") {
        console.log("Editor", editor)
        if (rootElement) {
          if(editorElement){
            editor.focus();
             editorElement.src = msg?.body
             editorElement.value = msg?.body
             editor.focus();
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
      
         
      const rootElement = panelWindow.document.getElementById("devtools-root");
      console.log("rootElement", rootElement);
      if (rootElement) {
        //rootElement.innerHTML = "ahoj " + new Date();
      }

      const monacoElement = panelWindow.document.getElementById("monaco-editor");
      if (monacoElement) {
        ReactDOM.render(<App />, monacoElement);
      }
    });

    //newPanel.onHidden.addListener
  });
