Ak tvoj projekt obsahuje babel dependency tak treba do projektu pridat @babel/plugin-transform-react-jsx-source:
`npm install --save-dev @babel/plugin-transform-react-jsx-source` 
or
`npm install --save-dev @babel/plugin-transform-react-jsx-source` 

Potom treba pridať túto závislosť aj do `babel.config.js` => module.exports => plugins 
