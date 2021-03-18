# Low Code

Work in progress. Visual Editor and Code Generator for your React source codes
integrated with Monaco Editor and React Dev Tools.

## [WEB Demo](https://demo.iteria.app/?repo=github.com/iteria-app/example-material-ui) (used out of the box in Create React Application boilerplate) enriches the javascript with `__source` property (sorce code path, line and column)
Try online without any installation on our example projects:
* [Material UI Example] (https://demo.iteria.app/?repo=github.com/iteria-app/example-material-ui)
* [Grommet Example](https://demo.iteria.app/?repo=github.com/iteria-app/grommet)
![](https://iteria.app/web-demo.png)

## [Chrome Extension](/packages/browser-extension)
![](/packages/browser-extension/.media/.github/Extension.gif)

Note, this needs installation of a Chrome Browser Plugin and locally running your dev server.

## [React Lowcode](/packages/react-lowcode)

React source code manipulation and code generator.

```
import { codegen } from '@iteria-app/react-lowcode'

codegen.generatePages(typescriptSourceGeneratedFromGraphql, io, options)
```

## VS Code plugin
We plan to integrate the [React Lowcode](/packages/react-lowcode) into the VS Code / Theia and also reuse existing ecosystem.
