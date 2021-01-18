# Low Code

Work in progress. Visual Editor for your source codes.

How it works:

1. Attach the Visual Editor <script> (a chrome plugin TBD)
2. Start your Svelte / React project in development mode
3. Use Visual Editor in your Chrome/Edge/Firefox.
4. Recompile ...


## Features of Lowcode

- Navigate to the source code (a specific file)
- Edit the source code directly in Chrome
- Add a new page to your app without writing code
- We support React + React-router (UI toolkits: Material-UI, Ionic, Semantic UI, Ant Design, Grommet)

### Navigate to the source code (a specific file)

### Edit the source code directly in Chrome

![](/packages/browser-extension/.github/Extension.gif)

### Add a new page to your app without writing code

![](/packages/browser-extension/.github/Newpage.gif)

## Getting started

Chrome extensions

1. Ensure React Developer Tools chrome extension installed

- React Developer Tools Chrome extension [React devtools in marketplace](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

2. Install our chrome extension

- Go to /packages/browser-extension
- `yarn install` to install dependencies.
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

3. Start fs over http (used for saving modified source code)

- `cd packages/fs-over-http`
- `yarn install` to install dependencies.
- `yarn start` to start the project.

4. Fetch project from your Github/Gitlab (or run project locally)

## How it works

- Service worker will transpile your React/Svelte code
- With help from ReactDevtools "inspectedElement" we can manipulate with the selected component
- Edit selected component with visual tools or edit code with browser-extension
- Dev tools server will recompile (tested also with Hot Code Replace)

#### [Chrome Extension](https://github.com/iteria-ui/lowcode/tree/master/packages/browser-extension)

#### [FS over HTTP](https://github.com/iteria-ui/lowcode/tree/master/packages/fs-over-http)

## Architecture

![](/packages/browser-extension/.github/Architecture.png)
