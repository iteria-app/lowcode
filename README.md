# Low Code

Work in progress. Visual Editor for your source codes.

How it works:

1. Attach the Visual Editor <script> (a chrome plugin TBD)
2. Start your Svelte / React project in development mode
3. Use Visual Editor in your Chrome/Edge/Firefox.
4. Recompile ...

## Features of Lowcode

- Navigate to the source code (a specific JSX/TSX file) while browsing your React application in developmen mode
- Edit the source code directly in Chrome "visualy" or by using Monaco Editor
- Add a new page to your app without writing code
- We support React + React-router (UI toolkits: Material-UI, Ionic, Semantic UI, Ant Design, Grommet)

### Navigate to the source code (a specific file)

### Edit the source code directly in Chrome

![](/packages/browser-extension/.media/.github/Extension.gif)

### Add a new page to your app without writing code

![](/packages/browser-extension/.media/.github/Newpage.gif)

### Edit your localization files

![](/packages/browser-extension/.media/.github/Localizations.gif)

## Getting started

Chrome extensions

1. Ensure React Developer Tools chrome extension installed

- React Developer Tools Chrome extension [React devtools in marketplace](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

2. Install [Lowcode Chrome Extension](https://github.com/iteria-ui/lowcode/tree/master/packages/browser-extension)

- Go to [/packages/browser-extension](https://github.com/iteria-app/lowcode/tree/master/packages/browser-extension) folder in repository.
- `yarn install` to install dependencies. (You should use yarn rather then npm)
- `yarn run dev:chrome` to start the development server for chrome extension
- `yarn run dev:firefox` to start the development server for firefox addon
- `yarn run dev:opera` to start the development server for opera extension
- `yarn run build:chrome` to build chrome extension
- `yarn run build:firefox` to build firefox addon
- `yarn run build:opera` to build opera extension
- `yarn run build` builds and packs extensions all at once to extension/ directory
- Go to the browser address bar and type `chrome://extensions`
- Check the `Developer Mode` button to enable it.
- Click on the `Load Unpacked Extension…` button.
- Select your extension’s extracted directory.
- Exception is when you don't have standard CRA (`npx create-react-app your-app`) => see lowcode/babel-config.md

3. Start [FS over HTTP](https://github.com/iteria-ui/lowcode/tree/master/packages/fs-over-http) (used for saving modified source code)

- Go to [/packages/fs-over-http](https://github.com/iteria-app/lowcode/tree/master/packages/fs-over-http) folder in repository.
- `yarn install` to install dependencies. (You should use yarn rather then npm)
- `yarn start` to start the project.

4. Start your React applicantion in development mode and open in browser

- Use your React Aplication or use example React Application https://github.com/ionic-team/ionic-react-conference-app
- Start local webpack dev server

## How it works

- Babel plugin (used out of the box in Create React Application boilerplate) enriches the javascript with `__source` property (sorce code path, line and column)
- We have reused React Developer Tools Chrome extension
- Lowcode listens for message "inspectedElement" from React Deveoper Tools are sending
- Using Lowcode you can modify JSX/TSX source code either "visualy" (more features will come) or by integrade Monaco editor
- Web Pack Dev server will recompile (tested also with Hot Code Replace)

## Architecture

![](/packages/browser-extension/.media/.github/Architecture.png)
