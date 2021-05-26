import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
  createClient,
  Provider,
  debugExchange,
  cacheExchange,
  fetchExchange
} from 'urql';

const client = createClient({
  url: process.env.REACT_APP_SCHEMA_ENDPOINT as string,
  exchanges: [debugExchange, cacheExchange, fetchExchange]
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
