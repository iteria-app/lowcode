"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const fs = require("fs");
class JsonEditorPanel {
    constructor(extensionPath, column, theme) {
        this.scriptTextSave = [];
        this.scriptNodeSave = {};
        this._disposables = [];
        this._extensionPath = extensionPath;
        this._currentEditor = vscode.window.activeTextEditor;
        this._panel = vscode.window.createWebviewPanel(JsonEditorPanel.viewType, "jsonEditor", column, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(this._extensionPath, "jsoneditor")),
            ],
        });
        this._panel.webview.html = this.getHtmlForWebview(this._extensionPath, theme);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.onDidReceiveMessage((message) => {
            const json = message.objjson;
            const openFiles = vscode.workspace.textDocuments;
            if (message.json) {
                openFiles.forEach(element => {
                    let data = fs.readFileSync(element.fileName);
                    if (data.toString() !== "") {
                        const jsonData = JSON.parse(data.toString());
                        const key = Object.keys(jsonData)[0];
                        const value = json[key];
                        const diff = this.getDiffOfJsons(value, jsonData[key]);
                        if (Object.keys(diff).length !== 0) {
                            for (let diffKey in diff) {
                                if (diff[diffKey] == undefined) {
                                    delete value.diffKey;
                                }
                                else
                                    value[diffKey] = diff[diffKey];
                            }
                            let finalObject = {};
                            finalObject[key] = value;
                            this.createFiles(element.fileName, "", JSON.stringify(finalObject, undefined, 2));
                        }
                    }
                });
            }
        });
        vscode.window.onDidChangeActiveTextEditor(() => this.onActiveEditorChanged());
        vscode.workspace.onDidSaveTextDocument(() => this.onActiveEditorChanged());
        vscode.window.onDidChangeActiveColorTheme(() => this.colorThemeKindChange(theme));
        this.colorThemeKindChange(theme);
        this.onActiveEditorChanged();
        vscode.workspace.onDidCloseTextDocument(() => this.onActiveEditorChanged());
    }
    // tslint:disable-next-line:function-name
    static CreateOrShow(extensionPath) {
        const column = vscode.ViewColumn.Beside;
        //const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(this.extensionPrefix);
        //const theme: string = config.get(configurationSettings.theme);
        const theme = {
            [vscode.ColorThemeKind.Light]: "light",
            [vscode.ColorThemeKind.Dark]: "dark",
            [vscode.ColorThemeKind.HighContrast]: "dark",
        }[vscode.window.activeColorTheme.kind];
        if (JsonEditorPanel.currentPanel) {
            JsonEditorPanel.currentPanel._panel.reveal(column);
        }
        else {
            JsonEditorPanel.currentPanel = new JsonEditorPanel(extensionPath, column, theme);
        }
    }
    getDiffOfJsons(obj1, obj2) {
        let result = {};
        for (let key in obj1) {
            if (key in obj2) {
                if (obj2[key] !== obj1[key]) {
                    result[key] = obj1[key];
                }
            }
            else {
                result[key] = obj1[key];
            }
        }
        if (Object.keys(obj2).length > Object.keys(obj1).length) {
            for (let key in obj2) {
                if (!(key in obj1)) {
                    result[key] = undefined;
                }
            }
        }
        return result;
    }
    dispose() {
        JsonEditorPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    setDataForEditor() {
        const data = this.getJson();
        const oldjson = data.replace(/(\r\n|\n|\r)/gm, "");
        let newJson = JSON.parse(oldjson);
        newJson = JSON.parse(newJson);
        return JSON.stringify(newJson);
    }
    createFiles(path, fileName, data) {
        fs.writeFile(path + '/' + fileName, data, err => {
            if (err) {
                return console.log(err);
            }
            console.log('Success');
        });
    }
    getJson() {
        let json = "";
        if (this._currentEditor) {
            json = this._currentEditor.document.getText();
        }
        json = JSON.stringify(json);
        return json;
    }
    colorThemeKindChange(theme) {
        const themenew = {
            [vscode.ColorThemeKind.Light]: "light",
            [vscode.ColorThemeKind.Dark]: "dark",
            [vscode.ColorThemeKind.HighContrast]: "dark",
        }[vscode.window.activeColorTheme.kind];
        if (themenew != theme) {
            vscode.window.showInformationMessage("Theme type change detected. Please close and reopen extension.");
        }
    }
    onActiveEditorChanged() {
        if (vscode.workspace.textDocuments.length !== 0) {
            const openFiles = vscode.workspace.textDocuments;
            let finalObject = {};
            openFiles.forEach(element => {
                let data = fs.readFileSync(element.fileName);
                const jsonData = JSON.parse(data.toString());
                finalObject = Object.assign({}, finalObject, jsonData);
            });
            const json = JSON.stringify(finalObject);
            this._panel.webview.postMessage({ json: json });
        }
    }
    getHtmlForWebview(extensionPath, theme) {
        const scriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "index.umd.js"));
        const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });
        const resetCssPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "reset.css"));
        const resetCssUri = resetCssPathOnDisk.with({ scheme: "vscode-resource" });
        const cssPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "index.css"));
        const cssUri = cssPathOnDisk.with({ scheme: "vscode-resource" });
        const cssDarkPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "index.css"));
        const cssDarkUri = cssDarkPathOnDisk.with({ scheme: "vscode-resource" });
        const mainScriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "main.js"));
        const mainScriptUri = mainScriptPathOnDisk.with({
            scheme: "vscode-resource",
        });
        const darkTheme = theme === "dark"
            ? `<link href="${cssDarkUri}" rel="stylesheet" type="text/css">`
            : "";
        return `
        <!DOCTYPE HTML>
        <html>
        <head>
            <!-- when using the mode "code", it's important to specify charset utf-8 -->
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
            <link href="${cssUri}" rel="stylesheet" type="text/css">
            <link href="${resetCssUri}" rel="stylesheet" type="text/css">
            ${darkTheme}
            <script src="${scriptUri}"></script>
        </head>
        <body>
          <div id="style-box" data-editor={}></div>
          <script src="${mainScriptUri}"></script>
        </body>
        </html>
        `;
    }
}
JsonEditorPanel.viewType = "jsonEditor";
exports.JsonEditorPanel = JsonEditorPanel;
//# sourceMappingURL=JsonEditorPanel.js.map