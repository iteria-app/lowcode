## Babel configuration

If your project contains babel dependency then you need to add "@babel/plugin-transform-react-jsx-source to the project":

`npm install --save-dev @babel/plugin-transform-react-jsx-source` 

or

`npm install --save-dev @babel/plugin-transform-react-jsx-source` 


Then you need to add this dependency to  `babel.config.js` => module.exports => plugins 

Like this: 
`module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-react-jsx-source'
  ],
};
`

