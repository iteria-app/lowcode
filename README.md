# Low Code

Work in progress. Visual Editor for your source codes.

How it works:

1. Attach the Visual Editor <script> (a chrome plugin TBD)
2. Start your Svelte / React project in developmen mode
3. Use Visual Editor in your the Chrome/Edge/Firefox.
4. Recompile ...

## Features of Lowcode

- Navigation to the code
- Edit code directly in Chrome
- Add new page to your app without writing code
- We support React + React-router (UI toolkits: Material-UI, Ionic, Semantic UI, Ant Design, Grommet)

### Navigation to the code

### Edit code directly in Chrome

![](name-of-giphy.gif)

### Add new page to your app without writing code

## Getting started

Chrome Extension

- Go to /packages/browser-extension
- `yarn install` to install dependencies.
- `yarn run dev:chrome` to start the development server for chrome extension
- `yarn run dev:firefox` to start the development server for firefox addon
- `yarn run dev:opera` to start the development server for opera extension
- `yarn run build:chrome` to build chrome extension
- `yarn run build:firefox` to build firefox addon
- `yarn run build:opera` to build opera extension
- `yarn run build` builds and packs extensions all at once to extension/ directory
- install [React devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- Go to the browser address bar and type `chrome://extensions`
- Check the `Developer Mode` button to enable it.
- Click on the `Load Unpacked Extension…` button.
- Select your extension’s extracted directory.

Fs over HTTP

- `yarn install` to install dependencies.
- `yarn start` to start the project.

## How it works

- Fetch project from your Github/Gitlab (or run project locally)
- Service worker will transpile your React/Svelte code
- With help from ReactDevtools "inspectedElement" we can manipulate with the selected component
- Edit selected component with visual tools or edit code with browser-extension
- Then save your changes and recompile
