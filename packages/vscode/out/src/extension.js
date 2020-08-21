'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const JsonEditorPanel_1 = require("./JsonEditorPanel");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// tslint:disable-next-line:export-name
function activate(context) {
    const startCommand = vscode.commands.registerCommand('vscode-json-editor.start', resource => {
        if (resource) {
            if (isOpened(resource)) {
                // case when there's a resource and it's already opened
                JsonEditorPanel_1.JsonEditorPanel.CreateOrShow(context.extensionPath);
            }
            else {
                // case when there's a resource but not already opened
                vscode.window.showTextDocument(resource)
                    .then(() => {
                    JsonEditorPanel_1.JsonEditorPanel.CreateOrShow(context.extensionPath);
                });
            }
        }
        else {
            // case when there is no resource passed down
            JsonEditorPanel_1.JsonEditorPanel.CreateOrShow(context.extensionPath);
        }
    });
    context.subscriptions.push(startCommand);
}
exports.activate = activate;
// Returns true if an editor is already opened for the given resource
function isOpened(resource) {
    const openedPaths = vscode.window.visibleTextEditors.map(editor => editor.document.uri.path);
    return openedPaths.includes(resource.path);
}
//# sourceMappingURL=extension.js.map