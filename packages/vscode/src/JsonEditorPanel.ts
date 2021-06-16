"use strict";

import * as path from "path";
import * as vscode from "vscode";
import * as parse5 from "parse5";
import * as fs from 'fs';
import * as prettierSvelte from 'prettier-plugin-svelte';
import * as parser from 'prettier-plugin-svelte';
import * as printAstToDoc from 'prettier/src/main/ast-to-doc'
import * as prettierCore from 'prettier/src/main/core'
import * as prettierOpts from 'prettier/src/main/options'
import * as prettierMulti from 'prettier/src/main/multiparser'
import * as FastPath from 'prettier/src/common/fast-path'
import * as prettierCss from 'prettier/src/language-css'
import * as prettierJs from 'prettier/src/language-js'
import * as prettierHtml from 'prettier/src/language-html'
import * as prettierDoc from 'prettier/src/document/doc-printer'

export class JsonEditorPanel {
  public static currentPanel: JsonEditorPanel | undefined;
  scriptTextSave : Array<any> = [];
  scriptNodeSave : any = {};
  private static readonly viewType: string = "jsonEditor";
  //private static readonly extensionPrefix: string = 'vscode-json-editor';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];
  private _currentEditor: vscode.TextEditor;

  private constructor(
    extensionPath: string,
    column: vscode.ViewColumn,
    theme: string
  ) {
    this._extensionPath = extensionPath;
    this._currentEditor = vscode.window.activeTextEditor;
    this._panel = vscode.window.createWebviewPanel(
      JsonEditorPanel.viewType,
      "jsonEditor",
      column,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(this._extensionPath, "jsoneditor")),
        ],
      }
    );

    this._panel.webview.html = this.getHtmlForWebview(
      this._extensionPath,
      theme
    );

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage((message) => {
        const json = message.objjson
        const openFiles = vscode.workspace.textDocuments
        if (message.json) {
          openFiles.forEach(element => {
            let data = fs.readFileSync(element.fileName)
            if (data.toString() !== "") {
              const jsonData = JSON.parse(data.toString())
              const key = Object.keys(jsonData)[0]
              const value = json[key]
              const diff = this.getDiffOfJsons(value, jsonData[key])
              if (Object.keys(diff).length !== 0) {
                for (let diffKey in diff) {
                  if (diff[diffKey] == undefined) {
                    delete value.diffKey
                  }
                  else 
                    value[diffKey] = diff[diffKey]
                }
                let finalObject = {}
                finalObject[key] = value          
                this.createFiles(element.fileName, "", JSON.stringify(finalObject, undefined, 2))
              }
            }
          });
        }
    });

    vscode.window.onDidChangeActiveTextEditor(() =>
      this.onActiveEditorChanged()
    );
    vscode.workspace.onDidSaveTextDocument(() => this.onActiveEditorChanged());
    vscode.window.onDidChangeActiveColorTheme(() =>
      this.colorThemeKindChange(theme)
    );

    this.colorThemeKindChange(theme);
    this.onActiveEditorChanged();

    vscode.workspace.onDidCloseTextDocument(() => this.onActiveEditorChanged());
  }

  // tslint:disable-next-line:function-name
  public static CreateOrShow(extensionPath: string): void {
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
    } else {
      JsonEditorPanel.currentPanel = new JsonEditorPanel(
        extensionPath,
        column,
        theme
      );
    }
  }

  private getDiffOfJsons(obj1: Object, obj2: Object) : Object{
    let result = {}
    for (let key in obj1) {
      if (key in obj2) {
        if (obj2[key] !== obj1[key]) {
          result[key] = obj1[key]
        }
      } else {
        result[key] = obj1[key] 
      }
    }
    if (Object.keys(obj2).length > Object.keys(obj1).length) {
      for (let key in obj2) {
        if (!(key in obj1)) {
          result[key] = undefined
        }
      }
    }
    return result
  }

  public dispose(): void {
    JsonEditorPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private setDataForEditor(): string {
    const data = this.getJson()
    const oldjson = data.replace(/(\r\n|\n|\r)/gm, "");
    let newJson = JSON.parse(oldjson)
    newJson = JSON.parse(newJson)
    return JSON.stringify(newJson)
  }


  private createFiles(path: any, fileName: string, data: any) {
    fs.writeFile(path+'/'+fileName, data, err => {
      if (err) {
        return console.log(err);
      }
      console.log('Success');
    });
  }

  private getJson(): string {
    let json: string = "";
    if (this._currentEditor) {
      json = this._currentEditor.document.getText();
    }
    json = JSON.stringify(json);
    return json;
  }

  private colorThemeKindChange(theme: string): void {
    const themenew = {
      [vscode.ColorThemeKind.Light]: "light",
      [vscode.ColorThemeKind.Dark]: "dark",
      [vscode.ColorThemeKind.HighContrast]: "dark",
    }[vscode.window.activeColorTheme.kind];

    if (themenew != theme) {
      vscode.window.showInformationMessage(
        "Theme type change detected. Please close and reopen extension."
      );
    }
  }

  private onActiveEditorChanged(): void {
    if (vscode.workspace.textDocuments.length !== 0) {
      const openFiles = vscode.workspace.textDocuments
      let finalObject : Object = {}
      openFiles.forEach(element => {
        let data = fs.readFileSync(element.fileName)
        const jsonData = JSON.parse(data.toString())
        finalObject = {...finalObject, ...jsonData}
      });
      const json : string = JSON.stringify(finalObject)
      this._panel.webview.postMessage({ json: json });
    }
  }

  private getHtmlForWebview(extensionPath: string, theme: string): string {  
    const scriptPathOnDisk = vscode.Uri.file(
      path.join(extensionPath, "jsoneditor", "index.umd.js")
    );
    const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });
    
    const resetCssPathOnDisk = vscode.Uri.file(
      path.join(extensionPath, "jsoneditor", "reset.css")
    );
    const resetCssUri = resetCssPathOnDisk.with({scheme: "vscode-resource"})

    const cssPathOnDisk = vscode.Uri.file(
      path.join(extensionPath, "jsoneditor", "index.css")
    );
    const cssUri = cssPathOnDisk.with({ scheme: "vscode-resource" });

    const cssDarkPathOnDisk = vscode.Uri.file(
      path.join(extensionPath, "jsoneditor", "index.css")
    );
    const cssDarkUri = cssDarkPathOnDisk.with({ scheme: "vscode-resource" });
    
    const mainScriptPathOnDisk = vscode.Uri.file(
      path.join(extensionPath, "jsoneditor", "main.js")
    );
    const mainScriptUri = mainScriptPathOnDisk.with({
      scheme: "vscode-resource",
    });

    const darkTheme: string =
      theme === "dark"
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

