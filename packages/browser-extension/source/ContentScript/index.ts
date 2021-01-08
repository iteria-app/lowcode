import { browser } from "webextension-polyfill-ts";

console.log('helloworld from content script');

export {};

window.addEventListener("message", (event) => {
    //TODO if (event?.data?.payload?.event == "inspectedElement"
    if (
      event?.data?.payload?.event == "inspectedElement" 
      &&
      event?.data?.payload?.payload?.value
    ) {
      //event?.data?.payload?.payload?.value?.id
      //event?.data?.payload?.payload?.value?.source
      //event?.data?.payload?.payload?.value?.props
      //event?.data?.payload?.payload?.value?.owners
      const source = event?.data?.payload?.payload?.value?.source;
      //console.log("content.js source", source, event);
      if (source) {
          try {
            browser.runtime.sendMessage(event?.data?.payload);
          } catch(err) {
            //do nothing
          }
        //document.getElementById('sourcePath').innerHTML = source
        //document.getElementById('sourceLine').innerHTML = source.lineNumber
        //document.getElementById('sourcePath').innerHTML = source
      }
    }
  });

  browser.runtime.onConnect.addListener((port) => {
    console.log("content.js onConnect port", port)
})
