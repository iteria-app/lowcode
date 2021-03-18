# Low Code

Work in progress. Visual Editor and Code Generator for your React source codes
integrated with Monaco Editor and React Dev Tools.

## [WEB Demo](https://demo.iteria.app/?repo=github.com/iteria-app/example-material-ui)
Try online without any installation on our example projects:
* [Material UI Example](https://demo.iteria.app/?repo=github.com/iteria-app/example-material-ui)
* [Grommet Example](https://demo.iteria.app/?repo=github.com/iteria-app/grommet)
![](https://iteria.app/web-demo.png)

## [Chrome Extension](/packages/browser-extension)
Start your local development server and modify your application withing the browser.
Works out of the box with Create React Application boilerplate (the development mode enriches the React components bundle with `__source` property containing sorce code path, line and column)
![](/packages/browser-extension/.media/.github/Extension.gif)

## [React Lowcode](/packages/react-lowcode)

React source code manipulation and code generator.

```
import { codegen } from '@iteria-app/react-lowcode'

codegen.generatePages(typescriptSourceGeneratedFromGraphql, io, options)
```

## VS Code plugin
We plan to integrate the [React Lowcode](/packages/react-lowcode) into the VS Code / Theia and also reuse existing ecosystem.
