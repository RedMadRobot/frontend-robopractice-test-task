import React from 'react';
import { Provider } from 'react-redux';
import { App } from './app';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/index.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const store = configureStore({ reducer });
  return (
    <Provider store={store}>
      <App />
   </Provider>
  );
}
