### 1.0.200602

- Corrected some naming inconsistancies

### 1.0.0

- Forked from v.0.2.3 of VSCode JSON Editor by Sunmorgus
- Added Explorer context menu item and titlebar icon (Issue #13 from original project)
- Updated to the latest jsoneditor release (9.0.0 published on 05/24/2020)
- Beautify CSS and JS files from JSON Editor Online files.
- Extension will now detect the active theme type and match it. (Issue #6 and several others from original project)
    - If theme type changes (light to dark, dark to light, high Contrast stays dark) a message asking you to
        close and reopen the extension.
- Changed from vscode-resource to Webview.asWebviewUri per Microsoft request (Issue #21 from original project)
- Updated VS Code NPM Module allowing for better API compatability
- Updated Readme, change log, etc.
