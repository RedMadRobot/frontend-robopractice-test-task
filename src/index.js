import React from 'react';
import ReactDOM from 'react-dom';
import init from './init.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
