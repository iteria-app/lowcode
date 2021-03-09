## Babel configuration


If your React project is not classic CRA (Create React App) and there is babel.config.js in your project make sure that 
"@babel/plugin-transform-react-jsx-source" is installed and configured:

`npm install --save-dev @babel/plugin-transform-react-jsx-source` 

or

`yarn add @babel/plugin-transform-react-jsx-source --dev` 


Then you need to add this dependency to  `babel.config.js` => module.exports => plugins 

Like this: 

![](/packages/browser-extension/.media/.github/babel.png)

