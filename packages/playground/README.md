# Playground
Modify source code by browsing your application.

## How it works
Load React/Svelte source from GIT, transpile ESM, and display using iframe.

### Load Source Code
* Load file tree from git (initially using Gitlab API)

Calculate map for imports:
** strip .js, .ts, .jsx, .tsx (useful for importing)

### Bundling
No bundler, just ESM. No dev server necessary just browser with Service Workers and cache.

Service Worker for loading javascript:
* Transpile TS, JSX, TSX using `esbuild-wasm`
* Transpile Svelte files using Svelte Compiler

Inspiration: Snowpack

### Preview
Preview displays user interface of you application using iframe.
Hover menu helps user to:
* clone visual elements
* delete visual elements
* insert Snippets
* navigate to the source code text editor


Bundled into a Web Component.
** Generate `<link>` for CSS

Credits: https://sebgroup.github.io/magic-iframe/

### Source Code Text Editor
* Monaco Editor
** Web Component

Credits: https://github.com/vanillawc/wc-monaco-editor