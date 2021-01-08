import { browser } from "webextension-polyfill-ts";
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

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
      if (msg?.event == "inspectedElementSource") {
        if (rootElement) {
          rootElement.innerHTML =
            "inspectedElementSource" + JSON.stringify(msg);
        }
      }

      if (msg?.event === "inspectedElement") {
        console.log("rootElement", rootElement);
        if (rootElement) {
          rootElement.innerHTML =
            "inspected3b " +
            new Date() +
            JSON.stringify({
              displayName: msg?.payload?.value?.displayName,
              source: msg?.payload?.value?.source,
              props: msg?.payload?.value?.props,
              owners: msg?.payload?.value?.props,
            });
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
        rootElement.innerHTML = "ahoj " + new Date();
      }

      const monacoElement = panelWindow.document.getElementById("monaco-editor");
      if (monacoElement) {
        ReactDOM.render(<App />, monacoElement);
      }
    });

    //newPanel.onHidden.addListener
  });
