'use strict';
import * as vscode from 'vscode';
import { JsonEditorPanel } from './JsonEditorPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// tslint:disable-next-line:export-name
export function activate(context: vscode.ExtensionContext): void {

    const startCommand = vscode.commands.registerCommand('vscode-json-editor.start', resource => {
        if (resource) {
            if (isOpened(resource)) {
                // case when there's a resource and it's already opened
                JsonEditorPanel.CreateOrShow(context.extensionPath);
            } else {
                // case when there's a resource but not already opened
                vscode.window.showTextDocument(resource)
                    .then(() => {
                        JsonEditorPanel.CreateOrShow(context.extensionPath);
                    });
            }
        } else {
            // case when there is no resource passed down
            JsonEditorPanel.CreateOrShow(context.extensionPath);
        }
    });

    context.subscriptions.push(startCommand);
}

// Returns true if an editor is already opened for the given resource
function isOpened(resource) {
    const openedPaths = vscode.window.visibleTextEditors.map(editor => editor.document.uri.path);
    return openedPaths.includes(resource.path);
}
