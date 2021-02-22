import "emoji-log"
import { browser, Runtime } from "webextension-polyfill-ts"
import { fetchLocalCode } from "../browser/fetchLocalCode"

console.log("hello froom backgroundScript")

browser.runtime.onInstalled.addListener((): void => {
  console.log("extension installed")
})

browser.runtime.onMessage.addListener((msg, sender) => {
  console.log("background.js message", msg, sender)
  notifyDevtools(msg)

  if (msg?.payload?.value?.source?.fileName) {
    const fileUrl =
      "file:///" + msg?.payload?.value?.source?.fileName.replaceAll("\\", "/")

    fetchLocalCode(fileUrl)
      .then(resp => {
        console.log(
          "background.js fetch file reponse",
          resp,
          msg?.payload?.value?.source?.fileName
        )
        notifyDevtools({
          event: "inspectedElementSource",
          status: "ok",
          fileUrl,
          body: resp?.body,
          ownersList: msg?.payload?.ownersList
        })
      })
      .catch(err => {
        console.error(
          "background.js failed to fetch file",
          err,
          msg?.payload?.value?.source?.fileName
        )
        notifyDevtools({
          event: "inspectedElementSource",
          status: "error",
          error: err,
          errorMessage: err + "",
          fileUrl,
        })
      })
  }
})

//https://stackoverflow.com/questions/19493020/adding-file-permission-to-chrome-extension
//chrome.extension.isAllowedFileSchemeAccess.
//https://stackoverflow.com/questions/17438354/how-can-i-enable-my-chrome-extension-in-incognito-mode/17443982#17443982

var ports: Runtime.Port[] = []
browser.runtime.onConnect.addListener(port => {
  console.log("background.js onConnect port", port, ports)

  if (port.name !== "devtools" && port.name !== "") {
    return
  }
  ports.push(port)
  // Remove port when destroyed (eg when devtools instance is closed)
  port.onDisconnect.addListener(() => {
    var i = ports.indexOf(port)
    if (i !== -1) ports.splice(i, 1)
  })
  port.onMessage.addListener(msg => {
    // Received message from devtools. Do something:
    console.log("background.js received message from devtools page", msg)
  })
})

// Function to send a message to all devtools.html views:
function notifyDevtools(msg: any) {
  ports.forEach(port => {
    port.postMessage(msg)
  })
}
