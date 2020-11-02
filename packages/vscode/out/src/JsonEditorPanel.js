"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const parse5 = require("parse5");
const fs = require("fs");
const prettierSvelte = require("prettier-plugin-svelte");
const parser = require("prettier-plugin-svelte");
const printAstToDoc = require("prettier/src/main/ast-to-doc");
const prettierCore = require("prettier/src/main/core");
const prettierOpts = require("prettier/src/main/options");
const prettierMulti = require("prettier/src/main/multiparser");
const FastPath = require("prettier/src/common/fast-path");
const prettierCss = require("prettier/src/language-css");
const prettierJs = require("prettier/src/language-js");
const prettierHtml = require("prettier/src/language-html");
const prettierDoc = require("prettier/src/document/doc-printer");
class JsonEditorPanel {
    constructor(extensionPath, column, theme) {
        this.scriptTextSave = [];
        this.scriptNodeSave = {};
        this._disposables = [];
        this._extensionPath = extensionPath;
        this._currentEditor = vscode.window.activeTextEditor;
        this._panel = vscode.window.createWebviewPanel(JsonEditorPanel.viewType, "JSON Tree Editor", column, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(this._extensionPath, "jsoneditor")),
            ],
        });
        this._panel.webview.html = this.getHtmlForWebview(this._extensionPath, theme);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.onDidReceiveMessage((message) => {
            if (this._currentEditor) {
                this._currentEditor.edit((editBuilder) => {
                    const range = new vscode.Range(this._currentEditor.document.positionAt(0), this._currentEditor.document.positionAt(this._currentEditor.document.getText().length));
                    let html = parse5.serialize(JSON.parse(message.json));
                    //TODO dynamicky: Match every script using regex, this will return an array
                    // cycle the matched array and paste the text between them (index based)
                    html = html.replace(/<script[^>]*>.*?<\/script>/g, '<script>' + this.scriptTextSave[0] + '</script>');
                    editBuilder.replace(range, html);
                });
            }
        });
        vscode.window.onDidChangeActiveTextEditor(() => this.onActiveEditorChanged());
        vscode.workspace.onDidSaveTextDocument(() => this.onDocumentChanged());
        vscode.window.onDidChangeActiveColorTheme(() => this.colorThemeKindChange(theme));
        this.colorThemeKindChange(theme);
        this.onActiveEditorChanged();
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
    filterNodes(documentFragment) {
        const removeParentNode = (obj) => {
            Object.keys(obj).forEach(key => (key === 'parentNode') && delete obj[key] ||
                (obj[key] && typeof obj[key] === 'object') && removeParentNode(obj[key]));
            return obj;
        };
        delete documentFragment.nodeName;
        removeParentNode(documentFragment.childNodes);
        this.scriptNodeSave = documentFragment.childNodes.filter(function (obj) {
            return obj.tagName === 'script';
        });
        this.scriptNodeSave.map(node => this.scriptTextSave.push(node.childNodes[0].value));
        documentFragment.childNodes[0].childNodes[0].value = '';
        //documentFragment.childNodes[0].childNodes
        /*documentFragment.childNodes = documentFragment.childNodes.filter(function( obj ) {
          return obj.tagName !== 'script';
        }); */
        //TODO need this to be dynamic
        //const folderPath = vscode.workspace.rootPath+'/src/pages/';
        //this.createFiles(folderPath, 'script.txt', JSON.stringify(this.scriptTextSave));
        return documentFragment;
    }
    doFormat(input) {
        let ast = parser.parsers.svelte.parse(input);
        ast.tokens = [];
        const locStart = parser.parsers.svelte.locStart;
        const locEnd = parser.parsers.svelte.locEnd;
        let options = prettierOpts.normalize({
            tabWidth: 2,
            parser: 'svelte',
            "svelteSortOrder": "scripts-styles-markup",
            plugins: [prettierCss, prettierJs, prettierHtml, prettierSvelte],
            "svelteStrictMode": false,
            "svelteBracketNewLine": false,
            "svelteAllowShorthand": true,
            "originalText": input,
            locStart,
            locEnd
        });
        const sveltePrint = parser.printers['svelte-ast'].print;
        //const svelteEmbed = parser.printers['svelte-ast'].embed
        function printFn(fastPath) {
            const current = fastPath.getValue();
            if (current.isJS) {
                return prettierMulti.printSubtree(fastPath, sveltePrint, options, printAstToDoc);
            }
            switch (current.type) {
                case 'Script':
                case 'Style':
                    return prettierMulti.printSubtree(fastPath, sveltePrint, options, printAstToDoc);
            }
            return sveltePrint(fastPath, options, printFn);
        }
        try {
            let parsed = prettierCore.parse(input, options, true);
            parsed.ast.tokens = []; //pretier-svelte isASTNode() needs this
            options.originalText = parsed.text;
            let doc = sveltePrint(new FastPath(parsed.ast), options, printFn);
            let formatted = prettierDoc.printDocToString(doc, options);
            console.log('formated AST 1', formatted);
            /*
            formatted = prettierCore.formatAST(ast, options)
            //let formatted = prettierCore.printToDoc(input, options)
            //let formatted = prettier.format(input, options)
            console.log('formated AST 2', formatted)*/
        }
        catch (e) {
            console.error('format failed', e);
        }
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
        let documentFragment = "";
        if (this._currentEditor) {
            json = this._currentEditor.document.getText();
            this.doFormat(json);
            //documentFragment = parse5.parseFragment(json);
            //json = this.filterNodes(documentFragment);
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
        if (vscode.window.activeTextEditor) {
            this._currentEditor = vscode.window.activeTextEditor;
            const json = this.getJson();
            this._panel.webview.postMessage({ json: json });
        }
    }
    onDocumentChanged() {
        const json = this.getJson();
        this._panel.webview.postMessage({ json: json });
    }
    getHtmlForWebview(extensionPath, theme) {
        const mainScriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "main.js"));
        const mainScriptUri = mainScriptPathOnDisk.with({
            scheme: "vscode-resource",
        });
        const scriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "jsoneditor.min.js"));
        const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });
        const cssPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "jsoneditor.min.css"));
        const cssUri = cssPathOnDisk.with({ scheme: "vscode-resource" });
        const cssDarkPathOnDisk = vscode.Uri.file(path.join(extensionPath, "jsoneditor", "jsoneditor.dark.min.css"));
        const cssDarkUri = cssDarkPathOnDisk.with({ scheme: "vscode-resource" });
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
            ${darkTheme}
            <script src="${scriptUri}"></script>
        </head>
        <body>
            <div id="jsoneditor"></div>

            <script src="${mainScriptUri}"></script>
        </body>
        </html>
        `;
    }
}
JsonEditorPanel.viewType = "jsonEditor";
exports.JsonEditorPanel = JsonEditorPanel;
//# sourceMappingURL=JsonEditorPanel.js.map